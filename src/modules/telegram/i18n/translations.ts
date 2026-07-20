/**
 * src/modules/telegram/i18n/translations.ts
 * Centralized translation system for the Telegram bot.
 *
 * Usage:
 *   import { t } from '../i18n/translations';
 *   t('uz', 'welcome');
 *   t(state.language, 'contact_request');
 */

// ── Types ──────────────────────────────────────────────────────────
type LangCode = 'uz' | 'ru' | 'en';
type TranslationMap = Record<string, string>;
type TranslationsDict = Record<LangCode, TranslationMap>;

// ── Translation Data ───────────────────────────────────────────────
const translations: TranslationsDict = {
  uz: {
    // ── Language selection ────────────────────────────────
    language_select: 'Tilni tanlang:',

    // ── Generic / Errors ──────────────────────────────────
    error_generic: '❌ Xatolik yuz berdi.',
    error_generic_with_start: '❌ Xatolik yuz berdi. Iltimos, qayta urinib ko\'ring (/start).',
    error_try_later: 'Xatolik yuz berdi. Keyinroq urinib ko\'ring.',
    error_try_later_short: '❌ Xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko\'ring.',
    profile_load_error: '❌ Profilni yuklab bo\'lmadi',

    // ── Contact / Phone ───────────────────────────────────
    contact_request: 'Iltimos, telefon raqamingizni yuboring:',
    contact_request_hint: 'Iltimos, telefon raqamingizni yuborish uchun pastdagi tugmani bosing yoki raqamni matn shaklida kiriting:',
    contact_request_simple: 'Iltimos, telefon raqamingizni yuboring.',
    contact_button: '📱 Raqamni yuborish',
    invalid_phone: 'Iltimos, telefon raqamingizni yuboring.',

    // ── Region ────────────────────────────────────────────
    select_region: 'Viloyatni tanlang:',
    no_regions: 'Hozircha viloyatlar mavjud emas.',

    // ── District ──────────────────────────────────────────
    select_district: 'Tumanni tanlang:',
    no_districts: 'Ushbu viloyatda tumanlar topilmadi.',

    // ── Course ────────────────────────────────────────────
    select_course: 'Kursni tanlang:',
    no_courses: 'Hozircha ochiq kurslar mavjud emas.',

    // ── Shift ─────────────────────────────────────────────
    select_shift: 'O\'qish vaqtini tanlang:',
    shift_morning: '🌞 Ertalabki (09:00 - 12:00)',
    shift_afternoon: '🌤 Kunduzgi (14:00 - 17:00)',
    shift_evening: '🌙 Kechki (18:00 - 21:00)',

    // ── Age ───────────────────────────────────────────────
    age_prompt: 'Yoshingizni kiriting (Masalan: 18):',
    invalid_age: 'Iltimos, to\'g\'ri yosh kiriting (5-99):',

    // ── Experience ────────────────────────────────────────
    experience_prompt: 'Soha bo\'yicha tajribangiz bormi? (Masalan: Yo\'q, 1 yil):',

    // ── Device (laptop) ───────────────────────────────────
    device_prompt: 'O\'qish uchun shaxsiy noutbukingiz bormi?',
    device_yes: 'Ha, bor',
    device_no: 'Yo\'q',
    device_yes_short: 'Ha',
    device_no_short: 'Yo\'q',

    // ── Note ──────────────────────────────────────────────
    note_prompt: 'Qo\'shimcha izoh yoki savolingiz bo\'lsa yozing (Yo\'q bo\'lsa "-" yuboring):',
    note_write_prompt: 'Iltimos, izohingizni matn ko\'rinishida yuboring (Bekor qilish uchun /cancel bosing):',
    note_cancelled: 'Bekor qilindi.',
    note_saved: '✅ Izoh muvaffaqiyatli saqlandi.',
    note_non_text: 'Iltimos, izohni matn ko\'rinishida yuboring.',

    // ── Confirmation ──────────────────────────────────────
    confirm_title: 'Ma\'lumotlaringizni tasdiqlang:',
    label_phone: '📞 Telefon',
    label_shift: '🕒 Vaqt',
    label_age: '🎂 Yosh',
    label_experience: '💡 Tajriba',
    label_laptop: '💻 Noutbuk',
    label_note: '📝 Izoh',
    confirm_question: 'Hamma ma\'lumotlar to\'g\'rimi?',
    confirm_button: '✅ Tasdiqlash',
    cancel_button: '❌ Bekor qilish',
    cancel_done: 'Ariza bekor qilindi. Qayta boshlash uchun /start bosing.',
    please_use_buttons: 'Iltimos, pastdagi tugmalardan birini bosing.',

    // ── Final ─────────────────────────────────────────────
    success_message: '✅ Arizangiz muvaffaqiyatli qabul qilindi! Tez orada administratorlarimiz siz bilan bog\'lanishadi.',
    duplicate_application: '❌ Siz ushbu kursga allaqachon ariza topshirgansiz. Natijasini kutishingizni so\'raymiz.',
    first_name_fallback: 'Ism',
    last_name_fallback: 'Familiya',

    // ── CRM Status Labels ─────────────────────────────────
    status_approved: '✅ Holat: QABUL QILINDI',
    status_rejected: '❌ Holat: RAD ETILDI',
    status_pending: '⏳ Holat: KUTTIRISHGA OLINDI',
    status_contacted: '🔵 Holat: BOG\'LANDI',
    approved: '✅ Qabul qilindi',
    rejected: '❌ Rad etildi',
    pending: '⏳ Kuttirishga olindi',
    contacted: '🔵 Bog\'landi',

    // ── Admin Notifications ───────────────────────────────
    new_application_title: '🆕 <b>Yangi Ariza! (offline)</b>',
    application_id: 'Ariza ID',
    status: 'Holat',
    no_db_hint: '<i>Ma\'lumotlar bazasiz rejim — tafsilotlarni ko\'rish uchun veb-panelga kiring.</i>',
    crm_accept: '✅ Qabul qilish',
    crm_reject: '❌ Rad etish',
    crm_reply: '💬 Javob yozish',
    student_profile: '👤 <b>O\'quvchi profili</b>',
    profile_no_db_hint: '📋 <i>Ma\'lumotlar bazasiz rejim — profil ma\'lumotlarini ko\'rish uchun veb-panelga kiring.</i>',

    // ── Auth ──────────────────────────────────────────────
    admin_only: '❌ Bu buyruq faqat adminlar uchun. /start orqali botdan foydalaning.',

    // ── Admin Commands ────────────────────────────────────
    admin_menu: "🏠 Menyu",
    admin_menu_title: "Admin panel",
    admin_menu_desc: "Quyidagi bo'limlardan birini tanlang:",
    admin_stats: "📊 Statistika",
    admin_users: "👥 Foydalanuvchilar",
    admin_view_applications: "📋 Arizalar",
    admin_broadcast: "📢 Xabar yuborish",
    admin_open_panel: "🌐 Veb-panel",
    admin_refresh: "Yangilash",
    admin_applications: "Arizalar",
    admin_apps_desc: "Barcha arizalarni veb-panelda ko'ring va boshqaring.",

    // ── Stats ─────────────────────────────────────────────
    stats_title: "Bot statistikasi",
    stats_total_applications: "Jami arizalar",
    stats_pending: "Kutilayotgan",
    stats_contacted: "Bog'lanilgan",
    stats_approved: "Qabul qilingan",
    stats_rejected: "Rad etilgan",
    stats_users: "Foydalanuvchilar",
    stats_pages: "Sahifalar",

    // ── Users ─────────────────────────────────────────────
    users_title: "Foydalanuvchilar",
    users_total: "Jami foydalanuvchilar",
    users_applications: "Arizalar soni",
    users_approved: "Qabul qilingan",
    users_rejected: "Rad etilgan",
    users_pending: "Kutilayotgan",

    // ── Broadcast ─────────────────────────────────────────
    broadcast_usage: "📢 Xabar yuborish uchun:\n/broadcast <matn>",
    broadcast_usage_detail: "Barcha foydalanuvchilarga xabar yuborish uchun /broadcast buyrug'ini ishlating.\n\nMisol:\n/broadcast Hurmatli foydalanuvchilar! Yangi kurslar ochildi!",
    broadcast_start: "Xabar yuborilmoqda...",
    broadcast_header: "📢 Admin xabari",
    broadcast_done: "Xabar yuborildi",
    broadcast_sent: "Yuborilgan",
    broadcast_failed: "Xatolik",

    // ── User notifications on status change ───────────────
    application_status_approved: "Arizangiz qabul qilindi!",
    application_approved_text: "Tabriklaymiz! Arizangiz muvaffaqiyatli qabul qilindi. Tez orada administratorlarimiz siz bilan bog'lanishadi.",
    application_status_rejected: "Arizangiz rad etildi",
    application_rejected_text: "Afsuski, arizangiz rad etildi. Batafsil ma'lumot olish uchun administrator bilan bog'laning.",
    application_status_pending: "Arizangiz ko'rib chiqilmoqda",
    application_pending_text: "Arizangiz qayta ko'rib chiqish uchun ochildi. Tez orada natija haqida xabar beramiz.",
    application_status_contacted: "Arizangiz ko'rib chiqilmoqda",
    application_contacted_text: "📞 Hayrli kun!\n\nJamoamiz arizangizni ko'rib chiqdi va tez orada siz bilan bog'lanadi.",

    // ── CRM Premium Cards ─────────────────────────────────
    premium_card_divider: "━━━━━━━━━━━━━━━━━━",
    premium_card_title_new: "📝 YANGI ARIZA",
    premium_card_title_important: "⭐ MUHIM ARIZA",
    premium_card_name: "👤 Ism",
    premium_card_phone: "📞 Telefon",
    premium_card_region: "🌍 Viloyat",
    premium_card_school: "🏫 Tuman",
    premium_card_course: "📚 Kurs",
    premium_card_message: "💬 Xabar",
    premium_card_user_id: "🆔 Foydalanuvchi ID",
    premium_card_username: "👤 Username",
    premium_card_date: "📅 Sana",
    premium_card_priority: "⭐ Priority",
    premium_card_status: "📍 Holat",

    // ── CRM Contacted ─────────────────────────────────────
    crm_contacted: "📞 Bog'lanish",
    crm_contacted_title: "📞 BOG'LANDI",
    contacted_by: "👤 Bog'landi:",
    contacted_at: "🕒 Bog'langanda:",
    crm_contacted_notification: "📞 Hayrli kun!\n\nJamoamiz arizangizni ko'rib chiqdi va tez orada siz bilan bog'lanadi.",

    // ── CRM Important ─────────────────────────────────────
    crm_important: "⭐ Muhim",
    crm_unimportant: "⭐ Muhim emas",
    important_title: "⭐ MUHIM ARIZALAR",
    important_marked: "⭐ Muhim deb belgilandi",
    important_unmarked: "Muhim status olib tashlandi",
    important_applications: "⭐ Muhim arizalar",

    // ── CRM Reminder ──────────────────────────────────────
    crm_reminder: "⏰ Eslatma",
    reminder_time_prompt: "Qachon eslatma kerak?\n\nNamunalar:\n30m - 30 daqiqa\n1h - 1 soat\n3h - 3 soat\nTomorrow 09:00 - Ertaga 09:00",
    reminder_time_examples: "30m, 1h, 3h, Tomorrow 09:00",
    reminder_invalid: "❌ Noto'g'ri vaqt formati. Iltimos, qayta urinib ko'ring.\n\nNamunalar: 30m, 1h, 3h, Tomorrow 09:00",
    reminder_saved: "✅ Eslatma saqlandi!",
    reminder_trigger_title: "🔔 ESLATMA",
    reminder_name: "Ism:",
    reminder_phone: "Telefon:",
    reminder_status: "Holat:",
    duplicate_reminder: "⚠️ Ushbu ariza uchun eslatma allaqachon mavjud.",

    // ── CRM History ───────────────────────────────────────
    crm_history: "📝 Tarix",
    history_title: "📝 Tarix",
    history_no_entries: "Hali hech qanday harakat mavjud emas.",
    history_received: "Ariza qabul qilindi",
    history_important: "⭐ Muhim deb belgilandi",
    history_contacted: "📞 Bog'landi",
    history_note: "✍️ Izoh qo'shildi",
    history_accepted: "✅ Qabul qilindi",
    history_rejected: "❌ Rad etildi",
    history_pending: "⏳ Kutilmoqda",
    history_reminder: "⏰ Eslatma o'rnatildi",
    history_status_changed: "Holat o'zgartirildi",

    // ── CRM Notes ─────────────────────────────────────────
    crm_add_note: "✍️ Izoh qo'shish",
    admin_note_title: "📝 Admin izohi",

    // ── CRM Profile ───────────────────────────────────────
    crm_profile: "🔍 Profil",
    crm_copy_id: "📋 ID nusxalash",
    id_copied: "✅ ID nusxalandi!",

    // ── Duplicate Protection ──────────────────────────────
    duplicate_action: "⚠️ Bu amal allaqachon bajarilgan.",
    already_accepted: "⚠️ Ariza allaqachon qabul qilingan.",
    already_rejected: "⚠️ Ariza allaqachon rad etilgan.",
    already_contacted: "⚠️ Ariza allaqachon bog'langan deb belgilangan.",

    // ── Search ────────────────────────────────────────────
    search_title: "🔍 Qidirish",
    search_usage: "/search <ism, telefon, ID yoki username>",
    search_prompt: "Qidirish uchun matn kiriting:",
    no_results: "Natija topilmadi.",
    search_results: "Qidiruv natijalari:",
    search_by_name: "Ism",
    search_by_phone: "Telefon",
    search_by_id: "ID",
    search_by_username: "Username",

    // ── Filters ───────────────────────────────────────────
    filter_pending: "⏳ Kutilayotgan",
    filter_contacted: "📞 Bog'lanilgan",
    filter_accepted: "✅ Qabul qilingan",
    filter_rejected: "❌ Rad etilgan",
    filter_today: "📅 Bugungi",
    filter_important: "⭐ Muhim",
    filter_region: "🌍 Viloyat",
    filter_course: "📚 Kurs",
    filter_no_results: "Ushbu filtr bo'yicha arizalar topilmadi.",

    // ── Admin Action Logs ────────────────────────────────
    admin_log_accepted: "Admin arizani qabul qildi",
    admin_log_rejected: "Admin arizani rad etdi",
    admin_log_contacted: "Admin bog'lanishni belgiladi",
    admin_log_important: "Admin muhim deb belgiladi",
    admin_log_reminder: "Admin eslatma yaratdi",
    admin_log_note: "Admin izoh qo'shdi",
    admin_log_history: "Tarix yangilandi",

    // ── /important command ────────────────────────────────
    important_empty: "⭐ Hozircha muhim arizalar mavjud emas.",
    important_count: "Jami muhim arizalar:",
  },

  ru: {
    // ── Language selection ────────────────────────────────
    language_select: 'Выберите язык:',

    // ── Generic / Errors ──────────────────────────────────
    error_generic: '❌ Произошла ошибка.',
    error_generic_with_start: '❌ Произошла ошибка. Пожалуйста, попробуйте снова (/start).',
    error_try_later: 'Произошла ошибка. Попробуйте позже.',
    error_try_later_short: '❌ Произошла ошибка. Пожалуйста, попробуйте позже.',
    profile_load_error: '❌ Не удалось загрузить профиль',

    // ── Contact / Phone ───────────────────────────────────
    contact_request: 'Пожалуйста, отправьте свой номер телефона:',
    contact_request_hint: 'Пожалуйста, нажмите кнопку ниже, чтобы отправить номер телефона, или введите номер текстом:',
    contact_request_simple: 'Пожалуйста, отправьте свой номер телефона.',
    contact_button: '📱 Отправить номер',
    invalid_phone: 'Пожалуйста, отправьте свой номер телефона.',

    // ── Region ────────────────────────────────────────────
    select_region: 'Выберите регион:',
    no_regions: 'Пока нет доступных регионов.',

    // ── District ──────────────────────────────────────────
    select_district: 'Выберите район:',
    no_districts: 'В этом регионе нет районов.',

    // ── Course ────────────────────────────────────────────
    select_course: 'Выберите курс:',
    no_courses: 'Пока нет доступных курсов.',

    // ── Shift ─────────────────────────────────────────────
    select_shift: 'Выберите время обучения:',
    shift_morning: '🌞 Утро (09:00 - 12:00)',
    shift_afternoon: '🌤 День (14:00 - 17:00)',
    shift_evening: '🌙 Вечер (18:00 - 21:00)',

    // ── Age ───────────────────────────────────────────────
    age_prompt: 'Введите ваш возраст (Например: 18):',
    invalid_age: 'Пожалуйста, введите правильный возраст (5-99):',

    // ── Experience ────────────────────────────────────────
    experience_prompt: 'У вас есть опыт в этой сфере? (Например: Нет, 1 год):',

    // ── Device (laptop) ───────────────────────────────────
    device_prompt: 'У вас есть личный ноутбук для учебы?',
    device_yes: 'Да, есть',
    device_no: 'Нет',
    device_yes_short: 'Да',
    device_no_short: 'Нет',

    // ── Note ──────────────────────────────────────────────
    note_prompt: 'Напишите дополнительный комментарий или вопрос (если нет, отправьте "-"):',
    note_write_prompt: 'Пожалуйста, отправьте ваш комментарий в виде текста (для отмены нажмите /cancel):',
    note_cancelled: 'Отменено.',
    note_saved: '✅ Комментарий успешно сохранен.',
    note_non_text: 'Пожалуйста, отправьте комментарий в виде текста.',

    // ── Confirmation ──────────────────────────────────────
    confirm_title: 'Подтвердите ваши данные:',
    label_phone: '📞 Телефон',
    label_shift: '🕒 Время',
    label_age: '🎂 Возраст',
    label_experience: '💡 Опыт',
    label_laptop: '💻 Ноутбук',
    label_note: '📝 Комментарий',
    confirm_question: 'Все данные верны?',
    confirm_button: '✅ Подтвердить',
    cancel_button: '❌ Отмена',
    cancel_done: 'Заявка отменена. Нажмите /start, чтобы начать заново.',
    please_use_buttons: 'Пожалуйста, нажмите одну из кнопок ниже.',

    // ── Final ─────────────────────────────────────────────
    success_message: '✅ Ваша заявка успешно принята! Наши администраторы свяжутся с вами в ближайшее время.',
    duplicate_application: '❌ Вы уже подали заявку на этот курс. Пожалуйста, ожидайте результата.',
    first_name_fallback: 'Имя',
    last_name_fallback: 'Фамилия',

    // ── CRM Status Labels ─────────────────────────────────
    status_approved: '✅ Статус: ПРИНЯТО',
    status_rejected: '❌ Статус: ОТКЛОНЕНО',
    status_pending: '⏳ Статус: ОЖИДАНИЕ',
    status_contacted: '🔵 Статус: СВЯЗАНЫ',
    approved: '✅ Принято',
    rejected: '❌ Отклонено',
    pending: '⏳ В ожидании',
    contacted: '🔵 Связаны',

    // ── Admin Notifications ───────────────────────────────
    new_application_title: '🆕 <b>Новая заявка! (offline)</b>',
    application_id: 'ID заявки',
    status: 'Статус',
    no_db_hint: '<i>Режим без базы данных — для просмотра деталей войдите в веб-панель.</i>',
    crm_accept: '✅ Принять',
    crm_reject: '❌ Отклонить',
    crm_reply: '💬 Ответить',
    student_profile: '👤 <b>Профиль ученика</b>',
    profile_no_db_hint: '📋 <i>Режим без базы данных — для просмотра данных профиля войдите в веб-панель.</i>',

    // ── Auth ──────────────────────────────────────────────
    admin_only: '❌ Эта команда только для администраторов. Используйте /start для использования бота.',

    // ── Admin Commands ────────────────────────────────────
    admin_menu: "🏠 Меню",
    admin_menu_title: "Админ панель",
    admin_menu_desc: "Выберите один из разделов:",
    admin_stats: "📊 Статистика",
    admin_users: "👥 Пользователи",
    admin_view_applications: "📋 Заявки",
    admin_broadcast: "📢 Отправить",
    admin_open_panel: "🌐 Веб-панель",
    admin_refresh: "Обновить",
    admin_applications: "Заявки",
    admin_apps_desc: "Просматривайте и управляйте заявками в веб-панели.",

    // ── Stats ─────────────────────────────────────────────
    stats_title: "Статистика бота",
    stats_total_applications: "Всего заявок",
    stats_pending: "В ожидании",
    stats_contacted: "Связались",
    stats_approved: "Принятых",
    stats_rejected: "Отклоненных",
    stats_users: "Пользователей",
    stats_pages: "Страниц",

    // ── Users ─────────────────────────────────────────────
    users_title: "Пользователи",
    users_total: "Всего пользователей",
    users_applications: "Количество заявок",
    users_approved: "Принятых",
    users_rejected: "Отклоненных",
    users_pending: "В ожидании",

    // ── Broadcast ─────────────────────────────────────────
    broadcast_usage: "📢 Чтобы отправить сообщение:\n/broadcast <текст>",
    broadcast_usage_detail: "Используйте /broadcast для отправки сообщения всем пользователям.\n\nПример:\n/broadcast Уважаемые пользователи! Открыты новые курсы!",
    broadcast_start: "Отправка сообщения...",
    broadcast_header: "📢 Сообщение от администрации",
    broadcast_done: "Сообщение отправлено",
    broadcast_sent: "Отправлено",
    broadcast_failed: "Ошибок",

    // ── User notifications on status change ───────────────
    application_status_approved: "Ваша заявка принята!",
    application_approved_text: "Поздравляем! Ваша заявка успешно принята. Наши администраторы свяжутся с вами в ближайшее время.",
    application_status_rejected: "Ваша заявка отклонена",
    application_rejected_text: "К сожалению, ваша заявка отклонена. Для получения подробной информации обратитесь к администратору.",
    application_status_pending: "Ваша заявка рассматривается",
    application_pending_text: "Ваша заявка открыта для повторного рассмотрения. Скоро сообщим о результате.",
    application_status_contacted: "Ваша заявка рассматривается",
    application_contacted_text: "📞 Здравствуйте!\n\nНаша команда рассмотрела вашу заявку и свяжется с вами в ближайшее время.",

    // ── CRM Premium Cards ─────────────────────────────────
    premium_card_divider: "━━━━━━━━━━━━━━━━━━",
    premium_card_title_new: "📝 НОВАЯ ЗАЯВКА",
    premium_card_title_important: "⭐ ВАЖНАЯ ЗАЯВКА",
    premium_card_name: "👤 Имя",
    premium_card_phone: "📞 Телефон",
    premium_card_region: "🌍 Регион",
    premium_card_school: "🏫 Район",
    premium_card_course: "📚 Курс",
    premium_card_message: "💬 Сообщение",
    premium_card_user_id: "🆔 ID пользователя",
    premium_card_username: "👤 Username",
    premium_card_date: "📅 Дата",
    premium_card_priority: "⭐ Приоритет",
    premium_card_status: "📍 Статус",

    // ── CRM Contacted ─────────────────────────────────────
    crm_contacted: "📞 Связаться",
    crm_contacted_title: "📞 СВЯЗАНЫ",
    contacted_by: "👤 Связался:",
    contacted_at: "🕒 Время связи:",
    crm_contacted_notification: "📞 Здравствуйте!\n\nНаша команда рассмотрела вашу заявку и свяжется с вами в ближайшее время.",

    // ── CRM Important ─────────────────────────────────────
    crm_important: "⭐ Важно",
    crm_unimportant: "⭐ Не важно",
    important_title: "⭐ ВАЖНЫЕ ЗАЯВКИ",
    important_marked: "⭐ Отмечено как важное",
    important_unmarked: "Важность снята",
    important_applications: "⭐ Важные заявки",

    // ── CRM Reminder ──────────────────────────────────────
    crm_reminder: "⏰ Напоминание",
    reminder_time_prompt: "Когда напомнить?\n\nПримеры:\n30m - 30 минут\n1h - 1 час\n3h - 3 часа\nTomorrow 09:00 - Завтра 09:00",
    reminder_time_examples: "30m, 1h, 3h, Tomorrow 09:00",
    reminder_invalid: "❌ Неверный формат времени. Пожалуйста, попробуйте снова.\n\nПримеры: 30m, 1h, 3h, Tomorrow 09:00",
    reminder_saved: "✅ Напоминание сохранено!",
    reminder_trigger_title: "🔔 НАПОМИНАНИЕ",
    reminder_name: "Имя:",
    reminder_phone: "Телефон:",
    reminder_status: "Статус:",
    duplicate_reminder: "⚠️ Напоминание для этой заявки уже существует.",

    // ── CRM History ───────────────────────────────────────
    crm_history: "📝 История",
    history_title: "📝 История",
    history_no_entries: "История действий отсутствует.",
    history_received: "Заявка получена",
    history_important: "⭐ Отмечено важным",
    history_contacted: "📞 Связались",
    history_note: "✍️ Добавлен комментарий",
    history_accepted: "✅ Принято",
    history_rejected: "❌ Отклонено",
    history_pending: "⏳ В ожидании",
    history_reminder: "⏰ Установлено напоминание",
    history_status_changed: "Статус изменен",

    // ── CRM Notes ─────────────────────────────────────────
    crm_add_note: "✍️ Добавить комментарий",
    admin_note_title: "📝 Комментарий администратора",

    // ── CRM Profile ───────────────────────────────────────
    crm_profile: "🔍 Профиль",
    crm_copy_id: "📋 Копировать ID",
    id_copied: "✅ ID скопирован!",

    // ── Duplicate Protection ──────────────────────────────
    duplicate_action: "⚠️ Это действие уже выполнено.",
    already_accepted: "⚠️ Заявка уже принята.",
    already_rejected: "⚠️ Заявка уже отклонена.",
    already_contacted: "⚠️ Заявка уже отмечена как связанная.",

    // ── Search ────────────────────────────────────────────
    search_title: "🔍 Поиск",
    search_usage: "/search <имя, телефон, ID или username>",
    search_prompt: "Введите текст для поиска:",
    no_results: "Результатов не найдено.",
    search_results: "Результаты поиска:",
    search_by_name: "Имя",
    search_by_phone: "Телефон",
    search_by_id: "ID",
    search_by_username: "Username",

    // ── Filters ───────────────────────────────────────────
    filter_pending: "⏳ В ожидании",
    filter_contacted: "📞 Связались",
    filter_accepted: "✅ Принятые",
    filter_rejected: "❌ Отклоненные",
    filter_today: "📅 Сегодня",
    filter_important: "⭐ Важные",
    filter_region: "🌍 Регион",
    filter_course: "📚 Курс",
    filter_no_results: "По данному фильтру заявки не найдены.",

    // ── Admin Action Logs ────────────────────────────────
    admin_log_accepted: "Админ принял заявку",
    admin_log_rejected: "Админ отклонил заявку",
    admin_log_contacted: "Админ отметил связь",
    admin_log_important: "Админ отметил как важное",
    admin_log_reminder: "Админ создал напоминание",
    admin_log_note: "Админ добавил комментарий",
    admin_log_history: "История обновлена",

    // ── /important command ────────────────────────────────
    important_empty: "⭐ Нет важных заявок.",
    important_count: "Всего важных заявок:",
  },

  en: {
    // ── Language selection ────────────────────────────────
    language_select: 'Select language:',

    // ── Generic / Errors ──────────────────────────────────
    error_generic: '❌ An error occurred.',
    error_generic_with_start: '❌ An error occurred. Please try again (/start).',
    error_try_later: 'An error occurred. Please try again later.',
    error_try_later_short: '❌ An error occurred. Please try again later.',
    profile_load_error: '❌ Failed to load profile',

    // ── Contact / Phone ───────────────────────────────────
    contact_request: 'Please share your phone number:',
    contact_request_hint: 'Please press the button below to share your phone number, or type it in manually:',
    contact_request_simple: 'Please send your phone number.',
    contact_button: '📱 Send number',
    invalid_phone: 'Please send your phone number.',

    // ── Region ────────────────────────────────────────────
    select_region: 'Select region:',
    no_regions: 'No regions available at the moment.',

    // ── District ──────────────────────────────────────────
    select_district: 'Select district:',
    no_districts: 'No districts found in this region.',

    // ── Course ────────────────────────────────────────────
    select_course: 'Select course:',
    no_courses: 'No courses available at the moment.',

    // ── Shift ─────────────────────────────────────────────
    select_shift: 'Select study time:',
    shift_morning: '🌞 Morning (09:00 - 12:00)',
    shift_afternoon: '🌤 Afternoon (14:00 - 17:00)',
    shift_evening: '🌙 Evening (18:00 - 21:00)',

    // ── Age ───────────────────────────────────────────────
    age_prompt: 'Enter your age (Example: 18):',
    invalid_age: 'Please enter a valid age (5-99):',

    // ── Experience ────────────────────────────────────────
    experience_prompt: 'Do you have experience in this field? (Example: No, 1 year):',

    // ── Device (laptop) ───────────────────────────────────
    device_prompt: 'Do you have a personal laptop for studying?',
    device_yes: 'Yes, I do',
    device_no: 'No',
    device_yes_short: 'Yes',
    device_no_short: 'No',

    // ── Note ──────────────────────────────────────────────
    note_prompt: 'Write any additional comments or questions (send "-" if none):',
    note_write_prompt: 'Please send your note as text (send /cancel to cancel):',
    note_cancelled: 'Cancelled.',
    note_saved: '✅ Note saved successfully.',
    note_non_text: 'Please send the note as text.',

    // ── Confirmation ──────────────────────────────────────
    confirm_title: 'Confirm your information:',
    label_phone: '📞 Phone',
    label_shift: '🕒 Time',
    label_age: '🎂 Age',
    label_experience: '💡 Experience',
    label_laptop: '💻 Laptop',
    label_note: '📝 Note',
    confirm_question: 'Is all the information correct?',
    confirm_button: '✅ Confirm',
    cancel_button: '❌ Cancel',
    cancel_done: 'Application cancelled. Press /start to start over.',
    please_use_buttons: 'Please press one of the buttons below.',

    // ── Final ─────────────────────────────────────────────
    success_message: '✅ Your application has been accepted! Our administrators will contact you shortly.',
    duplicate_application: '❌ You have already applied for this course. Please wait for the result.',
    first_name_fallback: 'First Name',
    last_name_fallback: 'Last Name',

    // ── CRM Status Labels ─────────────────────────────────
    status_approved: '✅ Status: APPROVED',
    status_rejected: '❌ Status: REJECTED',
    status_pending: '⏳ Status: PENDING',
    status_contacted: '🔵 Status: CONTACTED',
    approved: '✅ Approved',
    rejected: '❌ Rejected',
    pending: '⏳ Pending',
    contacted: '🔵 Contacted',

    // ── Admin Notifications ───────────────────────────────
    new_application_title: '🆕 <b>New Application! (offline)</b>',
    application_id: 'Application ID',
    status: 'Status',
    no_db_hint: '<i>No-database mode — view details in the web panel.</i>',
    crm_accept: '✅ Accept',
    crm_reject: '❌ Reject',
    crm_reply: '💬 Reply',
    student_profile: '👤 <b>Student Profile</b>',
    profile_no_db_hint: '📋 <i>No-database mode — view profile details in the web panel.</i>',

    // ── Auth ──────────────────────────────────────────────
    admin_only: '❌ This command is for admins only. Use /start to use the bot.',

    // ── Admin Commands ────────────────────────────────────
    admin_menu: "🏠 Menu",
    admin_menu_title: "Admin Panel",
    admin_menu_desc: "Select one of the sections below:",
    admin_stats: "📊 Statistics",
    admin_users: "👥 Users",
    admin_view_applications: "📋 Applications",
    admin_broadcast: "📢 Broadcast",
    admin_open_panel: "🌐 Web Panel",
    admin_refresh: "Refresh",
    admin_applications: "Applications",
    admin_apps_desc: "View and manage all applications in the web panel.",

    // ── Stats ─────────────────────────────────────────────
    stats_title: "Bot Statistics",
    stats_total_applications: "Total Applications",
    stats_pending: "Pending",
    stats_contacted: "Contacted",
    stats_approved: "Approved",
    stats_rejected: "Rejected",
    stats_users: "Users",
    stats_pages: "Pages",

    // ── Users ─────────────────────────────────────────────
    users_title: "Users",
    users_total: "Total Users",
    users_applications: "Applications",
    users_approved: "Approved",
    users_rejected: "Rejected",
    users_pending: "Pending",

    // ── Broadcast ─────────────────────────────────────────
    broadcast_usage: "📢 To send a message:\n/broadcast <text>",
    broadcast_usage_detail: "Use /broadcast to send a message to all users.\n\nExample:\n/broadcast Dear users! New courses are now open!",
    broadcast_start: "Sending message...",
    broadcast_header: "📢 Admin Message",
    broadcast_done: "Broadcast sent",
    broadcast_sent: "Sent",
    broadcast_failed: "Failed",

    // ── User notifications on status change ───────────────
    application_status_approved: "Your application has been approved!",
    application_approved_text: "Congratulations! Your application has been approved. Our administrators will contact you shortly.",
    application_status_rejected: "Your application has been rejected",
    application_rejected_text: "Unfortunately, your application has been rejected. Please contact the administrator for more information.",
    application_status_pending: "Your application is under review",
    application_pending_text: "Your application has been reopened for review. We will notify you of the result soon.",
    application_status_contacted: "Your application is under review",
    application_contacted_text: "📞 Hello!\n\nOur team has reviewed your application and will contact you shortly.",

    // ── CRM Premium Cards ─────────────────────────────────
    premium_card_divider: "━━━━━━━━━━━━━━━━━━",
    premium_card_title_new: "📝 NEW APPLICATION",
    premium_card_title_important: "⭐ IMPORTANT APPLICATION",
    premium_card_name: "👤 Name",
    premium_card_phone: "📞 Phone",
    premium_card_region: "🌍 Region",
    premium_card_school: "🏫 District",
    premium_card_course: "📚 Course",
    premium_card_message: "💬 Message",
    premium_card_user_id: "🆔 User ID",
    premium_card_username: "👤 Username",
    premium_card_date: "📅 Date",
    premium_card_priority: "⭐ Priority",
    premium_card_status: "📍 Status",

    // ── CRM Contacted ─────────────────────────────────────
    crm_contacted: "📞 Contacted",
    crm_contacted_title: "📞 CONTACTED",
    contacted_by: "👤 Contacted by:",
    contacted_at: "🕒 Contacted at:",
    crm_contacted_notification: "📞 Hello!\n\nOur team has reviewed your application and will contact you shortly.",

    // ── CRM Important ─────────────────────────────────────
    crm_important: "⭐ Important",
    crm_unimportant: "⭐ Not Important",
    important_title: "⭐ IMPORTANT APPLICATIONS",
    important_marked: "⭐ Marked as important",
    important_unmarked: "Important status removed",
    important_applications: "⭐ Important applications",

    // ── CRM Reminder ──────────────────────────────────────
    crm_reminder: "⏰ Reminder",
    reminder_time_prompt: "When should I remind you?\n\nExamples:\n30m - 30 minutes\n1h - 1 hour\n3h - 3 hours\nTomorrow 09:00",
    reminder_time_examples: "30m, 1h, 3h, Tomorrow 09:00",
    reminder_invalid: "❌ Invalid time format. Please try again.\n\nExamples: 30m, 1h, 3h, Tomorrow 09:00",
    reminder_saved: "✅ Reminder saved!",
    reminder_trigger_title: "🔔 REMINDER",
    reminder_name: "Name:",
    reminder_phone: "Phone:",
    reminder_status: "Status:",
    duplicate_reminder: "⚠️ A reminder already exists for this application.",

    // ── CRM History ───────────────────────────────────────
    crm_history: "📝 History",
    history_title: "📝 History",
    history_no_entries: "No history entries yet.",
    history_received: "Application received",
    history_important: "⭐ Marked Important",
    history_contacted: "📞 Contacted",
    history_note: "✍️ Note added",
    history_accepted: "✅ Accepted",
    history_rejected: "❌ Rejected",
    history_pending: "⏳ Pending",
    history_reminder: "⏰ Reminder set",
    history_status_changed: "Status changed",

    // ── CRM Notes ─────────────────────────────────────────
    crm_add_note: "✍️ Add Note",
    admin_note_title: "📝 Admin Note",

    // ── CRM Profile ───────────────────────────────────────
    crm_profile: "🔍 Profile",
    crm_copy_id: "📋 Copy ID",
    id_copied: "✅ ID copied!",

    // ── Duplicate Protection ──────────────────────────────
    duplicate_action: "⚠️ This action has already been completed.",
    already_accepted: "⚠️ Application already accepted.",
    already_rejected: "⚠️ Application already rejected.",
    already_contacted: "⚠️ Application already marked as contacted.",

    // ── Search ────────────────────────────────────────────
    search_title: "🔍 Search",
    search_usage: "/search <name, phone, ID or username>",
    search_prompt: "Enter search text:",
    no_results: "No results found.",
    search_results: "Search results:",
    search_by_name: "Name",
    search_by_phone: "Phone",
    search_by_id: "ID",
    search_by_username: "Username",

    // ── Filters ───────────────────────────────────────────
    filter_pending: "⏳ Pending",
    filter_contacted: "📞 Contacted",
    filter_accepted: "✅ Accepted",
    filter_rejected: "❌ Rejected",
    filter_today: "📅 Today",
    filter_important: "⭐ Important",
    filter_region: "🌍 Region",
    filter_course: "📚 Course",
    filter_no_results: "No applications found for this filter.",

    // ── Admin Action Logs ────────────────────────────────
    admin_log_accepted: "Admin accepted application",
    admin_log_rejected: "Admin rejected application",
    admin_log_contacted: "Admin marked as contacted",
    admin_log_important: "Admin marked as important",
    admin_log_reminder: "Admin created reminder",
    admin_log_note: "Admin added note",
    admin_log_history: "History updated",

    // ── /important command ────────────────────────────────
    important_empty: "⭐ No important applications yet.",
    important_count: "Total important applications:",
  },
};

// ── Helper: t(lang, key) ───────────────────────────────────────────
// Defaults to Uzbek if lang is not provided or key is missing.
export function t(lang: string | undefined, key: string): string {
  const normalizedLang = (lang === 'uz' || lang === 'ru' || lang === 'en') ? lang : 'uz';
  return translations[normalizedLang]?.[key] ?? translations.uz[key] ?? key;
}
