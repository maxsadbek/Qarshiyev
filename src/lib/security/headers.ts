/**
 * src/lib/security/headers.ts
 * Produces the secure HTTP headers applied by middleware & API routes.
 * Implements: CSP, X-Frame-Options, X-Content-Type-Options,
 * Referrer-Policy, Permissions-Policy, and other hardening headers.
 */

export const SECURITY_HEADERS: Record<string, string> = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-DNS-Prefetch-Control': 'off',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
};

/** Build the Content-Security-Policy string (tuned for this app). */
export function buildCsp(): string {
  const isProd = process.env.NODE_ENV === 'production';
  const upgrade = isProd ? 'upgrade-insecure-requests; ' : '';
  return [
    upgrade,
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://*.supabase.co https://openrouter.ai https://api.openai.com",
    "frame-src 'self' https://www.youtube.com https://www.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join('; ');
}

export function applySecurityHeaders(headers: Headers): void {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(key, value);
  }
  headers.set('Content-Security-Policy', buildCsp());
}

/** Returns a Headers init object for NextResponse.json / NextResponse.next. */
export function securityHeadersInit(): Record<string, string> {
  return { ...SECURITY_HEADERS, 'Content-Security-Policy': buildCsp() };
}
