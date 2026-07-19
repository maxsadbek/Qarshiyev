/**
 * POST /api/auth/logout
 * Revokes the session server-side and clears the session + CSRF cookies.
 *
 * NEXT.JS 16 NOTE: cookies().delete() BEFORE NextResponse.json() does
 * NOT apply to the response. Use response.cookies.delete() on the
 * returned NextResponse object.
 */
import { NextResponse } from 'next/server';
import { sessionCookieName } from '@/lib/env';
import { CSRF_COOKIE_NAME } from '@/lib/auth';
import { logoutUser } from '@/modules/auth/auth.service';
import { withApiHandler, securityHeadersInit } from '@/lib/security/api-response';

export const POST = withApiHandler(async (req) => {
  // Extract token from NextRequest.cookies (no manual header parsing needed)
  const token = req.cookies.get(sessionCookieName())?.value;

  try {
    await logoutUser(req, token);
  } catch (err) {
    console.error('[Logout] logoutUser threw:', err);
    // Continue to clear cookies even if revocation fails
  }

  const response = NextResponse.json(
    { success: true },
    { status: 200, headers: securityHeadersInit() },
  );

  response.cookies.delete(sessionCookieName());
  response.cookies.delete(CSRF_COOKIE_NAME);

  return response;
});
