/**
 * src/lib/security/password.ts
 * Password hashing & verification.
 * Uses argon2id by default (the current OWASP recommendation). If argon2 is not
 * installed it transparently falls back to bcrypt so the app still builds/runs.
 */

import crypto from 'node:crypto';

export interface PasswordHasher {
  hash(plain: string): Promise<string>;
  verify(hash: string, plain: string): Promise<boolean>;
}

// ── argon2 (preferred) ───────────────────────────────────────────────
async function loadArgon2(): Promise<PasswordHasher | null> {
  try {
    const mod = (await (Function('return import("argon2")')() as Promise<any>).catch(() => null)) as any;
    if (!mod) return null;
    const argon2 = mod.default ?? mod;
    if (typeof argon2?.hash !== 'function') return null;
    return {
      hash: (plain: string) => argon2.hash(plain, { type: argon2.argon2id, memoryCost: 2 ** 16, timeCost: 3 }),
      verify: (hash: string, plain: string) => argon2.verify(hash, plain),
    };
  } catch {
    return null;
  }
}

// ── bcrypt (fallback) ────────────────────────────────────────────────
async function loadBcrypt(): Promise<PasswordHasher | null> {
  try {
    const mod = (await (Function('return import("bcryptjs")')() as Promise<any>).catch(() => null)) as any;
    if (!mod) return null;
    const bcrypt = mod.default ?? mod;
    if (typeof bcrypt?.hash !== 'function') return null;
    const ROUNDS = 12;
    return {
      hash: (plain: string) => bcrypt.hash(plain, ROUNDS),
      verify: (hash: string, plain: string) => bcrypt.compare(plain, hash),
    };
  } catch {
    return null;
  }
}

// ── scrypt (built-in, last resort — always available) ───────────────
const SCRYPT: PasswordHasher = {
  async hash(plain: string) {
    const salt = crypto.randomBytes(16);
    return new Promise<string>((resolve, reject) => {
      crypto.scrypt(plain, salt, 64, (err, derived) => {
        if (err) return reject(err);
        resolve(`scrypt$${salt.toString('hex')}$${derived.toString('hex')}`);
      });
    });
  },
  async verify(hash: string, plain: string) {
    const [scheme, saltHex, derivedHex] = hash.split('$');
    if (scheme !== 'scrypt' || !saltHex || !derivedHex) return false;
    const salt = Buffer.from(saltHex, 'hex');
    const derived = Buffer.from(derivedHex, 'hex');
    return new Promise<boolean>((resolve, reject) => {
      crypto.scrypt(plain, salt, 64, (err, candidate) => {
        if (err) return reject(err);
        resolve(crypto.timingSafeEqual(derived, candidate));
      });
    });
  },
};

let hasher: PasswordHasher | null = null;
let resolver: Promise<PasswordHasher> | null = null;

export async function getPasswordHasher(): Promise<PasswordHasher> {
  if (hasher) return hasher;
  if (!resolver) {
    resolver = (async () => {
      hasher = (await loadArgon2()) ?? (await loadBcrypt()) ?? SCRYPT;
      return hasher;
    })();
  }
  return resolver;
}

export async function hashPassword(plain: string): Promise<string> {
  return (await getPasswordHasher()).hash(plain);
}

export async function verifyPassword(hash: string, plain: string): Promise<boolean> {
  if (!hash) return false;
  try {
    return await (await getPasswordHasher()).verify(hash, plain);
  } catch {
    return false;
  }
}
