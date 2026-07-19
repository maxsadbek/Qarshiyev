import { Telegraf, Scenes } from 'telegraf';
import { sessionMiddleware } from './middlewares/session.middleware';
import { teacherAdminOnly, type ProtectedContext } from './middlewares/auth.middleware';
import { registrationWizard } from './scenes/registration.wizard';
import { writeNoteWizard } from './scenes/write-note.wizard';
import { teacherCrmService } from './services/teacher-crm.service';
import { logger } from '../../lib/security/logger';
import { getEnv } from '../../lib/env';

const env = getEnv();

if (!env.TELEGRAM_BOT_TOKEN) {
  logger.error('TELEGRAM_BOT_TOKEN is not configured. Bot will not function.');
}

const bot = new Telegraf<ProtectedContext>(env.TELEGRAM_BOT_TOKEN ?? '');

// ── Global Error Handling ──────────────────────────────────────────
bot.catch((err, ctx) => {
  logger.error('[Telegraf] Global error caught', {
    error: String(err),
    updateType: ctx.updateType,
    updateId: ctx.update?.update_id,
    fromId: ctx.from?.id,
  });
});

// ── Logging middleware: log every incoming update ───────────────────
bot.use(async (ctx, next) => {
  const updateType = ctx.updateType;
  const updateId = ctx.update?.update_id;
  const fromId = ctx.from?.id;
  const chatId = ctx.chat?.id;

  logger.info('[Telegram] Incoming update', {
    updateId,
    updateType,
    fromId,
    chatId,
  });

  if (updateType === 'callback_query') {
    const data = ctx.callbackQuery && 'data' in ctx.callbackQuery
      ? ctx.callbackQuery.data
      : 'unknown';
    logger.info('[Telegram] Callback query received', {
      updateId,
      fromId,
      data,
    });
  }

  try {
    await next();
  } catch (error) {
    logger.error('[Telegram] Middleware error', {
      error: String(error),
      updateId,
      updateType,
    });
    throw error;
  }

  logger.info('[Telegram] Update processed', { updateId });
});

// ── Register Middleware ─────────────────────────────────────────────
bot.use(sessionMiddleware());

// ── Register Scenes ────────────────────────────────────────────────
const stage = new Scenes.Stage<ProtectedContext>([registrationWizard, writeNoteWizard]);
bot.use(stage.middleware());

// ── Commands ───────────────────────────────────────────────────────
bot.start(async (ctx) => {
  logger.info('[Telegram] /start command', { from: ctx.from?.id });

  try {
    // CRITICAL: Must await scene.enter() to ensure the session
    // is modified BEFORE the session middleware saves it.
    // Without await, a race condition occurs where the session
    // is saved without __scenes, and callback queries never
    // reach the wizard.
    await ctx.scene.enter('REGISTRATION_WIZARD');
    logger.info('[Telegram] Scene entered: REGISTRATION_WIZARD', {
      from: ctx.from?.id,
    });
  } catch (error) {
    logger.error('[Telegram] Failed to enter REGISTRATION_WIZARD', {
      error: String(error),
      from: ctx.from?.id,
    });
    await ctx.reply('❌ Xatolik yuz berdi. Iltimos, qayta urinib ko\'ring (/start).').catch(() => {});
  }
});

// ── CRM ACTION HANDLERS ────────────────────────────────────────────

bot.action(/CRM_ACCEPT_(.+)/, teacherAdminOnly(), async (ctx) => {
  const appId = ctx.match[1];
  const user = ctx.user;
  logger.info('[Telegram] CRM_ACCEPT', { appId, userId: user?.id });

  if (!user) {
    await ctx.answerCbQuery('❌ Ruxsat yo‘q').catch(() => {});
    return;
  }

  try {
    await teacherCrmService.updateStatus(appId, 'APPROVED', user.id);
    await ctx.editMessageText(
      ((ctx.callbackQuery?.message as { text?: string } | undefined)?.text ?? '') + '\n\n✅ Holat: QABUL QILINDI'
    ).catch(() => {});
    await ctx.answerCbQuery('✅ Qabul qilindi').catch(() => {});
    logger.info('[Telegram] Application approved', { appId, by: user.id });
  } catch (error) {
    logger.error('[Telegram] Failed to approve application', { appId, error: String(error) });
    await ctx.answerCbQuery('❌ Xatolik yuz berdi').catch(() => {});
  }
});

bot.action(/CRM_REJECT_(.+)/, teacherAdminOnly(), async (ctx) => {
  const appId = ctx.match[1];
  const user = ctx.user;
  logger.info('[Telegram] CRM_REJECT', { appId, userId: user?.id });

  if (!user) {
    await ctx.answerCbQuery('❌ Ruxsat yo‘q').catch(() => {});
    return;
  }

  try {
    await teacherCrmService.updateStatus(appId, 'REJECTED', user.id);
    await ctx.editMessageText(
      ((ctx.callbackQuery?.message as { text?: string } | undefined)?.text ?? '') + '\n\n❌ Holat: RAD ETILDI'
    ).catch(() => {});
    await ctx.answerCbQuery('❌ Rad etildi').catch(() => {});
    logger.info('[Telegram] Application rejected', { appId, by: user.id });
  } catch (error) {
    logger.error('[Telegram] Failed to reject application', { appId, error: String(error) });
    await ctx.answerCbQuery('❌ Xatolik yuz berdi').catch(() => {});
  }
});

bot.action(/CRM_PENDING_(.+)/, teacherAdminOnly(), async (ctx) => {
  const appId = ctx.match[1];
  const user = ctx.user;
  logger.info('[Telegram] CRM_PENDING', { appId, userId: user?.id });

  if (!user) {
    await ctx.answerCbQuery('❌ Ruxsat yo‘q').catch(() => {});
    return;
  }

  try {
    await teacherCrmService.updateStatus(appId, 'PENDING', user.id);
    await ctx.editMessageText(
      ((ctx.callbackQuery?.message as { text?: string } | undefined)?.text ?? '') + '\n\n⏳ Holat: KUTTIRISHGA OLINDI'
    ).catch(() => {});
    await ctx.answerCbQuery('⏳ Kuttirishga olindi').catch(() => {});
    logger.info('[Telegram] Application set to PENDING', { appId, by: user.id });
  } catch (error) {
    logger.error('[Telegram] Failed to set application to pending', { appId, error: String(error) });
    await ctx.answerCbQuery('❌ Xatolik yuz berdi').catch(() => {});
  }
});

bot.action(/CRM_NOTE_(.+)/, teacherAdminOnly(), async (ctx) => {
  const appId = ctx.match[1];
  const user = ctx.user;
  logger.info('[Telegram] CRM_NOTE', { appId, userId: user?.id });

  if (!user) {
    await ctx.answerCbQuery('❌ Ruxsat yo‘q').catch(() => {});
    return;
  }

  await ctx.answerCbQuery().catch(() => {});
  await ctx.scene.enter('CRM_WRITE_NOTE', {
    applicationId: appId,
    actionUserId: user.id,
  });
});

bot.action(/CRM_PROFILE_(.+)/, teacherAdminOnly(), async (ctx) => {
  const studentId = ctx.match[1];
  logger.info('[Telegram] CRM_PROFILE', { studentId });

  try {
    const profileText = await teacherCrmService.getStudentProfileText(studentId);
    await ctx.reply(profileText, { parse_mode: 'HTML' }).catch(() => {});
    await ctx.answerCbQuery().catch(() => {});
  } catch (error) {
    logger.error('[Telegram] Failed to fetch student profile', { studentId, error: String(error) });
    await ctx.answerCbQuery('❌ Profilni yuklab bo\'lmadi').catch(() => {});
  }
});

// ── Catch-all callback handler ─────────────────────────────────────
// This ensures EVERY callback query is answered, even if:
// - Session state was lost (scene not active)
// - No CRM handler matched the callback data
// - An unexpected callback_data value was sent
// Without this, Telegram shows "button loading" indefinitely.
//
// IMPORTANT: The regex explicitly EXCLUDES scene-related callbacks
// (LANG_UZ, LANG_RU, CONFIRM, CANCEL, DEVICE_*, SHIFT_*, COURSE_*,
//  DISTRICT_*, REGION_*) so that callbacks ALREADY handled by the
// active scene wizard are NOT processed here. If we used /.*/, the
// catch-all would fire AFTER the scene processed the callback and
// call ctx.scene.enter() again, which would reset the session and
// re-display buttons — causing an infinite loop.
bot.action(
  /^(?!(?:LANG_UZ|LANG_RU|CONFIRM|CANCEL|DEVICE_|SHIFT_|COURSE_|DISTRICT_|REGION_))/,
  async (ctx) => {
    const data = ctx.callbackQuery && 'data' in ctx.callbackQuery
      ? ctx.callbackQuery.data
      : 'unknown';

    logger.info('[Telegram] Catch-all callback', { data, from: ctx.from?.id });

    try {
      // Acknowledge the callback to prevent Telegram's "button loading" state
      await ctx.answerCbQuery().catch(() => {});
    } catch (error) {
      logger.error('[Telegram] Catch-all handler error', { error: String(error), data });
    }
  }
);

export default bot;
