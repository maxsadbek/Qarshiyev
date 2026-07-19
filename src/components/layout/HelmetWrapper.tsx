'use client';

import { HelmetProvider } from 'react-helmet-async';
import type { ReactNode } from 'react';

/**
 * Client boundary wrapper for HelmetProvider from react-helmet-async.
 * Root layout is a server component, so HelmetProvider must be wrapped
 * in its own client component to avoid ESM/CJS interop errors at build time.
 */
export function HelmetWrapper({ children }: { children: ReactNode }) {
  return <HelmetProvider>{children}</HelmetProvider>;
}
