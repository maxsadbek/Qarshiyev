/**
 * src/lib/security/api-response.ts
 * Consistent API responses, HTTP status codes and centralized error handling.
 * No internal error details ever leak to the client.
 */

import { NextRequest, NextResponse } from 'next/server';
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

  // Unknown error — log the FULL error details server-side
  const message = err instanceof Error ? err.message : String(err);
  const stack = err instanceof Error ? err.stack : undefined;
  console.error('[API ERROR]', message);
  if (stack) console.error('[API ERROR] Stack:', stack);

  // Return a safe error message — never leak internal config details to clients.
  // Error messages from our own auth service are prefixed with known patterns.
  // Everything else (Prisma errors, config errors) is hidden behind a generic message.
  const knownSafePrefixes = [
    'Email yoki parol',
    'Hisob vaqtincha',
    'Ro‘yxatdan o‘tishda',
    'Kirishda',
    'Sessiya yaratishda',
    'Foydalanuvchi yaratishda',
    'Parolni',
    'Bu email',
    'Xatolik yuz berdi',
    'Token yaroqsiz',
    'Juda ko‘p urinish',
    'Noto‘g‘ri ma’lumotlar',
    'So‘rov formati',
  ];
  const isSafe = knownSafePrefixes.some(prefix => message.startsWith(prefix));
  const safeMessage = isSafe ? message : 'Xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.';
  return NextResponse.json(
    jsonBody(false, undefined, safeMessage),
    { status: 500, headers: securityHeadersInit() },
  );
}

/**
 * Wrap an API handler so all thrown errors become consistent responses.
 * Usage: export const POST = withApiHandler(async (req) => { ... });
 */
export function withApiHandler<Params extends Record<string, string | string[]> = {}>(
  handler: (req: NextRequest, ctx: { params: Params }) => Promise<Response> | Response,
) {
  return async (req: NextRequest, ctx: { params: Promise<Params> }) => {
    try {
      const method = req.method.toUpperCase();
      if (method !== 'GET' && method !== 'HEAD' && method !== 'OPTIONS') {
        const cookieHeader = req.headers.get('cookie') ?? '';
        const hasSession = cookieHeader.includes('qarshiyev_session=');
        if (hasSession && !(await verifyCsrf(req))) {
          return NextResponse.json(
            { success: false, error: 'Invalid CSRF token' },
            { status: 403, headers: securityHeadersInit() },
          );
        }
      }
      return await handler(req, { params: await ctx.params });
    } catch (err) {
      return apiError(err);
    }
  };
}
