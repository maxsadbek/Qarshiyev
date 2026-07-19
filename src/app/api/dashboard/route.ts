/**
 * GET /api/dashboard
 * Returns aggregate dashboard statistics. Returns mock data.
 */
import { NextResponse } from 'next/server';
import { withApiHandler, securityHeadersInit } from '@/lib/security/api-response';

export const GET = withApiHandler(async () => {
  return NextResponse.json(
    {
      success: true,
      data: {
        totalStudents: 0,
        totalTeachers: 0,
        totalCourses: 0,
        totalApplications: 0,
        pendingApplications: 0,
      },
    },
    { status: 200, headers: securityHeadersInit() },
  );
});
