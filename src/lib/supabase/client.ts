import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

// ============================================================
// Supabase Client (Browser)
// ============================================================
// TODO: Replace with actual Supabase project URL and anon key
// from your .env.local file

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
);

// ============================================================
// Supabase Server Client
// ============================================================
// TODO: Use this in Server Components / API Routes / Server Actions
// Requires cookies for session management

export const createSupabaseServerClient = () => {
  // TODO: Import cookies from 'next/headers' in Next.js App Router
  // For Vite + React Router, you may use a different session strategy
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  );
};

