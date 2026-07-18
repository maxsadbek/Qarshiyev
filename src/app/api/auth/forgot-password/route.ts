/**
 * POST /api/auth/forgot-password
 * Initiates a password reset. Always returns success to avoid email enumeration.
 * In production, an email with the reset link is sent via Resend.
 */
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { forgotPasswordSchema } from '@/validation/auth';
import { requestPasswordReset } from '@/modules/auth/auth.service';
import { withApiHandler, securityHeadersInit, rateLimitHeaders } from '@/lib/security/api-response';
import { rateLimit, RATE_LIMITS } from '@/lib/security/rate-limit';
import { getClientIp } from '@/lib/security/request-context';

export const POST = withApiHandler(async (req) => {
  const ip = getClientIp(req);
  const limit = rateLimit(`reset:${ip}`, RATE_LIMITS.passwordReset);
  if (!limit.success) {
    return NextResponse.json(
      { success: false, error: 'Juda ko‘p urinish' },
      { status: 429, headers: { ...securityHeadersInit(), ...rateLimitHeaders(limit) } },
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = forgotPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: 'Noto‘g‘ri email' }, { status: 422, headers: securityHeadersInit() });
  }

  const { token } = await requestPasswordReset({ email: parsed.data.email, req });

  // Best-effort email delivery (dev-safe: only sends if RESEND_API_KEY present).
  if (token && process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'noreply@qarshiyev.uz',
        to: parsed.data.email,
        subject: 'Parolni tiklash — Qarshiyev',
        html: `<p>Parolingizni tiklash uchun havola:</p><p><a href="${appUrl}/reset-password?token=${token}">${appUrl}/reset-password?token=${token}</a></p><p>Havola 1 soat davomida amal qiladi.</p>`,
      });
    } catch (e) {
      console.error('[forgot-password] email send failed', e);
    }
  }

  return NextResponse.json(
    { success: true, message: 'Agar email mavjud bo‘lsa, tiklash havolasi yuborildi.' },
    { status: 200, headers: { ...securityHeadersInit(), ...rateLimitHeaders(limit) } },
  );
});
