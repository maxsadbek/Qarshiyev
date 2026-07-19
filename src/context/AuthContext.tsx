'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { AuthResult, RegisterData, User } from '@/types';
import {
  registerUser as localRegister,
  loginUser as localLogin,
  logoutUser as localLogout,
  getCurrentSessionUser,
} from '@/lib/local-auth';

// ============================================================
// Auth Context (client-side)
// ============================================================
// Pure localStorage authentication — NO Prisma, NO API calls.
// Works completely offline and on Vercel without DATABASE_URL.
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

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const refresh = useCallback(async () => {
    const sessionUser = getCurrentSessionUser();
    if (sessionUser) {
      // Load extended profile data from localStorage if available
      let avatar = '';
      let phone = '';
      let location = '';
      let bio = '';
      let birthDate = '';
      try {
        const profileRaw = localStorage.getItem('qarshiyev_profile');
        if (profileRaw) {
          const profile = JSON.parse(profileRaw);
          avatar = profile.avatar ?? '';
          phone = profile.phone ?? '';
          location = profile.location ?? '';
          bio = profile.bio ?? '';
          birthDate = profile.birthDate ?? '';
        }
      } catch {
        // ignore parse errors
      }

      setUser({
        id: sessionUser.id,
        name: sessionUser.name,
        email: sessionUser.email,
        joinedDate: sessionUser.createdAt,
        enrolledCourses: [],
        avatar,
        phone,
        location,
        bio,
        birthDate,
      });
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const login = async (email: string, password: string, _rememberMe = false): Promise<AuthResult> => {
    const result = await localLogin(email, password);
    if (result.ok) {
      await refresh();
    }
    return result;
  };

  const register = async (data: RegisterData): Promise<AuthResult> => {
    const result = await localRegister(data.name, data.email, data.password);
    if (result.ok) {
      // Also store confirmPassword-synced profile data
      await refresh();
    }
    return result;
  };

  const logout = async () => {
    localLogout();
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : prev));
    // Persist profile fields to localStorage
    try {
      const profile = {
        avatar: data.avatar ?? '',
        phone: data.phone ?? '',
        location: data.location ?? '',
        bio: data.bio ?? '',
        birthDate: data.birthDate ?? '',
      };
      localStorage.setItem('qarshiyev_profile', JSON.stringify(profile));
    } catch {
      // localStorage quota or other error — ignore
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};

