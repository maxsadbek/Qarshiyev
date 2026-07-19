(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Qarshiyev/src/context/SmoothScrollProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SmoothScrollProvider",
    ()=>SmoothScrollProvider,
    "useLenis",
    ()=>useLenis
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lenis$2f$dist$2f$lenis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/lenis/dist/lenis.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const LenisContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const useLenis = ()=>{
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LenisContext);
};
_s(useLenis, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
const prefersReducedMotion = ()=>("TURBOPACK compile-time value", "object") !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const SmoothScrollProvider = ({ children })=>{
    _s1();
    const [lenis, setLenis] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SmoothScrollProvider.useEffect": ()=>{
            if (prefersReducedMotion()) {
                setLenis(null);
                return;
            }
            const instance = new __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lenis$2f$dist$2f$lenis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
                lerp: 0.08,
                duration: 1.8,
                easing: {
                    "SmoothScrollProvider.useEffect": (t)=>Math.min(1, 1.001 - Math.pow(2, -10 * t))
                }["SmoothScrollProvider.useEffect"],
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 1.6,
                syncTouch: false
            });
            setLenis(instance);
            const raf = {
                "SmoothScrollProvider.useEffect.raf": (time)=>{
                    instance.raf(time);
                    rafRef.current = requestAnimationFrame(raf);
                }
            }["SmoothScrollProvider.useEffect.raf"];
            rafRef.current = requestAnimationFrame(raf);
            return ({
                "SmoothScrollProvider.useEffect": ()=>{
                    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
                    instance.destroy();
                    setLenis(null);
                }
            })["SmoothScrollProvider.useEffect"];
        }
    }["SmoothScrollProvider.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LenisContext.Provider, {
        value: lenis,
        children: children
    }, void 0, false, {
        fileName: "[project]/Qarshiyev/src/context/SmoothScrollProvider.tsx",
        lineNumber: 49,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(SmoothScrollProvider, "jxppnNHOXABgt84U8AhjK6HjQK4=");
_c = SmoothScrollProvider;
var _c;
__turbopack_context__.k.register(_c, "SmoothScrollProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Qarshiyev/src/components/intro/constants.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Session key — intro plays once per browser tab session */ __turbopack_context__.s([
    "INTRO_COLORS",
    ()=>INTRO_COLORS,
    "INTRO_EASE",
    ()=>INTRO_EASE,
    "INTRO_LOGO_SIZE",
    ()=>INTRO_LOGO_SIZE,
    "INTRO_ORB_SIZE",
    ()=>INTRO_ORB_SIZE,
    "INTRO_SCENES",
    ()=>INTRO_SCENES,
    "INTRO_STORAGE_KEY",
    ()=>INTRO_STORAGE_KEY,
    "INTRO_TOTAL_DURATION",
    ()=>INTRO_TOTAL_DURATION,
    "NAVBAR_LOGO_SIZE",
    ()=>NAVBAR_LOGO_SIZE
]);
const INTRO_STORAGE_KEY = 'qarshiyev_intro_seen';
const INTRO_COLORS = {
    background: '#050505',
    primary: '#8A2BE2',
    secondary: '#C9A7FF',
    highlight: '#FFFFFF',
    glow: 'rgba(138, 43, 226, 0.28)',
    primarySoft: 'rgba(138, 43, 226, 0.15)',
    secondarySoft: 'rgba(201, 167, 255, 0.12)'
};
const INTRO_EASE = {
    premium: 'power3.inOut',
    reveal: 'power2.out',
    morph: 'power2.inOut',
    fly: 'power3.inOut',
    soft: 'power1.inOut'
};
const INTRO_SCENES = {
    pause: 0.0,
    glowAppear: 0.5,
    orbExpand: 1.2,
    ringsAppear: 2.0,
    morphStart: 2.7,
    lightSweep: 3.3,
    brandTitle: 4.0,
    brandSubtitle: 4.35,
    taglineStart: 4.8,
    revealStart: 5.5,
    flyToNav: 6.0,
    overlayExit: 6.7
};
const INTRO_TOTAL_DURATION = 7.4;
const INTRO_ORB_SIZE = 152;
const INTRO_LOGO_SIZE = 138;
const NAVBAR_LOGO_SIZE = 52;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Qarshiyev/src/context/IntroContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IntroProvider",
    ()=>IntroProvider,
    "prefersReducedMotion",
    ()=>prefersReducedMotion,
    "useIntro",
    ()=>useIntro
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/components/intro/constants.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const IntroContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const prefersReducedMotion = ()=>("TURBOPACK compile-time value", "object") !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasSeenIntro = ()=>{
    try {
        return sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INTRO_STORAGE_KEY"]) === '1';
    } catch  {
        return true;
    }
};
const IntroProvider = ({ children })=>{
    _s();
    const canPlay = !prefersReducedMotion() && !hasSeenIntro();
    const [shouldPlayIntro] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(canPlay);
    const [isIntroActive, setIsIntroActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isIntroComplete, setIsIntroComplete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(!canPlay);
    const startIntro = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "IntroProvider.useCallback[startIntro]": ()=>{
            setIsIntroActive(true);
            setIsIntroComplete(false);
        }
    }["IntroProvider.useCallback[startIntro]"], []);
    const completeIntro = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "IntroProvider.useCallback[completeIntro]": ()=>{
            try {
                sessionStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INTRO_STORAGE_KEY"], '1');
            } catch  {
            /* silent */ }
            setIsIntroActive(false);
            setIsIntroComplete(true);
        }
    }["IntroProvider.useCallback[completeIntro]"], []);
    const skipIntro = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "IntroProvider.useCallback[skipIntro]": ()=>{
            completeIntro();
        }
    }["IntroProvider.useCallback[skipIntro]"], [
        completeIntro
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "IntroProvider.useMemo[value]": ()=>({
                isIntroActive,
                isIntroComplete,
                shouldPlayIntro,
                startIntro,
                completeIntro,
                skipIntro
            })
    }["IntroProvider.useMemo[value]"], [
        isIntroActive,
        isIntroComplete,
        shouldPlayIntro,
        startIntro,
        completeIntro,
        skipIntro
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IntroContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/Qarshiyev/src/context/IntroContext.tsx",
        lineNumber: 80,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_s(IntroProvider, "KpCPSX+1v+XfiTEy+Jlkz2Mnb4U=");
_c = IntroProvider;
const useIntro = ()=>{
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(IntroContext);
    if (!ctx) {
        throw new Error('useIntro must be used within IntroProvider');
    }
    return ctx;
};
_s1(useIntro, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "IntroProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Qarshiyev/src/lib/client/csrf.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * src/lib/client/csrf.ts
 * Client-side helper that reads the CSRF cookie and attaches it as the
 * double-submit header on state-changing requests. Works together with the
 * server-side verifyCsrf() guard.
 */ __turbopack_context__.s([
    "CSRF_COOKIE",
    ()=>CSRF_COOKIE,
    "csrfFetch",
    ()=>csrfFetch,
    "getCookie",
    ()=>getCookie
]);
function getCookie(name) {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[2]) : null;
}
const CSRF_COOKIE = 'qarshiyev_csrf';
async function csrfFetch(url, options = {}) {
    const method = (options.method || 'GET').toUpperCase();
    const headers = new Headers(options.headers);
    if (method !== 'GET' && method !== 'HEAD') {
        const token = getCookie(CSRF_COOKIE);
        if (token) headers.set('x-csrf-token', token);
        if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
    }
    return fetch(url, {
        ...options,
        method,
        headers,
        credentials: 'same-origin'
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Qarshiyev/src/context/AuthContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$client$2f$csrf$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/lib/client/csrf.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const useAuth = ()=>{
    _s();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
    return ctx;
};
_s(useAuth, "/dMy7t63NXD4eYACoT93CePwGrg=");
async function fetchMe() {
    try {
        const res = await fetch('/api/auth/me', {
            credentials: 'same-origin'
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data?.user ?? null;
    } catch  {
        return null;
    }
}
const AuthProvider = ({ children })=>{
    _s1();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const refresh = async ()=>{
        const me = await fetchMe();
        setUser(me);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            void refresh();
        }
    }["AuthProvider.useEffect"], []);
    const login = async (email, password, rememberMe = false)=>{
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$client$2f$csrf$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["csrfFetch"])('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password,
                    rememberMe
                })
            });
            const data = await res.json().catch(()=>({}));
            if (res.ok && data.success) {
                await refresh();
                return {
                    ok: true
                };
            }
            return {
                ok: false,
                error: data.error ?? 'Email yoki parol noto‘g‘ri'
            };
        } catch  {
            return {
                ok: false,
                error: 'Tarmoq xatosi'
            };
        }
    };
    const register = async (data)=>{
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$client$2f$csrf$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["csrfFetch"])('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify(data)
            });
            const result = await res.json().catch(()=>({}));
            if (res.ok && result.success) {
                await refresh();
                return {
                    ok: true
                };
            }
            return {
                ok: false,
                error: result.error ?? 'Ro‘yxatdan o‘tib bo‘lmadi'
            };
        } catch  {
            return {
                ok: false,
                error: 'Tarmoq xatosi'
            };
        }
    };
    const logout = async ()=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$lib$2f$client$2f$csrf$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["csrfFetch"])('/api/auth/logout', {
            method: 'POST'
        }).catch(()=>{});
        setUser(null);
    };
    const updateProfile = (data)=>{
        setUser((prev)=>prev ? {
                ...prev,
                ...data
            } : prev);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            login,
            register,
            logout,
            updateProfile,
            refresh
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Qarshiyev/src/context/AuthContext.tsx",
        lineNumber: 106,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(AuthProvider, "5s2qRsV95gTJBmaaTh11GoxYeGE=");
_c = AuthProvider;
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Qarshiyev/src/assistant/AssistantContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AssistantProvider",
    ()=>AssistantProvider,
    "useAssistant",
    ()=>useAssistant
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const InfoContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const AssistantProvider = ({ children })=>{
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const open = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AssistantProvider.useCallback[open]": ()=>setIsOpen(true)
    }["AssistantProvider.useCallback[open]"], []);
    const close = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AssistantProvider.useCallback[close]": ()=>setIsOpen(false)
    }["AssistantProvider.useCallback[close]"], []);
    const toggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AssistantProvider.useCallback[toggle]": ()=>setIsOpen({
                "AssistantProvider.useCallback[toggle]": (o)=>!o
            }["AssistantProvider.useCallback[toggle]"])
    }["AssistantProvider.useCallback[toggle]"], []);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AssistantProvider.useMemo[value]": ()=>({
                isOpen,
                open,
                close,
                toggle
            })
    }["AssistantProvider.useMemo[value]"], [
        isOpen,
        open,
        close,
        toggle
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/Qarshiyev/src/assistant/AssistantContext.tsx",
        lineNumber: 26,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AssistantProvider, "Wmci+iqIvpixAaBgCVHKbxnBs8Y=");
_c = AssistantProvider;
function useAssistant() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(InfoContext);
    if (!ctx) throw new Error('useAssistant must be used within AssistantProvider');
    return ctx;
}
_s1(useAssistant, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "AssistantProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Qarshiyev_src_1zqsjfx._.js.map