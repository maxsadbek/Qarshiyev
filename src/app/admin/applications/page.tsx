import prisma from '../../../lib/prisma';
import { requirePermission } from '../../../lib/auth';

export const dynamic = 'force-dynamic';

const VALID_STATUSES = ['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'] as const;
type StatusFilter = (typeof VALID_STATUSES)[number];

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string; status?: string }>;
}) {
  // RBAC: only ADMIN/OWNER (with applications:read) may view this page.
  await requirePermission('applications:read');

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
                    { student: { user: { firstName: { contains: query, mode: 'insensitive' as const } } } },
                    { student: { user: { lastName: { contains: query, mode: 'insensitive' as const } } } },
                  ],
                }
              : {},
            status && VALID_STATUSES.includes(status) ? { status } : {},
          ],
        }
      : {};

  const [applications, total] = await Promise.all([
    prisma.application.findMany({
      where,
      include: {
        student: { include: { user: true } },
        course: true,
      },
      take,
      skip,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.application.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / take));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Applications</h2>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="py-2 px-4">Student</th>
                <th className="py-2 px-4">Course</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-2 px-4">{app.student.user.firstName} {app.student.user.lastName}</td>
                  <td className="py-2 px-4">{app.course.title}</td>
                  <td className="py-2 px-4">
                    <span className={`px-2 py-1 rounded text-xs text-white ${
                      app.status === 'APPROVED' ? 'bg-green-500' :
                      app.status === 'REJECTED' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="py-2 px-4">{app.createdAt.toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">Showing {applications.length} of {total}</span>
          <div className="space-x-2">
            {page > 1 && (
              <a href={`/admin/applications?page=${page - 1}&q=${query}`} className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">Prev</a>
            )}
            {page < totalPages && (
              <a href={`/admin/applications?page=${page + 1}&q=${query}`} className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">Next</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

