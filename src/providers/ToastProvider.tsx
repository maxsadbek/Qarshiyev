import { type ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { useUIStore } from '@/store/ui.store';

// ============================================================
// Toast Provider
// ============================================================
// Wraps the app with React Hot Toast Toaster.
// Configure toast options globally here.

export function ToastProvider({ children }: { children: ReactNode }) {
  const theme = useUIStore((state) => state.theme);

  return (
    <>
      {children}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        theme={theme === 'dark' ? 'dark' : 'light'}
        toastOptions={{
          duration: 4000,
          style: {
            background: theme === 'dark' ? '#1f2937' : '#ffffff',
            color: theme === 'dark' ? '#f3f4f6' : '#111827',
            border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
            borderRadius: '8px',
            padding: '12px 16px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: 'white',
            },
          },
        }}
      />
    </>
  );
}
