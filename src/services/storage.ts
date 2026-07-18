import { supabase } from '@/lib/supabase/client';
import { storageBuckets } from '@/config/supabase';

// ============================================================
// Storage Service
// ============================================================
// TODO: Implement file upload, download, and deletion
// TODO: Add image compression with Sharp (server-side)
// TODO: Add progress tracking for uploads

export async function uploadFile(
  _bucket: keyof typeof storageBuckets,
  _path: string,
  _file: File
) {
  // TODO: Validate file type and size
  // TODO: Upload to Supabase Storage
  // TODO: Get public URL
  throw new Error('Not implemented');
}

export async function deleteFile(_bucket: keyof typeof storageBuckets, _path: string) {
  // TODO: Delete file from Supabase Storage
  throw new Error('Not implemented');
}

export async function getPublicUrl(bucket: keyof typeof storageBuckets, path: string) {
  // TODO: Return public URL for the file
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

