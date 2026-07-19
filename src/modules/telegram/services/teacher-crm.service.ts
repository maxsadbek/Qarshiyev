import { Markup } from 'telegraf';
import type { Telegraf } from 'telegraf';
import type { ProtectedContext } from '../middlewares/auth.middleware';
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
🆕 <b>Yangi Ariza! (offline)</b>
Ariza ID: <code>${applicationId}</code>
Holat: PENDING

<i>Ma'lumotlar bazasiz rejim — tafsilotlarni ko'rish uchun veb-panelga kiring.</i>
      `;

      const keyboard = Markup.inlineKeyboard([
        [
          Markup.button.callback('✅ Qabul qilish', `CRM_ACCEPT_${applicationId}`),
          Markup.button.callback('❌ Rad etish', `CRM_REJECT_${applicationId}`),
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
    return "👤 <b>O'quvchi profili</b>\n\n📋 <i>Ma'lumotlar bazasiz rejim — profil ma'lumotlarini ko'rish uchun veb-panelga kiring.</i>";
  }
}

export const teacherCrmService = new TeacherCrmService();


