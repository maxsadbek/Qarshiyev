// ============================================================
// Teacher Actions (client-side server-action creators)
// Delegate to the secured API routes. CRUD endpoints to be exposed
// under /api/teachers with RBAC + validation.
// ============================================================

export async function fetchTeachers(_filters?: { search?: string; category?: string; page?: number; limit?: number }) {
  const res = await fetch('/api/teachers', { headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin' });
  const data = await res.json().catch(() => ({}));
  return data;
}

export async function createTeacher(_input: unknown) {
  const res = await fetch('/api/teachers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin', body: JSON.stringify(_input) });
  const data = await res.json().catch(() => ({}));
  return data;
}

export async function updateTeacher(_input: unknown) {
  const res = await fetch('/api/teachers', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin', body: JSON.stringify(_input) });
  const data = await res.json().catch(() => ({}));
  return data;
}

export async function deleteTeacher(_id: string) {
  const res = await fetch(`/api/teachers?id=${encodeURIComponent(_id)}`, { method: 'DELETE', credentials: 'same-origin' });
  const data = await res.json().catch(() => ({}));
  return data;
}

