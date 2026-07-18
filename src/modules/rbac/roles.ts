/**
 * src/modules/rbac/roles.ts
 * Role-Based Access Control definitions and permission checks.
 *
 * Roles: OWNER (full), ADMIN, TEACHER (own data), STUDENT (own profile).
 * Permissions are coarse resources with actions: read/write/manage.
 */

export const ROLE = {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
} as const;

export type RoleName = (typeof ROLE)[keyof typeof ROLE];

export type Permission =
  | 'students:read'
  | 'students:write'
  | 'students:manage'
  | 'teachers:read'
  | 'teachers:write'
  | 'teachers:manage'
  | 'dashboard:read'
  | 'analytics:read'
  | 'reports:read'
  | 'reports:export'
  | 'roles:manage'
  | 'applications:read'
  | 'applications:write'
  | 'notifications:read'
  | 'notifications:write'
  | 'profile:read'
  | 'profile:write';

const OWNER_PERMISSIONS: Permission[] = [
  'students:read', 'students:write', 'students:manage',
  'teachers:read', 'teachers:write', 'teachers:manage',
  'dashboard:read', 'analytics:read', 'reports:read', 'reports:export',
  'roles:manage', 'applications:read', 'applications:write',
  'notifications:read', 'notifications:write', 'profile:read', 'profile:write',
];

const ADMIN_PERMISSIONS: Permission[] = [
  'students:read', 'students:write', 'students:manage',
  'teachers:read', 'teachers:write',
  'dashboard:read', 'analytics:read', 'reports:read', 'reports:export',
  'applications:read', 'applications:write',
  'notifications:read', 'notifications:write',
  'profile:read', 'profile:write',
];

const TEACHER_PERMISSIONS: Permission[] = [
  'students:read',
  'teachers:read',
  'dashboard:read', 'analytics:read',
  'applications:read', 'applications:write',
  'notifications:read', 'notifications:write',
  'profile:read', 'profile:write',
];

const STUDENT_PERMISSIONS: Permission[] = [
  'profile:read', 'profile:write',
  'notifications:read',
  'applications:read',
];

export const ROLE_PERMISSIONS: Record<RoleName, Permission[]> = {
  [ROLE.OWNER]: OWNER_PERMISSIONS,
  [ROLE.ADMIN]: ADMIN_PERMISSIONS,
  [ROLE.TEACHER]: TEACHER_PERMISSIONS,
  [ROLE.STUDENT]: STUDENT_PERMISSIONS,
};

export function roleHasPermission(role: string, permission: Permission): boolean {
  const perms = ROLE_PERMISSIONS[role as RoleName];
  if (!perms) return false;
  return perms.includes(permission);
}

/** Roles allowed to access the admin dashboard area. */
export const ADMIN_AREA_ROLES: RoleName[] = [ROLE.OWNER, ROLE.ADMIN];

export function canAccessAdmin(role: string): boolean {
  return ADMIN_AREA_ROLES.includes(role as RoleName);
}

/** Map legacy role names used in seeds/bot to canonical names. */
export function normalizeRoleName(name: string): RoleName {
  const upper = name.toUpperCase();
  if (upper === 'SUPER_ADMIN' || upper === 'OWNER') return ROLE.OWNER;
  if (upper === 'ADMIN') return ROLE.ADMIN;
  if (upper === 'TEACHER') return ROLE.TEACHER;
  // 'USER' or anything else is treated as STUDENT
  return ROLE.STUDENT;
}
