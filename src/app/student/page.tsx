import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '../../lib/auth';

export const dynamic = 'force-dynamic';

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  PENDING:   { label: 'Pending Review', color: 'text-amber-700 dark:text-amber-400',   bg: 'bg-amber-50 dark:bg-amber-900/20',   icon: '⏳' },
  APPROVED:  { label: 'Approved',       color: 'text-green-700 dark:text-green-400',   bg: 'bg-green-50 dark:bg-green-900/20',   icon: '✅' },
  REJECTED:  { label: 'Rejected',       color: 'text-red-700 dark:text-red-400',       bg: 'bg-red-50 dark:bg-red-900/20',       icon: '❌' },
  CANCELLED: { label: 'Cancelled',      color: 'text-gray-600 dark:text-gray-400',     bg: 'bg-gray-100 dark:bg-gray-800',       icon: '🚫' },
};

export default async function StudentDashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/student/login');

  const latestApp = user.student?.applications?.[0] ?? null;
  const course = latestApp?.course ?? null;
  const status = latestApp ? STATUS_CONFIG[latestApp.status] : null;

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Welcome, {user.firstName} 👋
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Here is a summary of your enrollment status.</p>
      </div>

      {/* Application Status Card */}
      {latestApp && status ? (
        <div className={`rounded-2xl border p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 ${status.bg}`}>
          <div className="text-6xl">{status.icon}</div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Application Status</p>
            <p className={`text-2xl font-bold mt-1 ${status.color}`}>{status.label}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Submitted on {latestApp.createdAt.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <Link
            href="/student/application"
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition"
          >
            View Details →
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-10 text-center text-gray-400">
          <p className="text-4xl mb-3">📭</p>
          <p className="font-semibold">No application found</p>
          <p className="text-sm mt-1">You have not submitted an application yet.</p>
        </div>
      )}

      {/* Course Information Card */}
      {course && (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">📚 Course Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoRow label="Course Name" value={course.title} />
            <InfoRow label="Language"    value={course.language.name} />
            <InfoRow label="Price"       value={`${course.price.toString()} UZS`} />
            <InfoRow
              label="Teacher"
              value={`${course.teacher.user.firstName} ${course.teacher.user.lastName}`}
            />
            {course.teacher.specialization && (
              <InfoRow label="Specialization" value={course.teacher.specialization} />
            )}
            {course.teacher.experienceYears > 0 && (
              <InfoRow label="Experience" value={`${course.teacher.experienceYears} years`} />
            )}
          </div>
          {course.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-4">
              {course.description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{label}</p>
      <p className="text-base font-medium mt-0.5">{value}</p>
    </div>
  );
}

