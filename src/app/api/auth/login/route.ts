/**
 * POST /api/auth/login
 * Authenticates a user and sets a signed, HttpOnly session cookie + CSRF cookie.
 */
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { loginSchema } from '@/validation/auth';
import { loginUser } from '@/modules/auth/auth.service';
import { sessionCookieName, isProd } from '@/lib/env';
import { CSRF_COOKIE_NAME } from '@/lib/auth';
import { withApiHandler, rateLimitHeaders } from '@/lib/security/api-response';
import { rateLimit, RATE_LIMITS } from '@/lib/security/rate-limit';
import { securityHeadersInit } from '@/lib/security/headers';
import { getClientIp } from '@/lib/security/request-context';

export const POST = withApiHandler(async (req) => {
  const ip = getClientIp(req);
  const limit = rateLimit(ip, RATE_LIMITS.login);
  if (!limit.success) {
    return NextResponse.json(
      { success: false, error: 'Juda ko‘p urinish. Keyinroq urinib ko‘ring.' },
      { status: 429, headers: { ...securityHeadersInit(), ...rateLimitHeaders(limit) } },
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'Noto‘g‘ri ma’lumotlar', fields: parsed.error.flatten().fieldErrors },
      { status: 422, headers: securityHeadersInit() },
    );
  }

  const result = await loginUser({
    email: parsed.data.email,
    password: parsed.data.password,
    rememberMe: parsed.data.rememberMe,
    req,
  });

  if (!result.ok) {
    const status = result.locked ? 423 : 401;
    return NextResponse.json(
      { success: false, error: result.error, locked: result.locked, lockMinutes: result.lockMinutes },
      { status, headers: { ...securityHeadersInit(), ...rateLimitHeaders(limit) } },
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(sessionCookieName(), result.token!, {
    httpOnly: true,
    secure: isProd(),
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  cookieStore.set(CSRF_COOKIE_NAME, result.csrf!, {
    httpOnly: false,
    secure: isProd(),
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json(
    { success: true, user: result.user },
    { status: 200, headers: { ...securityHeadersInit(), ...rateLimitHeaders(limit) } },
  );
});
