// ============================================================
// Auth Actions (client-side server-action creators)
// These now delegate to the secured API routes under /api/auth/*.
// ============================================================

export interface LoginResult {
  ok: boolean;
  error?: string;
  token?: string;
  csrf?: string;
  user?: { id: string; email: string; name: string };
}

async function postJson(url: string, body: unknown) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    credentials: 'same-origin',
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
}

export async function login(input: { email: string; password: string; rememberMe?: boolean }): Promise<LoginResult> {
  const { status, data } = await postJson('/api/auth/login', input);
  if (status === 200 && data.success) {
    return { ok: true, user: data.user };
  }
  return { ok: false, error: data.error ?? 'Kirish amalga oshmadi' };
}

export async function register(input: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}): Promise<{ ok: boolean; error?: string }> {
  const { status, data } = await postJson('/api/auth/register', input);
  if (status === 200 && data.success) return { ok: true };
  return { ok: false, error: data.error ?? 'Ro‘yxatdan o‘tib bo‘lmadi' };
}

export async function logout(): Promise<void> {
  await postJson('/api/auth/logout', {});
}

export async function forgotPassword(input: { email: string }): Promise<{ ok: boolean; message?: string }> {
  const { data } = await postJson('/api/auth/forgot-password', input);
  return { ok: !!data.success, message: data.message };
}

export async function resetPassword(input: { token: string; password: string; confirmPassword: string }): Promise<{ ok: boolean; error?: string }> {
  const { status, data } = await postJson('/api/auth/reset-password', input);
  if (status === 200 && data.success) return { ok: true };
  return { ok: false, error: data.error };
}

