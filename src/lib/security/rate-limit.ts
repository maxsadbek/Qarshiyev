/**
 * src/lib/security/rate-limit.ts
 * Lightweight, in-memory sliding-window rate limiter.
 *
 * Protects login, registration, the Telegram webhook and general API routes
 * from brute-force & abuse. A single process instance is sufficient for most
 * deployments; in a horizontally scaled environment swap the store for Redis
 * (see RedisRateLimitStore stub) without changing callers.
 */

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number; // epoch ms when the window resets
}

interface Bucket {
  count: number;
  resetAt: number;
}

class MemoryStore {
  private buckets = new Map<string, Bucket>();
  private sweepAt = 0;

  incr(key: string, windowMs: number, limit: number): RateLimitResult {
    const now = Date.now();
    this.maybeSweep(now);
    const existing = this.buckets.get(key);
    if (!existing || existing.resetAt <= now) {
      const resetAt = now + windowMs;
      this.buckets.set(key, { count: 1, resetAt });
      return { success: true, limit, remaining: limit - 1, reset: resetAt };
    }
    existing.count += 1;
    const remaining = Math.max(0, limit - existing.count);
    return {
      success: existing.count <= limit,
      limit,
      remaining,
      reset: existing.resetAt,
    };
  }

  private maybeSweep(now: number) {
    if (now - this.sweepAt < 60_000) return;
    this.sweepAt = now;
    for (const [key, bucket] of this.buckets) {
      if (bucket.resetAt <= now) this.buckets.delete(key);
    }
  }
}

export interface RateLimitOptions {
  windowMs?: number;
  limit?: number;
  /** A unique discriminator per bucket (e.g. IP, route name). Defaults to 'global'. */
  keyPrefix?: string;
}

const store = new MemoryStore();

export const RATE_LIMITS = {
  login: { windowMs: 15 * 60_000, limit: 10, keyPrefix: 'login' },
  register: { windowMs: 60 * 60_000, limit: 10, keyPrefix: 'register' },
  telegram: { windowMs: 60_000, limit: 30, keyPrefix: 'telegram' },
  api: { windowMs: 60_000, limit: 120, keyPrefix: 'api' },
  passwordReset: { windowMs: 60 * 60_000, limit: 5, keyPrefix: 'passwordReset' },
} as const;

export function rateLimit(
  identifier: string,
  opts: RateLimitOptions,
): RateLimitResult {
  const windowMs = opts.windowMs ?? 60_000;
  const limit = opts.limit ?? 60;
  const keyPrefix = opts.keyPrefix ?? 'global';
  return store.incr(`${keyPrefix}:${identifier}`, windowMs, limit);
}

/** Build the RateLimit-* response headers from a result. */
export function rateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Limit': String(result.limit),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(Math.ceil(result.reset / 1000)),
  };
}
