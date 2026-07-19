import { z } from 'zod';

// ============================================================
// Auth Validation Schemas (hardened)
// ============================================================

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email('Noto‘g‘ri email format'),
  password: z.string().min(1, 'Parol kiritilishi shart').max(200),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, 'Ism kamida 2 ta belgidan iborat').max(100),
    email: z.string().trim().toLowerCase().email('Noto‘g‘ri email format'),
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
