/**
 * src/modules/notifications/channels/telegram.channel.ts
 * Sends Telegram messages via the existing Telegraf bot instance.
 * Fully async — caller does not block.
 */

import bot from '../../telegram/bot';
import type { NotificationTemplate } from '../templates';
import type { ChannelResult } from '../types';

export async function sendTelegramNotification(
  chatId: string,
  template: NotificationTemplate,
): Promise<ChannelResult> {
  try {
    await bot.telegram.sendMessage(chatId, template.telegramText, {
      parse_mode: 'HTML',
    });
    return { channel: 'TELEGRAM', success: true };
  } catch (error: any) {
    console.error('[TelegramChannel] Error:', error?.message);
    return { channel: 'TELEGRAM', success: false, error: error?.message };
  }
}

/** Send a raw text message (used by retry/redispatch). */
export async function sendTelegramText(chatId: string, text: string): Promise<ChannelResult> {
  try {
    await bot.telegram.sendMessage(chatId, text, { parse_mode: 'HTML' });
    return { channel: 'TELEGRAM', success: true };
  } catch (error: any) {
    console.error('[TelegramChannel] Error:', error?.message);
    return { channel: 'TELEGRAM', success: false, error: error?.message };
  }
}
