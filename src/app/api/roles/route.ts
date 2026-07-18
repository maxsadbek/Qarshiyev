/**
 * GET /api/roles
 * Returns the RBAC matrix (role → permissions). Protected: requires roles:manage.
 */
import { NextResponse } from 'next/server';
import { requirePermission } from '../../../lib/auth';
import { rolesService } from '@/modules/roles/roles.service';
import { withApiHandler, securityHeadersInit } from '@/lib/security/api-response';

export const GET = withApiHandler(async () => {
  const session = await requirePermission('roles:manage').catch(() => null);
  if (!session) return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403, headers: securityHeadersInit() });

  const [matrix, roles, permissions] = await Promise.all([
    Promise.resolve(rolesService.getMatrix()),
    rolesService.listRoles(),
    rolesService.listPermissions(),
  ]);

  return NextResponse.json(
    { success: true, data: { matrix, roles, permissions } },
    { status: 200, headers: securityHeadersInit() },
  );
});
