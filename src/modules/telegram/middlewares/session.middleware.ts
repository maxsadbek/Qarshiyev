import { session as telegrafSession } from 'telegraf';
import type { SessionStore } from 'telegraf';
import prisma from '../../../lib/prisma';
import { logger } from '../../../lib/security/logger';

/**
 * Local structural replacement for Prisma's `JsonValue`.
 * Prisma 7 no longer exposes a `Prisma` namespace export from `@prisma/client`,
 * so instead of importing `Prisma.JsonValue` we declare an equivalent
 * recursive JSON type here. TypeScript checks this structurally against the
 * generated `TelegramSession.session` (Json) field at each call site below,
 * so compatibility with Prisma's Json column is preserved without the import.
 */
type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

type SessionData = Record<string, JsonValue>;

/**
 * A custom Telegraf session store backed by Prisma
 * This ensures that Wizard state and scene data survive serverless restarts.
 */
function PrismaSessionStore(): SessionStore<SessionData> {
  return {
    async get(key: string): Promise<SessionData | undefined> {
      try {
        const record = await prisma.telegramSession.findUnique({
          where: { key },
        });
        if (record) {
          const session = record.session as SessionData;
          const hasScenes = !!(session as Record<string, unknown>)?.['__scenes'];
          logger.info('[SessionStore] Session loaded from DB', {
            key,
            hasScenes,
          });
          return session;
        }
        logger.info('[SessionStore] No session found in DB', { key });
        return undefined;
      } catch (err) {
        logger.error('[SessionStore] Error fetching Telegram session', {
          error: String(err),
          key,
        });
        return undefined;
      }
    },
    async set(key: string, session: SessionData): Promise<void> {
      try {
        const hasScenes = !!(session as Record<string, unknown>)?.['__scenes'];
        logger.info('[SessionStore] Saving session to DB', {
          key,
          hasScenes,
          sceneCurrent: hasScenes
            ? ((session as Record<string, unknown>)['__scenes'] as Record<string, JsonValue>)?.['current']
            : undefined,
        });
        await prisma.telegramSession.upsert({
          where: { key },
          create: { key, session: session ?? {} },
          update: { session: session ?? {} },
        });
        logger.info('[SessionStore] Session saved successfully', { key });
      } catch (err) {
        logger.error('[SessionStore] Error saving Telegram session', {
          error: String(err),
          key,
        });
      }
    },
    async delete(key: string): Promise<void> {
      try {
        logger.info('[SessionStore] Deleting session from DB', { key });
        await prisma.telegramSession.delete({
          where: { key },
        });
      } catch {
        // Ignore if not found
      }
    },
  };
}

export const sessionMiddleware = () => {
  return telegrafSession({
    store: PrismaSessionStore(),
  });
};
