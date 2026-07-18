import { Scenes, Markup } from 'telegraf';
import { teacherCrmService } from '../services/teacher-crm.service';

interface NoteSession extends Scenes.WizardSessionData {
  applicationId: string;
  actionUserId: string;
}

export interface NoteContext extends Scenes.WizardContext<NoteSession> {
  session: any;
}

export const writeNoteWizard = new Scenes.WizardScene<NoteContext>(
  'CRM_WRITE_NOTE',
  async (ctx) => {
    // Expected that state is passed via enter('CRM_WRITE_NOTE', { applicationId: '...', actionUserId: '...' })
    await ctx.reply('Iltimos, izohingizni matn ko\'rinishida yuboring (Bekor qilish uchun /cancel bosing):',
      Markup.keyboard(['/cancel']).oneTime().resize()
    );
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (ctx.message && 'text' in ctx.message) {
      if (ctx.message.text === '/cancel') {
        await ctx.reply('Bekor qilindi.', Markup.removeKeyboard());
        return ctx.scene.leave();
      }

      const note = ctx.message.text;
      const { applicationId, actionUserId } = ctx.wizard.state;

      try {
        await teacherCrmService.addNote(applicationId, note, actionUserId);
        await ctx.reply('✅ Izoh muvaffaqiyatli saqlandi.', Markup.removeKeyboard());
      } catch (err) {
        await ctx.reply('❌ Xatolik yuz berdi.', Markup.removeKeyboard());
      }
      return ctx.scene.leave();
    }
    return ctx.wizard.next();
  }
);
