'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import prisma from '../../../lib/prisma';
import { z } from 'zod';

const COOKIE_NAME = process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME || 'qarshiyev_session';

async function getSessionUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}

const UpdatePhoneSchema = z.object({
  phone: z.string().min(9, 'Phone must be at least 9 characters').max(20),
});

const UpdateNoteSchema = z.object({
  note: z.string().max(1000, 'Note is too long (max 1000 chars)'),
});

export async function updatePhone(formData: FormData) {
  const userId = await getSessionUserId();
  if (!userId) redirect('/student/login');

  const parsed = UpdatePhoneSchema.safeParse({ phone: formData.get('phone') });
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  await prisma.user.update({
    where: { id: userId },
    data: { phone: parsed.data.phone },
  });

  revalidatePath('/student/settings');
  return { success: 'Phone number updated successfully.' };
}

export async function updateNote(formData: FormData) {
  const userId = await getSessionUserId();
  if (!userId) redirect('/student/login');

  const parsed = UpdateNoteSchema.safeParse({ note: formData.get('note') });
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  // Find the latest application and update its notes field
  const student = await prisma.student.findUnique({ where: { userId } });
  if (!student) return { error: 'Student profile not found.' };

  const latestApp = await prisma.application.findFirst({
    where: { studentId: student.id },
    orderBy: { createdAt: 'desc' },
  });

  if (!latestApp) return { error: 'No application found to update.' };

  await prisma.application.update({
    where: { id: latestApp.id },
    data: { notes: parsed.data.note },
  });

  revalidatePath('/student/settings');
  return { success: 'Note updated successfully.' };
}
