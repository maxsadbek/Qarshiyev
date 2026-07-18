/**
 * src/lib/env.ts
 * Centralized environment validation.
 * Fails fast at boot if required secrets/config are missing or invalid.
 */

import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_URL: z.string().min(1).optional(),
  AUTH_SECRET: z.string().min(32, 'AUTH_SECRET must be at least 32 characters long').optional(),
  NEXT_PUBLIC_AUTH_COOKIE_NAME: z.string().min(1).default('qarshiyev_session'),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  NEXT_PUBLIC_API_URL: z.string().url().optional(),
  TELEGRAM_BOT_TOKEN: z.string().optional(),
  TELEGRAM_WEBHOOK_SECRET: z.string().optional(),
  TELEGRAM_ADMIN_CHAT_ID: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().optional(),
  OPENROUTER_API_KEY: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
});

export type AppEnv = z.infer<typeof envSchema>;

let cached: AppEnv | null = null;

export function getEnv(): AppEnv {
  if (cached) return cached;
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  - ${i.path.join('.')}: ${i.message}`)
      .join('\n');
    throw new Error(`Invalid environment configuration:\n${issues}`);
  }
  cached = result.data;
  return cached;
}

export function requireDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url || url.trim() === '') {
    throw new Error('DATABASE_URL is required but was not set.');
  }
  return url;
}

export function requireAuthSecret(): string {
  const secret = getEnv().AUTH_SECRET;
  if (!secret) {
    throw new Error('AUTH_SECRET is not configured.');
  }
  return secret;
}

/** True when running in production. */
export const isProd = () => process.env.NODE_ENV === 'production';

/** Returns the cookie name used for the session token. */
export function sessionCookieName(): string {
  return process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME || 'qarshiyev_session';
}

