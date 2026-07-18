/**
 * src/lib/security/file-validation.ts
 * Server-side validation for uploaded files.
 * Enforces max size, allowed MIME types and extension allow-list to prevent
 * malicious uploads (e.g. disguised executables, SVG script injection).
 */

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export const ALLOWED_FILE_TYPES: Record<string, string[]> = {
  'image/jpeg': ['jpg', 'jpeg'],
  'image/png': ['png'],
  'image/webp': ['webp'],
  'image/gif': ['gif'],
  'application/pdf': ['pdf'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['xlsx'],
  'application/vnd.ms-excel': ['xls'],
  'text/csv': ['csv'],
};

export interface FileValidationResult {
  ok: boolean;
  error?: string;
}

export function validateUpload(file: File, opts?: { maxSize?: number; allowed?: string[] }): FileValidationResult {
  const maxSize = opts?.maxSize ?? MAX_FILE_SIZE;
  if (!file || typeof file.size !== 'number') {
    return { ok: false, error: 'No file provided' };
  }
  if (file.size === 0) {
    return { ok: false, error: 'File is empty' };
  }
  if (file.size > maxSize) {
    return { ok: false, error: `File exceeds maximum size of ${Math.round(maxSize / 1024 / 1024)} MB` };
  }

  const mime = file.type;
  const allowedMap = opts?.allowed ? Object.fromEntries(opts.allowed.map((t) => [t, [t]])) : ALLOWED_FILE_TYPES;
  const allowedExts = allowedMap[mime];
  if (!allowedExts) {
    return { ok: false, error: `Unsupported file type: ${mime || 'unknown'}` };
  }

  const name = file.name.toLowerCase();
  if (!allowedExts.some((ext) => name.endsWith(`.${ext}`))) {
    return { ok: false, error: 'File extension does not match its content type' };
  }

  return { ok: true };
}

/** Sanitize a filename to prevent path traversal / null bytes. */
export function sanitizeFilename(name: string): string {
  return name
    .replace(/[^\w.\-]+/g, '_')
    .replace(/\.{2,}/g, '_')
    .slice(0, 100);
}
