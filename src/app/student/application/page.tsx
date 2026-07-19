import { redirect } from 'next/navigation';
import { getCurrentUser } from '../../../lib/auth';

export const dynamic = 'force-dynamic';

const STATUS_STEPS = [
  { key: 'PENDING',   label: 'Submitted',       icon: '📤' },
  { key: 'PENDING',   label: 'Under Review',     icon: '🔍' },
  { key: 'APPROVED',  label: 'Decision Made',    icon: '📣' },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; ring: string }> = {
  PENDING:   { label: 'Pending',   color: 'text-amber-600',  ring: 'ring-amber-400'  },
  APPROVED:  { label: 'Approved',  color: 'text-green-600',  ring: 'ring-green-400'  },
  REJECTED:  { label: 'Rejected',  color: 'text-red-600',    ring: 'ring-red-400'    },
  CANCELLED: { label: 'Cancelled', color: 'text-gray-500',   ring: 'ring-gray-400'   },
};

export default async function ApplicationPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/student/login');

  const applications = user.student?.applications ?? [];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">📋 My Applications</h1>

      {applications.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-12 text-center text-gray-400">
          <p className="text-5xl mb-4">📭</p>
          <p className="font-semibold text-lg">No applications yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {applications.map((app: any) => {
            const cfg = STATUS_CONFIG[app.status];
            const activeStep =
              app.status === 'PENDING' ? 1 :
              app.status === 'APPROVED' || app.status === 'REJECTED' ? 2 : 0;

            return (
              <div
                key={app.id}
                className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                  <div>
                    <p className="font-bold text-lg">{app.course.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                      Applied {app.createdAt.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full ring-2 ${cfg.color} ${cfg.ring} bg-transparent`}>
                    {cfg.label}
                  </span>
                </div>

                {/* Status Tracker */}
                <div className="px-6 py-5">
                  <div className="flex items-center gap-0">
                    {STATUS_STEPS.map((step, idx) => (
                      <div key={idx} className="flex items-center flex-1 last:flex-none">
                        <div className="flex flex-col items-center gap-1">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-lg border-2 transition-all ${
                            idx <= activeStep
                              ? 'border-indigo-500 bg-indigo-500 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900'
                              : 'border-gray-300 dark:border-gray-700 text-gray-400 bg-white dark:bg-gray-900'
                          }`}>
                            {step.icon}
                          </div>
                          <span className={`text-xs font-medium whitespace-nowrap ${idx <= activeStep ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'}`}>
                            {step.label}
                          </span>
                        </div>
                        {idx < STATUS_STEPS.length - 1 && (
                          <div className={`flex-1 h-0.5 mx-2 rounded ${idx < activeStep ? 'bg-indigo-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Details */}
                {app.notes && (
                  <div className="px-6 pb-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Notes</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line leading-relaxed">
                      {app.notes}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

