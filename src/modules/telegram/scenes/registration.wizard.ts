import { Scenes, Markup } from 'telegraf';
import { telegramService } from '../telegram.service';
import { teacherCrmService } from '../services/teacher-crm.service';
import { logger } from '../../../lib/security/logger';
import type { ProtectedContext } from '../middlewares/auth.middleware';

export const registrationWizard = new Scenes.WizardScene<ProtectedContext>(
  'REGISTRATION_WIZARD',
  async (ctx: ProtectedContext) => {
    await ctx.reply(
      'Tilni tanlang / Выберите язык:',
      Markup.inlineKeyboard([
        Markup.button.callback('🇺🇿 O\'zbekcha', 'LANG_UZ'),
        Markup.button.callback('🇷🇺 Русский', 'LANG_RU'),
      ])
    );
    return ctx.wizard.next();
  },

  async (ctx: ProtectedContext) => {
    const state = ctx.wizard.state;
    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      state.language = ctx.callbackQuery.data === 'LANG_UZ' ? 'uz' : 'ru';
      await ctx.answerCbQuery();
    }

    const msg = state.language === 'uz'
      ? 'Iltimos, telefon raqamingizni yuboring:'
      : 'Пожалуйста, отправьте свой номер телефона:';

    await ctx.reply(msg, Markup.keyboard([
      Markup.button.contactRequest(state.language === 'uz' ? '📱 Raqamni yuborish' : '📱 Отправить номер')
    ]).oneTime().resize());

    return ctx.wizard.next();
  },

  async (ctx: ProtectedContext) => {
    const state = ctx.wizard.state;
    if (ctx.message && 'contact' in ctx.message) {
      state.phone = ctx.message.contact.phone_number;
    } else if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      // Handle back button from next step if implemented
    } else {
      await ctx.reply('Tugmadan foydalanib raqam yuboring.');
      return;
    }

    try {
      const regions = await telegramService.getRegions();
      if (regions.length === 0) {
        await ctx.reply('Hozircha viloyatlar mavjud emas.');
        return ctx.scene.leave();
      }

      await ctx.reply(
        'Viloyatni tanlang:',
        Markup.inlineKeyboard(
          regions.map(r => [Markup.button.callback(r.name, r.id)])
        )
      );
      return ctx.wizard.next();
    } catch (error) {
      logger.error('Failed to fetch regions for wizard', { error: String(error) });
      await ctx.reply('Xatolik yuz berdi. Keyinroq urinib ko\'ring.');
      return ctx.scene.leave();
    }
  },

  async (ctx: ProtectedContext) => {
    const state = ctx.wizard.state;
    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      state.regionId = ctx.callbackQuery.data;
      await ctx.answerCbQuery();
    }

    try {
      const districts = await telegramService.getDistricts(state.regionId);
      if (districts.length === 0) {
        await ctx.reply('Ushbu viloyatda tumanlar topilmadi.');
        return ctx.wizard.back();
      }

      await ctx.reply(
        'Tumanni tanlang:',
        Markup.inlineKeyboard(
          districts.map(d => [Markup.button.callback(d.name, d.id)])
        )
      );
      return ctx.wizard.next();
    } catch (error) {
      logger.error('Failed to fetch districts for wizard', { error: String(error) });
      await ctx.reply('Xatolik yuz berdi.');
      return ctx.scene.leave();
    }
  },

  async (ctx: ProtectedContext) => {
    const state = ctx.wizard.state;
    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      state.districtId = ctx.callbackQuery.data;
      await ctx.answerCbQuery();
    }

    try {
      const courses = await telegramService.getActiveCourses();
      if (courses.length === 0) {
        await ctx.reply('Hozircha ochiq kurslar mavjud emas.');
        return ctx.scene.leave();
      }

      await ctx.reply(
        'Kursni tanlang:',
        Markup.inlineKeyboard(
          courses.map(c => [Markup.button.callback(c.title, c.id)])
        )
      );
      return ctx.wizard.next();
    } catch (error) {
      logger.error('Failed to fetch courses for wizard', { error: String(error) });
      await ctx.reply('Xatolik yuz berdi.');
      return ctx.scene.leave();
    }
  },

  async (ctx: ProtectedContext) => {
    const state = ctx.wizard.state;
    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      state.courseId = ctx.callbackQuery.data;
      await ctx.answerCbQuery();
    }

    await ctx.reply(
      'O\'qish vaqtini tanlang:',
      Markup.inlineKeyboard([
        [Markup.button.callback('🌞 Ertalabki (09:00 - 12:00)', 'Morning')],
        [Markup.button.callback('🌤 Kunduzgi (14:00 - 17:00)', 'Afternoon')],
        [Markup.button.callback('🌙 Kechki (18:00 - 21:00)', 'Evening')],
      ])
    );
    return ctx.wizard.next();
  },

  async (ctx: ProtectedContext) => {
    const state = ctx.wizard.state;
    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      state.shift = ctx.callbackQuery.data;
      await ctx.answerCbQuery();
    }

    await ctx.reply('Yoshingizni kiriting (Masalan: 18):');
    return ctx.wizard.next();
  },

  async (ctx: ProtectedContext) => {
    const state = ctx.wizard.state;
    if (ctx.message && 'text' in ctx.message) {
      const age = parseInt(ctx.message.text);
      if (isNaN(age) || age < 5 || age > 99) {
        await ctx.reply('Iltimos, to\'g\'ri yosh kiriting (5-99):');
        return;
      }
      state.age = age;
    }

    await ctx.reply('Soha bo\'yicha tajribangiz bormi? (Masalan: Yo\'q, 1 yil):');
    return ctx.wizard.next();
  },

  async (ctx: ProtectedContext) => {
    const state = ctx.wizard.state;
    if (ctx.message && 'text' in ctx.message) {
      state.experience = ctx.message.text;
    }

    await ctx.reply('O\'qish uchun shaxsiy noutbukingiz bormi?', Markup.inlineKeyboard([
      [Markup.button.callback('✅ Ha, bor', 'DEVICE_YES')],
      [Markup.button.callback('❌ Yo\'q', 'DEVICE_NO')],
    ]));
    return ctx.wizard.next();
  },

  async (ctx: ProtectedContext) => {
    const state = ctx.wizard.state;
    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      state.device = ctx.callbackQuery.data === 'DEVICE_YES' ? 'Ha' : 'Yo\'q';
      await ctx.answerCbQuery();
    }

    await ctx.reply('Qo\'shimcha izoh yoki savolingiz bo\'lsa yozing (Yo\'q bo\'lsa "-" yuboring):');
    return ctx.wizard.next();
  },

  async (ctx: ProtectedContext) => {
    const state = ctx.wizard.state;
    if (ctx.message && 'text' in ctx.message) {
      state.note = ctx.message.text;
    }

    const summary = `
📝 <b>Ma'lumotlaringizni tasdiqlang:</b>

📞 Telefon: ${state.phone}
🕒 Vaqt: ${state.shift}
🎂 Yosh: ${state.age}
💡 Tajriba: ${state.experience}
💻 Noutbuk: ${state.device}
📝 Izoh: ${state.note}

Hamma ma'lumotlar to'g'rimi?
    `;

    await ctx.reply(summary, {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('✅ Tasdiqlash', 'CONFIRM')],
        [Markup.button.callback('❌ Bekor qilish', 'CANCEL')],
      ])
    });

    return ctx.wizard.next();
  },

  async (ctx: ProtectedContext) => {
    const state = ctx.wizard.state;
    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const action = ctx.callbackQuery.data;
      await ctx.answerCbQuery();

      if (action === 'CANCEL') {
        await ctx.reply('Ariza bekor qilindi. Qayta boshlash uchun /start bosing.');
        return ctx.scene.leave();
      }

      if (action === 'CONFIRM') {
        try {
          const application = await telegramService.completeRegistration({
            telegramId: ctx.from?.id.toString() || '',
            firstName: ctx.from?.first_name || 'Ism',
            lastName: ctx.from?.last_name || 'Familiya',
            phone: state.phone,
            districtId: state.districtId,
            courseId: state.courseId,
            shift: state.shift,
            age: state.age,
            experience: state.experience,
            device: state.device,
            note: state.note,
          });

          await teacherCrmService.notifyTeacher(application.id);

          await ctx.reply('✅ Arizangiz muvaffaqiyatli qabul qilindi! Tez orada administratorlarimiz siz bilan bog\'lanishadi.');
        } catch (error: any) {
          if (error.message === 'DUPLICATE_APPLICATION') {
            await ctx.reply('❌ Siz ushbu kursga allaqachon ariza topshirgansiz. Natijasini kutishingizni so\'raymiz.');
          } else {
            logger.error('Wizard save failed', { error: String(error) });
            await ctx.reply('❌ Xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko\'ring.');
          }
        }
        return ctx.scene.leave();
      }
    }
  }
);

