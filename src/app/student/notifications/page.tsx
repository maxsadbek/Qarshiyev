import { redirect } from 'next/navigation';
import { getCurrentUser } from '../../../lib/auth';
import prisma from '../../../lib/prisma';
import { MarkReadWrapper } from '@/components/notifications/MarkReadWrapper';

export const dynamic = 'force-dynamic';

/**
 * Local interface matching the exact shape returned by `prisma.notification.findMany`
 * (no `include` clause is used, so these are the model's own scalar fields).
 *
 * Why this exists: Prisma 7 no longer exports a `Prisma` namespace from
 * `@prisma/client`. Relying purely on inference from a bare
 * `await prisma.notification.findMany(...)` call has repeatedly widened to
 * `any[]` in this project's Vercel build (the locally cached generated client
 * differs from a fresh Vercel-side `prisma generate`), which is what caused
 * `n` in `.filter((n) => ...)` / `.map((n) => ...)` to implicitly become `any`.
 * Declaring this interface explicitly and pinning the query result to it
 * removes the implicit-any error without disabling strict mode, without
 * `@ts-ignore`, without `any`, and without reintroducing a Prisma namespace
 * import. Only the fields actually used in this file are included.
 */
interface NotificationItem {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

export default async function NotificationsPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/student/login');

  const notificationsQuery: Promise<NotificationItem[]> = prisma.notification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    take: 50,
  }) as Promise<NotificationItem[]>;

  const notifications: NotificationItem[] = await notificationsQuery;

  const unreadCount = notifications.filter((n: NotificationItem) => !n.isRead).length;

  // Note: Marking notifications as read is intentionally NOT done here in the Server
  // Component because database mutations in render functions can cause unexpected
  // side effects (double-marks, race conditions with concurrent requests).
  // The client-side notifications page uses a useEffect to mark individual
  // notifications as read via a lightweight API call.
  // See src/app/student/notifications/actions.ts for the implementation.

  return (
    <div className="space-y-6">
      {/* Client component that marks notifications as read on mount */}
      <MarkReadWrapper />

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
          {notifications.map((n: NotificationItem) => (
            <li
              key={n.id}
              className={`rounded-xl border p-5 flex gap-4 transition-colors ${
                n.isRead
                  ? 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'
                  : 'border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20'
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
