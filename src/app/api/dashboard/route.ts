/**
 * GET /api/dashboard
 * Returns aggregate dashboard statistics. Protected: requires dashboard:read.
 */
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { requirePermission } from '../../../lib/auth';
import { withApiHandler, securityHeadersInit } from '@/lib/security/api-response';

export const GET = withApiHandler(async () => {
  const session = await requirePermission('dashboard:read').catch(() => null);
  if (!session) return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403, headers: securityHeadersInit() });

  const [totalStudents, totalTeachers, totalCourses, totalApplications, pendingApplications] = await Promise.all([
    prisma.student.count(),
    prisma.teacher.count(),
    prisma.course.count({ where: { isActive: true } }),
    prisma.application.count(),
    prisma.application.count({ where: { status: 'PENDING' } }),
  ]);

  return NextResponse.json(
    { success: true, data: { totalStudents, totalTeachers, totalCourses, totalApplications, pendingApplications } },
    { status: 200, headers: securityHeadersInit() },
  );
});
