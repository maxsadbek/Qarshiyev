import { Scenes, Markup } from 'telegraf';
import { telegramService } from '../telegram.service';
import { teacherCrmService } from '../services/teacher-crm.service';
import { t } from '../i18n/translations';
import { logger } from '../../../lib/security/logger';
import type { ProtectedContext, RegistrationWizardState } from '../middlewares/auth.middleware';

const DEBUG = true;
function debug(...args: unknown[]) {
  if (DEBUG) console.log('[Wizard:DEBUG]', ...args);
}

export const registrationWizard = new Scenes.WizardScene<ProtectedContext>(
  'REGISTRATION_WIZARD',

  // ── Step 0: Language Selection ────────────────────────────────────
  async (ctx) => {
    debug('[Wizard] Step 0 entered — sending language buttons');
    logger.info('[Wizard] Step 0: Language selection', { from: ctx.from?.id });
    await ctx.reply(
      t(undefined, 'language_select'),
      Markup.inlineKeyboard([
        Markup.button.callback('🇺🇿 O\'zbekcha', 'LANG_UZ'),
        Markup.button.callback('🇷🇺 Русский', 'LANG_RU'),
        Markup.button.callback('🇬🇧 English', 'LANG_EN'),
      ])
    );
    debug('[Wizard] Step 0 — calling ctx.wizard.next() → moving to step 1');
    // Move to step 1 – the next user interaction will trigger it
    return ctx.wizard.next();
  },

  // ── Step 1: Phone Number ──────────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const hasCallback = !!(ctx.callbackQuery && 'data' in ctx.callbackQuery);
    debug('[Wizard] Step 1 entered', { hasCallback, callbackData: hasCallback ? ctx.callbackQuery.data : null });
    logger.info('[Wizard] Step 1: Awaiting phone', {
      from: ctx.from?.id,
      hasCallback,
    });

    // Handle language selection callback
    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const lang = ctx.callbackQuery.data;
      if (lang === 'LANG_UZ' || lang === 'LANG_RU' || lang === 'LANG_EN') {
        state.language = lang === 'LANG_UZ' ? 'uz' : lang === 'LANG_RU' ? 'ru' : 'en';
        await ctx.answerCbQuery().catch(() => {});
        debug('[Wizard] Language selected', { language: state.language });
        logger.info('[Wizard] Language selected', { from: ctx.from?.id, language: state.language });
      } else {
        // Unknown callback – still answer it
        await ctx.answerCbQuery().catch(() => {});
        debug('[Wizard] Unknown callback in step 1', { data: lang });
      }
    }

    const lang = state.language;

    await ctx.reply(
      t(lang, 'contact_request'),
      Markup.keyboard([
        Markup.button.contactRequest(t(lang, 'contact_button'))
      ]).oneTime().resize()
    );

    debug('[Wizard] Step 1 — calling ctx.wizard.next() → moving to step 2');
    return ctx.wizard.next();
  },

  // ── Step 2: Region Selection ──────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const updateType = ctx.updateType;
    const hasMessage = !!ctx.message;
    const hasContact = !!(ctx.message && 'contact' in ctx.message && ctx.message.contact);
    const hasText = !!(ctx.message && 'text' in ctx.message && ctx.message.text);
    debug('[Wizard] Step 2 entered', {
      updateType,
      hasMessage,
      hasContact,
      hasText,
      contactPhone: ctx.message && 'contact' in ctx.message && ctx.message.contact ? ctx.message.contact.phone_number?.slice(0, 6) + '***' : null,
      textPreview: ctx.message && 'text' in ctx.message && ctx.message.text ? ctx.message.text.slice(0, 20) : null,
    });
    logger.info('[Wizard] Step 2: Awaiting region', { from: ctx.from?.id, updateType, hasContact });

    const lang = state.language;

    // Handle phone contact
    if (ctx.message && 'contact' in ctx.message && ctx.message.contact) {
      state.phone = ctx.message.contact.phone_number;
      debug('[Wizard] Phone received via contact', {
        phone: state.phone?.slice(0, 6) + '***',
        contactFirstName: ctx.message.contact.first_name,
        contactUserId: ctx.message.contact.user_id,
      });
      logger.info('[Wizard] Phone received via contact', {
        from: ctx.from?.id,
        phone: state.phone?.slice(0, 6) + '***',
      });
    } else if (ctx.message && 'text' in ctx.message && ctx.message.text) {
      // Allow manual text entry as fallback
      const phone = ctx.message.text.trim();
      if (/^[\d\+\-\(\)\s]{7,20}$/.test(phone)) {
        state.phone = phone;
        debug('[Wizard] Phone received via text', { phone: phone.slice(0, 6) + '***' });
        logger.info('[Wizard] Phone received via text', {
          from: ctx.from?.id,
          phone: phone.slice(0, 6) + '***',
        });
      } else {
        debug('[Wizard] Invalid phone text — staying on step 2', { text: phone.slice(0, 10) });
        await ctx.reply(t(lang, 'contact_request_hint')).catch(() => {});
        return; // Stay on this step
      }
    }

    if (!state.phone) {
      debug('[Wizard] No phone received — staying on step 2');
      await ctx.reply(t(lang, 'contact_request_simple')).catch(() => {});
      return; // Stay on this step
    }

    debug('[Wizard] Phone collected successfully — fetching regions');

    try {
      const regions = await telegramService.getRegions();
      debug('[Wizard] Regions fetched', { count: regions.length, names: regions.map((r: { name: string }) => r.name).slice(0, 3) });
      logger.info('[Wizard] Regions fetched', { count: regions.length });

      if (regions.length === 0) {
        debug('[Wizard] No regions available — leaving scene');
        await ctx.reply(t(lang, 'no_regions')).catch(() => {});
        return ctx.scene.leave();
      }

      debug('[Wizard] Sending region buttons');
      await ctx.reply(
        t(lang, 'select_region'),
        Markup.inlineKeyboard(
          regions.map((r: { id: string; name: string }) => [
            Markup.button.callback(r.name, `REGION_${r.id}`)
          ])
        )
      ).catch((error: unknown) => {
        debug('[Wizard] Failed to send region reply', { error: String(error) });
        logger.error('[Wizard] Failed to send region reply', { error: String(error) });
      });

      debug('[Wizard] Step 2 — calling ctx.wizard.next() → moving to step 3');
      return ctx.wizard.next();
    } catch (error) {
      debug('[Wizard] Failed to fetch regions', { error: String(error) });
      logger.error('[Wizard] Failed to fetch regions', { error: String(error) });
      await ctx.reply(t(lang, 'error_try_later')).catch(() => {});
      return ctx.scene.leave();
    }
  },

  // ── Step 3: District Selection ────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const hasCallback = !!(ctx.callbackQuery && 'data' in ctx.callbackQuery);
    debug('[Wizard] Step 3 entered', {
      hasCallback,
      callbackData: hasCallback ? ctx.callbackQuery.data : null,
    });
    logger.info('[Wizard] Step 3: Awaiting district', { from: ctx.from?.id });

    const lang = state.language;

    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const data = ctx.callbackQuery.data;
      if (data.startsWith('REGION_')) {
        state.regionId = data.replace('REGION_', '');
        await ctx.answerCbQuery().catch(() => {});
        debug('[Wizard] Region selected', { regionId: state.regionId });
        logger.info('[Wizard] Region selected', { from: ctx.from?.id, regionId: state.regionId });
      } else {
        debug('[Wizard] Unexpected callback in step 3', { data });
        await ctx.answerCbQuery().catch(() => {});
      }
    }

    if (!state.regionId) {
      debug('[Wizard] No regionId — staying on step 3');
      await ctx.answerCbQuery().catch(() => {});
      return; // Stay on this step
    }

    try {
      const districts = await telegramService.getDistricts(state.regionId);
      debug('[Wizard] Districts fetched', { count: districts.length });
      logger.info('[Wizard] Districts fetched', { count: districts.length });

      if (districts.length === 0) {
        debug('[Wizard] No districts — going back to step 2');
        await ctx.reply(t(lang, 'no_districts')).catch(() => {});
        return ctx.wizard.back();
      }

      debug('[Wizard] Sending district buttons — calling wizard.next()');
      await ctx.reply(
        t(lang, 'select_district'),
        Markup.inlineKeyboard(
          districts.map((d: { id: string; name: string }) => [
            Markup.button.callback(d.name, `DISTRICT_${d.id}`)
          ])
        )
      );
      debug('[Wizard] Step 3 — calling ctx.wizard.next() → moving to step 4');
      return ctx.wizard.next();
    } catch (error) {
      debug('[Wizard] Failed to fetch districts', { error: String(error) });
      logger.error('[Wizard] Failed to fetch districts', { error: String(error) });
      await ctx.reply(t(lang, 'error_generic')).catch(() => {});
      return ctx.scene.leave();
    }
  },

  // ── Step 4: Course Selection ──────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const hasCallback = !!(ctx.callbackQuery && 'data' in ctx.callbackQuery);
    debug('[Wizard] Step 4 entered', {
      hasCallback,
      callbackData: hasCallback ? ctx.callbackQuery.data : null,
    });
    logger.info('[Wizard] Step 4: Awaiting course', { from: ctx.from?.id });

    const lang = state.language;

    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const data = ctx.callbackQuery.data;
      if (data.startsWith('DISTRICT_')) {
        state.districtId = data.replace('DISTRICT_', '');
        await ctx.answerCbQuery().catch(() => {});
        debug('[Wizard] District selected', { districtId: state.districtId });
        logger.info('[Wizard] District selected', { from: ctx.from?.id, districtId: state.districtId });
      } else {
        debug('[Wizard] Unexpected callback in step 4', { data });
        await ctx.answerCbQuery().catch(() => {});
      }
    }

    if (!state.districtId) {
      debug('[Wizard] No districtId — staying on step 4');
      await ctx.answerCbQuery().catch(() => {});
      return; // Stay on this step
    }

    try {
      const courses = await telegramService.getActiveCourses();
      debug('[Wizard] Courses fetched', { count: courses.length });
      logger.info('[Wizard] Courses fetched', { count: courses.length });

      if (courses.length === 0) {
        debug('[Wizard] No courses — leaving scene');
        await ctx.reply(t(lang, 'no_courses')).catch(() => {});
        return ctx.scene.leave();
      }

      debug('[Wizard] Sending course buttons — calling wizard.next()');
      await ctx.reply(
        t(lang, 'select_course'),
        Markup.inlineKeyboard(
          courses.map((c: { id: string; title: string }) => [
            Markup.button.callback(c.title, `COURSE_${c.id}`)
          ])
        )
      );
      debug('[Wizard] Step 4 — calling ctx.wizard.next() → moving to step 5');
      return ctx.wizard.next();
    } catch (error) {
      debug('[Wizard] Failed to fetch courses', { error: String(error) });
      logger.error('[Wizard] Failed to fetch courses', { error: String(error) });
      await ctx.reply(t(lang, 'error_generic')).catch(() => {});
      return ctx.scene.leave();
    }
  },

  // ── Step 5: Shift Selection ───────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const hasCallback = !!(ctx.callbackQuery && 'data' in ctx.callbackQuery);
    debug('[Wizard] Step 5 entered', {
      hasCallback,
      callbackData: hasCallback ? ctx.callbackQuery.data : null,
    });
    logger.info('[Wizard] Step 5: Awaiting shift', { from: ctx.from?.id });

    const lang = state.language;

    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const data = ctx.callbackQuery.data;
      if (data.startsWith('COURSE_')) {
        state.courseId = data.replace('COURSE_', '');
        await ctx.answerCbQuery().catch(() => {});
        debug('[Wizard] Course selected', { courseId: state.courseId });
        logger.info('[Wizard] Course selected', { from: ctx.from?.id, courseId: state.courseId });
      } else {
        debug('[Wizard] Unexpected callback in step 5', { data });
        await ctx.answerCbQuery().catch(() => {});
      }
    }

    if (!state.courseId) {
      debug('[Wizard] No courseId — staying on step 5');
      await ctx.answerCbQuery().catch(() => {});
      return; // Stay on this step
    }

    debug('[Wizard] Sending shift buttons — calling wizard.next()');
    await ctx.reply(
      t(lang, 'select_shift'),
      Markup.inlineKeyboard([
        [Markup.button.callback(t(lang, 'shift_morning'), 'SHIFT_Morning')],
        [Markup.button.callback(t(lang, 'shift_afternoon'), 'SHIFT_Afternoon')],
        [Markup.button.callback(t(lang, 'shift_evening'), 'SHIFT_Evening')],
      ])
    );
    debug('[Wizard] Step 5 — calling ctx.wizard.next() → moving to step 6');
    return ctx.wizard.next();
  },

  // ── Step 6: Age ───────────────────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const hasCallback = !!(ctx.callbackQuery && 'data' in ctx.callbackQuery);
    debug('[Wizard] Step 6 entered', {
      hasCallback,
      callbackData: hasCallback ? ctx.callbackQuery.data : null,
    });
    logger.info('[Wizard] Step 6: Awaiting age', { from: ctx.from?.id });

    const lang = state.language;

    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const data = ctx.callbackQuery.data;
      if (data.startsWith('SHIFT_')) {
        state.shift = data.replace('SHIFT_', '');
        await ctx.answerCbQuery().catch(() => {});
        debug('[Wizard] Shift selected', { shift: state.shift });
        logger.info('[Wizard] Shift selected', { from: ctx.from?.id, shift: state.shift });
      } else {
        debug('[Wizard] Unexpected callback in step 6', { data });
        await ctx.answerCbQuery().catch(() => {});
      }
    }

    if (!state.shift) {
      debug('[Wizard] No shift — staying on step 6');
      await ctx.answerCbQuery().catch(() => {});
      return;
    }

    debug('[Wizard] Sending age prompt — calling wizard.next()');
    await ctx.reply(t(lang, 'age_prompt'));
    debug('[Wizard] Step 6 — calling ctx.wizard.next() → moving to step 7');
    return ctx.wizard.next();
  },

  // ── Step 7: Experience ────────────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const hasText = !!(ctx.message && 'text' in ctx.message && ctx.message.text);
    debug('[Wizard] Step 7 entered', { hasText, textPreview: ctx.message && 'text' in ctx.message && ctx.message.text ? ctx.message.text.slice(0, 20) : null });
    logger.info('[Wizard] Step 7: Awaiting experience', { from: ctx.from?.id });

    const lang = state.language;

    if (ctx.message && 'text' in ctx.message) {
      const age = parseInt(ctx.message.text.trim());
      if (isNaN(age) || age < 5 || age > 99) {
        debug('[Wizard] Invalid age', { input: ctx.message.text.trim() });
        await ctx.reply(t(lang, 'invalid_age')).catch(() => {});
        return; // Stay on this step
      }
      state.age = age;
      debug('[Wizard] Age received', { age });
      logger.info('[Wizard] Age received', { from: ctx.from?.id, age });
    } else {
      debug('[Wizard] No text message — waiting');
      return; // Wait for text input
    }

    await ctx.reply(t(lang, 'experience_prompt')).catch(() => {});
    debug('[Wizard] Step 7 — calling ctx.wizard.next() → moving to step 8');
    return ctx.wizard.next();
  },

  // ── Step 8: Device (laptop) ───────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const hasText = !!(ctx.message && 'text' in ctx.message && ctx.message.text);
    debug('[Wizard] Step 8 entered', { hasText, textPreview: ctx.message && 'text' in ctx.message && ctx.message.text ? ctx.message.text.slice(0, 30) : null });
    logger.info('[Wizard] Step 8: Awaiting device', { from: ctx.from?.id });

    const lang = state.language;

    if (ctx.message && 'text' in ctx.message) {
      state.experience = ctx.message.text;
      debug('[Wizard] Experience received', { experience: state.experience });
      logger.info('[Wizard] Experience received', { from: ctx.from?.id, experience: state.experience });
    } else {
      debug('[Wizard] No text in step 8 — experience stays as-is');
    }

    debug('[Wizard] Sending device buttons — calling wizard.next()');
    await ctx.reply(
      t(lang, 'device_prompt'),
      Markup.inlineKeyboard([
        [Markup.button.callback('✅ ' + t(lang, 'device_yes'), 'DEVICE_YES')],
        [Markup.button.callback('❌ ' + t(lang, 'device_no'), 'DEVICE_NO')],
      ])
    );
    debug('[Wizard] Step 8 — calling ctx.wizard.next() → moving to step 9');
    return ctx.wizard.next();
  },

  // ── Step 9: Note ──────────────────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const hasCallback = !!(ctx.callbackQuery && 'data' in ctx.callbackQuery);
    debug('[Wizard] Step 9 entered', {
      hasCallback,
      callbackData: hasCallback ? ctx.callbackQuery.data : null,
    });
    logger.info('[Wizard] Step 9: Awaiting note', { from: ctx.from?.id });

    const lang = state.language;

    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const data = ctx.callbackQuery.data;
      if (data === 'DEVICE_YES' || data === 'DEVICE_NO') {
        state.device = data === 'DEVICE_YES' ? 'yes' : 'no';
        await ctx.answerCbQuery().catch(() => {});
        debug('[Wizard] Device answer', { device: state.device });
        logger.info('[Wizard] Device answer', { from: ctx.from?.id, device: state.device });
      } else {
        debug('[Wizard] Unexpected callback in step 9', { data });
        await ctx.answerCbQuery().catch(() => {});
      }
    }

    if (!state.device) {
      debug('[Wizard] No device — staying on step 9');
      await ctx.answerCbQuery().catch(() => {});
      return;
    }

    debug('[Wizard] Sending note prompt — calling wizard.next()');
    await ctx.reply(t(lang, 'note_prompt')).catch(() => {});
    debug('[Wizard] Step 9 — calling ctx.wizard.next() → moving to step 10');
    return ctx.wizard.next();
  },

  // ── Step 10: Confirmation ─────────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const hasText = !!(ctx.message && 'text' in ctx.message && ctx.message.text);
    debug('[Wizard] Step 10 entered', { hasText, textPreview: ctx.message && 'text' in ctx.message && ctx.message.text ? ctx.message.text.slice(0, 20) : null });
    logger.info('[Wizard] Step 10: Awaiting confirmation', { from: ctx.from?.id });

    const lang = state.language;

    if (ctx.message && 'text' in ctx.message) {
      state.note = ctx.message.text;
      debug('[Wizard] Note received', { note: state.note });
      logger.info('[Wizard] Note received', { from: ctx.from?.id });
    } else {
      debug('[Wizard] No text in step 10 (may be button press)');
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

    debug('[Wizard] Sending confirmation — calling wizard.next()');
    await ctx.reply(summary, {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [Markup.button.callback(t(lang, 'confirm_button'), 'CONFIRM')],
        [Markup.button.callback(t(lang, 'cancel_button'), 'CANCEL')],
      ])
    });

    debug('[Wizard] Step 10 — calling ctx.wizard.next() → moving to step 11');
    return ctx.wizard.next();
  },

  // ── Step 11: Final Processing ─────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const hasCallback = !!(ctx.callbackQuery && 'data' in ctx.callbackQuery);
    const hasText = !!(ctx.message && 'text' in ctx.message && ctx.message.text);
    debug('[Wizard] Step 11 entered', {
      hasCallback,
      callbackData: hasCallback ? ctx.callbackQuery.data : null,
      hasText,
    });
    logger.info('[Wizard] Step 11: Processing', { from: ctx.from?.id });

    const lang = state.language;

    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const action = ctx.callbackQuery.data;
      await ctx.answerCbQuery().catch(() => {});
      debug('[Wizard] Step 11 action', { action });

      if (action === 'CANCEL') {
        debug('[Wizard] Registration cancelled by user');
        logger.info('[Wizard] Registration cancelled', { from: ctx.from?.id });
        await ctx.reply(t(lang, 'cancel_done')).catch(() => {});
        debug('[Wizard] Leaving scene after cancel');
        return ctx.scene.leave();
      }

      if (action === 'CONFIRM') {
        try {
          debug('[Wizard] Confirming registration...');
          logger.info('[Wizard] Confirming registration', {
            from: ctx.from?.id,
            telegramId: ctx.from?.id.toString(),
          });

          const application = await telegramService.completeRegistration({
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
          });

          debug('[Wizard] Registration completed', { applicationId: application.id });
          logger.info('[Wizard] Registration completed', {
            applicationId: application.id,
            from: ctx.from?.id,
          });

          // Notify teacher asynchronously – don't block the user
          teacherCrmService.notifyTeacher(application.id).catch((error) => {
            logger.error('[Wizard] Failed to notify teacher', {
              error: String(error),
              applicationId: application.id,
            });
          });

          await ctx.reply(t(lang, 'success_message')).catch(() => {});
        } catch (error: unknown) {
          const isDuplicate =
            error instanceof Error && error.message === 'DUPLICATE_APPLICATION';

          debug('[Wizard] Registration failed', { error: String(error), isDuplicate });
          logger.error('[Wizard] Registration failed', {
            error: String(error),
            from: ctx.from?.id,
            isDuplicate,
          });

          if (isDuplicate) {
            await ctx.reply(t(lang, 'duplicate_application')).catch(() => {});
          } else {
            await ctx.reply(t(lang, 'error_try_later_short')).catch(() => {});
          }
        }
        debug('[Wizard] Leaving scene after processing');
        return ctx.scene.leave();
      }

      // Unknown callback – ignore but acknowledged
      debug('[Wizard] Unknown confirmation action', { action });
      logger.warn('[Wizard] Unknown confirmation action', { action, from: ctx.from?.id });
    } else if (ctx.message && 'text' in ctx.message) {
      // User sent text instead of clicking confirmation buttons
      debug('[Wizard] User sent text instead of clicking confirmation');
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
