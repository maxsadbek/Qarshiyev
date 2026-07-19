/**
 * src/modules/marketplace/scenes/order.wizard.ts
 * Order creation wizard for the FreeBuff Gaming Marketplace.
 * Steps: Game → Service → Quantity → Username → Platform → Notes → Promo → Confirm
 */
import { Scenes, Markup } from 'telegraf';
import type { ProtectedContext } from '../../telegram/middlewares/auth.middleware';
import { marketplaceStore } from '../marketplace.store';
import { t, langLabel } from '../i18n/translations';
import { GAMES, SERVICES, PLATFORMS, REFERRAL_BONUS_PERCENT } from '../types';
import type { LangCode, OrderWizardState } from '../types';
import { logger } from '../../../lib/security/logger';

export const orderWizard = new Scenes.WizardScene<ProtectedContext>(
  'MARKETPLACE_ORDER',

  // ── Step 0: Select Game ──────────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as OrderWizardState;
    const userId = ctx.from?.id;
    state.language = marketplaceStore.getUserLanguage(userId!);

    logger.info('[Marketplace] Step 0: Game selection', { from: userId });

    const lang = state.language;
    const gameButtons = GAMES.map((g) => [
      Markup.button.callback(`${g.emoji} ${g.name[lang]}`, `GAME_${g.key}`),
    ]);

    await ctx.reply(t(lang, 'select_game'), {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        ...gameButtons,
        [Markup.button.callback('🔙 ' + t(lang, 'btn_cancel'), 'CANCEL_ORDER')],
      ]),
    });

    return ctx.wizard.next();
  },

  // ── Step 1: Select Service ───────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as OrderWizardState;
    const hasCallback =
      !!(ctx.callbackQuery && 'data' in ctx.callbackQuery);

    if (hasCallback) {
      const data = ctx.callbackQuery.data;
      await ctx.answerCbQuery().catch(() => {});

      if (data === 'CANCEL_ORDER') {
        await ctx.editMessageText(t(state.language, 'order_cancelled'), {
          parse_mode: 'HTML',
          ...Markup.inlineKeyboard([
            [Markup.button.callback('🏠 ' + t(state.language, 'btn_main_menu'), 'MP_MAIN_MENU')],
          ]),
        }).catch(() => {});
        return ctx.scene.leave();
      }

      if (data.startsWith('GAME_')) {
        state.game = data.replace('GAME_', '');
      }
    }

    if (!state.game) return;

    const lang = state.language;
    const serviceButtons = SERVICES.map((s) => [
      Markup.button.callback(
        `${s.emoji} ${s.name[lang]} — $${s.basePrice}`,
        `SERVICE_${s.key}`
      ),
    ]);

    // Chunk into rows of 2
    const rows: ReturnType<typeof Markup.button.callback>[][] = [];
    for (let i = 0; i < serviceButtons.length; i += 2) {
      const row = serviceButtons.slice(i, i + 2);
      // Flatten the nested arrays
      rows.push(row.flat());
    }

    await ctx.editMessageText(t(lang, 'select_service'), {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        ...rows,
        [Markup.button.callback('🔙 ' + t(lang, 'btn_back'), 'BACK_TO_GAME')],
      ]),
    }).catch(() => {});

    return ctx.wizard.next();
  },

  // ── Step 2: Select Quantity ──────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as OrderWizardState;
    const hasCallback =
      !!(ctx.callbackQuery && 'data' in ctx.callbackQuery);

    if (hasCallback) {
      const data = ctx.callbackQuery.data;
      await ctx.answerCbQuery().catch(() => {});

      if (data === 'BACK_TO_GAME') {
        state.game = undefined;
        state.service = undefined;
        await ctx.editMessageText(t(state.language, 'select_game'), {
          parse_mode: 'HTML',
          ...Markup.inlineKeyboard(
            GAMES.map((g) => [
              Markup.button.callback(
                `${g.emoji} ${g.name[state.language]}`,
                `GAME_${g.key}`
              ),
            ])
          ),
        }).catch(() => {});
        return ctx.wizard.back();
      }

      if (data.startsWith('SERVICE_')) {
        state.service = data.replace('SERVICE_', '');
      }
    }

    if (!state.service) return;

    const lang = state.language;
    const quickQtys = [1, 2, 3, 5, 10];
    const qtyButtons = quickQtys.map((q) =>
      Markup.button.callback(`×${q}`, `QTY_${q}`)
    );
    // 3 per row
    const qtyRows: ReturnType<typeof Markup.button.callback>[][] = [];
    for (let i = 0; i < qtyButtons.length; i += 3) {
      qtyRows.push(qtyButtons.slice(i, i + 3));
    }

    await ctx.editMessageText(t(lang, 'enter_quantity'), {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        ...qtyRows,
        [Markup.button.callback('🔙 ' + t(lang, 'btn_back'), 'BACK_TO_SERVICE')],
        [Markup.button.callback('❌ ' + t(lang, 'btn_cancel'), 'CANCEL_ORDER')],
      ]),
    }).catch(() => {});

    return ctx.wizard.next();
  },

  // ── Step 3: Enter Username ───────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as OrderWizardState;

    // Handle callback for quick quantity
    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const data = ctx.callbackQuery.data;
      await ctx.answerCbQuery().catch(() => {});

      if (data === 'BACK_TO_SERVICE') {
        state.service = undefined;
        const lang = state.language;
        const serviceButtons = SERVICES.map((s) => [
          Markup.button.callback(
            `${s.emoji} ${s.name[lang]} — $${s.basePrice}`,
            `SERVICE_${s.key}`
          ),
        ]);
        const rows: ReturnType<typeof Markup.button.callback>[][] = [];
        for (let i = 0; i < serviceButtons.length; i += 2) {
          rows.push(serviceButtons.slice(i, i + 2).flat());
        }
        await ctx.editMessageText(t(lang, 'select_service'), {
          parse_mode: 'HTML',
          ...Markup.inlineKeyboard([
            ...rows,
            [Markup.button.callback('🔙 ' + t(lang, 'btn_back'), 'BACK_TO_GAME')],
          ]),
        }).catch(() => {});
        return ctx.wizard.back();
      }

      if (data === 'CANCEL_ORDER') {
        await ctx.editMessageText(t(state.language, 'order_cancelled'), {
          parse_mode: 'HTML',
          ...Markup.inlineKeyboard([
            [Markup.button.callback('🏠 ' + t(state.language, 'btn_main_menu'), 'MP_MAIN_MENU')],
          ]),
        }).catch(() => {});
        return ctx.scene.leave();
      }

      if (data.startsWith('QTY_')) {
        state.quantity = parseInt(data.replace('QTY_', ''));
      }
    }

    // Handle text input for quantity
    if (ctx.message && 'text' in ctx.message && state.quantity === undefined) {
      const qty = parseInt(ctx.message.text.trim());
      if (isNaN(qty) || qty < 1 || qty > 9999) {
        await ctx.reply(t(state.language, 'invalid_quantity')).catch(() => {});
        return;
      }
      state.quantity = qty;
    }

    if (state.quantity === undefined) return;

    const lang = state.language;
    await ctx.reply(t(lang, 'enter_username'), {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('🔙 ' + t(lang, 'btn_back'), 'BACK_TO_QTY')],
        [Markup.button.callback('❌ ' + t(lang, 'btn_cancel'), 'CANCEL_ORDER')],
      ]),
    }).catch(() => {});

    return ctx.wizard.next();
  },

  // ── Step 4: Select Platform ──────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as OrderWizardState;

    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const data = ctx.callbackQuery.data;
      await ctx.answerCbQuery().catch(() => {});

      if (data === 'BACK_TO_QTY') {
        state.quantity = undefined;
        const lang = state.language;
        const quickQtys = [1, 2, 3, 5, 10];
        const qtyButtons = quickQtys.map((q) =>
          Markup.button.callback(`×${q}`, `QTY_${q}`)
        );
        const qtyRows: ReturnType<typeof Markup.button.callback>[][] = [];
        for (let i = 0; i < qtyButtons.length; i += 3) {
          qtyRows.push(qtyButtons.slice(i, i + 3));
        }
        await ctx.editMessageText(t(lang, 'enter_quantity'), {
          parse_mode: 'HTML',
          ...Markup.inlineKeyboard([
            ...qtyRows,
            [Markup.button.callback('🔙 ' + t(lang, 'btn_back'), 'BACK_TO_SERVICE')],
            [Markup.button.callback('❌ ' + t(lang, 'btn_cancel'), 'CANCEL_ORDER')],
          ]),
        }).catch(() => {});
        return ctx.wizard.back();
      }

      if (data === 'CANCEL_ORDER') {
        await ctx.editMessageText(t(state.language, 'order_cancelled'), {
          parse_mode: 'HTML',
          ...Markup.inlineKeyboard([
            [Markup.button.callback('🏠 ' + t(state.language, 'btn_main_menu'), 'MP_MAIN_MENU')],
          ]),
        }).catch(() => {});
        return ctx.scene.leave();
      }
    }

    // Handle text input for username
    if (ctx.message && 'text' in ctx.message && !state.username) {
      state.username = ctx.message.text.trim();
    }

    if (!state.username) return;

    const lang = state.language;
    const platformButtons = PLATFORMS.map((p) => [
      Markup.button.callback(`📱 ${p}`, `PLATFORM_${p}`),
    ]);

    await ctx.reply(t(lang, 'select_platform'), {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        ...platformButtons,
        [Markup.button.callback('🔙 ' + t(lang, 'btn_back'), 'BACK_TO_USERNAME')],
        [Markup.button.callback('❌ ' + t(lang, 'btn_cancel'), 'CANCEL_ORDER')],
      ]),
    }).catch(() => {});

    return ctx.wizard.next();
  },

  // ── Step 5: Enter Notes ──────────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as OrderWizardState;
    const hasCallback =
      !!(ctx.callbackQuery && 'data' in ctx.callbackQuery);

    if (hasCallback) {
      const data = ctx.callbackQuery.data;
      await ctx.answerCbQuery().catch(() => {});

      if (data === 'BACK_TO_USERNAME') {
        state.username = undefined;
        const lang = state.language;
        await ctx.editMessageText(t(lang, 'enter_username'), {
          parse_mode: 'HTML',
          ...Markup.inlineKeyboard([
            [Markup.button.callback('🔙 ' + t(lang, 'btn_back'), 'BACK_TO_QTY')],
            [Markup.button.callback('❌ ' + t(lang, 'btn_cancel'), 'CANCEL_ORDER')],
          ]),
        }).catch(() => {});
        return ctx.wizard.back();
      }

      if (data === 'CANCEL_ORDER') {
        await ctx.editMessageText(t(state.language, 'order_cancelled'), {
          parse_mode: 'HTML',
          ...Markup.inlineKeyboard([
            [Markup.button.callback('🏠 ' + t(state.language, 'btn_main_menu'), 'MP_MAIN_MENU')],
          ]),
        }).catch(() => {});
        return ctx.scene.leave();
      }

      if (data.startsWith('PLATFORM_')) {
        state.platform = data.replace('PLATFORM_', '');
      }
    }

    if (!state.platform) return;

    const lang = state.language;
    await ctx.reply(t(lang, 'enter_notes'), {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('⏭ ' + t(lang, 'btn_skip'), 'NOTES_SKIP')],
        [Markup.button.callback('🔙 ' + t(lang, 'btn_back'), 'BACK_TO_PLATFORM')],
        [Markup.button.callback('❌ ' + t(lang, 'btn_cancel'), 'CANCEL_ORDER')],
      ]),
    }).catch(() => {});

    return ctx.wizard.next();
  },

  // ── Step 6: Promo Code ───────────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as OrderWizardState;

    // Handle callback for platform
    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const data = ctx.callbackQuery.data;
      await ctx.answerCbQuery().catch(() => {});

      if (data === 'BACK_TO_PLATFORM') {
        state.platform = undefined;
        const lang = state.language;
        const platformButtons = PLATFORMS.map((p) => [
          Markup.button.callback(`📱 ${p}`, `PLATFORM_${p}`),
        ]);
        await ctx.editMessageText(t(lang, 'select_platform'), {
          parse_mode: 'HTML',
          ...Markup.inlineKeyboard([
            ...platformButtons,
            [Markup.button.callback('🔙 ' + t(lang, 'btn_back'), 'BACK_TO_USERNAME')],
            [Markup.button.callback('❌ ' + t(lang, 'btn_cancel'), 'CANCEL_ORDER')],
          ]),
        }).catch(() => {});
        return ctx.wizard.back();
      }

      if (data === 'CANCEL_ORDER') {
        await ctx.editMessageText(t(state.language, 'order_cancelled'), {
          parse_mode: 'HTML',
          ...Markup.inlineKeyboard([
            [Markup.button.callback('🏠 ' + t(state.language, 'btn_main_menu'), 'MP_MAIN_MENU')],
          ]),
        }).catch(() => {});
        return ctx.scene.leave();
      }

      if (data === 'NOTES_SKIP') {
        state.notes = '-';
      }
    }

    // Handle text input for notes
    if (ctx.message && 'text' in ctx.message && state.notes === undefined) {
      state.notes = ctx.message.text.trim();
    }

    if (state.notes === undefined) return;

    const lang = state.language;
    await ctx.reply(t(lang, 'promo_code_prompt'), {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('⏭ ' + t(lang, 'btn_skip'), 'PROMO_SKIP')],
        [Markup.button.callback('🔙 ' + t(lang, 'btn_back'), 'BACK_TO_NOTES')],
        [Markup.button.callback('❌ ' + t(lang, 'btn_cancel'), 'CANCEL_ORDER')],
      ]),
    }).catch(() => {});

    return ctx.wizard.next();
  },

  // ── Step 7: Show Summary & Confirm ───────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as OrderWizardState;

    // Handle promo code
    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const data = ctx.callbackQuery.data;
      await ctx.answerCbQuery().catch(() => {});

      if (data === 'BACK_TO_NOTES') {
        state.notes = undefined;
        const lang = state.language;
        await ctx.editMessageText(t(lang, 'enter_notes'), {
          parse_mode: 'HTML',
          ...Markup.inlineKeyboard([
            [Markup.button.callback('⏭ ' + t(lang, 'btn_skip'), 'NOTES_SKIP')],
            [Markup.button.callback('🔙 ' + t(lang, 'btn_back'), 'BACK_TO_PLATFORM')],
            [Markup.button.callback('❌ ' + t(lang, 'btn_cancel'), 'CANCEL_ORDER')],
          ]),
        }).catch(() => {});
        return ctx.wizard.back();
      }

      if (data === 'CANCEL_ORDER') {
        await ctx.editMessageText(t(state.language, 'order_cancelled'), {
          parse_mode: 'HTML',
          ...Markup.inlineKeyboard([
            [Markup.button.callback('🏠 ' + t(state.language, 'btn_main_menu'), 'MP_MAIN_MENU')],
          ]),
        }).catch(() => {});
        return ctx.scene.leave();
      }

      if (data === 'PROMO_SKIP') {
        state.promoCode = undefined;
      }
    }

    // Handle text input for promo code
    if (ctx.message && 'text' in ctx.message && state.promoCode === undefined) {
      const text = ctx.message.text.trim();
      if (text === '0' || text === '-') {
        state.promoCode = undefined;
      } else {
        const promo = marketplaceStore.validatePromoCode(text);
        if (promo) {
          state.promoCode = text.toUpperCase();
        } else {
          await ctx.reply(t(state.language, 'invalid_promo'), {
            parse_mode: 'HTML',
            ...Markup.inlineKeyboard([
              [Markup.button.callback('⏭ ' + t(state.language, 'btn_skip'), 'PROMO_SKIP')],
            ]),
          }).catch(() => {});
          return;
        }
      }
    }

    if (state.promoCode === undefined) {
      // Need to wait for input
      return;
    }

    // Build summary
    const lang = state.language;
    const serviceItem = SERVICES.find((s) => s.key === state.service);
    const gameItem = GAMES.find((g) => g.key === state.game);
    const serviceName = serviceItem?.name[lang] || state.service!;
    const gameName = gameItem?.name[lang] || state.game!;

    let discount = 0;
    let promoLine = '';
    if (state.promoCode) {
      const promo = marketplaceStore.validatePromoCode(state.promoCode);
      if (promo) {
        discount = promo.discountPct;
        promoLine = t(lang, 'promo_applied', {
          code: state.promoCode,
          discount: discount,
        });
      }
    }

    const basePrice = serviceItem?.basePrice || 0;
    const finalPrice =
      state.service === 'custom_order'
        ? 0
        : basePrice * state.quantity! * (1 - discount / 100);

    const priceLine = t(lang, 'order_price_line', {
      price: Math.round(finalPrice * 100) / 100,
      promoLine: promoLine,
    });

    const summary = t(lang, 'order_summary', {
      game: gameName,
      service: serviceName,
      quantity: state.quantity!,
      username: state.username!,
      platform: state.platform!,
      notes: state.notes || '-',
      priceLine: priceLine,
    });

    await ctx.reply(summary, {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [
          Markup.button.callback(
            '✅ ' + t(lang, 'btn_confirm'),
            'ORDER_CONFIRM'
          ),
          Markup.button.callback(
            '❌ ' + t(lang, 'btn_cancel'),
            'CANCEL_ORDER'
          ),
        ],
        [Markup.button.callback('🔙 ' + t(lang, 'btn_back'), 'BACK_TO_PROMO')],
      ]),
    }).catch(() => {});

    return ctx.wizard.next();
  },

  // ── Step 8: Final Processing ──────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as OrderWizardState;
    const userId = ctx.from?.id;

    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const data = ctx.callbackQuery.data;
      await ctx.answerCbQuery().catch(() => {});

      if (data === 'BACK_TO_PROMO') {
        state.promoCode = undefined;
        const lang = state.language;
        await ctx.editMessageText(t(lang, 'promo_code_prompt'), {
          parse_mode: 'HTML',
          ...Markup.inlineKeyboard([
            [Markup.button.callback('⏭ ' + t(lang, 'btn_skip'), 'PROMO_SKIP')],
            [Markup.button.callback('🔙 ' + t(lang, 'btn_back'), 'BACK_TO_NOTES')],
            [Markup.button.callback('❌ ' + t(lang, 'btn_cancel'), 'CANCEL_ORDER')],
          ]),
        }).catch(() => {});
        return ctx.wizard.back();
      }

      if (data === 'CANCEL_ORDER') {
        await ctx.editMessageText(t(state.language, 'order_cancelled'), {
          parse_mode: 'HTML',
          ...Markup.inlineKeyboard([
            [Markup.button.callback('🏠 ' + t(state.language, 'btn_main_menu'), 'MP_MAIN_MENU')],
          ]),
        }).catch(() => {});
        return ctx.scene.leave();
      }

      if (data === 'ORDER_CONFIRM') {
        try {
          const lang = state.language;
          const user = marketplaceStore.getUserByTelegramId(userId!);
          if (!user) {
            logger.error('[Marketplace] User not found', { telegramId: userId });
            await ctx.reply(t(lang, 'error_generic'), {
              parse_mode: 'HTML',
            }).catch(() => {});
            return ctx.scene.leave();
          }

          let discount = 0;
          if (state.promoCode) {
            const promo = marketplaceStore.validatePromoCode(state.promoCode);
            if (promo) {
              discount = promo.discountPct;
              marketplaceStore.usePromoCode(state.promoCode);
            }
          }

          const order = marketplaceStore.createOrder(
            user.id,
            {
              game: state.game!,
              service: state.service!,
              quantity: state.quantity!,
              username: state.username!,
              platform: state.platform!,
              notes: state.notes || '-',
              promoCode: state.promoCode,
            },
            discount
          );

          logger.info('[Marketplace] Order created', {
            orderId: order.id,
            userId: user.id,
            service: order.service,
          });

          // Add referral bonus to referrer if exists
          if (user.referredBy) {
            const bonusAmount = order.totalPrice * (REFERRAL_BONUS_PERCENT / 100);
            marketplaceStore.addReferralBonus(user.referredBy, bonusAmount);
            const referrer = marketplaceStore.getUser(user.referredBy);
            const orderUser = marketplaceStore.getUser(order.userId);
            if (referrer && orderUser) {
              try {
                await ctx.telegram.sendMessage(
                  referrer.telegramId,
                  t(referrer.language, 'referral_earned', {
                    amount: bonusAmount.toFixed(2),
                  }),
                  { parse_mode: 'HTML' }
                ).catch(() => {});
              } catch {
                // Referrer might have blocked the bot
              }
            }
          }

          // Notify user
          await ctx.editMessageText(
            t(lang, 'order_placed', { orderId: order.id }),
            {
              parse_mode: 'HTML',
              ...Markup.inlineKeyboard([
                [Markup.button.callback('🏠 ' + t(lang, 'btn_main_menu'), 'MP_MAIN_MENU')],
              ]),
            }
          ).catch(() => {});

          // Notify admin
          await MarketplaceNotifier.notifyNewOrder(order, user).catch((err) => {
            logger.error('[Marketplace] Failed to notify admin', {
              error: String(err),
              orderId: order.id,
            });
          });
        } catch (error) {
          logger.error('[Marketplace] Order processing error', {
            error: String(error),
            userId,
          });
          await ctx.reply('❌ ' + t(state.language, 'error_generic'), {
            parse_mode: 'HTML',
          }).catch(() => {});
        }

        return ctx.scene.leave();
      }
    }

    // Handle text messages during final step
    if (ctx.message && 'text' in ctx.message) {
      await ctx.reply(
        t(state.language, 'choose_option'),
        Markup.inlineKeyboard([
          [
            Markup.button.callback('✅ ' + t(state.language, 'btn_confirm'), 'ORDER_CONFIRM'),
            Markup.button.callback('❌ ' + t(state.language, 'btn_cancel'), 'CANCEL_ORDER'),
          ],
        ])
      ).catch(() => {});
    }
  }
);

// ── Admin Notifier (lazy import to avoid circular dep) ──────────────
class MarketplaceNotifier {
  static async notifyNewOrder(
    order: import('../marketplace.store').MpOrder,
    user: import('../marketplace.store').MpUser
  ): Promise<void> {
    const { notifyAdminOrder } = await import('../marketplace.bot');
    await notifyAdminOrder(order, user);
  }
}
