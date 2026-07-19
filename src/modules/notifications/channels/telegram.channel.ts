/**
 * src/modules/notifications/channels/telegram.channel.ts
 * Sends Telegram messages via the existing Telegraf bot instance.
 * Fully async — caller does not block.
 */

import type { Telegraf } from 'telegraf';
import type { ProtectedContext } from '../../telegram/middlewares/auth.middleware';
import type { NotificationTemplate } from '../templates';
import { errorMessage, type ChannelResult } from '../types';

/**
 * Lazily resolves the bot instance to avoid a circular dependency chain:
 *   bot.ts → teacher-crm.service.ts → notification.service → telegram.channel.ts → bot.ts
 */
let _bot: Telegraf<ProtectedContext> | null = null;
async function getBot(): Promise<Telegraf<ProtectedContext>> {
  if (!_bot) {
    const mod = await import('../../telegram/bot');
    _bot = mod.default as Telegraf<ProtectedContext>;
  }
  return _bot;
}

export async function sendTelegramNotification(
  chatId: string,
  template: NotificationTemplate,
): Promise<ChannelResult> {
  try {
    const bot = await getBot();
    await bot.telegram.sendMessage(chatId, template.telegramText, {
      parse_mode: 'HTML',
    });
    return { channel: 'TELEGRAM', success: true };
  } catch (error: unknown) {
    console.error('[TelegramChannel] Error:', error);
    return { channel: 'TELEGRAM', success: false, error: errorMessage(error) };
  }
}

/** Send a raw text message (used by retry/redispatch). */
export async function sendTelegramText(chatId: string, text: string): Promise<ChannelResult> {
  try {
    const bot = await getBot();
    await bot.telegram.sendMessage(chatId, text, { parse_mode: 'HTML' });
    return { channel: 'TELEGRAM', success: true };
  } catch (error: unknown) {
    console.error('[TelegramChannel] Error:', error);
    return { channel: 'TELEGRAM', success: false, error: errorMessage(error) };
  }
}

