import { Telegraf, Scenes } from 'telegraf';
import { sessionMiddleware } from './middlewares/session.middleware';
import { teacherAdminOnly, type ProtectedContext } from './middlewares/auth.middleware';
import { registrationWizard } from './scenes/registration.wizard';
import { writeNoteWizard } from './scenes/write-note.wizard';
import { teacherCrmService } from './services/teacher-crm.service';
import { logger } from '../../lib/security/logger';
import { getEnv } from '../../lib/env';

const env = getEnv();

/**
 * Telegram Bot Initialization
 * Hardened for production with:
 * - Global error handling (bot.catch)
 * - Centralized logging
 * - Auth middleware for CRM actions
 * - Environment validation via getEnv()
 */
const bot = new Telegraf<ProtectedContext>(env.TELEGRAM_BOT_TOKEN!);

// ── Global Error Handling ──────────────────────────────────────────
bot.catch((err, ctx) => {
  logger.error('Telegraf error caught', { 
    error: String(err), 
    updateType: ctx.updateType,
    from: ctx.from?.id 
  });
});

// ── Register Middleware ─────────────────────────────────────────────
bot.use(sessionMiddleware());

// ── Register Scenes ────────────────────────────────────────────────
const stage = new Scenes.Stage<ProtectedContext>([registrationWizard, writeNoteWizard]);
bot.use(stage.middleware());

// ── Commands ───────────────────────────────────────────────────────
bot.start((ctx) => {
  logger.info('Bot started', { from: ctx.from?.id });
  ctx.scene.enter('REGISTRATION_WIZARD');
});

// ── CRM ACTION HANDLERS (ROLE PERMISSIONS) ─────────────────────────

// Use the middleware to protect all CRM_* actions
bot.action(/CRM_ACCEPT_(.+)/, teacherAdminOnly(), async (ctx) => {
  const appId = ctx.match[1];
  const user = ctx.user;

  try {
    await teacherCrmService.updateStatus(appId, 'APPROVED', user.id);
    await ctx.editMessageText((ctx.callbackQuery.message as any)?.text + '\n\n✅ Holat: QABUL QILINDI');
    await ctx.answerCbQuery('Qabul qilindi');
    logger.info('Application approved via Bot', { appId, by: user.id });
  } catch (error) {
    logger.error('Failed to approve application', { appId, error: String(error) });
    await ctx.answerCbQuery('❌ Xatolik yuz berdi');
  }
});

bot.action(/CRM_REJECT_(.+)/, teacherAdminOnly(), async (ctx) => {
  const appId = ctx.match[1];
  const user = ctx.user;

  try {
    await teacherCrmService.updateStatus(appId, 'REJECTED', user.id);
    await ctx.editMessageText((ctx.callbackQuery.message as any)?.text + '\n\n❌ Holat: RAD ETILDI');
    await ctx.answerCbQuery('Rad etildi');
    logger.info('Application rejected via Bot', { appId, by: user.id });
  } catch (error) {
    logger.error('Failed to reject application', { appId, error: String(error) });
    await ctx.answerCbQuery('❌ Xatolik yuz berdi');
  }
});

bot.action(/CRM_PENDING_(.+)/, teacherAdminOnly(), async (ctx) => {
  const appId = ctx.match[1];
  const user = ctx.user;

  try {
    await teacherCrmService.updateStatus(appId, 'PENDING', user.id);
    await ctx.editMessageText((ctx.callbackQuery.message as any)?.text + '\n\n⏳ Holat: KUTTIRISHGA OLINDI');
    await ctx.answerCbQuery('Kuttirishga olindi');
  } catch (error) {
    logger.error('Failed to set application to pending', { appId, error: String(error) });
    await ctx.answerCbQuery('❌ Xatolik yuz berdi');
  }
});

bot.action(/CRM_NOTE_(.+)/, teacherAdminOnly(), async (ctx) => {
  const appId = ctx.match[1];
  const user = ctx.user;

  await ctx.answerCbQuery();
  await ctx.scene.enter('CRM_WRITE_NOTE', { applicationId: appId, actionUserId: user.id });
});

bot.action(/CRM_PROFILE_(.+)/, teacherAdminOnly(), async (ctx) => {
  const studentId = ctx.match[1];
  
  try {
    const profileText = await teacherCrmService.getStudentProfileText(studentId);
    await ctx.reply(profileText, { parse_mode: 'HTML' });
    await ctx.answerCbQuery();
  } catch (error) {
    logger.error('Failed to fetch student profile', { studentId, error: String(error) });
    await ctx.answerCbQuery('❌ Profilni yuklab bo\'lmadi');
  }
});

export default bot;


