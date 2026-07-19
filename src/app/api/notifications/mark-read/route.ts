/**
 * POST /api/notifications/mark-read
 * Mock endpoint — returns success without database operations.
 */
import { NextResponse } from 'next/server';
import { withApiHandler, securityHeadersInit } from '@/lib/security/api-response';

export const POST = withApiHandler(async () => {
  return NextResponse.json(
    { success: true },
    { status: 200, headers: securityHeadersInit() },
  );
});
