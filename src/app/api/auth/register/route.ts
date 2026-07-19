/**
 * POST /api/auth/register
 * Registers a new user and sets the session + CSRF cookies.
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
  const ip = getClientIp(req);
  const limit = rateLimit(ip, RATE_LIMITS.register);
  if (!limit.success) {
    return NextResponse.json(
      { success: false, error: 'Juda ko‘p urinish. Keyinroq urinib ko‘ring.' },
      { status: 429, headers: { ...securityHeadersInit(), ...rateLimitHeaders(limit) } },
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'Noto‘g‘ri ma’lumotlar', fields: parsed.error.flatten().fieldErrors },
      { status: 422, headers: securityHeadersInit() },
    );
  }

  const result = await registerUser({
    name: parsed.data.name,
    email: parsed.data.email,
    password: parsed.data.password,
    req,
  });

  if (!result.ok) {
    return NextResponse.json(
      { success: false, error: result.error },
      { status: 409, headers: { ...securityHeadersInit(), ...rateLimitHeaders(limit) } },
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
    { success: true, message: 'Ro‘yxatdan o‘tish muvaffaqiyatli' },
    { status: 200, headers: { ...securityHeadersInit(), ...rateLimitHeaders(limit) } },
  );
});
