/**
 * src/lib/security/request-context.ts
 * Helpers to extract client IP & user-agent from a Request. Used for audit logs.
 */

import type { NextRequest } from 'next/server';

export function getClientIp(req: NextRequest | Request): string {
  if ('headers' in req) {
    const fwd = req.headers.get('x-forwarded-for');
    if (fwd) return fwd.split(',')[0].trim();
    const real = req.headers.get('x-real-ip');
    if (real) return real.trim();
  }
  return 'unknown';
}

export function getUserAgent(req: NextRequest | Request): string {
  return req.headers.get('user-agent') ?? 'unknown';
}

export function getClientMeta(req: NextRequest | Request) {
  return { ip: getClientIp(req), userAgent: getUserAgent(req) };
}

