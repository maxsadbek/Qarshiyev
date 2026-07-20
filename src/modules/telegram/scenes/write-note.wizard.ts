/**
 * src/modules/telegram/scenes/write-note.wizard.ts
 * Enhanced wizard for writing a note/reply to an application.
 * Also handles reminder time input.
 *
 * Features:
 *   - Auto-edits the admin CRM message after a note is saved
 *   - Supports reminder mode (asks for time instead of text)
 *   - Parses relative time strings (30m, 1h, 3h, Tomorrow 09:00)
 *   - Multilingual responses using the application owner's language
 *   - Keyboard removal after completion
 */
import { Scenes, Markup } from 'telegraf';
import { teacherCrmService } from '../services/teacher-crm.service';
import { t } from '../i18n/translations';
import { safeAnswerCbQuery, logStep } from '../bot-helpers';
import { logger } from '../../../lib/security/logger';
import type { ProtectedContext, RegistrationWizardState } from '../middlewares/auth.middleware';
import { applicationStore } from '../../applications/store';

/**
 * Parses a human-readable time string into a Date object.
 * Supports:
 *   - "30m" -> 30 minutes from now
 *   - "1h" -> 1 hour from now
 *   - "3h" -> 3 hours from now
 *   - "Tomorrow 09:00" -> next day at 09:00
 *   - "09:00" -> today at 09:00
 */
function parseReminderTime(input: string): Date | null {
  const trimmed = input.trim().toLowerCase();
  const now = new Date();

  // "30m" format
  const minuteMatch = trimmed.match(/^(\d+)\s*m(in(ute)?s?)?$/);
  if (minuteMatch) {
    const minutes = parseInt(minuteMatch[1], 10);
    if (minutes > 0 && minutes <= 1440) {
      const d = new Date(now.getTime() + minutes * 60 * 1000);
      return d;
    }
    return null;
  }

  // "1h" or "3h" format
  const hourMatch = trimmed.match(/^(\d+)\s*h(ou?r?s?)?$/);
  if (hourMatch) {
    const hours = parseInt(hourMatch[1], 10);
    if (hours > 0 && hours <= 72) {
      const d = new Date(now.getTime() + hours * 3600 * 1000);
      return d;
    }
    return null;
  }

  // "Tomorrow 09:00" format
  const tomorrowMatch = trimmed.match(/^tomorrow\s+(\d{1,2}):(\d{2})$/);
  if (tomorrowMatch) {
    const hours = parseInt(tomorrowMatch[1], 10);
    const minutes = parseInt(tomorrowMatch[2], 10);
    if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
      const d = new Date(now);
      d.setDate(d.getDate() + 1);
      d.setHours(hours, minutes, 0, 0);
      if (d > now) return d;
    }
    return null;
  }

  // "09:00" format (today)
  const timeMatch = trimmed.match(/^(\d{1,2}):(\d{2})$/);
  if (timeMatch) {
    const hours = parseInt(timeMatch[1], 10);
    const minutes = parseInt(timeMatch[2], 10);
    if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
      const d = new Date(now);
      d.setHours(hours, minutes, 0, 0);
      if (d > now) return d;
      // If time has passed today, schedule for tomorrow
      d.setDate(d.getDate() + 1);
      return d;
    }
    return null;
  }

  return null;
}

export const writeNoteWizard = new Scenes.WizardScene<ProtectedContext>(
  'CRM_WRITE_NOTE',

  // ── Step 0: Ask for note or reminder time ─────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const appId = state.applicationId;
    const isReminder = state.reminderMode === true;

    logStep(isReminder ? 'Reminder' : 'Note', 0, 'entered', isReminder ? 'asking for time' : 'asking for note text');

    // Get the user's language from the application being replied to
    let lang = 'uz';

    if (appId) {
      const app = applicationStore.getById(appId);
      if (app?.data.language) {
        lang = app.data.language;
      }
    }

    state.language = lang;

    const promptText = isReminder
      ? t(lang, 'reminder_time_prompt')
      : t(lang, 'note_write_prompt');

    await ctx.reply(
      promptText,
      {
        ...Markup.keyboard(['/cancel']).oneTime().resize(),
        parse_mode: 'HTML',
      }
    ).catch(() => {});
    logStep(isReminder ? 'Reminder' : 'Note', 0, 'completed');
    return ctx.wizard.next();
  },

  // ── Step 1: Save note or create reminder ──────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const isReminder = state.reminderMode === true;
    logStep(isReminder ? 'Reminder' : 'Note', 1, 'entered');

    if (ctx.message && 'text' in ctx.message) {
      const text = ctx.message.text;

      if (text === '/cancel') {
        logStep(isReminder ? 'Reminder' : 'Note', 1, 'completed', 'cancelled by user');
        await ctx.reply(t(state.language || 'uz', 'note_cancelled'), {
          ...Markup.removeKeyboard(),
          parse_mode: 'HTML',
        }).catch(() => {});
        return ctx.scene.leave();
      }

      const lang = state.language || 'uz';

      if (isReminder) {
        // ── Handle reminder time input ─────────────────────────
        const reminderTime = parseReminderTime(text);
        if (!reminderTime) {
          logStep('Reminder', 1, 'waiting', 'invalid time format');
          await ctx.reply(t(lang, 'reminder_invalid'), {
            parse_mode: 'HTML',
          }).catch(() => {});
          return; // Stay on same step
        }

        logStep('Reminder', 1, 'completed', `reminder set for ${reminderTime.toISOString()}`);

        try {
          const success = await teacherCrmService.createReminder(
            state.applicationId ?? '',
            reminderTime,
            state.actionUserId ?? ''
          );

          if (success) {
            await ctx.reply(t(lang, 'reminder_saved'), {
              ...Markup.removeKeyboard(),
              parse_mode: 'HTML',
            }).catch(() => {});
          } else {
            await ctx.reply(t(lang, 'duplicate_reminder'), {
              ...Markup.removeKeyboard(),
              parse_mode: 'HTML',
            }).catch(() => {});
          }
        } catch (error) {
          logger.error('[Wizard:Reminder] Failed to create reminder', {
            error: String(error),
            applicationId: state.applicationId,
          });
          await ctx.reply(t(lang, 'error_generic'), {
            ...Markup.removeKeyboard(),
            parse_mode: 'HTML',
          }).catch(() => {});
        }

        return ctx.scene.leave();
      } else {
        // ── Handle note input ────────────────────────────────
        logStep('Note', 1, 'completed', `note received (${text.length} chars for app ${state.applicationId})`);

        try {
          const success = await teacherCrmService.addNote(
            state.applicationId ?? '',
            text,
            state.actionUserId ?? ''
          );

          if (success) {
            logStep('Note', 1, 'completed', 'note saved in store');

            // Auto-edit the admin CRM message to show the note
            const appId = state.applicationId;
            if (appId) {
              try {
                // Try to get the admin chat message and edit it
                const app = applicationStore.getById(appId);
                if (app && ctx.callbackQuery?.message) {
                  const currentText = (ctx.callbackQuery.message as { text?: string })?.text || '';
                  const updatedText = currentText + `\n\n━━━━━━━━━━━━━━━━━━\n📝 <b>${t(lang, 'admin_note_title')}</b>\n\"${text}\"\n━━━━━━━━━━━━━━━━━━`;
                  try {
                    await ctx.telegram.editMessageText(
                      ctx.callbackQuery.message.chat.id,
                      ctx.callbackQuery.message.message_id,
                      undefined,
                      updatedText,
                      {
                        parse_mode: 'HTML',
                        ...teacherCrmService.buildPremiumKeyboard(appId),
                      }
                    );
                  } catch { /* message not editable, ignore */ }
                }
              } catch { /* ignore edit errors */ }
            }

            await ctx.reply(t(lang, 'note_saved'), {
              ...Markup.removeKeyboard(),
              parse_mode: 'HTML',
            }).catch(() => {});
          } else {
            await ctx.reply(t(lang, 'admin_only'), {
              ...Markup.removeKeyboard(),
              parse_mode: 'HTML',
            }).catch(() => {});
          }
        } catch (error) {
          logger.error('[Wizard:Note] Failed to save note', {
            error: String(error),
            applicationId: state.applicationId,
          });
          await ctx.reply(t(lang, 'error_generic'), {
            ...Markup.removeKeyboard(),
            parse_mode: 'HTML',
          }).catch(() => {});
        }

        return ctx.scene.leave();
      }
    } else {
      // Non-text message - ask again
      logStep(isReminder ? 'Reminder' : 'Note', 1, 'waiting', 'non-text message');
      const wsp = ctx.wizard.state as RegistrationWizardState;
      const lang2 = wsp.language || 'uz';
      await ctx.reply(t(lang2, 'note_non_text')).catch(() => {});
      return; // Stay on same step
    }
  }
);
