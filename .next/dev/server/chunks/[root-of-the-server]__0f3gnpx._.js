module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/Qarshiyev/src/lib/env.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getEnv",
    ()=>getEnv,
    "isProd",
    ()=>isProd,
    "requireAuthSecret",
    ()=>requireAuthSecret,
    "requireDatabaseUrl",
    ()=>requireDatabaseUrl,
    "sessionCookieName",
    ()=>sessionCookieName
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z>");
;
const envSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    NODE_ENV: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'development',
        'test',
        'production'
    ]).default('development'),
    DATABASE_URL: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).optional(),
    AUTH_SECRET: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(32, 'AUTH_SECRET must be at least 32 characters long').optional(),
    NEXT_PUBLIC_AUTH_COOKIE_NAME: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).default('qarshiyev_session'),
    NEXT_PUBLIC_APP_URL: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url().optional(),
    NEXT_PUBLIC_API_URL: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url().optional(),
    TELEGRAM_BOT_TOKEN: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    TELEGRAM_WEBHOOK_SECRET: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    TELEGRAM_ADMIN_CHAT_ID: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    RESEND_API_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    EMAIL_FROM: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    OPENROUTER_API_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    OPENAI_API_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
let cached = null;
function getEnv() {
    if (cached) return cached;
    const result = envSchema.safeParse(process.env);
    if (!result.success) {
        console.warn('Environment validation warning:', result.error.issues);
        // buildni yiqitmaslik uchun
        cached = {
            NODE_ENV: ("TURBOPACK compile-time value", "development"),
            DATABASE_URL: process.env.DATABASE_URL,
            AUTH_SECRET: process.env.AUTH_SECRET,
            NEXT_PUBLIC_AUTH_COOKIE_NAME: process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME || 'qarshiyev_session',
            NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
            NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
            TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
            TELEGRAM_WEBHOOK_SECRET: process.env.TELEGRAM_WEBHOOK_SECRET,
            TELEGRAM_ADMIN_CHAT_ID: process.env.TELEGRAM_ADMIN_CHAT_ID,
            RESEND_API_KEY: process.env.RESEND_API_KEY,
            EMAIL_FROM: process.env.EMAIL_FROM,
            OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
            OPENAI_API_KEY: process.env.OPENAI_API_KEY
        };
        return cached;
    }
    cached = result.data;
    return cached;
}
function requireDatabaseUrl() {
    const url = process.env.DATABASE_URL;
    if (!url || url.trim() === '') {
        throw new Error('DATABASE_URL is required but was not set.');
    }
    return url;
}
function requireAuthSecret() {
    const secret = process.env.AUTH_SECRET;
    if (!secret || secret.trim().length < 32) {
        throw new Error('AUTH_SECRET is not configured.');
    }
    return secret;
}
const isProd = ()=>("TURBOPACK compile-time value", "development") === 'production';
function sessionCookieName() {
    return process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME || 'qarshiyev_session';
}
}),
"[project]/Qarshiyev/src/lib/prisma.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/Qarshiyev/node_modules/@prisma/client)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/@prisma/adapter-pg/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/lib/env.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const prismaClientSingleton = ()=>{
    return new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]({
        adapter: new __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrismaPg"]({
            connectionString: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireDatabaseUrl"])()
        }),
        log: ("TURBOPACK compile-time truthy", 1) ? [
            'query',
            'error',
            'warn'
        ] : "TURBOPACK unreachable"
    });
};
let instance = null;
function getPrisma() {
    if (!instance) {
        instance = prismaClientSingleton();
        if ("TURBOPACK compile-time truthy", 1) {
            globalThis.prisma = instance;
        }
    }
    return instance;
}
const prisma = new Proxy(getPrisma, {
    get (_target, prop) {
        const client = getPrisma();
        const value = client[prop];
        if (typeof value === 'function') {
            return value.bind(client);
        }
        return value;
    },
    apply (_target, _thisArg, _args) {
        return getPrisma();
    }
});
const __TURBOPACK__default__export__ = prisma;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/Qarshiyev/src/lib/security/session.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SESSION_TTL",
    ()=>SESSION_TTL,
    "createSessionToken",
    ()=>createSessionToken,
    "generateCsrfToken",
    ()=>generateCsrfToken,
    "sha256",
    ()=>sha256,
    "verifySessionToken",
    ()=>verifySessionToken
]);
/**
 * src/lib/security/session.ts
 * Secure session token issued after authentication.
 *
 * The token is a compact, HMAC-signed (HS256) JWT carrying:
 *   - sub: user id
 *   - sid: opaque session id (stored hashed in DB for revocation)
 *   - role: role name (cached to avoid a DB hit on every request)
 *   - csrf: short random token (double-submit cookie for CSRF protection)
 *   - exp / iat
 *
 * The signature uses AUTH_SECRET. Plaintext userId-in-cookie auth is gone.
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/lib/env.ts [app-route] (ecmascript)");
;
;
let cachedAuthSecret = null;
function getAuthSecret() {
    if (cachedAuthSecret === null) {
        cachedAuthSecret = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireAuthSecret"])();
    }
    return cachedAuthSecret;
}
const base64url = (buf)=>buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const fromBase64url = (s)=>Buffer.from(s.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
function sign(data) {
    const secret = Buffer.from(getAuthSecret(), 'utf8');
    return base64url(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["default"].createHmac('sha256', secret).update(data).digest());
}
function verifySignature(data, sig) {
    const expected = sign(data);
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["default"].timingSafeEqual(a, b);
}
const REMEMBER_ME_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days
function generateCsrfToken() {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["default"].randomBytes(32).toString('hex');
}
function sha256(value) {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["default"].createHash('sha256').update(value).digest('hex');
}
function createSessionToken(opts) {
    const csrf = generateCsrfToken();
    const iat = Math.floor(Date.now() / 1000);
    const ttl = opts.rememberMe ? REMEMBER_ME_TTL_SECONDS : SESSION_TTL_SECONDS;
    const exp = iat + ttl;
    const payload = {
        sub: opts.userId,
        sid: opts.sessionId,
        role: opts.role,
        csrf,
        iat,
        exp
    };
    const body = base64url(Buffer.from(JSON.stringify(payload)));
    const sig = sign(body);
    return `${body}.${sig}`;
}
function verifySessionToken(token) {
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [body, sig] = parts;
    if (!verifySignature(body, sig)) return null;
    try {
        const payload = JSON.parse(fromBase64url(body).toString('utf8'));
        if (typeof payload.exp !== 'number' || payload.exp < Math.floor(Date.now() / 1000)) {
            return null;
        }
        if (!payload.sub || !payload.sid || !payload.csrf) return null;
        return payload;
    } catch  {
        return null;
    }
}
const SESSION_TTL = {
    rememberMe: REMEMBER_ME_TTL_SECONDS,
    session: SESSION_TTL_SECONDS
};
}),
"[project]/Qarshiyev/src/modules/rbac/roles.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * src/modules/rbac/roles.ts
 * Role-Based Access Control definitions and permission checks.
 *
 * Roles: OWNER (full), ADMIN, TEACHER (own data), STUDENT (own profile).
 * Permissions are coarse resources with actions: read/write/manage.
 */ __turbopack_context__.s([
    "ADMIN_AREA_ROLES",
    ()=>ADMIN_AREA_ROLES,
    "ROLE",
    ()=>ROLE,
    "ROLE_PERMISSIONS",
    ()=>ROLE_PERMISSIONS,
    "canAccessAdmin",
    ()=>canAccessAdmin,
    "normalizeRoleName",
    ()=>normalizeRoleName,
    "roleHasPermission",
    ()=>roleHasPermission
]);
const ROLE = {
    OWNER: 'OWNER',
    ADMIN: 'ADMIN',
    TEACHER: 'TEACHER',
    STUDENT: 'STUDENT'
};
const OWNER_PERMISSIONS = [
    'students:read',
    'students:write',
    'students:manage',
    'teachers:read',
    'teachers:write',
    'teachers:manage',
    'dashboard:read',
    'analytics:read',
    'reports:read',
    'reports:export',
    'roles:manage',
    'applications:read',
    'applications:write',
    'notifications:read',
    'notifications:write',
    'profile:read',
    'profile:write'
];
const ADMIN_PERMISSIONS = [
    'students:read',
    'students:write',
    'students:manage',
    'teachers:read',
    'teachers:write',
    'dashboard:read',
    'analytics:read',
    'reports:read',
    'reports:export',
    'applications:read',
    'applications:write',
    'notifications:read',
    'notifications:write',
    'profile:read',
    'profile:write'
];
const TEACHER_PERMISSIONS = [
    'students:read',
    'teachers:read',
    'dashboard:read',
    'analytics:read',
    'applications:read',
    'applications:write',
    'notifications:read',
    'notifications:write',
    'profile:read',
    'profile:write'
];
const STUDENT_PERMISSIONS = [
    'profile:read',
    'profile:write',
    'notifications:read',
    'applications:read'
];
const ROLE_PERMISSIONS = {
    [ROLE.OWNER]: OWNER_PERMISSIONS,
    [ROLE.ADMIN]: ADMIN_PERMISSIONS,
    [ROLE.TEACHER]: TEACHER_PERMISSIONS,
    [ROLE.STUDENT]: STUDENT_PERMISSIONS
};
function roleHasPermission(role, permission) {
    const perms = ROLE_PERMISSIONS[role];
    if (!perms) return false;
    return perms.includes(permission);
}
const ADMIN_AREA_ROLES = [
    ROLE.OWNER,
    ROLE.ADMIN
];
function canAccessAdmin(role) {
    return ADMIN_AREA_ROLES.includes(role);
}
function normalizeRoleName(name) {
    const upper = name.toUpperCase();
    if (upper === 'SUPER_ADMIN' || upper === 'OWNER') return ROLE.OWNER;
    if (upper === 'ADMIN') return ROLE.ADMIN;
    if (upper === 'TEACHER') return ROLE.TEACHER;
    // 'USER' or anything else is treated as STUDENT
    return ROLE.STUDENT;
}
}),
"[project]/Qarshiyev/src/lib/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "AuthError",
    ()=>AuthError,
    "CSRF_COOKIE_NAME",
    ()=>CSRF_COOKIE_NAME,
    "getCsrfToken",
    ()=>getCsrfToken,
    "getCurrentUser",
    ()=>getCurrentUser,
    "issueSession",
    ()=>issueSession,
    "requirePermission",
    ()=>requirePermission,
    "requireRole",
    ()=>requireRole,
    "requireStudentAuth",
    ()=>requireStudentAuth,
    "requireUser",
    ()=>requireUser,
    "resolveSession",
    ()=>resolveSession,
    "revokeSession",
    ()=>revokeSession,
    "verifyCsrf",
    ()=>verifyCsrf
]);
/**
 * src/lib/auth.ts
 * Authentication & authorization for Server Components, Route Handlers and
 * Server Actions.
 *
 * Replaces the previous plain-userId-cookie approach with a signed session
 * token (HS256) carrying a DB-backed session id, role and CSRF token.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/lib/env.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$security$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/lib/security/session.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$modules$2f$rbac$2f$roles$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/modules/rbac/roles.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
const ROLE_CACHE = new Map();
async function loadRoleName(roleId) {
    const cached = ROLE_CACHE.get(roleId);
    if (cached) return cached;
    const role = await __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].role.findUnique({
        where: {
            id: roleId
        },
        select: {
            name: true
        }
    });
    const name = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$modules$2f$rbac$2f$roles$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeRoleName"])(role?.name ?? 'STUDENT');
    ROLE_CACHE.set(roleId, name);
    return name;
}
async function resolveSession() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    const raw = cookieStore.get((0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sessionCookieName"])())?.value;
    const payload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$security$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifySessionToken"])(raw);
    if (!payload) return null;
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].session.findFirst({
        where: {
            token: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$security$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sha256"])(raw),
            revokedAt: null,
            expiresAt: {
                gt: new Date()
            }
        },
        select: {
            id: true
        }
    });
    if (!session) return null;
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].user.findUnique({
        where: {
            id: payload.sub
        },
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            telegramId: true,
            roleId: true,
            isActive: true
        }
    });
    if (!user || !user.isActive) return null;
    const roleName = await loadRoleName(user.roleId);
    if (roleName !== payload.role) return null; // role changed → force re-login
    return {
        token: payload,
        user: {
            ...user,
            roleName
        }
    };
}
class AuthError extends Error {
    code;
    constructor(code, message){
        super(message);
        this.code = code;
    }
}
async function requireUser() {
    const session = await resolveSession();
    if (!session) throw new AuthError('UNAUTHENTICATED', 'Authentication required');
    if (!session.user.isActive) throw new AuthError('INACTIVE', 'Account is disabled');
    return session;
}
async function requireRole(...roles) {
    const session = await requireUser();
    if (!roles.includes(session.user.roleName)) {
        throw new AuthError('FORBIDDEN', 'Insufficient permissions');
    }
    return session;
}
async function requirePermission(permission) {
    const session = await requireUser();
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$modules$2f$rbac$2f$roles$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["roleHasPermission"])(session.user.roleName, permission)) {
        throw new AuthError('FORBIDDEN', 'Insufficient permissions');
    }
    return session;
}
const CSRF_COOKIE_NAME = 'qarshiyev_csrf';
async function getCsrfToken() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    return cookieStore.get(CSRF_COOKIE_NAME)?.value ?? null;
}
async function verifyCsrf(req) {
    if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS') return true;
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    const cookieToken = cookieStore.get(CSRF_COOKIE_NAME)?.value;
    const headerToken = req.headers.get('x-csrf-token') || req.headers.get('x-xsrf-token');
    if (!cookieToken || !headerToken) return false;
    const a = Buffer.from(cookieToken);
    const b = Buffer.from(headerToken);
    if (a.length !== b.length) return false;
    try {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["default"].timingSafeEqual(a, b);
    } catch  {
        return false;
    }
}
async function issueSession(opts) {
    const sessionId = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["default"].randomUUID();
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$security$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createSessionToken"])({
        userId: opts.userId,
        sessionId,
        role: opts.roleName,
        rememberMe: opts.rememberMe
    });
    // Extract csrf from the freshly created token payload (re-verify to read it)
    const payload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$security$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifySessionToken"])(token);
    const ttlMs = opts.rememberMe ? 30 * 24 * 3600 * 1000 : 7 * 24 * 3600 * 1000;
    await __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].session.create({
        data: {
            id: sessionId,
            token: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$security$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sha256"])(token),
            userId: opts.userId,
            ipAddress: opts.ip,
            userAgent: opts.userAgent,
            expiresAt: new Date(Date.now() + ttlMs)
        }
    });
    return {
        token,
        csrf: payload.csrf
    };
}
async function revokeSession(sessionToken) {
    if (!sessionToken) return;
    await __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].session.updateMany({
        where: {
            token: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$security$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sha256"])(sessionToken),
            revokedAt: null
        },
        data: {
            revokedAt: new Date()
        }
    });
}
async function getCurrentUser() {
    const session = await resolveSession();
    if (!session) return null;
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].user.findUnique({
        where: {
            id: session.user.id
        },
        include: {
            role: true,
            student: {
                include: {
                    applications: {
                        include: {
                            course: {
                                include: {
                                    teacher: {
                                        include: {
                                            user: true
                                        }
                                    },
                                    language: true
                                }
                            }
                        },
                        orderBy: {
                            createdAt: 'desc'
                        }
                    },
                    district: {
                        include: {
                            region: true
                        }
                    }
                }
            }
        }
    });
    if (!user) return null;
    return user;
}
async function requireStudentAuth() {
    const session = await requireUser();
    if (session.user.roleName !== __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$modules$2f$rbac$2f$roles$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ROLE"].STUDENT && session.user.roleName !== __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$modules$2f$rbac$2f$roles$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ROLE"].TEACHER && session.user.roleName !== __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$modules$2f$rbac$2f$roles$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ROLE"].ADMIN && session.user.roleName !== __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$modules$2f$rbac$2f$roles$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ROLE"].OWNER) {
        throw new AuthError('FORBIDDEN', 'FORBIDDEN');
    }
    return getCurrentUser();
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/Qarshiyev/src/lib/security/headers.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * src/lib/security/headers.ts
 * Produces the secure HTTP headers applied by middleware & API routes.
 * Implements: CSP, X-Frame-Options, X-Content-Type-Options,
 * Referrer-Policy, Permissions-Policy, and other hardening headers.
 */ __turbopack_context__.s([
    "SECURITY_HEADERS",
    ()=>SECURITY_HEADERS,
    "applySecurityHeaders",
    ()=>applySecurityHeaders,
    "buildCsp",
    ()=>buildCsp,
    "securityHeadersInit",
    ()=>securityHeadersInit
]);
const SECURITY_HEADERS = {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-DNS-Prefetch-Control': 'off',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-origin'
};
function buildCsp() {
    const isProd = ("TURBOPACK compile-time value", "development") === 'production';
    const upgrade = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : '';
    return [
        upgrade,
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: blob: https:",
        "font-src 'self' data:",
        "connect-src 'self' https://*.supabase.co https://openrouter.ai https://api.openai.com",
        "frame-src 'self' https://www.youtube.com https://www.google.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'"
    ].join('; ');
}
function applySecurityHeaders(headers) {
    for (const [key, value] of Object.entries(SECURITY_HEADERS)){
        headers.set(key, value);
    }
    headers.set('Content-Security-Policy', buildCsp());
}
function securityHeadersInit() {
    return {
        ...SECURITY_HEADERS,
        'Content-Security-Policy': buildCsp()
    };
}
}),
"[project]/Qarshiyev/src/lib/security/rate-limit.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * src/lib/security/rate-limit.ts
 * Lightweight, in-memory sliding-window rate limiter.
 *
 * Protects login, registration, the Telegram webhook and general API routes
 * from brute-force & abuse. A single process instance is sufficient for most
 * deployments; in a horizontally scaled environment swap the store for Redis
 * (see RedisRateLimitStore stub) without changing callers.
 */ __turbopack_context__.s([
    "RATE_LIMITS",
    ()=>RATE_LIMITS,
    "rateLimit",
    ()=>rateLimit,
    "rateLimitHeaders",
    ()=>rateLimitHeaders
]);
class MemoryStore {
    buckets = new Map();
    sweepAt = 0;
    incr(key, windowMs, limit) {
        const now = Date.now();
        this.maybeSweep(now);
        const existing = this.buckets.get(key);
        if (!existing || existing.resetAt <= now) {
            const resetAt = now + windowMs;
            this.buckets.set(key, {
                count: 1,
                resetAt
            });
            return {
                success: true,
                limit,
                remaining: limit - 1,
                reset: resetAt
            };
        }
        existing.count += 1;
        const remaining = Math.max(0, limit - existing.count);
        return {
            success: existing.count <= limit,
            limit,
            remaining,
            reset: existing.resetAt
        };
    }
    maybeSweep(now) {
        if (now - this.sweepAt < 60_000) return;
        this.sweepAt = now;
        for (const [key, bucket] of this.buckets){
            if (bucket.resetAt <= now) this.buckets.delete(key);
        }
    }
}
const store = new MemoryStore();
const RATE_LIMITS = {
    login: {
        windowMs: 15 * 60_000,
        limit: 10,
        keyPrefix: 'login'
    },
    register: {
        windowMs: 60 * 60_000,
        limit: 10,
        keyPrefix: 'register'
    },
    telegram: {
        windowMs: 60_000,
        limit: 30,
        keyPrefix: 'telegram'
    },
    api: {
        windowMs: 60_000,
        limit: 120,
        keyPrefix: 'api'
    },
    passwordReset: {
        windowMs: 60 * 60_000,
        limit: 5,
        keyPrefix: 'passwordReset'
    }
};
function rateLimit(identifier, opts) {
    const windowMs = opts.windowMs ?? 60_000;
    const limit = opts.limit ?? 60;
    const keyPrefix = opts.keyPrefix ?? 'global';
    return store.incr(`${keyPrefix}:${identifier}`, windowMs, limit);
}
function rateLimitHeaders(result) {
    return {
        'X-RateLimit-Limit': String(result.limit),
        'X-RateLimit-Remaining': String(result.remaining),
        'X-RateLimit-Reset': String(Math.ceil(result.reset / 1000))
    };
}
}),
"[project]/Qarshiyev/src/lib/security/api-response.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "ApiError",
    ()=>ApiError,
    "HttpError",
    ()=>HttpError,
    "apiError",
    ()=>apiError,
    "apiResponse",
    ()=>apiResponse,
    "withApiHandler",
    ()=>withApiHandler
]);
/**
 * src/lib/security/api-response.ts
 * Consistent API responses, HTTP status codes and centralized error handling.
 * No internal error details ever leak to the client.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/zod/v4/classic/errors.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$security$2f$headers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/lib/security/headers.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$security$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/lib/security/rate-limit.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/lib/auth.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
class ApiError extends Error {
    status;
    code;
    constructor(status, message, code){
        super(message);
        this.status = status;
        this.code = code;
    }
}
const HttpError = {
    badRequest: (msg = 'Bad request', code)=>new ApiError(400, msg, code),
    unauthorized: (msg = 'Unauthorized', code)=>new ApiError(401, msg, code),
    forbidden: (msg = 'Forbidden', code)=>new ApiError(403, msg, code),
    notFound: (msg = 'Not found', code)=>new ApiError(404, msg, code),
    tooManyRequests: (msg = 'Too many requests', code)=>new ApiError(429, msg, code),
    internal: (msg = 'Internal server error', code)=>new ApiError(500, msg, code)
};
function jsonBody(success, data, error) {
    return {
        success,
        ...data !== undefined ? {
            data
        } : {},
        ...error ? {
            error
        } : {}
    };
}
function apiResponse(data, init) {
    const status = init?.status ?? 200;
    const headers = {
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$security$2f$headers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["securityHeadersInit"])()
    };
    if (init?.rateLimit) Object.assign(headers, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$security$2f$rate$2d$limit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["rateLimitHeaders"])(init.rateLimit));
    return __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(jsonBody(true, data, null), {
        status,
        headers
    });
}
function apiError(err) {
    // Zod validation errors → 422 with field details
    if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodError"]) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(jsonBody(false, {
            fields: err.flatten().fieldErrors
        }, 'Validation failed'), {
            status: 422,
            headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$security$2f$headers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["securityHeadersInit"])()
        });
    }
    if (err instanceof ApiError) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(jsonBody(false, undefined, err.message), {
            status: err.status,
            headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$security$2f$headers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["securityHeadersInit"])()
        });
    }
    // Unknown error — log server-side, return generic message.
    console.error('[API ERROR]', err);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(jsonBody(false, undefined, 'Internal server error'), {
        status: 500,
        headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$security$2f$headers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["securityHeadersInit"])()
    });
}
function withApiHandler(handler) {
    return async (req, ctx)=>{
        try {
            const method = req.method.toUpperCase();
            if (method !== 'GET' && method !== 'HEAD' && method !== 'OPTIONS') {
                const hasSession = !!req.headers.get('cookie')?.includes('qarshiyev_session');
                if (hasSession && !await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyCsrf"])(req)) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        success: false,
                        error: 'Invalid CSRF token'
                    }, {
                        status: 403,
                        headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$security$2f$headers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["securityHeadersInit"])()
                    });
                }
            }
            return await handler(req, {
                params: await ctx.params ?? {}
            });
        } catch (err) {
            return apiError(err);
        }
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/Qarshiyev/src/app/api/auth/me/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
/**
 * GET /api/auth/me
 * Returns the authenticated user (or 401 if not logged in).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/lib/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$security$2f$api$2d$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Qarshiyev/src/lib/security/api-response.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$security$2f$headers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/lib/security/headers.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$security$2f$api$2d$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$security$2f$api$2d$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const GET = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$security$2f$api$2d$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["withApiHandler"])(async ()=>{
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveSession"])();
    if (!session) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Unauthorized'
        }, {
            status: 401,
            headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$security$2f$headers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["securityHeadersInit"])()
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: true,
        user: {
            id: session.user.id,
            email: session.user.email,
            firstName: session.user.firstName,
            lastName: session.user.lastName,
            role: session.user.roleName
        }
    }, {
        status: 200,
        headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$security$2f$headers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["securityHeadersInit"])()
    });
});
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0f3gnpx._.js.map