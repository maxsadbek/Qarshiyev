import { Markup } from 'telegraf';
import type { Telegraf } from 'telegraf';
import type { ProtectedContext } from '../middlewares/auth.middleware';
import { t } from '../i18n/translations';
import { logger } from '../../../lib/security/logger';

/**
 * Lazily resolves the bot instance to avoid circular dependency:
 *   bot.ts → teacher-crm.service.ts → bot.ts
 * The bot is only loaded when a Telegram message actually needs to be sent.
 */
let _bot: Telegraf<ProtectedContext> | null = null;
async function getBot(): Promise<Telegraf<ProtectedContext>> {
  if (!_bot) {
    const mod = await import('../bot');
    _bot = mod.default as Telegraf<ProtectedContext>;
  }
  return _bot;
}

export class TeacherCrmService {
  /**
   * Notifies the admin chat about a new application.
   * Without a database, sends a simplified notification.
   */
  async notifyTeacher(applicationId: string) {
    try {
      const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

      if (!adminChatId) {
        logger.warn('notifyTeacher: TELEGRAM_ADMIN_CHAT_ID not set', { applicationId });
        return;
      }

      const message = `
${t(undefined, 'new_application_title')}
${t(undefined, 'application_id')}: <code>${applicationId}</code>
${t(undefined, 'status')}: PENDING

${t(undefined, 'no_db_hint')}
      `;

      const keyboard = Markup.inlineKeyboard([
        [
          Markup.button.callback(t(undefined, 'crm_accept'), `CRM_ACCEPT_${applicationId}`),
          Markup.button.callback(t(undefined, 'crm_reject'), `CRM_REJECT_${applicationId}`),
        ],
      ]);

      const bot = await getBot();
      await bot.telegram.sendMessage(adminChatId, message, {
        parse_mode: 'HTML',
        ...keyboard,
      });

      logger.info('Teacher notified about new application (no-DB mode)', { applicationId, adminChatId });
    } catch (error) {
      logger.error('Failed to notify teacher about application', { applicationId, error: String(error) });
    }
  }

  async updateStatus(
    applicationId: string,
    _status: 'APPROVED' | 'REJECTED' | 'PENDING' | 'CANCELLED',
    _actionUserId: string,
    _teacherNote?: string,
  ) {
    logger.info('Application status update (no DB — not persisted)', {
      applicationId,
      status: _status,
    });
    return null;
  }

  async addNote(_applicationId: string, _note: string, _actionUserId: string) {
    logger.info('Note add (no DB — not persisted)', {
      applicationId: _applicationId,
    });
    return null;
  }

  async getStudentProfileText(_studentId: string) {
    return `${t(undefined, 'student_profile')}\n\n${t(undefined, 'profile_no_db_hint')}`;
  }
}

export const teacherCrmService = new TeacherCrmService();


