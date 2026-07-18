import type { Context, Middleware } from 'telegraf';
import prisma from '../../../lib/prisma';
import { logger } from '../../../lib/security/logger';

export interface ProtectedContext extends Context {
  session: Record<string, any>;
  scene: any;
  wizard: any;
  user?: any;
}

/**
 * Middleware to restrict access to Teachers and Admins.
 * Populates ctx.user if authorized.
 */
export const teacherAdminOnly = (): Middleware<ProtectedContext> => async (ctx, next) => {
  const telegramId = ctx.from?.id.toString();
  
  if (!telegramId) {
    logger.warn('Unauthorized bot access: missing telegramId', { from: ctx.from });
    return ctx.answerCbQuery('❌ Xatolik: Telegram ID topilmadi.');
  }

  try {
    const user = await prisma.user.findUnique({
      where: { telegramId },
      include: { role: true }
    });

    if (!user || (user.role.name !== 'ADMIN' && user.role.name !== 'TEACHER')) {
      logger.warn('Forbidden bot access attempt', { telegramId, role: user?.role?.name });
      return ctx.answerCbQuery('❌ Ruxsat yo\'q (Faqat O\'qituvchilar)');
    }

    ctx.user = user;
    return next();
  } catch (error) {
    logger.error('Error in teacherAdminOnly middleware', { error: String(error), telegramId });
    return ctx.answerCbQuery('❌ Tizim xatosi, keyinroq urinib ko\'ring.');
  }
};

