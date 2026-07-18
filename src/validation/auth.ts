import { z } from 'zod';

// ============================================================
// Auth Validation Schemas (hardened)
// ============================================================

// Uzbekistan phone numbers: +998 followed by 9 digits, or 9 digits starting with 9/3 etc.
const phoneSchema = z
  .string()
  .trim()
  .regex(/^\+?998\d{9}$|^(\+?\d{10,15})$/, 'Noto‘g‘ri telefon raqam')
  .optional()
  .or(z.literal(''));

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email('Noto‘g‘ri email format'),
  password: z.string().min(1, 'Parol kiritilishi shart').max(200),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    firstName: z.string().trim().min(2, 'Ism kamida 2 ta belgidan iborat').max(50),
    lastName: z.string().trim().min(2, 'Familiya kamida 2 ta belgidan iborat').max(50),
    email: z.string().trim().toLowerCase().email('Noto‘g‘ri email format'),
    password: z
      .string()
      .min(8, 'Parol kamida 8 ta belgidan iborat')
      .max(200)
      .regex(/[A-Za-z]/, 'Parolda harf bo‘lishi shart')
      .regex(/[0-9]/, 'Parolda raqam bo‘lishi shart'),
    confirmPassword: z.string(),
    phone: phoneSchema,
    role: z.enum(['STUDENT', 'TEACHER']).default('STUDENT'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Parollar mos kelmadi',
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().trim().toLowerCase().email('Noto‘g‘ri email format'),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(10, 'Token noto‘g‘ri'),
    password: z
      .string()
      .min(8, 'Parol kamida 8 ta belgidan iborat')
      .max(200)
      .regex(/[A-Za-z]/, 'Parolda harf bo‘lishi shart')
      .regex(/[0-9]/, 'Parolda raqam bo‘lishi shart'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Parollar mos kelmadi',
    path: ['confirmPassword'],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

