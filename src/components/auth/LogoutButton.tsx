'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/constants';

interface LogoutButtonProps {
  className?: string;
  label?: string;
}

/**
 * Client component that logs the user out via localStorage and redirects home.
 */
export function LogoutButton({ className = '', label = 'Logout' }: LogoutButtonProps) {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push(ROUTES.HOME);
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={className}
    >
      {label}
    </button>
  );
}
