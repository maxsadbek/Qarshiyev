/**
 * src/modules/telegram/scenes/registration.wizard.ts
 * Multi-step registration wizard for the education center Telegram bot.
 *
 * Steps:
 *   0: Language Selection
 *   1: Phone Number (contact or manual)
 *   2: Region Selection
 *   3: District Selection
 *   4: Course Selection
 *   5: Shift Selection
 *   6: Age Input
 *   7: Experience Input
 *   8: Device (laptop) Selection
 *   9: Note Input
 *  10: Confirmation
 *  11: Final Submission
 *
 * Features:
 *   - Back/Cancel buttons at every step
 *   - State persistence across scene transitions
 *   - Duplicate submission prevention
 *   - Proper callback dedup and rate limiting
 *   - Full multilingual support (UZ, RU, EN)
 */
import { Scenes, Markup } from 'telegraf';
import { telegramService } from '../telegram.service';
import { teacherCrmService } from '../services/teacher-crm.service';
import { t } from '../i18n/translations';
import { safeAnswerCbQuery, withTimeout, logStep } from '../bot-helpers';
import { logger } from '../../../lib/security/logger';
import type { ProtectedContext, RegistrationWizardState } from '../middlewares/auth.middleware';
import { applicationStore } from '../../applications/store';

// ── Constants ────────────────────────────────────────────────────────
const STEPS = {
  LANGUAGE: 0,
  PHONE: 1,
  REGION: 2,
  DISTRICT: 3,
  COURSE: 4,
  SHIFT: 5,
  AGE: 6,
  EXPERIENCE: 7,
  DEVICE: 8,
  NOTE: 9,
  CONFIRM: 10,
  SUBMIT: 11,
} as const;

export const registrationWizard = new Scenes.WizardScene<ProtectedContext>(
  'REGISTRATION_WIZARD',

  // ════════════════════════════════════════════════════════════════════
  // Step 0: Language Selection
  // ════════════════════════════════════════════════════════════════════
  async (ctx) => {
    logStep('Registration', STEPS.LANGUAGE, 'entered');
    await ctx.reply(
      t(undefined, 'language_select'),
      Markup.inlineKeyboard([
        Markup.button.callback('🇺🇿 O\'zbekcha', 'LANG_UZ'),
        Markup.button.callback('🇷🇺 Русский', 'LANG_RU'),
        Markup.button.callback('🇬🇧 English', 'LANG_EN'),
      ])
    ).catch(() => {});
    logStep('Registration', STEPS.LANGUAGE, 'completed');
    return ctx.wizard.next();
  },

  // ════════════════════════════════════════════════════════════════════
  // Step 1: Phone Number
  // ════════════════════════════════════════════════════════════════════
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const lang = state.language || 'uz';
    logStep('Registration', STEPS.PHONE, 'entered', `lang=${lang}`);

    // Handle language selection callback
    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const langCode = ctx.callbackQuery.data;
      if (langCode === 'LANG_UZ' || langCode === 'LANG_RU' || langCode === 'LANG_EN') {
        state.language = langCode === 'LANG_UZ' ? 'uz' : langCode === 'LANG_RU' ? 'ru' : 'en';
        await safeAnswerCbQuery(ctx);
        logStep('Registration', STEPS.PHONE, 'completed', `Language: ${state.language}`);
      } else {
        await safeAnswerCbQuery(ctx);
        logStep('Registration', STEPS.PHONE, 'waiting', `unexpected: ${langCode}`);
      }
    }

    // Save Telegram user info into state
    if (ctx.from) {
      state.firstName = ctx.from.first_name || t(lang, 'first_name_fallback');
      state.lastName = ctx.from.last_name || t(lang, 'last_name_fallback');
      state.telegramId = String(ctx.from.id);
      state.username = ctx.from.username;
    }

    await ctx.reply(
      t(state.language || 'uz', 'contact_request'),
      {
        ...Markup.keyboard([
          Markup.button.contactRequest(t(state.language || 'uz', 'contact_button'))
        ]).oneTime().resize(),
        parse_mode: 'HTML',
      }
    ).catch(() => {});

    logStep('Registration', STEPS.PHONE, 'completed');
    return ctx.wizard.next();
  },

  // ════════════════════════════════════════════════════════════════════
  // Step 2: Phone → Region Selection
  // ════════════════════════════════════════════════════════════════════
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const lang = state.language || 'uz';
    const hasContact = !!(ctx.message && 'contact' in ctx.message && ctx.message.contact);
    const hasText = !!(ctx.message && 'text' in ctx.message && ctx.message.text);

    logStep('Registration', STEPS.REGION, 'entered', `contact=${hasContact} text=${hasText}`);

    // Handle phone via contact
    if (hasContact) {
      state.phone = ctx.message!.contact!.phone_number;
      logStep('Registration', STEPS.REGION, 'completed', 'Phone via contact');
    }
    // Handle phone via manual text
    else if (hasText) {
      const phone = ctx.message!.text!.trim();
      if (/^[\d\+\-\(\)\s]{7,20}$/.test(phone)) {
        state.phone = phone;
        logStep('Registration', STEPS.REGION, 'completed', 'Phone via text');
      } else {
        logStep('Registration', STEPS.REGION, 'waiting', 'invalid phone');
        await ctx.reply(t(lang, 'contact_request_hint')).catch(() => {});
        return;
      }
    }

    if (!state.phone) {
      logStep('Registration', STEPS.REGION, 'waiting', 'no phone');
      await ctx.reply(t(lang, 'contact_request_simple')).catch(() => {});
      return;
    }

    // Remove keyboard after phone received
    try {
      await ctx.reply('\u200B', { ...Markup.removeKeyboard(), parse_mode: 'HTML' });
    } catch { /* ignore */ }

    logStep('Registration', STEPS.REGION, 'completed', 'Fetching regions');
    try {
      const regions = await withTimeout(telegramService.getRegions(), 10000, 'getRegions');
      logStep('Registration', STEPS.REGION, 'completed', `${regions.length} regions`);

      if (regions.length === 0) {
        await ctx.reply(t(lang, 'no_regions')).catch(() => {});
        return ctx.scene.leave();
      }

      await ctx.reply(
        t(lang, 'select_region'),
        {
          ...Markup.inlineKeyboard([
            ...regions.map((r: { id: string; name: string }) => [
              Markup.button.callback(r.name, `REGION_${r.id}`)
            ]),
            [Markup.button.callback('❌ ' + t(lang, 'cancel_button'), 'CANCEL_ALL')],
          ]),
          parse_mode: 'HTML',
        }
      ).catch(() => {});

      logStep('Registration', STEPS.REGION, 'completed');
      return ctx.wizard.next();
    } catch (error) {
      logger.error('[Wizard] Failed to fetch regions', { error: String(error) });
      await ctx.reply(t(lang, 'error_try_later')).catch(() => {});
      return ctx.scene.leave();
    }
  },

  // ════════════════════════════════════════════════════════════════════
  // Step 3: Region → District
  // ════════════════════════════════════════════════════════════════════
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const lang = state.language || 'uz';

    logStep('Registration', STEPS.DISTRICT, 'entered');

    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const data = ctx.callbackQuery.data;
      await safeAnswerCbQuery(ctx);

      if (data === 'CANCEL_ALL') {
        await ctx.reply(t(lang, 'cancel_done'), {
          ...Markup.removeKeyboard(),
          parse_mode: 'HTML',
        }).catch(() => {});
        logStep('Registration', STEPS.DISTRICT, 'completed', 'cancelled');
        return ctx.scene.leave();
      }

      if (data.startsWith('REGION_')) {
        state.regionId = data.replace('REGION_', '');
        logStep('Registration', STEPS.DISTRICT, 'completed', `Region: ${state.regionId}`);
      }
    }

    if (!state.regionId) {
      logStep('Registration', STEPS.DISTRICT, 'waiting', 'no region');
      await safeAnswerCbQuery(ctx);
      return;
    }

    try {
      const districts = await withTimeout(
        telegramService.getDistricts(state.regionId),
        10000,
        'getDistricts'
      );
      logStep('Registration', STEPS.DISTRICT, 'completed', `${districts.length} districts`);

      if (districts.length === 0) {
        await ctx.reply(t(lang, 'no_districts')).catch(() => {});
        return ctx.wizard.back();
      }

      await ctx.reply(
        t(lang, 'select_district'),
        {
          ...Markup.inlineKeyboard([
            ...districts.map((d: { id: string; name: string }) => [
              Markup.button.callback(d.name, `DISTRICT_${d.id}`)
            ]),
            [Markup.button.callback('🔙 ' + t(lang, 'cancel_button'), 'BACK_TO_REGION')],
          ]),
          parse_mode: 'HTML',
        }
      ).catch(() => {});

      logStep('Registration', STEPS.DISTRICT, 'completed');
      return ctx.wizard.next();
    } catch (error) {
      logger.error('[Wizard] Failed to fetch districts', { error: String(error) });
      await ctx.reply(t(lang, 'error_generic')).catch(() => {});
      return ctx.scene.leave();
    }
  },

  // ════════════════════════════════════════════════════════════════════
  // Step 4: District → Course
  // ════════════════════════════════════════════════════════════════════
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const lang = state.language || 'uz';

    logStep('Registration', STEPS.COURSE, 'entered');

    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const data = ctx.callbackQuery.data;
      await safeAnswerCbQuery(ctx);

      if (data === 'BACK_TO_REGION') {
        state.regionId = undefined;
        return ctx.wizard.back();
      }

      if (data.startsWith('DISTRICT_')) {
        state.districtId = data.replace('DISTRICT_', '');
        logStep('Registration', STEPS.COURSE, 'completed', `District: ${state.districtId}`);
      }
    }

    if (!state.districtId) {
      logStep('Registration', STEPS.COURSE, 'waiting', 'no district');
      return;
    }

    try {
      const courses = await withTimeout(
        telegramService.getActiveCourses(),
        10000,
        'getActiveCourses'
      );
      logStep('Registration', STEPS.COURSE, 'completed', `${courses.length} courses`);

      if (courses.length === 0) {
        await ctx.reply(t(lang, 'no_courses')).catch(() => {});
        return ctx.scene.leave();
      }

      await ctx.reply(
        t(lang, 'select_course'),
        {
          ...Markup.inlineKeyboard([
            ...courses.map((c: { id: string; title: string }) => [
              Markup.button.callback(telegramService.getCourseTitle(c.id, lang), `COURSE_${c.id}`)
            ]),
            [Markup.button.callback('🔙 ' + t(lang, 'cancel_button'), 'BACK_TO_DISTRICT')],
          ]),
          parse_mode: 'HTML',
        }
      ).catch(() => {});

      logStep('Registration', STEPS.COURSE, 'completed');
      return ctx.wizard.next();
    } catch (error) {
      logger.error('[Wizard] Failed to fetch courses', { error: String(error) });
      await ctx.reply(t(lang, 'error_generic')).catch(() => {});
      return ctx.scene.leave();
    }
  },

  // ════════════════════════════════════════════════════════════════════
  // Step 5: Course → Shift
  // ════════════════════════════════════════════════════════════════════
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const lang = state.language || 'uz';

    logStep('Registration', STEPS.SHIFT, 'entered');

    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const data = ctx.callbackQuery.data;
      await safeAnswerCbQuery(ctx);

      if (data === 'BACK_TO_DISTRICT') {
        state.districtId = undefined;
        return ctx.wizard.back();
      }

      if (data.startsWith('COURSE_')) {
        state.courseId = data.replace('COURSE_', '');
        logStep('Registration', STEPS.SHIFT, 'completed', `Course: ${state.courseId}`);
      }
    }

    if (!state.courseId) {
      logStep('Registration', STEPS.SHIFT, 'waiting', 'no course');
      return;
    }

    await ctx.reply(
      t(lang, 'select_shift'),
      {
        ...Markup.inlineKeyboard([
          [Markup.button.callback(t(lang, 'shift_morning'), 'SHIFT_Morning')],
          [Markup.button.callback(t(lang, 'shift_afternoon'), 'SHIFT_Afternoon')],
          [Markup.button.callback(t(lang, 'shift_evening'), 'SHIFT_Evening')],
          [Markup.button.callback('🔙 ' + t(lang, 'cancel_button'), 'BACK_TO_COURSE')],
        ]),
        parse_mode: 'HTML',
      }
    ).catch(() => {});

    logStep('Registration', STEPS.SHIFT, 'completed');
    return ctx.wizard.next();
  },

  // ════════════════════════════════════════════════════════════════════
  // Step 6: Shift → Age
  // ════════════════════════════════════════════════════════════════════
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const lang = state.language || 'uz';

    logStep('Registration', STEPS.AGE, 'entered');

    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const data = ctx.callbackQuery.data;
      await safeAnswerCbQuery(ctx);

      if (data === 'BACK_TO_COURSE') {
        state.courseId = undefined;
        return ctx.wizard.back();
      }

      if (data.startsWith('SHIFT_')) {
        state.shift = data.replace('SHIFT_', '');
        logStep('Registration', STEPS.AGE, 'completed', `Shift: ${state.shift}`);
      }
    }

    if (!state.shift) {
      logStep('Registration', STEPS.AGE, 'waiting', 'no shift');
      return;
    }

    await ctx.reply(t(lang, 'age_prompt')).catch(() => {});
    logStep('Registration', STEPS.AGE, 'completed');
    return ctx.wizard.next();
  },

  // ════════════════════════════════════════════════════════════════════
  // Step 7: Age → Experience
  // ════════════════════════════════════════════════════════════════════
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const lang = state.language || 'uz';

    logStep('Registration', STEPS.EXPERIENCE, 'entered');

    if (ctx.message && 'text' in ctx.message) {
      const age = parseInt(ctx.message.text.trim());
      if (isNaN(age) || age < 5 || age > 99) {
        logStep('Registration', STEPS.EXPERIENCE, 'waiting', 'invalid age');
        await ctx.reply(t(lang, 'invalid_age')).catch(() => {});
        return;
      }
      state.age = age;
      logStep('Registration', STEPS.EXPERIENCE, 'completed', `Age: ${age}`);
    } else {
      logStep('Registration', STEPS.EXPERIENCE, 'waiting', 'no text');
      return;
    }

    await ctx.reply(t(lang, 'experience_prompt')).catch(() => {});
    logStep('Registration', STEPS.EXPERIENCE, 'completed');
    return ctx.wizard.next();
  },

  // ════════════════════════════════════════════════════════════════════
  // Step 8: Experience → Device
  // ════════════════════════════════════════════════════════════════════
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const lang = state.language || 'uz';

    logStep('Registration', STEPS.DEVICE, 'entered');

    if (ctx.message && 'text' in ctx.message) {
      state.experience = ctx.message.text;
      logStep('Registration', STEPS.DEVICE, 'completed', 'Experience received');
    } else {
      logStep('Registration', STEPS.DEVICE, 'waiting', 'no text');
    }

    await ctx.reply(
      t(lang, 'device_prompt'),
      {
        ...Markup.inlineKeyboard([
          [Markup.button.callback('✅ ' + t(lang, 'device_yes'), 'DEVICE_YES')],
          [Markup.button.callback('❌ ' + t(lang, 'device_no'), 'DEVICE_NO')],
        ]),
        parse_mode: 'HTML',
      }
    ).catch(() => {});

    logStep('Registration', STEPS.DEVICE, 'completed');
    return ctx.wizard.next();
  },

  // ════════════════════════════════════════════════════════════════════
  // Step 9: Device → Note
  // ════════════════════════════════════════════════════════════════════
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const lang = state.language || 'uz';

    logStep('Registration', STEPS.NOTE, 'entered');

    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const data = ctx.callbackQuery.data;
      await safeAnswerCbQuery(ctx);

      if (data === 'DEVICE_YES') {
        state.device = 'yes';
        logStep('Registration', STEPS.NOTE, 'completed', 'Device: yes');
      } else if (data === 'DEVICE_NO') {
        state.device = 'no';
        logStep('Registration', STEPS.NOTE, 'completed', 'Device: no');
      } else {
        logStep('Registration', STEPS.NOTE, 'waiting', `unexpected: ${data}`);
      }
    }

    if (!state.device) {
      logStep('Registration', STEPS.NOTE, 'waiting', 'no device');
      return;
    }

    await ctx.reply(t(lang, 'note_prompt')).catch(() => {});
    logStep('Registration', STEPS.NOTE, 'completed');
    return ctx.wizard.next();
  },

  // ════════════════════════════════════════════════════════════════════
  // Step 10: Note → Confirmation
  // ════════════════════════════════════════════════════════════════════
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const lang = state.language || 'uz';

    logStep('Registration', STEPS.CONFIRM, 'entered');

    if (ctx.message && 'text' in ctx.message) {
      state.note = ctx.message.text;
      logStep('Registration', STEPS.CONFIRM, 'completed', 'Note received');
    } else {
      logStep('Registration', STEPS.CONFIRM, 'waiting', 'no text');
      return;
    }

    // Build confirmation message with translated course name
    const resolvedRegion = state.regionId || '—';
    const resolvedDistrict = state.districtId || '—';
    const resolvedCourse = state.courseId
      ? telegramService.getCourseTitle(state.courseId, lang)
      : '—';

    const summary = `📋 <b>${t(lang, 'confirm_title')}</b>\n\n` +
      `👤 ${state.firstName} ${state.lastName}\n` +
      `${t(lang, 'label_phone')}: ${state.phone}\n` +
      `📍 Viloyat: ${resolvedRegion}\n` +
      `🏫 Tuman: ${resolvedDistrict}\n` +
      `📄 Kurs: ${resolvedCourse}\n` +
      `${t(lang, 'label_shift')}: ${state.shift}\n` +
      `${t(lang, 'label_age')}: ${state.age}\n` +
      `${t(lang, 'label_experience')}: ${state.experience}\n` +
      `${t(lang, 'label_laptop')}: ${state.device === 'yes' ? t(lang, 'device_yes_short') : t(lang, 'device_no_short')}\n` +
      `${t(lang, 'label_note')}: ${state.note !== '-' ? state.note : '—'}\n\n` +
      `${t(lang, 'confirm_question')}`;

    await ctx.reply(
      summary,
      {
        ...Markup.inlineKeyboard([
          [
            Markup.button.callback('✅ ' + t(lang, 'confirm_button'), 'CONFIRM_YES'),
            Markup.button.callback('❌ ' + t(lang, 'cancel_button'), 'CANCEL_ALL'),
          ],
        ]),
        parse_mode: 'HTML',
      }
    ).catch(() => {});

    logStep('Registration', STEPS.CONFIRM, 'completed');
    return ctx.wizard.next();
  },

  // ════════════════════════════════════════════════════════════════════
  // Step 11: Final Submission
  // ════════════════════════════════════════════════════════════════════
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const lang = state.language || 'uz';

    logStep('Registration', STEPS.SUBMIT, 'entered');

    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const data = ctx.callbackQuery.data;
      await safeAnswerCbQuery(ctx);

      if (data === 'CANCEL_ALL') {
        await ctx.reply(t(lang, 'cancel_done'), {
          ...Markup.removeKeyboard(),
          parse_mode: 'HTML',
        }).catch(() => {});
        logStep('Registration', STEPS.SUBMIT, 'completed', 'cancelled');
        return ctx.scene.leave();
      }

      if (data === 'CONFIRM_YES') {
        logStep('Registration', STEPS.SUBMIT, 'completed', 'confirmed');

        // Check for duplicate submission
        if (state.telegramId && state.courseId) {
          const existingApps = applicationStore.getAll().filter(
            (a) => a.data.telegramId === state.telegramId && a.data.courseId === state.courseId
          );
          if (existingApps.length > 0) {
            // Remove keyboard
            try { await ctx.editMessageReplyMarkup({ inline_keyboard: [] }).catch(() => {}); } catch { /* ignore */ }
            await ctx.reply(t(lang, 'duplicate_application'), {
              ...Markup.removeKeyboard(),
              parse_mode: 'HTML',
            }).catch(() => {});
            logStep('Registration', STEPS.SUBMIT, 'completed', 'duplicate prevented');
            return ctx.scene.leave();
          }
        }

        // Build registration data object
        const regData = {
          telegramId: String(state.telegramId || 'unknown'),
          firstName: String(state.firstName || t(lang, 'first_name_fallback')),
          lastName: String(state.lastName || t(lang, 'last_name_fallback')),
          phone: String(state.phone || ''),
          districtId: String(state.districtId || ''),
          courseId: String(state.courseId || ''),
          shift: String(state.shift || ''),
          age: state.age || 0,
          experience: String(state.experience || ''),
          device: String(state.device || ''),
          note: String(state.note || '-'),
          language: lang,
        } as const;

        // Save to store
        const app = applicationStore.create(regData as import('../../applications/store').ApplicationData);
    
        logStep('Registration', STEPS.SUBMIT, 'completed', `App created: ${app.id}`);

        // Remove keyboard
        try { await ctx.editMessageReplyMarkup({ inline_keyboard: [] }).catch(() => {}); } catch { /* ignore */ }

        // Send success message
        await ctx.reply(t(lang, 'success_message'), {
          ...Markup.removeKeyboard(),
          parse_mode: 'HTML',
        }).catch(() => {});

        // Notify admin asynchronously
        teacherCrmService.notifyTeacher(
          app.id,
          {
            telegramId: regData.telegramId,
            firstName: regData.firstName,
            lastName: regData.lastName,
            phone: regData.phone,
            districtId: regData.districtId,
            courseId: regData.courseId,
            shift: regData.shift,
            age: regData.age,
            experience: regData.experience,
            device: regData.device,
            note: regData.note,
          },
          {
            firstName: regData.firstName,
            lastName: regData.lastName,
            username: state.username as string | undefined,
            telegramId: regData.telegramId,
          },
          state.regionId as string | undefined
        ).catch((error) => {
          logger.error('[Wizard] Failed to notify admin', {
            error: String(error),
            applicationId: app.id,
          });
        });

        logStep('Registration', STEPS.SUBMIT, 'completed', 'done');
        return ctx.scene.leave();
      }
    }

    // Non-callback message on confirmation step
    if (ctx.message && 'text' in ctx.message) {
      await ctx.reply(
        t(lang, 'please_use_buttons'),
        {
          ...Markup.inlineKeyboard([
            [
              Markup.button.callback('✅ ' + t(lang, 'confirm_button'), 'CONFIRM_YES'),
              Markup.button.callback('❌ ' + t(lang, 'cancel_button'), 'CANCEL_ALL'),
            ],
          ]),
          parse_mode: 'HTML',
        }
      ).catch(() => {});
    }
  }
);
