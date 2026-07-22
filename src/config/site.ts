// ============================================================
// Site Configuration
// ============================================================
// Centralized configuration for the application.
// Update these values based on environment.

export const siteConfig = {
  name: 'Qarshiyev School',
  description: "O'zbekistondagi eng ishonchli va eng natijabardor ta'lim markazi",
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


