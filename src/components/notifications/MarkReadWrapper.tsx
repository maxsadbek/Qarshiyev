'use client';

import { useEffect } from 'react';
import { csrfFetch } from '@/lib/client/csrf';

/**
 * Client component that marks notifications as read via the API.
 * Uses csrfFetch to properly include the CSRF token header.
 * Must be rendered inside the Server Component page after the notification
 * data has already been fetched, so there's no flash of updated content.
 */
export function MarkReadWrapper() {
  useEffect(() => {
    csrfFetch('/api/notifications/mark-read', {
      method: 'POST',
    }).catch(() => {
      // Silently ignore — marking as read is non-critical
    });
  }, []);

  return null;
}
