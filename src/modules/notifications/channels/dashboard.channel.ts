/**
 * src/modules/notifications/channels/dashboard.channel.ts
 * Writes in-app notifications to the `Notification` table in the database.
 * These appear in the Student Panel at /student/notifications.
 */

import prisma from '../../../lib/prisma';
import type { NotificationTemplate } from '../templates';
import type { ChannelResult } from '../types';

export async function sendDashboardNotification(
  userId: string,
  template: NotificationTemplate,
): Promise<ChannelResult> {
  try {
    await prisma.notification.create({
      data: {
        userId,
        title: template.dashboardTitle,
        message: template.dashboardMessage,
        isRead: false,
      },
    });
    return { channel: 'DASHBOARD', success: true };
  } catch (error: any) {
    console.error('[DashboardChannel] Error:', error?.message);
    return { channel: 'DASHBOARD', success: false, error: error?.message };
  }
}

