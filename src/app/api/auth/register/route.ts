/**
 * POST /api/auth/register
 * Registers a new user and sets the session + CSRF cookies.
 *
 * NEXT.JS 16 NOTE: cookies().set() BEFORE NextResponse.json() does NOT
 * apply cookies to the response. We MUST use response.cookies.set() on
 * the returned NextResponse object instead.
 */
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { registerSchema } from '@/validation/auth';
import { registerUser } from '@/modules/auth/auth.service';
import { sessionCookieName, isProd } from '@/lib/env';
import { CSRF_COOKIE_NAME } from '@/lib/auth';
import { withApiHandler, securityHeadersInit, rateLimitHeaders } from '@/lib/security/api-response';
import { rateLimit, RATE_LIMITS } from '@/lib/security/rate-limit';
import { getClientIp } from '@/lib/security/request-context';

export const POST = withApiHandler(async (req) => {
  // ── Rate limiting ──────────────────────────────────────────────────
  const ip = getClientIp(req);
  const limit = rateLimit(ip, RATE_LIMITS.register);
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

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'Noto‘g‘ri ma’lumotlar', fields: parsed.error.flatten().fieldErrors },
      { status: 422, headers: securityHeadersInit() },
    );
  }

  // ── Register user ───────────────────────────────────────────────────
  let result: { ok: boolean; error?: string; token?: string; csrf?: string };
  try {
    result = await registerUser({
      name: parsed.data.name,
      email: parsed.data.email,
      password: parsed.data.password,
      req,
    });
  } catch (err) {
    // Log the FULL error (never lose the real cause in production)
    console.error('[Register] registerUser threw:', err);
    return NextResponse.json(
      { success: false, error: 'Ro‘yxatdan o‘tishda xatolik yuz berdi. Administrator bilan bog‘laning.' },
      { status: 500, headers: { ...securityHeadersInit(), ...rateLimitHeaders(limit) } },
    );
  }

  if (!result.ok) {
    return NextResponse.json(
      { success: false, error: result.error },
      { status: 409, headers: { ...securityHeadersInit(), ...rateLimitHeaders(limit) } },
    );
  }

  // ── Set cookies ─────────────────────────────────────────────────────
  // CRITICAL: In Next.js 16, cookies().set() does NOT apply to the
  // response when called before NextResponse.json() is created.
  // We must create the response FIRST, then set cookies on it.
  const response = NextResponse.json(
    { success: true, message: 'Ro‘yxatdan o‘tish muvaffaqiyatli' },
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
