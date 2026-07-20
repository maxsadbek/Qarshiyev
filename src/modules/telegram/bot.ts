/**
 * src/modules/telegram/bot.ts
 * Main Telegram bot for the education center.
 * Production-grade CRM with premium application cards, reminders,
 * history tracking, advanced search, and filter commands.
 */
import { Telegraf, Scenes, Markup } from 'telegraf';
import { sessionMiddleware } from './middlewares/session.middleware';
import { teacherAdminOnly, type ProtectedContext } from './middlewares/auth.middleware';
import { registrationWizard } from './scenes/registration.wizard';
import { writeNoteWizard } from './scenes/write-note.wizard';
import { teacherCrmService } from './services/teacher-crm.service';
import { applicationStore } from '../applications/store';
import { t } from './i18n/translations';
import { safeAnswerCbQuery, safeReply, validateEnvVars, isCallbackDuplicate, isUserRateLimited } from './bot-helpers';
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
  }
});

// ── Callback dedup middleware ───────────────────────────────────────
bot.use(async (ctx, next) => {
  if (ctx.callbackQuery && ctx.update?.update_id) {
    if (isCallbackDuplicate(ctx.update.update_id)) {
      logger.warn('[Telegram] Duplicate callback ignored', { updateId: ctx.update.update_id });
      return;
    }
    if (isUserRateLimited(ctx.from?.id, 300)) {
      logger.warn('[Telegram] Rate limited callback', { fromId: ctx.from?.id });
      return;
    }
  }
  return next();
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
🔵 ${t(undefined, 'stats_contacted')}: <b>${stats.contacted}</b>
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

// ── /broadcast ────────────────────────────────────────────────────
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

// ── /search ─────────────────────────────────────────────────────────
bot.command('search', teacherAdminOnly(), async (ctx) => {
  const text = ctx.message && 'text' in ctx.message ? ctx.message.text : '';
  const query = text.replace(/^\/search\s*/i, '').trim();

  if (!query) {
    await safeReply(ctx, `🔍 <b>${t(undefined, 'search_title')}</b>\n\n${t(undefined, 'search_usage')}`, {
      parse_mode: 'HTML',
    });
    return;
  }

  const result = applicationStore.getFiltered({ search: query, limit: 20 });

  if (result.applications.length === 0) {
    await safeReply(ctx, `🔍 <b>${t(undefined, 'search_title')}</b>\n\n${t(undefined, 'no_results')}`, {
      parse_mode: 'HTML',
    });
    return;
  }

  await safeReply(ctx, `🔍 <b>${t(undefined, 'search_results')}</b> (${result.total})`, {
    parse_mode: 'HTML',
  });

  for (const app of result.applications.slice(0, 5)) {
    const msg = `
━━━━━━━━━━━━━━━━━━
👤 <b>${app.data.firstName} ${app.data.lastName}</b>
📞 ${app.data.phone}
🆔 <code>${app.id}</code>
👤 @${app.data.username || '—'}
📌 ${app.status}
📅 ${app.createdAt.toLocaleDateString()}
${app.important ? '⭐ MUHIM' : ''}
━━━━━━━━━━━━━━━━━━
    `;
    await safeReply(ctx, msg, {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [
          Markup.button.callback('✅ ' + t(undefined, 'crm_accept'), `CRM_ACCEPT_${app.id}`),
          Markup.button.callback('❌ ' + t(undefined, 'crm_reject'), `CRM_REJECT_${app.id}`),
        ],
        [
          Markup.button.callback('📞 ' + t(undefined, 'crm_contacted'), `CRM_CONTACTED_${app.id}`),
          Markup.button.callback('⭐ ' + t(undefined, 'crm_important'), `CRM_IMPORTANT_${app.id}`),
        ],
      ]),
    });
  }

  if (result.applications.length > 5) {
    await safeReply(ctx, `... +${result.applications.length - 5} ${t(undefined, 'search_results').toLowerCase()}`);
  }
});

// ── /pending ────────────────────────────────────────────────────────
bot.command('pending', teacherAdminOnly(), async (ctx) => {
  await showFilteredApplications(ctx, 'PENDING', t(undefined, 'filter_pending'));
});

// ── /contacted ─────────────────────────────────────────────────────
bot.command('contacted', teacherAdminOnly(), async (ctx) => {
  await showFilteredApplications(ctx, 'CONTACTED', t(undefined, 'filter_contacted'));
});

// ── /accepted ───────────────────────────────────────────────────────
bot.command('accepted', teacherAdminOnly(), async (ctx) => {
  await showFilteredApplications(ctx, 'APPROVED', t(undefined, 'filter_accepted'));
});

// ── /rejected ─────────────────────────────────────────────────────
bot.command('rejected', teacherAdminOnly(), async (ctx) => {
  await showFilteredApplications(ctx, 'REJECTED', t(undefined, 'filter_rejected'));
});

// ── /today ─────────────────────────────────────────────────────────
bot.command('today', teacherAdminOnly(), async (ctx) => {
  const result = applicationStore.getFiltered({ today: true, limit: 50 });

  if (result.applications.length === 0) {
    await safeReply(ctx, `📅 <b>${t(undefined, 'filter_today')}</b>\n\n${t(undefined, 'filter_no_results')}`, {
      parse_mode: 'HTML',
    });
    return;
  }

  await safeReply(ctx, `📅 <b>${t(undefined, 'filter_today')}</b>\n\nJami: ${result.total}`, {
    parse_mode: 'HTML',
  });

  for (const app of result.applications.slice(0, 5)) {
    const msg = `
━━━━━━━━━━━━━━━━━━
👤 <b>${app.data.firstName} ${app.data.lastName}</b>
📞 ${app.data.phone}
📌 ${app.status}
🕒 ${app.createdAt.toLocaleTimeString()}
━━━━━━━━━━━━━━━━━━
    `;
    await safeReply(ctx, msg, {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [
          Markup.button.callback('✅ Accept', `CRM_ACCEPT_${app.id}`),
          Markup.button.callback('❌ Reject', `CRM_REJECT_${app.id}`),
        ],
      ]),
    });
  }

  if (result.applications.length > 5) {
    await safeReply(ctx, `... +${result.applications.length - 5} ${t(undefined, 'search_results').toLowerCase()}`);
  }
});

// ── /important ──────────────────────────────────────────────────────
bot.command('important', teacherAdminOnly(), async (ctx) => {
  const importantApps = applicationStore.getImportant();

  if (importantApps.length === 0) {
    await safeReply(ctx, `⭐ ${t(undefined, 'important_empty')}`, { parse_mode: 'HTML' });
    return;
  }

  await safeReply(ctx, `⭐ <b>${t(undefined, 'important_title')}</b>\n\n${t(undefined, 'important_count')}: ${importantApps.length}`, {
    parse_mode: 'HTML',
  });

  for (const app of importantApps.slice(0, 5)) {
    const msg = `
━━━━━━━━━━━━━━━━━━
👤 <b>${app.data.firstName} ${app.data.lastName}</b>
📞 ${app.data.phone}
📌 ${app.status}
📅 ${app.createdAt.toLocaleDateString()}
━━━━━━━━━━━━━━━━━━
    `;
    await safeReply(ctx, msg, {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [
          Markup.button.callback('✅ Accept', `CRM_ACCEPT_${app.id}`),
          Markup.button.callback('❌ Reject', `CRM_REJECT_${app.id}`),
        ],
      ]),
    });
  }

  if (importantApps.length > 5) {
    await safeReply(ctx, `... +${importantApps.length - 5} ${t(undefined, 'search_results').toLowerCase()}`);
  }
});

// ── /region and /course ─────────────────────────────────────────────
bot.command('region', teacherAdminOnly(), async (ctx) => {
  const text = ctx.message && 'text' in ctx.message ? ctx.message.text : '';
  const region = text.replace(/^\/region\s*/i, '').trim();

  if (!region) {
    await safeReply(ctx, '🌍 <b>/region <viloyat nomi></b>\n\nMisol: /region Toshkent', { parse_mode: 'HTML' });
    return;
  }

  const result = applicationStore.getFiltered({ region, limit: 20 });
  if (result.applications.length === 0) {
    await safeReply(ctx, `🌍 <b>${t(undefined, 'filter_region')}: ${region}</b>\n\n${t(undefined, 'filter_no_results')}`, { parse_mode: 'HTML' });
    return;
  }

  await safeReply(ctx, `🌍 <b>${t(undefined, 'filter_region')}: ${region}</b>\n\nJami: ${result.total}`, { parse_mode: 'HTML' });
  for (const app of result.applications.slice(0, 5)) {
    await safeReply(ctx, `👤 ${app.data.firstName} ${app.data.lastName}\n📞 ${app.data.phone}\n📌 ${app.status}`, {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('✅ Accept', `CRM_ACCEPT_${app.id}`), Markup.button.callback('❌ Reject', `CRM_REJECT_${app.id}`)],
      ]),
    });
  }
});

bot.command('course', teacherAdminOnly(), async (ctx) => {
  const text = ctx.message && 'text' in ctx.message ? ctx.message.text : '';
  const course = text.replace(/^\/course\s*/i, '').trim();

  if (!course) {
    await safeReply(ctx, '📚 <b>/course <kurs nomi></b>\n\nMisol: /course backend', { parse_mode: 'HTML' });
    return;
  }

  const result = applicationStore.getFiltered({ course, limit: 20 });
  if (result.applications.length === 0) {
    await safeReply(ctx, `📚 <b>${t(undefined, 'filter_course')}: ${course}</b>\n\n${t(undefined, 'filter_no_results')}`, { parse_mode: 'HTML' });
    return;
  }

  await safeReply(ctx, `📚 <b>${t(undefined, 'filter_course')}: ${course}</b>\n\nJami: ${result.total}`, { parse_mode: 'HTML' });
  for (const app of result.applications.slice(0, 5)) {
    await safeReply(ctx, `👤 ${app.data.firstName} ${app.data.lastName}\n📞 ${app.data.phone}\n📌 ${app.status}`, {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('✅ Accept', `CRM_ACCEPT_${app.id}`), Markup.button.callback('❌ Reject', `CRM_REJECT_${app.id}`)],
      ]),
    });
  }
});

// ── Helper for filter commands ─────────────────────────────────────
async function showFilteredApplications(ctx: ProtectedContext, status: 'PENDING' | 'CONTACTED' | 'APPROVED' | 'REJECTED', label: string) {
  const result = applicationStore.getFiltered({ status, limit: 50 });

  if (result.applications.length === 0) {
    await safeReply(ctx, `${label}\n\n${t(undefined, 'filter_no_results')}`, { parse_mode: 'HTML' });
    return;
  }

  await safeReply(ctx, `${label}\n\nJami: ${result.total}`, { parse_mode: 'HTML' });

  for (const app of result.applications.slice(0, 5)) {
    const msg = `
━━━━━━━━━━━━━━━━━━
👤 <b>${app.data.firstName} ${app.data.lastName}</b>
📞 ${app.data.phone}
🆔 <code>${app.id}</code>
📌 ${app.status}
📅 ${app.createdAt.toLocaleDateString()}
━━━━━━━━━━━━━━━━━━
    `;
    await safeReply(ctx, msg, {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [
          Markup.button.callback('✅ ' + t(undefined, 'crm_accept'), `CRM_ACCEPT_${app.id}`),
          Markup.button.callback('❌ ' + t(undefined, 'crm_reject'), `CRM_REJECT_${app.id}`),
        ],
        [
          Markup.button.callback('📞 ' + t(undefined, 'crm_contacted'), `CRM_CONTACTED_${app.id}`),
          Markup.button.callback('⭐ ' + t(undefined, 'crm_important'), `CRM_IMPORTANT_${app.id}`),
        ],
      ]),
    });
  }

  if (result.applications.length > 5) {
    await safeReply(ctx, `... +${result.applications.length - 5} ${t(undefined, 'search_results').toLowerCase()}`);
  }
}

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
        [
          Markup.button.callback('⭐ ' + t(undefined, 'important_applications'), 'ADMIN_IMPORTANT'),
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
🔵 ${t(undefined, 'stats_contacted')}: <b>${stats.contacted}</b>
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

bot.action('ADMIN_IMPORTANT', teacherAdminOnly(), async (ctx) => {
  await safeAnswerCbQuery(ctx);
  const importantApps = applicationStore.getImportant();
  if (importantApps.length === 0) {
    await safeReply(ctx, `⭐ ${t(undefined, 'important_empty')}`, { parse_mode: 'HTML' });
    return;
  }
  for (const app of importantApps.slice(0, 5)) {
    await safeReply(ctx,
      `👤 ${app.data.firstName} ${app.data.lastName}\n📞 ${app.data.phone}\n📌 ${app.status}\n📅 ${app.createdAt.toLocaleDateString()}`,
      {
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([
          [Markup.button.callback('✅ Accept', `CRM_ACCEPT_${app.id}`), Markup.button.callback('❌ Reject', `CRM_REJECT_${app.id}`)],
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

  // Duplicate protection
  if (applicationStore.isAlreadyActioned(appId, 'APPROVED')) {
    await safeAnswerCbQuery(ctx, t(undefined, 'already_accepted'));
    return;
  }

  try {
    await teacherCrmService.updateStatus(appId, 'APPROVED', ctx.from?.id?.toString() || 'no-db-mode');
    const currentText = (ctx.callbackQuery?.message as { text?: string })?.text || '';
    const updatedText = currentText.replace(/\[.*?\]/g, '').trim() + '\n\n✅ ' + t(undefined, 'status_approved');
    try {
      await ctx.editMessageText(updatedText, {
        parse_mode: 'HTML',
        ...teacherCrmService.buildPremiumKeyboard(appId),
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

  // Duplicate protection
  if (applicationStore.isAlreadyActioned(appId, 'REJECTED')) {
    await safeAnswerCbQuery(ctx, t(undefined, 'already_rejected'));
    return;
  }

  try {
    await teacherCrmService.updateStatus(appId, 'REJECTED', ctx.from?.id?.toString() || 'no-db-mode');
    const currentText = (ctx.callbackQuery?.message as { text?: string })?.text || '';
    const updatedText = currentText.replace(/\[.*?\]/g, '').trim() + '\n\n❌ ' + t(undefined, 'status_rejected');
    try {
      await ctx.editMessageText(updatedText, {
        parse_mode: 'HTML',
        ...teacherCrmService.buildPremiumKeyboard(appId),
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

  // Duplicate protection
  if (applicationStore.isAlreadyActioned(appId, 'APPROVED')) {
    await safeAnswerCbQuery(ctx, t(undefined, 'already_accepted'));
    return;
  }

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

  // Duplicate protection
  if (applicationStore.isAlreadyActioned(appId, 'REJECTED')) {
    await safeAnswerCbQuery(ctx, t(undefined, 'already_rejected'));
    return;
  }

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
      ...teacherCrmService.buildPremiumKeyboard(appId),
    });
  } catch { /* ignore */ }
});

// ── Set to Pending ──────────────────────────────────────────────────
bot.action(/CRM_PENDING_(.+)/, teacherAdminOnly(), async (ctx) => {
  const appId = ctx.match[1];
  logger.info('[Telegram] CRM_PENDING', { appId });

  try {
    await teacherCrmService.updateStatus(appId, 'PENDING', ctx.from?.id?.toString() || 'no-db-mode');
    const currentText = (ctx.callbackQuery?.message as { text?: string })?.text || '';
    const cleanText = currentText.replace(/\n\n\[\s*.*?\s*\]/g, '').trim();
    try {
      await ctx.editMessageText(
        cleanText + '\n\n⏳ ' + t(undefined, 'status_pending'),
        {
          parse_mode: 'HTML',
          ...teacherCrmService.buildPremiumKeyboard(appId),
        }
      );
    } catch { /* ignore */ }
    await safeAnswerCbQuery(ctx, t(undefined, 'pending'));
  } catch (error) {
    logger.error('[Telegram] Failed to set pending', { appId, error: String(error) });
    await safeAnswerCbQuery(ctx, t(undefined, 'error_generic'));
  }
});

// ── Contacted ───────────────────────────────────────────────────────
bot.action(/CRM_CONTACTED_(.+)/, teacherAdminOnly(), async (ctx) => {
  const appId = ctx.match[1];
  const adminId = ctx.from?.id?.toString() || 'unknown';
  logger.info('[Telegram] CRM_CONTACTED', { appId, adminId });

  // Duplicate protection
  if (applicationStore.isAlreadyActioned(appId, 'CONTACTED')) {
    await safeAnswerCbQuery(ctx, t(undefined, 'already_contacted'));
    return;
  }

  try {
    const success = await teacherCrmService.markContacted(appId, adminId);
    if (success) {
      const currentText = (ctx.callbackQuery?.message as { text?: string })?.text || '';
      const dateStr = new Date().toLocaleDateString('uz-UZ', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
      });
      const updatedText = currentText.replace(/\[.*?\]/g, '').trim() + `\n\n🔵 ${t(undefined, 'status_contacted')}\n\n${t(undefined, 'contacted_by')} ${ctx.from?.first_name || adminId}\n${t(undefined, 'contacted_at')} ${dateStr}`;
      try {
        await ctx.editMessageText(updatedText, {
          parse_mode: 'HTML',
          ...teacherCrmService.buildPremiumKeyboard(appId),
        });
      } catch { /* ignore */ }
      await safeAnswerCbQuery(ctx, t(undefined, 'contacted'));
    } else {
      await safeAnswerCbQuery(ctx, t(undefined, 'already_contacted'));
    }
  } catch (error) {
    logger.error('[Telegram] Contacted action failed', { appId, error: String(error) });
    await safeAnswerCbQuery(ctx, t(undefined, 'error_generic'));
  }
});

// ── Important ───────────────────────────────────────────────────────
bot.action(/CRM_IMPORTANT_(.+)/, teacherAdminOnly(), async (ctx) => {
  const appId = ctx.match[1];
  const adminId = ctx.from?.id?.toString() || 'unknown';
  logger.info('[Telegram] CRM_IMPORTANT', { appId, adminId });

  try {
    const result = await teacherCrmService.toggleImportant(appId, adminId);
    if (result) {
      const currentText = (ctx.callbackQuery?.message as { text?: string })?.text || '';
      let updatedText = currentText.replace(/⭐ <b>Priority:<\/b>[\s\S]*?\n/g, '');
      if (result.important) {
        updatedText = updatedText + '\n\n⭐ <b>IMPORTANT APPLICATION</b>';
      }
      try {
        await ctx.editMessageText(updatedText, {
          parse_mode: 'HTML',
          ...teacherCrmService.buildPremiumKeyboard(appId),
        });
      } catch { /* ignore */ }
      await safeAnswerCbQuery(ctx, result.important ? t(undefined, 'important_marked') : t(undefined, 'important_unmarked'));
    } else {
      await safeAnswerCbQuery(ctx, t(undefined, 'error_generic'));
    }
  } catch (error) {
    logger.error('[Telegram] Important action failed', { appId, error: String(error) });
    await safeAnswerCbQuery(ctx, t(undefined, 'error_generic'));
  }
});

// ── Reminder ────────────────────────────────────────────────────────
bot.action(/CRM_REMINDER_(.+)/, teacherAdminOnly(), async (ctx) => {
  const appId = ctx.match[1];
  logger.info('[Telegram] CRM_REMINDER', { appId });

  // Duplicate protection
  if (applicationStore.hasReminder(appId)) {
    await safeAnswerCbQuery(ctx, t(undefined, 'duplicate_reminder'));
    return;
  }

  await safeAnswerCbQuery(ctx);
  await ctx.scene.enter('CRM_WRITE_NOTE', {
    applicationId: appId,
    actionUserId: ctx.from?.id?.toString() || 'no-db-mode',
    reminderMode: true,
  });
});

// ── History ─────────────────────────────────────────────────────────
bot.action(/CRM_HISTORY_(.+)/, teacherAdminOnly(), async (ctx) => {
  const appId = ctx.match[1];
  logger.info('[Telegram] CRM_HISTORY', { appId });

  const historyText = teacherCrmService.getHistoryText(appId);
  await safeReply(ctx, historyText, { parse_mode: 'HTML' });
  await safeAnswerCbQuery(ctx);
  logger.info('[Telegram] History viewed', { appId });
});

// ── Write Note ──────────────────────────────────────────────────────
bot.action(/CRM_NOTE_(.+)/, teacherAdminOnly(), async (ctx) => {
  const appId = ctx.match[1];
  logger.info('[Telegram] CRM_NOTE', { appId });

  await safeAnswerCbQuery(ctx);
  await ctx.scene.enter('CRM_WRITE_NOTE', {
    applicationId: appId,
    actionUserId: ctx.from?.id?.toString() || 'no-db-mode',
    reminderMode: false,
  });
});

// ── Copy ID ─────────────────────────────────────────────────────────
bot.action(/CRM_COPY_ID_(.+)/, teacherAdminOnly(), async (ctx) => {
  const appId = ctx.match[1];
  logger.info('[Telegram] CRM_COPY_ID', { appId });

  await safeAnswerCbQuery(ctx, `${t(undefined, 'id_copied')} ${appId}`);
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

// ── Search applications (legacy) ────────────────────────────────────
bot.action('ADMIN_SEARCH', teacherAdminOnly(), async (ctx) => {
  await safeAnswerCbQuery(ctx);
  await safeReply(ctx,
    `🔍 <b>${t(undefined, 'search_title')}</b>\n\n${t(undefined, 'search_usage')}`,
    { parse_mode: 'HTML' }
  );
});

// ════════════════════════════════════════════════════════════════════
// REMINDER SCHEDULER
// ════════════════════════════════════════════════════════════════════

let reminderInterval: ReturnType<typeof setInterval> | null = null;

export function startReminderScheduler(intervalMs: number = 30000): void {
  if (reminderInterval) {
    clearInterval(reminderInterval);
  }

  reminderInterval = setInterval(async () => {
    const dueReminders = applicationStore.getDueReminders();

    for (const app of dueReminders) {
      try {
        const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
        if (!adminChatId) continue;

        const bot = await getBot();
        const message = `
🔔 <b>${t(undefined, 'reminder_trigger_title')}</b>

━━━━━━━━━━━━━━━━━━

${t(undefined, 'reminder_name')} <b>${app.data.firstName} ${app.data.lastName}</b>
${t(undefined, 'reminder_phone')} ${app.data.phone}
${t(undefined, 'reminder_status')} ${app.status}

📅 ${app.createdAt.toLocaleDateString()}
🆔 <code>${app.id}</code>

━━━━━━━━━━━━━━━━━━
        `;

        await bot.telegram.sendMessage(adminChatId, message, {
          parse_mode: 'HTML',
          ...teacherCrmService.buildPremiumKeyboard(app.id),
        });

        applicationStore.triggerReminder(app.id);
        logger.info('[Reminder] Triggered', { applicationId: app.id });
      } catch (error) {
        logger.error('[Reminder] Failed to trigger', { applicationId: app.id, error: String(error) });
      }
    }
  }, intervalMs);

  logger.info('[Reminder] Scheduler started', { intervalMs });
}

export function stopReminderScheduler(): void {
  if (reminderInterval) {
    clearInterval(reminderInterval);
    reminderInterval = null;
    logger.info('[Reminder] Scheduler stopped');
  }
}

// ── Start scheduler on bot launch ──────────────────────────────────
startReminderScheduler();

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
