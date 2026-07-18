import prisma from '../../../lib/prisma';
import { requirePermission } from '../../../lib/auth';

export const dynamic = 'force-dynamic';

/**
 * Local interface matching the exact shape returned by `prisma.student.findMany`
 * with the `include: { user: true, district: { include: { region: true } } }`
 * clause used below.
 *
 * Why this exists: Prisma 7 no longer exports a `Prisma` namespace from
 * `@prisma/client`, so `Prisma.StudentGetPayload<...>` is no longer available.
 * Relying purely on inference through `Promise.all([...])` in this project's
 * build turned out to widen the result to `any[]` (the conditional `where`
 * object's type isn't narrow enough for TypeScript to carry the inferred
 * `include` shape cleanly through the tuple in `Promise.all`), which is what
 * caused `student` in `.map((student) => ...)` to implicitly become `any`.
 * Declaring this interface explicitly and pinning the query result to it
 * removes the implicit-any error without disabling strict mode, without
 * `@ts-ignore`, without `any`, and without reintroducing a Prisma namespace
 * import. Only the fields actually used in this file are included.
 */
interface StudentWithRelations {
  id: string;
  createdAt: Date;
  user: {
    firstName: string;
    lastName: string;
    phone: string | null;
  };
  district: {
    region: {
      name: string;
    };
  } | null;
}

export default async function StudentsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  await requirePermission('students:read');

  const params = await searchParams;
  const query = (params.q || '').trim();
  const page = Math.max(1, parseInt(params.page || '1', 10) || 1);
  const take = 10;
  const skip = (page - 1) * take;

  const where = query
    ? {
      user: {
        OR: [
          { firstName: { contains: query, mode: 'insensitive' as const } },
          { lastName: { contains: query, mode: 'insensitive' as const } },
          { phone: { contains: query } },
        ],
      },
    }
    : {};

  const studentsQuery: Promise<StudentWithRelations[]> = prisma.student.findMany({
    where,
    include: { user: true, district: { include: { region: true } } },
    take,
    skip,
    orderBy: { createdAt: 'desc' },
  }) as Promise<StudentWithRelations[]>;

  const totalQuery: Promise<number> = prisma.student.count({ where });

  const [students, total]: [StudentWithRelations[], number] = await Promise.all([
    studentsQuery,
    totalQuery,
  ]);

  const totalPages = Math.max(1, Math.ceil(total / take));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Students</h2>
        <a
          href="/api/export/students?format=excel"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow transition"
        >
          Export Excel
        </a>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow border border-gray-200 dark:border-gray-700">
        <form className="mb-4" method="get">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search students..."
            className="border p-2 rounded w-full max-w-md dark:bg-gray-700 dark:border-gray-600"
          />
          <button type="submit" className="ml-2 bg-indigo-600 text-white px-4 py-2 rounded">Search</button>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Phone</th>
                <th className="py-2 px-4">Region</th>
                <th className="py-2 px-4">Registered Date</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student: StudentWithRelations) => (
                <tr key={student.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-2 px-4">{student.user.firstName} {student.user.lastName}</td>
                  <td className="py-2 px-4">{student.user.phone}</td>
                  <td className="py-2 px-4">{student.district?.region.name || 'N/A'}</td>
                  <td className="py-2 px-4">{student.createdAt.toLocaleDateString()}</td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-gray-500">No students found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">Showing {students.length} of {total}</span>
          <div className="space-x-2">
            {page > 1 && (
              <a href={`/admin/students?page=${page - 1}&q=${query}`} className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">Prev</a>
            )}
            {page < totalPages && (
              <a href={`/admin/students?page=${page + 1}&q=${query}`} className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">Next</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
