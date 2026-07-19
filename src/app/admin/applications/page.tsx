import prisma from '../../../lib/prisma';
import { requireUser } from '../../../lib/auth';

export const dynamic = 'force-dynamic';

interface ApplicationWithRelations {
  id: string;
  status: string;
  notes: string | null;
  createdAt: Date;
  student: {
    id: string;
    user: {
      name: string;
      phone: string | null;
    };
  };
  course: {
    id: string;
    title: string;
  };
}

const VALID_STATUSES = ['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'] as const;
type StatusFilter = (typeof VALID_STATUSES)[number];

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string; status?: string }>;
}) {
  await requireUser();

  const params = await searchParams;
  const query = (params.q || '').trim();
  const status = params.status as StatusFilter | undefined;
  const page = Math.max(1, parseInt(params.page || '1', 10) || 1);
  const take = 10;
  const skip = (page - 1) * take;

  const where =
    query || (status && VALID_STATUSES.includes(status))
      ? {
          AND: [
            query
              ? {
                  OR: [
                    {
                      student: {
                        user: {
                          name: {
                            contains: query,
                            mode: 'insensitive' as const,
                          },
                        },
                      },
                    },
                  ],
                }
              : {},
            status && VALID_STATUSES.includes(status) ? { status } : {},
          ],
        }
      : {};

  const applicationsQuery: Promise<ApplicationWithRelations[]> = prisma.application.findMany({
    where,
    include: {
      student: {
        include: {
          user: true,
        },
      },
      course: true,
    },
    take,
    skip,
    orderBy: {
      createdAt: 'desc',
    },
  }) as Promise<ApplicationWithRelations[]>;

  const totalQuery: Promise<number> = prisma.application.count({ where });

  const [applications, total]: [ApplicationWithRelations[], number] = await Promise.all([
    applicationsQuery,
    totalQuery,
  ]);

  const totalPages = Math.max(1, Math.ceil(total / take));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Applications</h2>

      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow border border-gray-200 dark:border-gray-700">
        <form className="mb-4 flex gap-2" method="get">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search applications..."
            className="border p-2 rounded w-full max-w-md dark:bg-gray-700 dark:border-gray-600"
          />
          <select name="status" defaultValue={status || ''} className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600">
            <option value="">All Statuses</option>
            {VALID_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Filter</button>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="py-2 px-4">Student</th>
                <th className="py-2 px-4">Phone</th>
                <th className="py-2 px-4">Course</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app: ApplicationWithRelations) => (
                <tr key={app.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-2 px-4">{app.student.user.name}</td>
                  <td className="py-2 px-4">{app.student.user.phone}</td>
                  <td className="py-2 px-4">{app.course.title}</td>
                  <td className="py-2 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      app.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                      app.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                      app.status === 'CANCELLED' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="py-2 px-4">{app.createdAt.toLocaleDateString()}</td>
                </tr>
              ))}
              {applications.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-500">No applications found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">Showing {applications.length} of {total}</span>
          <div className="space-x-2">
            {page > 1 && (
              <a href={`/admin/applications?page=${page - 1}&q=${query}&status=${status || ''}`} className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">Prev</a>
            )}
            {page < totalPages && (
              <a href={`/admin/applications?page=${page + 1}&q=${query}&status=${status || ''}`} className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">Next</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
