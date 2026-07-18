import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  DATABASE_URL: z.string().min(1).optional(),

  AUTH_SECRET: z
    .string()
    .min(32, 'AUTH_SECRET must be at least 32 characters long')
    .optional(),

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
    console.warn(
      'Environment validation warning:',
      result.error.issues
    );

    // buildni yiqitmaslik uchun
    cached = {
      NODE_ENV: process.env.NODE_ENV as 'development',
      DATABASE_URL: process.env.DATABASE_URL,
      AUTH_SECRET: process.env.AUTH_SECRET,
      NEXT_PUBLIC_AUTH_COOKIE_NAME:
        process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME || 'qarshiyev_session',
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
      TELEGRAM_WEBHOOK_SECRET: process.env.TELEGRAM_WEBHOOK_SECRET,
      TELEGRAM_ADMIN_CHAT_ID: process.env.TELEGRAM_ADMIN_CHAT_ID,
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      EMAIL_FROM: process.env.EMAIL_FROM,
      OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    };

    return cached;
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
  const secret = process.env.AUTH_SECRET;

  if (!secret || secret.trim().length < 32) {
    throw new Error('AUTH_SECRET is not configured.');
  }

  return secret;
}

export const isProd = () =>
  process.env.NODE_ENV === 'production';

export function sessionCookieName(): string {
  return (
    process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME ||
    'qarshiyev_session'
  );
}
