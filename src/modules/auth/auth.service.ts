/**
 * src/modules/auth/auth.service.ts
 * Real authentication service: registration, login (with account lockout),
 * logout, remember-me, and password reset flow.
 *
 * Uses Bcrypt password hashing, signed DB-backed sessions, and writes
 * security events to the activity log.
 *
 * IMPORTANT: Every exported function must catch its own errors so callers
 * never see generic 500 "Internal server error" from the API wrapper.
 */

import crypto from 'node:crypto';
import prisma from '../../lib/prisma';
import { hashPassword, verifyPassword } from '../../lib/security/password';
import { sha256 } from '../../lib/security/session';
import { issueSession, revokeSession } from '../../lib/auth';
import { logSecurityEvent, type SecurityEventInput } from '../../lib/security/logger';
import { getClientIp, getUserAgent } from '../../lib/security/request-context';

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_DURATION_MINUTES = 15;

export interface LoginResult {
  ok: boolean;
  token?: string;
  csrf?: string;
  user?: { id: string; email: string; name: string };
  error?: string;
  locked?: boolean;
  lockMinutes?: number;
}

async function buildClientMeta(req: Request) {
  return { ip: getClientIp(req), userAgent: getUserAgent(req) };
}

async function recordSecurity(req: Request, input: Omit<SecurityEventInput, 'ipAddress' | 'userAgent'>) {
  try {
    const { ip, userAgent } = await buildClientMeta(req);
    return logSecurityEvent({ ...input, ipAddress: ip, userAgent: userAgent });
  } catch (err) {
    // Security logging must never break the request
    console.error('[Auth] Failed to record security event:', err);
  }
}

export async function registerUser(input: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  req: Request;
}): Promise<{ ok: boolean; error?: string; token?: string; csrf?: string }> {
  try {
    const email = input.email.trim().toLowerCase();

    // ── Check for existing user ────────────────────────────────────────
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      await recordSecurity(input.req, { action: 'REGISTRATION', details: { email, reason: 'email_exists' } });
      return { ok: false, error: 'Bu email allaqachon ro‘yxatdan o‘tgan' };
    }

    // ── Hash password ──────────────────────────────────────────────────
    let passwordHash: string;
    try {
      passwordHash = await hashPassword(input.password);
    } catch (err) {
      console.error('[Auth] Password hashing failed:', err);
      return { ok: false, error: 'Parolni saqlashda xatolik yuz berdi' };
    }

    // ── Create user ────────────────────────────────────────────────────
    let user: { id: string; email: string; name: string };
    try {
      user = await prisma.user.create({
        data: {
          email,
          passwordHash,
          name: input.name.trim(),
          phone: input.phone?.trim() || null,
          isActive: true,
        },
      });
    } catch (err) {
      console.error('[Auth] User creation failed:', err);
      // Handle Prisma unique constraint violation
      if (err instanceof Error && err.message.includes('Unique constraint')) {
        return { ok: false, error: 'Bu email allaqachon ro‘yxatdan o‘tgan' };
      }
      return { ok: false, error: 'Foydalanuvchi yaratishda xatolik yuz berdi' };
    }

    // ── Issue session ──────────────────────────────────────────────────
    let issued: { token: string; csrf: string };
    try {
      const meta = await buildClientMeta(input.req);
      issued = await issueSession({
        userId: user.id,
        ip: meta.ip,
        userAgent: meta.userAgent,
      });
    } catch (err) {
      console.error('[Auth] Session issuance failed:', err);
      // Session creation failed but user WAS created — log and return specific error
      return { ok: false, error: 'Sessiya yaratishda xatolik — qayta urinib ko‘ring' };
    }

    // ── Log success (fire-and-forget, never block on this) ────────────
    recordSecurity(input.req, {
      action: 'REGISTRATION',
      userId: user.id,
      entity: 'User',
      entityId: user.id,
    }).catch(() => {});

    return { ok: true, token: issued.token, csrf: issued.csrf };
  } catch (err) {
    // Top-level catch for any unexpected error
    console.error('[Auth] registerUser unexpected error:', err);
    return { ok: false, error: 'Ro‘yxatdan o‘tishda kutilmagan xatolik yuz berdi' };
  }
}

export async function loginUser(input: {
  email: string;
  password: string;
  rememberMe?: boolean;
  req: Request;
}): Promise<LoginResult> {
  try {
    const email = input.email.trim().toLowerCase();
    const meta = await buildClientMeta(input.req);

    const user = await prisma.user.findUnique({ where: { email } });

    // ── Account lockout check ──────────────────────────────────────────
    if (user) {
      const lock = await prisma.accountLock.findUnique({ where: { userId: user.id } });
      if (lock?.lockedUntil && lock.lockedUntil > new Date()) {
        const lockMinutes = Math.ceil((lock.lockedUntil.getTime() - Date.now()) / 60000);
        await recordSecurity(input.req, {
          action: 'LOGIN_FAILED', userId: user.id, details: { reason: 'locked' },
        });
        return { ok: false, error: 'Hisob vaqtincha bloklangan', locked: true, lockMinutes };
      }
    }

    if (!user || !user.isActive) {
      await recordSecurity(input.req, { action: 'LOGIN_FAILED', details: { email, reason: 'no_user' } });
      return { ok: false, error: 'Email yoki parol noto‘g‘ri' };
    }

    // ── Verify password ────────────────────────────────────────────────
    let passwordMatch: boolean;
    try {
      passwordMatch = await verifyPassword(user.passwordHash, input.password);
    } catch (err) {
      console.error('[Auth] Password verification failed:', err);
      return { ok: false, error: 'Parolni tekshirishda xatolik yuz berdi' };
    }

    if (!passwordMatch) {
      await incrementFailedAttempts(user.id);
      await recordSecurity(input.req, { action: 'LOGIN_FAILED', userId: user.id, details: { reason: 'bad_password' } });
      const lock = await prisma.accountLock.findUnique({ where: { userId: user.id } });
      if (lock?.lockedUntil && lock.lockedUntil > new Date()) {
        return { ok: false, error: 'Hisob vaqtincha bloklangan', locked: true, lockMinutes: LOCK_DURATION_MINUTES };
      }
      return { ok: false, error: 'Email yoki parol noto‘g‘ri' };
    }

    // ── Success → reset failed attempts ────────────────────────────────
    await prisma.accountLock.deleteMany({ where: { userId: user.id } });

    // ── Issue session ──────────────────────────────────────────────────
    let issued: { token: string; csrf: string };
    try {
      issued = await issueSession({
        userId: user.id,
        rememberMe: input.rememberMe,
        ip: meta.ip,
        userAgent: meta.userAgent,
      });
    } catch (err) {
      console.error('[Auth] Login session issuance failed:', err);
      return { ok: false, error: 'Sessiya yaratishda xatolik — qayta urinib ko‘ring' };
    }

    // ── Update last login ──────────────────────────────────────────────
    try {
      await prisma.user.update({ where: { id: user.id }, data: { lastLogin: new Date() } });
    } catch (err) {
      console.error('[Auth] Failed to update lastLogin:', err);
      // Non-critical, continue
    }

    await recordSecurity(input.req, { action: 'LOGIN_SUCCESS', userId: user.id });

    return {
      ok: true,
      token: issued.token,
      csrf: issued.csrf,
      user: { id: user.id, email: user.email, name: user.name },
    };
  } catch (err) {
    console.error('[Auth] loginUser unexpected error:', err);
    return { ok: false, error: 'Kirishda kutilmagan xatolik yuz berdi' };
  }
}

async function incrementFailedAttempts(userId: string) {
  try {
    const lock = await prisma.accountLock.upsert({
      where: { userId },
      create: { userId, failedAttempts: 1, lastFailureAt: new Date() },
      update: {
        failedAttempts: { increment: 1 },
        lastFailureAt: new Date(),
      },
    });
    if (lock.failedAttempts >= MAX_FAILED_ATTEMPTS) {
      await prisma.accountLock.update({
        where: { userId },
        data: { lockedUntil: new Date(Date.now() + LOCK_DURATION_MINUTES * 60_000) },
      });
      await logSecurityEvent({ action: 'ACCOUNT_LOCKED', userId, details: { attempts: lock.failedAttempts } });
    }
  } catch (err) {
    console.error('[Auth] incrementFailedAttempts failed:', err);
    // Non-critical — login should still fail, lockout is a bonus
  }
}

export async function logoutUser(req: Request, sessionToken?: string): Promise<void> {
  try {
    const meta = await buildClientMeta(req);
    if (sessionToken) await revokeSession(sessionToken);
    await logSecurityEvent({
      action: 'LOGOUT',
      ipAddress: meta.ip,
      userAgent: meta.userAgent,
      details: sessionToken ? { reason: 'explicit' } : { reason: 'no_session' },
    });
  } catch (err) {
    console.error('[Auth] logoutUser failed:', err);
  }
}

// ── Password reset flow ────────────────────────────────────────────────

export async function requestPasswordReset(input: { email: string; req: Request }): Promise<{ ok: boolean; token?: string }> {
  try {
    // Always return ok to avoid email enumeration.
    const email = input.email.trim().toLowerCase();
    const user = await prisma.user.findUnique({ where: { email } });
    if (user && user.isActive) {
      await prisma.passwordResetToken.updateMany({
        where: { userId: user.id, usedAt: null },
        data: { usedAt: new Date() },
      });
      const rawToken = cryptoRandomToken();
      await prisma.passwordResetToken.create({
        data: {
          userId: user.id,
          tokenHash: sha256(rawToken),
          expiresAt: new Date(Date.now() + 60 * 60 * 1000),
        },
      });
      await recordSecurity(input.req, { action: 'PASSWORD_RESET_REQUESTED', userId: user.id });
      return { ok: true, token: rawToken };
    }
    await recordSecurity(input.req, { action: 'PASSWORD_RESET_REQUESTED', details: { email, reason: 'no_user' } });
    return { ok: true };
  } catch (err) {
    console.error('[Auth] requestPasswordReset failed:', err);
    return { ok: true }; // Still return ok to avoid email enumeration
  }
}

export async function resetPassword(input: { token: string; password: string }): Promise<{ ok: boolean; error?: string }> {
  try {
    const tokenHash = sha256(input.token);
    const record = await prisma.passwordResetToken.findUnique({ where: { tokenHash } });
    if (!record || record.usedAt || record.expiresAt < new Date()) {
      return { ok: false, error: 'Token yaroqsiz yoki muddati tugagan' };
    }
    let passwordHash: string;
    try {
      passwordHash = await hashPassword(input.password);
    } catch (err) {
      console.error('[Auth] Password hashing failed:', err);
      return { ok: false, error: 'Parolni saqlashda xatolik yuz berdi' };
    }
    await prisma.$transaction([
      prisma.user.update({ where: { id: record.userId }, data: { passwordHash } }),
      prisma.passwordResetToken.update({ where: { id: record.id }, data: { usedAt: new Date() } }),
      prisma.accountLock.deleteMany({ where: { userId: record.userId } }),
    ]);
    await logSecurityEvent({ action: 'PASSWORD_RESET_SUCCESS', userId: record.userId });
    return { ok: true };
  } catch (err) {
    console.error('[Auth] resetPassword failed:', err);
    return { ok: false, error: 'Parolni tiklashda xatolik yuz berdi' };
  }
}

function cryptoRandomToken(): string {
  return crypto.randomBytes(32).toString('hex');
}
