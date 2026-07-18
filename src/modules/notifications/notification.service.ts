/**
 * src/modules/notifications/notification.service.ts
 *
 * THE single entry-point for the entire notification system.
 *
 * Usage:
 *   import { notificationService } from '@/modules/notifications/notification.service';
 *   await notificationService.registration({ ... });
 *   await notificationService.acceptance({ ... });
 *
 * Each method fans out to all configured channels concurrently via the async queue.
 * Callers always return immediately — notification delivery is fully non-blocking.
 */

import { notificationQueue } from './queue.service';
import { sendTelegramNotification } from './channels/telegram.channel';
import { sendEmailNotification } from './channels/email.channel';
import { sendDashboardNotification } from './channels/dashboard.channel';
import {
  registrationTemplate,
  acceptanceTemplate,
  rejectionTemplate,
  pendingTemplate,
  reminderTemplate,
  customTemplate,
} from './templates';
import type {
  RegistrationPayload,
  StatusChangePayload,
  ReminderPayload,
  CustomPayload,
} from './types';

class NotificationService {

  // ── REGISTRATION ────────────────────────────────────────────────────────────
  async registration(payload: RegistrationPayload): Promise<void> {
    const template = registrationTemplate(payload);

    const jobs: Promise<void>[] = [];

    // → Student: Telegram
    if (payload.studentTelegramId) {
      jobs.push(notificationQueue.enqueue({
        event: 'REGISTRATION',
        channel: 'TELEGRAM',
        recipient: payload.studentTelegramId,
        subject: template.subject,
        body: template.telegramText,
        execute: () => sendTelegramNotification(payload.studentTelegramId!, template),
      }));
    }

    // → Student: Email
    if (payload.studentEmail) {
      jobs.push(notificationQueue.enqueue({
        event: 'REGISTRATION',
        channel: 'EMAIL',
        recipient: payload.studentEmail,
        subject: template.subject,
        body: template.dashboardMessage,
        execute: () => sendEmailNotification(payload.studentEmail!, template),
      }));
    }

    // → Student: Dashboard
    jobs.push(notificationQueue.enqueue({
      event: 'REGISTRATION',
      channel: 'DASHBOARD',
      recipient: payload.studentUserId,
      subject: template.dashboardTitle,
      body: template.dashboardMessage,
      execute: () => sendDashboardNotification(payload.studentUserId, template),
    }));

    // → Teacher: Telegram (so they know a new student applied)
    if (payload.teacherTelegramId) {
      const teacherTemplate = {
        ...template,
        telegramText:
          `🆕 <b>Yangi ariza!</b>\n` +
          `O'quvchi: <b>${payload.studentName}</b>\n` +
          `Kurs: <b>${payload.courseName}</b>\n` +
          `📞 ${payload.phone}`,
      };
      jobs.push(notificationQueue.enqueue({
        event: 'REGISTRATION',
        channel: 'TELEGRAM',
        recipient: payload.teacherTelegramId,
        subject: 'New application',
        body: teacherTemplate.telegramText,
        execute: () => sendTelegramNotification(payload.teacherTelegramId!, teacherTemplate),
      }));
    }

    await Promise.all(jobs);
  }

  // ── ACCEPTANCE ──────────────────────────────────────────────────────────────
  async acceptance(payload: StatusChangePayload): Promise<void> {
    const template = acceptanceTemplate(payload);
    await this._dispatchToStudent('ACCEPTANCE', payload, template);
  }

  // ── REJECTION ───────────────────────────────────────────────────────────────
  async rejection(payload: StatusChangePayload): Promise<void> {
    const template = rejectionTemplate(payload);
    await this._dispatchToStudent('REJECTION', payload, template);
  }

  // ── PENDING STATUS ──────────────────────────────────────────────────────────
  async pendingStatus(payload: StatusChangePayload): Promise<void> {
    const template = pendingTemplate(payload);
    await this._dispatchToStudent('PENDING_STATUS', payload, template);
  }

  // ── REMINDER ────────────────────────────────────────────────────────────────
  async reminder(payload: ReminderPayload): Promise<void> {
    const template = reminderTemplate(payload);

    const jobs: Promise<void>[] = [
      notificationQueue.enqueue({
        event: 'REMINDER',
        channel: 'DASHBOARD',
        recipient: payload.studentUserId,
        subject: template.dashboardTitle,
        body: template.dashboardMessage,
        execute: () => sendDashboardNotification(payload.studentUserId, template),
      }),
    ];

    if (payload.studentTelegramId) {
      jobs.push(notificationQueue.enqueue({
        event: 'REMINDER',
        channel: 'TELEGRAM',
        recipient: payload.studentTelegramId,
        subject: template.subject,
        body: template.telegramText,
        execute: () => sendTelegramNotification(payload.studentTelegramId!, template),
      }));
    }

    if (payload.studentEmail) {
      jobs.push(notificationQueue.enqueue({
        event: 'REMINDER',
        channel: 'EMAIL',
        recipient: payload.studentEmail,
        subject: template.subject,
        body: template.dashboardMessage,
        execute: () => sendEmailNotification(payload.studentEmail!, template),
      }));
    }

    await Promise.all(jobs);
  }

  // ── CUSTOM ──────────────────────────────────────────────────────────────────
  async custom(payload: CustomPayload): Promise<void> {
    const template = customTemplate(payload);

    const jobs: Promise<void>[] = [
      notificationQueue.enqueue({
        event: 'CUSTOM',
        channel: 'DASHBOARD',
        recipient: payload.recipientUserId,
        subject: template.dashboardTitle,
        body: template.dashboardMessage,
        execute: () => sendDashboardNotification(payload.recipientUserId, template),
      }),
    ];

    if (payload.recipientTelegramId) {
      jobs.push(notificationQueue.enqueue({
        event: 'CUSTOM',
        channel: 'TELEGRAM',
        recipient: payload.recipientTelegramId,
        subject: template.subject,
        body: template.telegramText,
        execute: () => sendTelegramNotification(payload.recipientTelegramId!, template),
      }));
    }

    if (payload.recipientEmail) {
      jobs.push(notificationQueue.enqueue({
        event: 'CUSTOM',
        channel: 'EMAIL',
        recipient: payload.recipientEmail,
        subject: template.subject,
        body: template.dashboardMessage,
        execute: () => sendEmailNotification(payload.recipientEmail!, template),
      }));
    }

    await Promise.all(jobs);
  }

  // ── Shared helper ────────────────────────────────────────────────────────────
  private async _dispatchToStudent(
    event: 'ACCEPTANCE' | 'REJECTION' | 'PENDING_STATUS',
    payload: StatusChangePayload,
    template: ReturnType<typeof acceptanceTemplate>,
  ): Promise<void> {
    const jobs: Promise<void>[] = [
      notificationQueue.enqueue({
        event,
        channel: 'DASHBOARD',
        recipient: payload.studentUserId,
        subject: template.dashboardTitle,
        body: template.dashboardMessage,
        execute: () => sendDashboardNotification(payload.studentUserId, template),
      }),
    ];

    if (payload.studentTelegramId) {
      jobs.push(notificationQueue.enqueue({
        event,
        channel: 'TELEGRAM',
        recipient: payload.studentTelegramId,
        subject: template.subject,
        body: template.telegramText,
        execute: () => sendTelegramNotification(payload.studentTelegramId!, template),
      }));
    }

    if (payload.studentEmail) {
      jobs.push(notificationQueue.enqueue({
        event,
        channel: 'EMAIL',
        recipient: payload.studentEmail,
        subject: template.subject,
        body: template.dashboardMessage,
        execute: () => sendEmailNotification(payload.studentEmail!, template),
      }));
    }

    await Promise.all(jobs);
  }
}

export const notificationService = new NotificationService();
