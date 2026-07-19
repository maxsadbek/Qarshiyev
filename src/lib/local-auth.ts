/**
 * src/lib/local-auth.ts
 * Frontend-only authentication using browser localStorage.
 * No Prisma, no PostgreSQL — works offline and on Vercel without DATABASE_URL.
 *
 * Password hashing uses bcryptjs (pure JS, works in the browser).
 */

import bcrypt from 'bcryptjs';

// ── Storage keys ──────────────────────────────────────────────────────

const USERS_KEY = 'qarshiyev_users';
const SESSION_KEY = 'qarshiyev_session';

// ── Types ─────────────────────────────────────────────────────────────

export interface LocalUser {
  id: string;
  name: string;
  email: string;
  password: string; // bcrypt hash
  createdAt: string;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface LocalSession {
  currentUser: SessionUser;
  isAuthenticated: boolean;
}

export interface AuthResult {
  ok: boolean;
  error?: string;
}

// ── UUID generator (no crypto dependency) ──────────────────────────────

function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for environments without crypto.randomUUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// ── User storage ──────────────────────────────────────────────────────

function getUsers(): LocalUser[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as LocalUser[]) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: LocalUser[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function findUserByEmail(email: string): LocalUser | undefined {
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

// ── Session management ────────────────────────────────────────────────

export function getSession(): LocalSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as LocalSession;
    if (!session.isAuthenticated || !session.currentUser) return null;
    return session;
  } catch {
    return null;
  }
}

function saveSession(user: SessionUser): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ currentUser: user, isAuthenticated: true }),
  );
}

function clearSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SESSION_KEY);
}

// ── Auth operations ───────────────────────────────────────────────────

export async function registerUser(
  name: string,
  email: string,
  password: string,
): Promise<AuthResult> {
  try {
    // Validate inputs
    if (!name.trim() || !email.trim() || !password) {
      return { ok: false, error: 'Barcha maydonlarni to‘ldiring' };
    }

    if (password.length < 8) {
      return { ok: false, error: 'Parol kamida 8 ta belgidan iborat bo‘lishi kerak' };
    }
    if (!/[A-Za-z]/.test(password)) {
      return { ok: false, error: 'Parolda harf bo‘lishi shart' };
    }
    if (!/[0-9]/.test(password)) {
      return { ok: false, error: 'Parolda raqam bo‘lishi shart' };
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check for existing user
    const existing = findUserByEmail(normalizedEmail);
    if (existing) {
      return { ok: false, error: 'Bu email allaqachon ro‘yxatdan o‘tgan' };
    }

    // Hash password using bcryptjs
    const salt = bcrypt.genSaltSync(12);
    const passwordHash = bcrypt.hashSync(password, salt);

    // Create user
    const user: LocalUser = {
      id: generateId(),
      name: name.trim(),
      email: normalizedEmail,
      password: passwordHash,
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    const users = getUsers();
    users.push(user);
    saveUsers(users);

    // Auto-login: save session (without password)
    saveSession({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    });

    return { ok: true };
  } catch (err) {
    console.error('[LocalAuth] registerUser error:', err);
    return { ok: false, error: 'Ro‘yxatdan o‘tishda xatolik yuz berdi' };
  }
}

export async function loginUser(
  email: string,
  password: string,
): Promise<AuthResult> {
  try {
    if (!email.trim() || !password) {
      return { ok: false, error: 'Email va parolni kiriting' };
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = findUserByEmail(normalizedEmail);

    if (!user) {
      return { ok: false, error: 'Email yoki parol noto‘g‘ri' };
    }

    // Verify password using bcryptjs
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      return { ok: false, error: 'Email yoki parol noto‘g‘ri' };
    }

    // Save session
    saveSession({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    });

    return { ok: true };
  } catch (err) {
    console.error('[LocalAuth] loginUser error:', err);
    return { ok: false, error: 'Kirishda xatolik yuz berdi' };
  }
}

export function logoutUser(): void {
  clearSession();
}

export function isAuthenticated(): boolean {
  const session = getSession();
  return session !== null && session.isAuthenticated;
}

export function getCurrentSessionUser(): SessionUser | null {
  const session = getSession();
  return session?.currentUser ?? null;
}
