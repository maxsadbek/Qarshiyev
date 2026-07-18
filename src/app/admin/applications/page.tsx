import prisma from '../../../lib/prisma';
import { requirePermission } from '../../../lib/auth';

export const dynamic = 'force-dynamic';

// Vaqtinchalik type
type ApplicationWithRelations = any;

const VALID_STATUSES = ['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'] as const;
type StatusFilter = (typeof VALID_STATUSES)[number];

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string; status?: string }>;
}) {
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
                    {
                      student: {
                        user: {
                          firstName: {
                            contains: query,
                            mode: 'insensitive' as const,
                          },
                        },
                      },
                    },
                    {
                      student: {
                        user: {
                          lastName: {
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

  const [applications, total] = await Promise.all([
    prisma.application.findMany({
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
    }),
    prisma.application.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / take));

  return (
    <div className="space-y-6">
      {/* qolgan kod o'zgarmaydi */}
      {applications.map((app: any) => (
        <tr key={app.id}>
          {/* ... */}
        </tr>
      ))}
    </div>
  );
}
