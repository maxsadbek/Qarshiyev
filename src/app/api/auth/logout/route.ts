/**
 * POST /api/auth/logout
 * Revokes the session server-side and clears the session + CSRF cookies.
 */
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { sessionCookieName } from '@/lib/env';
import { CSRF_COOKIE_NAME } from '@/lib/auth';
import { logoutUser } from '@/modules/auth/auth.service';
import { withApiHandler, securityHeadersInit } from '@/lib/security/api-response';

export const POST = withApiHandler(async (req) => {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookieName())?.value;

  await logoutUser(req, token);

  cookieStore.delete(sessionCookieName());
  cookieStore.delete(CSRF_COOKIE_NAME);

  return NextResponse.json({ success: true }, { status: 200, headers: securityHeadersInit() });
});
