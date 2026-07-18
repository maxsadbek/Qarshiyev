import prisma from '../../../lib/prisma';
import { requirePermission } from '../../../lib/auth';

export const dynamic = 'force-dynamic';

/**
 * Local interface matching the exact shape returned by `prisma.application.findMany`
 * with the `include: { student: { include: { user: true } }, course: true }`
 * clause used below.
 *
 * Why this exists: this previously used a placeholder `type ApplicationWithRelations = any;`
 * left over from removing `Prisma.ApplicationGetPayload<...>` (Prisma 7 no longer
 * exports a `Prisma` namespace from `@prisma/client`). Using `any` here defeats
 * type checking entirely and was also the root cause of `app` in
 * `.map((app: any) => ...)` being explicitly untyped. Declaring this interface
 * removes both problems without disabling strict mode, without `@ts-ignore`,
 * and without a Prisma namespace import.
 */
interface ApplicationWithRelations {
  id: string;
  status: string;
  notes: string | null;
  createdAt: Date;
  student: {
    id: string;
    user: {
      firstName: string;
      lastName: string;
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
      {/* qolgan kod o'zgarmaydi */}
      {applications.map((app: ApplicationWithRelations) => (
        <tr key={app.id}>
          {/* ... */}
        </tr>
      ))}
    </div>
  );
}
