/**
 * /api/students
 * CRUD endpoints for student management. Protected: requires students:read/write/manage.
 */
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { requirePermission } from '../../../lib/auth';
import { createStudentSchema, updateStudentSchema, studentFilterSchema } from '@/validation/students';
import { withApiHandler, securityHeadersInit } from '@/lib/security/api-response';

export const GET = withApiHandler(async (req) => {
  await requirePermission('students:read');

  const url = new URL(req.url);
  const params = studentFilterSchema.safeParse(Object.fromEntries(url.searchParams));
  const filters = params.data ?? { page: 1, limit: 20 };

  const where: Record<string, unknown> = {};
  if (filters.search) {
    where.OR = [
      { user: { firstName: { contains: filters.search, mode: 'insensitive' } } },
      { user: { lastName: { contains: filters.search, mode: 'insensitive' } } },
      { user: { email: { contains: filters.search, mode: 'insensitive' } } },
    ];
  }

  const [students, total] = await Promise.all([
    prisma.student.findMany({
      where,
      include: { user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true, isActive: true } }, district: { include: { region: true } } },
      skip: (filters.page - 1) * filters.limit,
      take: filters.limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.student.count({ where }),
  ]);

  return NextResponse.json({
    success: true,
    data: { students, total, page: filters.page, limit: filters.limit },
  }, { headers: securityHeadersInit() });
});

export const POST = withApiHandler(async (req) => {
  await requirePermission('students:write');

  const body = await req.json().catch(() => null);
  const parsed = createStudentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'Noto‘g‘ri ma’lumotlar', fields: parsed.error.flatten().fieldErrors },
      { status: 422, headers: securityHeadersInit() },
    );
  }

  const role = await prisma.role.findUnique({ where: { name: 'STUDENT' } });
  if (!role) {
    return NextResponse.json({ success: false, error: 'Role not found' }, { status: 500, headers: securityHeadersInit() });
  }

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) {
    return NextResponse.json({ success: false, error: 'Email already exists' }, { status: 409, headers: securityHeadersInit() });
  }

  const student = await prisma.student.create({
    data: {
      user: {
        create: {
          email: parsed.data.email,
          passwordHash: 'sso-managed',
          firstName: parsed.data.firstName,
          lastName: parsed.data.lastName,
          phone: parsed.data.phone || null,
          roleId: role.id,
          isActive: true,
        },
      },
    },
    include: { user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true } } },
  });

  return NextResponse.json({ success: true, data: student }, { status: 201, headers: securityHeadersInit() });
});
