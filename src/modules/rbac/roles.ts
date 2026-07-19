/**
 * src/modules/rbac/roles.ts
 * DEPRECATED: RBAC has been removed. This file is kept for backward compatibility.
 */

export const ROLE = {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
} as const;

export type RoleName = (typeof ROLE)[keyof typeof ROLE];

export type Permission = string;

export const ROLE_PERMISSIONS: Record<string, string[]> = {};

export function roleHasPermission(_role: string, _permission: string): boolean {
  return true;
}

export const ADMIN_AREA_ROLES: string[] = [];

export function canAccessAdmin(_role: string): boolean {
  return true;
}

export function normalizeRoleName(name: string): string {
  return name;
}
