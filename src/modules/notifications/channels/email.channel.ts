/**
 * src/modules/notifications/channels/email.channel.ts
 * Sends transactional emails via Resend (already installed: `resend` package).
 * Fully async — caller does not block.
 */

import { Resend } from 'resend';
import type { NotificationTemplate } from '../templates';
import type { ChannelResult } from '../types';

const resend = new Resend(process.env.RESEND_API_KEY!);

const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@qarshiyev.uz';

export async function sendEmailNotification(
  toEmail: string,
  template: NotificationTemplate,
): Promise<ChannelResult> {
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: toEmail,
      subject: template.subject,
      html: buildHtmlEmail(template),
    });

    if (error) throw new Error(error.message);

    return { channel: 'EMAIL', success: true };
  } catch (error: any) {
    console.error('[EmailChannel] Error:', error?.message);
    return { channel: 'EMAIL', success: false, error: error?.message };
  }
}

/** Send a raw subject/body email (used by retry/redispatch). */
export async function sendEmailRaw(toEmail: string, subject: string, body: string): Promise<ChannelResult> {
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: toEmail,
      subject,
      html: body.replace(/\n/g, '<br/>'),
    });
    if (error) throw new Error(error.message);
    return { channel: 'EMAIL', success: true };
  } catch (error: any) {
    console.error('[EmailChannel] Error:', error?.message);
    return { channel: 'EMAIL', success: false, error: error?.message };
  }
}

function buildHtmlEmail(template: NotificationTemplate): string {
  // Convert Telegram HTML (just bold/code) to full email-safe HTML
  const bodyHtml = template.telegramText
    .replace(/\n/g, '<br/>')
    .replace(/<code>(.*?)<\/code>/g, '<code style="background:#f3f4f6;padding:2px 6px;border-radius:4px;font-size:13px">$1</code>');

  return `
    <!DOCTYPE html>
    <html lang="uz">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
      <title>${template.subject}</title>
    </head>
    <body style="margin:0;padding:0;background:#f9fafb;font-family:'Segoe UI',Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding:40px 16px;">
            <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.06);overflow:hidden;">
              <!-- Header -->
              <tr>
                <td style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:28px 32px;">
                  <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">Qarshiyev AVYD</h1>
                </td>
              </tr>
              <!-- Body -->
              <tr>
                <td style="padding:32px 32px 24px;">
                  <p style="font-size:16px;line-height:1.7;color:#374151;margin:0;">${bodyHtml}</p>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="background:#f3f4f6;padding:16px 32px;border-top:1px solid #e5e7eb;">
                  <p style="margin:0;font-size:12px;color:#9ca3af;">Bu xabar avtomatik ravishda yuborilgan. Iltimos, javob bermang.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

