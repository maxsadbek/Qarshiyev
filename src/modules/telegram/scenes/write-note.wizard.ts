import { Scenes, Markup } from 'telegraf';
import { teacherCrmService } from '../services/teacher-crm.service';
import { t } from '../i18n/translations';
import { logger } from '../../../lib/security/logger';
import type { ProtectedContext, RegistrationWizardState } from '../middlewares/auth.middleware';

// ── Debug logger ───────────────────────────────────────────────
function logStep(step: number, action: 'entered' | 'completed' | 'waiting', detail?: string) {
  const msg = `[Wizard:Note] Step ${step} ${action}` + (detail ? ` — ${detail}` : '');
  logger.info(msg, { step, action, detail });
}

export const writeNoteWizard = new Scenes.WizardScene<ProtectedContext>(
  'CRM_WRITE_NOTE',

  // ── Step 0: Ask for note ─────────────────────────────────────────
  async (ctx) => {
    logStep(0, 'entered', 'asking for note text');
    await ctx.reply(
      t(undefined, 'note_write_prompt'),
      Markup.keyboard(['/cancel']).oneTime().resize()
    );
    logStep(0, 'completed', 'moving to step 1');
    return ctx.wizard.next();
  },

  // ── Step 1: Save note ────────────────────────────────────────────
  async (ctx) => {
    logStep(1, 'entered', ctx.message && 'text' in ctx.message ? 'has text' : 'no text');

    if (ctx.message && 'text' in ctx.message) {
      if (ctx.message.text === '/cancel') {
        logStep(1, 'completed', 'cancelled by user');
        await ctx.reply(t(undefined, 'note_cancelled'), Markup.removeKeyboard());
        logStep(1, 'completed', 'leaving scene');
        return ctx.scene.leave();
      }

      const note = ctx.message.text;
      const state = ctx.wizard.state as RegistrationWizardState;

      logStep(1, 'completed', `note received (${note.length} chars for app ${state.applicationId})`);

      try {
        await teacherCrmService.addNote(
          state.applicationId ?? '',
          note,
          state.actionUserId ?? ''
        );
        logStep(1, 'completed', 'note saved successfully');
        await ctx.reply(t(undefined, 'note_saved'), Markup.removeKeyboard());
      } catch (error) {
        logger.error('[Wizard:Note] Failed to save note', {
          error: String(error),
          applicationId: state.applicationId,
        });
        await ctx.reply(t(undefined, 'error_generic'), Markup.removeKeyboard());
      }
      logStep(1, 'completed', 'leaving scene after save');
      return ctx.scene.leave();
    } else {
      // Not a text message – ask again
      logStep(1, 'waiting', 'non-text message — prompting again');
      await ctx.reply(t(undefined, 'note_non_text')).catch(() => {});
      // NOTE: do NOT call wizard.next() here! Returning without advancing
      // the cursor keeps us on the same step for the next update.
      return;
    }
  }
);
