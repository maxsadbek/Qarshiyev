/**
 * POST /api/telegram
 * Telegram webhook entry-point. Hardened:
 *  - Verifies the Telegram webhook secret header (TELEGRAM_WEBHOOK_SECRET).
 *  - Rate limited per IP.
 *  - Validates request body shape.
 *  - Never leaks internal errors.
 */
import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
import bot from '../../../modules/telegram/bot';
import { withApiHandler, securityHeadersInit, rateLimitHeaders } from '@/lib/security/api-response';
import { rateLimit, RATE_LIMITS } from '@/lib/security/rate-limit';
import { getClientIp } from '@/lib/security/request-context';

function verifyWebhookSecret(req: Request): boolean {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!secret) {
    return true;
  }
  const header = req.headers.get('x-telegram-bot-api-secret-token');
  if (!header) return false;
  const a = Buffer.from(header);
  const b = Buffer.from(secret);
  if (a.length !== b.length) return false;
  try {
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export const POST = withApiHandler(async (req) => {
  if (!verifyWebhookSecret(req)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401, headers: securityHeadersInit() });
  }

  const ip = getClientIp(req);
  const limit = rateLimit(`tg:${ip}`, RATE_LIMITS.telegram);
  if (!limit.success) {
    return NextResponse.json({ success: false, error: 'Too many requests' }, { status: 429, headers: { ...securityHeadersInit(), ...rateLimitHeaders(limit) } });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== 'object' || !('update_id' in body)) {
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400, headers: securityHeadersInit() });
  }

  try {
    await bot.handleUpdate(body);
  } catch (error) {
    console.error('[Telegram Webhook] handleUpdate failed', error);
    return NextResponse.json({ ok: true, processed: false }, { status: 200, headers: securityHeadersInit() });
  }

  return NextResponse.json({ ok: true }, { status: 200, headers: { ...securityHeadersInit(), ...rateLimitHeaders(limit) } });
});

export const GET = withApiHandler(async () => {
  return NextResponse.json({ message: 'Telegram Webhook is active' }, { status: 200, headers: securityHeadersInit() });
});

