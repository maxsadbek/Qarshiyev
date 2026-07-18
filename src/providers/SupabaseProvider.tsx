import { type ReactNode, useEffect, useState, createContext, useContext } from 'react';
import { supabase, createSupabaseServerClient } from '@/lib/supabase/client';

// ============================================================
// Supabase Context
// ============================================================

interface SupabaseContextValue {
  supabase: typeof supabase;
  user: unknown | null;
  session: unknown | null;
  isLoading: boolean;
}

const SupabaseContext = /* @__PURE__ */ createContext<SupabaseContextValue | null>(null);

// ============================================================
// Supabase Provider
// ============================================================
// TODO: Add auth state change listener
// TODO: Persist session in localStorage / cookies

export function SupabaseProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<unknown | null>(null);
  const [session, setSession] = useState<unknown | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Check for existing session on mount
    // const { data: { session } } = await supabase.auth.getSession();
    // setSession(session);
    // setUser(session?.user ?? null);
    // setIsLoading(false);

    setIsLoading(false);
  }, []);

  return (
    <SupabaseContext.Provider value={{ supabase, user, session, isLoading }}>
      {children}
    </SupabaseContext.Provider>
  );
}

// ============================================================
// useSupabase Hook
// ============================================================
// TODO: Add convenience hooks: useUser, useSession, useRealtime

export function useSupabase() {
  const context = /* @__PURE__ */ useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
}
