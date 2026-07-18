import { z } from 'zod';

// ============================================================
// Teacher Validation Schemas (hardened)
// ============================================================

const telegramId = z
  .string()
  .trim()
  .regex(/^\d{5,15}$/, 'Noto‘g‘ri Telegram ID')
  .optional()
  .or(z.literal(''));

const phone = z
  .string()
  .trim()
  .regex(/^\+?998\d{9}$|^(\+?\d{10,15})$/, 'Noto‘g‘ri telefon raqam')
  .optional()
  .or(z.literal(''));

export const createTeacherSchema = z.object({
  firstName: z.string().trim().min(2, 'Ism kamida 2 ta belgidan iborat').max(50),
  lastName: z.string().trim().min(2, 'Familiya kamida 2 ta belgidan iborat').max(50),
  email: z.string().trim().toLowerCase().email('Noto‘g‘ri email format'),
  phone,
  telegramId,
  bio: z.string().trim().max(2000).optional().or(z.literal('')),
  experience: z.coerce.number().int().min(0).max(80).default(0),
  languages: z.array(z.string().trim().min(1).max(50)).max(20).default([]),
  achievements: z.array(z.string().trim().min(1).max(200)).max(50).default([]),
  featured: z.boolean().default(false),
});

export const updateTeacherSchema = createTeacherSchema.partial().extend({
  id: z.string().uuid('Noto‘g‘ri ID'),
});

export const teacherFilterSchema = z.object({
  search: z.string().trim().max(100).optional(),
  category: z.string().trim().max(50).optional(),
  featured: z.enum(['true', 'false']).optional(),
  page: z.coerce.number().int().min(1).max(1000).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type CreateTeacherInput = z.infer<typeof createTeacherSchema>;
export type UpdateTeacherInput = z.infer<typeof updateTeacherSchema>;
export type TeacherFilterInput = z.infer<typeof teacherFilterSchema>;
