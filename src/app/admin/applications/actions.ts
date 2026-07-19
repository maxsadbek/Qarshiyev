'use server';

import { revalidatePath } from 'next/cache';
import { applicationStore } from '../../../modules/applications/store';

export async function updateApplicationStatus(
  id: string,
  status: 'APPROVED' | 'REJECTED' | 'PENDING' | 'CANCELLED'
) {
  const success = applicationStore.updateStatus(id, status);
  if (!success) {
    return { success: false, error: 'Application not found' };
  }
  revalidatePath('/admin/applications');
  return { success: true };
}


