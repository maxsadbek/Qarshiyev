import { applicationStore } from '../../../modules/applications/store';
import { requireUser } from '../../../lib/auth';
import { updateApplicationStatus } from './actions';

export const dynamic = 'force-dynamic';

const VALID_STATUSES = ['ALL', 'PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'] as const;
type StatusFilter = (typeof VALID_STATUSES)[number];

const STATUS_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  PENDING: { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-700 dark:text-amber-300', dot: 'bg-amber-400' },
  APPROVED: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-700 dark:text-emerald-300', dot: 'bg-emerald-400' },
  REJECTED: { bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-700 dark:text-red-300', dot: 'bg-red-400' },
  CANCELLED: { bg: 'bg-gray-50 dark:bg-gray-800', text: 'text-gray-500 dark:text-gray-400', dot: 'bg-gray-300 dark:bg-gray-600' },
};

// Inline course name resolver – same data as Telegram service
const COURSE_NAMES: Record<string, string> = {};
// We import the COURSES array but in case it's not available, use fallback
try {
  // Build lookup from static data
  const courseEntries: { id: string; title: string }[] = [
    { id: 'backend', title: '⚙️ Backend dasturlash (Python/Node.js)' },
    { id: 'grafik-dizayn', title: '🎨 Grafik dizayn' },
    { id: 'ingliz-tili', title: '🇬🇧 Ingliz tili' },
    { id: 'mobile', title: '📱 Mobil dasturlash' },
    { id: 'smm', title: '📊 SMM / Marketing' },
    { id: 'web-dasturlash', title: '🌐 Web dasturlash (Frontend)' },
  ];
  courseEntries.forEach((c) => { COURSE_NAMES[c.id] = c.title; });
} catch {
  // fallback – empty
}

function getCourseName(id: string): string {
  return COURSE_NAMES[id] || id;
}

function getDistrictName(id: string): string {
  const names: Record<string, string> = {
    chilonzor: 'Chilonzor', sergeli: 'Sergeli', 'mirzo-ulugbek': "Mirzo Ulug'bek",
    yunusobod: 'Yunusobod', ishtixon: 'Ishtixon', kattakurgon: 'Kattakurgon',
    'samarqand-shahar': 'Samarqand shahar', urgut: 'Urgut',
    'buxoro-shahar': 'Buxoro shahar', kogon: 'Kogon', romitan: 'Romitan',
    vobkent: 'Vobkent', kitob: 'Kitob', koson: 'Koson', qarshi: 'Qarshi',
    shahrisabz: 'Shahrisabz', boysun: 'Boysun', denov: 'Denov',
    sariosiyo: 'Sariosiyo', termiz: 'Termiz', 'andijon-shahar': 'Andijon shahar',
    asaka: 'Asaka', shahrixon: 'Shahrixon', xonobod: 'Xonobod',
    chust: 'Chust', mingbuloq: 'Mingbuloq', 'namangan-shahar': 'Namangan shahar',
    pop: 'Pop', bgdod: "Bag'dod", 'fargona-shahar': "Farg'ona shahar",
    quva: 'Quva', rishton: 'Rishton', baxmal: 'Baxmal', dustlik: 'Dustlik',
    'jizzax-shahar': 'Jizzax shahar', zomin: 'Zomin',
    'navoiy-shahar': 'Navoiy shahar', nurota: 'Nurota', qiziltepa: 'Qiziltepa',
    zarafshon: 'Zarafshon', bogot: "Bog'ot", urganch: 'Urganch', xiva: 'Xiva',
    yangibozor: 'Yangibozor', guliston: 'Guliston', oqoltin: 'Oqoltin',
    'sirdaryo-shahar': 'Sirdaryo shahar', yangiyer: 'Yangiyer',
    moynoq: "Mo'ynoq", nukus: 'Nukus',
  };
  return names[id] || id;
}

function StatusBadge({ status }: { status: string }) {
  const colors = STATUS_COLORS[status] || STATUS_COLORS.PENDING;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
      {status}
    </span>
  );
}

function StatCard({ label, value, color, icon }: { label: string; value: number; color: string; icon: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${color}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

async function ApplicationsPageContent({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string; status?: string }>;
}) {
  const params = await searchParams;
  const query = (params.q || '').trim();
  const statusParam = (params.status || 'ALL') as StatusFilter;
  const page = Math.max(1, parseInt(params.page || '1', 10) || 1);

  const status = VALID_STATUSES.includes(statusParam) ? statusParam : 'ALL';

  const { applications, total, page: currentPage, totalPages } = applicationStore.getFiltered({
    status: status === 'ALL' ? undefined : status as 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED',
    search: query || undefined,
    page,
    limit: 10,
  });

  const stats = applicationStore.getStats();

  const statusTabs = [
    { key: 'ALL', label: 'Barcha', count: stats.total },
    { key: 'PENDING', label: 'Kutilayotgan', count: stats.pending },
    { key: 'APPROVED', label: 'Qabul qilingan', count: stats.approved },
    { key: 'REJECTED', label: 'Rad etilgan', count: stats.rejected },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Arizalar</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Telegram bot orqali kelgan arizalarni boshqaring
          </p>
        </div>
        <span className="text-sm text-gray-400 dark:text-gray-500">
          {total} ta ariza
        </span>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Barcha arizalar" value={stats.total} color="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" icon="📋" />
        <StatCard label="Kutilayotgan" value={stats.pending} color="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" icon="⏳" />
        <StatCard label="Qabul qilingan" value={stats.approved} color="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" icon="✅" />
        <StatCard label="Rad etilgan" value={stats.rejected} color="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" icon="❌" />
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        {/* Status Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 px-4 pt-3">
          <div className="flex gap-1 overflow-x-auto">
            {statusTabs.map((tab) => (
              <a
                key={tab.key}
                href={`/admin/applications?status=${tab.key}&q=${query}`}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                  status === tab.key
                    ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                {tab.label}
                <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                  status === tab.key
                    ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}>
                  {tab.count}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <form method="get" className="flex gap-3">
            <input type="hidden" name="status" value={status} />
            <div className="relative flex-1 max-w-md">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Ism, familiya yoki telefon raqam bo'yicha qidirish..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Qidirish
            </button>
            {query && (
              <a
                href={`/admin/applications?status=${status}`}
                className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Tozalash
              </a>
            )}
          </form>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <th className="py-3.5 px-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">#</th>
                <th className="py-3.5 px-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Abituriyent</th>
                <th className="py-3.5 px-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Telefon</th>
                <th className="py-3.5 px-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kurs</th>
                <th className="py-3.5 px-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Viloyat / Tuman</th>
                <th className="py-3.5 px-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Vaqt</th>
                <th className="py-3.5 px-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Holat</th>
                <th className="py-3.5 px-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sana</th>
                <th className="py-3.5 px-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {applications.map((app, index) => {
                const startNum = (currentPage - 1) * 10 + index + 1;
                return (
                  <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
                    <td className="py-4 px-4 text-sm text-gray-400 dark:text-gray-500">{startNum}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium shadow-sm">
                          {app.data.firstName.charAt(0)}{app.data.lastName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {app.data.firstName} {app.data.lastName}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">
                            Yosh: {app.data.age} · {app.data.experience || 'Tajriba yo\'q'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <a href={`tel:${app.data.phone}`} className="text-sm text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        {app.data.phone}
                      </a>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {getCourseName(app.data.courseId)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {getDistrictName(app.data.districtId)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                        {app.data.shift === 'Morning' ? '🌞 Ertalab' :
                         app.data.shift === 'Afternoon' ? '🌤 Kunduz' :
                         app.data.shift === 'Evening' ? '🌙 Kechqurun' : app.data.shift}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {app.createdAt.toLocaleDateString('uz-UZ', {
                        day: '2-digit', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit',
                      })}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        {app.status === 'PENDING' && (
                          <>
                            <form action={async () => {
                              'use server';
                              await updateApplicationStatus(app.id, 'APPROVED');
                            }}>
                              <button
                                type="submit"
                                className="px-3 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 rounded-lg transition-colors"
                                title="Qabul qilish"
                              >
                                ✅ Qabul
                              </button>
                            </form>
                            <form action={async () => {
                              'use server';
                              await updateApplicationStatus(app.id, 'REJECTED');
                            }}>
                              <button
                                type="submit"
                                className="px-3 py-1.5 text-xs font-medium text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg transition-colors"
                                title="Rad etish"
                              >
                                ❌ Rad et
                              </button>
                            </form>
                          </>
                        )}
                        {app.status === 'APPROVED' && (
                          <form action={async () => {
                            'use server';
                            await updateApplicationStatus(app.id, 'PENDING');
                          }}>
                            <button
                              type="submit"
                              className="px-3 py-1.5 text-xs font-medium text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/30 hover:bg-amber-100 dark:hover:bg-amber-900/50 rounded-lg transition-colors"
                              title="Qayta ochish"
                            >
                              ↩️ Qayta
                            </button>
                          </form>
                        )}
                        {app.status === 'REJECTED' && (
                          <form action={async () => {
                            'use server';
                            await updateApplicationStatus(app.id, 'PENDING');
                          }}>
                            <button
                              type="submit"
                              className="px-3 py-1.5 text-xs font-medium text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/30 hover:bg-amber-100 dark:hover:bg-amber-900/50 rounded-lg transition-colors"
                              title="Qayta ochish"
                            >
                              ↩️ Qayta
                            </button>
                          </form>
                        )}
                        <details className="relative inline-block">
                          <summary className="px-2 py-1.5 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors list-none">
                            📋
                          </summary>
                          <div className="absolute right-0 top-full mt-1 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-50 text-left">
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Batafsil</p>
                            <div className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
                              <p><span className="text-gray-400">Telegram:</span> {app.data.telegramId}</p>
                              <p><span className="text-gray-400">Noutbuk:</span> {app.data.device === 'yes' ? 'Ha' : 'Yo\'q'}</p>
                              <p><span className="text-gray-400">Izoh:</span> {app.data.note || '-'}</p>
                            </div>
                          </div>
                        </details>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {applications.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <span className="text-4xl">📭</span>
                      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Arizalar topilmadi</p>
                      <p className="text-gray-400 dark:text-gray-500 text-xs">
                        {query ? 'Qidiruv so\'rovini o\'zgartirib ko\'ring' : 'Hozircha arizalar mavjud emas'}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-medium">{total}</span> ta arizadan{' '}
            <span className="font-medium">{applications.length}</span> tasi ko\'rsatilmoqda
          </p>
          <div className="flex items-center gap-2">
            {currentPage > 1 && (
              <a
                href={`/admin/applications?page=${currentPage - 1}&status=${status}&q=${query}`}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                ← Oldingi
              </a>
            )}
            <span className="text-sm text-gray-500 dark:text-gray-400 px-2">
              {currentPage} / {totalPages}
            </span>
            {currentPage < totalPages && (
              <a
                href={`/admin/applications?page=${currentPage + 1}&status=${status}&q=${query}`}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Keyingi →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string; status?: string }>;
}) {
  await requireUser();
  return <ApplicationsPageContent searchParams={searchParams} />;
}
