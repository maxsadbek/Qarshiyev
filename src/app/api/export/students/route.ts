/**
 * GET /api/export/students
 * Exports students as CSV or Excel. Protected: requires ADMIN/OWNER + reports:export.
 */
import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import * as XLSX from 'xlsx';
import { requirePermission } from '../../../../lib/auth';
import { withApiHandler, securityHeadersInit, rateLimitHeaders } from '@/lib/security/api-response';
import { rateLimit, RATE_LIMITS } from '@/lib/security/rate-limit';
import { getClientIp } from '@/lib/security/request-context';

/**
 * Local interface matching the exact shape returned by `prisma.student.findMany`
 * with the `include: { user: true, district: { include: { region: true } } }`
 * clause used below.
 *
 * Why this exists: Prisma 7 no longer exports a `Prisma` namespace from
 * `@prisma/client`, so `Prisma.StudentGetPayload<...>` is no longer available.
 * Relying purely on inference from the bare `await prisma.student.findMany(...)`
 * call (with no assignment-site annotation) turned out to widen the result to
 * `any[]` in this build, which is what caused `s` in `.map((s) => ...)` to
 * implicitly become `any`. Declaring this interface explicitly and pinning the
 * query result to it removes the implicit-any error without disabling strict
 * mode, without `@ts-ignore`, without `any`, and without reintroducing a Prisma
 * namespace import. Only the fields actually used in this file are included.
 */
interface StudentWithRelations {
  id: string;
  createdAt: Date;
  user: {
    firstName: string;
    lastName: string;
    phone: string | null;
    email: string;
  };
  district: {
    name: string;
    region: {
      name: string;
    };
  } | null;
}

export const GET = withApiHandler(async (req) => {
  const session = await requirePermission('reports:export').catch(() => null);
  if (!session) return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403, headers: securityHeadersInit() });

  const ip = getClientIp(req);
  const limit = rateLimit(`export:${ip}`, { ...RATE_LIMITS.api, limit: 20 });
  if (!limit.success) {
    return NextResponse.json({ success: false, error: 'Too many requests' }, { status: 429, headers: { ...securityHeadersInit(), ...rateLimitHeaders(limit) } });
  }

  const { searchParams } = new URL(req.url);
  const format = searchParams.get('format') || 'csv';

  const studentsQuery: Promise<StudentWithRelations[]> = prisma.student.findMany({
    include: { user: true, district: { include: { region: true } } },
    orderBy: { createdAt: 'desc' },
  }) as Promise<StudentWithRelations[]>;

  const students: StudentWithRelations[] = await studentsQuery;

  const flatData = students.map((s: StudentWithRelations) => ({
    ID: s.id,
    FirstName: s.user.firstName,
    LastName: s.user.lastName,
    Phone: s.user.phone ?? '',
    Email: s.user.email,
    Region: s.district?.region.name || '',
    District: s.district?.name || '',
    RegisteredAt: s.createdAt.toISOString(),
  }));

  const worksheet = XLSX.utils.json_to_sheet(flatData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');

  if (format === 'excel') {
    const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    return new NextResponse(excelBuffer, {
      headers: {
        ...securityHeadersInit(),
        ...rateLimitHeaders(limit),
        'Content-Disposition': 'attachment; filename="students.xlsx"',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
    });
  }
  const csvString = XLSX.utils.sheet_to_csv(worksheet);
  return new NextResponse(csvString, {
    headers: {
      ...securityHeadersInit(),
      ...rateLimitHeaders(limit),
      'Content-Disposition': 'attachment; filename="students.csv"',
      'Content-Type': 'text/csv',
    },
  });
});
