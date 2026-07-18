// ============================================================
// useAuth Hook
// ============================================================
// Single source of truth for client-side auth: re-exports the
// context-based useAuth. The zustand auth store is retained for
// non-auth UI state but delegates to the same session.

export { useAuth } from '@/context/AuthContext';
export { useAuthStore } from '@/store/auth.store';

