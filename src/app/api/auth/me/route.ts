/**
 * GET /api/auth/me
 * Returns the authenticated user (or null if not logged in).
 * Returns 200 even when not authenticated so the browser doesn't
 * log a spurious 401 error in the console.
 */
import { NextResponse } from 'next/server';
import { resolveSession } from '@/lib/auth';
import { withApiHandler, securityHeadersInit } from '@/lib/security/api-response';

export const GET = withApiHandler(async () => {
  const session = await resolveSession();
  if (!session) {
    return NextResponse.json(
      { success: true, authenticated: false, user: null },
      { status: 200, headers: securityHeadersInit() },
    );
  }
  return NextResponse.json(
    {
      success: true,
      authenticated: true,
      user: {
        id: session.user.id,
        email: session.user.email,
        firstName: session.user.firstName,
        lastName: session.user.lastName,
        role: session.user.roleName,
      },
    },
    { status: 200, headers: securityHeadersInit() },
  );
});

