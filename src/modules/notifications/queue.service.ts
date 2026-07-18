/**
 * src/modules/notifications/queue.service.ts
 *
 * Lightweight, persistent async queue backed by PostgreSQL `notification_logs`.
 * Strategy:
 *  1. A dispatch call creates a `PENDING` NotificationLog row immediately (fire & record).
 *  2. The actual delivery runs asynchronously via `setImmediate` (non-blocking).
 *  3. On failure, status becomes `FAILED` with the error message stored for auditing.
 *  4. A `retry()` method can be called by a cron/scheduled Next.js route to re-attempt FAILED jobs.
 *
 * In production, swap `setImmediate` for a proper queue (BullMQ, Inngest, etc.)
 * without changing any callers — the interface is the same.
 */

import prisma from '../../lib/prisma';
import type { NotificationLog } from '@prisma/client';
import type { NotificationChannelType, NotificationEventType, ChannelResult } from './types';
import { sendTelegramText } from './channels/telegram.channel';
import { sendEmailRaw } from './channels/email.channel';

export interface QueueJob {
  event: NotificationEventType;
  channel: NotificationChannelType;
  recipient: string; // userId / email / telegramChatId
  subject?: string;
  body: string;
  execute: () => Promise<ChannelResult>;
}

export class NotificationQueueService {
  /**
   * Enqueue a notification job.
   * Creates a PENDING log immediately, then dispatches asynchronously.
   */
  async enqueue(job: QueueJob): Promise<void> {
    // 1. Persist as PENDING log (synchronous DB write)
    const log = await prisma.notificationLog.create({
      data: {
        event: job.event,
        channel: job.channel,
        recipient: job.recipient,
        subject: job.subject,
        body: job.body,
        status: 'PENDING',
        attempts: 0,
      },
    });

    // 2. Execute asynchronously — does NOT block the caller
    setImmediate(async () => {
      await this._dispatch(log.id, job);
    });
  }

  /**
   * Internal: runs the job, updates the log record with result.
   */
  private async _dispatch(logId: string, job: QueueJob): Promise<void> {
    try {
      await prisma.notificationLog.update({
        where: { id: logId },
        data: { status: 'RETRYING', attempts: { increment: 1 } },
      });

      const result = await job.execute();

      if (result.success) {
        await prisma.notificationLog.update({
          where: { id: logId },
          data: { status: 'SENT', sentAt: new Date(), error: null },
        });
      } else {
        await prisma.notificationLog.update({
          where: { id: logId },
          data: { status: 'FAILED', error: result.error ?? 'Unknown error' },
        });
      }
    } catch (err: any) {
      console.error(`[NotificationQueue] Dispatch failed for log ${logId}:`, err?.message);
      await prisma.notificationLog.update({
        where: { id: logId },
        data: { status: 'FAILED', error: err?.message ?? 'Unhandled exception' },
      });
    }
  }

  /**
   * Retry all FAILED notifications (max 3 attempts).
   * Call this from a scheduled route (e.g., cron every 15 minutes).
   * Re-dispatches using the stored recipient/channel; full channel re-send is
   * performed by the channel senders using the persisted body.
   */
  async retryFailed(): Promise<{ retried: number; failed: number }> {
    const failedLogs = await prisma.notificationLog.findMany({
      where: { status: 'FAILED', attempts: { lt: 3 } },
      take: 50,
    });

    let retried = 0;
    let failed = 0;
    for (const log of failedLogs) {
      try {
        await this._redispatch(log);
        retried++;
      } catch {
        failed++;
      }
    }

    return { retried, failed };
  }

  /**
   * Re-send a stored log via its channel. The body/subject are persisted on the
   * log, so we can reconstruct a best-effort delivery without the original payload.
   */
  private async _redispatch(log: NotificationLog) {
    await prisma.notificationLog.update({
      where: { id: log.id },
      data: { status: 'RETRYING', attempts: { increment: 1 } },
    });

    let success = false;
    let error: string | undefined;
    try {
      switch (log.channel) {
        case 'TELEGRAM':
          ({ success, error } = await sendTelegramText(log.recipient, log.body));
          break;
        case 'EMAIL':
          ({ success, error } = await sendEmailRaw(log.recipient, log.subject ?? 'Qarshiyev', log.body));
          break;
        case 'DASHBOARD':
          await prisma.notification.create({
            data: { userId: log.recipient, title: log.subject ?? 'Bildirishnoma', message: log.body, isRead: false },
          });
          success = true;
          break;
      }
    } catch (err: any) {
      success = false;
      error = err?.message ?? 'Unknown error';
    }

    await prisma.notificationLog.update({
      where: { id: log.id },
      data: success
        ? { status: 'SENT', sentAt: new Date(), error: null }
        : { status: 'FAILED', error: error ?? 'Unknown error' },
    });
  }
}

export const notificationQueue = new NotificationQueueService();
