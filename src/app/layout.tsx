import type { ReactNode } from 'react';
import { SmoothScrollProvider } from '@/context/SmoothScrollProvider';
import { IntroProvider } from '@/context/IntroContext';
import { AuthProvider } from '@/context/AuthContext';
import { AssistantProvider } from '@/assistant/AssistantContext';
import '../index.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
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
