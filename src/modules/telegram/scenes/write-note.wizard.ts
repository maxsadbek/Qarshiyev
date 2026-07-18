import { Scenes, Markup } from 'telegraf';
import { teacherCrmService } from '../services/teacher-crm.service';
import type { ProtectedContext } from '../middlewares/auth.middleware';

export const writeNoteWizard = new Scenes.WizardScene<ProtectedContext>(
  'CRM_WRITE_NOTE',
  async (ctx: ProtectedContext) => {
    await ctx.reply('Iltimos, izohingizni matn ko\'rinishida yuboring (Bekor qilish uchun /cancel bosing):',
      Markup.keyboard(['/cancel']).oneTime().resize()
    );
    return ctx.wizard.next();
  },
  async (ctx: ProtectedContext) => {
    if (ctx.message && 'text' in ctx.message) {
      if (ctx.message.text === '/cancel') {
        await ctx.reply('Bekor qilindi.', Markup.removeKeyboard());
        return ctx.scene.leave();
      }

      const note = ctx.message.text;
      const state = ctx.wizard.state;

      try {
        await teacherCrmService.addNote(state.applicationId, note, state.actionUserId);
        await ctx.reply('✅ Izoh muvaffaqiyatli saqlandi.', Markup.removeKeyboard());
      } catch {
        await ctx.reply('❌ Xatolik yuz berdi.', Markup.removeKeyboard());
      }
      return ctx.scene.leave();
    }
    return ctx.wizard.next();
  }
);

