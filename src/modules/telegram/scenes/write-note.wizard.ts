import { Scenes, Markup } from 'telegraf';
import { teacherCrmService } from '../services/teacher-crm.service';
import { t } from '../i18n/translations';
import { logger } from '../../../lib/security/logger';
import type { ProtectedContext, RegistrationWizardState } from '../middlewares/auth.middleware';

export const writeNoteWizard = new Scenes.WizardScene<ProtectedContext>(
  'CRM_WRITE_NOTE',

  // ── Step 0: Ask for note ─────────────────────────────────────────
  async (ctx) => {
    logger.info('[Wizard:Note] Step 0: Asking for note', {
      from: ctx.from?.id,
      state: ctx.wizard.state,
    });
    await ctx.reply(
      t(undefined, 'note_write_prompt'),
      Markup.keyboard(['/cancel']).oneTime().resize()
    );
    return ctx.wizard.next();
  },

  // ── Step 1: Save note ────────────────────────────────────────────
  async (ctx) => {
    logger.info('[Wizard:Note] Step 1: Processing note', { from: ctx.from?.id });

    if (ctx.message && 'text' in ctx.message) {
      if (ctx.message.text === '/cancel') {
        logger.info('[Wizard:Note] Cancelled by user', { from: ctx.from?.id });
        await ctx.reply(t(undefined, 'note_cancelled'), Markup.removeKeyboard());
        return ctx.scene.leave();
      }

      const note = ctx.message.text;
      const state = ctx.wizard.state as RegistrationWizardState;

      logger.info('[Wizard:Note] Note text received', {
        from: ctx.from?.id,
        applicationId: state.applicationId,
        noteLength: note.length,
      });

      try {
        await teacherCrmService.addNote(
          state.applicationId ?? '',
          note,
          state.actionUserId ?? ''
        );
        logger.info('[Wizard:Note] Note saved successfully', {
          from: ctx.from?.id,
          applicationId: state.applicationId,
        });
        await ctx.reply(t(undefined, 'note_saved'), Markup.removeKeyboard());
      } catch (error) {
        logger.error('[Wizard:Note] Failed to save note', {
          error: String(error),
          applicationId: state.applicationId,
        });
        await ctx.reply(t(undefined, 'error_generic'), Markup.removeKeyboard());
      }
      return ctx.scene.leave();
    } else {
      // Not a text message – ask again
      logger.info('[Wizard:Note] Non-text message received', {
        from: ctx.from?.id,
        hasMessage: !!ctx.message,
      });
      await ctx.reply(t(undefined, 'note_non_text')).catch(() => {});
      // NOTE: do NOT call wizard.next() here! Returning without advancing
      // the cursor keeps us on the same step for the next update.
      return;
    }
  }
);
