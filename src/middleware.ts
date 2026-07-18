import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { sessionCookieName } from '@/lib/env';
import { applySecurityHeaders } from '@/lib/security/headers';
import { verifySessionToken } from '@/lib/security/session';
import { canAccessAdmin } from '@/modules/rbac/roles';
import { rateLimit, RATE_LIMITS, type RateLimitResult } from '@/lib/security/rate-limit';

function rateLimitHeaders(r: RateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Limit': String(r.limit),
    'X-RateLimit-Remaining': String(r.remaining),
    'X-RateLimit-Reset': String(Math.ceil(r.reset / 1000)),
  };
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const resHeaders = new Headers();
  applySecurityHeaders(resHeaders);

  // ── Global API rate limiting (defense in depth beyond per-route) ──
  if (pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'local';
    const limit = rateLimit(ip, RATE_LIMITS.api);
    if (!limit.success) {
      return new NextResponse(JSON.stringify({ success: false, error: 'Too many requests' }), {
        status: 429,
        headers: { ...Object.fromEntries(resHeaders), ...rateLimitHeaders(limit) },
      });
    }
    resHeaders.set('X-RateLimit-Limit', String(limit.limit));
    resHeaders.set('X-RateLimit-Remaining', String(limit.remaining));
  }

  const rawCookie = request.cookies.get(sessionCookieName())?.value;
  const payload = verifySessionToken(rawCookie);

  const redirectTo = (path: string) =>
    NextResponse.redirect(new URL(path, request.url), { headers: resHeaders });

  // ── Admin area ───────────────────────────────────────────────────
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') {
      if (payload && canAccessAdmin(payload.role)) return NextResponse.redirect(new URL('/admin', request.url), { headers: resHeaders });
      return NextResponse.next({ headers: resHeaders });
    }
    if (!payload) return redirectTo('/admin/login');
    if (!canAccessAdmin(payload.role)) return redirectTo('/student');
    return NextResponse.next({ headers: resHeaders });
  }

  // ── Student area ─────────────────────────────────────────────────
  if (pathname.startsWith('/student')) {
    if (pathname === '/student/login' || pathname === '/student/register') {
      if (payload) return NextResponse.redirect(new URL('/student', request.url), { headers: resHeaders });
      return NextResponse.next({ headers: resHeaders });
    }
    if (!payload) return redirectTo('/student/login');
    return NextResponse.next({ headers: resHeaders });
  }

  // ── Public routes: just attach security headers ──────────────────
  return NextResponse.next({ headers: resHeaders });
}

export const config = {
  matcher: ['/admin/:path*', '/student/:path*', '/api/:path*'],
};
