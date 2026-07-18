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
 * This ensures that Wizard state and session data survive serverless restarts.
 */
function PrismaSessionStore(): SessionStore<SessionData> {
  return {
    async get(key: string): Promise<SessionData | undefined> {
      try {
        const record = await prisma.telegramSession.findUnique({
          where: { key },
        });
        return record ? (record.session as SessionData) : undefined;
      } catch (err) {
        logger.error('Error fetching Telegram session', { error: String(err), key });
        return undefined;
      }
    },
    async set(key: string, session: SessionData): Promise<void> {
      try {
        await prisma.telegramSession.upsert({
          where: { key },
          create: { key, session: session ?? {} },
          update: { session: session ?? {} },
        });
      } catch (err) {
        logger.error('Error saving Telegram session', { error: String(err), key });
      }
    },
    async delete(key: string): Promise<void> {
      try {
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
