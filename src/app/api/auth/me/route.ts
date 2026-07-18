/**
 * GET /api/auth/me
 * Returns the authenticated user (or 401 if not logged in).
 */
import { NextResponse } from 'next/server';
import { resolveSession } from '@/lib/auth';
import { withApiHandler, securityHeadersInit } from '@/lib/security/api-response';

export const GET = withApiHandler(async () => {
  const session = await resolveSession();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401, headers: securityHeadersInit() });
  }
  return NextResponse.json(
    {
      success: true,
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

