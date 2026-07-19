/**
 * GET /api/auth/me
 * Returns the authenticated user (or null if not logged in).
 * Returns 200 even when not authenticated so the browser doesn't
 * log a spurious 401 error in the console.
 */
import { NextResponse } from 'next/server';
import { resolveSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { withApiHandler, securityHeadersInit } from '@/lib/security/api-response';

export const GET = withApiHandler(async () => {
  const session = await resolveSession();
  if (!session) {
    return NextResponse.json(
      { success: true, authenticated: false, user: null },
      { status: 200, headers: securityHeadersInit() },
    );
  }

  // Fetch the createdAt field (resolveSession already gives id/email/name/phone)
  const { createdAt } = await prisma.user.findUniqueOrThrow({
    where: { id: session.user.id },
    select: { createdAt: true },
  });

  return NextResponse.json(
    {
      success: true,
      authenticated: true,
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        phone: session.user.phone ?? undefined,
        joinedDate: createdAt.toISOString(),
        enrolledCourses: [],
      },
    },
    { status: 200, headers: securityHeadersInit() },
  );
});
