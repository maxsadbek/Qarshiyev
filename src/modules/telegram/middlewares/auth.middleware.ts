import type { Middleware, Scenes } from 'telegraf';
import type { User } from '@prisma/client';
import prisma from '../../../lib/prisma';
import { logger } from '../../../lib/security/logger';

export interface RegistrationWizardState {
  language?: string;
  phone?: string;
  regionId?: string;
  districtId?: string;
  courseId?: string;
  shift?: string;
  age?: number;
  experience?: string;
  device?: string;
  note?: string;
  applicationId?: string;
  actionUserId?: string;
  [key: string]: string | number | undefined;
}

export type ProtectedContext = Scenes.WizardContext & {
  user?: User;
};

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

