/**
 * src/lib/client/csrf.ts
 * Client-side helper that reads the CSRF cookie and attaches it as the
 * double-submit header on state-changing requests. Works together with the
 * server-side verifyCsrf() guard.
 */

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[2]) : null;
}

export const CSRF_COOKIE = 'qarshiyev_csrf';

/**
 * fetch wrapper that automatically includes credentials and the CSRF token
 * for mutation methods. Use this for all POST/PUT/DELETE/PATCH calls.
 */
export async function csrfFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const method = (options.method || 'GET').toUpperCase();
  const headers = new Headers(options.headers);
  if (method !== 'GET' && method !== 'HEAD') {
    const token = getCookie(CSRF_COOKIE);
    if (token) headers.set('x-csrf-token', token);
    if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  }
  return fetch(url, { ...options, method, headers, credentials: 'same-origin' });
}

