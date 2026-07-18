/**
 * src/lib/security/session.ts
 * Secure session token issued after authentication.
 *
 * The token is a compact, HMAC-signed (HS256) JWT carrying:
 *   - sub: user id
 *   - sid: opaque session id (stored hashed in DB for revocation)
 *   - role: role name (cached to avoid a DB hit on every request)
 *   - csrf: short random token (double-submit cookie for CSRF protection)
 *   - exp / iat
 *
 * The signature uses AUTH_SECRET. Plaintext userId-in-cookie auth is gone.
 */

import crypto from 'node:crypto';

const AUTH_SECRET = () => {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error('AUTH_SECRET is not configured');
  return secret;
};

const base64url = (buf: Buffer) => buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const fromBase64url = (s: string) => Buffer.from(s.replace(/-/g, '+').replace(/_/g, '/'), 'base64');

function sign(data: string): string {
  return base64url(crypto.createHmac('sha256', AUTH_SECRET()).update(data).digest());
}

function verifySignature(data: string, sig: string): boolean {
  const expected = sign(data);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export interface SessionPayload {
  sub: string;
  sid: string;
  role: string;
  csrf: string;
  iat: number;
  exp: number;
}

const REMEMBER_ME_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

export function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/** Hash a session token / reset token for DB storage (never store raw secrets). */
export function sha256(value: string): string {
  return crypto.createHash('sha256').update(value).digest('hex');
}

export function createSessionToken(opts: { userId: string; sessionId: string; role: string; rememberMe?: boolean }): string {
  const csrf = generateCsrfToken();
  const iat = Math.floor(Date.now() / 1000);
  const ttl = opts.rememberMe ? REMEMBER_ME_TTL_SECONDS : SESSION_TTL_SECONDS;
  const exp = iat + ttl;
  const payload: SessionPayload = {
    sub: opts.userId,
    sid: opts.sessionId,
    role: opts.role,
    csrf,
    iat,
    exp,
  };
  const body = base64url(Buffer.from(JSON.stringify(payload)));
  const sig = sign(body);
  return `${body}.${sig}`;
}

export function verifySessionToken(token: string | undefined | null): SessionPayload | null {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [body, sig] = parts;
  if (!verifySignature(body, sig)) return null;
  try {
    const payload = JSON.parse(fromBase64url(body).toString('utf8')) as SessionPayload;
    if (typeof payload.exp !== 'number' || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    if (!payload.sub || !payload.sid || !payload.csrf) return null;
    return payload;
  } catch {
    return null;
  }
}

export const SESSION_TTL = { rememberMe: REMEMBER_ME_TTL_SECONDS, session: SESSION_TTL_SECONDS };
