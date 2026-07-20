/**
 * src/modules/telegram/services/teacher-crm.service.ts
 * Production-quality CRM service for managing applications, status updates,
 * notifications, reminders, history tracking, and admin logging.
 *
 * Features:
 *   - Premium application cards
 *   - Contacted / Important / Reminder / History
 *   - Duplicate action protection
 *   - Full admin action logging
 *   - Multilingual user notifications
 */
import { Markup } from 'telegraf';
import type { Telegraf } from 'telegraf';
import type { ProtectedContext } from '../middlewares/auth.middleware';
import { t } from '../i18n/translations';
import { applicationStore } from '../../applications/store';
import type { Application, HistoryEntry, ApplicationStatusType } from '../../applications/store';
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

function formatDate(date: Date): string {
  return date.toLocaleDateString('uz-UZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getStatusEmoji(status: ApplicationStatusType): string {
  switch (status) {
    case 'PENDING': return '🟡';
    case 'CONTACTED': return '🔵';
    case 'APPROVED': return '✅';
    case 'REJECTED': return '❌';
    case 'CANCELLED': return '🚫';
    default: return '⚪';
  }
}

function getPriorityLabel(app: Application): string {
  return app.important ? '⭐ HIGH' : '—';
}

function getStatusLabel(status: ApplicationStatusType): string {
  switch (status) {
    case 'PENDING': return '🟡 Kutilmoqda / Pending';
    case 'CONTACTED': return '🔵 Bog\'landi / Contacted';
    case 'APPROVED': return '✅ Qabul qilindi / Approved';
    case 'REJECTED': return '❌ Rad etildi / Rejected';
    case 'CANCELLED': return '🚫 Bekor qilindi / Cancelled';
    default: return status;
  }
}

export class TeacherCrmService {
  /**
   * Builds a premium application card.
   */
  async buildPremiumCard(
    applicationId: string,
    data: RegistrationData,
    ctxInfo: {
      firstName: string;
      lastName: string;
      username?: string;
      telegramId: string;
    },
    regionId?: string
  ): Promise<{ message: string; resolvedRegion: string; resolvedDistrict: string; resolvedCourse: string }> {
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
    const dateStr = formatDate(new Date());
    const noteText = data.note && data.note !== '-' ? data.note : '—';

    const app = applicationStore.getById(applicationId);
    const priorityLabel = app ? getPriorityLabel(app) : '—';
    const statusEmoji = app ? getStatusEmoji(app.status) : '🟡';
    const statusLabel = app ? getStatusLabel(app.status) : '🟡 Kutilmoqda / Pending';

    const message = `
━━━━━━━━━━━━━━━━━━
📝 <b>Yangi Ariza / New Application</b>
━━━━━━━━━━━━━━━━━━

👤 <b>Ism / Name:</b>
${fullName}

📞 <b>Telefon / Phone:</b>
${data.phone}

🌍 <b>Viloyat / Region:</b>
${resolvedRegion}

🏫 <b>Tuman / District:</b>
${resolvedDistrict}

📚 <b>Kurs / Course:</b>
${resolvedCourse}

🕒 <b>Smena / Shift:</b>
${data.shift || '—'}

🎂 <b>Yosh / Age:</b>
${data.age}

💡 <b>Tajriba / Experience:</b>
${data.experience}

💻 <b>Noutbuk / Laptop:</b>
${data.device === 'yes' ? 'Ha / Yes' : "Yo'q / No"}

💬 <b>Xabar / Message:</b>
${noteText}

━━━━━━━━━━━━━━━━━━

🆔 <b>User ID:</b>
<code>${ctxInfo.telegramId}</code>

👤 <b>Username:</b>
${usernameDisplay}

📅 <b>Sana / Date:</b>
${dateStr}

⭐ <b>Priority:</b>
${priorityLabel}

📍 <b>Holat / Status:</b>
${statusEmoji} ${statusLabel}

━━━━━━━━━━━━━━━━━━
    `;

    return { message, resolvedRegion, resolvedDistrict, resolvedCourse };
  }

  /**
   * Builds the inline keyboard for the premium application card.
   */
  buildPremiumKeyboard(applicationId: string): ReturnType<typeof Markup.inlineKeyboard> {
    return Markup.inlineKeyboard([
      [
        Markup.button.callback(t(undefined, 'crm_accept'), `CRM_ACCEPT_${applicationId}`),
        Markup.button.callback(t(undefined, 'crm_reject'), `CRM_REJECT_${applicationId}`),
      ],
      [
        Markup.button.callback(t(undefined, 'crm_contacted'), `CRM_CONTACTED_${applicationId}`),
        Markup.button.callback(t(undefined, 'crm_important'), `CRM_IMPORTANT_${applicationId}`),
      ],
      [
        Markup.button.callback(t(undefined, 'crm_add_note'), `CRM_NOTE_${applicationId}`),
        Markup.button.callback(t(undefined, 'crm_history'), `CRM_HISTORY_${applicationId}`),
      ],
      [
        Markup.button.callback(t(undefined, 'crm_profile'), `CRM_PROFILE_${applicationId}`),
        Markup.button.callback(t(undefined, 'crm_copy_id'), `CRM_COPY_ID_${applicationId}`),
      ],
      [
        Markup.button.callback(t(undefined, 'crm_reminder'), `CRM_REMINDER_${applicationId}`),
      ],
    ]);
  }

  /**
   * Notifies the admin chat about a new application with a premium card.
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

    const { message } = await this.buildPremiumCard(applicationId, data, ctxInfo, regionId);
    const keyboard = this.buildPremiumKeyboard(applicationId);

    const bot = await getBot();

    try {
      const result = await withRetry(() =>
        bot.telegram.sendMessage(adminChatId, message, {
          parse_mode: 'HTML',
          ...keyboard,
        }),
        { maxRetries: 3, baseDelay: 1000, label: 'notifyTeacher' }
      );

      logger.info('[CRM] Premium application sent to admin', {
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
    status: ApplicationStatusType,
    _actionUserId: string,
    _teacherNote?: string,
  ) {
    logger.info('[CRM] Status update', { applicationId, status, actionBy: _actionUserId });

    // Persist to in-memory store
    applicationStore.updateStatus(applicationId, status, _teacherNote);
    applicationStore.addHistoryEntry(applicationId, `Status changed to ${status}`, undefined, _actionUserId);

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
        } else if (status === 'CONTACTED') {
          message = `
🔵 <b>${t(lang, 'application_status_contacted')}</b>

${t(lang, 'application_contacted_text')}
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

    // Admin logging
    this.logAdminAction(applicationId, status === 'APPROVED' ? 'accepted' : status === 'REJECTED' ? 'rejected' : 'updated', _actionUserId);

    return null;
  }

  /**
   * Marks an application as contacted.
   */
  async markContacted(applicationId: string, adminId: string): Promise<boolean> {
    logger.info('[CRM] Mark contacted', { applicationId, adminId });

    if (applicationStore.isAlreadyActioned(applicationId, 'CONTACTED')) {
      logger.warn('[CRM] Already contacted', { applicationId });
      return false;
    }

    const success = applicationStore.setContacted(applicationId, adminId);
    if (!success) return false;

    // Notify the user
    const app = applicationStore.getById(applicationId);
    if (app) {
      const lang = app.data.language;
      const userId = Number(app.data.telegramId);
      try {
        const bot = await getBot();
        const message = `
🔵 <b>${t(lang, 'application_status_contacted')}</b>

${t(lang, 'application_contacted_text')}
        `;
        await bot.telegram.sendMessage(userId, message, { parse_mode: 'HTML' });
      } catch (error) {
        logger.error('[CRM] Failed to notify contacted user', { applicationId, error: String(error) });
      }
    }

    this.logAdminAction(applicationId, 'contacted', adminId);
    return true;
  }

  /**
   * Toggles important status on an application.
   */
  async toggleImportant(applicationId: string, adminId: string): Promise<{ important: boolean } | null> {
    logger.info('[CRM] Toggle important', { applicationId, adminId });

    const app = applicationStore.getById(applicationId);
    if (!app) return null;

    let important: boolean;
    if (app.important) {
      applicationStore.unmarkImportant(applicationId);
      important = false;
    } else {
      applicationStore.markImportant(applicationId, adminId);
      important = true;
    }

    this.logAdminAction(applicationId, 'important', adminId);
    return { important };
  }

  /**
   * Creates a reminder for an application.
   */
  async createReminder(applicationId: string, remindAt: Date, adminId: string): Promise<boolean> {
    logger.info('[CRM] Create reminder', { applicationId, remindAt, adminId });

    if (applicationStore.hasReminder(applicationId)) {
      logger.warn('[CRM] Duplicate reminder', { applicationId });
      return false;
    }

    const success = applicationStore.setReminder(applicationId, remindAt, adminId);
    if (success) {
      this.logAdminAction(applicationId, 'reminder', adminId);
    }
    return success;
  }

  /**
   * Gets formatted history text for an application.
   */
  getHistoryText(applicationId: string): string {
    const history = applicationStore.getHistory(applicationId);
    if (history.length === 0) {
      return `📝 <b>${t(undefined, 'history_title')}</b>\n\n${t(undefined, 'history_no_entries')}`;
    }

    let text = `━━━━━━━━━━━━━━━━━━\n📝 <b>${t(undefined, 'history_title')}</b>\n━━━━━━━━━━━━━━━━━━\n\n`;

    for (const entry of history) {
      const time = formatDate(entry.timestamp);
      text += `<b>${time}</b>\n${entry.action}`;
      if (entry.details) {
        text += ` — ${entry.details}`;
      }
      text += '\n\n';
    }

    return text;
  }

  /**
   * Adds a note to an application (with history entry).
   */
  async addNote(applicationId: string, note: string, actionUserId: string): Promise<boolean> {
    logger.info('[CRM] Note added', { applicationId, actionUserId });
    const success = applicationStore.addNote(applicationId, note, actionUserId);
    if (success) {
      this.logAdminAction(applicationId, 'note', actionUserId);
    }
    return success;
  }

  /**
   * Gets student profile text for display.
   */
  async getStudentProfileText(studentId: string): Promise<string> {
    const app = applicationStore.getById(studentId);
    if (app) {
      const allCourses = await telegramService.getActiveCourses();
      const courseName = allCourses.find((c) => c.id === app.data.courseId)?.title || app.data.courseId;

      const priorityLabel = getPriorityLabel(app);

      return `
━━━━━━━━━━━━━━━━━━
👤 <b>${t(undefined, 'student_profile')}</b>
━━━━━━━━━━━━━━━━━━

👤 <b>${app.data.firstName} ${app.data.lastName}</b>
📞 ${app.data.phone}
📋 Kurs: ${courseName}
🕒 ${app.data.shift || '—'}
🎂 Yosh: ${app.data.age}
💡 Tajriba: ${app.data.experience}
💻 Noutbuk: ${app.data.device === 'yes' ? 'Ha' : "Yo'q"}
📝 ${app.data.note && app.data.note !== '-' ? app.data.note : '—'}

━━━━━━━━━━━━━━━━━━

🆔 <code>${app.id}</code>
⭐ Priority: ${priorityLabel}
📍 ${t(undefined, 'status')}: ${getStatusEmoji(app.status)} ${app.status}
📅 ${formatDate(app.createdAt)}

📞 ${app.contactedBy ? `${t(undefined, 'contacted_by')} ${app.contactedBy}` : ''}
${app.contactedAt ? `${t(undefined, 'contacted_at')} ${formatDate(app.contactedAt)}` : ''}
      `;
    }
    return `${t(undefined, 'student_profile')}\n\n${t(undefined, 'profile_no_db_hint')}`;
  }

  /**
   * Logs an admin action using the application's logger channel.
   */
  private logAdminAction(applicationId: string, action: string, adminId: string): void {
    const actionLabels: Record<string, string> = {
      accepted: t(undefined, 'admin_log_accepted'),
      rejected: t(undefined, 'admin_log_rejected'),
      contacted: t(undefined, 'admin_log_contacted'),
      important: t(undefined, 'admin_log_important'),
      reminder: t(undefined, 'admin_log_reminder'),
      note: t(undefined, 'admin_log_note'),
      updated: `[Admin] Status update on ${applicationId}`,
    };

    const label = actionLabels[action] || `[Admin] ${action}`;
    logger.info(`[Admin][${adminId}] ${label}`, { applicationId, adminId, action });
  }
}

export const teacherCrmService = new TeacherCrmService();
