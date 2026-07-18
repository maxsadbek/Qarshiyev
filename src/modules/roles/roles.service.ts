/**
 * src/modules/roles/roles.service.ts
 * Role & RBAC service. Provides permission checks and the canonical role
 * permission matrix consumed by API routes and admin UI.
 */

import prisma from '../../lib/prisma';
import {
  ROLE_PERMISSIONS,
  roleHasPermission,
  canAccessAdmin,
  normalizeRoleName,
  type RoleName,
  type Permission,
} from '@/modules/rbac/roles';

export class RolesService {
  /** All role → permission assignments (for admin UI / docs). */
  getMatrix(): Record<RoleName, Permission[]> {
    return ROLE_PERMISSIONS;
  }

  hasPermission(role: string, permission: Permission): boolean {
    return roleHasPermission(role, permission);
  }

  canAccessAdmin(role: string): boolean {
    return canAccessAdmin(role);
  }

  normalize(name: string): RoleName {
    return normalizeRoleName(name);
  }

  /** List distinct role names present in the database. */
  async listRoles() {
    return prisma.role.findMany({ orderBy: { name: 'asc' } });
  }

  /** List all permissions. */
  async listPermissions() {
    return prisma.permission.findMany({ orderBy: { name: 'asc' } });
  }
}

export const rolesService = new RolesService();
