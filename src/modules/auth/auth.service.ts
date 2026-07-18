/**
 * src/modules/auth/auth.service.ts
 * Real authentication service: registration, login (with account lockout),
 * logout, remember-me, and password reset flow.
 *
 * Uses Argon2/bcrypt password hashing, signed DB-backed sessions, and writes
 * security events to the activity log.
 */

import crypto from 'node:crypto';
import prisma from '../../lib/prisma';
import { hashPassword, verifyPassword } from '../../lib/security/password';
import { sha256 } from '../../lib/security/session';
import { issueSession, revokeSession, type IssueSessionResult } from '../../lib/auth';
import { ROLE, normalizeRoleName, type RoleName } from '@/modules/rbac/roles';
import { logSecurityEvent, type SecurityEventInput } from '../../lib/security/logger';
import { getClientIp, getUserAgent } from '../../lib/security/request-context';

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_DURATION_MINUTES = 15;

export interface LoginResult {
  ok: boolean;
  token?: string;
  csrf?: string;
  user?: { id: string; email: string; role: RoleName };
  error?: string;
  locked?: boolean;
  lockMinutes?: number;
}

async function buildClientMeta(req: Request) {
  return { ip: getClientIp(req), userAgent: getUserAgent(req) };
}

async function recordSecurity(req: Request, input: Omit<SecurityEventInput, 'ipAddress' | 'userAgent'>) {
  const { ip, userAgent } = await buildClientMeta(req);
  return logSecurityEvent({ ...input, ipAddress: ip, userAgent: userAgent });
}

export async function registerUser(input: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  role?: RoleName;
  req: Request;
}): Promise<{ ok: boolean; error?: string; token?: string; csrf?: string }> {
  const email = input.email.trim().toLowerCase();
  const normalizedRole = input.role ?? ROLE.STUDENT;
  const role = await prisma.role.findUnique({ where: { name: normalizedRole } });
  if (!role) return { ok: false, error: 'Invalid role' };

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    await recordSecurity(input.req, { action: 'REGISTRATION', details: { email, reason: 'email_exists' } });
    return { ok: false, error: 'Bu email allaqachon ro‘yxatdan o‘tgan' };
  }

  const passwordHash = await hashPassword(input.password);
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      firstName: input.firstName.trim(),
      lastName: input.lastName.trim(),
      phone: input.phone?.trim() || null,
      roleId: role.id,
      isActive: true,
      student: normalizedRole === ROLE.STUDENT ? { create: {} } : undefined,
    },
  });

  const meta = await buildClientMeta(input.req);
  const issued: IssueSessionResult = await issueSession({
    userId: user.id,
    roleName: normalizedRole,
    ip: meta.ip,
    userAgent: meta.userAgent,
  });
  await recordSecurity(input.req, { action: 'REGISTRATION', userId: user.id, entity: 'User', entityId: user.id });

  // No plaintext password stored, so nothing to sanitize.
  return { ok: true, token: issued.token, csrf: issued.csrf };
}

export async function loginUser(input: {
  email: string;
  password: string;
  rememberMe?: boolean;
  req: Request;
}): Promise<LoginResult> {
  const email = input.email.trim().toLowerCase();
  const meta = await buildClientMeta(input.req);

  const user = await prisma.user.findUnique({ where: { email }, include: { role: true } });

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
    // Constant-time-ish: still hash to avoid user enumeration timing differences.
    await verifyPassword('dummy', '$argon2id$v=19$m=65536,t=3,p=4$Zm9vYmFyYmF6$b25lZm9vYmFyYmF6');
    await recordSecurity(input.req, { action: 'LOGIN_FAILED', details: { email, reason: 'no_user' } });
    return { ok: false, error: 'Email yoki parol noto‘g‘ri' };
  }

  const passwordMatch = await verifyPassword(user.passwordHash, input.password);
  if (!passwordMatch) {
    await incrementFailedAttempts(user.id);
    await recordSecurity(input.req, { action: 'LOGIN_FAILED', userId: user.id, details: { reason: 'bad_password' } });
    const lock = await prisma.accountLock.findUnique({ where: { userId: user.id } });
    if (lock?.lockedUntil && lock.lockedUntil > new Date()) {
      return { ok: false, error: 'Hisob vaqtincha bloklangan', locked: true, lockMinutes: LOCK_DURATION_MINUTES };
    }
    return { ok: false, error: 'Email yoki parol noto‘g‘ri' };
  }

  // Success → reset failed attempts
  await prisma.accountLock.deleteMany({ where: { userId: user.id } });

  const roleName = normalizeRoleName(user.role.name);
  const issued = await issueSession({
    userId: user.id,
    roleName,
    rememberMe: input.rememberMe,
    ip: meta.ip,
    userAgent: meta.userAgent,
  });

  await prisma.user.update({ where: { id: user.id }, data: { lastLogin: new Date() } });
  await recordSecurity(input.req, { action: 'LOGIN_SUCCESS', userId: user.id });

  return {
    ok: true,
    token: issued.token,
    csrf: issued.csrf,
    user: { id: user.id, email: user.email, role: roleName },
  };
}

async function incrementFailedAttempts(userId: string) {
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
}

export async function logoutUser(req: Request, sessionToken?: string): Promise<void> {
  const meta = await buildClientMeta(req);
  if (sessionToken) await revokeSession(sessionToken);
  await logSecurityEvent({
    action: 'LOGOUT',
    ipAddress: meta.ip,
    userAgent: meta.userAgent,
    details: sessionToken ? { reason: 'explicit' } : { reason: 'no_session' },
  });
}

// ── Password reset flow ────────────────────────────────────────────────

export async function requestPasswordReset(input: { email: string; req: Request }): Promise<{ ok: boolean; token?: string }> {
  // Always return ok to avoid email enumeration.
  const email = input.email.trim().toLowerCase();
  const user = await prisma.user.findUnique({ where: { email } });
  if (user && user.isActive) {
    // Invalidate prior unused tokens
    await prisma.passwordResetToken.updateMany({
      where: { userId: user.id, usedAt: null },
      data: { usedAt: new Date() },
    });
    const rawToken = cryptoRandomToken();
    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash: sha256(rawToken),
        expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      },
    });
    await recordSecurity(input.req, { action: 'PASSWORD_RESET_REQUESTED', userId: user.id });
    return { ok: true, token: rawToken };
  }
  await recordSecurity(input.req, { action: 'PASSWORD_RESET_REQUESTED', details: { email, reason: 'no_user' } });
  return { ok: true };
}

export async function resetPassword(input: { token: string; password: string }): Promise<{ ok: boolean; error?: string }> {
  const tokenHash = sha256(input.token);
  const record = await prisma.passwordResetToken.findUnique({ where: { tokenHash } });
  if (!record || record.usedAt || record.expiresAt < new Date()) {
    return { ok: false, error: 'Token yaroqsiz yoki muddati tugagan' };
  }
  const passwordHash = await hashPassword(input.password);
  await prisma.$transaction([
    prisma.user.update({ where: { id: record.userId }, data: { passwordHash } }),
    prisma.passwordResetToken.update({ where: { id: record.id }, data: { usedAt: new Date() } }),
    prisma.accountLock.deleteMany({ where: { userId: record.userId } }),
  ]);
  await logSecurityEvent({ action: 'PASSWORD_RESET_SUCCESS', userId: record.userId });
  return { ok: true };
}

function cryptoRandomToken(): string {
  return crypto.randomBytes(32).toString('hex');
}
