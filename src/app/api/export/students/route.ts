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

  const students = await prisma.student.findMany({
    include: { user: true, district: { include: { region: true } } },
    orderBy: { createdAt: 'desc' },
  });

  const flatData = students.map((s) => ({
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

