/**
 * POST /api/auth/login
 * Authenticates a user and sets a signed, HttpOnly session cookie + CSRF cookie.
 *
 * NEXT.JS 16 NOTE: cookies().set() BEFORE NextResponse.json() does NOT
 * apply cookies to the response. We MUST use response.cookies.set() on
 * the returned NextResponse object.
 */
import { NextResponse } from 'next/server';
import { loginSchema } from '@/validation/auth';
import { loginUser } from '@/modules/auth/auth.service';
import { sessionCookieName, isProd } from '@/lib/env';
import { CSRF_COOKIE_NAME } from '@/lib/auth';
import { withApiHandler, rateLimitHeaders } from '@/lib/security/api-response';
import { rateLimit, RATE_LIMITS } from '@/lib/security/rate-limit';
import { securityHeadersInit } from '@/lib/security/headers';
import { getClientIp } from '@/lib/security/request-context';

export const POST = withApiHandler(async (req) => {
  // ── Rate limiting ──────────────────────────────────────────────────
  const ip = getClientIp(req);
  const limit = rateLimit(ip, RATE_LIMITS.login);
  if (!limit.success) {
    return NextResponse.json(
      { success: false, error: 'Juda ko‘p urinish. Keyinroq urinib ko‘ring.' },
      { status: 429, headers: { ...securityHeadersInit(), ...rateLimitHeaders(limit) } },
    );
  }

  // ── Validate request body ──────────────────────────────────────────
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json(
      { success: false, error: 'So‘rov formati noto‘g‘ri' },
      { status: 400, headers: securityHeadersInit() },
    );
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'Noto‘g‘ri ma’lumotlar', fields: parsed.error.flatten().fieldErrors },
      { status: 422, headers: securityHeadersInit() },
    );
  }

  // ── Authenticate user ───────────────────────────────────────────────
  let result: {
    ok: boolean;
    token?: string;
    csrf?: string;
    user?: { id: string; email: string; name: string };
    error?: string;
    locked?: boolean;
    lockMinutes?: number;
  };
  try {
    result = await loginUser({
      email: parsed.data.email,
      password: parsed.data.password,
      rememberMe: parsed.data.rememberMe,
      req,
    });
  } catch (err) {
    console.error('[Login] loginUser threw:', err);
    return NextResponse.json(
      { success: false, error: 'Kirishda xatolik yuz berdi. Administrator bilan bog‘laning.' },
      { status: 500, headers: { ...securityHeadersInit(), ...rateLimitHeaders(limit) } },
    );
  }

  if (!result.ok) {
    const status = result.locked ? 423 : 401;
    return NextResponse.json(
      {
        success: false,
        error: result.error,
        locked: result.locked,
        lockMinutes: result.lockMinutes,
      },
      { status, headers: { ...securityHeadersInit(), ...rateLimitHeaders(limit) } },
    );
  }

  // ── Set cookies (CRITICAL: response.cookies.set() not cookies().set()) ──
  const response = NextResponse.json(
    { success: true, user: result.user },
    { status: 200, headers: { ...securityHeadersInit(), ...rateLimitHeaders(limit) } },
  );

  const cookieOptions = {
    httpOnly: true,
    secure: isProd(),
    sameSite: 'strict' as const,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  };

  response.cookies.set(sessionCookieName(), result.token!, cookieOptions);
  response.cookies.set(CSRF_COOKIE_NAME, result.csrf!, {
    ...cookieOptions,
    httpOnly: false,
  });

  return response;
});
