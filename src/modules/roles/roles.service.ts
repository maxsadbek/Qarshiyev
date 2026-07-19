/**
 * src/modules/roles/roles.service.ts
 * DEPRECATED: RBAC has been removed. This file is kept for backward compatibility.
 */

export class RolesService {
  getMatrix(): Record<string, string[]> {
    return {};
  }

  hasPermission(_role: string, _permission: string): boolean {
    return true;
  }

  canAccessAdmin(_role: string): boolean {
    return true;
  }

  normalize(name: string): string {
    return name;
  }

  async listRoles() {
    return [];
  }

  async listPermissions() {
    return [];
  }
}

export const rolesService = new RolesService();
