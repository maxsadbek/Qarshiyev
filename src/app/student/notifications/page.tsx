import { redirect } from 'next/navigation';
import { getCurrentUser } from '../../../lib/auth';
import prisma from '../../../lib/prisma';
import { Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';

type NotificationWithUser = Prisma.NotificationGetPayload<{}>;

export default async function NotificationsPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/student/login');

  const notifications = await prisma.notification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Mark all as read (fire-and-forget — safe for server component)
  if (unreadCount > 0) {
    await prisma.notification.updateMany({
      where: { userId: user.id, isRead: false },
      data: { isRead: true },
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold">🔔 Notifications</h1>
        {unreadCount > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {unreadCount} new
          </span>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-12 text-center text-gray-400">
          <p className="text-5xl mb-4">🕊️</p>
          <p className="font-semibold text-lg">No notifications yet</p>
          <p className="text-sm mt-1">You are all caught up!</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {notifications.map((n) => (
            <li
              key={n.id}
              className={`rounded-xl border p-5 flex gap-4 transition-colors ${
                !n.isRead
                  ? 'border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'
              }`}
            >
              <div className="text-2xl flex-shrink-0">📩</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold truncate">{n.title}</p>
                  <time className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">
                    {n.createdAt.toLocaleDateString('en-GB', {
                      day: 'numeric', month: 'short', year: 'numeric',
                    })}
                  </time>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                  {n.message}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

