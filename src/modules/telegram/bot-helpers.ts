/**
 * src/modules/telegram/bot-helpers.ts
 * Shared utility functions for all Telegram bot modules.
 * Eliminates code duplication across bot.ts, marketplace.bot.ts, wizards, and services.
 */
import type { ProtectedContext } from './middlewares/auth.middleware';
import { logger } from '../../lib/security/logger';

// ── Safe answerCbQuery ──────────────────────────────────────────────
// Prevents "answerCbQuery isn't available for message" TypeError.
// Telegraf throws this error synchronously if ctx.callbackQuery is falsy.
export async function safeAnswerCbQuery(ctx: ProtectedContext, text?: string): Promise<void> {
  if (ctx.callbackQuery) {
    try {
      await ctx.answerCbQuery(text);
    } catch {
      // Silently ignore – callback might have been answered already
    }
  }
}

// ── Promise timeout helper ───────────────────────────────────────────
// Prevents external calls (Prisma, API) from freezing the bot.
// Clears the timer on completion to avoid UnhandledPromiseRejection.
export function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`[Timeout] ${label} exceeded ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timer!));
}

// ── Safe message deletion ────────────────────────────────────────────
export async function safeDeleteMessage(ctx: ProtectedContext): Promise<void> {
  try {
    await ctx.deleteMessage();
  } catch {
    // Message may have already been deleted
  }
}

// ── Safe reply with error handling ───────────────────────────────────
export async function safeReply(ctx: ProtectedContext, text: string, extra?: Record<string, unknown>): Promise<void> {
  try {
    await ctx.reply(text, extra);
  } catch {
    // Ignore send failures
  }
}

// ── Retry wrapper for Telegram API calls ─────────────────────────────
// Retries up to maxRetries times with exponential backoff.
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: { maxRetries?: number; baseDelay?: number; label?: string } = {}
): Promise<T> {
  const maxRetries = options.maxRetries ?? 3;
  const baseDelay = options.baseDelay ?? 1000;
  const label = options.label ?? 'operation';

  let lastError: unknown;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt - 1);
        logger.warn(`[Retry] ${label} failed (attempt ${attempt}/${maxRetries}), retrying in ${delay}ms`, {
          error: String(error),
        });
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

// ── In-memory deduplication for callback queries ─────────────────────
// Prevents processing the same callback query multiple times.
const processedCallbacks = new Set<number>();

export function isCallbackDuplicate(updateId: number | undefined): boolean {
  if (!updateId) return false;
  if (processedCallbacks.has(updateId)) return true;
  processedCallbacks.add(updateId);
  // Clean up old entries every 1000 to avoid memory leak
  if (processedCallbacks.size > 1000) {
    const entries = Array.from(processedCallbacks);
    processedCallbacks.clear();
    entries.slice(-500).forEach((id) => processedCallbacks.add(id));
  }
  return false;
}

// ── Rate limit tracking per user ─────────────────────────────────────
const userActionTimestamps = new Map<number, number>();

export function isUserRateLimited(userId: number | undefined, minIntervalMs: number = 300): boolean {
  if (!userId) return false;
  const now = Date.now();
  const lastAction = userActionTimestamps.get(userId);
  if (lastAction && now - lastAction < minIntervalMs) return true;
  userActionTimestamps.set(userId, now);
  return false;
}

// ── Debug logger for wizards ─────────────────────────────────────────
const DEBUG = true;

export function logStep(wizardName: string, step: number, action: 'entered' | 'completed' | 'waiting', detail?: string) {
  const msg = `[Wizard:${wizardName}] Step ${step} ${action}` + (detail ? ` — ${detail}` : '');
  if (DEBUG) console.log(msg);
  logger.info(msg, { wizard: wizardName, step, action, detail });
}

// ── Env validation ───────────────────────────────────────────────────
export interface EnvCheck {
  name: string;
  value: string | undefined;
  required: boolean;
}

export function validateEnvVars(checks: EnvCheck[]): { valid: boolean; missing: string[] } {
  const missing: string[] = [];
  for (const check of checks) {
    if (check.required && !check.value) {
      missing.push(check.name);
    }
  }
  return { valid: missing.length === 0, missing };
}
