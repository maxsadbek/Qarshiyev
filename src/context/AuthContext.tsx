import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { AuthResult, RegisterData, User } from '@/types';

const USERS_KEY = 'qarshiyev_users';
const SESSION_KEY = 'qarshiyev_user';

interface AuthContextValue {
  user: User | null;
  users: User[];
  login: (email: string, password: string) => AuthResult;
  register: (data: RegisterData) => AuthResult;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

const readUsers = (): User[] => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as User[]) : [];
  } catch {
    return [];
  }
};

const writeUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => readUsers());
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }, [user]);

  const login = (email: string, password: string): AuthResult => {
    const normalized = email.trim().toLowerCase();
    const found = users.find(
      (u) => u.email.toLowerCase() === normalized && u.password === password
    );
    if (!found) {
      return { ok: false, error: 'Email yoki parol noto‘g‘ri' };
    }
    setUser(found);
    return { ok: true };
  };

  const register = (data: RegisterData): AuthResult => {
    const normalized = data.email.trim().toLowerCase();
    if (users.some((u) => u.email.toLowerCase() === normalized)) {
      return { ok: false, error: 'Bu email allaqachon ro‘yxatdan o‘tgan' };
    }
    const newUser: User = {
      id: generateId(),
      name: data.name.trim(),
      email: data.email.trim(),
      password: data.password,
      phone: data.phone?.trim(),
      role: 'student',
      joinedDate: new Date().toISOString(),
      enrolledCourses: [],
    };
    const nextUsers = [...users, newUser];
    setUsers(nextUsers);
    writeUsers(nextUsers);
    setUser(newUser);
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated: User = { ...user, ...data };
    setUser(updated);
    const nextUsers = users.map((u) => (u.id === updated.id ? updated : u));
    setUsers(nextUsers);
    writeUsers(nextUsers);
  };

  return (
    <AuthContext.Provider
      value={{ user, users, login, register, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
