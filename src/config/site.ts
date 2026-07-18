// ============================================================
// Site Configuration
// ============================================================
// Centralized configuration for the application.
// Update these values based on environment.

export const siteConfig = {
  name: 'Qarshiyev AVYD',
  description: 'Quality education for a brighter future',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  locale: 'uz',
  currency: 'UZS',
  timezone: 'Asia/Tashkent',
} as const;

// ============================================================
// Feature Flags
// ============================================================
// TODO: Implement dynamic feature flagging (e.g., LaunchDarkly, Unleash)

export const features = {
  enableTelegramBot: true,
  enableDashboard: true,
  enableAdminPanel: true,
  enableOnlinePayments: false,
  enableBlogComments: false,
  enableStudentPortal: false,
} as const;

// ============================================================
// Role-Based Access Control
// ============================================================
// TODO: Move to database / config service when roles become dynamic

export const roles = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
} as const;

export const rolePermissions = {
  admin: ['*'],
  teacher: ['read:own_courses', 'write:own_courses', 'read:students'],
  student: ['read:courses', 'write:own_enrollments', 'read:own_profile'],
} as const;
