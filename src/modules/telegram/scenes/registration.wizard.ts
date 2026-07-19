import { Scenes, Markup } from 'telegraf';
import { telegramService } from '../telegram.service';
import { teacherCrmService } from '../services/teacher-crm.service';
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
      'Tilni tanlang / Выберите язык:',
      Markup.inlineKeyboard([
        Markup.button.callback('🇺🇿 O\'zbekcha', 'LANG_UZ'),
        Markup.button.callback('🇷🇺 Русский', 'LANG_RU'),
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
      if (lang === 'LANG_UZ' || lang === 'LANG_RU') {
        state.language = lang === 'LANG_UZ' ? 'uz' : 'ru';
        await ctx.answerCbQuery().catch(() => {});
        debug('[Wizard] Language selected', { language: state.language });
        logger.info('[Wizard] Language selected', { from: ctx.from?.id, language: state.language });
      } else {
        // Unknown callback – still answer it
        await ctx.answerCbQuery().catch(() => {});
        debug('[Wizard] Unknown callback in step 1', { data: lang });
      }
    }

    const msg = state.language === 'uz'
      ? 'Iltimos, telefon raqamingizni yuboring:'
      : 'Пожалуйста, отправьте свой номер телефона:';

    await ctx.reply(msg, Markup.keyboard([
      Markup.button.contactRequest(
        state.language === 'uz' ? '📱 Raqamni yuborish' : '📱 Отправить номер'
      )
    ]).oneTime().resize());

    debug('[Wizard] Step 1 — calling ctx.wizard.next() → moving to step 2');
    return ctx.wizard.next();
  },

  // ── Step 2: Region Selection ──────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const updateType = ctx.updateType;
    const hasMessage = !!ctx.message;
    const hasContact = !!(ctx.message && ctx.message.contact);
    const hasText = !!(ctx.message && 'text' in ctx.message && ctx.message.text);
    debug('[Wizard] Step 2 entered', {
      updateType,
      hasMessage,
      hasContact,
      hasText,
      contactPhone: hasContact ? ctx.message.contact.phone_number?.slice(0, 6) + '***' : null,
      textPreview: hasText ? (ctx.message.text as string).slice(0, 20) : null,
    });
    logger.info('[Wizard] Step 2: Awaiting region', { from: ctx.from?.id, updateType, hasContact });

    // Handle phone contact — check ctx.message.contact directly (more reliable than 'in' operator)
    if (ctx.message && ctx.message.contact) {
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
        await ctx.reply(
          state.language === 'uz'
            ? 'Iltimos, telefon raqamingizni yuborish uchun pastdagi tugmani bosing yoki raqamni matn shaklida kiriting:'
            : 'Пожалуйста, нажмите кнопку ниже, чтобы отправить номер телефона, или введите номер текстом:'
        ).catch(() => {});
        return; // Stay on this step
      }
    }

    if (!state.phone) {
      debug('[Wizard] No phone received — staying on step 2');
      await ctx.reply('Iltimos, telefon raqamingizni yuboring.').catch(() => {});
      return; // Stay on this step
    }

    debug('[Wizard] Phone collected successfully — fetching regions');

    try {
      const regions = await telegramService.getRegions();
      debug('[Wizard] Regions fetched', { count: regions.length, names: regions.map((r: { name: string }) => r.name).slice(0, 3) });
      logger.info('[Wizard] Regions fetched', { count: regions.length });

      if (regions.length === 0) {
        debug('[Wizard] No regions available — leaving scene');
        await ctx.reply(
          state.language === 'uz'
            ? 'Hozircha viloyatlar mavjud emas.'
            : 'Пока нет доступных регионов.'
        ).catch(() => {});
        return ctx.scene.leave();
      }

      debug('[Wizard] Sending region buttons');
      await ctx.reply(
        state.language === 'uz' ? 'Viloyatni tanlang:' : 'Выберите регион:',
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
      await ctx.reply(
        state.language === 'uz'
          ? 'Xatolik yuz berdi. Keyinroq urinib ko\'ring.'
          : 'Произошла ошибка. Попробуйте позже.'
      ).catch(() => {});
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
        await ctx.reply(
          state.language === 'uz'
            ? 'Ushbu viloyatda tumanlar topilmadi.'
            : 'В этом регионе нет районов.'
        ).catch(() => {});
        return ctx.wizard.back();
      }

      debug('[Wizard] Sending district buttons — calling wizard.next()');
      await ctx.reply(
        state.language === 'uz' ? 'Tumanni tanlang:' : 'Выберите район:',
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
      await ctx.reply(
        state.language === 'uz' ? 'Xatolik yuz berdi.' : 'Произошла ошибка.'
      ).catch(() => {});
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
        await ctx.reply(
          state.language === 'uz'
            ? 'Hozircha ochiq kurslar mavjud emas.'
            : 'Пока нет доступных курсов.'
        ).catch(() => {});
        return ctx.scene.leave();
      }

      debug('[Wizard] Sending course buttons — calling wizard.next()');
      await ctx.reply(
        state.language === 'uz' ? 'Kursni tanlang:' : 'Выберите курс:',
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
      await ctx.reply(
        state.language === 'uz' ? 'Xatolik yuz berdi.' : 'Произошла ошибка.'
      ).catch(() => {});
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

    const t = (uz: string, ru: string) => state.language === 'uz' ? uz : ru;

    debug('[Wizard] Sending shift buttons — calling wizard.next()');
    await ctx.reply(
      t('O\'qish vaqtini tanlang:', 'Выберите время обучения:'),
      Markup.inlineKeyboard([
        [Markup.button.callback('🌞 ' + t('Ertalabki (09:00 - 12:00)', 'Утро (09:00 - 12:00)'), 'SHIFT_Morning')],
        [Markup.button.callback('🌤 ' + t('Kunduzgi (14:00 - 17:00)', 'День (14:00 - 17:00)'), 'SHIFT_Afternoon')],
        [Markup.button.callback('🌙 ' + t('Kechki (18:00 - 21:00)', 'Вечер (18:00 - 21:00)'), 'SHIFT_Evening')],
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

    const t = (uz: string, ru: string) => state.language === 'uz' ? uz : ru;
    debug('[Wizard] Sending age prompt — calling wizard.next()');
    await ctx.reply(t('Yoshingizni kiriting (Masalan: 18):', 'Введите ваш возраст (Например: 18):'));
    debug('[Wizard] Step 6 — calling ctx.wizard.next() → moving to step 7');
    return ctx.wizard.next();
  },

  // ── Step 7: Experience ────────────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const hasText = !!(ctx.message && 'text' in ctx.message && ctx.message.text);
    debug('[Wizard] Step 7 entered', { hasText, textPreview: hasText ? (ctx.message.text as string).slice(0, 20) : null });
    logger.info('[Wizard] Step 7: Awaiting experience', { from: ctx.from?.id });

    if (ctx.message && 'text' in ctx.message) {
      const age = parseInt(ctx.message.text.trim());
      if (isNaN(age) || age < 5 || age > 99) {
        debug('[Wizard] Invalid age', { input: ctx.message.text.trim() });
        const msg = state.language === 'uz'
          ? 'Iltimos, to\'g\'ri yosh kiriting (5-99):'
          : 'Пожалуйста, введите правильный возраст (5-99):';
        await ctx.reply(msg).catch(() => {});
        return; // Stay on this step
      }
      state.age = age;
      debug('[Wizard] Age received', { age });
      logger.info('[Wizard] Age received', { from: ctx.from?.id, age });
    } else {
      debug('[Wizard] No text message — waiting');
      return; // Wait for text input
    }

    const msg = state.language === 'uz'
      ? 'Soha bo\'yicha tajribangiz bormi? (Masalan: Yo\'q, 1 yil):'
      : 'У вас есть опыт в этой сфере? (Например: Нет, 1 год):';
    await ctx.reply(msg).catch(() => {});
    debug('[Wizard] Step 7 — calling ctx.wizard.next() → moving to step 8');
    return ctx.wizard.next();
  },

  // ── Step 8: Device (laptop) ───────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const hasText = !!(ctx.message && 'text' in ctx.message && ctx.message.text);
    debug('[Wizard] Step 8 entered', { hasText, textPreview: hasText ? (ctx.message.text as string).slice(0, 30) : null });
    logger.info('[Wizard] Step 8: Awaiting device', { from: ctx.from?.id });

    if (ctx.message && 'text' in ctx.message) {
      state.experience = ctx.message.text;
      debug('[Wizard] Experience received', { experience: state.experience });
      logger.info('[Wizard] Experience received', { from: ctx.from?.id, experience: state.experience });
    } else {
      debug('[Wizard] No text in step 8 — experience stays as-is');
    }

    const msg = state.language === 'uz'
      ? 'O\'qish uchun shaxsiy noutbukingiz bormi?'
      : 'У вас есть личный ноутбук для учебы?';

    debug('[Wizard] Sending device buttons — calling wizard.next()');
    await ctx.reply(msg, Markup.inlineKeyboard([
      [Markup.button.callback('✅ ' + (state.language === 'uz' ? 'Ha, bor' : 'Да, есть'), 'DEVICE_YES')],
      [Markup.button.callback('❌ ' + (state.language === 'uz' ? 'Yo\'q' : 'Нет'), 'DEVICE_NO')],
    ]));
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

    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const data = ctx.callbackQuery.data;
      if (data === 'DEVICE_YES' || data === 'DEVICE_NO') {
        state.device = data === 'DEVICE_YES'
          ? (state.language === 'uz' ? 'Ha' : 'Да')
          : (state.language === 'uz' ? 'Yo\'q' : 'Нет');
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

    const msg = state.language === 'uz'
      ? 'Qo\'shimcha izoh yoki savolingiz bo\'lsa yozing (Yo\'q bo\'lsa "-" yuboring):'
      : 'Напишите дополнительный комментарий или вопрос (если нет, отправьте "-"):';
    debug('[Wizard] Sending note prompt — calling wizard.next()');
    await ctx.reply(msg).catch(() => {});
    debug('[Wizard] Step 9 — calling ctx.wizard.next() → moving to step 10');
    return ctx.wizard.next();
  },

  // ── Step 10: Confirmation ─────────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    const hasText = !!(ctx.message && 'text' in ctx.message && ctx.message.text);
    debug('[Wizard] Step 10 entered', { hasText, textPreview: hasText ? (ctx.message.text as string).slice(0, 20) : null });
    logger.info('[Wizard] Step 10: Awaiting confirmation', { from: ctx.from?.id });

    if (ctx.message && 'text' in ctx.message) {
      state.note = ctx.message.text;
      debug('[Wizard] Note received', { note: state.note });
      logger.info('[Wizard] Note received', { from: ctx.from?.id });
    } else {
      debug('[Wizard] No text in step 10 (may be button press)');
    }

    const t = (uz: string, ru: string) => state.language === 'uz' ? uz : ru;

    const summary = `
📝 <b>${t('Ma\'lumotlaringizni tasdiqlang:', 'Подтвердите ваши данные:')}</b>

📞 ${t('Telefon', 'Телефон')}: ${state.phone}
🕒 ${t('Vaqt', 'Время')}: ${state.shift}
🎂 ${t('Yosh', 'Возраст')}: ${state.age}
💡 ${t('Tajriba', 'Опыт')}: ${state.experience}
💻 ${t('Noutbuk', 'Ноутбук')}: ${state.device}
📝 ${t('Izoh', 'Комментарий')}: ${state.note || '-'}

${t('Hamma ma\'lumotlar to\'g\'rimi?', 'Все данные верны?')}
    `;

    debug('[Wizard] Sending confirmation — calling wizard.next()');
    await ctx.reply(summary, {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('✅ ' + t('Tasdiqlash', 'Подтвердить'), 'CONFIRM')],
        [Markup.button.callback('❌ ' + t('Bekor qilish', 'Отмена'), 'CANCEL')],
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

    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const action = ctx.callbackQuery.data;
      await ctx.answerCbQuery().catch(() => {});
      debug('[Wizard] Step 11 action', { action });

      if (action === 'CANCEL') {
        debug('[Wizard] Registration cancelled by user');
        logger.info('[Wizard] Registration cancelled', { from: ctx.from?.id });
        const msg = state.language === 'uz'
          ? 'Ariza bekor qilindi. Qayta boshlash uchun /start bosing.'
          : 'Заявка отменена. Нажмите /start, чтобы начать заново.';
        await ctx.reply(msg).catch(() => {});
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
            firstName: ctx.from?.first_name || 'Ism',
            lastName: ctx.from?.last_name || 'Familiya',
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

          const msg = state.language === 'uz'
            ? '✅ Arizangiz muvaffaqiyatli qabul qilindi! Tez orada administratorlarimiz siz bilan bog\'lanishadi.'
            : '✅ Ваша заявка успешно принята! Наши администраторы свяжутся с вами в ближайшее время.';
          await ctx.reply(msg).catch(() => {});
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
            const msg = state.language === 'uz'
              ? '❌ Siz ushbu kursga allaqachon ariza topshirgansiz. Natijasini kutishingizni so\'raymiz.'
              : '❌ Вы уже подали заявку на этот курс. Пожалуйста, ожидайте результата.';
            await ctx.reply(msg).catch(() => {});
          } else {
            const msg = state.language === 'uz'
              ? '❌ Xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko\'ring.'
              : '❌ Произошла ошибка. Пожалуйста, попробуйте позже.';
            await ctx.reply(msg).catch(() => {});
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
      const t = (uz: string, ru: string) => state.language === 'uz' ? uz : ru;
      await ctx.reply(
        t('Iltimos, pastdagi tugmalardan birini bosing.', 'Пожалуйста, нажмите одну из кнопок ниже.'),
        Markup.inlineKeyboard([
          [Markup.button.callback('✅ ' + t('Tasdiqlash', 'Подтвердить'), 'CONFIRM')],
          [Markup.button.callback('❌ ' + t('Bekor qilish', 'Отмена'), 'CANCEL')],
        ])
      ).catch(() => {});
    }
  }
);
