/**
 * src/modules/telegram/scenes/write-note.wizard.ts
 * Wizard for writing a note/reply to an application.
 * Supports multilingual responses using the application owner's language.
 */
import { Scenes, Markup } from 'telegraf';
import { teacherCrmService } from '../services/teacher-crm.service';
import { t } from '../i18n/translations';
import { safeAnswerCbQuery, logStep } from '../bot-helpers';
import { logger } from '../../../lib/security/logger';
import type { ProtectedContext, RegistrationWizardState } from '../middlewares/auth.middleware';
import { applicationStore } from '../../applications/store';

export const writeNoteWizard = new Scenes.WizardScene<ProtectedContext>(
  'CRM_WRITE_NOTE',

  // ── Step 0: Ask for note ─────────────────────────────────────────
  async (ctx) => {
    logStep('Note', 0, 'entered', 'asking for note text');

    // Get the user's language from the application being replied to
    const state = ctx.wizard.state as RegistrationWizardState;
    const appId = state.applicationId;
    let lang = 'uz';

    if (appId) {
      const app = applicationStore.getById(appId);
      if (app?.data.language) {
        lang = app.data.language;
      }
    }

    state.language = lang;

    await ctx.reply(
      t(lang, 'note_write_prompt'),
      {
        ...Markup.keyboard(['/cancel']).oneTime().resize(),
        parse_mode: 'HTML',
      }
    ).catch(() => {});
    logStep('Note', 0, 'completed');
    return ctx.wizard.next();
  },

  // ── Step 1: Save note ────────────────────────────────────────────
  async (ctx) => {
    logStep('Note', 1, 'entered');

    if (ctx.message && 'text' in ctx.message) {
      const text = ctx.message.text;

      if (text === '/cancel') {
        logStep('Note', 1, 'completed', 'cancelled by user');
        await ctx.reply(t((ctx.wizard.state as RegistrationWizardState).language || 'uz', 'note_cancelled'), {
          ...Markup.removeKeyboard(),
          parse_mode: 'HTML',
        }).catch(() => {});
        return ctx.scene.leave();
      }

      const state = ctx.wizard.state as RegistrationWizardState;
      const lang = state.language || 'uz';

      logStep('Note', 1, 'completed', `note received (${text.length} chars for app ${state.applicationId})`);

      try {
        await teacherCrmService.addNote(
          state.applicationId ?? '',
          text,
          state.actionUserId ?? ''
        );
        logStep('Note', 1, 'completed', 'note saved');
        await ctx.reply(t(lang, 'note_saved'), {
          ...Markup.removeKeyboard(),
          parse_mode: 'HTML',
        }).catch(() => {});
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
    } else {
      // Non-text message - ask again
      logStep('Note', 1, 'waiting', 'non-text message');
      const wsp = ctx.wizard.state as RegistrationWizardState;
      const lang2 = wsp.language || 'uz';
      await ctx.reply(t(lang2, 'note_non_text')).catch(() => {});
      return; // Stay on same step
    }
  }
);
