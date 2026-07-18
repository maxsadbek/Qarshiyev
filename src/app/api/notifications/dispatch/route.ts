/**
 * POST /api/notifications/dispatch
 * Internal endpoint for triggering a notification event.
 * Protected by a shared secret header (AUTH_SECRET) — NOT user-facing.
 */
import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { notificationService } from '../../../../modules/notifications/notification.service';
import type { NotificationPayload } from '../../../../modules/notifications/types';
import { withApiHandler, securityHeadersInit, rateLimitHeaders } from '@/lib/security/api-response';
import { rateLimit, RATE_LIMITS } from '@/lib/security/rate-limit';
import { getClientIp } from '@/lib/security/request-context';

const INTERNAL_SECRET = process.env.AUTH_SECRET;

export const POST = withApiHandler(async (req) => {
  const secret = req.headers.get('x-internal-secret');
  if (!secret || !INTERNAL_SECRET || !timingSafeEqual(secret, INTERNAL_SECRET)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401, headers: securityHeadersInit() });
  }

  const ip = getClientIp(req);
  const limit = rateLimit(`notif:${ip}`, RATE_LIMITS.api);
  if (!limit.success) {
    return NextResponse.json({ success: false, error: 'Too many requests' }, { status: 429, headers: { ...securityHeadersInit(), ...rateLimitHeaders(limit) } });
  }

  const body = (await req.json().catch(() => null)) as NotificationPayload | null;
  if (!body || typeof body !== 'object' || !body.event || !body.payload) {
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400, headers: securityHeadersInit() });
  }

  switch (body.event) {
    case 'REGISTRATION':
      await notificationService.registration(body.payload);
      break;
    case 'ACCEPTANCE':
      await notificationService.acceptance(body.payload);
      break;
    case 'REJECTION':
      await notificationService.rejection(body.payload);
      break;
    case 'PENDING_STATUS':
      await notificationService.pendingStatus(body.payload);
      break;
    case 'REMINDER':
      await notificationService.reminder(body.payload);
      break;
    case 'CUSTOM':
      await notificationService.custom(body.payload);
      break;
    default:
      return NextResponse.json({ success: false, error: 'Unknown event' }, { status: 400, headers: securityHeadersInit() });
  }

  return NextResponse.json({ success: true, event: body.event }, { status: 200, headers: { ...securityHeadersInit(), ...rateLimitHeaders(limit) } });
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
