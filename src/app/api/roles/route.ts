/**
 * GET /api/roles
 * DEPRECATED: RBAC has been removed. This endpoint returns an empty response.
 */
import { NextResponse } from 'next/server';
import { withApiHandler, securityHeadersInit } from '@/lib/security/api-response';

export const GET = withApiHandler(async () => {
  return NextResponse.json(
    { success: true, data: { matrix: {}, roles: [], permissions: [] } },
    { status: 200, headers: securityHeadersInit() },
  );
});
