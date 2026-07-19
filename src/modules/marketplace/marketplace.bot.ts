/**
 * src/modules/marketplace/marketplace.bot.ts
 * FreeBuff Gaming Marketplace Telegram Bot.
 * Premium design with gaming marketplace feel.
 */
import { Telegraf, Scenes, Markup } from 'telegraf';
import type { ProtectedContext } from '../telegram/middlewares/auth.middleware';
import { sessionMiddleware } from '../telegram/middlewares/session.middleware';
import { marketplaceStore } from './marketplace.store';
import { orderWizard } from './scenes/order.wizard';
import { reviewWizard } from './scenes/review.wizard';
import { t, langLabel, LANGUAGES } from './i18n/translations';
import { SERVICES, GAMES, ORDER_STATUS_META } from './types';
import type { LangCode, OrderStatus } from './types';
import type { MpOrder, MpUser } from './marketplace.store';
import { logger } from '../../lib/security/logger';
import { getEnv } from '../../lib/env';

// ── Safe answerCbQuery helper ──────────────────────────────────
// Prevents "answerCbQuery isn't available for message" TypeError.
async function safeAnswerCbQuery(ctx: ProtectedContext, text?: string): Promise<void> {
  if (ctx.callbackQuery) {
    try {
      await ctx.answerCbQuery(text);
    } catch {
      // Silently ignore
    }
  }
}

const env = getEnv();

if (!env.FREE_BUFF_BOT_TOKEN) {
  logger.error('[Marketplace] FREE_BUFF_BOT_TOKEN is not configured. Bot will not function.');
}

const bot = new Telegraf<ProtectedContext>(env.FREE_BUFF_BOT_TOKEN ?? '');

// ── Global Error Handling ──────────────────────────────────────────
bot.catch((err, ctx) => {
  logger.error('[Marketplace] Global error', {
    error: String(err),
    updateType: ctx.updateType,
    fromId: ctx.from?.id,
  });
});

// ── Logging middleware ──────────────────────────────────────────────
bot.use(async (ctx, next) => {
  logger.info('[Marketplace] Update', {
    updateType: ctx.updateType,
    fromId: ctx.from?.id,
  });
  try {
    await next();
  } catch (error) {
    logger.error('[Marketplace] Middleware error', {
      error: String(error),
      updateType: ctx.updateType,
    });
    throw error;
  }
});

// ── Session & Scenes ────────────────────────────────────────────────
bot.use(sessionMiddleware());

const stage = new Scenes.Stage<ProtectedContext>([orderWizard, reviewWizard]);
bot.use(stage.middleware());

// ════════════════════════════════════════════════════════════════════
// COMMANDS
// ════════════════════════════════════════════════════════════════════

// ── /start ──────────────────────────────────────────────────────────
bot.start(async (ctx) => {
  const userId = ctx.from?.id;
  logger.info('[Marketplace] /start', { from: userId });

  // Parse referral code from start payload
  const payload = ctx.startPayload;
  let referralCode: string | undefined;

  if (payload && payload.startsWith('ref_')) {
    referralCode = payload.replace('ref_', '');
    logger.info('[Marketplace] Referral payload', { referralCode });
  }

  // Get or create user
  const user = marketplaceStore.getOrCreateUser({
    id: userId!,
    username: ctx.from?.username,
    first_name: ctx.from?.first_name,
    language_code: ctx.from?.language_code,
  });

  // Apply referral if valid
  if (referralCode && !user.referredBy) {
    const applied = marketplaceStore.applyReferral(user.id, referralCode);
    if (applied) {
      logger.info('[Marketplace] Referral applied', {
        userId: user.id,
        referralCode,
      });
    }
  }

  const lang = user.language;
  const isNew = user.createdAt.getTime() > Date.now() - 5000;

  await ctx.reply(
    isNew ? t(lang, 'welcome') : t(lang, 'welcome_back'),
    {
      parse_mode: 'HTML',
    }
  ).catch(() => {});

  await showMainMenu(ctx, lang);
});

// ── /new_order ──────────────────────────────────────────────────────
bot.command('new_order', async (ctx) => {
  const userId = ctx.from?.id;
  marketplaceStore.getOrCreateUser({
    id: userId!,
    username: ctx.from?.username,
    first_name: ctx.from?.first_name,
    language_code: ctx.from?.language_code,
  });

  await ctx.scene.enter('MARKETPLACE_ORDER');
});

// ── /review ─────────────────────────────────────────────────────────
bot.command('review', async (ctx) => {
  const userId = ctx.from?.id;
  marketplaceStore.getOrCreateUser({
    id: userId!,
    username: ctx.from?.username,
    first_name: ctx.from?.first_name,
    language_code: ctx.from?.language_code,
  });

  await ctx.scene.enter('MARKETPLACE_REVIEW');
});

// ── /profile ────────────────────────────────────────────────────────
bot.command('profile', async (ctx) => {
  const userId = ctx.from?.id;
  const user = marketplaceStore.getUserByTelegramId(userId!);
  if (!user) {
    await ctx.reply('👤 Please /start first').catch(() => {});
    return;
  }
  await showProfile(ctx, user);
});

// ── /prices ─────────────────────────────────────────────────────────
bot.command('prices', async (ctx) => {
  const userId = ctx.from?.id;
  const lang = marketplaceStore.getUserLanguage(userId!);
  await showPrices(ctx, lang);
});

// ── /support ────────────────────────────────────────────────────────
bot.command('support', async (ctx) => {
  const userId = ctx.from?.id;
  const lang = marketplaceStore.getUserLanguage(userId!);
  await ctx.reply(t(lang, 'support_message'), {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      [Markup.button.callback('🏠 ' + t(lang, 'btn_main_menu'), 'MP_MAIN_MENU')],
    ]),
  }).catch(() => {});
});

// ── /menu ───────────────────────────────────────────────────────────
bot.command('menu', async (ctx) => {
  const userId = ctx.from?.id;
  const lang = marketplaceStore.getUserLanguage(userId!);
  await showMainMenu(ctx, lang);
});

// ════════════════════════════════════════════════════════════════════
// ADMIN COMMANDS
// ════════════════════════════════════════════════════════════════════

function isAdmin(chatId: number): boolean {
  const adminId = process.env.FREE_BUFF_ADMIN_CHAT_ID || process.env.TELEGRAM_ADMIN_CHAT_ID;
  return !adminId || chatId.toString() === adminId;
}

const adminGuard = async (ctx: ProtectedContext, next: () => Promise<void>) => {
  const userId = ctx.from?.id;
  if (!isAdmin(userId!)) {
    const lang = marketplaceStore.getUserLanguage(userId!);
    await ctx.reply('👑 ' + t(lang, 'admin_only')).catch(() => {});
    return;
  }
  return next();
};

// ── /admin ──────────────────────────────────────────────────────────
bot.command('admin', adminGuard, async (ctx) => {
  const userId = ctx.from?.id;
  logger.info('[Marketplace] /admin', { from: userId });
  const lang = marketplaceStore.getUserLanguage(userId!);
  await showAdminMenu(ctx, lang);
});

// ── /stats ──────────────────────────────────────────────────────────
bot.command('stats', adminGuard, async (ctx) => {
  const userId = ctx.from?.id!;
  const lang = marketplaceStore.getUserLanguage(userId);
  const stats = marketplaceStore.getStats();

  const message = t(lang, 'admin_stats', {
    revenue: stats.revenue.toFixed(2),
    totalOrders: stats.totalOrders,
    completedOrders: stats.completedOrders,
    pendingOrders: stats.pendingOrders,
    inProgressOrders: stats.inProgressOrders,
    rejectedOrders: stats.rejectedOrders,
    topService: stats.topService,
    activeUsers: stats.activeUsers,
    todayOrders: stats.todayOrders,
  });

  await ctx.reply(message, {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      [Markup.button.callback('🔄 ' + t(lang, 'admin_refresh'), 'ADMIN_STATS')],
      [Markup.button.callback('👑 ' + t(lang, 'admin_menu_title').replace(/<[^>]*>/g, ''), 'ADMIN_MENU')],
    ]),
  }).catch(() => {});
});

// ── /broadcast ──────────────────────────────────────────────────────
bot.command('broadcast', adminGuard, async (ctx) => {
  const userId = ctx.from?.id;
  const lang = marketplaceStore.getUserLanguage(userId!);

  const text = ctx.message && 'text' in ctx.message ? ctx.message.text : '';
  const messageText = text.replace(/^\/broadcast\s*/i, '').trim();

  if (!messageText) {
    await ctx.reply(t(lang, 'admin_broadcast_usage'), {
      parse_mode: 'HTML',
    }).catch(() => {});
    return;
  }

  await ctx.reply(t(lang, 'admin_broadcast_start'), {
    parse_mode: 'HTML',
  }).catch(() => {});

  const allUsers = marketplaceStore.getAllUsers();
  let sent = 0;
  let failed = 0;

  for (const user of allUsers) {
    try {
      await ctx.telegram.sendMessage(
        user.telegramId,
        t(user.language, 'admin_broadcast_header') + '\n\n' + messageText,
        { parse_mode: 'HTML' }
      ).catch(() => {});
      sent++;
    } catch {
      failed++;
    }
    await new Promise((r) => setTimeout(r, 50));
  }

  await ctx.reply(
    t(lang, 'admin_broadcast_done', { sent, failed }),
    { parse_mode: 'HTML' }
  ).catch(() => {});
});

// ── /createpromo ────────────────────────────────────────────────────
bot.command('createpromo', adminGuard, async (ctx) => {
  const userId = ctx.from?.id;
  const lang = marketplaceStore.getUserLanguage(userId!);

  const text = ctx.message && 'text' in ctx.message ? ctx.message.text : '';
  const parts = text.replace(/^\/createpromo\s*/i, '').trim().split(/\s+/);

  if (parts.length < 2) {
    await ctx.reply(t(lang, 'admin_promo_usage'), {
      parse_mode: 'HTML',
    }).catch(() => {});
    return;
  }

  const code = parts[0].toUpperCase();
  const discount = parseInt(parts[1]);
  const maxUses = parseInt(parts[2]) || 100;

  if (isNaN(discount) || discount < 1 || discount > 100) {
    await ctx.reply('❌ ' + t(lang, 'error_generic') + ' (1-100%)').catch(() => {});
    return;
  }

  marketplaceStore.addPromoCode(code, discount, maxUses);

  await ctx.reply(
    `✅ Promo code <b>${code}</b> created!\n` +
    `• Discount: ${discount}%\n` +
    `• Max uses: ${maxUses}`,
    { parse_mode: 'HTML' }
  ).catch(() => {});
});

// ── /orders ─────────────────────────────────────────────────────────
bot.command('orders', adminGuard, async (ctx) => {
  const userId = ctx.from?.id;
  const lang = marketplaceStore.getUserLanguage(userId!);
  await showAdminOrders(ctx, lang, 0);
});

// ════════════════════════════════════════════════════════════════════
// MAIN MENU HANDLER
// ════════════════════════════════════════════════════════════════════

export async function showMainMenu(ctx: ProtectedContext, lang: LangCode) {
  const message = '🎮 <b>FreeBuff Gaming</b>\n━━━━━━━━━━━━━━━━━━\n\n' + t(lang, 'choose_option');

  await ctx.reply(message, {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      [
        Markup.button.callback('🛒 ' + t(lang, 'btn_buy'), 'MP_BUY'),
        Markup.button.callback('💰 ' + t(lang, 'btn_prices'), 'MP_PRICES'),
      ],
      [
        Markup.button.callback('📦 ' + t(lang, 'btn_my_orders'), 'MP_MY_ORDERS'),
        Markup.button.callback('⭐ ' + t(lang, 'btn_reviews'), 'MP_REVIEWS'),
      ],
      [
        Markup.button.callback('📢 ' + t(lang, 'btn_news'), 'MP_NEWS'),
        Markup.button.callback('👤 ' + t(lang, 'btn_profile'), 'MP_PROFILE'),
      ],
      [
        Markup.button.callback('🌍 ' + t(lang, 'btn_language'), 'MP_LANGUAGE'),
        Markup.button.callback('☎ ' + t(lang, 'btn_support'), 'MP_SUPPORT'),
      ],
    ]),
  }).catch(() => {});
}

// ════════════════════════════════════════════════════════════════════
// CALLBACK QUERY HANDLERS
// ════════════════════════════════════════════════════════════════════

const menuActions: Record<string, (ctx: ProtectedContext, lang: LangCode) => Promise<void>> = {
  // ── Main Menu ──────────────────────────────────────────
  MP_MAIN_MENU: async (ctx, lang) => {
    await safeAnswerCbQuery(ctx);
    await ctx.deleteMessage().catch(() => {});
    await showMainMenu(ctx, lang);
  },

  // ── Buy Service ────────────────────────────────────────
  MP_BUY: async (ctx, lang) => {
    await safeAnswerCbQuery(ctx);
    await ctx.deleteMessage().catch(() => {});
    await ctx.scene.enter('MARKETPLACE_ORDER');
  },

  // ── Prices ─────────────────────────────────────────────
  MP_PRICES: async (ctx, lang) => {
    await safeAnswerCbQuery(ctx);
    await ctx.deleteMessage().catch(() => {});
    await showPrices(ctx, lang);
  },

  // ── My Orders ──────────────────────────────────────────
  MP_MY_ORDERS: async (ctx, lang) => {
    await safeAnswerCbQuery(ctx);
    await ctx.deleteMessage().catch(() => {});
    const userId = ctx.from?.id;
    const user = marketplaceStore.getUserByTelegramId(userId!);
    if (!user) {
      await showMainMenu(ctx, lang);
      return;
    }
    const orders = marketplaceStore.getUserOrders(user.id);
    if (orders.length === 0) {
      await ctx.reply(t(lang, 'no_orders'), {
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([
          [Markup.button.callback('🛒 ' + t(lang, 'btn_buy'), 'MP_BUY')],
          [Markup.button.callback('🏠 ' + t(lang, 'btn_main_menu'), 'MP_MAIN_MENU')],
        ]),
      }).catch(() => {});
      return;
    }
    await showOrdersList(ctx, lang, orders, 0);
  },

  // ── Reviews ────────────────────────────────────────────
  MP_REVIEWS: async (ctx, lang) => {
    await safeAnswerCbQuery(ctx);
    await ctx.deleteMessage().catch(() => {});
    await showReviews(ctx, lang);
  },

  // ── News ───────────────────────────────────────────────
  MP_NEWS: async (ctx, lang) => {
    await safeAnswerCbQuery(ctx);
    await ctx.reply(t(lang, 'no_news') + '\n\n' +
      '📢 Stay tuned for upcoming promotions and events!', {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('🏠 ' + t(lang, 'btn_main_menu'), 'MP_MAIN_MENU')],
      ]),
    }).catch(() => {});
  },

  // ── Profile ────────────────────────────────────────────
  MP_PROFILE: async (ctx, lang) => {
    await safeAnswerCbQuery(ctx);
    await ctx.deleteMessage().catch(() => {});
    const userId = ctx.from?.id;
    const user = marketplaceStore.getUserByTelegramId(userId!);
    if (!user) {
      await showMainMenu(ctx, lang);
      return;
    }
    await showProfile(ctx, user);
  },

  // ── Language ───────────────────────────────────────────
  MP_LANGUAGE: async (ctx, lang) => {
    await safeAnswerCbQuery(ctx);
    await ctx.deleteMessage().catch(() => {});
    await showLanguageSelection(ctx);
  },

  // ── Support ────────────────────────────────────────────
  MP_SUPPORT: async (ctx, lang) => {
    await safeAnswerCbQuery(ctx);
    await ctx.reply(t(lang, 'support_message'), {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('🏠 ' + t(lang, 'btn_main_menu'), 'MP_MAIN_MENU')],
      ]),
    }).catch(() => {});
  },
};

// Register main menu callbacks
for (const [action, handler] of Object.entries(menuActions)) {
  bot.action(action, async (ctx) => {
    const userId = ctx.from?.id;
    const lang = marketplaceStore.getUserLanguage(userId!);
    await handler(ctx, lang);
  });
}

// ── Language Selection Callbacks ─────────────────────────────────────
for (const l of LANGUAGES) {
  bot.action(`MPLANG_${l.code}`, async (ctx) => {
    const userId = ctx.from?.id;
    await safeAnswerCbQuery(ctx);
    marketplaceStore.setUserLanguage(userId!, l.code);
    const langName = langLabel(l.code);
    await ctx.editMessageText(
      '✅ ' + t(l.code, 'language_changed', { lang: `${l.emoji} ${langName}` }),
      {
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([
          [Markup.button.callback('🏠 ' + t(l.code, 'btn_main_menu'), 'MP_MAIN_MENU')],
        ]),
      }
    ).catch(() => {});
  });
}

// ── Order Pagination ────────────────────────────────────────────────
bot.action(/MP_ORDERS_PAGE_(\d+)/, async (ctx) => {
  const userId = ctx.from?.id;
  const lang = marketplaceStore.getUserLanguage(userId!);
  const page = parseInt(ctx.match[1]);
  await safeAnswerCbQuery(ctx);
  const user = marketplaceStore.getUserByTelegramId(userId!);
  if (!user) return;
  const orders = marketplaceStore.getUserOrders(user.id);    await ctx.editMessageReplyMarkup({
    inline_keyboard: buildOrdersKeyboard(lang, orders, page),
  }).catch(() => {});
});

function getLangFromCtx(ctx: ProtectedContext): LangCode {
  const userId = ctx.from?.id;
  return marketplaceStore.getUserLanguage(userId!);
}

// ════════════════════════════════════════════════════════════════════
// ADMIN CALLBACK HANDLERS
// ════════════════════════════════════════════════════════════════════

bot.action('ADMIN_MENU', adminGuard, async (ctx) => {
  const lang = getLangFromCtx(ctx);
  await safeAnswerCbQuery(ctx);
  await ctx.deleteMessage().catch(() => {});
  await showAdminMenu(ctx, lang);
});

bot.action('ADMIN_STATS', adminGuard, async (ctx) => {
  const lang = getLangFromCtx(ctx);
  await safeAnswerCbQuery(ctx);
  const stats = marketplaceStore.getStats();
  await ctx.editMessageText(
    t(lang, 'admin_stats', {
      revenue: stats.revenue.toFixed(2),
      totalOrders: stats.totalOrders,
      completedOrders: stats.completedOrders,
      pendingOrders: stats.pendingOrders,
      inProgressOrders: stats.inProgressOrders,
      rejectedOrders: stats.rejectedOrders,
      topService: stats.topService,
      activeUsers: stats.activeUsers,
      todayOrders: stats.todayOrders,
    }),
    {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('🔄 ' + t(lang, 'admin_refresh').replace(/<[^>]*>/g, ''), 'ADMIN_STATS')],
        [Markup.button.callback('👑 ' + t(lang, 'admin_menu_title').replace(/<[^>]*>/g, ''), 'ADMIN_MENU')],
      ]),
    }
  ).catch(() => {});
});

bot.action('ADMIN_ORDERS', adminGuard, async (ctx) => {
  const lang = getLangFromCtx(ctx);
  await safeAnswerCbQuery(ctx);
  await ctx.deleteMessage().catch(() => {});
  await showAdminOrders(ctx, lang, 0);
});

bot.action('ADMIN_REVIEWS', adminGuard, async (ctx) => {
  const lang = getLangFromCtx(ctx);
  await safeAnswerCbQuery(ctx);
  const pendingReviews = marketplaceStore.getPendingReviews();

  if (pendingReviews.length === 0) {
    try {
      await ctx.editMessageText('📋 ' + t(lang, 'no_reviews'), {
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([
          [Markup.button.callback('👑 ' + t(lang, 'admin_menu_title').replace(/<[^>]*>/g, ''), 'ADMIN_MENU')],
        ]),
      });
    } catch { /* ignore */ }
    return;
  }

  for (const review of pendingReviews.slice(0, 5)) {
    const user = marketplaceStore.getUser(review.userId);
    await ctx.reply(
      t(lang, 'review_card', {
        rating: review.rating,
        name: user?.firstName || 'Unknown',
        text: review.text,
        date: review.createdAt.toLocaleDateString(),
      }),
      {
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([
          [Markup.button.callback('✅ ' + t(lang, 'admin_accept'), `APPROVE_REVIEW_${review.id}`)],
        ]),
      }
    ).catch(() => {});
  }
});

// ── Approve Review ──────────────────────────────────────────────────
bot.action(/APPROVE_REVIEW_(.+)/, adminGuard, async (ctx) => {
  const reviewId = ctx.match[1];
  await safeAnswerCbQuery(ctx);
  marketplaceStore.approveReview(reviewId);
  const alang = getLangFromCtx(ctx);
  await ctx.editMessageText(
    '✅ ' + t(alang, 'approved') + '!\n🆔 <code>' + reviewId + '</code>',
    { parse_mode: 'HTML' }
  ).catch(() => {});
});

// ── Order Status Management ─────────────────────────────────────────
bot.action(/ADMIN_ACCEPT_(.+)/, adminGuard, async (ctx) => {
  const orderId = ctx.match[1];
  await safeAnswerCbQuery(ctx);
  const order = marketplaceStore.updateOrderStatus(orderId, 'ACCEPTED');
  if (order) {
    await updateAdminOrderMessage(ctx, order, '🔵 ' + ORDER_STATUS_META.ACCEPTED.label.en);
    await notifyUserOrderStatus(order, 'ACCEPTED');
  }
});

bot.action(/ADMIN_REJECT_(.+)/, adminGuard, async (ctx) => {
  const orderId = ctx.match[1];
  await safeAnswerCbQuery(ctx);
  const order = marketplaceStore.updateOrderStatus(orderId, 'REJECTED');
  if (order) {
    await updateAdminOrderMessage(ctx, order, '🔴 ' + ORDER_STATUS_META.REJECTED.label.en);
    await notifyUserOrderStatus(order, 'REJECTED');
  }
});

bot.action(/ADMIN_PROGRESS_(.+)/, adminGuard, async (ctx) => {
  const orderId = ctx.match[1];
  await safeAnswerCbQuery(ctx);
  const order = marketplaceStore.updateOrderStatus(orderId, 'IN_PROGRESS');
  if (order) {
    await updateAdminOrderMessage(ctx, order, '🟠 ' + ORDER_STATUS_META.IN_PROGRESS.label.en);
    await notifyUserOrderStatus(order, 'IN_PROGRESS');
  }
});

bot.action(/ADMIN_COMPLETE_(.+)/, adminGuard, async (ctx) => {
  const orderId = ctx.match[1];
  await safeAnswerCbQuery(ctx);
  const order = marketplaceStore.updateOrderStatus(orderId, 'COMPLETED');
  if (order) {
    await updateAdminOrderMessage(ctx, order, '🟢 ' + ORDER_STATUS_META.COMPLETED.label.en);
    await notifyUserOrderStatus(order, 'COMPLETED');
  }
});

bot.action(/ADMIN_NOTE_(.+)/, adminGuard, async (ctx) => {
  const orderId = ctx.match[1];
  const userId = ctx.from?.id;
  await safeAnswerCbQuery(ctx);
  const lang = marketplaceStore.getUserLanguage(userId!);
  marketplaceStore.setPendingNoteUser(userId!.toString(), orderId);
  await ctx.reply(t(lang, 'admin_note_prompt'), {
    parse_mode: 'HTML',
  }).catch(() => {});
});

// ── Admin Orders Pagination ─────────────────────────────────────────
bot.action(/ADMIN_ORDERS_PAGE_(\d+)/, adminGuard, async (ctx) => {
  const userId = ctx.from?.id;
  const lang = marketplaceStore.getUserLanguage(userId!);
  const page = parseInt(ctx.match[1]);
  await safeAnswerCbQuery(ctx);
  await ctx.deleteMessage().catch(() => {});
  await showAdminOrders(ctx, lang, page);
});

// ════════════════════════════════════════════════════════════════════
// TEXT MESSAGE HANDLERS
// ════════════════════════════════════════════════════════════════════

// Handle admin note input
bot.on('text', async (ctx) => {
  const userId = ctx.from?.id;
  if (!userId) return;

  const orderId = marketplaceStore.getPendingNoteOrder(userId.toString());
  if (!orderId) return; // Let other handlers process

  const text = ctx.message?.text;
  if (!text || text === '/cancel') {
    marketplaceStore.clearPendingNote(userId.toString());
    const user = marketplaceStore.getUserByTelegramId(userId!);
    const lang = marketplaceStore.getUserLanguage(userId!);
    await ctx.reply(t(lang, 'order_cancelled')).catch(() => {});
    return;
  }

  marketplaceStore.addAdminNote(orderId, text);
  marketplaceStore.clearPendingNote(userId.toString());

  const order = marketplaceStore.getOrder(orderId);
  const lang = marketplaceStore.getUserLanguage(userId);    await ctx.reply('✅ ' + t(lang, 'admin_note_saved'), {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      [Markup.button.callback('👑 ' + t(lang, 'admin_menu_title').replace(/<[^>]*>/g, ''), 'ADMIN_MENU')],
    ]),
  }).catch(() => {});

  if (order) {
    // Notify customer about admin note
    const customer = marketplaceStore.getUser(order.userId);
    if (customer) {
      try {
        await ctx.telegram.sendMessage(
          customer.telegramId,
          `💬 <b>Admin xabari / Сообщение от администрации</b>\n\n${text}\n\n— #${orderId.slice(0, 6)}`,
          { parse_mode: 'HTML' }
        ).catch(() => {});
      } catch {
        // Ignore
      }
    }
  }
});

// ════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ════════════════════════════════════════════════════════════════════

async function showPrices(ctx: ProtectedContext, lang: LangCode) {
  let message = '━━━━━━━━━━━━━━━━━━\n💰 <b>' + t(lang, 'prices_title') + '</b>\n━━━━━━━━━━━━━━━━━━\n\n';

  for (const service of SERVICES) {
    message += t(lang, 'price_item', {
      emoji: service.emoji,
      name: service.name[lang],
      description: service.description[lang],
      price: service.basePrice,
    });
  }

  await ctx.reply(message, {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      [Markup.button.callback('🛒 ' + t(lang, 'btn_buy'), 'MP_BUY')],
      [Markup.button.callback('🏠 ' + t(lang, 'btn_main_menu'), 'MP_MAIN_MENU')],
    ]),
  }).catch(() => {});
}

async function showProfile(ctx: ProtectedContext, user: MpUser) {
  const lang = user.language;
  const orders = marketplaceStore.getUserOrders(user.id);
  const completed = orders.filter((o) => o.status === 'COMPLETED').length;
  const pending = orders.filter((o) => o.status === 'PENDING').length;
  const referrals = user.referredUsers.length;
  const referralEarned = marketplaceStore
    .getUserTransactions(user.id)
    .filter((t) => t.type === 'REFERRAL_BONUS')
    .reduce((sum, t) => sum + t.amount, 0);

  const appUrl = getEnv().NEXT_PUBLIC_APP_URL || 'https://freebuff.com';
  const referralLink = `${appUrl}?ref=${user.referralCode}`;

  const message = t(lang, 'profile_info', {
    userId: user.id.slice(0, 8),
    name: user.firstName,
    referrals: referrals,
    balance: user.balance.toFixed(2),
    totalOrders: orders.length,
    completedOrders: completed,
    pendingOrders: pending,
    date: user.createdAt.toLocaleDateString(),
    language: langLabel(lang),
  });

  await ctx.reply(message, {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      [Markup.button.switchToChat('🔗 ' + t(lang, 'referral_title').split('\n')[0].replace(/<[^>]*>/g, ''), referralLink)],
      [Markup.button.callback('📦 ' + t(lang, 'btn_my_orders'), 'MP_MY_ORDERS')],
      [Markup.button.callback('🏠 ' + t(lang, 'btn_main_menu'), 'MP_MAIN_MENU')],
    ]),
  }).catch(() => {});
}

async function showReviews(ctx: ProtectedContext, lang: LangCode) {
  const reviews = marketplaceStore.getApprovedReviews();
  if (reviews.length === 0) {
    await ctx.reply(t(lang, 'reviews_title') + '\n\n' + t(lang, 'no_reviews'), {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('🏠 ' + t(lang, 'btn_main_menu'), 'MP_MAIN_MENU')],
      ]),
    }).catch(() => {});
    return;
  }

  let message = '━━━━━━━━━━━━━━━━━━\n⭐ <b>' + t(lang, 'reviews_title') + '</b>\n━━━━━━━━━━━━━━━━━━\n\n';
  for (const review of reviews.slice(0, 10)) {
    const user = marketplaceStore.getUser(review.userId);
    message += t(lang, 'review_card', {
      rating: review.rating,
      name: user?.firstName || 'Unknown',
      text: review.text,
      date: review.createdAt.toLocaleDateString(),
    });
  }

  await ctx.reply(message, {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      [Markup.button.callback('🏠 ' + t(lang, 'btn_main_menu'), 'MP_MAIN_MENU')],
    ]),
  }).catch(() => {});
}

async function showOrdersList(
  ctx: ProtectedContext,
  lang: LangCode,
  orders: MpOrder[],
  page: number
) {
  const perPage = 5;
  const totalPages = Math.ceil(orders.length / perPage);
  const start = page * perPage;
  const pageOrders = orders.slice(start, start + perPage);

  let message = t(lang, 'orders_page', {
    current: page + 1,
    total: totalPages || 1,
  }) + '\n\n';

  for (const o of pageOrders) {
    const statusMeta = ORDER_STATUS_META[o.status];
    message += t(lang, 'order_card', {
      orderId: o.id.slice(0, 6),
      statusEmoji: statusMeta.emoji,
      status: statusMeta.label[lang],
      game: o.game,
      service: o.service,
      quantity: o.quantity,
      username: o.username,
      platform: o.platform,
      date: o.createdAt.toLocaleDateString(),
      notesLine: o.notes !== '-' ? '\n📝 ' + o.notes : '',
      priceLine: o.totalPrice > 0 ? '💰 $' + o.totalPrice.toFixed(2) : '',
    }) + '\n';
  }

  await ctx.replyWithHTML(message, Markup.inlineKeyboard(buildOrdersKeyboard(lang, orders, page))).catch(() => {});
}

function buildOrdersKeyboard(lang: LangCode, orders: MpOrder[], currentPage: number): ReturnType<typeof Markup.button.callback>[][] {
  const perPage = 5;
  const totalPages = Math.ceil(orders.length / perPage);
  const navButtons: ReturnType<typeof Markup.button.callback>[] = [];

  if (currentPage > 0) {
    navButtons.push(Markup.button.callback('⬅️', `MP_ORDERS_PAGE_${currentPage - 1}`));
  }
  if (currentPage < totalPages - 1) {
    navButtons.push(Markup.button.callback('➡️', `MP_ORDERS_PAGE_${currentPage + 1}`));
  }

  return [
    navButtons,
    [Markup.button.callback('🛒 ' + t(lang, 'btn_buy'), 'MP_BUY')],
    [Markup.button.callback('🏠 ' + t(lang, 'btn_main_menu'), 'MP_MAIN_MENU')],
  ];
}

async function showLanguageSelection(ctx: ProtectedContext) {
  const userId = ctx.from?.id;
  const currentLang = marketplaceStore.getUserLanguage(userId!);

  const keyboard = LANGUAGES.map((l) => [
    Markup.button.callback(
      `${l.emoji} ${langLabel(l.code)}${l.code === currentLang ? ' ✅' : ''}`,
      `MPLANG_${l.code}`
    ),
  ]);

  await ctx.reply(
    `🌍 <b>Select Language / Tilni tanlang / Выберите язык:</b>`,
    {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        ...keyboard,
        [Markup.button.callback('🏠 ' + t(currentLang, 'btn_main_menu'), 'MP_MAIN_MENU')],
      ]),
    }
  ).catch(() => {});
}

async function showAdminMenu(ctx: ProtectedContext, lang: LangCode) {
  const stats = marketplaceStore.getStats();

  const message =
    '👑 <b>' + t(lang, 'admin_menu_title') + '</b>\n\n' +
    t(lang, 'admin_stats', {
      revenue: stats.revenue.toFixed(2),
      totalOrders: stats.totalOrders,
      completedOrders: stats.completedOrders,
      pendingOrders: stats.pendingOrders,
      inProgressOrders: stats.inProgressOrders,
      rejectedOrders: stats.rejectedOrders,
      topService: stats.topService,
      activeUsers: stats.activeUsers,
      todayOrders: stats.todayOrders,
    });

  await ctx.reply(message, {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      [
        Markup.button.callback('📊 ' + t(lang, 'admin_stats_title').replace(/<[^>]*>/g, ''), 'ADMIN_STATS'),
        Markup.button.callback('📋 ' + t(lang, 'admin_orders_title').replace(/<[^>]*>/g, ''), 'ADMIN_ORDERS'),
      ],
      [
        Markup.button.callback('⭐ ' + t(lang, 'reviews_title').replace(/<[^>]*>/g, ''), 'ADMIN_REVIEWS'),
        Markup.button.callback('📢 ' + 'Broadcast', 'HELP_BROADCAST'),
      ],
    ]),
  }).catch(() => {});
}

// Help for broadcast
bot.action('HELP_BROADCAST', adminGuard, async (ctx) => {
  const userId = ctx.from?.id;
  const lang = marketplaceStore.getUserLanguage(userId!);
  await safeAnswerCbQuery(ctx);
  await ctx.reply(t(lang, 'admin_broadcast_usage'), {
    parse_mode: 'HTML',
  }).catch(() => {});
});

async function showAdminOrders(ctx: ProtectedContext, lang: LangCode, page: number) {
  const allOrders = marketplaceStore.getAllOrders();
  const perPage = 5;
  const totalPages = Math.ceil(allOrders.length / perPage);
  const start = page * perPage;
  const pageOrders = allOrders.slice(start, start + perPage);

  if (pageOrders.length === 0) {
    await ctx.reply(t(lang, 'no_orders'), {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('👑 ' + t(lang, 'admin_menu_title').replace(/<[^>]*>/g, ''), 'ADMIN_MENU')],
      ]),
    }).catch(() => {});
    return;
  }

  for (const order of pageOrders) {
    const user = marketplaceStore.getUser(order.userId);
    const statusMeta = ORDER_STATUS_META[order.status];
    const adminNoteLine = order.adminNote
      ? '\n💬 <b>Note:</b> ' + order.adminNote.slice(0, 100)
      : '';
    const promoLine = order.promoCode
      ? '\n🎟 <b>Promo:</b> ' + order.promoCode
      : '';

    const message = t(lang, 'admin_order_detail', {
      orderId: order.id.slice(0, 8),
      customerName: user?.firstName || 'Unknown',
      customerUsername: user?.username || 'N/A',
      game: order.game,
      service: order.service,
      quantity: order.quantity,
      username: order.username,
      platform: order.platform,
      notes: order.notes,
      promoLine: promoLine,
      price: order.totalPrice.toFixed(2),
      date: order.createdAt.toLocaleDateString() + ' ' + order.createdAt.toLocaleTimeString(),
      statusEmoji: statusMeta.emoji,
      status: statusMeta.label[lang],
      adminNoteLine: adminNoteLine,
    });

    const statusActions: ReturnType<typeof Markup.button.callback>[] = [];
    if (order.status === 'PENDING') {
      statusActions.push(Markup.button.callback('✅ ' + t(lang, 'admin_accept'), `ADMIN_ACCEPT_${order.id}`));
      statusActions.push(Markup.button.callback('❌ ' + t(lang, 'admin_reject'), `ADMIN_REJECT_${order.id}`));
    }
    if (order.status === 'ACCEPTED') {
      statusActions.push(Markup.button.callback('🚀 ' + t(lang, 'admin_in_progress'), `ADMIN_PROGRESS_${order.id}`));
    }
    if (order.status === 'IN_PROGRESS') {
      statusActions.push(Markup.button.callback('✔ ' + t(lang, 'admin_complete'), `ADMIN_COMPLETE_${order.id}`));
    }

    await ctx.reply(message, {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        statusActions,
        [Markup.button.callback('💬 ' + t(lang, 'admin_reply').replace(/<[^>]*>/g, ''), `ADMIN_NOTE_${order.id}`)],
      ]),
    }).catch(() => {});
  }

  // Pagination
  const navButtons: ReturnType<typeof Markup.button.callback>[] = [];
  if (page > 0) {
    navButtons.push(Markup.button.callback('⬅️ ' + t(lang, 'btn_prev'), `ADMIN_ORDERS_PAGE_${page - 1}`));
  }
  if (page < totalPages - 1) {
    navButtons.push(Markup.button.callback('➡️ ' + t(lang, 'btn_next'), `ADMIN_ORDERS_PAGE_${page + 1}`));
  }    await ctx.reply(`📋 ${t(lang, 'orders_page', { current: page + 1, total: totalPages || 1 })}`,
    {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        navButtons,
        [Markup.button.callback('👑 ' + t(lang, 'admin_menu_title').replace(/<[^>]*>/g, ''), 'ADMIN_MENU')],
      ]),
    }
  ).catch(() => {});
}

async function updateAdminOrderMessage(
  ctx: ProtectedContext,
  order: MpOrder,
  statusText: string
) {
  try {
    const currentText = (ctx.callbackQuery?.message as { text?: string })?.text || '';
    const newText = currentText.includes('Status:')
      ? currentText.replace(/Status:.*/g, 'Status: ' + statusText)
      : currentText + '\n\n<b>Status:</b> ' + statusText;

    const ulang = getLangFromCtx(ctx);
    await ctx.editMessageText(newText, {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('💬 ' + t(ulang, 'admin_reply').replace(/<[^>]*>/g, ''), `ADMIN_NOTE_${order.id}`)],
      ]),
    }).catch(() => {});
  } catch {
    // Message might be too old to edit
  }
}

async function notifyUserOrderStatus(order: MpOrder, status: OrderStatus) {
  const user = marketplaceStore.getUser(order.userId);
  if (!user) return;

  const lang = user.language;
  let key: string;

  switch (status) {
    case 'ACCEPTED':
      key = 'notify_order_accepted';
      break;
    case 'IN_PROGRESS':
      key = 'notify_order_in_progress';
      break;
    case 'COMPLETED':
      key = 'notify_order_completed';
      break;
    case 'REJECTED':
      key = 'notify_order_rejected';
      break;
    default:
      return;
  }

  try {
    await bot.telegram.sendMessage(
      user.telegramId,
      t(lang, key, {
        orderId: order.id.slice(0, 8),
        service: order.service,
      }),
      {
        parse_mode: 'HTML',
        ...(status === 'COMPLETED'
          ? Markup.inlineKeyboard([
              [Markup.button.callback('⭐ ' + t(lang, 'btn_reviews'), 'MP_REVIEWS')],
            ])
          : {}),
      }
    ).catch(() => {});
  } catch {
    // User might have blocked the bot
  }
}

// ── Admin Notification for New Orders (called from wizard) ───────────
export async function notifyAdminOrder(order: MpOrder, user: MpUser) {
  const adminChatId =
    process.env.FREE_BUFF_ADMIN_CHAT_ID ||
    process.env.TELEGRAM_ADMIN_CHAT_ID;
  if (!adminChatId) return;

  const lang: LangCode = 'en';
  const promoLine = order.promoCode
    ? '\n🎟 <b>Promo:</b> ' + order.promoCode + '\n'
    : '';

  const message = t(lang, 'admin_new_order', {
    customerName: user.firstName + (user.username ? ' (@' + user.username + ')' : ''),
    customerUsername: user.username || 'N/A',
    customerId: String(user.telegramId),
    game: order.game,
    service: order.service,
    quantity: String(order.quantity),
    username: order.username,
    platform: order.platform,
    notes: order.notes || '-',
    promoLine: promoLine,
    price: order.totalPrice.toFixed(2),
    date: order.createdAt.toLocaleDateString() + ' ' + order.createdAt.toLocaleTimeString(),
    orderId: order.id,
  });

  try {
    await bot.telegram.sendMessage(adminChatId, message, {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [
          Markup.button.callback('✅ ' + t(lang, 'admin_accept'), `ADMIN_ACCEPT_${order.id}`),
          Markup.button.callback('❌ ' + t(lang, 'admin_reject'), `ADMIN_REJECT_${order.id}`),
        ],
        [
          Markup.button.callback('💬 ' + t(lang, 'admin_reply'), `ADMIN_NOTE_${order.id}`),
        ],
      ]),
    }).catch(() => {});
  } catch (error) {
    logger.error('[Marketplace] Failed to notify admin', {
      error: String(error),
      adminChatId,
      orderId: order.id,
    });
  }
}

// ════════════════════════════════════════════════════════════════════
// CATCH-ALL CALLBACK HANDLER
// ════════════════════════════════════════════════════════════════════

bot.action(/^(?!(?:GAME_|SERVICE_|QTY_|PLATFORM_|NOTES_|PROMO_|RATING_|REVIEW_|ORDER_|BACK_|CANCEL_|MPLANG_|MP_|ADMIN_|APPROVE_|HELP_))/, async (ctx) => {
  const data = ctx.callbackQuery && 'data' in ctx.callbackQuery ? ctx.callbackQuery.data : 'unknown';
  logger.info('[Marketplace] Catch-all callback', { data, from: ctx.from?.id });
  try {
    await ctx.answerCbQuery().catch(() => {});
  } catch {
    // Ignore
  }
});

// ════════════════════════════════════════════════════════════════════
// SEED DATA ON START
// ════════════════════════════════════════════════════════════════════

marketplaceStore.seedSampleData();

export default bot;
