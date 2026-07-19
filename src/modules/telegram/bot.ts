import { Telegraf, Scenes, Markup } from 'telegraf';
import { sessionMiddleware } from './middlewares/session.middleware';
import { teacherAdminOnly, type ProtectedContext } from './middlewares/auth.middleware';
import { registrationWizard } from './scenes/registration.wizard';
import { writeNoteWizard } from './scenes/write-note.wizard';
import { teacherCrmService } from './services/teacher-crm.service';
import { applicationStore } from '../applications/store';
import { t } from './i18n/translations';
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
  const userId = ctx.from?.id;
  logger.info('[Telegram] /start command', { from: userId });

  // Track the user
  if (userId) applicationStore.trackUser(userId);

  try {
    // CRITICAL: Must await scene.enter() to ensure the session
    // is modified BEFORE the session middleware saves it.
    // Without await, a race condition occurs where the session
    // is saved without __scenes, and callback queries never
    // reach the wizard.
    await ctx.scene.enter('REGISTRATION_WIZARD');
    logger.info('[Telegram] Scene entered: REGISTRATION_WIZARD', {
      from: userId,
    });
  } catch (error) {
    logger.error('[Telegram] Failed to enter REGISTRATION_WIZARD', {
      error: String(error),
      from: userId,
    });
    await ctx.reply(t(undefined, 'error_generic_with_start')).catch(() => {});
  }
});

// ── Admin: /stats ──────────────────────────────────────────────────
bot.command('stats', teacherAdminOnly(), async (ctx) => {
  const userId = ctx.from?.id;
  logger.info('[Telegram] /stats command', { from: userId });

  const stats = applicationStore.getStats();
  const userCount = applicationStore.getUserCount();
  const totalPages = Math.max(1, Math.ceil(stats.total / 10));

  const message = `
📊 <b>${t(undefined, 'stats_title')}</b>

📋 ${t(undefined, 'stats_total_applications')}: <b>${stats.total}</b>
⏳ ${t(undefined, 'stats_pending')}: <b>${stats.pending}</b>
✅ ${t(undefined, 'stats_approved')}: <b>${stats.approved}</b>
❌ ${t(undefined, 'stats_rejected')}: <b>${stats.rejected}</b>

👥 ${t(undefined, 'stats_users')}: <b>${userCount}</b>
📄 ${t(undefined, 'stats_pages')}: ${totalPages}
  `;

  await ctx.reply(message, {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      [Markup.button.callback('🔄 ' + t(undefined, 'admin_refresh'), 'ADMIN_STATS')],
      [Markup.button.callback('📋 ' + t(undefined, 'admin_view_applications'), 'ADMIN_APPS')],
      [Markup.button.callback('🏠 ' + t(undefined, 'admin_menu'), 'ADMIN_MENU')],
    ]),
  }).catch(() => {});
});

// ── Admin: /users ──────────────────────────────────────────────────
bot.command('users', teacherAdminOnly(), async (ctx) => {
  const userId = ctx.from?.id;
  logger.info('[Telegram] /users command', { from: userId });

  const userCount = applicationStore.getUserCount();
  const stats = applicationStore.getStats();

  const message = `
👥 <b>${t(undefined, 'users_title')}</b>

${t(undefined, 'users_total')}: <b>${userCount}</b>
📋 ${t(undefined, 'users_applications')}: <b>${stats.total}</b>
✅ ${t(undefined, 'users_approved')}: <b>${stats.approved}</b>
❌ ${t(undefined, 'users_rejected')}: <b>${stats.rejected}</b>
⏳ ${t(undefined, 'users_pending')}: <b>${stats.pending}</b>
  `;

  await ctx.reply(message, {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      [Markup.button.callback('🔄 ' + t(undefined, 'admin_refresh'), 'ADMIN_USERS')],
      [Markup.button.callback('📊 ' + t(undefined, 'admin_stats'), 'ADMIN_STATS')],
      [Markup.button.callback('🏠 ' + t(undefined, 'admin_menu'), 'ADMIN_MENU')],
    ]),
  }).catch(() => {});
});

// ── Admin: /broadcast ──────────────────────────────────────────────
bot.command('broadcast', teacherAdminOnly(), async (ctx) => {
  const userId = ctx.from?.id;
  logger.info('[Telegram] /broadcast command', { from: userId });

  // Get the message text after the command
  const text = ctx.message && 'text' in ctx.message ? ctx.message.text : '';
  const messageText = text.replace(/^\/broadcast\s*/i, '').trim();

  if (!messageText) {
    await ctx.reply(
      t(undefined, 'broadcast_usage'),
      Markup.inlineKeyboard([
        [Markup.button.callback('🏠 ' + t(undefined, 'admin_menu'), 'ADMIN_MENU')],
      ])
    ).catch(() => {});
    return;
  }

  const allUsers = applicationStore.getAllUserIds();
  let sent = 0;
  let failed = 0;

  await ctx.reply(
    `📢 ${t(undefined, 'broadcast_start')}\n👥 ${t(undefined, 'users_total')}: ${allUsers.length}`
  ).catch(() => {});

  for (const uid of allUsers) {
    try {
      await ctx.telegram.sendMessage(uid, `📢 <b>${t(undefined, 'broadcast_header')}</b>\n\n${messageText}`, {
        parse_mode: 'HTML',
      });
      sent++;
    } catch {
      failed++;
    }
    // Small delay to avoid hitting rate limits
    await new Promise((r) => setTimeout(r, 50));
  }

  const result = `
✅ <b>${t(undefined, 'broadcast_done')}</b>
📨 ${t(undefined, 'broadcast_sent')}: <b>${sent}</b>
❌ ${t(undefined, 'broadcast_failed')}: <b>${failed}</b>
  `;

  await ctx.reply(result, {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      [Markup.button.callback('📊 ' + t(undefined, 'admin_stats'), 'ADMIN_STATS')],
      [Markup.button.callback('🏠 ' + t(undefined, 'admin_menu'), 'ADMIN_MENU')],
    ]),
  }).catch(() => {});
});

// ── Safe answerCbQuery helper ────────────────────────────────────
// Prevents "answerCbQuery isn't available for message" TypeError.
// Must only be called when ctx.callbackQuery is truthy.
async function safeAnswerCbQuery(ctx: ProtectedContext, text?: string): Promise<void> {
  if (ctx.callbackQuery) {
    try {
      await ctx.answerCbQuery(text);
    } catch {
      // Silently ignore
    }
  }
}

// ── Admin Menu ────────────────────────────────────────────────────────
bot.action('ADMIN_MENU', teacherAdminOnly(), async (ctx) => {
  await safeAnswerCbQuery(ctx);
  await ctx.editMessageText(
    `🏠 <b>${t(undefined, 'admin_menu_title')}</b>\n\n${t(undefined, 'admin_menu_desc')}`,
    {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [
          Markup.button.callback('📊 ' + t(undefined, 'admin_stats'), 'ADMIN_STATS'),
          Markup.button.callback('👥 ' + t(undefined, 'admin_users'), 'ADMIN_USERS'),
        ],
        [
          Markup.button.callback('📋 ' + t(undefined, 'admin_view_applications'), 'ADMIN_APPS'),
          Markup.button.callback('📢 ' + t(undefined, 'admin_broadcast'), 'ADMIN_BROADCAST'),
        ],
      ]),
    }
  ).catch(() => {});
});

bot.action('ADMIN_STATS', teacherAdminOnly(), async (ctx) => {
  await safeAnswerCbQuery(ctx);
  const stats = applicationStore.getStats();
  const userCount = applicationStore.getUserCount();
  const message = `
📊 <b>${t(undefined, 'stats_title')}</b>

📋 ${t(undefined, 'stats_total_applications')}: <b>${stats.total}</b>
⏳ ${t(undefined, 'stats_pending')}: <b>${stats.pending}</b>
✅ ${t(undefined, 'stats_approved')}: <b>${stats.approved}</b>
❌ ${t(undefined, 'stats_rejected')}: <b>${stats.rejected}</b>

👥 ${t(undefined, 'stats_users')}: <b>${userCount}</b>
  `;
  await ctx.editMessageText(message, {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      [Markup.button.callback('🔄 ' + t(undefined, 'admin_refresh'), 'ADMIN_STATS')],
      [Markup.button.callback('👥 ' + t(undefined, 'admin_users'), 'ADMIN_USERS')],
      [Markup.button.callback('🏠 ' + t(undefined, 'admin_menu'), 'ADMIN_MENU')],
    ]),
  }).catch(() => {});
});

bot.action('ADMIN_USERS', teacherAdminOnly(), async (ctx) => {
  await safeAnswerCbQuery(ctx);
  const userCount = applicationStore.getUserCount();
  const stats = applicationStore.getStats();
  const message = `
👥 <b>${t(undefined, 'users_title')}</b>

${t(undefined, 'users_total')}: <b>${userCount}</b>
📋 ${t(undefined, 'users_applications')}: <b>${stats.total}</b>
✅ ${t(undefined, 'users_approved')}: <b>${stats.approved}</b>
❌ ${t(undefined, 'users_rejected')}: <b>${stats.rejected}</b>
⏳ ${t(undefined, 'users_pending')}: <b>${stats.pending}</b>
  `;
  await ctx.editMessageText(message, {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      [Markup.button.callback('🔄 ' + t(undefined, 'admin_refresh'), 'ADMIN_USERS')],
      [Markup.button.callback('📊 ' + t(undefined, 'admin_stats'), 'ADMIN_STATS')],
      [Markup.button.callback('🏠 ' + t(undefined, 'admin_menu'), 'ADMIN_MENU')],
    ]),
  }).catch(() => {});
});

bot.action('ADMIN_APPS', teacherAdminOnly(), async (ctx) => {
  await safeAnswerCbQuery(ctx);
  const stats = applicationStore.getStats();
  await ctx.editMessageText(
    `📋 <b>${t(undefined, 'admin_applications')}</b>\n\n${t(undefined, 'admin_apps_desc')}\n\n📊 ${t(undefined, 'stats_total_applications')}: <b>${stats.total}</b>`,
    {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [Markup.button.url('🌐 ' + t(undefined, 'admin_open_panel'), `${getEnv().NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/applications`)],
        [Markup.button.callback('📊 ' + t(undefined, 'admin_stats'), 'ADMIN_STATS')],
        [Markup.button.callback('🏠 ' + t(undefined, 'admin_menu'), 'ADMIN_MENU')],
      ]),
    }
  ).catch(() => {});
});

bot.action('ADMIN_BROADCAST', teacherAdminOnly(), async (ctx) => {
  await safeAnswerCbQuery(ctx);
  await ctx.editMessageText(
    `📢 <b>${t(undefined, 'broadcast_usage')}</b>\n\n${t(undefined, 'broadcast_usage_detail')}`,
    {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('🏠 ' + t(undefined, 'admin_menu'), 'ADMIN_MENU')],
      ]),
    }
  ).catch(() => {});
});

// ── Admin menu from CRM notifications ──────────────────────────────

// ── CRM ACTION HANDLERS ────────────────────────────────────────────

bot.action(/CRM_ACCEPT_(.+)/, teacherAdminOnly(), async (ctx) => {
  const appId = ctx.match[1];
  logger.info('[Telegram] CRM_ACCEPT (no-DB mode)', { appId });

  try {
    await teacherCrmService.updateStatus(appId, 'APPROVED', 'no-db-mode');
    await ctx.editMessageText(
      ((ctx.callbackQuery?.message as { text?: string } | undefined)?.text ?? '') + '\n\n' + t(undefined, 'status_approved')
    ).catch(() => {});
    await safeAnswerCbQuery(ctx, t(undefined, 'approved'));
  } catch (error) {
    logger.error('[Telegram] Failed to approve application', { appId, error: String(error) });
    await safeAnswerCbQuery(ctx, t(undefined, 'error_generic'));
  }
});

bot.action(/CRM_REJECT_(.+)/, teacherAdminOnly(), async (ctx) => {
  const appId = ctx.match[1];
  logger.info('[Telegram] CRM_REJECT (no-DB mode)', { appId });

  try {
    await teacherCrmService.updateStatus(appId, 'REJECTED', 'no-db-mode');
    await ctx.editMessageText(
      ((ctx.callbackQuery?.message as { text?: string } | undefined)?.text ?? '') + '\n\n' + t(undefined, 'status_rejected')
    ).catch(() => {});
    await safeAnswerCbQuery(ctx, t(undefined, 'rejected'));
  } catch (error) {
    logger.error('[Telegram] Failed to reject application', { appId, error: String(error) });
    await safeAnswerCbQuery(ctx, t(undefined, 'error_generic'));
  }
});

bot.action(/CRM_PENDING_(.+)/, teacherAdminOnly(), async (ctx) => {
  const appId = ctx.match[1];
  logger.info('[Telegram] CRM_PENDING (no-DB mode)', { appId });

  try {
    await teacherCrmService.updateStatus(appId, 'PENDING', 'no-db-mode');
    await ctx.editMessageText(
      ((ctx.callbackQuery?.message as { text?: string } | undefined)?.text ?? '') + '\n\n' + t(undefined, 'status_pending')
    ).catch(() => {});
    await safeAnswerCbQuery(ctx, t(undefined, 'pending'));
  } catch (error) {
    logger.error('[Telegram] Failed to set application to pending', { appId, error: String(error) });
    await safeAnswerCbQuery(ctx, t(undefined, 'error_generic'));
  }
});

bot.action(/CRM_NOTE_(.+)/, teacherAdminOnly(), async (ctx) => {
  const appId = ctx.match[1];
  logger.info('[Telegram] CRM_NOTE (no-DB mode)', { appId });

  await safeAnswerCbQuery(ctx);
  await ctx.scene.enter('CRM_WRITE_NOTE', {
    applicationId: appId,
    actionUserId: 'no-db-mode',
  });
});

bot.action(/CRM_PROFILE_(.+)/, teacherAdminOnly(), async (ctx) => {
  const studentId = ctx.match[1];
  logger.info('[Telegram] CRM_PROFILE', { studentId });

  try {
    const profileText = await teacherCrmService.getStudentProfileText(studentId);
    await ctx.reply(profileText, { parse_mode: 'HTML' }).catch(() => {});
    await safeAnswerCbQuery(ctx);
  } catch (error) {
    logger.error('[Telegram] Failed to fetch student profile', { studentId, error: String(error) });
    await safeAnswerCbQuery(ctx, t(undefined, 'profile_load_error'));
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
//  DISTRICT_*, REGION_*) AND CRM callbacks so that callbacks ALREADY
// handled by the active scene wizard or CRM handlers are NOT processed
// here. If we used /.*/, the catch-all would fire AFTER the scene
// processed the callback and call ctx.scene.enter() again, which would
// reset the session and re-display buttons — causing an infinite loop.
bot.action(
  /^(?!(?:LANG_UZ|LANG_RU|LANG_EN|CONFIRM|CANCEL|DEVICE_|SHIFT_|COURSE_|DISTRICT_|REGION_|ADMIN_|CRM_))/,
  async (ctx) => {
    const data = ctx.callbackQuery && 'data' in ctx.callbackQuery
      ? ctx.callbackQuery.data
      : 'unknown';

    logger.info('[Telegram] Catch-all callback', { data, from: ctx.from?.id });

    try {
      // Acknowledge the callback to prevent Telegram's "button loading" state
      await safeAnswerCbQuery(ctx);
    } catch (error) {
      logger.error('[Telegram] Catch-all handler error', { error: String(error), data });
    }
  }
);

export default bot;
