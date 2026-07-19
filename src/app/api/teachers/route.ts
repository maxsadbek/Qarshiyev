/**
 * /api/teachers
 * CRUD endpoints for teacher management. Protected: requires authentication.
 */
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { requireUser } from '../../../lib/auth';
import { createTeacherSchema, updateTeacherSchema, teacherFilterSchema } from '@/validation/teachers';
import { withApiHandler, securityHeadersInit } from '@/lib/security/api-response';

export const GET = withApiHandler(async (req) => {
  await requireUser();

  const url = new URL(req.url);
  const params = teacherFilterSchema.safeParse(Object.fromEntries(url.searchParams));
  const filters = params.data ?? { page: 1, limit: 20 };

  const where: Record<string, unknown> = {};
  if (filters.search) {
    where.OR = [
      { user: { name: { contains: filters.search, mode: 'insensitive' } } },
      { user: { email: { contains: filters.search, mode: 'insensitive' } } },
    ];
  }

  const [teachers, total] = await Promise.all([
    prisma.teacher.findMany({
      where,
      include: { user: { select: { id: true, name: true, email: true, phone: true, isActive: true } } },
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
  await requireUser();

  const body = await req.json().catch(() => null);
  const parsed = createTeacherSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'Noto‘g‘ri ma’lumotlar', fields: parsed.error.flatten().fieldErrors },
      { status: 422, headers: securityHeadersInit() },
    );
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
          name: `${parsed.data.firstName} ${parsed.data.lastName}`.trim(),
          phone: parsed.data.phone || null,
          telegramId: parsed.data.telegramId || null,
          isActive: true,
        },
      },
      bio: parsed.data.bio || null,
    },
    include: { user: { select: { id: true, name: true, email: true, phone: true } } },
  });

  return NextResponse.json({ success: true, data: teacher }, { status: 201, headers: securityHeadersInit() });
});
