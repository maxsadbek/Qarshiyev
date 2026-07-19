/**
 * /api/teachers
 * CRUD endpoints for teacher management. Protected: requires teachers:read/write/manage.
 */
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { requirePermission } from '../../../lib/auth';
import { createTeacherSchema, updateTeacherSchema, teacherFilterSchema } from '@/validation/teachers';
import { withApiHandler, securityHeadersInit } from '@/lib/security/api-response';

export const GET = withApiHandler(async (req) => {
  await requirePermission('teachers:read');

  const url = new URL(req.url);
  const params = teacherFilterSchema.safeParse(Object.fromEntries(url.searchParams));
  const filters = params.data ?? { page: 1, limit: 20 };

  const where: Record<string, unknown> = {};
  if (filters.search) {
    where.OR = [
      { user: { firstName: { contains: filters.search, mode: 'insensitive' } } },
      { user: { lastName: { contains: filters.search, mode: 'insensitive' } } },
      { user: { email: { contains: filters.search, mode: 'insensitive' } } },
    ];
  }
  if (filters.featured !== undefined) {
    // No direct featured field on teacher model, so skip
  }

  const [teachers, total] = await Promise.all([
    prisma.teacher.findMany({
      where,
      include: { user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true, isActive: true } } },
      skip: (filters.page - 1) * filters.limit,
      take: filters.limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.teacher.count({ where }),
  ]);

  return NextResponse.json({
    success: true,
    data: { teachers, total, page: filters.page, limit: filters.limit },
  }, { headers: securityHeadersInit() });
});

export const POST = withApiHandler(async (req) => {
  await requirePermission('teachers:write');

  const body = await req.json().catch(() => null);
  const parsed = createTeacherSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'Noto‘g‘ri ma’lumotlar', fields: parsed.error.flatten().fieldErrors },
      { status: 422, headers: securityHeadersInit() },
    );
  }

  const role = await prisma.role.findUnique({ where: { name: 'TEACHER' } });
  if (!role) {
    return NextResponse.json({ success: false, error: 'Role not found' }, { status: 500, headers: securityHeadersInit() });
  }

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) {
    return NextResponse.json({ success: false, error: 'Email already exists' }, { status: 409, headers: securityHeadersInit() });
  }

  const teacher = await prisma.teacher.create({
    data: {
      user: {
        create: {
          email: parsed.data.email,
          passwordHash: 'sso-managed',
          firstName: parsed.data.firstName,
          lastName: parsed.data.lastName,
          phone: parsed.data.phone || null,
          telegramId: parsed.data.telegramId || null,
          roleId: role.id,
          isActive: true,
        },
      },
      bio: parsed.data.bio || null,
    },
    include: { user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true } } },
  });

  return NextResponse.json({ success: true, data: teacher }, { status: 201, headers: securityHeadersInit() });
});
