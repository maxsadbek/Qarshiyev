'use client';

import { csrfFetch } from '@/lib/client/csrf';
import { useRouter } from 'next/navigation';

interface LogoutButtonProps {
  className?: string;
  label?: string;
}

/**
 * Client component that logs the user out via the API with proper CSRF protection
 * and redirects to the home page on success.
 * Use this instead of <form action="/api/auth/logout"> which would fail CSRF checks.
 */
export function LogoutButton({ className = '', label = 'Logout' }: LogoutButtonProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await csrfFetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // Even if the request fails, navigate away
    }
    router.push('/');
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
