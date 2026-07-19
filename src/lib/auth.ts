/**
 * src/lib/auth.ts
 * Authentication & authorization for Server Components, Route Handlers and
 * Server Actions.
 *
 * Replaces the previous plain-userId-cookie approach with a signed session
 * token (HS256) carrying a DB-backed session id, role and CSRF token.
 */

import { cookies } from 'next/headers';
import crypto from 'node:crypto';
import prisma from './prisma';
import { sessionCookieName } from './env';
import {
  verifySessionToken,
  createSessionToken,
  sha256,
  type SessionPayload,
} from './security/session';
import { normalizeRoleName, roleHasPermission, type Permission, type RoleName, ROLE } from '@/modules/rbac/roles';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  telegramId: string | null;
  roleId: string;
  roleName: RoleName;
  isActive: boolean;
}

// ── Session resolution ─────────────────────────────────────────────────

export interface ResolvedSession {
  token: SessionPayload;
  user: AuthUser;
}

const ROLE_CACHE = new Map<string, RoleName>();
async function loadRoleName(roleId: string): Promise<RoleName> {
  const cached = ROLE_CACHE.get(roleId);
  if (cached) return cached;
  const role = await prisma.role.findUnique({ where: { id: roleId }, select: { name: true } });
  const name = normalizeRoleName(role?.name ?? 'STUDENT');
  ROLE_CACHE.set(roleId, name);
  return name;
}

export async function resolveSession(): Promise<ResolvedSession | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(sessionCookieName())?.value;
  const payload = verifySessionToken(raw);
  if (!payload) return null;

  const session = await prisma.session.findFirst({
    where: { token: sha256(raw!), revokedAt: null, expiresAt: { gt: new Date() } },
    select: { id: true },
  });
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      telegramId: true,
      roleId: true,
      isActive: true,
    },
  });
  if (!user || !user.isActive) return null;

  const roleName = await loadRoleName(user.roleId);
  if (roleName !== payload.role) return null; // role changed → force re-login

  return {
    token: payload,
    user: { ...user, roleName },
  };
}

// ── Guards (Server Components / Actions) ───────────────────────────────

export class AuthError extends Error {
  code: 'UNAUTHENTICATED' | 'FORBIDDEN' | 'INACTIVE';
  constructor(code: 'UNAUTHENTICATED' | 'FORBIDDEN' | 'INACTIVE', message: string) {
    super(message);
    this.code = code;
  }
}

export async function requireUser(): Promise<ResolvedSession> {
  const session = await resolveSession();
  if (!session) throw new AuthError('UNAUTHENTICATED', 'Authentication required');
  if (!session.user.isActive) throw new AuthError('INACTIVE', 'Account is disabled');
  return session;
}

export async function requireRole(...roles: RoleName[]): Promise<ResolvedSession> {
  const session = await requireUser();
  if (!roles.includes(session.user.roleName)) {
    throw new AuthError('FORBIDDEN', 'Insufficient permissions');
  }
  return session;
}

export async function requirePermission(permission: Permission): Promise<ResolvedSession> {
  const session = await requireUser();
  if (!roleHasPermission(session.user.roleName, permission)) {
    throw new AuthError('FORBIDDEN', 'Insufficient permissions');
  }
  return session;
}

// ── CSRF protection (double-submit cookie) ─────────────────────────────

export const CSRF_COOKIE_NAME = 'qarshiyev_csrf';

export async function getCsrfToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(CSRF_COOKIE_NAME)?.value ?? null;
}

export async function verifyCsrf(req: Request): Promise<boolean> {
  if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS') return true;
  const cookieStore = await cookies();
  const cookieToken = cookieStore.get(CSRF_COOKIE_NAME)?.value;
  const headerToken = req.headers.get('x-csrf-token') || req.headers.get('x-xsrf-token');
  if (!cookieToken || !headerToken) return false;
  const a = Buffer.from(cookieToken);
  const b = Buffer.from(headerToken);
  if (a.length !== b.length) return false;
  try {
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

// ── Session issuance / revocation ──────────────────────────────────────

export interface IssueSessionResult {
  token: string;
  csrf: string;
}

export async function issueSession(opts: {
  userId: string;
  roleName: RoleName;
  rememberMe?: boolean;
  ip?: string;
  userAgent?: string;
}): Promise<IssueSessionResult> {
  const sessionId = crypto.randomUUID();
  const token = createSessionToken({
    userId: opts.userId,
    sessionId,
    role: opts.roleName,
    rememberMe: opts.rememberMe,
  });
  // Extract csrf from the freshly created token payload (re-verify to read it)
  const payload = verifySessionToken(token)!;
  const ttlMs = opts.rememberMe ? 30 * 24 * 3600 * 1000 : 7 * 24 * 3600 * 1000;
  await prisma.session.create({
    data: {
      id: sessionId,
      token: sha256(token),
      userId: opts.userId,
      ipAddress: opts.ip,
      userAgent: opts.userAgent,
      expiresAt: new Date(Date.now() + ttlMs),
    },
  });
  return { token, csrf: payload.csrf };
}

export async function revokeSession(sessionToken: string | undefined): Promise<void> {
  if (!sessionToken) return;
  await prisma.session.updateMany({
    where: { token: sha256(sessionToken), revokedAt: null },
    data: { revokedAt: new Date() },
  });
}

// ── Backward-compatible helpers (used by existing student/admin pages) ──

export interface CurrentUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  telegramId: string | null;
  isActive: boolean;
  role: { id: string; name: string };
  student?: {
    id: string;
    applications: Array<{
      id: string;
      status: string;
      notes: string | null;
      createdAt: Date;
      course: { title: string; language: { name: string }; price: number; description: string; teacher: { user: { firstName: string; lastName: string }; specialization: string | null; experienceYears: number } };
    }>;
    district?: { name: string; region: { name: string } } | null;
  } | null;
  createdAt: Date;
}

/**
 * Resolves the current user (with the student profile + applications eagerly
 * loaded) for Server Components that previously called getCurrentUser().
 * Returns null when unauthenticated or inactive.
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await resolveSession();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      role: { select: { id: true, name: true } },
      student: {
        include: {
          applications: {
            include: {
              course: {
                select: {
                  id: true,
                  title: true,
                  description: true,
                  price: true,
                  language: { select: { name: true } },
                  teacher: { select: { specialization: true, experienceYears: true, user: { select: { firstName: true, lastName: true } } } },
                },
              },
            },
            orderBy: { createdAt: 'desc' },
          },
          district: { include: { region: { select: { name: true } } } },
        },
      },
    },
  });
  if (!user) return null;
  return user as unknown as CurrentUser;
}

export async function requireStudentAuth() {
  const session = await requireUser();
  if (session.user.roleName !== ROLE.STUDENT && session.user.roleName !== ROLE.TEACHER && session.user.roleName !== ROLE.ADMIN && session.user.roleName !== ROLE.OWNER) {
    throw new AuthError('FORBIDDEN', 'FORBIDDEN');
  }
  return getCurrentUser();
}

