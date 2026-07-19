import { Markup } from 'telegraf';
import type { Telegraf } from 'telegraf';
import type { ProtectedContext } from '../middlewares/auth.middleware';
import { t } from '../i18n/translations';
import { applicationStore } from '../../applications/store';
import type { RegistrationData } from '../telegram.service';
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

// ── Hardcoded lookup maps (mirrors telegram.service.ts) ────────────

const REGION_NAMES: Record<string, string> = {
  toshkent: 'Toshkent',
  samarqand: 'Samarqand',
  buxoro: 'Buxoro',
  qashqadaryo: 'Qashqadaryo',
  surxondaryo: 'Surxondaryo',
  andijon: 'Andijon',
  namangan: 'Namangan',
  fargona: "Farg'ona",
  jizzax: 'Jizzax',
  navoiy: 'Navoiy',
  xorazm: 'Xorazm',
  sirdaryo: 'Sirdaryo',
  qoraqalpogiston: "Qoraqalpog'iston",
};

const DISTRICT_NAMES: Record<string, string> = {
  chilonzor: 'Chilonzor',
  sergeli: 'Sergeli',
  'mirzo-ulugbek': "Mirzo Ulug'bek",
  yunusobod: 'Yunusobod',
  ishtixon: 'Ishtixon',
  kattakurgon: 'Kattakurgon',
  'samarqand-shahar': 'Samarqand shahar',
  urgut: 'Urgut',
  'buxoro-shahar': 'Buxoro shahar',
  kogon: 'Kogon',
  romitan: 'Romitan',
  vobkent: 'Vobkent',
  kitob: 'Kitob',
  koson: 'Koson',
  qarshi: 'Qarshi',
  shahrisabz: 'Shahrisabz',
  boysun: 'Boysun',
  denov: 'Denov',
  sariosiyo: 'Sariosiyo',
  termiz: 'Termiz',
  'andijon-shahar': 'Andijon shahar',
  asaka: 'Asaka',
  shahrixon: 'Shahrixon',
  xonobod: 'Xonobod',
  chust: 'Chust',
  mingbuloq: 'Mingbuloq',
  'namangan-shahar': 'Namangan shahar',
  pop: 'Pop',
  bgdod: "Bag'dod",
  'fargona-shahar': "Farg'ona shahar",
  quva: 'Quva',
  rishton: 'Rishton',
  baxmal: 'Baxmal',
  dustlik: 'Dustlik',
  'jizzax-shahar': 'Jizzax shahar',
  zomin: 'Zomin',
  'navoiy-shahar': 'Navoiy shahar',
  nurota: 'Nurota',
  qiziltepa: 'Qiziltepa',
  zarafshon: 'Zarafshon',
  bogot: "Bog'ot",
  urganch: 'Urganch',
  xiva: 'Xiva',
  yangibozor: 'Yangibozor',
  guliston: 'Guliston',
  oqoltin: 'Oqoltin',
  'sirdaryo-shahar': 'Sirdaryo shahar',
  yangiyer: 'Yangiyer',
  moynoq: "Mo'ynoq",
  nukus: 'Nukus',
};

const COURSE_TITLES: Record<string, string> = {
  backend: '⚙️ Backend dasturlash (Python/Node.js)',
  'grafik-dizayn': '🎨 Grafik dizayn',
  'ingliz-tili': '🇬🇧 Ingliz tili',
  mobile: '📱 Mobil dasturlash',
  smm: '📊 SMM / Marketing',
  'web-dasturlash': '🌐 Web dasturlash (Frontend)',
};

export class TeacherCrmService {
  /**
   * Notifies the admin chat about a new application.
   * Uses the full wizard data to format a complete notification.
   * Never sends an offline fallback — always sends the full application.
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
    console.log('[Application] Sending application to admin...', { applicationId });

    const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
    console.log('[Application] TELEGRAM_ADMIN_CHAT_ID =', adminChatId);

    if (!adminChatId) {
      const errMsg = 'TELEGRAM_ADMIN_CHAT_ID environment variable is not set';
      console.error('[Application] Failed to send application:', errMsg);
      logger.error('Failed to send application', { applicationId, error: errMsg });
      throw new Error(errMsg);
    }

    const resolvedRegion = (regionId ? REGION_NAMES[regionId] : undefined) || data.districtId;
    const resolvedDistrict = DISTRICT_NAMES[data.districtId] || data.districtId;
    const resolvedSchool = COURSE_TITLES[data.courseId] || data.courseId;

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

👤 <b>To\'liq Ism / Full Name:</b>
${fullName}

📞 <b>Telefon / Phone:</b>
${data.phone}

🌍 <b>Viloyat / Region:</b>
${resolvedRegion}

🏫 <b>Maktab / School:</b>
${resolvedDistrict}

📄 <b>Ariza Turi / Application Type:</b>
${resolvedSchool} — ${data.shift || '—'}

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
      ],
    ]);

    const bot = await getBot();

    try {
      const result = await bot.telegram.sendMessage(adminChatId, message, {
        parse_mode: 'HTML',
        ...keyboard,
      });

      console.log('[Application] Full application sent successfully', {
        applicationId,
        adminChatId,
        messageId: result.message_id,
      });

      logger.info('Teacher notified with full application data', {
        applicationId,
        adminChatId,
        messageId: result.message_id,
      });
    } catch (error) {
      const fullError =
        error instanceof Object
          ? JSON.stringify(error, Object.getOwnPropertyNames(error))
          : String(error);

      console.error('[Application] Failed to send application', {
        applicationId,
        adminChatId,
        error: fullError,
      });

      logger.error('Failed to send application', {
        applicationId,
        adminChatId,
        error: fullError,
      });

      // Re-throw so the caller knows the notification failed
      throw error;
    }
  }

  async updateStatus(
    applicationId: string,
    status: 'APPROVED' | 'REJECTED' | 'PENDING' | 'CANCELLED',
    _actionUserId: string,
    _teacherNote?: string,
  ) {
    logger.info('Application status update', {
      applicationId,
      status,
    });

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
          await bot.telegram.sendMessage(userId, message, { parse_mode: 'HTML' }).catch(() => {});
        }
      } catch (error) {
        const fullError =
            error instanceof Object
              ? JSON.stringify(error, Object.getOwnPropertyNames(error))
              : String(error);
          logger.error('Failed to notify user about status change', {
            userId,
            applicationId,
            status,
            error: fullError,
          });
      }
    }

    return null;
  }

  async addNote(_applicationId: string, _note: string, _actionUserId: string) {
    logger.info('Note add (no DB — not persisted)', {
      applicationId: _applicationId,
    });
    return null;
  }

  async getStudentProfileText(_studentId: string) {
    const app = applicationStore.getById(_studentId);
    if (app) {
      return `
👤 <b>${app.data.firstName} ${app.data.lastName}</b>
📞 ${app.data.phone}
📋 ${t(undefined, 'application_id')}: <code>${app.id}</code>
📌 ${t(undefined, 'status')}: ${app.status}
📅 ${app.createdAt.toLocaleDateString()}
      `;
    }
    return `${t(undefined, 'student_profile')}\n\n${t(undefined, 'profile_no_db_hint')}`;
  }
}

export const teacherCrmService = new TeacherCrmService();


