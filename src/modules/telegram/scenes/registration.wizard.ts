import { Scenes, Markup } from 'telegraf';
import { telegramService } from '../telegram.service';
import { teacherCrmService } from '../services/teacher-crm.service';
import { logger } from '../../../lib/security/logger';
import type { ProtectedContext, RegistrationWizardState } from '../middlewares/auth.middleware';

export const registrationWizard = new Scenes.WizardScene<ProtectedContext>(
  'REGISTRATION_WIZARD',

  // ── Step 0: Language Selection ────────────────────────────────────
  async (ctx) => {
    logger.info('[Wizard] Step 0: Language selection', { from: ctx.from?.id });
    await ctx.reply(
      'Tilni tanlang / Выберите язык:',
      Markup.inlineKeyboard([
        Markup.button.callback('🇺🇿 O\'zbekcha', 'LANG_UZ'),
        Markup.button.callback('🇷🇺 Русский', 'LANG_RU'),
      ])
    );
    // Move to step 1 – the next user interaction will trigger it
    return ctx.wizard.next();
  },

  // ── Step 1: Phone Number ──────────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    logger.info('[Wizard] Step 1: Awaiting phone', {
      from: ctx.from?.id,
      hasCallback: !!ctx.callbackQuery,
    });

    // Handle language selection callback
    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const lang = ctx.callbackQuery.data;
      if (lang === 'LANG_UZ' || lang === 'LANG_RU') {
        state.language = lang === 'LANG_UZ' ? 'uz' : 'ru';
        await ctx.answerCbQuery().catch(() => {});
        logger.info('[Wizard] Language selected', { from: ctx.from?.id, language: state.language });
      } else {
        // Unknown callback – still answer it
        await ctx.answerCbQuery().catch(() => {});
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

    return ctx.wizard.next();
  },

  // ── Step 2: Region Selection ──────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    logger.info('[Wizard] Step 2: Awaiting region', { from: ctx.from?.id });

    // Handle phone contact
    if (ctx.message && 'contact' in ctx.message) {
      state.phone = ctx.message.contact.phone_number;
      logger.info('[Wizard] Phone received via contact', {
        from: ctx.from?.id,
        phone: state.phone?.slice(0, 6) + '***',
      });
    } else if (ctx.message && 'text' in ctx.message && ctx.message.text) {
      // Allow manual text entry as fallback
      const phone = ctx.message.text.trim();
      if (/^[\d\+\-\(\)\s]{7,20}$/.test(phone)) {
        state.phone = phone;
        logger.info('[Wizard] Phone received via text', {
          from: ctx.from?.id,
          phone: phone.slice(0, 6) + '***',
        });
      } else {
        await ctx.reply(
          state.language === 'uz'
            ? 'Iltimos, telefon raqamingizni yuborish uchun pastdagi tugmani bosing yoki raqamni matn shaklida kiriting:'
            : 'Пожалуйста, нажмите кнопку ниже, чтобы отправить номер телефона, или введите номер текстом:'
        ).catch(() => {});
        return; // Stay on this step
      }
    }

    if (!state.phone) {
      await ctx.reply('Iltimos, telefon raqamingizni yuboring.').catch(() => {});
      return; // Stay on this step
    }

    try {
      const regions = await telegramService.getRegions();
      logger.info('[Wizard] Regions fetched', { count: regions.length });

      if (regions.length === 0) {
        await ctx.reply(
          state.language === 'uz'
            ? 'Hozircha viloyatlar mavjud emas.'
            : 'Пока нет доступных регионов.'
        ).catch(() => {});
        return ctx.scene.leave();
      }

      await ctx.reply(
        state.language === 'uz' ? 'Viloyatni tanlang:' : 'Выберите регион:',
        Markup.inlineKeyboard(
          regions.map((r: { id: string; name: string }) => [
            Markup.button.callback(r.name, `REGION_${r.id}`)
          ])
        )
      );
      return ctx.wizard.next();
    } catch (error) {
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
    logger.info('[Wizard] Step 3: Awaiting district', { from: ctx.from?.id });

    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const data = ctx.callbackQuery.data;
      if (data.startsWith('REGION_')) {
        state.regionId = data.replace('REGION_', '');
        await ctx.answerCbQuery().catch(() => {});
        logger.info('[Wizard] Region selected', { from: ctx.from?.id, regionId: state.regionId });
      } else {
        await ctx.answerCbQuery().catch(() => {});
      }
    }

    if (!state.regionId) {
      await ctx.answerCbQuery().catch(() => {});
      return; // Stay on this step
    }

    try {
      const districts = await telegramService.getDistricts(state.regionId);
      logger.info('[Wizard] Districts fetched', { count: districts.length });

      if (districts.length === 0) {
        await ctx.reply(
          state.language === 'uz'
            ? 'Ushbu viloyatda tumanlar topilmadi.'
            : 'В этом регионе нет районов.'
        ).catch(() => {});
        return ctx.wizard.back();
      }

      await ctx.reply(
        state.language === 'uz' ? 'Tumanni tanlang:' : 'Выберите район:',
        Markup.inlineKeyboard(
          districts.map((d: { id: string; name: string }) => [
            Markup.button.callback(d.name, `DISTRICT_${d.id}`)
          ])
        )
      );
      return ctx.wizard.next();
    } catch (error) {
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
    logger.info('[Wizard] Step 4: Awaiting course', { from: ctx.from?.id });

    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const data = ctx.callbackQuery.data;
      if (data.startsWith('DISTRICT_')) {
        state.districtId = data.replace('DISTRICT_', '');
        await ctx.answerCbQuery().catch(() => {});
        logger.info('[Wizard] District selected', { from: ctx.from?.id, districtId: state.districtId });
      } else {
        await ctx.answerCbQuery().catch(() => {});
      }
    }

    if (!state.districtId) {
      await ctx.answerCbQuery().catch(() => {});
      return; // Stay on this step
    }

    try {
      const courses = await telegramService.getActiveCourses();
      logger.info('[Wizard] Courses fetched', { count: courses.length });

      if (courses.length === 0) {
        await ctx.reply(
          state.language === 'uz'
            ? 'Hozircha ochiq kurslar mavjud emas.'
            : 'Пока нет доступных курсов.'
        ).catch(() => {});
        return ctx.scene.leave();
      }

      await ctx.reply(
        state.language === 'uz' ? 'Kursni tanlang:' : 'Выберите курс:',
        Markup.inlineKeyboard(
          courses.map((c: { id: string; title: string }) => [
            Markup.button.callback(c.title, `COURSE_${c.id}`)
          ])
        )
      );
      return ctx.wizard.next();
    } catch (error) {
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
    logger.info('[Wizard] Step 5: Awaiting shift', { from: ctx.from?.id });

    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const data = ctx.callbackQuery.data;
      if (data.startsWith('COURSE_')) {
        state.courseId = data.replace('COURSE_', '');
        await ctx.answerCbQuery().catch(() => {});
        logger.info('[Wizard] Course selected', { from: ctx.from?.id, courseId: state.courseId });
      } else {
        await ctx.answerCbQuery().catch(() => {});
      }
    }

    if (!state.courseId) {
      await ctx.answerCbQuery().catch(() => {});
      return; // Stay on this step
    }

    const t = (uz: string, ru: string) => state.language === 'uz' ? uz : ru;

    await ctx.reply(
      t('O\'qish vaqtini tanlang:', 'Выберите время обучения:'),
      Markup.inlineKeyboard([
        [Markup.button.callback('🌞 ' + t('Ertalabki (09:00 - 12:00)', 'Утро (09:00 - 12:00)'), 'SHIFT_Morning')],
        [Markup.button.callback('🌤 ' + t('Kunduzgi (14:00 - 17:00)', 'День (14:00 - 17:00)'), 'SHIFT_Afternoon')],
        [Markup.button.callback('🌙 ' + t('Kechki (18:00 - 21:00)', 'Вечер (18:00 - 21:00)'), 'SHIFT_Evening')],
      ])
    );
    return ctx.wizard.next();
  },

  // ── Step 6: Age ───────────────────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    logger.info('[Wizard] Step 6: Awaiting age', { from: ctx.from?.id });

    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const data = ctx.callbackQuery.data;
      if (data.startsWith('SHIFT_')) {
        state.shift = data.replace('SHIFT_', '');
        await ctx.answerCbQuery().catch(() => {});
        logger.info('[Wizard] Shift selected', { from: ctx.from?.id, shift: state.shift });
      } else {
        await ctx.answerCbQuery().catch(() => {});
      }
    }

    if (!state.shift) {
      await ctx.answerCbQuery().catch(() => {});
      return;
    }

    const t = (uz: string, ru: string) => state.language === 'uz' ? uz : ru;
    await ctx.reply(t('Yoshingizni kiriting (Masalan: 18):', 'Введите ваш возраст (Например: 18):'));
    return ctx.wizard.next();
  },

  // ── Step 7: Experience ────────────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    logger.info('[Wizard] Step 7: Awaiting experience', { from: ctx.from?.id });

    if (ctx.message && 'text' in ctx.message) {
      const age = parseInt(ctx.message.text.trim());
      if (isNaN(age) || age < 5 || age > 99) {
        const msg = state.language === 'uz'
          ? 'Iltimos, to\'g\'ri yosh kiriting (5-99):'
          : 'Пожалуйста, введите правильный возраст (5-99):';
        await ctx.reply(msg).catch(() => {});
        return; // Stay on this step
      }
      state.age = age;
      logger.info('[Wizard] Age received', { from: ctx.from?.id, age });
    } else {
      return; // Wait for text input
    }

    const msg = state.language === 'uz'
      ? 'Soha bo\'yicha tajribangiz bormi? (Masalan: Yo\'q, 1 yil):'
      : 'У вас есть опыт в этой сфере? (Например: Нет, 1 год):';
    await ctx.reply(msg).catch(() => {});
    return ctx.wizard.next();
  },

  // ── Step 8: Device (laptop) ───────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    logger.info('[Wizard] Step 8: Awaiting device', { from: ctx.from?.id });

    if (ctx.message && 'text' in ctx.message) {
      state.experience = ctx.message.text;
      logger.info('[Wizard] Experience received', { from: ctx.from?.id, experience: state.experience });
    }

    const msg = state.language === 'uz'
      ? 'O\'qish uchun shaxsiy noutbukingiz bormi?'
      : 'У вас есть личный ноутбук для учебы?';

    await ctx.reply(msg, Markup.inlineKeyboard([
      [Markup.button.callback('✅ ' + (state.language === 'uz' ? 'Ha, bor' : 'Да, есть'), 'DEVICE_YES')],
      [Markup.button.callback('❌ ' + (state.language === 'uz' ? 'Yo\'q' : 'Нет'), 'DEVICE_NO')],
    ]));
    return ctx.wizard.next();
  },

  // ── Step 9: Note ──────────────────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    logger.info('[Wizard] Step 9: Awaiting note', { from: ctx.from?.id });

    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const data = ctx.callbackQuery.data;
      if (data === 'DEVICE_YES' || data === 'DEVICE_NO') {
        state.device = data === 'DEVICE_YES'
          ? (state.language === 'uz' ? 'Ha' : 'Да')
          : (state.language === 'uz' ? 'Yo\'q' : 'Нет');
        await ctx.answerCbQuery().catch(() => {});
        logger.info('[Wizard] Device answer', { from: ctx.from?.id, device: state.device });
      } else {
        await ctx.answerCbQuery().catch(() => {});
      }
    }

    if (!state.device) {
      await ctx.answerCbQuery().catch(() => {});
      return;
    }

    const msg = state.language === 'uz'
      ? 'Qo\'shimcha izoh yoki savolingiz bo\'lsa yozing (Yo\'q bo\'lsa "-" yuboring):'
      : 'Напишите дополнительный комментарий или вопрос (если нет, отправьте "-"):';
    await ctx.reply(msg).catch(() => {});
    return ctx.wizard.next();
  },

  // ── Step 10: Confirmation ─────────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    logger.info('[Wizard] Step 10: Awaiting confirmation', { from: ctx.from?.id });

    if (ctx.message && 'text' in ctx.message) {
      state.note = ctx.message.text;
      logger.info('[Wizard] Note received', { from: ctx.from?.id });
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

    await ctx.reply(summary, {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('✅ ' + t('Tasdiqlash', 'Подтвердить'), 'CONFIRM')],
        [Markup.button.callback('❌ ' + t('Bekor qilish', 'Отмена'), 'CANCEL')],
      ])
    });

    return ctx.wizard.next();
  },

  // ── Step 11: Final Processing ─────────────────────────────────────
  async (ctx) => {
    const state = ctx.wizard.state as RegistrationWizardState;
    logger.info('[Wizard] Step 11: Processing', { from: ctx.from?.id });

    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const action = ctx.callbackQuery.data;
      await ctx.answerCbQuery().catch(() => {});

      if (action === 'CANCEL') {
        logger.info('[Wizard] Registration cancelled', { from: ctx.from?.id });
        const msg = state.language === 'uz'
          ? 'Ariza bekor qilindi. Qayta boshlash uchun /start bosing.'
          : 'Заявка отменена. Нажмите /start, чтобы начать заново.';
        await ctx.reply(msg).catch(() => {});
        return ctx.scene.leave();
      }

      if (action === 'CONFIRM') {
        try {
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
        return ctx.scene.leave();
      }

      // Unknown callback – ignore but acknowledged
      logger.warn('[Wizard] Unknown confirmation action', { action, from: ctx.from?.id });
    } else if (ctx.message && 'text' in ctx.message) {
      // User sent text instead of clicking confirmation buttons
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
