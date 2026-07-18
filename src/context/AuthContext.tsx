import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { AuthResult, RegisterData, User } from '@/types';
import { csrfFetch } from '@/lib/client/csrf';

// ============================================================
// Auth Context (client-side)
// ============================================================
// Delegates authentication to the secured Next.js API (/api/auth/*).
// The session is stored in an HttpOnly, Secure, SameSite=Strict cookie set
// by the server — NEVER in localStorage. This context only holds the
// client-side view of the authenticated user (no secrets, no passwords).
// ============================================================

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<AuthResult>;
  register: (data: RegisterData) => Promise<AuthResult>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => void;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

async function fetchMe(): Promise<User | null> {
  try {
    const res = await fetch('/api/auth/me', { credentials: 'same-origin' });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.user ?? null;
  } catch {
    return null;
  }
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const refresh = async () => {
    const me = await fetchMe();
    setUser(me);
  };

  useEffect(() => {
    void refresh();
  }, []);

  const login = async (email: string, password: string, rememberMe = false): Promise<AuthResult> => {
    try {
      const res = await csrfFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password, rememberMe }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        await refresh();
        return { ok: true };
      }
      return { ok: false, error: data.error ?? 'Email yoki parol noto‘g‘ri' };
    } catch {
      return { ok: false, error: 'Tarmoq xatosi' };
    }
  };

  const register = async (data: RegisterData): Promise<AuthResult> => {
    try {
      const res = await csrfFetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      const result = await res.json().catch(() => ({}));
      if (res.ok && result.success) {
        await refresh();
        return { ok: true };
      }
      return { ok: false, error: result.error ?? 'Ro‘yxatdan o‘tib bo‘lmadi' };
    } catch {
      return { ok: false, error: 'Tarmoq xatosi' };
    }
  };

  const logout = async () => {
    await csrfFetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : prev));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};
