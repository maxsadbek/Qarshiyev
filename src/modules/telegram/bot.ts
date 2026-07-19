/**
 * src/modules/telegram/bot.ts
 * Main Telegram bot for the education center.
 * Handles user registration, admin commands, and CRM notifications.
 */
import { Telegraf, Scenes, Markup } from 'telegraf';
import { sessionMiddleware } from './middlewares/session.middleware';
import { teacherAdminOnly, type ProtectedContext } from './middlewares/auth.middleware';
import { registrationWizard } from './scenes/registration.wizard';
import { writeNoteWizard } from './scenes/write-note.wizard';
import { teacherCrmService } from './services/teacher-crm.service';
import { applicationStore } from '../applications/store';
import { t } from './i18n/translations';
import { safeAnswerCbQuery, safeReply, validateEnvVars } from './bot-helpers';
import { logger } from '../../lib/security/logger';
import { getEnv } from '../../lib/env';

const env = getEnv();

// ── Environment Validation ───────────────────────────────────────────
const envCheck = validateEnvVars([
  { name: 'TELEGRAM_BOT_TOKEN', value: env.TELEGRAM_BOT_TOKEN, required: true },
]);
if (!envCheck.valid) {
  logger.error('[Telegram] Missing required env vars', { missing: envCheck.missing });
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

// ── Logging middleware ────────────────────────────────────────────
bot.use(async (ctx, next) => {
  const updateId = ctx.update?.update_id;
  const fromId = ctx.from?.id;

  try {
    await next();
    logger.info('[Telegram] Update processed', { updateId, fromId });
  } catch (error) {
    logger.error('[Telegram] Middleware error', {
      error: String(error),
      updateId,
      updateType: ctx.updateType,
    });
    // Don't re-throw — Telegraf's catch handler will pick it up
  }
});

// ── Register Middleware ─────────────────────────────────────────────
bot.use(sessionMiddleware());

// ── Register Scenes ────────────────────────────────────────────────
const stage = new Scenes.Stage<ProtectedContext>([registrationWizard, writeNoteWizard]);
bot.use(stage.middleware());

// ════════════════════════════════════════════════════════════════════
// COMMANDS
// ════════════════════════════════════════════════════════════════════

// ── /start ──────────────────────────────────────────────────────────
bot.start(async (ctx) => {
  const userId = ctx.from?.id;
  logger.info('[Telegram] /start command', { from: userId });

  if (userId) applicationStore.trackUser(userId);

  try {
    await ctx.scene.enter('REGISTRATION_WIZARD');
    logger.info('[Telegram] Scene entered: REGISTRATION_WIZARD', { from: userId });
  } catch (error) {
    logger.error('[Telegram] Failed to enter REGISTRATION_WIZARD', {
      error: String(error),
      from: userId,
    });
    await safeReply(ctx, t(undefined, 'error_generic_with_start'));
  }
});

// ════════════════════════════════════════════════════════════════════
// ADMIN COMMANDS
// ════════════════════════════════════════════════════════════════════

// ── /stats ──────────────────────────────────────────────────────────
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

  await safeReply(ctx, message, {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      [Markup.button.callback('🔄 ' + t(undefined, 'admin_refresh'), 'ADMIN_STATS')],
      [Markup.button.callback('📋 ' + t(undefined, 'admin_view_applications'), 'ADMIN_APPS')],
      [Markup.button.callback('🏠 ' + t(undefined, 'admin_menu'), 'ADMIN_MENU')],
    ]),
  });
});

// ── /users ──────────────────────────────────────────────────────────
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

  await safeReply(ctx, message, {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      [Markup.button.callback('🔄 ' + t(undefined, 'admin_refresh'), 'ADMIN_USERS')],
      [Markup.button.callback('📊 ' + t(undefined, 'admin_stats'), 'ADMIN_STATS')],
      [Markup.button.callback('🏠 ' + t(undefined, 'admin_menu'), 'ADMIN_MENU')],
    ]),
  });
});

// ── /broadcast ──────────────────────────────────────────────────────
bot.command('broadcast', teacherAdminOnly(), async (ctx) => {
  const userId = ctx.from?.id;
  logger.info('[Telegram] /broadcast command', { from: userId });

  const text = ctx.message && 'text' in ctx.message ? ctx.message.text : '';
  const messageText = text.replace(/^\/broadcast\s*/i, '').trim();

  if (!messageText) {
    await safeReply(ctx, t(undefined, 'broadcast_usage'), {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('🏠 ' + t(undefined, 'admin_menu'), 'ADMIN_MENU')],
      ]),
    });
    return;
  }

  const allUsers = applicationStore.getAllUserIds();
  let sent = 0;
  let failed = 0;

  await safeReply(ctx, `📢 ${t(undefined, 'broadcast_start')}\n👥 ${t(undefined, 'users_total')}: ${allUsers.length}`, {
    parse_mode: 'HTML',
  });

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

  await safeReply(ctx, result, {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      [Markup.button.callback('📊 ' + t(undefined, 'admin_stats'), 'ADMIN_STATS')],
      [Markup.button.callback('🏠 ' + t(undefined, 'admin_menu'), 'ADMIN_MENU')],
    ]),
  });
});

// ════════════════════════════════════════════════════════════════════
// ADMIN CALLBACK HANDLERS
// ════════════════════════════════════════════════════════════════════

// ── Admin Menu ────────────────────────────────────────────────────
bot.action('ADMIN_MENU', teacherAdminOnly(), async (ctx) => {
  await safeAnswerCbQuery(ctx);
  await safeReply(ctx,
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
  );
  try { await ctx.deleteMessage(); } catch { /* ignore */ }
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
  try {
    await ctx.editMessageText(message, {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('🔄 ' + t(undefined, 'admin_refresh'), 'ADMIN_STATS')],
        [Markup.button.callback('👥 ' + t(undefined, 'admin_users'), 'ADMIN_USERS')],
        [Markup.button.callback('🏠 ' + t(undefined, 'admin_menu'), 'ADMIN_MENU')],
      ]),
    });
  } catch {
    await safeReply(ctx, message, {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('🔄 ' + t(undefined, 'admin_refresh'), 'ADMIN_STATS')],
        [Markup.button.callback('👥 ' + t(undefined, 'admin_users'), 'ADMIN_USERS')],
        [Markup.button.callback('🏠 ' + t(undefined, 'admin_menu'), 'ADMIN_MENU')],
      ]),
    });
  }
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
  try {
    await ctx.editMessageText(message, {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('🔄 ' + t(undefined, 'admin_refresh'), 'ADMIN_USERS')],
        [Markup.button.callback('📊 ' + t(undefined, 'admin_stats'), 'ADMIN_STATS')],
        [Markup.button.callback('🏠 ' + t(undefined, 'admin_menu'), 'ADMIN_MENU')],
      ]),
    });
  } catch {
    await safeReply(ctx, message, {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('🔄 ' + t(undefined, 'admin_refresh'), 'ADMIN_USERS')],
        [Markup.button.callback('📊 ' + t(undefined, 'admin_stats'), 'ADMIN_STATS')],
        [Markup.button.callback('🏠 ' + t(undefined, 'admin_menu'), 'ADMIN_MENU')],
      ]),
    });
  }
});

bot.action('ADMIN_APPS', teacherAdminOnly(), async (ctx) => {
  await safeAnswerCbQuery(ctx);
  const stats = applicationStore.getStats();
  try {
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
    );
  } catch {
    await safeReply(ctx,
      `📋 <b>${t(undefined, 'admin_applications')}</b>\n\n${t(undefined, 'admin_apps_desc')}\n\n📊 ${t(undefined, 'stats_total_applications')}: <b>${stats.total}</b>`,
      {
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([
          [Markup.button.url('🌐 ' + t(undefined, 'admin_open_panel'), `${getEnv().NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/applications`)],
          [Markup.button.callback('📊 ' + t(undefined, 'admin_stats'), 'ADMIN_STATS')],
          [Markup.button.callback('🏠 ' + t(undefined, 'admin_menu'), 'ADMIN_MENU')],
        ]),
      }
    );
  }
});

bot.action('ADMIN_BROADCAST', teacherAdminOnly(), async (ctx) => {
  await safeAnswerCbQuery(ctx);
  try {
    await ctx.editMessageText(
      `📢 <b>${t(undefined, 'broadcast_usage')}</b>\n\n${t(undefined, 'broadcast_usage_detail')}`,
      {
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([
          [Markup.button.callback('🏠 ' + t(undefined, 'admin_menu'), 'ADMIN_MENU')],
        ]),
      }
    );
  } catch {
    await safeReply(ctx,
      `📢 <b>${t(undefined, 'broadcast_usage')}</b>\n\n${t(undefined, 'broadcast_usage_detail')}`,
      {
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([
          [Markup.button.callback('🏠 ' + t(undefined, 'admin_menu'), 'ADMIN_MENU')],
        ]),
      }
    );
  }
});

// ════════════════════════════════════════════════════════════════════
// CRM ACTION HANDLERS
// ════════════════════════════════════════════════════════════════════

// ── Accept with confirmation ────────────────────────────────────────
bot.action(/CRM_ACCEPT_CONFIRM_(.+)/, teacherAdminOnly(), async (ctx) => {
  const appId = ctx.match[1];
  logger.info('[Telegram] CRM_ACCEPT_CONFIRM', { appId });

  try {
    await teacherCrmService.updateStatus(appId, 'APPROVED', 'no-db-mode');
    const currentText = (ctx.callbackQuery?.message as { text?: string })?.text || '';
    const updatedText = currentText.replace(/\[.*?\]/g, '').trim() + '\n\n✅ ' + t(undefined, 'status_approved');
    try {
      await ctx.editMessageText(updatedText, {
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([]),
      });
    } catch { /* ignore */ }
    await safeAnswerCbQuery(ctx, t(undefined, 'approved'));
    logger.info('[Telegram] Application approved', { appId, adminId: ctx.from?.id });
  } catch (error) {
    logger.error('[Telegram] Failed to approve application', { appId, error: String(error) });
    await safeAnswerCbQuery(ctx, t(undefined, 'error_generic'));
  }
});

// ── Reject with confirmation ────────────────────────────────────────
bot.action(/CRM_REJECT_CONFIRM_(.+)/, teacherAdminOnly(), async (ctx) => {
  const appId = ctx.match[1];
  logger.info('[Telegram] CRM_REJECT_CONFIRM', { appId });

  try {
    await teacherCrmService.updateStatus(appId, 'REJECTED', 'no-db-mode');
    const currentText = (ctx.callbackQuery?.message as { text?: string })?.text || '';
    const updatedText = currentText.replace(/\[.*?\]/g, '').trim() + '\n\n❌ ' + t(undefined, 'status_rejected');
    try {
      await ctx.editMessageText(updatedText, {
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([]),
      });
    } catch { /* ignore */ }
    await safeAnswerCbQuery(ctx, t(undefined, 'rejected'));
    logger.info('[Telegram] Application rejected', { appId, adminId: ctx.from?.id });
  } catch (error) {
    logger.error('[Telegram] Failed to reject application', { appId, error: String(error) });
    await safeAnswerCbQuery(ctx, t(undefined, 'error_generic'));
  }
});

// ── Accept (show confirmation) ──────────────────────────────────────
bot.action(/CRM_ACCEPT_(.+)/, teacherAdminOnly(), async (ctx) => {
  const appId = ctx.match[1];
  logger.info('[Telegram] CRM_ACCEPT', { appId });

  try {
    const currentText = (ctx.callbackQuery?.message as { text?: string })?.text || '';
    try {
      await ctx.editMessageText(
        currentText + '\n\n❓ ' + t(undefined, 'confirm_question'),
        {
          parse_mode: 'HTML',
          ...Markup.inlineKeyboard([
            [
              Markup.button.callback('✅ ' + t(undefined, 'confirm_button'), `CRM_ACCEPT_CONFIRM_${appId}`),
              Markup.button.callback('🔙 ' + t(undefined, 'cancel_button'), `CRM_BACK_${appId}`),
            ],
          ]),
        }
      );
    } catch { /* ignore */ }
    await safeAnswerCbQuery(ctx);
  } catch (error) {
    logger.error('[Telegram] Accept confirmation failed', { appId, error: String(error) });
    await safeAnswerCbQuery(ctx, t(undefined, 'error_generic'));
  }
});

// ── Reject (show confirmation) ──────────────────────────────────────
bot.action(/CRM_REJECT_(.+)/, teacherAdminOnly(), async (ctx) => {
  const appId = ctx.match[1];
  logger.info('[Telegram] CRM_REJECT', { appId });

  try {
    const currentText = (ctx.callbackQuery?.message as { text?: string })?.text || '';
    try {
      await ctx.editMessageText(
        currentText + '\n\n❓ ' + t(undefined, 'confirm_question'),
        {
          parse_mode: 'HTML',
          ...Markup.inlineKeyboard([
            [
              Markup.button.callback('❌ ' + t(undefined, 'rejected'), `CRM_REJECT_CONFIRM_${appId}`),
              Markup.button.callback('🔙 ' + t(undefined, 'cancel_button'), `CRM_BACK_${appId}`),
            ],
          ]),
        }
      );
    } catch { /* ignore */ }
    await safeAnswerCbQuery(ctx);
  } catch (error) {
    logger.error('[Telegram] Reject confirmation failed', { appId, error: String(error) });
    await safeAnswerCbQuery(ctx, t(undefined, 'error_generic'));
  }
});

// ── Back to original CRM actions ────────────────────────────────────
bot.action(/CRM_BACK_(.+)/, teacherAdminOnly(), async (ctx) => {
  const appId = ctx.match[1];
  await safeAnswerCbQuery(ctx);
  try {
    const currentText = (ctx.callbackQuery?.message as { text?: string })?.text || '';
    const cleanText = currentText.replace(/\n\n[\s\S]*$/, '');
    await ctx.editMessageText(cleanText, {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [
          Markup.button.callback(t(undefined, 'crm_accept'), `CRM_ACCEPT_${appId}`),
          Markup.button.callback(t(undefined, 'crm_reject'), `CRM_REJECT_${appId}`),
        ],
        [
          Markup.button.callback('💬 ' + t(undefined, 'crm_reply'), `CRM_NOTE_${appId}`),
        ],
      ]),
    });
  } catch { /* ignore */ }
});

// ── Set to Pending ──────────────────────────────────────────────────
bot.action(/CRM_PENDING_(.+)/, teacherAdminOnly(), async (ctx) => {
  const appId = ctx.match[1];
  logger.info('[Telegram] CRM_PENDING', { appId });

  try {
    await teacherCrmService.updateStatus(appId, 'PENDING', 'no-db-mode');
    const currentText = (ctx.callbackQuery?.message as { text?: string })?.text || '';
    const cleanText = currentText.replace(/\n\n\[\s*.*?\s*\]/g, '').trim();
    try {
      await ctx.editMessageText(
        cleanText + '\n\n⏳ ' + t(undefined, 'status_pending'),
        {
          parse_mode: 'HTML',
          ...Markup.inlineKeyboard([
            [
              Markup.button.callback(t(undefined, 'crm_accept'), `CRM_ACCEPT_${appId}`),
              Markup.button.callback(t(undefined, 'crm_reject'), `CRM_REJECT_${appId}`),
            ],
            [
              Markup.button.callback('💬 ' + t(undefined, 'crm_reply'), `CRM_NOTE_${appId}`),
            ],
          ]),
        }
      );
    } catch { /* ignore */ }
    await safeAnswerCbQuery(ctx, t(undefined, 'pending'));
  } catch (error) {
    logger.error('[Telegram] Failed to set pending', { appId, error: String(error) });
    await safeAnswerCbQuery(ctx, t(undefined, 'error_generic'));
  }
});

// ── Write Note ──────────────────────────────────────────────────────
bot.action(/CRM_NOTE_(.+)/, teacherAdminOnly(), async (ctx) => {
  const appId = ctx.match[1];
  logger.info('[Telegram] CRM_NOTE', { appId });

  await safeAnswerCbQuery(ctx);
  await ctx.scene.enter('CRM_WRITE_NOTE', {
    applicationId: appId,
    actionUserId: ctx.from?.id?.toString() || 'no-db-mode',
  });
});

// ── View Student Profile ────────────────────────────────────────────
bot.action(/CRM_PROFILE_(.+)/, teacherAdminOnly(), async (ctx) => {
  const studentId = ctx.match[1];
  logger.info('[Telegram] CRM_PROFILE', { studentId });

  try {
    const profileText = await teacherCrmService.getStudentProfileText(studentId);
    await safeReply(ctx, profileText, { parse_mode: 'HTML' });
    await safeAnswerCbQuery(ctx);
  } catch (error) {
    logger.error('[Telegram] Failed to fetch student profile', { studentId, error: String(error) });
    await safeAnswerCbQuery(ctx, t(undefined, 'profile_load_error'));
  }
});

// ── Search applications ─────────────────────────────────────────────
bot.action('ADMIN_SEARCH', teacherAdminOnly(), async (ctx) => {
  await safeAnswerCbQuery(ctx);
  await safeReply(ctx,
    `🔍 <b>${t(undefined, 'admin_view_applications')}</b>\n\nIzlash uchun: /search <ism yoki telefon>`,
    { parse_mode: 'HTML' }
  );
});

// ── /search command ─────────────────────────────────────────────────
bot.command('search', teacherAdminOnly(), async (ctx) => {
  const text = ctx.message && 'text' in ctx.message ? ctx.message.text : '';
  const query = text.replace(/^\/search\s*/i, '').trim();

  if (!query) {
    await safeReply(ctx, '🔍 ' + t(undefined, 'admin_view_applications') + '\n\n/search <name or phone>');
    return;
  }

  const result = applicationStore.getFiltered({ search: query, limit: 20 });

  if (result.applications.length === 0) {
    await safeReply(ctx, '🔍 ' + t(undefined, 'admin_apps_desc'));
    return;
  }

  for (const app of result.applications.slice(0, 5)) {
    const msg = `
👤 <b>${app.data.firstName} ${app.data.lastName}</b>
📞 ${app.data.phone}
🆔 <code>${app.id}</code>
📌 ${app.status}
📅 ${app.createdAt.toLocaleDateString()}
    `;
    await safeReply(ctx, msg, {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [
          Markup.button.callback('✅ ' + t(undefined, 'crm_accept'), `CRM_ACCEPT_${app.id}`),
          Markup.button.callback('❌ ' + t(undefined, 'crm_reject'), `CRM_REJECT_${app.id}`),
        ],
      ]),
    });
  }

  if (result.applications.length > 5) {
    await safeReply(ctx, `... +${result.applications.length - 5} more results`);
  }
});

// ════════════════════════════════════════════════════════════════════
// CATCH-ALL CALLBACK HANDLER
// ════════════════════════════════════════════════════════════════════
bot.action(
  /^(?!(?:LANG_UZ|LANG_RU|LANG_EN|CONFIRM_YES|CONFIRM_NO|CANCEL_ALL|DEVICE_|SHIFT_|COURSE_|DISTRICT_|REGION_|BACK_|ADMIN_|CRM_))/,
  async (ctx) => {
    const data = ctx.callbackQuery && 'data' in ctx.callbackQuery
      ? ctx.callbackQuery.data
      : 'unknown';
    logger.info('[Telegram] Catch-all callback', { data, from: ctx.from?.id });
    await safeAnswerCbQuery(ctx);
  }
);

export default bot;
