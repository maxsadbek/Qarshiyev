/**
 * POST /api/auth/reset-password
 * Completes a password reset using a valid, unexpired reset token.
 */
import { NextResponse } from 'next/server';
import { resetPasswordSchema } from '@/validation/auth';
import { resetPassword } from '@/modules/auth/auth.service';
import { withApiHandler, securityHeadersInit } from '@/lib/security/api-response';

export const POST = withApiHandler(async (req) => {
  const body = await req.json().catch(() => null);
  const parsed = resetPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: 'Noto‘g‘ri ma’lumotlar' }, { status: 422, headers: securityHeadersInit() });
  }

  const result = await resetPassword({ token: parsed.data.token, password: parsed.data.password });
  if (!result.ok) {
    return NextResponse.json({ success: false, error: result.error }, { status: 400, headers: securityHeadersInit() });
  }

  return NextResponse.json({ success: true, message: 'Parol muvaffaqiyatli yangilandi' }, { status: 200, headers: securityHeadersInit() });
});

