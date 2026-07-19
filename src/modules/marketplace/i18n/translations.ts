/**
 * src/modules/marketplace/i18n/translations.ts
 * Gaming marketplace translations for FreeBuff Telegram bot.
 * Supports: Uzbek (uz), Russian (ru), English (en)
 */
import type { LangCode } from '../types';

type TranslationMap = Record<string, string>;
type TranslationsDict = Record<LangCode, TranslationMap>;

const translations: TranslationsDict = {
  uz: {
    // ── Welcome & Main Menu ────────────────────────────────
    welcome: '🎮 <b>FreeBuff Gaming Marketplace</b> ga xush kelibsiz!',
    welcome_back: '🎮 <b>FreeBuff Gaming Marketplace</b> ga qaytib kelganingizdan xursandmiz!',
    main_menu: '🎮 <b>FreeBuff Gaming</b>\n\nQuyidagi bo\'limlardan birini tanlang:',
    choose_option: 'Quyidagi variantlardan birini tanlang:',
    error_generic: '❌ Xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.',

    // ── Buttons ─────────────────────────────────────────────
    btn_buy: '🛒 Buyurtma berish',
    btn_prices: '💰 Narxlar',
    btn_my_orders: '📦 Mening buyurtmalarim',
    btn_reviews: '⭐ Sharhlar',
    btn_news: '📢 Yangiliklar',
    btn_profile: '👤 Profil',
    btn_language: '🌍 Til',
    btn_support: '☎ Qo\'llab-quvvatlash',
    btn_back: '🔙 Orqaga',
    btn_main_menu: '🏠 Asosiy menyu',
    btn_confirm: '✅ Tasdiqlash',
    btn_cancel: '❌ Bekor qilish',
    btn_skip: '⏭ O\'tkazib yuborish',
    btn_next: '➡️ Keyingi',
    btn_prev: '⬅️ Oldingi',

    // ── Buy Service Flow ────────────────────────────────────
    select_game: '🎮 <b>O\'yinni tanlang:</b>',
    select_service: '📦 <b>Xizmatni tanlang:</b>',
    enter_quantity: '🔢 <b>Miqdorni kiriting:</b>\n\nMasalan: 1, 5, 10',
    invalid_quantity: '❌ Iltimos, to\'g\'ri son kiriting (1-9999):',
    enter_username: '👤 <b>O\'yin ichidagi username/ID:</b>',
    select_platform: '📱 <b>Platformani tanlang:</b>',
    enter_notes: '📝 <b>Qo\'shimcha izoh:</b>\n\n(Ixtiyoriy, agar yo\'q bo\'lsa "-" yuboring)',
    promo_code_prompt: '🎟 <b>Promo kodingiz bormi?</b>\n\n(Agar yo\'q bo\'lsa, "0" yuboring)',
    invalid_promo: '❌ Promo kod topilmadi yoki muddati o\'tgan.',

    // ── Order Summary ───────────────────────────────────────
    order_summary: '━━━━━━━━━━━━━━━━━━\n📋 <b>BUYURTMA MA\'LUMOTLARI</b>\n━━━━━━━━━━━━━━━━━━\n\n🎮 <b>O\'yin:</b> {game}\n📦 <b>Xizmat:</b> {service}\n🔢 <b>Miqdor:</b> {quantity}\n👤 <b>Username:</b> {username}\n📱 <b>Platforma:</b> {platform}\n📝 <b>Izoh:</b> {notes}\n{priceLine}\n\nHamma ma\'lumotlar to\'g\'rimi?',
    order_price_line: '💰 <b>Narx:</b> ${price}\n{promoLine}',
    promo_applied: '🎟 <b>Promo:</b> {code} (-{discount}%)',
    no_promo: '',

    // ── Order Confirmation ──────────────────────────────────
    order_placed: '✅ <b>Buyurtmangiz qabul qilindi!</b>\n\nBuyurtma ID: <code>{orderId}</code>\n\nBuyurtmangiz tez orada ko\'rib chiqiladi. Adminlarimiz siz bilan bog\'lanadi.',
    order_cancelled: '❌ Buyurtma bekor qilindi.',

    // ── My Orders ───────────────────────────────────────────
    my_orders_title: '📦 <b>Mening buyurtmalarim</b>',
    no_orders: 'Sizda hali buyurtmalar yo\'q.',
    orders_page: '📦 <b>Buyurtmalar</b> ({current}/{total})',
    order_card: '━━━━━━━━━━━━━━━━━━\n🆔 <b>#{orderId}</b> | {statusEmoji} {status}\n━━━━━━━━━━━━━━━━━━\n\n🎮 {game}\n📦 {service}\n🔢 {quantity}×\n👤 {username}\n📱 {platform}\n📅 {date}\n\n{notesLine}\n{priceLine}',
    show_details: '📋 Batafsil',

    // ── Prices ──────────────────────────────────────────────
    prices_title: '💰 <b>Xizmatlar narxlari</b>',
    price_item: '{emoji} <b>{name}</b>\n└ {description}\n└ Narx: ${price}/donasiga\n',

    // ── Profile ─────────────────────────────────────────────
    profile_title: '👤 <b>Mening profilim</b>',
    profile_info: '━━━━━━━━━━━━━━━━━━\n👤 <b>Profil</b>\n━━━━━━━━━━━━━━━━━━\n\n🆔 ID: <code>{userId}</code>\n📛 Nome: {name}\n👥 Referallar: {referrals}\n💰 Balans: ${balance}\n📦 Jami buyurtmalar: {totalOrders}\n✅ Bajarilgan: {completedOrders}\n⏳ Kutilayotgan: {pendingOrders}\n📅 Ro\'yxatdan o\'tgan: {date}\n🌍 Til: {language}',
    referral_link: '🔗 <b>Referal havolangiz:</b>\n<code>{link}</code>\n\nReferal tizimi: har bir do\'stingiz buyurtma berganida 10% bonus olasiz!',

    // ── Reviews ─────────────────────────────────────────────
    reviews_title: '⭐ <b>Sharhlar</b>',
    no_reviews: 'Hali sharhlar yo\'q.',
    review_card: '⭐ {rating}/5 — <b>{name}</b>\n└ {text}\n└ {date}\n',
    review_request: '⭐ <b>Buyurtmangiz bajarildi!</b>\n\nIltimos, {service} xizmati uchun baho bering (1-5):',
    review_thanks: '✅ Sharhingiz uchun rahmat! Sharh moderator tomonidan tekshiriladi.',
    review_invalid_rating: '❌ Iltimos, 1 dan 5 gacha baho bering.',

    // ── Support ─────────────────────────────────────────────
    support_message: '☎ <b>Qo\'llab-quvvatlash</b>\n\nSavollaringiz bormi? Adminlarimiz bilan bog\'laning:\n\n👤 @freebuff_support\n📧 support@freebuff.com\n\nYoki /new_order orqali buyurtma yarating.',

    // ── News ────────────────────────────────────────────────
    news_title: '📢 <b>Yangiliklar</b>',
    no_news: 'Hozircha yangiliklar yo\'q.',

    // ── Language ────────────────────────────────────────────
    language_select: '🌍 <b>Tilni tanlang:</b>',
    language_changed: '✅ Til {lang} ga o\'zgartirildi!',

    // ── Status Labels ───────────────────────────────────────
    status_pending: '🟡 Kutilmoqda',
    status_accepted: '🔵 Qabul qilindi',
    status_in_progress: '🟠 Jarayonda',
    status_completed: '🟢 Bajarildi',
    status_rejected: '🔴 Rad etildi',
    status_cancelled: '⚪ Bekor qilindi',

    // ── Admin ───────────────────────────────────────────────
    admin_only: '❌ Bu buyruq faqat adminlar uchun.',
    admin_menu_title: '👑 <b>Admin Panel</b>',
    admin_new_order: '━━━━━━━━━━━━━━━━━━\n🔥 <b>YANGI BUYURTMA</b>\n━━━━━━━━━━━━━━━━━━\n\n👤 <b>Mijoz</b>\n• Nome: {customerName}\n• Username: @{customerUsername}\n• ID: <code>{customerId}</code>\n\n🎮 <b>O\'yin:</b> {game}\n📦 <b>Xizmat:</b> {service}\n🔢 <b>Miqdor:</b> {quantity}\n👤 <b>Username/ID:</b> {username}\n📱 <b>Platforma:</b> {platform}\n📝 <b>Izoh:</b> {notes}\n{promoLine}\n💰 <b>Narx:</b> ${price}\n📅 <b>Sana:</b> {date}\n🆔 <b>Buyurtma ID:</b> <code>{orderId}</code>\n\n<b>Status: 🟡 Kutilmoqda</b>',
    admin_accept: '✅ Qabul qilish',
    admin_reject: '❌ Rad etish',
    admin_in_progress: '🚀 Jarayonga olish',
    admin_complete: '✔ Bajarildi',
    admin_reply: '💬 Javob yozish',
    admin_stats_title: '📊 <b>Bot statistikasi</b>',
    admin_stats: '━━━━━━━━━━━━━━━━━━\n📊 <b>Statistika</b>\n━━━━━━━━━━━━━━━━━━\n\n💰 <b>Daromad:</b> ${revenue}\n📦 <b>Jami buyurtmalar:</b> {totalOrders}\n✅ <b>Bajarilgan:</b> {completedOrders}\n⏳ <b>Kutilayotgan:</b> {pendingOrders}\n🟠 <b>Jarayonda:</b> {inProgressOrders}\n🔴 <b>Rad etilgan:</b> {rejectedOrders}\n\n⭐ <b>Eng yaxshi xizmat:</b> {topService}\n👥 <b>Faol foydalanuvchilar:</b> {activeUsers}\n📅 <b>Bugungi buyurtmalar:</b> {todayOrders}',
    admin_broadcast_usage: '📢 Xabar yuborish uchun:\n/broadcast <matn>',
    admin_broadcast_start: '📢 Xabar yuborilmoqda...',
    admin_broadcast_done: '✅ Xabar yuborildi\nYuborilgan: {sent}\nXatolik: {failed}',
    admin_broadcast_header: '📢 <b>Admin xabari</b>',
    admin_orders_title: '📋 <b>Barcha buyurtmalar</b>',
    admin_order_detail: '━━━━━━━━━━━━━━━━━━\n🆔 <b>#{orderId}</b>\n━━━━━━━━━━━━━━━━━━\n\n👤 {customerName} (@{customerUsername})\n🎮 {game}\n📦 {service}\n🔢 {quantity}×\n👤 Username: {username}\n📱 {platform}\n📝 {notes}\n{promoLine}\n💰 ${price}\n📅 {date}\n\n<b>Status:</b> {statusEmoji} {status}{adminNoteLine}',
    admin_note_prompt: '💬 Admin izohingizni yozing (bekor qilish uchun /cancel):',
    admin_note_saved: '✅ Izoh saqlandi!',
    admin_note_line: '\n💬 <b>Admin izohi:</b> {note}',
    admin_refresh: '🔄 Yangilash',
    admin_promo_usage: '🎟 Promo kod yaratish:\n/createpromo <kod> <chegirma%> <max_foydalanish>',

    // ── Notifications ───────────────────────────────────────
    notify_order_accepted: '🔵 <b>Buyurtmangiz qabul qilindi!</b>\n\nBuyurtma ID: <code>{orderId}</code>\n\nXizmat: {service}\n\nTez orada ish boshlanadi.',
    notify_order_in_progress: '🟠 <b>Buyurtmangiz bajarilmoqda!</b>\n\nBuyurtma ID: <code>{orderId}</code>\n\nXizmat: {service}\n\nIsh jarayonda...',
    notify_order_completed: '🟢 <b>Buyurtmangiz bajarildi!</b>\n\nBuyurtma ID: <code>{orderId}</code>\n\nXizmat: {service}\n\nIltimos, buyurtmani tekshiring va /review orqali baho qoldiring!',
    notify_order_rejected: '🔴 <b>Buyurtmangiz rad etildi</b>\n\nBuyurtma ID: <code>{orderId}</code>\n\nXizmat: {service}\n\nBatafsil ma\'lumot uchun admin bilan bog\'laning.',

    // ── Wallet ──────────────────────────────────────────────
    wallet_title: '👛 <b>Hamyon</b>',
    wallet_balance: '💰 <b>Balansingiz:</b> ${balance}',
    wallet_top_up: '💳 To\'ldirish',
    wallet_history: '📜 Tarix',
    wallet_no_history: 'Hali hech qanday tranzaksiya yo\'q.',
    wallet_transaction: '{emoji} {amount} — {type} ({date})',

    // ── Payment ─────────────────────────────────────────────
    payment_methods: '💳 <b>To\'lov usulini tanlang:</b>',
    payment_instructions: '📋 <b>To\'lov ko\'rsatmalari</b>\n\n1. {method} orqali ${amount} ni quyidagi hisob raqamiga o\'tkazing:\n   {details}\n\n2. To\'lov chekini /confirmpay {orderId} ga yuboring\n\n3. Admin to\'lovni tasdiqlagach, buyurtma bajarila boshlanadi.',
    payment_verified: '✅ To\'lov tasdiqlandi! Buyurtma bajarilmoqda.',

    // ── Referral ─────────────────────────────────────────────
    referral_earned: '🎉 Referal bonusi! +${amount} hisobingizga qo\'shildi.',
    referral_title: '👥 <b>Referal tizimi</b>\n\nDo\'stlaringizni taklif qiling va bonus oling!\n\n• Sizning havolangiz: {link}\n• Sizning referallaringiz: {count}\n• Topilgan bonus: ${earned}',
  },

  ru: {
    // ── Welcome & Main Menu ────────────────────────────────
    welcome: '🎮 <b>FreeBuff Gaming Marketplace</b> добро пожаловать!',
    welcome_back: '🎮 <b>FreeBuff Gaming Marketplace</b> рады видеть вас снова!',
    main_menu: '🎮 <b>FreeBuff Gaming</b>\n\nВыберите один из разделов:',
    choose_option: 'Выберите один из вариантов:',
    error_generic: '❌ Произошла ошибка. Пожалуйста, попробуйте снова.',

    // ── Buttons ─────────────────────────────────────────────
    btn_buy: '🛒 Заказать',
    btn_prices: '💰 Цены',
    btn_my_orders: '📦 Мои заказы',
    btn_reviews: '⭐ Отзывы',
    btn_news: '📢 Новости',
    btn_profile: '👤 Профиль',
    btn_language: '🌍 Язык',
    btn_support: '☎ Поддержка',
    btn_back: '🔙 Назад',
    btn_main_menu: '🏠 Главное меню',
    btn_confirm: '✅ Подтвердить',
    btn_cancel: '❌ Отмена',
    btn_skip: '⏭ Пропустить',
    btn_next: '➡️ Далее',
    btn_prev: '⬅️ Назад',

    // ── Buy Service Flow ────────────────────────────────────
    select_game: '🎮 <b>Выберите игру:</b>',
    select_service: '📦 <b>Выберите услугу:</b>',
    enter_quantity: '🔢 <b>Введите количество:</b>\n\nНапример: 1, 5, 10',
    invalid_quantity: '❌ Пожалуйста, введите корректное число (1-9999):',
    enter_username: '👤 <b>Имя пользователя/ID в игре:</b>',
    select_platform: '📱 <b>Выберите платформу:</b>',
    enter_notes: '📝 <b>Дополнительный комментарий:</b>\n\n(Необязательно, если нет, отправьте "-")',
    promo_code_prompt: '🎟 <b>У вас есть промо-код?</b>\n\n(Если нет, отправьте "0")',
    invalid_promo: '❌ Промо-код не найден или истек.',

    // ── Order Summary ───────────────────────────────────────
    order_summary: '━━━━━━━━━━━━━━━━━━\n📋 <b>ДАННЫЕ ЗАКАЗА</b>\n━━━━━━━━━━━━━━━━━━\n\n🎮 <b>Игра:</b> {game}\n📦 <b>Услуга:</b> {service}\n🔢 <b>Количество:</b> {quantity}\n👤 <b>Username:</b> {username}\n📱 <b>Платформа:</b> {platform}\n📝 <b>Комментарий:</b> {notes}\n{priceLine}\n\nВсе данные верны?',
    order_price_line: '💰 <b>Цена:</b> ${price}\n{promoLine}',
    promo_applied: '🎟 <b>Промо:</b> {code} (-{discount}%)',
    no_promo: '',

    // ── Order Confirmation ──────────────────────────────────
    order_placed: '✅ <b>Заказ принят!</b>\n\nID заказа: <code>{orderId}</code>\n\nВаш заказ скоро будет рассмотрен. Администраторы свяжутся с вами.',
    order_cancelled: '❌ Заказ отменен.',

    // ── My Orders ───────────────────────────────────────────
    my_orders_title: '📦 <b>Мои заказы</b>',
    no_orders: 'У вас пока нет заказов.',
    orders_page: '📦 <b>Заказы</b> ({current}/{total})',
    order_card: '━━━━━━━━━━━━━━━━━━\n🆔 <b>#{orderId}</b> | {statusEmoji} {status}\n━━━━━━━━━━━━━━━━━━\n\n🎮 {game}\n📦 {service}\n🔢 {quantity}×\n👤 {username}\n📱 {platform}\n📅 {date}\n\n{notesLine}\n{priceLine}',
    show_details: '📋 Детали',

    // ── Prices ──────────────────────────────────────────────
    prices_title: '💰 <b>Цены на услуги</b>',
    price_item: '{emoji} <b>{name}</b>\n└ {description}\n└ Цена: ${price}/шт\n',

    // ── Profile ─────────────────────────────────────────────
    profile_title: '👤 <b>Мой профиль</b>',
    profile_info: '━━━━━━━━━━━━━━━━━━\n👤 <b>Профиль</b>\n━━━━━━━━━━━━━━━━━━\n\n🆔 ID: <code>{userId}</code>\n📛 Имя: {name}\n👥 Рефералов: {referrals}\n💰 Баланс: ${balance}\n📦 Всего заказов: {totalOrders}\n✅ Завершено: {completedOrders}\n⏳ Ожидает: {pendingOrders}\n📅 Зарегистрирован: {date}\n🌍 Язык: {language}',
    referral_link: '🔗 <b>Ваша реферальная ссылка:</b>\n<code>{link}</code>\n\nРеферальная система: получайте 10% бонуса, когда друг делает заказ!',

    // ── Reviews ─────────────────────────────────────────────
    reviews_title: '⭐ <b>Отзывы</b>',
    no_reviews: 'Пока нет отзывов.',
    review_card: '⭐ {rating}/5 — <b>{name}</b>\n└ {text}\n└ {date}\n',
    review_request: '⭐ <b>Ваш заказ выполнен!</b>\n\nОцените услугу {service} от 1 до 5:',
    review_thanks: '✅ Спасибо за отзыв! Он будет проверен модератором.',
    review_invalid_rating: '❌ Пожалуйста, оцените от 1 до 5.',

    // ── Support ─────────────────────────────────────────────
    support_message: '☎ <b>Поддержка</b>\n\nЕсть вопросы? Свяжитесь с администратором:\n\n👤 @freebuff_support\n📧 support@freebuff.com\n\nИли создайте заказ через /new_order.',

    // ── News ────────────────────────────────────────────────
    news_title: '📢 <b>Новости</b>',
    no_news: 'Пока нет новостей.',

    // ── Language ────────────────────────────────────────────
    language_select: '🌍 <b>Выберите язык:</b>',
    language_changed: '✅ Язык изменен на {lang}!',

    // ── Status Labels ───────────────────────────────────────
    status_pending: '🟡 В ожидании',
    status_accepted: '🔵 Принято',
    status_in_progress: '🟠 В процессе',
    status_completed: '🟢 Завершено',
    status_rejected: '🔴 Отклонено',
    status_cancelled: '⚪ Отменено',

    // ── Admin ───────────────────────────────────────────────
    admin_only: '❌ Эта команда только для администраторов.',
    admin_menu_title: '👑 <b>Admin Panel</b>',
    admin_new_order: '━━━━━━━━━━━━━━━━━━\n🔥 <b>НОВЫЙ ЗАКАЗ</b>\n━━━━━━━━━━━━━━━━━━\n\n👤 <b>Клиент</b>\n• Имя: {customerName}\n• Username: @{customerUsername}\n• ID: <code>{customerId}</code>\n\n🎮 <b>Игра:</b> {game}\n📦 <b>Услуга:</b> {service}\n🔢 <b>Количество:</b> {quantity}\n👤 <b>Username/ID:</b> {username}\n📱 <b>Платформа:</b> {platform}\n📝 <b>Комментарий:</b> {notes}\n{promoLine}\n💰 <b>Цена:</b> ${price}\n📅 <b>Дата:</b> {date}\n🆔 <b>ID заказа:</b> <code>{orderId}</code>\n\n<b>Статус: 🟡 В ожидании</b>',
    admin_accept: '✅ Принять',
    admin_reject: '❌ Отклонить',
    admin_in_progress: '🚀 В процесс',
    admin_complete: '✔ Завершено',
    admin_reply: '💬 Ответить',
    admin_stats_title: '📊 <b>Статистика бота</b>',
    admin_stats: '━━━━━━━━━━━━━━━━━━\n📊 <b>Статистика</b>\n━━━━━━━━━━━━━━━━━━\n\n💰 <b>Доход:</b> ${revenue}\n📦 <b>Всего заказов:</b> {totalOrders}\n✅ <b>Завершено:</b> {completedOrders}\n⏳ <b>В ожидании:</b> {pendingOrders}\n🟠 <b>В процессе:</b> {inProgressOrders}\n🔴 <b>Отклонено:</b> {rejectedOrders}\n\n⭐ <b>Лучшая услуга:</b> {topService}\n👥 <b>Активных пользователей:</b> {activeUsers}\n📅 <b>Заказов сегодня:</b> {todayOrders}',
    admin_broadcast_usage: '📢 Отправить сообщение:\n/broadcast <текст>',
    admin_broadcast_start: '📢 Отправка сообщения...',
    admin_broadcast_done: '✅ Сообщение отправлено\nОтправлено: {sent}\nОшибок: {failed}',
    admin_broadcast_header: '📢 <b>Сообщение от администрации</b>',
    admin_orders_title: '📋 <b>Все заказы</b>',
    admin_order_detail: '━━━━━━━━━━━━━━━━━━\n🆔 <b>#{orderId}</b>\n━━━━━━━━━━━━━━━━━━\n\n👤 {customerName} (@{customerUsername})\n🎮 {game}\n📦 {service}\n🔢 {quantity}×\n👤 Username: {username}\n📱 {platform}\n📝 {notes}\n{promoLine}\n💰 ${price}\n📅 {date}\n\n<b>Статус:</b> {statusEmoji} {status}{adminNoteLine}',
    admin_note_prompt: '💬 Напишите комментарий администратора (для отмены /cancel):',
    admin_note_saved: '✅ Комментарий сохранен!',
    admin_note_line: '\n💬 <b>Комментарий администратора:</b> {note}',
    admin_refresh: '🔄 Обновить',
    admin_promo_usage: '🎟 Создать промо-код:\n/createpromo <код> <скидка%> <макс_использований>',

    // ── Notifications ───────────────────────────────────────
    notify_order_accepted: '🔵 <b>Ваш заказ принят!</b>\n\nID заказа: <code>{orderId}</code>\n\nУслуга: {service}\n\nСкоро начнется работа.',
    notify_order_in_progress: '🟠 <b>Ваш заказ выполняется!</b>\n\nID заказа: <code>{orderId}</code>\n\nУслуга: {service}\n\nВ процессе...',
    notify_order_completed: '🟢 <b>Ваш заказ выполнен!</b>\n\nID заказа: <code>{orderId}</code>\n\nУслуга: {service}\n\nПожалуйста, проверьте заказ и оставьте отзыв через /review!',
    notify_order_rejected: '🔴 <b>Ваш заказ отклонен</b>\n\nID заказа: <code>{orderId}</code>\n\nУслуга: {service}\n\nСвяжитесь с администратором для подробностей.',

    // ── Wallet ──────────────────────────────────────────────
    wallet_title: '👛 <b>Кошелек</b>',
    wallet_balance: '💰 <b>Баланс:</b> ${balance}',
    wallet_top_up: '💳 Пополнить',
    wallet_history: '📜 История',
    wallet_no_history: 'Пока нет транзакций.',
    wallet_transaction: '{emoji} {amount} — {type} ({date})',

    // ── Payment ─────────────────────────────────────────────
    payment_methods: '💳 <b>Выберите способ оплаты:</b>',
    payment_instructions: '📋 <b>Инструкция по оплате</b>\n\n1. Переведите ${amount} через {method} на:\n   {details}\n\n2. Отправьте чек через /confirmpay {orderId}\n\n3. После подтверждения администратором заказ начнется.',
    payment_verified: '✅ Платеж подтвержден! Заказ выполняется.',

    // ── Referral ─────────────────────────────────────────────
    referral_earned: '🎉 Реферальный бонус! +${amount} начислено на счет.',
    referral_title: '👥 <b>Реферальная система</b>\n\nПриглашайте друзей и получайте бонусы!\n\n• Ваша ссылка: {link}\n• Рефералов: {count}\n• Заработано: ${earned}',
  },

  en: {
    // ── Welcome & Main Menu ────────────────────────────────
    welcome: '🎮 <b>FreeBuff Gaming Marketplace</b> — welcome!',
    welcome_back: '🎮 <b>FreeBuff Gaming Marketplace</b> — glad to see you again!',
    main_menu: '🎮 <b>FreeBuff Gaming</b>\n\nSelect a section below:',
    choose_option: 'Choose one of the options:',
    error_generic: '❌ An error occurred. Please try again.',

    // ── Buttons ─────────────────────────────────────────────
    btn_buy: '🛒 Buy Service',
    btn_prices: '💰 Prices',
    btn_my_orders: '📦 My Orders',
    btn_reviews: '⭐ Reviews',
    btn_news: '📢 News',
    btn_profile: '👤 Profile',
    btn_language: '🌍 Language',
    btn_support: '☎ Support',
    btn_back: '🔙 Back',
    btn_main_menu: '🏠 Main Menu',
    btn_confirm: '✅ Confirm',
    btn_cancel: '❌ Cancel',
    btn_skip: '⏭ Skip',
    btn_next: '➡️ Next',
    btn_prev: '⬅️ Prev',

    // ── Buy Service Flow ────────────────────────────────────
    select_game: '🎮 <b>Select Game:</b>',
    select_service: '📦 <b>Select Service:</b>',
    enter_quantity: '🔢 <b>Enter Quantity:</b>\n\nExample: 1, 5, 10',
    invalid_quantity: '❌ Please enter a valid number (1-9999):',
    enter_username: '👤 <b>In-game Username/ID:</b>',
    select_platform: '📱 <b>Select Platform:</b>',
    enter_notes: '📝 <b>Additional Notes:</b>\n\n(Optional, send "-" if none)',
    promo_code_prompt: '🎟 <b>Do you have a promo code?</b>\n\n(If not, send "0")',
    invalid_promo: '❌ Promo code not found or expired.',

    // ── Order Summary ───────────────────────────────────────
    order_summary: '━━━━━━━━━━━━━━━━━━\n📋 <b>ORDER SUMMARY</b>\n━━━━━━━━━━━━━━━━━━\n\n🎮 <b>Game:</b> {game}\n📦 <b>Service:</b> {service}\n🔢 <b>Quantity:</b> {quantity}\n👤 <b>Username:</b> {username}\n📱 <b>Platform:</b> {platform}\n📝 <b>Notes:</b> {notes}\n{priceLine}\n\nIs everything correct?',
    order_price_line: '💰 <b>Price:</b> ${price}\n{promoLine}',
    promo_applied: '🎟 <b>Promo:</b> {code} (-{discount}%)',
    no_promo: '',

    // ── Order Confirmation ──────────────────────────────────
    order_placed: '✅ <b>Order placed successfully!</b>\n\nOrder ID: <code>{orderId}</code>\n\nYour order will be reviewed shortly. Our admins will contact you.',
    order_cancelled: '❌ Order cancelled.',

    // ── My Orders ───────────────────────────────────────────
    my_orders_title: '📦 <b>My Orders</b>',
    no_orders: 'You have no orders yet.',
    orders_page: '📦 <b>Orders</b> ({current}/{total})',
    order_card: '━━━━━━━━━━━━━━━━━━\n🆔 <b>#{orderId}</b> | {statusEmoji} {status}\n━━━━━━━━━━━━━━━━━━\n\n🎮 {game}\n📦 {service}\n🔢 {quantity}×\n👤 {username}\n📱 {platform}\n📅 {date}\n\n{notesLine}\n{priceLine}',
    show_details: '📋 Details',

    // ── Prices ──────────────────────────────────────────────
    prices_title: '💰 <b>Service Prices</b>',
    price_item: '{emoji} <b>{name}</b>\n└ {description}\n└ Price: ${price}/each\n',

    // ── Profile ─────────────────────────────────────────────
    profile_title: '👤 <b>My Profile</b>',
    profile_info: '━━━━━━━━━━━━━━━━━━\n👤 <b>Profile</b>\n━━━━━━━━━━━━━━━━━━\n\n🆔 ID: <code>{userId}</code>\n📛 Name: {name}\n👥 Referrals: {referrals}\n💰 Balance: ${balance}\n📦 Total Orders: {totalOrders}\n✅ Completed: {completedOrders}\n⏳ Pending: {pendingOrders}\n📅 Registered: {date}\n🌍 Language: {language}',
    referral_link: '🔗 <b>Your Referral Link:</b>\n<code>{link}</code>\n\nReferral system: earn 10% bonus when your friends place an order!',

    // ── Reviews ─────────────────────────────────────────────
    reviews_title: '⭐ <b>Reviews</b>',
    no_reviews: 'No reviews yet.',
    review_card: '⭐ {rating}/5 — <b>{name}</b>\n└ {text}\n└ {date}\n',
    review_request: '⭐ <b>Your order is completed!</b>\n\nPlease rate the {service} service from 1 to 5:',
    review_thanks: '✅ Thank you for your review! It will be checked by a moderator.',
    review_invalid_rating: '❌ Please rate from 1 to 5.',

    // ── Support ─────────────────────────────────────────────
    support_message: '☎ <b>Support</b>\n\nHave questions? Contact our admins:\n\n👤 @freebuff_support\n📧 support@freebuff.com\n\nOr create an order via /new_order.',

    // ── News ────────────────────────────────────────────────
    news_title: '📢 <b>News</b>',
    no_news: 'No news yet.',

    // ── Language ────────────────────────────────────────────
    language_select: '🌍 <b>Select language:</b>',
    language_changed: '✅ Language changed to {lang}!',

    // ── Status Labels ───────────────────────────────────────
    status_pending: '🟡 Pending',
    status_accepted: '🔵 Accepted',
    status_in_progress: '🟠 In Progress',
    status_completed: '🟢 Completed',
    status_rejected: '🔴 Rejected',
    status_cancelled: '⚪ Cancelled',

    // ── Admin ───────────────────────────────────────────────
    admin_only: '❌ This command is for admins only.',
    admin_menu_title: '👑 <b>Admin Panel</b>',
    admin_new_order: '━━━━━━━━━━━━━━━━━━\n🔥 <b>NEW ORDER</b>\n━━━━━━━━━━━━━━━━━━\n\n👤 <b>Customer</b>\n• Name: {customerName}\n• Username: @{customerUsername}\n• ID: <code>{customerId}</code>\n\n🎮 <b>Game:</b> {game}\n📦 <b>Service:</b> {service}\n🔢 <b>Quantity:</b> {quantity}\n👤 <b>Username/ID:</b> {username}\n📱 <b>Platform:</b> {platform}\n📝 <b>Notes:</b> {notes}\n{promoLine}\n💰 <b>Price:</b> ${price}\n📅 <b>Date:</b> {date}\n🆔 <b>Order ID:</b> <code>{orderId}</code>\n\n<b>Status: 🟡 Pending</b>',
    admin_accept: '✅ Accept',
    admin_reject: '❌ Reject',
    admin_in_progress: '🚀 In Progress',
    admin_complete: '✔ Complete',
    admin_reply: '💬 Reply',
    admin_stats_title: '📊 <b>Bot Statistics</b>',
    admin_stats: '━━━━━━━━━━━━━━━━━━\n📊 <b>Statistics</b>\n━━━━━━━━━━━━━━━━━━\n\n💰 <b>Revenue:</b> ${revenue}\n📦 <b>Total Orders:</b> {totalOrders}\n✅ <b>Completed:</b> {completedOrders}\n⏳ <b>Pending:</b> {pendingOrders}\n🟠 <b>In Progress:</b> {inProgressOrders}\n🔴 <b>Rejected:</b> {rejectedOrders}\n\n⭐ <b>Top Service:</b> {topService}\n👥 <b>Active Users:</b> {activeUsers}\n📅 <b>Today Orders:</b> {todayOrders}',
    admin_broadcast_usage: '📢 To send a broadcast:\n/broadcast <text>',
    admin_broadcast_start: '📢 Sending broadcast...',
    admin_broadcast_done: '✅ Broadcast sent\nSent: {sent}\nFailed: {failed}',
    admin_broadcast_header: '📢 <b>Admin Message</b>',
    admin_orders_title: '📋 <b>All Orders</b>',
    admin_order_detail: '━━━━━━━━━━━━━━━━━━\n🆔 <b>#{orderId}</b>\n━━━━━━━━━━━━━━━━━━\n\n👤 {customerName} (@{customerUsername})\n🎮 {game}\n📦 {service}\n🔢 {quantity}×\n👤 Username: {username}\n📱 {platform}\n📝 {notes}\n{promoLine}\n💰 ${price}\n📅 {date}\n\n<b>Status:</b> {statusEmoji} {status}{adminNoteLine}',
    admin_note_prompt: '💬 Write your admin note (send /cancel to cancel):',
    admin_note_saved: '✅ Note saved!',
    admin_note_line: '\n💬 <b>Admin Note:</b> {note}',
    admin_refresh: '🔄 Refresh',
    admin_promo_usage: '🎟 Create promo code:\n/createpromo <code> <discount%> <max_uses>',

    // ── Notifications ───────────────────────────────────────
    notify_order_accepted: '🔵 <b>Your order has been accepted!</b>\n\nOrder ID: <code>{orderId}</code>\n\nService: {service}\n\nWork will begin shortly.',
    notify_order_in_progress: '🟠 <b>Your order is in progress!</b>\n\nOrder ID: <code>{orderId}</code>\n\nService: {service}\n\nWork in progress...',
    notify_order_completed: '🟢 <b>Your order is completed!</b>\n\nOrder ID: <code>{orderId}</code>\n\nService: {service}\n\nPlease check your order and leave a review via /review!',
    notify_order_rejected: '🔴 <b>Your order has been rejected</b>\n\nOrder ID: <code>{orderId}</code>\n\nService: {service}\n\nContact admin for more details.',

    // ── Wallet ──────────────────────────────────────────────
    wallet_title: '👛 <b>Wallet</b>',
    wallet_balance: '💰 <b>Balance:</b> ${balance}',
    wallet_top_up: '💳 Top Up',
    wallet_history: '📜 History',
    wallet_no_history: 'No transactions yet.',
    wallet_transaction: '{emoji} {amount} — {type} ({date})',

    // ── Payment ─────────────────────────────────────────────
    payment_methods: '💳 <b>Select Payment Method:</b>',
    payment_instructions: '📋 <b>Payment Instructions</b>\n\n1. Send ${amount} via {method} to:\n   {details}\n\n2. Send payment receipt via /confirmpay {orderId}\n\n3. After admin confirmation, your order will be processed.',
    payment_verified: '✅ Payment verified! Order is being processed.',

    // ── Referral ─────────────────────────────────────────────
    referral_earned: '🎉 Referral bonus! +${amount} added to your balance.',
    referral_title: '👥 <b>Referral System</b>\n\nInvite friends and earn bonuses!\n\n• Your link: {link}\n• Referrals: {count}\n• Earned: ${earned}',
  },
};

// ── Helper: t(lang, key, vars?) ─────────────────────────────────────
export function t(
  lang: LangCode | undefined,
  key: string,
  vars?: Record<string, string | number>
): string {
  const normalizedLang: LangCode =
    lang === 'uz' || lang === 'ru' || lang === 'en' ? lang : 'en';
  let text: string =
    translations[normalizedLang]?.[key] ??
    translations.en[key] ??
    key;

  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    }
  }

  return text;
}

export function langLabel(lang: LangCode): string {
  const labels: Record<LangCode, string> = {
    uz: "O'zbekcha",
    ru: 'Русский',
    en: 'English',
  };
  return labels[lang];
}

export const LANGUAGES: { code: LangCode; emoji: string }[] = [
  { code: 'uz', emoji: '🇺🇿' },
  { code: 'ru', emoji: '🇷🇺' },
  { code: 'en', emoji: '🇺🇸' },
];
