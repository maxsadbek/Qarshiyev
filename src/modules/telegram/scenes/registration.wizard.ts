import { Scenes, Markup } from 'telegraf';
import { telegramService } from '../telegram.service';
import { teacherCrmService } from '../services/teacher-crm.service';
import { t } from '../i18n/translations';
import { logger } from '../../../lib/security/logger';
import type { ProtectedContext, RegistrationWizardState } from '../middlewares/auth.middleware';

// ── Safe answerCbQuery helper ──────────────────────────────────
// Prevents "answerCbQuery isn't available for message" TypeError.
// Telegraf throws this error synchronously if ctx.callbackQuery
// is falsy, so we MUST check before calling.
async function safeAnswerCbQuery(ctx: ProtectedContext, text?: string): Promise<void> {
  if (ctx.callbackQuery) {
    try {
      await ctx.answerCbQuery(text);
    } catch {
      // Silently ignore – callback might have been answered already
    }
  }
}

// ── Promise timeout helper ─────────────────────────────────────
// Prevents Prisma / external calls from freezing the bot.
// Clears the timer on completion to avoid UnhandledPromiseRejection.
function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`[Timeout] ${label} exceeded ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timer!));
}

// ── Debug logger ───────────────────────────────────────────────
const DEBUG = true;
function debug(...args: unknown[]) {
  if (DEBUG) console.log('[Wizard:DEBUG]', ...args);
}

function logStep(step: number, action: 'entered' | 'completed' | 'waiting', detail?: string) {
  const msg = `[Wizard] Step ${step} ${action}` + (detail ? ` — ${detail}` : '');
  debug(msg);
  logger.info(msg, { step, action, detail });
}

export const registrationWizard = new Scenes.WizardScene<ProtectedContext>(
  'REGISTRATION_WIZARD',

  // ── Step 0: Language Selection ────────────────────────────────────
  async (ctx) => {
    logStep(0, 'entered', 'sending language buttons');
    await ctx.reply(
      t(undefined, 'language_select'),
      Markup.inlineKeyboard([
        Markup.button.callback('🇺🇿 O\'zbekcha', 'LANG_UZ'),
        Markup.button.callback('🇷🇺 Русский', 'LANG_RU'),
        Markup.button.callback('🇬🇧 English', 'LANG_EN'),
      ])
    );
    logStep(0, 'completed', 'moving to step 1');
    return ctx.wizard.next();
  },

  // ── Step 1: Phone Number ──────────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const hasCallback = !!(ctx.callbackQuery && 'data' in ctx.callbackQuery);
    logStep(1, 'entered', hasCallback ? `callback: ${ctx.callbackQuery!.data}` : 'no callback');

    // Handle language selection callback
    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const lang = ctx.callbackQuery.data;
      if (lang === 'LANG_UZ' || lang === 'LANG_RU' || lang === 'LANG_EN') {
        state.language = lang === 'LANG_UZ' ? 'uz' : lang === 'LANG_RU' ? 'ru' : 'en';
        await safeAnswerCbQuery(ctx);
        logStep(1, 'completed', `Language selected: ${state.language}`);
      } else {
        // Unknown callback – still answer it
        await safeAnswerCbQuery(ctx);
        logStep(1, 'waiting', 'unknown callback: ' + lang);
      }
    }

    const lang = state.language;

    await ctx.reply(
      t(lang, 'contact_request'),
      Markup.keyboard([
        Markup.button.contactRequest(t(lang, 'contact_button'))
      ]).oneTime().resize()
    );

    logStep(1, 'waiting', 'Waiting for phone number — moving to step 2');
    return ctx.wizard.next();
  },

  // ── Step 2: Phone → Region Selection ──────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const updateType = ctx.updateType;
    const hasMessage = !!ctx.message;
    const hasContact = !!(ctx.message && 'contact' in ctx.message && ctx.message.contact);
    const hasText = !!(ctx.message && 'text' in ctx.message && ctx.message.text);
    logStep(2, 'entered', `${updateType} | contact=${hasContact} text=${hasText}`);

    const lang = state.language;

    // Handle phone contact
    if (ctx.message && 'contact' in ctx.message && ctx.message.contact) {
      state.phone = ctx.message.contact.phone_number;
      logStep(2, 'completed', `Phone received via contact: ${state.phone?.slice(0, 6)}***`);
    } else if (ctx.message && 'text' in ctx.message && ctx.message.text) {
      // Allow manual text entry as fallback
      const phone = ctx.message.text.trim();
      if (/^[\d\+\-\(\)\s]{7,20}$/.test(phone)) {
        state.phone = phone;
        logStep(2, 'completed', `Phone received via text: ${phone.slice(0, 6)}***`);
      } else {
        logStep(2, 'waiting', 'invalid phone text');
        await ctx.reply(t(lang, 'contact_request_hint')).catch(() => {});
        return; // Stay on this step
      }
    }

    if (!state.phone) {
      logStep(2, 'waiting', 'no phone received');
      await ctx.reply(t(lang, 'contact_request_simple')).catch(() => {});
      return; // Stay on this step
    }

    logStep(2, 'completed', 'Phone collected — fetching regions');

    try {
      const regions = await withTimeout(
        telegramService.getRegions(),
        10000,
        'getRegions'
      );
      logStep(2, 'completed', `Regions fetched: ${regions.length} available`);

      if (regions.length === 0) {
        logStep(2, 'completed', 'No regions available — leaving scene');
        await ctx.reply(t(lang, 'no_regions')).catch(() => {});
        return ctx.scene.leave();
      }

      logStep(2, 'completed', 'Sending region buttons');
      await ctx.reply(
        t(lang, 'select_region'),
        Markup.inlineKeyboard(
          regions.map((r: { id: string; name: string }) => [
            Markup.button.callback(r.name, `REGION_${r.id}`)
          ])
        )
      ).catch((error: unknown) => {
        logger.error('[Wizard] Failed to send region reply', { error: String(error) });
      });

      logStep(2, 'completed', 'Waiting for region — moving to step 3');
      return ctx.wizard.next();
    } catch (error) {
      logger.error('[Wizard] Failed to fetch regions', { error: String(error) });
      await ctx.reply(t(lang, 'error_try_later')).catch(() => {});
      return ctx.scene.leave();
    }
  },

  // ── Step 3: Region → District Selection ───────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const hasCallback = !!(ctx.callbackQuery && 'data' in ctx.callbackQuery);
    logStep(3, 'entered', hasCallback ? `callback: ${ctx.callbackQuery!.data}` : 'no callback');

    const lang = state.language;

    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const data = ctx.callbackQuery.data;
      if (data.startsWith('REGION_')) {
        state.regionId = data.replace('REGION_', '');
        await safeAnswerCbQuery(ctx);
        logStep(3, 'completed', `Region selected: ${state.regionId}`);
      } else {
        await safeAnswerCbQuery(ctx);
        logStep(3, 'waiting', `unexpected callback: ${data}`);
      }
    }

    if (!state.regionId) {
      logStep(3, 'waiting', 'no regionId — staying on step');
      await safeAnswerCbQuery(ctx);
      return; // Stay on this step
    }

    try {
      const districts = await withTimeout(
        telegramService.getDistricts(state.regionId),
        10000,
        'getDistricts'
      );
      logStep(3, 'completed', `Districts fetched: ${districts.length}`);

      if (districts.length === 0) {
        logStep(3, 'completed', 'No districts — going back to step 2');
        await ctx.reply(t(lang, 'no_districts')).catch(() => {});
        return ctx.wizard.back();
      }

      logStep(3, 'completed', 'Sending district buttons');
      await ctx.reply(
        t(lang, 'select_district'),
        Markup.inlineKeyboard(
          districts.map((d: { id: string; name: string }) => [
            Markup.button.callback(d.name, `DISTRICT_${d.id}`)
          ])
        )
      );
      logStep(3, 'completed', 'Waiting for district — moving to step 4');
      return ctx.wizard.next();
    } catch (error) {
      logger.error('[Wizard] Failed to fetch districts', { error: String(error) });
      await ctx.reply(t(lang, 'error_generic')).catch(() => {});
      return ctx.scene.leave();
    }
  },

  // ── Step 4: District → Course Selection ───────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const hasCallback = !!(ctx.callbackQuery && 'data' in ctx.callbackQuery);
    logStep(4, 'entered', hasCallback ? `callback: ${ctx.callbackQuery!.data}` : 'no callback');

    const lang = state.language;

    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const data = ctx.callbackQuery.data;
      if (data.startsWith('DISTRICT_')) {
        state.districtId = data.replace('DISTRICT_', '');
        await safeAnswerCbQuery(ctx);
        logStep(4, 'completed', `District selected: ${state.districtId}`);
      } else {
        await safeAnswerCbQuery(ctx);
        logStep(4, 'waiting', `unexpected callback: ${data}`);
      }
    }

    if (!state.districtId) {
      logStep(4, 'waiting', 'no districtId — staying on step');
      await safeAnswerCbQuery(ctx);
      return; // Stay on this step
    }

    try {
      const courses = await withTimeout(
        telegramService.getActiveCourses(),
        10000,
        'getActiveCourses'
      );
      logStep(4, 'completed', `Courses fetched: ${courses.length}`);

      if (courses.length === 0) {
        logStep(4, 'completed', 'No courses — leaving scene');
        await ctx.reply(t(lang, 'no_courses')).catch(() => {});
        return ctx.scene.leave();
      }

      logStep(4, 'completed', 'Sending course buttons');
      await ctx.reply(
        t(lang, 'select_course'),
        Markup.inlineKeyboard(
          courses.map((c: { id: string; title: string }) => [
            Markup.button.callback(c.title, `COURSE_${c.id}`)
          ])
        )
      );
      logStep(4, 'completed', 'Waiting for course — moving to step 5');
      return ctx.wizard.next();
    } catch (error) {
      logger.error('[Wizard] Failed to fetch courses', { error: String(error) });
      await ctx.reply(t(lang, 'error_generic')).catch(() => {});
      return ctx.scene.leave();
    }
  },

  // ── Step 5: Course → Shift Selection ──────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const hasCallback = !!(ctx.callbackQuery && 'data' in ctx.callbackQuery);
    logStep(5, 'entered', hasCallback ? `callback: ${ctx.callbackQuery!.data}` : 'no callback');

    const lang = state.language;

    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const data = ctx.callbackQuery.data;
      if (data.startsWith('COURSE_')) {
        state.courseId = data.replace('COURSE_', '');
        await safeAnswerCbQuery(ctx);
        logStep(5, 'completed', `Course selected: ${state.courseId}`);
      } else {
        await safeAnswerCbQuery(ctx);
        logStep(5, 'waiting', `unexpected callback: ${data}`);
      }
    }

    if (!state.courseId) {
      logStep(5, 'waiting', 'no courseId — staying on step');
      await safeAnswerCbQuery(ctx);
      return; // Stay on this step
    }

    logStep(5, 'completed', 'Sending shift buttons');
    await ctx.reply(
      t(lang, 'select_shift'),
      Markup.inlineKeyboard([
        [Markup.button.callback(t(lang, 'shift_morning'), 'SHIFT_Morning')],
        [Markup.button.callback(t(lang, 'shift_afternoon'), 'SHIFT_Afternoon')],
        [Markup.button.callback(t(lang, 'shift_evening'), 'SHIFT_Evening')],
      ])
    );
    logStep(5, 'completed', 'Waiting for shift — moving to step 6');
    return ctx.wizard.next();
  },

  // ── Step 6: Shift → Age ───────────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const hasCallback = !!(ctx.callbackQuery && 'data' in ctx.callbackQuery);
    logStep(6, 'entered', hasCallback ? `callback: ${ctx.callbackQuery!.data}` : 'no callback');

    const lang = state.language;

    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const data = ctx.callbackQuery.data;
      if (data.startsWith('SHIFT_')) {
        state.shift = data.replace('SHIFT_', '');
        await safeAnswerCbQuery(ctx);
        logStep(6, 'completed', `Shift selected: ${state.shift}`);
      } else {
        await safeAnswerCbQuery(ctx);
        logStep(6, 'waiting', `unexpected callback: ${data}`);
      }
    }

    if (!state.shift) {
      logStep(6, 'waiting', 'no shift selected — staying on step');
      await safeAnswerCbQuery(ctx);
      return;
    }

    logStep(6, 'completed', 'Sending age prompt');
    await ctx.reply(t(lang, 'age_prompt'));
    logStep(6, 'completed', 'Waiting for age — moving to step 7');
    return ctx.wizard.next();
  },

  // ── Step 7: Age → Experience ──────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const hasText = !!(ctx.message && 'text' in ctx.message && ctx.message.text);
    logStep(7, 'entered', hasText ? `text: ${ctx.message!.text!.slice(0, 20)}` : 'no text');

    const lang = state.language;

    if (ctx.message && 'text' in ctx.message) {
      const age = parseInt(ctx.message.text.trim());
      if (isNaN(age) || age < 5 || age > 99) {
        logStep(7, 'waiting', 'invalid age input');
        await ctx.reply(t(lang, 'invalid_age')).catch(() => {});
        return; // Stay on this step
      }
      state.age = age;
      logStep(7, 'completed', `Age received: ${age}`);
    } else {
      logStep(7, 'waiting', 'no text message — waiting');
      return; // Wait for text input
    }

    await ctx.reply(t(lang, 'experience_prompt')).catch(() => {});
    logStep(7, 'completed', 'Waiting for experience — moving to step 8');
    return ctx.wizard.next();
  },

  // ── Step 8: Experience → Device (laptop) ──────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const hasText = !!(ctx.message && 'text' in ctx.message && ctx.message.text);
    logStep(8, 'entered', hasText ? `text: ${ctx.message!.text!.slice(0, 30)}` : 'no text');

    const lang = state.language;

    if (ctx.message && 'text' in ctx.message) {
      state.experience = ctx.message.text;
      logStep(8, 'completed', `Experience received: ${state.experience.slice(0, 50)}`);
    } else {
      logStep(8, 'waiting', 'no text — experience stays as-is');
    }

    logStep(8, 'completed', 'Sending device buttons');
    await ctx.reply(
      t(lang, 'device_prompt'),
      Markup.inlineKeyboard([
        [Markup.button.callback('✅ ' + t(lang, 'device_yes'), 'DEVICE_YES')],
        [Markup.button.callback('❌ ' + t(lang, 'device_no'), 'DEVICE_NO')],
      ])
    );
    logStep(8, 'completed', 'Waiting for device — moving to step 9');
    return ctx.wizard.next();
  },

  // ── Step 9: Device → Note ─────────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const hasCallback = !!(ctx.callbackQuery && 'data' in ctx.callbackQuery);
    logStep(9, 'entered', hasCallback ? `callback: ${ctx.callbackQuery!.data}` : 'no callback');

    const lang = state.language;

    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const data = ctx.callbackQuery.data;
      if (data === 'DEVICE_YES' || data === 'DEVICE_NO') {
        state.device = data === 'DEVICE_YES' ? 'yes' : 'no';
        await safeAnswerCbQuery(ctx);
        logStep(9, 'completed', `Device answer: ${state.device}`);
      } else {
        await safeAnswerCbQuery(ctx);
        logStep(9, 'waiting', `unexpected callback: ${data}`);
      }
    }

    if (!state.device) {
      logStep(9, 'waiting', 'no device answer — staying on step');
      await safeAnswerCbQuery(ctx);
      return;
    }

    logStep(9, 'completed', 'Sending note prompt');
    await ctx.reply(t(lang, 'note_prompt')).catch(() => {});
    logStep(9, 'completed', 'Waiting for note — moving to step 10');
    return ctx.wizard.next();
  },

  // ── Step 10: Note → Confirmation ──────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const hasText = !!(ctx.message && 'text' in ctx.message && ctx.message.text);
    logStep(10, 'entered', hasText ? `text: ${ctx.message!.text!.slice(0, 20)}` : 'no text');

    const lang = state.language;

    if (ctx.message && 'text' in ctx.message) {
      state.note = ctx.message.text;
      logStep(10, 'completed', `Note received: ${state.note.slice(0, 50)}`);
    } else {
      logStep(10, 'waiting', 'no text (may be button press)');
    }

    // Translate device value for display
    const deviceLabel = state.device === 'yes' ? t(lang, 'device_yes_short') : t(lang, 'device_no_short');

    const summary = `
📝 <b>${t(lang, 'confirm_title')}</b>

${t(lang, 'label_phone')}: ${state.phone}
${t(lang, 'label_shift')}: ${state.shift}
${t(lang, 'label_age')}: ${state.age}
${t(lang, 'label_experience')}: ${state.experience}
${t(lang, 'label_laptop')}: ${deviceLabel}
${t(lang, 'label_note')}: ${state.note || '-'}

${t(lang, 'confirm_question')}
    `;

    logStep(10, 'completed', 'Sending confirmation message');
    await ctx.reply(summary, {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [Markup.button.callback(t(lang, 'confirm_button'), 'CONFIRM')],
        [Markup.button.callback(t(lang, 'cancel_button'), 'CANCEL')],
      ])
    });

    logStep(10, 'completed', 'Waiting for confirmation — moving to step 11');
    return ctx.wizard.next();
  },

  // ── Step 11: Final Processing ─────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const hasCallback = !!(ctx.callbackQuery && 'data' in ctx.callbackQuery);
    const hasText = !!(ctx.message && 'text' in ctx.message && ctx.message.text);
    logStep(11, 'entered', hasCallback ? `callback: ${ctx.callbackQuery!.data}` : hasText ? `text: ${ctx.message!.text!.slice(0, 20)}` : 'no input');

    const lang = state.language;

    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const action = ctx.callbackQuery.data;
      await safeAnswerCbQuery(ctx);
      logStep(11, 'completed', `action: ${action}`);

      if (action === 'CANCEL') {
        logStep(11, 'completed', 'Registration cancelled by user');
        await ctx.reply(t(lang, 'cancel_done')).catch(() => {});
        logStep(11, 'completed', 'Leaving scene after cancel');
        return ctx.scene.leave();
      }

      if (action === 'CONFIRM') {
        logStep(11, 'completed', 'Processing confirmation...');

        try {
          // Wrap the full registration & notification in a timeout so the
          // bot never freezes if Prisma / network is slow.
          logStep(11, 'completed', 'Calling completeRegistration...');
          const application = await withTimeout(
            telegramService.completeRegistration({
              telegramId: ctx.from?.id.toString() || '',
              firstName: ctx.from?.first_name || t(lang, 'first_name_fallback'),
              lastName: ctx.from?.last_name || t(lang, 'last_name_fallback'),
              phone: state.phone ?? '',
              districtId: state.districtId ?? '',
              courseId: state.courseId ?? '',
              shift: state.shift ?? '',
              age: Number(state.age ?? 0),
              experience: state.experience ?? '',
              device: state.device ?? '',
              note: state.note ?? '',
            }),
            15000,
            'completeRegistration'
          );

          logStep(11, 'completed', `Application created: ${application.id}`);

          // Notify teacher — wrapped in try/catch so a notification failure
          // never prevents the user from receiving their success message.
          try {
            logStep(11, 'completed', 'Notifying teacher...');
            await withTimeout(
              teacherCrmService.notifyTeacher(
                application.id,
                {
                  telegramId: ctx.from?.id.toString() || '',
                  firstName: ctx.from?.first_name || t(lang, 'first_name_fallback'),
                  lastName: ctx.from?.last_name || t(lang, 'last_name_fallback'),
                  phone: state.phone ?? '',
                  districtId: state.districtId ?? '',
                  courseId: state.courseId ?? '',
                  shift: state.shift ?? '',
                  age: Number(state.age ?? 0),
                  experience: state.experience ?? '',
                  device: state.device ?? '',
                  note: state.note ?? '',
                },
                {
                  firstName: ctx.from?.first_name || t(lang, 'first_name_fallback'),
                  lastName: ctx.from?.last_name || t(lang, 'last_name_fallback'),
                  username: ctx.from?.username,
                  telegramId: String(ctx.from?.id ?? ''),
                },
                state.regionId
              ),
              15000,
              'notifyTeacher'
            );
            logStep(11, 'completed', 'Teacher notified successfully');
          } catch (error: unknown) {
            // Log but DO NOT re-throw — the user still gets success
            const fullError =
              error instanceof Object
                ? JSON.stringify(error, Object.getOwnPropertyNames(error))
                : String(error);
            logger.error('[Wizard] Failed to notify teacher (non-fatal)', {
              error: fullError,
              applicationId: application.id,
            });
            logStep(11, 'completed', 'Teacher notification failed (non-fatal)');
          }

          logStep(11, 'completed', 'Sending success message to user');
          await ctx.reply(t(lang, 'success_message')).catch(() => {});
        } catch (error: unknown) {
          const isDuplicate =
            error instanceof Error && error.message === 'DUPLICATE_APPLICATION';
          const isTimeout =
            error instanceof Error && error.message.includes('[Timeout]');

          logStep(11, 'completed', `Registration failed — isDuplicate=${isDuplicate} isTimeout=${isTimeout}`);
          logger.error('[Wizard] Registration failed', {
            error: String(error),
            from: ctx.from?.id,
            isDuplicate,
            isTimeout,
          });

          if (isDuplicate) {
            await ctx.reply(t(lang, 'duplicate_application')).catch(() => {});
          } else if (isTimeout) {
            await ctx.reply(t(lang, 'error_try_later')).catch(() => {});
          } else {
            await ctx.reply(t(lang, 'error_try_later_short')).catch(() => {});
          }
        }
        logStep(11, 'completed', 'Leaving scene after processing');
        return ctx.scene.leave();
      }

      // Unknown callback – log but ignore
      logStep(11, 'waiting', `Unknown action: ${action}`);
      logger.warn('[Wizard] Unknown confirmation action', { action, from: ctx.from?.id });
    } else if (ctx.message && 'text' in ctx.message) {
      // User sent text instead of clicking confirmation buttons
      logStep(11, 'waiting', 'Text instead of confirmation — re-sending buttons');
      await ctx.reply(
        t(lang, 'please_use_buttons'),
        Markup.inlineKeyboard([
          [Markup.button.callback(t(lang, 'confirm_button'), 'CONFIRM')],
          [Markup.button.callback(t(lang, 'cancel_button'), 'CANCEL')],
        ])
      ).catch(() => {});
    }
  }
);
