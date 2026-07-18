/**
 * src/lib/security/api-response.ts
 * Consistent API responses, HTTP status codes and centralized error handling.
 * No internal error details ever leak to the client.
 */

import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { securityHeadersInit } from './headers';
import { rateLimitHeaders, type RateLimitResult } from './rate-limit';
import { verifyCsrf } from '@/lib/auth';

export { securityHeadersInit, rateLimitHeaders };


export class ApiError extends Error {
  status: number;
  code?: string;
  constructor(status: number, message: string, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export const HttpError = {
  badRequest: (msg = 'Bad request', code?: string) => new ApiError(400, msg, code),
  unauthorized: (msg = 'Unauthorized', code?: string) => new ApiError(401, msg, code),
  forbidden: (msg = 'Forbidden', code?: string) => new ApiError(403, msg, code),
  notFound: (msg = 'Not found', code?: string) => new ApiError(404, msg, code),
  tooManyRequests: (msg = 'Too many requests', code?: string) => new ApiError(429, msg, code),
  internal: (msg = 'Internal server error', code?: string) => new ApiError(500, msg, code),
};

function jsonBody(success: boolean, data: unknown, error: string | null) {
  return { success, ...(data !== undefined ? { data } : {}), ...(error ? { error } : {}) };
}

export function apiResponse<T>(
  data: T,
  init?: { status?: number; rateLimit?: RateLimitResult },
) {
  const status = init?.status ?? 200;
  const headers: Record<string, string> = { ...securityHeadersInit() };
  if (init?.rateLimit) Object.assign(headers, rateLimitHeaders(init.rateLimit));
  return NextResponse.json(jsonBody(true, data, null), { status, headers });
}

export function apiError(err: unknown) {
  // Zod validation errors → 422 with field details
  if (err instanceof ZodError) {
    return NextResponse.json(
      jsonBody(false, { fields: err.flatten().fieldErrors }, 'Validation failed'),
      { status: 422, headers: securityHeadersInit() },
    );
  }

  if (err instanceof ApiError) {
    return NextResponse.json(jsonBody(false, undefined, err.message), {
      status: err.status,
      headers: securityHeadersInit(),
    });
  }

  // Unknown error — log server-side, return generic message.
  console.error('[API ERROR]', err);
  return NextResponse.json(jsonBody(false, undefined, 'Internal server error'), {
    status: 500,
    headers: securityHeadersInit(),
  });
}

/**
 * Wrap an API handler so all thrown errors become consistent responses.
 * Usage: export const POST = withApiHandler(async (req) => { ... });
 */
export function withApiHandler(
  handler: (req: Request, ctx: { params: Record<string, string> }) => Promise<Response> | Response,
) {
  return async (req: Request, ctx: { params?: Record<string, string> }) => {
    try {
      // CSRF protection (double-submit cookie) for authenticated state-changing
      // requests. Unauthenticated endpoints (login/register/reset) are exempt
      // because no session/CSRF cookie exists yet.
      const method = req.method.toUpperCase();
      if (method !== 'GET' && method !== 'HEAD' && method !== 'OPTIONS') {
        const hasSession = !!req.headers.get('cookie')?.includes('qarshiyev_session');
        if (hasSession && !(await verifyCsrf(req))) {
          return NextResponse.json(
            { success: false, error: 'Invalid CSRF token' },
            { status: 403, headers: securityHeadersInit() },
          );
        }
      }
      return await handler(req, { params: ctx.params ?? {} });
    } catch (err) {
      return apiError(err);
    }
  };
}
