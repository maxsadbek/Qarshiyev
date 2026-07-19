/**
 * GET /api/auth/me
 * Mock endpoint — authentication is now handled client-side via localStorage.
 * This route exists for backward compatibility only.
 */
import { NextResponse } from 'next/server';
import { withApiHandler, securityHeadersInit } from '@/lib/security/api-response';

export const GET = withApiHandler(async () => {
  return NextResponse.json(
    { success: true, authenticated: false, user: null },
    { status: 200, headers: securityHeadersInit() },
  );
});
