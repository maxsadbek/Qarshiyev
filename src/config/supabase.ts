import { siteConfig } from './site';

// ============================================================
// Supabase Configuration
// ============================================================
// TODO: Add storage buckets, auth settings, edge function configs

export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  storageBucket: process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'public-assets',
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
};

// ============================================================
// Storage Buckets
// ============================================================
// TODO: Configure actual bucket names and policies in Supabase dashboard

export const storageBuckets = {
  avatars: 'avatars',
  courseMaterials: 'course-materials',
  certificates: 'certificates',
  gallery: 'gallery',
} as const;

// ============================================================
// Realtime Channels
// ============================================================
// TODO: Define realtime subscriptions for dashboard / notifications

export const realtimeChannels = {
  notifications: 'notifications',
  chat: 'chat',
  courseUpdates: 'course-updates',
} as const;
