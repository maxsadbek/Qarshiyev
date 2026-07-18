import { type ReactNode } from 'react';

// ============================================================
// Query Provider
// ============================================================
// TODO: Integrate React Query (TanStack Query) for server state caching
// TODO: Configure stale time, cache time, and retry logic

export function QueryProviderWrapper({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
