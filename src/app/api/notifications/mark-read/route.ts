/**
 * POST /api/notifications/mark-read
 * Marks all unread notifications for the authenticated user as read.
 * Called from the client-side notifications page instead of doing a DB mutation
 * during Server Component render.
 */
import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { requireUser } from '../../../../lib/auth';
import { withApiHandler, securityHeadersInit } from '@/lib/security/api-response';

export const POST = withApiHandler(async () => {
  const session = await requireUser();

  await prisma.notification.updateMany({
    where: { userId: session.user.id, isRead: false },
    data: { isRead: true },
  });

  return NextResponse.json(
    { success: true },
    { status: 200, headers: securityHeadersInit() },
  );
});
