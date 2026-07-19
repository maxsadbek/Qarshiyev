/**
 * src/lib/security/logger.ts
 * Centralized logging with log-level support and a security/audit event sink.
 * In production these events should be shipped to your SIEM (Datadog, Sentry,
 * Grafana Loki, etc.) — here we keep a pluggable `sendToSink` hook.
 *
 * IMPORTANT: Prisma is NOT imported at module level. It is loaded dynamically
 * only inside logSecurityEvent via a lazy getter. This ensures that modules
 * (like the Telegram bot) which only need logger.info / logger.warn / logger.error
 * never pull in the Prisma client or attempt a database connection.
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LEVEL_ORDER: Record<LogLevel, number> = { debug: 10, info: 20, warn: 30, error: 40 };

function currentLevel(): LogLevel {
  const lvl = (process.env.LOG_LEVEL || 'info').toLowerCase() as LogLevel;
  return LEVEL_ORDER[lvl] ? lvl : 'info';
}

function write(level: LogLevel, message: string, meta?: Record<string, unknown>) {
  if (LEVEL_ORDER[level] < LEVEL_ORDER[currentLevel()]) return;
  const ts = new Date().toISOString();
  const line = JSON.stringify({ ts, level, msg: message, ...meta });
  if (level === 'error') console.error(line);
  else if (level === 'warn') console.warn(line);
  else console.log(line);
}

export const logger = {
  debug: (msg: string, meta?: Record<string, unknown>) => write('debug', msg, meta),
  info: (msg: string, meta?: Record<string, unknown>) => write('info', msg, meta),
  warn: (msg: string, meta?: Record<string, unknown>) => write('warn', msg, meta),
  error: (msg: string, meta?: Record<string, unknown>) => write('error', msg, meta),
};

// ── Security event logging ────────────────────────────────────────────
// Persists critical security events (login, logout, failed login, role/permission
// changes, admin actions) into the activity_logs table for auditing & forensics.

export type SecurityEventType =
  | 'LOGIN_SUCCESS'
  | 'LOGIN_FAILED'
  | 'LOGOUT'
  | 'REGISTRATION'
  | 'PASSWORD_RESET_REQUESTED'
  | 'PASSWORD_RESET_SUCCESS'
  | 'ACCOUNT_LOCKED'
  | 'ROLE_CHANGED'
  | 'PERMISSION_CHANGED'
  | 'STATUS_CHANGED'
  | 'ADMIN_ACTION';

/**
 * Local structural replacement for Prisma's `InputJsonValue`.
 * Prisma 7 no longer exposes a `Prisma` namespace export from `@prisma/client`,
 * so instead of importing `Prisma.InputJsonValue` we declare an equivalent
 * recursive JSON type here. TypeScript checks this structurally against the
 * generated `ActivityLogCreateInput.details` field at the call site in
 * `logSecurityEvent`, so compatibility is preserved without any import.
 */
export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

export interface SecurityEventInput {
  action: SecurityEventType;
  userId?: string | null;
  entity?: string;
  entityId?: string;
  ipAddress?: string;
  userAgent?: string;
  details?: JsonValue;
}

/** Lazy-loaded Prisma client — only initialized when logSecurityEvent is called. */
async function getPrisma() {
  const mod = await import('../prisma');
  return mod.default;
}

export async function logSecurityEvent(input: SecurityEventInput): Promise<void> {
  try {
    const prisma = await getPrisma();
    await prisma.activityLog.create({
      data: {
        userId: input.userId ?? null,
        action: input.action,
        entity: input.entity,
        entityId: input.entityId,
        ipAddress: input.ipAddress,
        userAgent: input.userAgent,
        details: input.details ?? undefined,
      },
    });
  } catch (err) {
    // Logging must never break the request path.
    logger.error('Failed to persist security event', { error: String(err), action: input.action });
  }
}
