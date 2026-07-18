import { session as telegrafSession } from 'telegraf';
import prisma from '../../../lib/prisma';
import { logger } from '../../../lib/security/logger';

/**
 * A custom Telegraf session store backed by Prisma
 * This ensures that Wizard state and session data survive serverless restarts.
 */
function PrismaSessionStore() {
  return {
    async get(key: string): Promise<any> {
      try {
        const record = await prisma.telegramSession.findUnique({
          where: { key },
        });
        return record ? (record.session as any) : undefined;
      } catch (err) {
        logger.error('Error fetching Telegram session', { error: String(err), key });
        return undefined;
      }
    },
    async set(key: string, session: any): Promise<void> {
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
