import type { Middleware, Scenes } from 'telegraf';
import { t } from '../i18n/translations';
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

export type ProtectedContext = Scenes.WizardContext;

/**
 * Middleware that restricts access to the configured admin chat only.
 *
 * This middleware is applied ONLY to admin commands (/stats, /users, /broadcast)
 * and CRM callback handlers. It does NOT affect:
 *   - /start command
 *   - Registration wizard (language selection, contact, region, district, course, etc.)
 *   - Application submission
 *
 * The admin chat ID is read from the TELEGRAM_ADMIN_CHAT_ID environment variable.
 * If the variable is not set, the middleware allows all requests (fallback).
 */
export const teacherAdminOnly = (): Middleware<ProtectedContext> => {
  return async (ctx, next) => {
    const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

    // If no admin is configured, allow all (development fallback)
    if (!adminChatId) {
      logger.warn('[Auth] TELEGRAM_ADMIN_CHAT_ID not set — allowing request');
      return next();
    }

    const userId = ctx.from?.id?.toString();

    if (userId !== adminChatId) {
      logger.warn('[Auth] Blocked non-admin user', {
        userId,
        adminChatId,
        updateType: ctx.updateType,
      });

      // Reply with a generic message so the user knows the command is restricted
      await ctx.reply(t(undefined, 'admin_only')).catch(() => {});
      return;
    }

    return next();
  };
};
