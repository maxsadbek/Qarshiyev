import type { ReactNode } from 'react';
import { SmoothScrollProvider } from '@/context/SmoothScrollProvider';
import { IntroProvider } from '@/context/IntroContext';
import { AuthProvider } from '@/context/AuthContext';
import { AssistantProvider } from '@/assistant/AssistantContext';
import '../index.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'QARSHIYEV SCHOOL — Taʼlim markazi',
    template: '%s | QARSHIYEV SCHOOL',
  },
  description:
    "QARSHIYEV SCHOOL — sifatli ta'lim, IELTS, ingliz tili va boshqa fanlar. O'quv markaziga xush kelibsiz.",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
    ],
    shortcut: '/favicon.svg',
    apple: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <SmoothScrollProvider>
          <IntroProvider>
            <AuthProvider>
              <AssistantProvider>
                {children}
              </AssistantProvider>
            </AuthProvider>
          </IntroProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
