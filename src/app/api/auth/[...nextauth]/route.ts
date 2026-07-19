import { NextResponse } from 'next/server';
import { withApiHandler, securityHeadersInit } from '@/lib/security/api-response';

/**
 * Catch-all route for NextAuth.js compatibility.
 * Next.js route priority: static routes ([login], [register], etc.) are matched BEFORE
 * dynamic catch-all routes ([...nextauth]). This handler only receives requests that
 * are NOT caught by the explicit auth routes above.
 */
export const GET = withApiHandler<{ nextauth: string[] }>(async () => {
  return NextResponse.json(
    { success: false, error: 'Not found' },
    { status: 404, headers: securityHeadersInit() },
  );
});

export const POST = withApiHandler<{ nextauth: string[] }>(async () => {
  return NextResponse.json(
    { success: false, error: 'Not found' },
    { status: 404, headers: securityHeadersInit() },
  );
});

export const PUT = withApiHandler<{ nextauth: string[] }>(async () => {
  return NextResponse.json(
    { success: false, error: 'Not found' },
    { status: 404, headers: securityHeadersInit() },
  );
});

export const DELETE = withApiHandler<{ nextauth: string[] }>(async () => {
  return NextResponse.json(
    { success: false, error: 'Not found' },
    { status: 404, headers: securityHeadersInit() },
  );
});
