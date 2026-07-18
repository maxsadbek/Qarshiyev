/**
 * src/modules/notifications/templates/index.ts
 * Pure functions that return {subject, telegramText, dashboardTitle, dashboardMessage}
 * for every notification event. No side-effects — easy to unit-test.
 */

import type {
  RegistrationPayload,
  StatusChangePayload,
  ReminderPayload,
  CustomPayload,
} from '../types';

export interface NotificationTemplate {
  subject: string;
  telegramText: string;
  dashboardTitle: string;
  dashboardMessage: string;
}

export function registrationTemplate(p: RegistrationPayload): NotificationTemplate {
  return {
    subject: `✅ Ariza qabul qilindi — ${p.courseName}`,
    telegramText:
      `🎉 <b>Salom, ${p.studentName}!</b>\n\n` +
      `Sizning <b>${p.courseName}</b> kursiga arizangiz muvaffaqiyatli qabul qilindi.\n\n` +
      `📞 Telefon: ${p.phone}\n` +
      `🆔 Ariza ID: <code>${p.applicationId}</code>\n\n` +
      `Tez orada o'qituvchi siz bilan bog'lanadi. ⏳`,
    dashboardTitle: 'Ariza qabul qilindi',
    dashboardMessage: `${p.courseName} kursiga arizangiz muvaffaqiyatli yuborildi.`,
  };
}

export function acceptanceTemplate(p: StatusChangePayload): NotificationTemplate {
  return {
    subject: `🎉 Tabriklaymiz! Sizning arizangiz qabul qilindi — ${p.courseName}`,
    telegramText:
      `✅ <b>Tabriklaymiz, ${p.studentName}!</b>\n\n` +
      `Sizning <b>${p.courseName}</b> kursiga arizangiz <b>QABUL QILINDI</b>.\n\n` +
      (p.teacherNote ? `💬 O'qituvchi izohi: ${p.teacherNote}\n\n` : '') +
      `Keyingi qadamlar uchun o'qituvchi siz bilan bog'lanadi. 🚀`,
    dashboardTitle: '✅ Ariza qabul qilindi!',
    dashboardMessage: `${p.courseName} kursiga arizangiz QABUL QILINDI.${p.teacherNote ? ` Izoh: ${p.teacherNote}` : ''}`,
  };
}

export function rejectionTemplate(p: StatusChangePayload): NotificationTemplate {
  return {
    subject: `Ariza holati — ${p.courseName}`,
    telegramText:
      `❌ <b>Hurmatli ${p.studentName},</b>\n\n` +
      `Afsuski, sizning <b>${p.courseName}</b> kursiga arizangiz <b>RAD ETILDI</b>.\n\n` +
      (p.teacherNote ? `💬 Sabab: ${p.teacherNote}\n\n` : '') +
      `Boshqa kurslarni ko'rib chiqishingiz mumkin. Omad tilaymiz! 🙏`,
    dashboardTitle: '❌ Ariza rad etildi',
    dashboardMessage: `${p.courseName} kursiga arizangiz rad etildi.${p.teacherNote ? ` Sabab: ${p.teacherNote}` : ''}`,
  };
}

export function pendingTemplate(p: StatusChangePayload): NotificationTemplate {
  return {
    subject: `Ariza ko‘rib chiqilmoqda — ${p.courseName}`,
    telegramText:
      `⏳ <b>Hurmatli ${p.studentName},</b>\n\n` +
      `Sizning <b>${p.courseName}</b> kursiga arizangiz hozirda <b>KO'RIB CHIQILMOQDA</b>.\n\n` +
      `Natija haqida sizga xabar beramiz.`,
    dashboardTitle: '⏳ Ariza ko‘rib chiqilmoqda',
    dashboardMessage: `${p.courseName} kursiga arizangiz hozirda ko'rib chiqilmoqda.`,
  };
}

export function reminderTemplate(p: ReminderPayload): NotificationTemplate {
  return {
    subject: `📌 Eslatma — ${p.courseName}`,
    telegramText:
      `📌 <b>Eslatma, ${p.studentName}!</b>\n\n${p.message}`,
    dashboardTitle: '📌 Eslatma',
    dashboardMessage: p.message,
  };
}

export function customTemplate(p: CustomPayload): NotificationTemplate {
  return {
    subject: p.subject,
    telegramText: `📢 <b>${p.subject}</b>\n\n${p.message}`,
    dashboardTitle: p.subject,
    dashboardMessage: p.message,
  };
}

