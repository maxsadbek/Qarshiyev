/**
 * GET /api/notifications/retry
 * Cron-triggered route that retries all FAILED notifications (max 3 attempts).
 * Protected by the internal secret (header or query param) and rate-limited.
 */
import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { notificationQueue } from '../../../../modules/notifications/queue.service';
import { withApiHandler, securityHeadersInit, rateLimitHeaders } from '@/lib/security/api-response';
import { rateLimit } from '@/lib/security/rate-limit';
import { getClientIp } from '@/lib/security/request-context';

const INTERNAL_SECRET = process.env.AUTH_SECRET;

export const GET = withApiHandler(async (req) => {
  const headerSecret = req.headers.get('x-internal-secret');
  const querySecret = new URL(req.url).searchParams.get('secret');
  const provided = headerSecret ?? querySecret ?? '';
  const ok = INTERNAL_SECRET
    ? timingSafeEqual(provided, INTERNAL_SECRET)
    : !!provided;

  if (!ok) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401, headers: securityHeadersInit() });
  }

  const ip = getClientIp(req);
  const limit = rateLimit(`retry:${ip}`, { windowMs: 60_000, limit: 10 });
  if (!limit.success) {
    return NextResponse.json({ success: false, error: 'Too many requests' }, { status: 429, headers: { ...securityHeadersInit(), ...rateLimitHeaders(limit) } });
  }

  const result = await notificationQueue.retryFailed();
  return NextResponse.json({ success: true, ...result }, { status: 200, headers: { ...securityHeadersInit(), ...rateLimitHeaders(limit) } });
});

function timingSafeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  try {
    return crypto.timingSafeEqual(ba, bb);
  } catch {
    return false;
  }
}
