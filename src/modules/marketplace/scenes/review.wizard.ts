/**
 * src/modules/marketplace/scenes/review.wizard.ts
 * Review wizard — asks for rating (1-5) and review text after order completion.
 */
import { Scenes, Markup } from 'telegraf';
import type { ProtectedContext } from '../../telegram/middlewares/auth.middleware';
import { marketplaceStore } from '../marketplace.store';
import { t } from '../i18n/translations';
import type { ReviewWizardState } from '../types';
import { logger } from '../../../lib/security/logger';

export const reviewWizard = new Scenes.WizardScene<ProtectedContext>(
  'MARKETPLACE_REVIEW',

  // ── Step 0: Select Rating ────────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as ReviewWizardState;
    const userId = ctx.from?.id;
    const user = marketplaceStore.getUserByTelegramId(userId!);
    if (!user) {
      await ctx.reply('❌ ' + t('en', 'error_generic')).catch(() => {});
      return ctx.scene.leave();
    }

    state.language = user.language;
    const lang = state.language;

    // Check if user has completed orders without reviews
    const completedOrders = marketplaceStore
      .getUserOrders(user.id)
      .filter(
        (o) =>
          o.status === 'COMPLETED' &&
          !marketplaceStore.hasReviewedOrder(o.id)
      );

    if (completedOrders.length === 0) {
      await ctx.reply(
        '⭐ ' + t(lang, 'no_reviews'),
        {
          parse_mode: 'HTML',
          ...Markup.inlineKeyboard([
            [Markup.button.callback('🏠 ' + t(lang, 'btn_main_menu'), 'MP_MAIN_MENU')],
          ]),
        }
      ).catch(() => {});
      return ctx.scene.leave();
    }

    // If there's only one, auto-select it
    if (completedOrders.length === 1) {
      state.orderId = completedOrders[0].id;
      const order = completedOrders[0];

      logger.info('[Marketplace Review] Auto-selecting order', {
        orderId: order.id,
      });

      await ctx.reply(
        '⭐ ' + t(lang, 'review_request', { service: order.service }),
        {
          parse_mode: 'HTML',
          ...Markup.inlineKeyboard([
            [Markup.button.callback('1 ⭐', 'RATING_1')],
            [Markup.button.callback('2 ⭐⭐', 'RATING_2')],
            [Markup.button.callback('3 ⭐⭐⭐', 'RATING_3')],
            [Markup.button.callback('4 ⭐⭐⭐⭐', 'RATING_4')],
            [Markup.button.callback('5 ⭐⭐⭐⭐⭐', 'RATING_5')],
            [Markup.button.callback('❌ ' + t(lang, 'btn_cancel'), 'REVIEW_CANCEL')],
          ]),
        }
      ).catch(() => {});

      return ctx.wizard.next();
    }

    // Multiple orders — let user pick one
    const orderButtons = completedOrders.map((o) => [
      Markup.button.callback(
        `🆔 #${o.id.slice(0, 6)} — ${o.service}`,
        `REVIEW_ORDER_${o.id}`
      ),
    ]);      const msg = lang === 'uz' ? 'Qaysi buyurtmani baholaysiz?' :
        lang === 'ru' ? 'Какой заказ хотите оценить?' :
        'Which order would you like to review?';
      await ctx.reply(
        '⭐ <b>' + msg + '</b>',
      {
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([
          ...orderButtons,
          [Markup.button.callback('❌ ' + t(lang, 'btn_cancel'), 'REVIEW_CANCEL')],
        ]),
      }
    ).catch(() => {});

    return ctx.wizard.next();
  },

  // ── Step 1: Wait for rating ──────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as ReviewWizardState;
    const lang = state.language;

    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const data = ctx.callbackQuery.data;
      await ctx.answerCbQuery().catch(() => {});

      if (data === 'REVIEW_CANCEL') {
        await ctx.editMessageText('❌ ' + t(lang, 'btn_cancel'), {
          parse_mode: 'HTML',
          ...Markup.inlineKeyboard([
            [Markup.button.callback('🏠 ' + t(lang, 'btn_main_menu'), 'MP_MAIN_MENU')],
          ]),
        }).catch(() => {});
        return ctx.scene.leave();
      }

      if (data.startsWith('REVIEW_ORDER_')) {
        state.orderId = data.replace('REVIEW_ORDER_', '');
        const order = marketplaceStore.getOrder(state.orderId!);
        if (!order) {
          await ctx.editMessageText('❌ ' + t(lang, 'error_generic')).catch(() => {});
          return ctx.scene.leave();
        }

        await ctx.editMessageText(
          '⭐ ' + t(lang, 'review_request', { service: order.service }),
          {
            parse_mode: 'HTML',
            ...Markup.inlineKeyboard([
              [Markup.button.callback('1 ⭐', 'RATING_1')],
              [Markup.button.callback('2 ⭐⭐', 'RATING_2')],
              [Markup.button.callback('3 ⭐⭐⭐', 'RATING_3')],
              [Markup.button.callback('4 ⭐⭐⭐⭐', 'RATING_4')],
              [Markup.button.callback('5 ⭐⭐⭐⭐⭐', 'RATING_5')],
              [Markup.button.callback('❌ ' + t(lang, 'btn_cancel'), 'REVIEW_CANCEL')],
            ]),
          }
        ).catch(() => {});

        return ctx.wizard.next();
      }

      if (data.startsWith('RATING_')) {
        state.rating = parseInt(data.replace('RATING_', ''));
      }
    }

    return; // Wait for callback
  },

  // ── Step 2: Wait for rating (if selected order first) ────────────
  async (ctx) => {
    const state = ctx.wizard.state as ReviewWizardState;
    const lang = state.language;

    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const data = ctx.callbackQuery.data;
      await ctx.answerCbQuery().catch(() => {});

      if (data === 'REVIEW_CANCEL') {
        await ctx.editMessageText('❌ ' + t(lang, 'btn_cancel'), {
          parse_mode: 'HTML',
          ...Markup.inlineKeyboard([
            [Markup.button.callback('🏠 ' + t(lang, 'btn_main_menu'), 'MP_MAIN_MENU')],
          ]),
        }).catch(() => {});
        return ctx.scene.leave();
      }

      if (data.startsWith('RATING_')) {
        state.rating = parseInt(data.replace('RATING_', ''));
      }
    }

    if (state.rating === undefined) return;

    // Ask for review text
    await ctx.editMessageText(
      '📝 ' + t(lang, 'enter_notes').replace('<b>', '').replace('</b>', ''),
      {
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([
          [Markup.button.callback('❌ ' + t(lang, 'btn_cancel'), 'REVIEW_CANCEL')],
        ]),
      }
    ).catch(() => {});

    return ctx.wizard.next();
  },

  // ── Step 3: Save review ──────────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as ReviewWizardState;
    const lang = state.language;
    const userId = ctx.from?.id;

    const user = marketplaceStore.getUserByTelegramId(userId!);
    if (!user) {
      await ctx.reply('❌ ' + t('en', 'error_generic')).catch(() => {});
      return ctx.scene.leave();
    }

    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const data = ctx.callbackQuery.data;
      await ctx.answerCbQuery().catch(() => {});

      if (data === 'REVIEW_CANCEL') {
        await ctx.editMessageText('❌ ' + t(lang, 'btn_cancel')).catch(() => {});
        return ctx.scene.leave();
      }
    }

    if (ctx.message && 'text' in ctx.message) {
      state.text = ctx.message.text.trim() || '-';
    }

    if (state.text === undefined) return; // Wait for text

    // Ensure text is not empty
    if (!state.text || state.text === '') {
      state.text = '-';
    }

    try {
      const review = marketplaceStore.createReview(
        user.id,
        state.orderId!,
        state.rating!,
        state.text
      );

      logger.info('[Marketplace Review] Created', {
        reviewId: review.id,
        orderId: state.orderId,
        rating: state.rating,
        userId: userId,
      });

      await ctx.reply('✅ ' + t(lang, 'review_thanks'), {
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([
          [Markup.button.callback('🏠 ' + t(lang, 'btn_main_menu'), 'MP_MAIN_MENU')],
        ]),
      }).catch(() => {});

      // Notify admin about new review
      try {
        const adminChatId = process.env.FREE_BUFF_ADMIN_CHAT_ID;
        if (adminChatId) {
          await ctx.telegram.sendMessage(
            adminChatId,
            `⭐ <b>Yangi sharh!</b>\n\n👤 ${user.firstName}\n⭐ ${'⭐'.repeat(state.rating!)}\n📝 ${state.text}\n🆔 Review: <code>${review.id}</code>\n\n#review #pending`,
            {
              parse_mode: 'HTML',
              ...Markup.inlineKeyboard([
                [Markup.button.callback('✅ Tasdiqlash', `APPROVE_REVIEW_${review.id}`)],
              ]),
            }
          ).catch(() => {});
        }
      } catch {
        // Admin notification failed, ignore
      }
    } catch (error) {
      logger.error('[Marketplace Review] Failed to save', {
        error: String(error),
        userId,
      });
      await ctx.reply('❌ ' + t(lang, 'error_generic')).catch(() => {});
    }

    return ctx.scene.leave();
  }
);
