/**
 * src/modules/telegram/services/teacher-crm.service.ts
 * CRM service for managing applications, status updates, and notifications.
 * Deduplicated: uses shared data from telegram.service.ts, no duplicate maps.
 */
import { Markup } from 'telegraf';
import type { Telegraf } from 'telegraf';
import type { ProtectedContext } from '../middlewares/auth.middleware';
import { t } from '../i18n/translations';
import { applicationStore } from '../../applications/store';
import type { RegistrationData } from '../telegram.service';
import { telegramService } from '../telegram.service';
import { withRetry } from '../bot-helpers';
import { logger } from '../../../lib/security/logger';

/**
 * Lazily resolves the bot instance to avoid circular dependency.
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
   * Notifies the admin chat about a new application with full details.
   */
  async notifyTeacher(
    applicationId: string,
    data: RegistrationData,
    ctxInfo: {
      firstName: string;
      lastName: string;
      username?: string;
      telegramId: string;
    },
    regionId?: string
  ) {
    logger.info('[CRM] Sending application to admin', { applicationId });

    const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
    if (!adminChatId) {
      logger.error('[CRM] TELEGRAM_ADMIN_CHAT_ID not set', { applicationId });
      throw new Error('TELEGRAM_ADMIN_CHAT_ID environment variable is not set');
    }

    // Resolve names using telegram service's data
    const allRegions = await telegramService.getRegions();
    const resolvedDistrict = data.districtId
      ? (await telegramService.getDistrictById(data.districtId))?.name || data.districtId
      : '—';
    const allCourses = await telegramService.getActiveCourses();

    const resolvedRegion = regionId
      ? allRegions.find((r) => r.id === regionId)?.name || regionId
      : '—';
    const resolvedCourse = data.courseId
      ? allCourses.find((c) => c.id === data.courseId)?.title || data.courseId
      : '—';

    const fullName = `${ctxInfo.firstName} ${ctxInfo.lastName}`.trim();
    const usernameDisplay = ctxInfo.username ? `@${ctxInfo.username}` : '—';
    const dateStr = new Date().toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    const noteText = data.note && data.note !== '-' ? data.note : '—';

    const message = `
━━━━━━━━━━━━━━━━━━
📝 <b>Yangi Ariza / New Application</b>
━━━━━━━━━━━━━━━━━━

👤 <b>To'liq Ism / Full Name:</b>
${fullName}

📞 <b>Telefon / Phone:</b>
${data.phone}

🌍 <b>Viloyat / Region:</b>
${resolvedRegion}

🏫 <b>Tuman / District:</b>
${resolvedDistrict}

📄 <b>Kurs / Course:</b>
${resolvedCourse} — ${data.shift || '—'}
📅 <b>Yosh / Age:</b> ${data.age}
💡 <b>Tajriba / Experience:</b> ${data.experience}
💻 <b>Noutbuk / Laptop:</b> ${data.device === 'yes' ? 'Ha / Yes' : 'Yo\'q / No'}

💬 <b>Xabar / Message:</b>
${noteText}

🆔 <b>User ID:</b>
<code>${ctxInfo.telegramId}</code>

👤 <b>Username:</b>
${usernameDisplay}

📅 <b>Sana / Date:</b>
${dateStr}

🆔 <b>Ariza ID / App ID:</b>
<code>${applicationId}</code>
━━━━━━━━━━━━━━━━━━
<b>Holat / Status: 🟡 Kutilmoqda / Pending</b>
    `;

    const keyboard = Markup.inlineKeyboard([
      [
        Markup.button.callback(t(undefined, 'crm_accept'), `CRM_ACCEPT_${applicationId}`),
        Markup.button.callback(t(undefined, 'crm_reject'), `CRM_REJECT_${applicationId}`),
      ],
      [
        Markup.button.callback('💬 ' + t(undefined, 'crm_reply'), `CRM_NOTE_${applicationId}`),
        Markup.button.callback('👤 Profil', `CRM_PROFILE_${applicationId}`),
      ],
    ]);

    const bot = await getBot();

    try {
      const result = await withRetry(() =>
        bot.telegram.sendMessage(adminChatId, message, {
          parse_mode: 'HTML',
          ...keyboard,
        }),
        { maxRetries: 3, baseDelay: 1000, label: 'notifyTeacher' }
      );

      logger.info('[CRM] Application sent to admin', {
        applicationId,
        adminChatId,
        messageId: result.message_id,
      });
    } catch (error) {
      logger.error('[CRM] Failed to send application', {
        applicationId,
        adminChatId,
        error: String(error),
      });
      throw error;
    }
  }

  /**
   * Updates application status and notifies the user.
   */
  async updateStatus(
    applicationId: string,
    status: 'APPROVED' | 'REJECTED' | 'PENDING' | 'CANCELLED',
    _actionUserId: string,
    _teacherNote?: string,
  ) {
    logger.info('[CRM] Status update', { applicationId, status, actionBy: _actionUserId });

    // Persist to in-memory store
    applicationStore.updateStatus(applicationId, status, _teacherNote);

    // Notify the user about the status change
    const app = applicationStore.getById(applicationId);
    if (app) {
      const lang = app.data.language;
      const userId = Number(app.data.telegramId);

      try {
        const bot = await getBot();
        let message = '';

        if (status === 'APPROVED') {
          message = `
✅ <b>${t(lang, 'application_status_approved')}</b>

${t(lang, 'application_approved_text')}
          `;
        } else if (status === 'REJECTED') {
          message = `
❌ <b>${t(lang, 'application_status_rejected')}</b>

${t(lang, 'application_rejected_text')}
          `;
        } else if (status === 'PENDING') {
          message = `
⏳ <b>${t(lang, 'application_status_pending')}</b>

${t(lang, 'application_pending_text')}
          `;
        }

        if (message) {
          await withRetry(
            () => bot.telegram.sendMessage(userId, message, { parse_mode: 'HTML' }).catch(() => {}),
            { maxRetries: 2, label: `notifyUser-${applicationId}` }
          );
          logger.info('[CRM] User notified', { userId, applicationId, status });
        }
      } catch (error) {
        logger.error('[CRM] Failed to notify user', {
          userId,
          applicationId,
          status,
          error: String(error),
        });
      }
    }

    return null;
  }

  /**
   * Adds a note to an application.
   */
  async addNote(applicationId: string, note: string, actionUserId: string) {
    logger.info('[CRM] Note added', { applicationId, actionUserId });
    // In no-db mode, notes are not persisted
    return null;
  }

  /**
   * Gets student profile text for display.
   */
  async getStudentProfileText(studentId: string) {
    const app = applicationStore.getById(studentId);
    if (app) {
      const allCourses = await telegramService.getActiveCourses();
      const courseName = allCourses.find((c) => c.id === app.data.courseId)?.title || app.data.courseId;

      return `
👤 <b>${app.data.firstName} ${app.data.lastName}</b>
📞 ${app.data.phone}
📋 Kurs: ${courseName}
🕒 ${app.data.shift || '—'}
🎂 Yosh: ${app.data.age}
💡 Tajriba: ${app.data.experience}
💻 Noutbuk: ${app.data.device === 'yes' ? 'Ha' : "Yo'q"}
📝 ${app.data.note && app.data.note !== '-' ? app.data.note : '—'}

🆔 <code>${app.id}</code>
📌 ${t(undefined, 'status')}: ${app.status}
📅 ${app.createdAt.toLocaleDateString()}
      `;
    }
    return `${t(undefined, 'student_profile')}\n\n${t(undefined, 'profile_no_db_hint')}`;
  }
}

export const teacherCrmService = new TeacherCrmService();
