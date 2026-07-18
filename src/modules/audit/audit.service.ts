/**
 * src/modules/audit/audit.service.ts
 * Immutable audit trail. Records WHO changed WHAT, with previous and new values.
 * Used by admin actions (role/permission/status changes, mutations).
 */

import prisma from '../../lib/prisma';
import { getClientIp, getUserAgent } from '../../lib/security/request-context';

export type AuditAction =
  | 'ROLE_CHANGED'
  | 'PERMISSION_CHANGED'
  | 'STATUS_CHANGED'
  | 'USER_CREATED'
  | 'USER_UPDATED'
  | 'USER_DELETED'
  | 'STUDENT_CREATED'
  | 'STUDENT_UPDATED'
  | 'STUDENT_DELETED'
  | 'TEACHER_CREATED'
  | 'TEACHER_UPDATED'
  | 'TEACHER_DELETED'
  | 'COURSE_CREATED'
  | 'COURSE_UPDATED'
  | 'COURSE_DELETED'
  | 'ADMIN_ACTION';

function safeStringify(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value === 'string') return value;
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

export interface AuditInput {
  req?: Request;
  userId?: string | null;
  action: AuditAction;
  entity: string;
  entityId?: string;
  field?: string;
  oldValue?: unknown;
  newValue?: unknown;
}

export async function auditChange(input: AuditInput): Promise<void> {
  const ip = input.req ? getClientIp(input.req) : undefined;
  const ua = input.req ? getUserAgent(input.req) : undefined;
  try {
    await prisma.auditLog.create({
      data: {
        userId: input.userId ?? null,
        action: input.action,
        entity: input.entity,
        entityId: input.entityId,
        field: input.field,
        oldValue: safeStringify(input.oldValue),
        newValue: safeStringify(input.newValue),
        ipAddress: ip,
        userAgent: ua,
      },
    });
  } catch (err) {
    console.error('[AUDIT] failed to write audit log', err);
  }
}
