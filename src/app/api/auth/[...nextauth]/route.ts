import { NextResponse } from 'next/server';
import { withApiHandler } from '@/lib/security/api-response';

export const GET = withApiHandler<{ nextauth: string[] }>(async () => {
  return NextResponse.json({ message: 'Auth module prepared' });
});

export const POST = withApiHandler<{ nextauth: string[] }>(async () => {
  return NextResponse.json({ message: 'Auth module prepared' });
});
