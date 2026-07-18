import { z } from 'zod';

// ============================================================
// Student Validation Schemas (hardened)
// ============================================================

const phone = z
  .string()
  .trim()
  .regex(/^\+?998\d{9}$|^(\+?\d{10,15})$/, 'Noto‘g‘ri telefon raqam')
  .optional()
  .or(z.literal(''));

const emailOpt = z.string().trim().toLowerCase().email('Noto‘g‘ri email format').optional().or(z.literal(''));

export const createStudentSchema = z.object({
  firstName: z.string().trim().min(2, 'Ism kamida 2 ta belgidan iborat').max(50),
  lastName: z.string().trim().min(2, 'Familiya kamida 2 ta belgidan iborat').max(50),
  email: z.string().trim().toLowerCase().email('Noto‘g‘ri email format'),
  phone,
  birthDate: z.string().datetime().or(z.string().refine((s) => !isNaN(Date.parse(s)), 'Noto‘g‘ri sana')).optional().or(z.literal('')),
  address: z.string().trim().max(500).optional().or(z.literal('')),
  parentName: z.string().trim().max(100).optional().or(z.literal('')),
  parentPhone: phone,
  parentEmail: emailOpt,
  grade: z.string().trim().max(20).optional().or(z.literal('')),
  school: z.string().trim().max(200).optional().or(z.literal('')),
  notes: z.string().trim().max(2000).optional().or(z.literal('')),
  status: z.enum(['ACTIVE', 'INACTIVE', 'GRADUATED', 'SUSPENDED']).default('ACTIVE'),
});

export const updateStudentSchema = createStudentSchema.partial().extend({
  id: z.string().uuid('Noto‘g‘ri ID'),
});

export const studentFilterSchema = z.object({
  search: z.string().trim().max(100).optional(),
  grade: z.string().trim().max(20).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'GRADUATED', 'SUSPENDED']).optional(),
  page: z.coerce.number().int().min(1).max(1000).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type CreateStudentInput = z.infer<typeof createStudentSchema>;
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;
export type StudentFilterInput = z.infer<typeof studentFilterSchema>;
