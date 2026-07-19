/**
 * src/lib/auth.ts
 * Authentication & authorization stubs.
 *
 * AUTH IS NOW HANDLED CLIENT-SIDE VIA localStorage (src/lib/local-auth.ts).
 * This file provides backward-compatible stubs for server components and API
 * routes that previously relied on Prisma-backed sessions. All server-side
 * auth resolution returns null/unauthenticated.
 */

import { cookies } from 'next/headers';

// ── Session resolution ─────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  telegramId: string | null;
  isActive: boolean;
}

export interface ResolvedSession {
  token: any;
  user: AuthUser;
}

export async function resolveSession(): Promise<ResolvedSession | null> {
  // Server-side sessions are disabled. Auth is handled client-side via localStorage.
  return null;
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
  throw new AuthError('UNAUTHENTICATED', 'Authentication required');
}

// ── CSRF protection (double-submit cookie) ─────────────────────────────

export const CSRF_COOKIE_NAME = 'qarshiyev_csrf';

export async function getCsrfToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(CSRF_COOKIE_NAME)?.value ?? null;
}

export async function verifyCsrf(req: Request): Promise<boolean> {
  if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS') return true;
  // CSRF verification is disabled — auth is now localStorage-based
  return true;
}

// ── Session issuance / revocation (stubs) ──────────────────────────────

export interface IssueSessionResult {
  token: string;
  csrf: string;
}

export async function issueSession(_opts: {
  userId: string;
  rememberMe?: boolean;
  ip?: string;
  userAgent?: string;
}): Promise<IssueSessionResult> {
  // Stub — sessions are handled client-side via localStorage
  return { token: '', csrf: '' };
}

export async function revokeSession(_sessionToken: string | undefined): Promise<void> {
  // Stub
}

// ── Backward-compatible helpers ────────────────────────────────────────

export interface CurrentUser {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  telegramId: string | null;
  isActive: boolean;
  student?: any;
  createdAt: Date;
}

/**
 * Stub — always returns null since auth is now client-side.
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  return null;
}
