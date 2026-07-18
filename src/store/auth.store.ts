import { create } from 'zustand';

// ============================================================
// Auth Store (Zustand)
// ============================================================
// TODO: Replace localStorage-based auth with Supabase Auth
// TODO: Integrate with React Hook Form for form state management
// TODO: Add token refresh logic

export interface AuthState {
  user: { id: string; email: string; name: string; role: string } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setUser: (user: AuthState['user']) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  logout: () => set({ user: null, isAuthenticated: false, error: null }),
}));
