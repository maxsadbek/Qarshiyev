// ============================================================
// Student Actions (client-side server-action creators)
// Delegate to the secured API routes. CRUD endpoints to be exposed
// under /api/students with RBAC + validation.
// ============================================================

export async function fetchStudents(_filters?: { search?: string; page?: number; limit?: number }) {
  const res = await fetch('/api/students', { headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin' });
  const data = await res.json().catch(() => ({}));
  return data;
}

export async function createStudent(_input: unknown) {
  const res = await fetch('/api/students', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin', body: JSON.stringify(_input) });
  const data = await res.json().catch(() => ({}));
  return data;
}

export async function updateStudent(_input: unknown) {
  const res = await fetch('/api/students', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin', body: JSON.stringify(_input) });
  const data = await res.json().catch(() => ({}));
  return data;
}

export async function deleteStudent(_id: string) {
  const res = await fetch(`/api/students?id=${encodeURIComponent(_id)}`, { method: 'DELETE', credentials: 'same-origin' });
  const data = await res.json().catch(() => ({}));
  return data;
}

