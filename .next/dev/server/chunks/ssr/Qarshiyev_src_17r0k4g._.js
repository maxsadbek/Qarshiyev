module.exports = [
"[project]/Qarshiyev/src/hooks/useScrollPosition.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useScrollPosition",
    ()=>useScrollPosition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function useScrollPosition() {
    const [scrollY, setScrollY] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isScrolled, setIsScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleScroll = ()=>{
            const y = window.scrollY;
            setScrollY(y);
            setIsScrolled(y > 60);
        };
        window.addEventListener('scroll', handleScroll, {
            passive: true
        });
        return ()=>window.removeEventListener('scroll', handleScroll);
    }, []);
    return {
        scrollY,
        isScrolled
    };
}
}),
"[project]/Qarshiyev/src/constants/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ANIMATION_VARIANTS",
    ()=>ANIMATION_VARIANTS,
    "CONTACT_INFO",
    ()=>CONTACT_INFO,
    "NAV_ITEMS",
    ()=>NAV_ITEMS,
    "ROUTES",
    ()=>ROUTES
]);
const ROUTES = {
    HOME: '/',
    ABOUT: '/about',
    COURSES: '/courses',
    TEACHERS: '/teachers',
    GALLERY: '/gallery',
    RESULTS: '/results',
    EVENTS: '/events',
    BLOG: '/blog',
    FAQ: '/faq',
    REGISTER: '/register',
    LOGIN: '/login',
    PROFILE: '/profile',
    ANALYTICS: '/analytics'
};
const NAV_ITEMS = [
    {
        label: 'Bosh Sahifa',
        href: ROUTES.HOME
    },
    {
        label: 'Biz Haqimizda',
        href: ROUTES.ABOUT
    },
    {
        label: 'Kurslar',
        href: ROUTES.COURSES
    },
    {
        label: 'O\'qituvchilar',
        href: ROUTES.TEACHERS
    },
    {
        label: 'Galereya',
        href: ROUTES.GALLERY
    },
    {
        label: 'O\'quvchilarning Yutuqlari',
        href: ROUTES.RESULTS
    },
    {
        label: 'Tadbirlar',
        href: ROUTES.EVENTS
    },
    {
        label: 'Blog',
        href: ROUTES.BLOG
    },
    {
        label: 'Savollar',
        href: ROUTES.FAQ
    }
];
const CONTACT_INFO = {
    phone: '+998 90 123 45 67',
    phone2: '+998 91 234 56 78',
    email: 'info@qarshiyev.uz',
    email2: 'admissions@qarshiyev.uz',
    telegram: 'https://t.me/QARSHIYEV_SCHOOL',
    instagram: 'https://www.instagram.com/qarshiyev_school/',
    facebook: 'https://facebook.com/qarshiyev_edu',
    youtube: 'https://youtube.com/@qarshiyev_edu',
    address: 'Nuriston, Qashqadaryo Region, Uzbekistan',
    addressFull: 'Nuriston, Qashqadaryo Region, Uzbekistan',
    workingHours: [
        {
            day: 'Dushanba – Juma',
            hours: '08:00 – 21:00'
        },
        {
            day: 'Shanba',
            hours: '09:00 – 18:00'
        },
        {
            day: 'Yakshanba',
            hours: 'Yopiq'
        }
    ]
};
const ANIMATION_VARIANTS = {
    fadeUp: {
        hidden: {
            opacity: 0,
            y: 40
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [
                    0.22,
                    1,
                    0.36,
                    1
                ]
            }
        }
    },
    fadeDown: {
        hidden: {
            opacity: 0,
            y: -40
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [
                    0.22,
                    1,
                    0.36,
                    1
                ]
            }
        }
    },
    fadeLeft: {
        hidden: {
            opacity: 0,
            x: -40
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.6,
                ease: [
                    0.22,
                    1,
                    0.36,
                    1
                ]
            }
        }
    },
    fadeRight: {
        hidden: {
            opacity: 0,
            x: 40
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.6,
                ease: [
                    0.22,
                    1,
                    0.36,
                    1
                ]
            }
        }
    },
    scale: {
        hidden: {
            opacity: 0,
            scale: 0.85
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [
                    0.22,
                    1,
                    0.36,
                    1
                ]
            }
        }
    },
    staggerContainer: {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.12
            }
        }
    }
};
}),
"[project]/Qarshiyev/src/utils/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "formatDate",
    ()=>formatDate,
    "formatPrice",
    ()=>formatPrice,
    "formatShortDate",
    ()=>formatShortDate,
    "getDayOfMonth",
    ()=>getDayOfMonth,
    "getMonthAbbr",
    ()=>getMonthAbbr,
    "getYouTubeId",
    ()=>getYouTubeId,
    "getYouTubeThumbnail",
    ()=>getYouTubeThumbnail,
    "slugify",
    ()=>slugify,
    "truncate",
    ()=>truncate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
function formatShortDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
}
function formatPrice(price) {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' UZS';
}
function getDayOfMonth(dateString) {
    return new Date(dateString).getDate().toString().padStart(2, '0');
}
function getMonthAbbr(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short'
    }).toUpperCase();
}
function truncate(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '…';
}
function slugify(text) {
    return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}
function getYouTubeId(url) {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : null;
}
function getYouTubeThumbnail(url) {
    const id = getYouTubeId(url);
    return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : '';
}
}),
"[project]/Qarshiyev/src/assets/logo.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/logo.0ms9wq4885u-u.png" + (globalThis["NEXT_CLIENT_ASSET_SUFFIX"] || ''));}),
"[project]/Qarshiyev/src/assets/logo.png.mjs { IMAGE => \"[project]/Qarshiyev/src/assets/logo.png (static in ecmascript, tag client)\" } [app-ssr] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$assets$2f$logo$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/assets/logo.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$assets$2f$logo$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 1024,
    height: 1024,
    blurWidth: 8,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABE0lEQVR42gEIAff+AGlNmgB5X64AjnbFAJ6E0QCaesoAhGC1AG1LnABcPYoAAHdcrQCJc8YAopjjEMnC8U3Qu+xQoXTOE35WrwBoRpgAAIVswQCRhN4Hrrz5j/Dy/PXZy+z3n2HUmZZgxgl4UqoAAIpxyQCMf+QYwMD21dHE5//Aq97/wJPj3a101h+DWrQAAIhuxwCPf+EKo5zvqLah3/14S7v9wJDktqdw0w9/WLIAAH9kugCMdtIAj33kIIRi1nuBTcmDmmHTKYtevwB0UKcAAHRZqwCBZ78AiW7NAIdnzACFXsYBhl3AAHlVrwBpSZwAAGpOngB3W7AAgGO9AIJjvwCBXrwAe1e0AG5NowBhQpMA0wd+eP33cOsAAAAASUVORK5CYII="
};
}),
"[project]/Qarshiyev/src/components/layout/Navbar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Navbar",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/lucide-react/dist/esm/icons/menu.mjs [app-ssr] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/lucide-react/dist/esm/icons/x.mjs [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/lucide-react/dist/esm/icons/chevron-down.mjs [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/lucide-react/dist/esm/icons/phone.mjs [app-ssr] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$hooks$2f$useScrollPosition$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/hooks/useScrollPosition.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/constants/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/utils/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/context/AuthContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$context$2f$IntroContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/context/IntroContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$assets$2f$logo$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Qarshiyev$2f$src$2f$assets$2f$logo$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/Qarshiyev/src/assets/logo.png.mjs { IMAGE => "[project]/Qarshiyev/src/assets/logo.png (static in ecmascript, tag client)" } [app-ssr] (structured image object with data url, ecmascript)');
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
const HEADER_NAV = [
    {
        label: 'Bosh Sahifa',
        href: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].HOME
    },
    {
        label: 'Biz Haqimizda',
        href: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].ABOUT
    },
    {
        label: 'Kurslar',
        href: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].COURSES
    },
    {
        label: "O'qituvchilar",
        href: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].TEACHERS
    },
    {
        label: 'Yana',
        href: '#',
        children: [
            {
                label: 'Galereya',
                href: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].GALLERY
            },
            {
                label: "O'quvchilarning Yutuqlari",
                href: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].RESULTS
            },
            {
                label: 'Tadbirlar',
                href: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].EVENTS
            },
            {
                label: 'Blog',
                href: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].BLOG
            },
            {
                label: 'Savollar',
                href: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].FAQ
            }
        ]
    }
];
const Navbar = ()=>{
    const { isScrolled } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$hooks$2f$useScrollPosition$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScrollPosition"])();
    const [mobileOpen, setMobileOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [userMenuOpen, setUserMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dropdownOpen, setDropdownOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const userRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { user, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const { isIntroComplete } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$context$2f$IntroContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIntro"])();
    const isActive = (href)=>href === '/' ? (pathname ?? '') === '/' : (pathname ?? '').startsWith(href);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleClickOutside = (event)=>{
            if (userRef.current && !userRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return ()=>document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleKeyDown = (event)=>{
            if (event.key === 'Escape') setUserMenuOpen(false);
        };
        document.addEventListener('keydown', handleKeyDown);
        return ()=>document.removeEventListener('keydown', handleKeyDown);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setUserMenuOpen(false);
    }, [
        pathname
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].header, {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('fixed top-0 inset-x-0 z-50 h-[82px] transition-all duration-500', isScrolled ? 'bg-[rgba(15,15,25,0.78)] backdrop-blur-[24px] border-b border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.35)]' : 'bg-[rgba(15,15,25,0.55)] backdrop-blur-[18px] border-b border-white/[0.08]'),
                initial: {
                    y: -82,
                    opacity: 0
                },
                animate: isIntroComplete ? {
                    y: 0,
                    opacity: 1
                } : {
                    y: -82,
                    opacity: 0
                },
                transition: {
                    duration: 0.6,
                    ease: [
                        0.22,
                        1,
                        0.36,
                        1
                    ]
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container-custom h-full flex items-center justify-between gap-8 relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "group flex items-center gap-3.5 flex-shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    id: "navbar-logo",
                                    src: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$assets$2f$logo$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Qarshiyev$2f$src$2f$assets$2f$logo$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"].src,
                                    alt: "Qarshiyev",
                                    className: "w-[52px] h-[52px] rounded-xl object-cover shadow-[0_4px_14px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-105",
                                    style: {
                                        opacity: isIntroComplete ? 1 : 0
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                    lineNumber: 89,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-sans font-bold text-white text-[22px] leading-none",
                                            children: "Qarshiyev"
                                        }, void 0, false, {
                                            fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                            lineNumber: 97,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-sans text-white/55 text-[13px] leading-none mt-2",
                                            children: "Ta'lim Markazi"
                                        }, void 0, false, {
                                            fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                            lineNumber: 100,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                            lineNumber: 88,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "hidden xl:flex flex-1 min-w-0 items-center justify-center gap-8 h-full",
                            children: HEADER_NAV.map((item)=>{
                                if (item.children) {
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        ref: dropdownRef,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setDropdownOpen(!dropdownOpen),
                                                className: "group relative inline-flex items-center h-full px-2 text-[15px] font-medium tracking-wide transition-all duration-300 hover:-translate-y-0.5 text-white/70 hover:text-white",
                                                children: [
                                                    item.label,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                        size: 14,
                                                        className: `ml-1 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                                        lineNumber: 117,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                                lineNumber: 112,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden transition-all duration-200 ${dropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`,
                                                children: item.children.map((child)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        href: child.href,
                                                        onClick: ()=>setDropdownOpen(false),
                                                        className: "block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-violet-600 transition-colors",
                                                        children: child.label
                                                    }, child.label, false, {
                                                        fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                                        lineNumber: 121,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                                lineNumber: 119,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, item.label, true, {
                                        fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                        lineNumber: 111,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0));
                                }
                                const active = isActive(item.href);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: item.href,
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('group relative inline-flex items-center h-full px-2 text-[15px] font-medium tracking-wide transition-all duration-300 hover:-translate-y-0.5', active ? 'text-white' : 'text-white/70 hover:text-white'),
                                    children: [
                                        item.label,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('absolute left-1/2 -translate-x-1/2 bottom-6 h-[2px] rounded-full bg-gold-500 transition-all duration-300', active ? 'w-7 opacity-100 shadow-[0_0_10px_2px_rgba(138,43,226,0.7)]' : 'w-0 opacity-0 group-hover:w-7 group-hover:opacity-80')
                                        }, void 0, false, {
                                            fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                            lineNumber: 145,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, item.label, true, {
                                    fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                    lineNumber: 136,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0));
                            })
                        }, void 0, false, {
                            fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                            lineNumber: 107,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 flex-shrink-0",
                            children: [
                                user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative hidden xl:flex",
                                    ref: userRef,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setUserMenuOpen((o)=>!o),
                                            className: "flex items-center gap-2 rounded-full pl-1 pr-3 py-1 bg-white/10 hover:bg-white/20 transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-9 h-9 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-white flex items-center justify-center text-sm font-bold",
                                                    children: user.avatar ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: user.avatar,
                                                        alt: user.name,
                                                        className: "w-9 h-9 rounded-full object-cover"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                                        lineNumber: 168,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)) : user.name.charAt(0).toUpperCase()
                                                }, void 0, false, {
                                                    fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                                    lineNumber: 166,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-medium text-white",
                                                    children: user.name.split(' ')[0]
                                                }, void 0, false, {
                                                    fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                                    lineNumber: 173,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                    size: 14,
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-white/70 transition-transform', userMenuOpen && 'rotate-180')
                                                }, void 0, false, {
                                                    fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                                    lineNumber: 174,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                            lineNumber: 162,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                            children: userMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                className: "absolute top-full right-0 mt-3 w-52 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden",
                                                initial: {
                                                    opacity: 0,
                                                    y: -8,
                                                    scale: 0.96
                                                },
                                                animate: {
                                                    opacity: 1,
                                                    y: 0,
                                                    scale: 1
                                                },
                                                exit: {
                                                    opacity: 0,
                                                    y: -8,
                                                    scale: 0.96
                                                },
                                                transition: {
                                                    duration: 0.2,
                                                    ease: [
                                                        0.22,
                                                        1,
                                                        0.36,
                                                        1
                                                    ]
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                            href: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].PROFILE,
                                                            onClick: ()=>setUserMenuOpen(false),
                                                            className: "flex items-center px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-950 transition-colors",
                                                            children: "Kabinet"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                                            lineNumber: 186,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>{
                                                                logout();
                                                                setUserMenuOpen(false);
                                                            },
                                                            className: "flex items-center w-full px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors",
                                                            children: "Chiqish"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                                            lineNumber: 193,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                                    lineNumber: 185,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                                lineNumber: 178,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                            lineNumber: 176,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                    lineNumber: 161,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].LOGIN,
                                    className: "group relative hidden sm:inline-flex items-center justify-center h-[46px] px-[30px] rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-white text-[15px] font-semibold shadow-[0_6px_20px_-8px_rgba(138,43,226,0.8)] transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_30px_-6px_rgba(138,43,226,0.9)]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "absolute inset-0 rounded-full bg-gold-400 blur-md opacity-50 animate-[navGlow_3s_ease-in-out_infinite]"
                                        }, void 0, false, {
                                            fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                            lineNumber: 209,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "relative",
                                            children: "Kirish"
                                        }, void 0, false, {
                                            fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                            lineNumber: 210,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                    lineNumber: 205,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "xl:hidden p-2 -mr-2 rounded-xl text-white hover:bg-white/10 transition-colors",
                                    onClick: ()=>setMobileOpen(!mobileOpen),
                                    "aria-label": "Toggle menu",
                                    children: mobileOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                        lineNumber: 220,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                        lineNumber: 220,
                                        columnNumber: 47
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                    lineNumber: 215,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                            lineNumber: 159,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                    lineNumber: 86,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: mobileOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm xl:hidden",
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            exit: {
                                opacity: 0
                            },
                            onClick: ()=>setMobileOpen(false)
                        }, void 0, false, {
                            fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                            lineNumber: 230,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "fixed top-0 right-0 bottom-0 z-50 w-[82%] max-w-[340px] bg-[rgba(15,15,25,0.92)] backdrop-blur-xl border-l border-white/10 overflow-y-auto",
                            initial: {
                                x: '100%'
                            },
                            animate: {
                                x: 0
                            },
                            exit: {
                                x: '100%'
                            },
                            transition: {
                                duration: 0.35,
                                ease: [
                                    0.22,
                                    1,
                                    0.36,
                                    1
                                ]
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/",
                                                onClick: ()=>setMobileOpen(false),
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$assets$2f$logo$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Qarshiyev$2f$src$2f$assets$2f$logo$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"].src,
                                                        alt: "Qarshiyev",
                                                        className: "w-11 h-11 rounded-xl object-cover"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                                        lineNumber: 248,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-col",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-sans font-bold text-white text-lg leading-none",
                                                                children: "Qarshiyev"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                                                lineNumber: 250,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white/55 text-xs leading-none mt-1",
                                                                children: "Ta'lim Markazi"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                                                lineNumber: 251,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                                        lineNumber: 249,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                                lineNumber: 247,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setMobileOpen(false),
                                                className: "p-2 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-colors",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                    size: 20
                                                }, void 0, false, {
                                                    fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                                    lineNumber: 258,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                                lineNumber: 254,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                        lineNumber: 246,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                        className: "flex flex-col gap-1 mb-8",
                                        children: HEADER_NAV.map((item)=>{
                                            if (item.children) {
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setMobileDropdownOpen(!mobileDropdownOpen),
                                                            className: "flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-colors",
                                                            children: [
                                                                item.label,
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                    size: 16,
                                                                    className: `transition-transform ${mobileDropdownOpen ? 'rotate-180' : ''}`
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                                                    lineNumber: 273,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                                            lineNumber: 268,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `flex flex-col gap-1 pl-4 mt-1 transition-all duration-200 ${mobileDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`,
                                                            children: item.children.map((child)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                    href: child.href,
                                                                    onClick: ()=>{
                                                                        setMobileOpen(false);
                                                                        setMobileDropdownOpen(false);
                                                                    },
                                                                    className: "flex items-center px-4 py-3 rounded-xl text-[14px] font-medium text-white/60 hover:bg-white/10 hover:text-white transition-colors",
                                                                    children: child.label
                                                                }, child.label, false, {
                                                                    fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                                                    lineNumber: 277,
                                                                    columnNumber: 31
                                                                }, ("TURBOPACK compile-time value", void 0)))
                                                        }, void 0, false, {
                                                            fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                                            lineNumber: 275,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, item.label, true, {
                                                    fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                                    lineNumber: 267,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0));
                                            }
                                            const active = isActive(item.href);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: item.href,
                                                onClick: ()=>setMobileOpen(false),
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex items-center px-4 py-3.5 rounded-xl text-[15px] font-semibold transition-colors', active ? 'bg-gold-500/15 text-white shadow-[inset_0_0_0_1px_rgba(138,43,226,0.4)]' : 'text-white/70 hover:bg-white/10 hover:text-white'),
                                                children: item.label
                                            }, item.label, false, {
                                                fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                                lineNumber: 292,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0));
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                        lineNumber: 263,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border-t border-white/10 pt-6 space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: `tel:${__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTACT_INFO"].phone}`,
                                                className: "flex items-center gap-3 p-3 rounded-xl bg-white/5 text-white/80 hover:bg-white/10 transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                        size: 16
                                                    }, void 0, false, {
                                                        fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                                        lineNumber: 315,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-medium",
                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTACT_INFO"].phone
                                                    }, void 0, false, {
                                                        fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                                        lineNumber: 316,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                                lineNumber: 311,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        href: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].PROFILE,
                                                        onClick: ()=>setMobileOpen(false),
                                                        className: "flex items-center justify-center w-full h-[46px] rounded-full bg-white/10 text-white font-semibold transition-colors hover:bg-white/20",
                                                        children: "Kabinet"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                                        lineNumber: 320,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            logout();
                                                            setMobileOpen(false);
                                                        },
                                                        className: "flex items-center justify-center w-full h-[46px] rounded-full bg-red-500/90 text-white font-semibold transition-colors hover:bg-red-500",
                                                        children: "Chiqish"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                                        lineNumber: 327,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].LOGIN,
                                                onClick: ()=>setMobileOpen(false),
                                                className: "flex items-center justify-center w-full h-[46px] rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold shadow-[0_6px_20px_-8px_rgba(138,43,226,0.8)]",
                                                children: "Kirish"
                                            }, void 0, false, {
                                                fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                                lineNumber: 335,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                        lineNumber: 310,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                                lineNumber: 244,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                            lineNumber: 237,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/Qarshiyev/src/components/layout/Navbar.tsx",
                lineNumber: 227,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
}),
"[project]/Qarshiyev/src/components/ui/Icons.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Facebook",
    ()=>Facebook,
    "Instagram",
    ()=>Instagram,
    "Linkedin",
    ()=>Linkedin,
    "Youtube",
    ()=>Youtube
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const Facebook = ({ size = 24, className = '' })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
        }, void 0, false, {
            fileName: "[project]/Qarshiyev/src/components/ui/Icons.tsx",
            lineNumber: 4,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Qarshiyev/src/components/ui/Icons.tsx",
        lineNumber: 3,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const Instagram = ({ size = 24, className = '' })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "2",
                y: "2",
                width: "20",
                height: "20",
                rx: "5",
                ry: "5"
            }, void 0, false, {
                fileName: "[project]/Qarshiyev/src/components/ui/Icons.tsx",
                lineNumber: 10,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
            }, void 0, false, {
                fileName: "[project]/Qarshiyev/src/components/ui/Icons.tsx",
                lineNumber: 11,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "17.5",
                y1: "6.5",
                x2: "17.51",
                y2: "6.5"
            }, void 0, false, {
                fileName: "[project]/Qarshiyev/src/components/ui/Icons.tsx",
                lineNumber: 12,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Qarshiyev/src/components/ui/Icons.tsx",
        lineNumber: 9,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const Youtube = ({ size = 24, className = '' })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"
            }, void 0, false, {
                fileName: "[project]/Qarshiyev/src/components/ui/Icons.tsx",
                lineNumber: 18,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                points: "9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
            }, void 0, false, {
                fileName: "[project]/Qarshiyev/src/components/ui/Icons.tsx",
                lineNumber: 19,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Qarshiyev/src/components/ui/Icons.tsx",
        lineNumber: 17,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const Linkedin = ({ size = 24, className = '' })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
            }, void 0, false, {
                fileName: "[project]/Qarshiyev/src/components/ui/Icons.tsx",
                lineNumber: 25,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "2",
                y: "9",
                width: "4",
                height: "12"
            }, void 0, false, {
                fileName: "[project]/Qarshiyev/src/components/ui/Icons.tsx",
                lineNumber: 26,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "4",
                cy: "4",
                r: "2"
            }, void 0, false, {
                fileName: "[project]/Qarshiyev/src/components/ui/Icons.tsx",
                lineNumber: 27,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Qarshiyev/src/components/ui/Icons.tsx",
        lineNumber: 24,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
}),
"[project]/Qarshiyev/src/data/courses.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "courseCategories",
    ()=>courseCategories,
    "courses",
    ()=>courses
]);
const courses = [
    {
        id: '1',
        title: 'IELTS Intensiv Tayyorgarlik',
        slug: 'ielts-intensive',
        category: 'IELTS',
        level: 'O\'rta (Intermediate)',
        duration: '3 oy',
        lessons: 72,
        students: 1240,
        rating: 4.9,
        reviewCount: 348,
        price: 1200000,
        discountPrice: 990000,
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
        instructor: 'Sarah Mitchell',
        instructorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
        description: 'IELTS imtihonining barcha to\'rtta modulini — Tinglash, O\'qish, Yozish va Gapirishni — bizning isbotlangan imtihon strategiyalarimiz, haqiqiy amaliyot materiallari va shaxsiy fikr-mulohazalarimiz orqali o\'zlashtiring. Bizning mutaxassis o\'qituvchilarimiz 1,200 dan ortiq o\'quvchilarga 7+ ball olishda yordam berishgan.',
        shortDescription: 'Bizning isbotlangan IELTS tayyorgarlik dasturimiz bilan 7+ ballga erishing.',
        tags: [
            'IELTS',
            '7+ ball',
            'Akademik',
            'Umumiy Tayyorgarlik'
        ],
        featured: true,
        startDate: '2026-08-01',
        schedule: 'Dush, Chor, Jum — 09:00–11:00',
        language: 'Ingliz tili',
        certificate: true
    },
    {
        id: '2',
        title: 'IELTS Academic — 8-ballik Mahorat',
        slug: 'ielts-band8',
        category: 'IELTS',
        level: 'Mukammal (Advanced)',
        duration: '2 oy',
        lessons: 48,
        students: 620,
        rating: 4.8,
        reviewCount: 187,
        price: 1500000,
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
        instructor: 'James Harrington',
        instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
        description: '8 va undan yuqori ballni maqsad qilgan yuqori natijadorlar uchun mo\'ljallangan. Akademik yozish strategiyalari, murakkab o\'qish usullari va mukammal gapirish qobiliyatlari intensiv amaliy mashg\'ulotlar orqali tizimli ravishda rivojlantiriladi.',
        shortDescription: 'Academic IELTS bo\'yicha 8+ ballni maqsad qilgan o\'quvchilar uchun.',
        tags: [
            'IELTS Academic',
            '8 ball',
            'Universitetga kirish'
        ],
        featured: true,
        startDate: '2026-08-15',
        schedule: 'Seh, Pay, Shan — 14:00–16:00',
        language: 'Ingliz tili',
        certificate: true
    },
    {
        id: '3',
        title: 'Umumiy Ingliz Tili — A1 dan B2 gacha',
        slug: 'general-english',
        category: 'English',
        level: 'Boshlang\'ich (Beginner)',
        duration: '6 oy',
        lessons: 120,
        students: 2100,
        rating: 4.7,
        reviewCount: 512,
        price: 800000,
        discountPrice: 650000,
        image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80',
        instructor: 'Emily Watson',
        instructorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
        description: 'Boshlang\'ichdan o\'rta darajagacha bo\'lgan grammatika, so\'z boyligi, gapirish, tinglash, o\'qish va yozishni qamrab oluvchi to\'liq ingliz tili dasturi. Barcha yoshdagilar uchun mos.',
        shortDescription: 'A1 dan B2 darajagacha bo\'lgan to\'liq ingliz tili sayohati.',
        tags: [
            'Umumiy Ingliz Tili',
            'Grammatika',
            'Gapirish',
            'Boshlang\'ichlar uchun'
        ],
        featured: true,
        startDate: '2026-08-01',
        schedule: 'Dush–Jum — 08:00–09:30',
        language: 'Ingliz / O\'zbek tili',
        certificate: true
    },
    {
        id: '4',
        title: 'SAT Matematika Mahorati',
        slug: 'sat-math',
        category: 'SAT',
        level: 'Mukammal (Advanced)',
        duration: '2.5 oy',
        lessons: 60,
        students: 430,
        rating: 4.9,
        reviewCount: 124,
        price: 1100000,
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
        instructor: 'Dr. Michael Chen',
        instructorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
        description: 'Algebra, geometriya, ma\'lumotlar tahlili va ilg\'or matematika mavzularini qamrab oluvchi tizimli yondashuvimiz bilan SAT Matematika bo\'limidan to\'liq 800 ballni maqsad qiling. 10 ta to\'liq hajmli amaliy testni o\'z ichiga oladi.',
        shortDescription: 'Isbotlangan strategiyalar bilan SAT Matematikadan 750+ ball to\'plang.',
        tags: [
            'SAT',
            'Matematika',
            'Kollejga Qabul',
            'AQSh Universitetlari'
        ],
        featured: false,
        startDate: '2026-09-01',
        schedule: 'Shan, Yak — 10:00–13:00',
        language: 'Ingliz tili',
        certificate: false
    },
    {
        id: '5',
        title: 'Biznes Ingliz Tili va Muloqot',
        slug: 'business-english',
        category: 'Business',
        level: 'O\'rta (Intermediate)',
        duration: '3 oy',
        lessons: 54,
        students: 380,
        rating: 4.6,
        reviewCount: 98,
        price: 950000,
        image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
        instructor: 'Victoria Lane',
        instructorAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&q=80',
        description: 'Korporativ dunyo uchun professional ingliz tilini o\'zlashtiring. Biznes yozishmalari, taqdimotlar, muzokaralar, elektron pochta odobi va karyera yuksalishi uchun zarur bo\'lgan professional so\'z boyligini qamrab oladi.',
        shortDescription: 'Karyeraga yo\'naltirilgan o\'quvchilar uchun professional ingliz tili ko\'nikmalari.',
        tags: [
            'Biznes Ingliz Tili',
            'Taqdimotlar',
            'Muzokaralar',
            'Korporativ'
        ],
        featured: false,
        startDate: '2026-08-20',
        schedule: 'Dush, Chor — 18:00–20:00',
        language: 'Ingliz tili',
        certificate: true
    },
    {
        id: '6',
        title: 'Cambridge B2 First (FCE)',
        slug: 'cambridge-b2',
        category: 'English',
        level: 'O\'rta (Intermediate)',
        duration: '4 oy',
        lessons: 80,
        students: 560,
        rating: 4.8,
        reviewCount: 201,
        price: 1300000,
        discountPrice: 1100000,
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
        instructor: 'Sarah Mitchell',
        instructorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
        description: 'Barcha besh qism bo\'yicha maqsadli amaliyot bilan Cambridge B2 First (FCE) imtihoniga to\'liq tayyorlaning. Bizning xalqaro tan olingan tayyorgarligimiz sizga muvaffaqiyat qozonish uchun ishonch bag\'ishlaydi.',
        shortDescription: 'Cambridge B2 First sertifikatiga to\'liq tayyorgarlik.',
        tags: [
            'Cambridge',
            'FCE',
            'B2',
            'Xalqaro Sertifikat'
        ],
        featured: true,
        startDate: '2026-08-10',
        schedule: 'Seh, Pay — 16:00–18:00',
        language: 'Ingliz tili',
        certificate: true
    },
    {
        id: '7',
        title: 'DTM va Milliy Sertifikat — Tarix',
        slug: 'tarix-dtm-milliy',
        category: 'Tarix',
        level: 'O\'rta (Intermediate)',
        duration: '3 oy',
        lessons: 72,
        students: 850,
        rating: 4.8,
        reviewCount: 241,
        price: 750000,
        discountPrice: 650000,
        image: 'https://images.unsplash.com/photo-1461360370896-922624d12a74?w=800&q=80',
        instructor: 'Akmal Karimov',
        instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
        description: 'Milliy Sertifikat, Attestatsiya va DTM testlariga tayyorgarlik. Xarita bilan ishlash, mavzular va testlar boʻyicha mukammal tahlil. Offline va online formatda.',
        shortDescription: 'DTM va Milliy Sertifikat uchun mukammal Tarix tayyorgarligi.',
        tags: [
            'Milliy Sertifikat',
            'Attestatsiya',
            'DTM',
            'Tarix',
            'Xarita'
        ],
        featured: true,
        startDate: '2026-08-01',
        schedule: 'Dush, Chor, Jum — 14:00–16:00',
        language: 'O\'zbek tili',
        certificate: true
    },
    {
        id: '8',
        title: 'DTM va Milliy Sertifikat — Ona tili va Adabiyot',
        slug: 'ona-tili-dtm-milliy',
        category: 'Ona tili va adabiyot',
        level: 'O\'rta (Intermediate)',
        duration: '3 oy',
        lessons: 72,
        students: 920,
        rating: 4.9,
        reviewCount: 278,
        price: 750000,
        discountPrice: 650000,
        image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
        instructor: 'Nilufar Ahmadova',
        instructorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80',
        description: 'Milliy Sertifikat, Attestatsiya va DTM testlariga tayyorgarlik. Qator test va esse tahlillari bilan chuqur bilim olish. Offline va online formatda.',
        shortDescription: 'DTM va Milliy Sertifikat uchun mukammal Ona tili va Adabiyot tayyorgarligi.',
        tags: [
            'Milliy Sertifikat',
            'Attestatsiya',
            'DTM',
            'Ona tili',
            'Adabiyot',
            'Esse'
        ],
        featured: true,
        startDate: '2026-08-01',
        schedule: 'Dush, Chor, Jum — 10:00–12:00',
        language: 'O\'zbek tili',
        certificate: true
    },
    {
        id: '9',
        title: 'Ingliz tili — IELTS, CEFR va DTM Tayyorgarligi',
        slug: 'ingliz-tili-dtm-milliy',
        category: 'English',
        level: 'O\'rta (Intermediate)',
        duration: '3 oy',
        lessons: 72,
        students: 1400,
        rating: 4.9,
        reviewCount: 365,
        price: 900000,
        discountPrice: 780000,
        image: 'https://images.unsplash.com/photo-1523240794352-6d382fe4e6d4?w=800&q=80',
        instructor: 'Sarah Mitchell',
        instructorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
        description: 'IELTS, CEFR, General English, English Grammar, DTM testi va xalqaro olimpiadaga mukammal tayyorgarlik. CEFR mock test, har bir bola bilan individual ishlash, offline va online.',
        shortDescription: 'IELTS, CEFR va xalqaro olimpiadalar uchun mukammal ingliz tili tayyorgarligi.',
        tags: [
            'IELTS',
            'CEFR',
            'DTM',
            'Xalqaro Olimpiada',
            'Ingliz tili',
            'Mock test'
        ],
        featured: true,
        startDate: '2026-08-01',
        schedule: 'Dush, Chor, Jum — 12:00–14:00',
        language: 'Ingliz / O\'zbek tili',
        certificate: true
    }
];
const courseCategories = [
    'IELTS',
    'TOEFL',
    'SAT',
    'English',
    'Math',
    'Science',
    'Programming',
    'Business',
    'Tarix',
    'Ona tili va adabiyot'
];
}),
"[project]/Qarshiyev/src/components/layout/Footer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Footer",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/lucide-react/dist/esm/icons/phone.mjs [app-ssr] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/lucide-react/dist/esm/icons/mail.mjs [app-ssr] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/lucide-react/dist/esm/icons/map-pin.mjs [app-ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/lucide-react/dist/esm/icons/clock.mjs [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/lucide-react/dist/esm/icons/send.mjs [app-ssr] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/lucide-react/dist/esm/icons/arrow-right.mjs [app-ssr] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$ui$2f$Icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/components/ui/Icons.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/constants/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$data$2f$courses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/data/courses.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$assets$2f$logo$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Qarshiyev$2f$src$2f$assets$2f$logo$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/Qarshiyev/src/assets/logo.png.mjs { IMAGE => "[project]/Qarshiyev/src/assets/logo.png (static in ecmascript, tag client)" } [app-ssr] (structured image object with data url, ecmascript)');
;
;
;
;
;
;
;
const Footer = ()=>{
    const currentYear = new Date().getFullYear();
    const featuredCourses = __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$data$2f$courses$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["courses"].filter((c)=>c.featured).slice(0, 4);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "bg-slate-950 text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container-custom pt-16 pb-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    className: "flex items-center gap-3 mb-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$assets$2f$logo$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Qarshiyev$2f$src$2f$assets$2f$logo$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"].src,
                                            alt: "Qarshiyev",
                                            className: "w-10 h-10 rounded-xl object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                            lineNumber: 28,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-serif font-bold text-white text-lg leading-none block",
                                                    children: "Qarshiyev"
                                                }, void 0, false, {
                                                    fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                                    lineNumber: 30,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-white/50 text-xs tracking-wider",
                                                    children: "Ta'lim Markazi"
                                                }, void 0, false, {
                                                    fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                                    lineNumber: 33,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                            lineNumber: 29,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                    lineNumber: 27,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-slate-400 text-sm leading-relaxed mb-6",
                                    children: "2015 yildan buyon Qarshining yetakchi ta'lim markazi, o'quvchilarga xalqaro til va akademik muvaffaqiyatga erishishda yordam beradi."
                                }, void 0, false, {
                                    fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                    lineNumber: 36,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTACT_INFO"].telegram,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-violet-500 hover:text-white transition-all duration-200",
                                            "aria-label": "Telegram",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                                lineNumber: 47,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                            lineNumber: 40,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTACT_INFO"].instagram,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-violet-500 hover:text-white transition-all duration-200",
                                            "aria-label": "Instagram",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$ui$2f$Icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Instagram"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                                lineNumber: 56,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                            lineNumber: 49,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTACT_INFO"].facebook,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-violet-500 hover:text-white transition-all duration-200",
                                            "aria-label": "Facebook",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$ui$2f$Icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Facebook"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                                lineNumber: 65,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                            lineNumber: 58,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTACT_INFO"].youtube,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-violet-500 hover:text-white transition-all duration-200",
                                            "aria-label": "YouTube",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$ui$2f$Icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Youtube"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                                lineNumber: 74,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                            lineNumber: 67,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                    lineNumber: 39,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                            lineNumber: 26,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-white font-semibold text-sm uppercase tracking-widest mb-5",
                                    children: "Tezkor Havolalar"
                                }, void 0, false, {
                                    fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                    lineNumber: 81,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-3",
                                    children: [
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NAV_ITEMS"].filter((n)=>!('children' in n)).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: item.href,
                                                    className: "flex items-center gap-2 text-slate-400 text-sm hover:text-violet-400 transition-colors group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                            size: 12,
                                                            className: "opacity-0 group-hover:opacity-100 transition-opacity -ml-1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                                            lineNumber: 91,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        item.label
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                                    lineNumber: 87,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, item.label, false, {
                                                fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                                lineNumber: 86,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].RESULTS,
                                                className: "flex items-center gap-2 text-slate-400 text-sm hover:text-violet-400 transition-colors group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                        size: 12,
                                                        className: "opacity-0 group-hover:opacity-100 transition-opacity -ml-1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                                        lineNumber: 104,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    "O'quvchilarning Yutuqlari"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                                lineNumber: 100,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                            lineNumber: 99,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-white font-semibold text-sm uppercase tracking-widest mb-5",
                                    children: "Bizning Kurslarimiz"
                                }, void 0, false, {
                                    fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                    lineNumber: 116,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-3",
                                    children: [
                                        featuredCourses.map((course)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].COURSES,
                                                    className: "flex items-start gap-2 text-slate-400 text-sm hover:text-violet-400 transition-colors group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                            size: 12,
                                                            className: "opacity-0 group-hover:opacity-100 transition-opacity mt-0.5 shrink-0"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                                            lineNumber: 126,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: course.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                                            lineNumber: 130,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                                    lineNumber: 122,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, course.id, false, {
                                                fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                                lineNumber: 121,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].COURSES,
                                                className: "text-violet-500 text-sm font-medium hover:text-violet-400 transition-colors",
                                                children: "Barcha kurslarni ko'rish →"
                                            }, void 0, false, {
                                                fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                                lineNumber: 135,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                            lineNumber: 134,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                    lineNumber: 119,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                            lineNumber: 115,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-white font-semibold text-sm uppercase tracking-widest mb-5",
                                    children: "Biz bilan Bog'laning"
                                }, void 0, false, {
                                    fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                    lineNumber: 147,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-start gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                    size: 15,
                                                    className: "text-violet-500 mt-0.5 shrink-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                                    lineNumber: 152,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-slate-400 text-sm leading-relaxed",
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTACT_INFO"].addressFull
                                                }, void 0, false, {
                                                    fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                                    lineNumber: 153,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                            lineNumber: 151,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: `tel:${__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTACT_INFO"].phone}`,
                                                className: "flex items-center gap-3 text-slate-400 text-sm hover:text-violet-400 transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                        size: 15,
                                                        className: "text-violet-500 shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                                        lineNumber: 162,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTACT_INFO"].phone
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                                lineNumber: 158,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                            lineNumber: 157,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: `mailto:${__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTACT_INFO"].email}`,
                                                className: "flex items-center gap-3 text-slate-400 text-sm hover:text-violet-400 transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                        size: 15,
                                                        className: "text-violet-500 shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                                        lineNumber: 171,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTACT_INFO"].email
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                                lineNumber: 167,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                            lineNumber: 166,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-start gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                    size: 15,
                                                    className: "text-violet-500 mt-0.5 shrink-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                                    lineNumber: 176,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTACT_INFO"].workingHours.map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-slate-400 text-sm",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-slate-300",
                                                                    children: [
                                                                        h.day,
                                                                        ":"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                                                    lineNumber: 180,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                " ",
                                                                h.hours
                                                            ]
                                                        }, h.day, true, {
                                                            fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                                            lineNumber: 179,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                }, void 0, false, {
                                                    fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                                    lineNumber: 177,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                            lineNumber: 175,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                    lineNumber: 150,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                            lineNumber: 146,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-white/10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container-custom py-5",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-slate-500 text-sm",
                                children: [
                                    "© ",
                                    currentYear,
                                    " Qarshiyev Ta'lim Markazi. Barcha huquqlar himoyalangan."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                lineNumber: 194,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "#",
                                        className: "text-slate-500 text-sm hover:text-slate-300 transition-colors",
                                        children: "Maxfiylik Siyosati"
                                    }, void 0, false, {
                                        fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                        lineNumber: 198,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "#",
                                        className: "text-slate-500 text-sm hover:text-slate-300 transition-colors",
                                        children: "Foydalanish Shartlari"
                                    }, void 0, false, {
                                        fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                        lineNumber: 201,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                                lineNumber: 197,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                        lineNumber: 193,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                    lineNumber: 192,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
                lineNumber: 191,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Qarshiyev/src/components/layout/Footer.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/Qarshiyev/src/components/assistant/FloatingAssistantButton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FloatingAssistantButton",
    ()=>FloatingAssistantButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/lucide-react/dist/esm/icons/sparkles.mjs [app-ssr] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/lucide-react/dist/esm/icons/x.mjs [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$assistant$2f$AssistantContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/assistant/AssistantContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/utils/index.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
const FloatingAssistantButton = ()=>{
    const { isOpen, toggle } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$assistant$2f$AssistantContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAssistant"])();
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showTip, setShowTip] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const hoverX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const hoverY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const springX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])(hoverX, {
        stiffness: 300,
        damping: 20
    });
    const springY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])(hoverY, {
        stiffness: 300,
        damping: 20
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const t = setTimeout(()=>{
            setReady(true);
            setShowTip(true);
            setTimeout(()=>setShowTip(false), 5000);
        }, 2000);
        return ()=>clearTimeout(t);
    }, []);
    const handleMouseMove = (e)=>{
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        hoverX.set(x * 0.25);
        hoverY.set(y * 0.25);
    };
    const handleMouseLeave = ()=>{
        hoverX.set(0);
        hoverY.set(0);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: ready && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
            type: "button",
            onClick: toggle,
            onMouseEnter: ()=>setShowTip(true),
            onMouseMove: handleMouseMove,
            onMouseLeave: handleMouseLeave,
            "aria-label": isOpen ? 'Close information' : 'Open information',
            "aria-expanded": isOpen,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('assistant-violet assistant-ripple fixed bottom-6 right-20 md:right-24', 'h-16 w-16 rounded-full flex items-center justify-center', 'text-white shadow-2xl cursor-pointer group select-none pointer-events-auto', isOpen ? 'z-[10000]' : 'z-[99999]'),
            initial: {
                opacity: 0,
                scale: 0.3,
                y: 30
            },
            animate: {
                opacity: 1,
                scale: 1,
                y: 0
            },
            exit: {
                opacity: 0,
                scale: 0.3,
                y: 30
            },
            transition: {
                type: 'spring',
                stiffness: 260,
                damping: 18
            },
            whileHover: {
                scale: 1.08
            },
            whileTap: {
                scale: 0.92
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                style: {
                    x: springX,
                    y: springY
                },
                className: "absolute inset-0",
                children: [
                    !isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "assistant-pulse-glow"
                    }, void 0, false, {
                        fileName: "[project]/Qarshiyev/src/components/assistant/FloatingAssistantButton.tsx",
                        lineNumber: 64,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute inset-0 rounded-full assistant-conic opacity-90"
                    }, void 0, false, {
                        fileName: "[project]/Qarshiyev/src/components/assistant/FloatingAssistantButton.tsx",
                        lineNumber: 65,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute inset-[1.5px] rounded-full bg-gradient-to-br from-violet-500 to-indigo-600"
                    }, void 0, false, {
                        fileName: "[project]/Qarshiyev/src/components/assistant/FloatingAssistantButton.tsx",
                        lineNumber: 66,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "relative z-10 flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                            animate: isOpen ? {
                                rotate: 90,
                                scale: 0.9
                            } : {
                                rotate: 0,
                                scale: 1
                            },
                            transition: {
                                type: 'spring',
                                stiffness: 300,
                                damping: 20
                            },
                            children: isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 24,
                                strokeWidth: 2.2
                            }, void 0, false, {
                                fileName: "[project]/Qarshiyev/src/components/assistant/FloatingAssistantButton.tsx",
                                lineNumber: 73,
                                columnNumber: 27
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                size: 24,
                                strokeWidth: 2.2
                            }, void 0, false, {
                                fileName: "[project]/Qarshiyev/src/components/assistant/FloatingAssistantButton.tsx",
                                lineNumber: 73,
                                columnNumber: 63
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/Qarshiyev/src/components/assistant/FloatingAssistantButton.tsx",
                            lineNumber: 69,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Qarshiyev/src/components/assistant/FloatingAssistantButton.tsx",
                        lineNumber: 68,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: showTip && !isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                            initial: {
                                opacity: 0,
                                x: 10,
                                scale: 0.9
                            },
                            animate: {
                                opacity: 1,
                                x: 0,
                                scale: 1
                            },
                            exit: {
                                opacity: 0,
                                x: 10,
                                scale: 0.9
                            },
                            transition: {
                                type: 'spring',
                                stiffness: 300,
                                damping: 24
                            },
                            className: "pointer-events-none absolute right-[4.5rem] top-1/2 -translate-y-1/2 hidden whitespace-nowrap rounded-2xl bg-slate-950/92 px-3.5 py-2 text-xs font-medium text-white shadow-xl backdrop-blur md:block",
                            children: "Information"
                        }, void 0, false, {
                            fileName: "[project]/Qarshiyev/src/components/assistant/FloatingAssistantButton.tsx",
                            lineNumber: 79,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Qarshiyev/src/components/assistant/FloatingAssistantButton.tsx",
                        lineNumber: 77,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Qarshiyev/src/components/assistant/FloatingAssistantButton.tsx",
                lineNumber: 63,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/Qarshiyev/src/components/assistant/FloatingAssistantButton.tsx",
            lineNumber: 42,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false);
};
}),
"[project]/Qarshiyev/src/components/layout/FloatingButtons.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FloatingButtons",
    ()=>FloatingButtons
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/lucide-react/dist/esm/icons/arrow-up.mjs [app-ssr] (ecmascript) <export default as ArrowUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/lucide-react/dist/esm/icons/phone.mjs [app-ssr] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/constants/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/utils/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$context$2f$SmoothScrollProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/context/SmoothScrollProvider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$assistant$2f$FloatingAssistantButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/components/assistant/FloatingAssistantButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$ui$2f$Icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/components/ui/Icons.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
const TelegramIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "currentColor",
        className: "w-5 h-5",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
        }, void 0, false, {
            fileName: "[project]/Qarshiyev/src/components/layout/FloatingButtons.tsx",
            lineNumber: 12,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Qarshiyev/src/components/layout/FloatingButtons.tsx",
        lineNumber: 11,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const FloatingButtons = ()=>{
    const [showScrollTop, setShowScrollTop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const lenis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$context$2f$SmoothScrollProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLenis"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handler = ()=>setShowScrollTop(window.scrollY > 400);
        window.addEventListener('scroll', handler, {
            passive: true
        });
        return ()=>window.removeEventListener('scroll', handler);
    }, []);
    const scrollToTop = ()=>{
        if (lenis) {
            lenis.scrollTo(0, {
                duration: 1.6
            });
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };
    const buttons = [
        {
            id: 'telegram',
            href: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTACT_INFO"].telegram,
            label: 'Telegram',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TelegramIcon, {}, void 0, false, {
                fileName: "[project]/Qarshiyev/src/components/layout/FloatingButtons.tsx",
                lineNumber: 39,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            bg: 'bg-[#0088cc]',
            hover: 'hover:bg-[#0077bb]'
        },
        {
            id: 'instagram',
            href: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTACT_INFO"].instagram,
            label: 'Instagram',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$ui$2f$Icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Instagram"], {
                size: 20
            }, void 0, false, {
                fileName: "[project]/Qarshiyev/src/components/layout/FloatingButtons.tsx",
                lineNumber: 47,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            bg: 'bg-[#E1306C]',
            hover: 'hover:bg-[#c9255e]'
        },
        {
            id: 'phone',
            href: `tel:${__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTACT_INFO"].phone}`,
            label: 'Call us',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                size: 18
            }, void 0, false, {
                fileName: "[project]/Qarshiyev/src/components/layout/FloatingButtons.tsx",
                lineNumber: 55,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            bg: 'bg-slate-950',
            hover: 'hover:bg-slate-800'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-6 right-5 z-50 flex flex-col gap-3 items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: showScrollTop && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                    onClick: scrollToTop,
                    className: "w-11 h-11 rounded-full bg-white border border-slate-200 shadow-lg text-slate-600 flex items-center justify-center hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all duration-200",
                    initial: {
                        opacity: 0,
                        scale: 0.5
                    },
                    animate: {
                        opacity: 1,
                        scale: 1
                    },
                    exit: {
                        opacity: 0,
                        scale: 0.5
                    },
                    whileHover: {
                        scale: 1.1
                    },
                    whileTap: {
                        scale: 0.9
                    },
                    "aria-label": "Scroll to top",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__["ArrowUp"], {
                        size: 16
                    }, void 0, false, {
                        fileName: "[project]/Qarshiyev/src/components/layout/FloatingButtons.tsx",
                        lineNumber: 76,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, "scroll-top", false, {
                    fileName: "[project]/Qarshiyev/src/components/layout/FloatingButtons.tsx",
                    lineNumber: 65,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Qarshiyev/src/components/layout/FloatingButtons.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            buttons.map((btn, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].a, {
                    href: btn.href,
                    target: btn.id !== 'phone' ? '_blank' : undefined,
                    rel: "noopener noreferrer",
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('w-12 h-12 rounded-full text-white flex items-center justify-center shadow-lg transition-all duration-200 animate-[float_6s_ease-in-out_infinite]', btn.bg, btn.hover),
                    style: {
                        animationDelay: `${i * 0.8}s`
                    },
                    initial: {
                        opacity: 0,
                        x: 30
                    },
                    animate: {
                        opacity: 1,
                        x: 0
                    },
                    transition: {
                        delay: 0.5 + i * 0.1
                    },
                    whileHover: {
                        scale: 1.15
                    },
                    whileTap: {
                        scale: 0.9
                    },
                    "aria-label": btn.label,
                    title: btn.label,
                    children: btn.icon
                }, btn.id, false, {
                    fileName: "[project]/Qarshiyev/src/components/layout/FloatingButtons.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$assistant$2f$FloatingAssistantButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FloatingAssistantButton"], {}, void 0, false, {
                fileName: "[project]/Qarshiyev/src/components/layout/FloatingButtons.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Qarshiyev/src/components/layout/FloatingButtons.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AssistantWidget",
    ()=>AssistantWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/lucide-react/dist/esm/icons/x.mjs [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/lucide-react/dist/esm/icons/book-open.mjs [app-ssr] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$languages$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Languages$3e$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/lucide-react/dist/esm/icons/languages.mjs [app-ssr] (ecmascript) <export default as Languages>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2d$xml$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Code2$3e$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/lucide-react/dist/esm/icons/code-xml.mjs [app-ssr] (ecmascript) <export default as Code2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$tool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PenTool$3e$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/lucide-react/dist/esm/icons/pen-tool.mjs [app-ssr] (ecmascript) <export default as PenTool>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/lucide-react/dist/esm/icons/star.mjs [app-ssr] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$assistant$2f$AssistantContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/assistant/AssistantContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/utils/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$assets$2f$logo$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Qarshiyev$2f$src$2f$assets$2f$logo$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/Qarshiyev/src/assets/logo.png.mjs { IMAGE => "[project]/Qarshiyev/src/assets/logo.png (static in ecmascript, tag client)" } [app-ssr] (structured image object with data url, ecmascript)');
;
;
;
;
;
;
;
const cardVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.96
    },
    visible: (i)=>({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                delay: 0.08 + i * 0.07,
                type: 'spring',
                stiffness: 300,
                damping: 24
            }
        })
};
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.1
        }
    }
};
const Header = ({ onClose })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative overflow-hidden rounded-t-3xl px-5 py-5 bg-white/[0.04] border-b border-white/[0.08]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-transparent"
            }, void 0, false, {
                fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                lineNumber: 40,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative flex items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute -inset-2 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 opacity-60 blur-lg"
                            }, void 0, false, {
                                fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                                lineNumber: 43,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 p-2.5 shadow-2xl shadow-violet-500/30",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$assets$2f$logo$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Qarshiyev$2f$src$2f$assets$2f$logo$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"].src,
                                    alt: "Qarshiyev",
                                    className: "h-full w-full object-contain"
                                }, void 0, false, {
                                    fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                                    lineNumber: 45,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                                lineNumber: 44,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-slate-900 bg-emerald-400 shadow-lg shadow-emerald-500/50"
                            }, void 0, false, {
                                fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                                lineNumber: 47,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                        lineNumber: 42,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mb-0.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-base font-bold text-white tracking-tight",
                                        children: "Qarshiyev Education Center"
                                    }, void 0, false, {
                                        fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                                        lineNumber: 51,
                                        columnNumber: 11
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[0.65rem] font-semibold text-emerald-400 border border-emerald-500/20",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"
                                            }, void 0, false, {
                                                fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                                                lineNumber: 53,
                                                columnNumber: 13
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "ONLINE"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                                        lineNumber: 52,
                                        columnNumber: 11
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                                lineNumber: 50,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[0.72rem] text-slate-400 leading-relaxed",
                                children: "Everything you need to know about our learning center."
                            }, void 0, false, {
                                fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                                lineNumber: 57,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                        lineNumber: 49,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onClose,
                        "aria-label": "Close",
                        className: "flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.06] text-slate-400 transition-all duration-200 hover:bg-white/[0.12] hover:text-white hover:rotate-90",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            size: 16,
                            strokeWidth: 2.5
                        }, void 0, false, {
                            fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                            lineNumber: 67,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                        lineNumber: 61,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                lineNumber: 41,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
        lineNumber: 39,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const InfoCard = ({ icon, title, description, items, index, iconBg, glowColor })=>{
    const [isHovered, setIsHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        custom: index,
        variants: cardVariants,
        initial: "hidden",
        animate: "visible",
        onHoverStart: ()=>setIsHovered(true),
        onHoverEnd: ()=>setIsHovered(false),
        className: "group relative",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('relative overflow-hidden rounded-3xl border p-5 transition-all duration-500', isHovered ? 'border-white/20 bg-white/[0.08] shadow-2xl' : 'border-white/[0.08] bg-white/[0.04]'),
            style: isHovered ? {
                boxShadow: `0 0 0 1px ${glowColor}15, 0 20px 50px -12px ${glowColor}30, inset 0 1px 0 0 ${glowColor}15`
            } : undefined,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('absolute inset-0 opacity-0 transition-opacity duration-500', isHovered ? 'opacity-100' : 'opacity-0'),
                    style: {
                        background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}08, transparent 40%)`
                    }
                }, void 0, false, {
                    fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                    lineNumber: 111,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative flex items-start gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex h-12 w-12 flex-none items-center justify-center rounded-2xl text-white shadow-xl transition-all duration-500', iconBg, isHovered && 'scale-110 shadow-2xl'),
                            style: isHovered ? {
                                boxShadow: `0 0 30px ${glowColor}40, 0 10px 30px -10px ${glowColor}50`
                            } : undefined,
                            children: icon
                        }, void 0, false, {
                            fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                            lineNumber: 122,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 mb-1",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-bold text-white tracking-tight",
                                        children: title
                                    }, void 0, false, {
                                        fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                                        lineNumber: 140,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                                    lineNumber: 139,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[0.72rem] text-slate-400 leading-relaxed mb-3",
                                    children: description
                                }, void 0, false, {
                                    fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                                    lineNumber: 142,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-1.5",
                                    children: items.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].li, {
                                            initial: {
                                                opacity: 0,
                                                x: -8
                                            },
                                            animate: {
                                                opacity: 1,
                                                x: 0
                                            },
                                            transition: {
                                                delay: 0.2 + i * 0.03
                                            },
                                            className: "flex items-center gap-2.5 text-[0.75rem] text-slate-300",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex h-4 w-4 flex-none items-center justify-center rounded-md bg-white/[0.06]",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                        size: 10,
                                                        className: "text-violet-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                                                        lineNumber: 153,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                                                    lineNumber: 152,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                item
                                            ]
                                        }, item, true, {
                                            fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                                            lineNumber: 145,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                                    lineNumber: 143,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                            lineNumber: 138,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                    lineNumber: 121,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
            lineNumber: 96,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const AssistantWidget = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(()=>{
    const { isOpen, close } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$assistant$2f$AssistantContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAssistant"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    transition: {
                        duration: 0.35,
                        ease: 'easeOut'
                    },
                    className: "fixed inset-0 z-[9999] bg-black/60 backdrop-blur-md"
                }, "info-backdrop", false, {
                    fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                    lineNumber: 173,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        scale: 0.9,
                        y: 30
                    },
                    animate: {
                        opacity: 1,
                        scale: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        scale: 0.95,
                        y: 20
                    },
                    transition: {
                        type: 'spring',
                        stiffness: 200,
                        damping: 25
                    },
                    className: "assistant-violet fixed bottom-4 right-4 z-[10000] flex h-[85vh] w-[calc(100vw-2rem)] max-w-[420px] flex-col overflow-hidden rounded-[2rem] md:bottom-8 md:right-8 md:h-[640px] border border-white/[0.12] bg-[#0a0a0f]/95 shadow-2xl shadow-black/50",
                    role: "dialog",
                    "aria-label": "School Information",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-gradient-to-br from-violet-500/[0.07] via-transparent to-cyan-500/[0.03] pointer-events-none"
                        }, void 0, false, {
                            fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                            lineNumber: 191,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"
                        }, void 0, false, {
                            fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                            lineNumber: 192,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Header, {
                            onClose: close
                        }, void 0, false, {
                            fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                            lineNumber: 194,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "assistant-scroll relative flex-1 overflow-y-auto px-4 py-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                variants: containerVariants,
                                initial: "hidden",
                                animate: "visible",
                                className: "space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoCard, {
                                        index: 0,
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                            size: 22
                                        }, void 0, false, {
                                            fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                                            lineNumber: 200,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        title: "English Courses",
                                        description: "Learn English from Beginner to IELTS with experienced teachers.",
                                        items: [
                                            'Beginner',
                                            'Elementary',
                                            'Pre-Intermediate',
                                            'Intermediate',
                                            'Upper Intermediate',
                                            'IELTS Preparation',
                                            'Speaking Club'
                                        ],
                                        iconBg: "bg-gradient-to-br from-blue-500 to-violet-600",
                                        glowColor: "#6366f1"
                                    }, void 0, false, {
                                        fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                                        lineNumber: 198,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoCard, {
                                        index: 1,
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$languages$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Languages$3e$__["Languages"], {
                                            size: 22
                                        }, void 0, false, {
                                            fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                                            lineNumber: 218,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        title: "Russian Courses",
                                        description: "Modern Russian lessons for study, work and daily communication.",
                                        items: [
                                            'Beginner',
                                            'Grammar',
                                            'Speaking',
                                            'Reading',
                                            'Vocabulary'
                                        ],
                                        iconBg: "bg-gradient-to-br from-sky-500 to-blue-600",
                                        glowColor: "#0ea5e9"
                                    }, void 0, false, {
                                        fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                                        lineNumber: 216,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoCard, {
                                        index: 2,
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2d$xml$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Code2$3e$__["Code2"], {
                                            size: 22
                                        }, void 0, false, {
                                            fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                                            lineNumber: 228,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        title: "IT Academy",
                                        description: "Become a professional programmer with hands-on projects.",
                                        items: [
                                            'HTML',
                                            'CSS',
                                            'JavaScript',
                                            'React',
                                            'TypeScript',
                                            'Git & GitHub',
                                            'Responsive Design',
                                            'Portfolio Projects'
                                        ],
                                        iconBg: "bg-gradient-to-br from-violet-500 to-purple-600",
                                        glowColor: "#8b5cf6"
                                    }, void 0, false, {
                                        fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                                        lineNumber: 226,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoCard, {
                                        index: 3,
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$tool$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PenTool$3e$__["PenTool"], {
                                            size: 22
                                        }, void 0, false, {
                                            fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                                            lineNumber: 247,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        title: "Graphic Design",
                                        description: "Master creative tools and design stunning visuals.",
                                        items: [
                                            'Photoshop',
                                            'Illustrator',
                                            'Figma',
                                            'Branding',
                                            'Social Media Design'
                                        ],
                                        iconBg: "bg-gradient-to-br from-pink-500 to-rose-600",
                                        glowColor: "#ec4899"
                                    }, void 0, false, {
                                        fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                                        lineNumber: 245,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoCard, {
                                        index: 4,
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                            size: 22
                                        }, void 0, false, {
                                            fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                                            lineNumber: 257,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        title: "Why Choose Us?",
                                        description: "We provide the best learning experience in the region.",
                                        items: [
                                            'Professional teachers',
                                            'Practical lessons',
                                            'Friendly atmosphere',
                                            'Affordable prices',
                                            'Small groups',
                                            'Modern classrooms',
                                            'Certificates'
                                        ],
                                        iconBg: "bg-gradient-to-br from-amber-500 to-orange-600",
                                        glowColor: "#f59e0b"
                                    }, void 0, false, {
                                        fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                                        lineNumber: 255,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                                lineNumber: 197,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                            lineNumber: 196,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, "info-panel", true, {
                    fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
                    lineNumber: 181,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx",
        lineNumber: 170,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
AssistantWidget.displayName = 'AssistantWidget';
}),
"[project]/Qarshiyev/src/components/assistant/index.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Assistant",
    ()=>Assistant
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$assistant$2f$AssistantWidget$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/components/assistant/AssistantWidget.tsx [app-ssr] (ecmascript)");
;
;
const Assistant = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$assistant$2f$AssistantWidget$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AssistantWidget"], {}, void 0, false, {
            fileName: "[project]/Qarshiyev/src/components/assistant/index.tsx",
            lineNumber: 6,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false);
};
}),
"[project]/Qarshiyev/src/components/intro/IntroLogoSvg.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IntroLogoSvg",
    ()=>IntroLogoSvg
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/components/intro/constants.ts [app-ssr] (ecmascript)");
;
;
;
const IntroLogoSvg = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, style }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ref: ref,
        className: className,
        viewBox: "0 0 200 200",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        style: {
            willChange: 'transform, opacity',
            ...style
        },
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("radialGradient", {
                        id: "logoBgGrad",
                        cx: "36%",
                        cy: "30%",
                        r: "80%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0%",
                                stopColor: "#b98bff"
                            }, void 0, false, {
                                fileName: "[project]/Qarshiyev/src/components/intro/IntroLogoSvg.tsx",
                                lineNumber: 28,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "34%",
                                stopColor: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_COLORS"].primary
                            }, void 0, false, {
                                fileName: "[project]/Qarshiyev/src/components/intro/IntroLogoSvg.tsx",
                                lineNumber: 29,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "72%",
                                stopColor: "#5b16a8"
                            }, void 0, false, {
                                fileName: "[project]/Qarshiyev/src/components/intro/IntroLogoSvg.tsx",
                                lineNumber: 30,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "100%",
                                stopColor: "#2a0a4d"
                            }, void 0, false, {
                                fileName: "[project]/Qarshiyev/src/components/intro/IntroLogoSvg.tsx",
                                lineNumber: 31,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Qarshiyev/src/components/intro/IntroLogoSvg.tsx",
                        lineNumber: 27,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                        id: "rimGrad",
                        x1: "0%",
                        y1: "0%",
                        x2: "100%",
                        y2: "100%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0%",
                                stopColor: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_COLORS"].highlight,
                                stopOpacity: "0.85"
                            }, void 0, false, {
                                fileName: "[project]/Qarshiyev/src/components/intro/IntroLogoSvg.tsx",
                                lineNumber: 34,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "50%",
                                stopColor: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_COLORS"].secondary,
                                stopOpacity: "0.7"
                            }, void 0, false, {
                                fileName: "[project]/Qarshiyev/src/components/intro/IntroLogoSvg.tsx",
                                lineNumber: 35,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "100%",
                                stopColor: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_COLORS"].primary,
                                stopOpacity: "0.5"
                            }, void 0, false, {
                                fileName: "[project]/Qarshiyev/src/components/intro/IntroLogoSvg.tsx",
                                lineNumber: 36,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Qarshiyev/src/components/intro/IntroLogoSvg.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                        id: "swirlGrad",
                        x1: "0%",
                        y1: "100%",
                        x2: "100%",
                        y2: "0%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0%",
                                stopColor: "#ffffff",
                                stopOpacity: "0.95"
                            }, void 0, false, {
                                fileName: "[project]/Qarshiyev/src/components/intro/IntroLogoSvg.tsx",
                                lineNumber: 39,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "100%",
                                stopColor: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_COLORS"].secondary,
                                stopOpacity: "0.85"
                            }, void 0, false, {
                                fileName: "[project]/Qarshiyev/src/components/intro/IntroLogoSvg.tsx",
                                lineNumber: 40,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Qarshiyev/src/components/intro/IntroLogoSvg.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("clipPath", {
                        id: "logoCircleClip",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: "100",
                            cy: "100",
                            r: "88"
                        }, void 0, false, {
                            fileName: "[project]/Qarshiyev/src/components/intro/IntroLogoSvg.tsx",
                            lineNumber: 43,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Qarshiyev/src/components/intro/IntroLogoSvg.tsx",
                        lineNumber: 42,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                        id: "lightSweepGrad",
                        x1: "0%",
                        y1: "0%",
                        x2: "100%",
                        y2: "0%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0%",
                                stopColor: "white",
                                stopOpacity: "0"
                            }, void 0, false, {
                                fileName: "[project]/Qarshiyev/src/components/intro/IntroLogoSvg.tsx",
                                lineNumber: 46,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "45%",
                                stopColor: "white",
                                stopOpacity: "0"
                            }, void 0, false, {
                                fileName: "[project]/Qarshiyev/src/components/intro/IntroLogoSvg.tsx",
                                lineNumber: 47,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "50%",
                                stopColor: "white",
                                stopOpacity: "0.45"
                            }, void 0, false, {
                                fileName: "[project]/Qarshiyev/src/components/intro/IntroLogoSvg.tsx",
                                lineNumber: 48,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "55%",
                                stopColor: "white",
                                stopOpacity: "0"
                            }, void 0, false, {
                                fileName: "[project]/Qarshiyev/src/components/intro/IntroLogoSvg.tsx",
                                lineNumber: 49,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "100%",
                                stopColor: "white",
                                stopOpacity: "0"
                            }, void 0, false, {
                                fileName: "[project]/Qarshiyev/src/components/intro/IntroLogoSvg.tsx",
                                lineNumber: 50,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Qarshiyev/src/components/intro/IntroLogoSvg.tsx",
                        lineNumber: 45,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                        id: "logoShadow",
                        x: "-30%",
                        y: "-30%",
                        width: "160%",
                        height: "160%",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feDropShadow", {
                            dx: "0",
                            dy: "6",
                            stdDeviation: "12",
                            floodColor: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_COLORS"].primary,
                            floodOpacity: "0.4"
                        }, void 0, false, {
                            fileName: "[project]/Qarshiyev/src/components/intro/IntroLogoSvg.tsx",
                            lineNumber: 53,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Qarshiyev/src/components/intro/IntroLogoSvg.tsx",
                        lineNumber: 52,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Qarshiyev/src/components/intro/IntroLogoSvg.tsx",
                lineNumber: 26,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                className: "intro-logo-group",
                opacity: "0",
                filter: "url(#logoShadow)",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "100",
                        cy: "100",
                        r: "94",
                        fill: "none",
                        stroke: "url(#rimGrad)",
                        strokeWidth: "2",
                        className: "intro-logo-rim"
                    }, void 0, false, {
                        fileName: "[project]/Qarshiyev/src/components/intro/IntroLogoSvg.tsx",
                        lineNumber: 59,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "100",
                        cy: "100",
                        r: "88",
                        fill: "url(#logoBgGrad)",
                        className: "intro-logo-body"
                    }, void 0, false, {
                        fileName: "[project]/Qarshiyev/src/components/intro/IntroLogoSvg.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        clipPath: "url(#logoCircleClip)",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                className: "intro-logo-swirl",
                                d: "M100 168 C62 168 38 136 43 100 C48 68 76 44 110 49 C132 52 148 66 152 82 C156 98 148 113 135 118 C123 123 108 116 105 102 C102 89 113 79 126 82 C139 85 149 100 146 116 C141 138 120 154 95 160 C85 163 78 170 82 177 C86 184 95 183 100 168 Z",
                                fill: "url(#swirlGrad)",
                                opacity: "0.92"
                            }, void 0, false, {
                                fileName: "[project]/Qarshiyev/src/components/intro/IntroLogoSvg.tsx",
                                lineNumber: 80,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M132 56 C147 63 157 80 154 98 C150 118 130 133 109 135",
                                fill: "none",
                                stroke: "white",
                                strokeWidth: "3",
                                strokeLinecap: "round",
                                opacity: "0.55"
                            }, void 0, false, {
                                fileName: "[project]/Qarshiyev/src/components/intro/IntroLogoSvg.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Qarshiyev/src/components/intro/IntroLogoSvg.tsx",
                        lineNumber: 79,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        className: "intro-light-sweep",
                        x: "-100",
                        y: "0",
                        width: "100",
                        height: "200",
                        fill: "url(#lightSweepGrad)",
                        opacity: "0"
                    }, void 0, false, {
                        fileName: "[project]/Qarshiyev/src/components/intro/IntroLogoSvg.tsx",
                        lineNumber: 97,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Qarshiyev/src/components/intro/IntroLogoSvg.tsx",
                lineNumber: 57,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Qarshiyev/src/components/intro/IntroLogoSvg.tsx",
        lineNumber: 17,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
IntroLogoSvg.displayName = 'IntroLogoSvg';
}),
"[project]/Qarshiyev/src/components/intro/IntroTypography.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IntroTypography",
    ()=>IntroTypography
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/components/intro/constants.ts [app-ssr] (ecmascript)");
;
;
;
const IntroTypography = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, style }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: className,
        style: {
            willChange: 'opacity, transform',
            ...style
        },
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "intro-brand-title font-serif text-center uppercase",
                style: {
                    fontSize: 'clamp(1.7rem, 4.6vw, 2.6rem)',
                    color: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_COLORS"].highlight,
                    letterSpacing: '0.42em',
                    fontWeight: 700,
                    marginRight: '-0.42em',
                    textShadow: '0 0 28px rgba(138,43,226,0.35)'
                },
                children: "QARSHIYEV"
            }, void 0, false, {
                fileName: "[project]/Qarshiyev/src/components/intro/IntroTypography.tsx",
                lineNumber: 25,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "intro-brand-subtitle font-sans text-center mt-4",
                style: {
                    fontSize: 'clamp(0.78rem, 2vw, 0.95rem)',
                    color: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_COLORS"].highlight,
                    opacity: 0.75,
                    letterSpacing: '0.34em',
                    fontWeight: 300,
                    marginRight: '-0.34em'
                },
                children: "Education Center"
            }, void 0, false, {
                fileName: "[project]/Qarshiyev/src/components/intro/IntroTypography.tsx",
                lineNumber: 39,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "intro-brand-tagline flex items-center justify-center gap-5 mt-7",
                style: {
                    fontSize: 'clamp(0.7rem, 1.6vw, 0.85rem)'
                },
                children: [
                    'Learn.',
                    'Create.',
                    'Lead.'
                ].map((word, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "intro-tag-word font-sans font-medium",
                        "data-index": i,
                        style: {
                            color: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_COLORS"].secondary,
                            letterSpacing: '0.16em',
                            opacity: 0,
                            willChange: 'opacity, transform'
                        },
                        children: word
                    }, word, false, {
                        fileName: "[project]/Qarshiyev/src/components/intro/IntroTypography.tsx",
                        lineNumber: 58,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/Qarshiyev/src/components/intro/IntroTypography.tsx",
                lineNumber: 53,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Qarshiyev/src/components/intro/IntroTypography.tsx",
        lineNumber: 19,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
IntroTypography.displayName = 'IntroTypography';
}),
"[project]/Qarshiyev/src/components/intro/IntroSoundEngine.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Procedural sound engine for the cinematic intro.
 * All sounds are synthesized via Web Audio API — no external audio files.
 * Volume is kept intentionally low for a premium, non-intrusive experience.
 */ __turbopack_context__.s([
    "IntroSoundEngine",
    ()=>IntroSoundEngine
]);
class IntroSoundEngine {
    ctx = null;
    masterGain = null;
    muted = false;
    initialized = false;
    activeNodes = [];
    /** Master volume */ MASTER_VOLUME = 0.8;
    get isMuted() {
        return this.muted;
    }
    /** Initialize audio context — must be called after user gesture or on first play attempt */ async init() {
        if (this.initialized || this.muted) return false;
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.value = this.MASTER_VOLUME;
            this.masterGain.connect(this.ctx.destination);
            if (this.ctx.state === 'suspended') {
                await this.ctx.resume();
            }
            this.initialized = true;
            return true;
        } catch  {
            this.muted = true;
            return false;
        }
    }
    setMuted(muted) {
        this.muted = muted;
        if (this.masterGain) {
            this.masterGain.gain.value = muted ? 0 : this.MASTER_VOLUME;
        }
    }
    toggleMute() {
        this.setMuted(!this.muted);
        return this.muted;
    }
    /** Play a named sound effect */ play(id) {
        if (this.muted || !this.ctx || !this.masterGain) return;
        switch(id){
            case 'ambient':
                this.playAmbient();
                break;
            case 'bassRise':
                this.playBassRise();
                break;
            case 'pulse':
                this.playPulse();
                break;
            case 'whoosh':
                this.playWhoosh();
                break;
            case 'shimmer':
                this.playShimmer();
                break;
            case 'logoComplete':
                this.playLogoComplete();
                break;
            case 'transition':
                this.playTransition();
                break;
        }
    }
    /** Soft ambient atmosphere — filtered noise bed */ playAmbient() {
        if (!this.ctx || !this.masterGain) return;
        const { ctx, masterGain } = this;
        const bufferSize = ctx.sampleRate * 3;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for(let i = 0; i < bufferSize; i++){
            data[i] = (Math.random() * 2 - 1) * 0.3;
        }
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 400;
        filter.Q.value = 0.5;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 1.5);
        source.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);
        source.start();
        this.activeNodes.push(source, filter, gain);
    }
    /** Deep cinematic bass that rises subtly */ playBassRise() {
        if (!this.ctx || !this.masterGain) return;
        const { ctx, masterGain } = this;
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(45, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 2.5);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 1.2);
        gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 3);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();
        osc.stop(ctx.currentTime + 3.5);
        this.activeNodes.push(osc, gain);
    }
    /** Light digital pulse when nodes connect */ playPulse() {
        if (!this.ctx || !this.masterGain) return;
        const { ctx, masterGain } = this;
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = 880;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
        this.activeNodes.push(osc, gain);
    }
    /** Gentle whoosh for transitions */ playWhoosh() {
        if (!this.ctx || !this.masterGain) return;
        const { ctx, masterGain } = this;
        const bufferSize = ctx.sampleRate * 0.6;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for(let i = 0; i < bufferSize; i++){
            data[i] = Math.random() * 2 - 1;
        }
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(200, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.5);
        filter.Q.value = 1;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);
        source.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);
        source.start();
        this.activeNodes.push(source, filter, gain);
    }
    /** Tiny shimmer sparkle */ playShimmer() {
        if (!this.ctx || !this.masterGain) return;
        const { ctx, masterGain } = this;
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = 2400;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
        this.activeNodes.push(osc, gain);
    }
    /** Logo completion — soft harmonic chime */ playLogoComplete() {
        if (!this.ctx || !this.masterGain) return;
        const { ctx, masterGain } = this;
        const frequencies = [
            523.25,
            659.25,
            783.99
        ];
        frequencies.forEach((freq, i)=>{
            const osc = ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = freq;
            const gain = ctx.createGain();
            const start = ctx.currentTime + i * 0.05;
            gain.gain.setValueAtTime(0, start);
            gain.gain.linearRampToValueAtTime(0.15, start + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, start + 0.6);
            osc.connect(gain);
            gain.connect(masterGain);
            osc.start(start);
            osc.stop(start + 0.6);
            this.activeNodes.push(osc, gain);
        });
    }
    /** Final transition whoosh */ playTransition() {
        this.playWhoosh();
    }
    /** Stop every currently playing node and tear down the audio context */ stopAll() {
        for (const node of this.activeNodes){
            try {
                if (node instanceof AudioBufferSourceNode || node instanceof OscillatorNode) {
                    node.stop();
                }
                node.disconnect();
            } catch  {
            /* node may already be stopped */ }
        }
        this.activeNodes = [];
        if (this.masterGain) {
            try {
                this.masterGain.disconnect();
            } catch  {
            /* silent */ }
            this.masterGain = null;
        }
        if (this.ctx && this.ctx.state !== 'closed') {
            this.ctx.close().catch(()=>{});
            this.ctx = null;
        }
        this.initialized = false;
    }
    /** Clean up all active audio nodes */ destroy() {
        this.stopAll();
    }
}
}),
"[project]/Qarshiyev/src/components/intro/useIntroTimeline.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIntroTimeline",
    ()=>useIntroTimeline
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/components/intro/constants.ts [app-ssr] (ecmascript)");
;
;
;
function useIntroTimeline({ refs, sound, onScene6Start, onComplete }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const { overlay, mask, stage, glow, orb, rings, logoSvg, logoContainer, typography } = refs;
        if (!overlay.current || !mask.current || !stage.current || !glow.current || !orb.current || !rings.current || !logoSvg.current || !logoContainer.current || !typography.current) {
            return;
        }
        let master = null;
        let floats = [];
        let ringTweens = [];
        const ctx = __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].context(()=>{
            const logoGroup = logoSvg.current.querySelector('.intro-logo-group');
            const lightSweep = logoSvg.current.querySelector('.intro-light-sweep');
            const tagWords = overlay.current.querySelectorAll('.intro-tag-word');
            const ringEls = rings.current.querySelectorAll('.intro-ring');
            const site = document.getElementById('site-reveal');
            // ── Initial states (pure black, nothing visible) ──
            // The mask layer is an opaque black element. A radial mask-image with a
            // negative transparent stop keeps it fully black at rest; growing the
            // transparent center carves a hole that reveals the site behind it.
            const fullyBlackMask = 'radial-gradient(circle at 50% 50%, transparent -10%, #050505 0%)';
            const setMask = (css)=>{
                mask.current.style.webkitMaskImage = css;
                mask.current.style.maskImage = css;
            };
            setMask(fullyBlackMask);
            // Center every element on the viewport (composes with GSAP x/y/scale)
            __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set([
                glow.current,
                orb.current,
                rings.current,
                logoContainer.current
            ], {
                xPercent: -50,
                yPercent: -50
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(typography.current, {
                xPercent: -50
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(glow.current, {
                scale: 0,
                opacity: 0
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(orb.current, {
                scale: 0.18,
                opacity: 0
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(rings.current, {
                scale: 0.55,
                opacity: 0
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(logoContainer.current, {
                scale: 0.55,
                opacity: 0
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(logoGroup, {
                opacity: 0
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(typography.current, {
                opacity: 0,
                y: 26
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(tagWords, {
                opacity: 0,
                y: 12
            });
            // Hidden site starts blurred + slightly scaled for the radial reveal
            if (site) {
                site.style.filter = 'blur(22px) brightness(0.5)';
                site.style.transform = 'scale(1.06)';
                site.style.transformOrigin = '50% 46%';
                site.style.willChange = 'filter, transform';
            }
            const tl = __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].timeline({
                onComplete,
                defaults: {
                    ease: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_EASE"].premium
                }
            });
            // ── 0.0s — hold on black ──
            tl.to({}, {
                duration: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_SCENES"].glowAppear
            });
            // ── 0.5s — a tiny purple light appears ──
            tl.add(()=>{
                sound.init().then((ok)=>{
                    if (ok) {
                        sound.play('ambient');
                        sound.play('bassRise');
                    }
                });
            }, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_SCENES"].glowAppear);
            tl.fromTo(glow.current, {
                scale: 0,
                opacity: 0
            }, {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                ease: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_EASE"].reveal
            }, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_SCENES"].glowAppear);
            // ── 1.2s — the light expands into a polished glass orb ──
            tl.to(glow.current, {
                scale: 2.6,
                opacity: 0,
                duration: 0.9,
                ease: 'power2.out'
            }, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_SCENES"].orbExpand);
            tl.fromTo(orb.current, {
                scale: 0.18,
                opacity: 0
            }, {
                scale: 1,
                opacity: 1,
                duration: 0.95,
                ease: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_EASE"].premium
            }, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_SCENES"].orbExpand);
            // Tiny floating motion — the emblem breathes gently
            floats.push(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to([
                orb.current,
                rings.current
            ], {
                y: -7,
                duration: 3.2,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1
            }));
            floats.push(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(logoContainer.current, {
                y: -7,
                duration: 3.2,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
                delay: 2.7
            }));
            // ── 2.0s — thin, slow light rings rotate around the orb ──
            tl.to(rings.current, {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_EASE"].premium
            }, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_SCENES"].ringsAppear);
            ringTweens = [
                __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(ringEls[0], {
                    rotation: 360,
                    duration: 26,
                    ease: 'none',
                    repeat: -1
                }),
                __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(ringEls[1], {
                    rotation: -360,
                    duration: 34,
                    ease: 'none',
                    repeat: -1
                }),
                __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(ringEls[2], {
                    rotation: 360,
                    duration: 44,
                    ease: 'none',
                    repeat: -1
                })
            ];
            // ── 2.7s — the orb fluidly morphs into the Qarshiyev emblem ──
            tl.to(orb.current, {
                scale: 0.9,
                opacity: 0,
                duration: 0.6,
                ease: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_EASE"].morph
            }, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_SCENES"].morphStart);
            tl.to(rings.current, {
                opacity: 0,
                scale: 1.15,
                duration: 0.5,
                ease: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_EASE"].morph
            }, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_SCENES"].morphStart);
            tl.to(logoContainer.current, {
                scale: 1,
                opacity: 1,
                duration: 0.6,
                ease: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_EASE"].morph,
                onStart: ()=>sound.play('logoComplete')
            }, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_SCENES"].morphStart);
            tl.to(logoGroup, {
                opacity: 1,
                duration: 0.5,
                ease: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_EASE"].reveal
            }, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_SCENES"].morphStart);
            // ── 3.3s — a light reflection slides across the emblem ──
            tl.to(lightSweep, {
                opacity: 1,
                attr: {
                    x: 300
                },
                duration: 0.8,
                ease: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_EASE"].soft,
                onComplete: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(lightSweep, {
                        opacity: 0,
                        attr: {
                            x: -100
                        }
                    })
            }, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_SCENES"].lightSweep);
            // ── 4.0s — the brand lockup fades in ──
            tl.fromTo(typography.current.querySelector('.intro-brand-title'), {
                opacity: 0,
                y: 18
            }, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_EASE"].reveal
            }, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_SCENES"].brandTitle);
            tl.fromTo(typography.current.querySelector('.intro-brand-subtitle'), {
                opacity: 0,
                y: 12
            }, {
                opacity: 0.75,
                y: 0,
                duration: 0.6,
                ease: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_EASE"].reveal
            }, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_SCENES"].brandSubtitle);
            tl.to(tagWords, {
                opacity: 1,
                y: 0,
                duration: 0.45,
                stagger: 0.18,
                ease: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_EASE"].reveal
            }, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_SCENES"].taglineStart);
            // ── 5.5s — radial blur reveal: the homepage emerges behind the emblem ──
            const revealProxy = {
                hole: -8
            };
            tl.to(revealProxy, {
                hole: 165,
                duration: 1.5,
                ease: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_EASE"].premium,
                onUpdate: ()=>{
                    const h = revealProxy.hole;
                    setMask(`radial-gradient(circle at 50% 50%, transparent ${h}%, #050505 ${h + 26}%)`);
                }
            }, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_SCENES"].revealStart);
            if (site) {
                const siteProxy = {
                    blur: 22,
                    bright: 0.5,
                    scale: 1.06
                };
                tl.to(siteProxy, {
                    blur: 0,
                    bright: 1,
                    scale: 1,
                    duration: 1.5,
                    ease: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_EASE"].premium,
                    onUpdate: ()=>{
                        site.style.filter = `blur(${siteProxy.blur}px) brightness(${siteProxy.bright})`;
                        site.style.transform = `scale(${siteProxy.scale})`;
                    },
                    onComplete: ()=>{
                        site.style.filter = '';
                        site.style.transform = '';
                        site.style.willChange = '';
                    }
                }, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_SCENES"].revealStart);
            }
            // ── 6.0s — the emblem shrinks and flies into the navbar ──
            tl.to(typography.current, {
                opacity: 0,
                y: -16,
                duration: 0.4,
                ease: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_EASE"].premium
            }, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_SCENES"].flyToNav);
            tl.add(()=>{
                onScene6Start();
                sound.play('transition');
                floats.forEach((t)=>t.kill());
                ringTweens.forEach((t)=>t.kill());
                __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].killTweensOf(logoContainer.current);
            }, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_SCENES"].flyToNav);
            tl.add(()=>{
                const navLogo = document.getElementById('navbar-logo');
                if (!navLogo || !logoContainer.current) return;
                const navRect = navLogo.getBoundingClientRect();
                const box = logoContainer.current.getBoundingClientRect();
                const dx = navRect.left + navRect.width / 2 - (box.left + box.width / 2);
                const dy = navRect.top + navRect.height / 2 - (box.top + box.height / 2);
                const scale = __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NAVBAR_LOGO_SIZE"] / __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_LOGO_SIZE"];
                __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(logoContainer.current, {
                    x: dx,
                    y: dy,
                    scale,
                    duration: 0.7,
                    ease: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_EASE"].fly,
                    onComplete: ()=>{
                        __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(navLogo, {
                            opacity: 1
                        });
                        __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].set(logoContainer.current, {
                            opacity: 0
                        });
                    }
                });
            }, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_SCENES"].flyToNav + 0.05);
            // ── 6.7s — let the live site take over ──
            tl.to(overlay.current, {
                opacity: 0,
                duration: 0.35,
                ease: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_EASE"].reveal,
                onComplete: ()=>{
                    if (overlay.current) {
                        overlay.current.style.pointerEvents = 'none';
                        overlay.current.style.visibility = 'hidden';
                    }
                }
            }, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_SCENES"].overlayExit);
            master = tl;
        }, overlay);
        return ()=>{
            master?.kill();
            floats.forEach((t)=>t.kill());
            ringTweens.forEach((t)=>t.kill());
            ctx.revert();
        };
    }, [
        refs,
        sound,
        onScene6Start,
        onComplete
    ]);
}
}),
"[project]/Qarshiyev/src/components/intro/CinematicIntro.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CinematicIntro",
    ()=>CinematicIntro
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/lucide-react/dist/esm/icons/volume-2.mjs [app-ssr] (ecmascript) <export default as Volume2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__VolumeX$3e$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/lucide-react/dist/esm/icons/volume-x.mjs [app-ssr] (ecmascript) <export default as VolumeX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$context$2f$SmoothScrollProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/context/SmoothScrollProvider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$context$2f$IntroContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/context/IntroContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/constants/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$IntroLogoSvg$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/components/intro/IntroLogoSvg.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$IntroTypography$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/components/intro/IntroTypography.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$IntroSoundEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/components/intro/IntroSoundEngine.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$useIntroTimeline$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/components/intro/useIntroTimeline.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/components/intro/constants.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
const CinematicIntro = ()=>{
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const lenis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$context$2f$SmoothScrollProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLenis"])();
    const { shouldPlayIntro, startIntro, completeIntro, skipIntro } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$context$2f$IntroContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIntro"])();
    const overlayRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const maskRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const stageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const glowRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const orbRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ringsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const logoSvgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const logoContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const typographyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const soundRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    if (!soundRef.current) soundRef.current = new __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$IntroSoundEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IntroSoundEngine"]();
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMuted, setIsMuted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDone, setIsDone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const hasPlayedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const finishTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Always reference the latest Lenis instance for locking / unlocking
    const lenisRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(lenis);
    lenisRef.current = lenis;
    const isHome = pathname === __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$constants$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].HOME;
    const shouldRender = shouldPlayIntro && isHome;
    const refs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            overlay: overlayRef,
            mask: maskRef,
            stage: stageRef,
            glow: glowRef,
            orb: orbRef,
            rings: ringsRef,
            logoSvg: logoSvgRef,
            logoContainer: logoContainerRef,
            typography: typographyRef
        }), []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
            soundRef.current?.destroy();
            soundRef.current = null;
        };
    }, []);
    const unlockScroll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        document.body.style.overflow = '';
        document.documentElement.classList.remove('intro-active');
        document.documentElement.classList.remove('lenis-stopped');
        lenisRef.current?.start();
    }, []);
    const lockScroll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        document.body.style.overflow = 'hidden';
        document.documentElement.classList.add('intro-active');
        lenisRef.current?.stop();
    }, []);
    const finishIntro = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (finishTimerRef.current) {
            clearTimeout(finishTimerRef.current);
            finishTimerRef.current = null;
        }
        // Safety: clear any blur/scale left on the hidden site (e.g. on skip)
        const site = document.getElementById('site-reveal');
        if (site) {
            site.style.filter = '';
            site.style.transform = '';
            site.style.willChange = '';
        }
        setIsPlaying(false);
        setIsDone(true);
        unlockScroll();
        soundRef.current?.stopAll();
    }, [
        unlockScroll
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (shouldRender && !isPlaying && !hasPlayedRef.current) {
            const timer = requestAnimationFrame(()=>{
                hasPlayedRef.current = true;
                startIntro();
                setIsPlaying(true);
                lockScroll();
                finishTimerRef.current = window.setTimeout(finishIntro, (__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_TOTAL_DURATION"] + 3) * 1000);
            });
            return ()=>cancelAnimationFrame(timer);
        }
    }, [
        shouldRender,
        isPlaying,
        startIntro,
        lockScroll,
        finishIntro
    ]);
    const handleScene6Start = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        completeIntro();
    }, [
        completeIntro
    ]);
    const handleComplete = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        finishIntro();
    }, [
        finishIntro
    ]);
    const handleToggleMute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!soundRef.current) return;
        const muted = soundRef.current.toggleMute();
        setIsMuted(muted);
    }, []);
    const handleSkip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        skipIntro();
        finishIntro();
        if (overlayRef.current) {
            overlayRef.current.style.opacity = '0';
            overlayRef.current.style.pointerEvents = 'none';
            overlayRef.current.style.visibility = 'hidden';
        }
    }, [
        skipIntro,
        finishIntro
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isPlaying) return;
        const onKey = (e)=>{
            if (e.key === 'Escape') handleSkip();
        };
        window.addEventListener('keydown', onKey);
        return ()=>window.removeEventListener('keydown', onKey);
    }, [
        isPlaying,
        handleSkip
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$useIntroTimeline$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIntroTimeline"])({
        refs,
        sound: soundRef.current,
        onScene6Start: handleScene6Start,
        onComplete: handleComplete
    });
    if (isDone || !shouldRender && !isPlaying) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: overlayRef,
        className: "fixed inset-0 z-[9999]",
        style: {
            backgroundColor: 'transparent',
            pointerEvents: isPlaying ? 'auto' : 'none',
            willChange: 'opacity'
        },
        role: "presentation",
        "aria-hidden": !isPlaying,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: maskRef,
                className: "absolute inset-0",
                style: {
                    backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_COLORS"].background,
                    willChange: 'mask-image'
                }
            }, void 0, false, {
                fileName: "[project]/Qarshiyev/src/components/intro/CinematicIntro.tsx",
                lineNumber: 181,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: stageRef,
                className: "absolute inset-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: glowRef,
                        className: "absolute rounded-full pointer-events-none",
                        style: {
                            top: '50%',
                            left: '50%',
                            width: 8,
                            height: 8,
                            background: 'radial-gradient(circle, #ffffff 0%, #c9a7ff 40%, #8a2be2 70%, transparent 100%)',
                            boxShadow: '0 0 22px 6px rgba(138,43,226,0.55), 0 0 60px 18px rgba(138,43,226,0.28)',
                            willChange: 'transform, opacity'
                        }
                    }, void 0, false, {
                        fileName: "[project]/Qarshiyev/src/components/intro/CinematicIntro.tsx",
                        lineNumber: 190,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: orbRef,
                        className: "intro-orb absolute",
                        style: {
                            top: '50%',
                            left: '50%',
                            width: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_ORB_SIZE"],
                            height: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_ORB_SIZE"],
                            willChange: 'transform, opacity'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "intro-orb-glow"
                            }, void 0, false, {
                                fileName: "[project]/Qarshiyev/src/components/intro/CinematicIntro.tsx",
                                lineNumber: 218,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "intro-orb-body",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "intro-orb-liquid intro-orb-liquid-a"
                                    }, void 0, false, {
                                        fileName: "[project]/Qarshiyev/src/components/intro/CinematicIntro.tsx",
                                        lineNumber: 220,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "intro-orb-liquid intro-orb-liquid-b"
                                    }, void 0, false, {
                                        fileName: "[project]/Qarshiyev/src/components/intro/CinematicIntro.tsx",
                                        lineNumber: 221,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "intro-orb-shine"
                                    }, void 0, false, {
                                        fileName: "[project]/Qarshiyev/src/components/intro/CinematicIntro.tsx",
                                        lineNumber: 222,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "intro-orb-rim"
                                    }, void 0, false, {
                                        fileName: "[project]/Qarshiyev/src/components/intro/CinematicIntro.tsx",
                                        lineNumber: 223,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Qarshiyev/src/components/intro/CinematicIntro.tsx",
                                lineNumber: 219,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Qarshiyev/src/components/intro/CinematicIntro.tsx",
                        lineNumber: 207,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: ringsRef,
                        className: "intro-rings absolute",
                        style: {
                            top: '50%',
                            left: '50%',
                            width: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_ORB_SIZE"] * 1.85,
                            height: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_ORB_SIZE"] * 1.85,
                            willChange: 'transform, opacity'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "intro-ring intro-ring-1"
                            }, void 0, false, {
                                fileName: "[project]/Qarshiyev/src/components/intro/CinematicIntro.tsx",
                                lineNumber: 239,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "intro-ring intro-ring-2"
                            }, void 0, false, {
                                fileName: "[project]/Qarshiyev/src/components/intro/CinematicIntro.tsx",
                                lineNumber: 240,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "intro-ring intro-ring-3"
                            }, void 0, false, {
                                fileName: "[project]/Qarshiyev/src/components/intro/CinematicIntro.tsx",
                                lineNumber: 241,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Qarshiyev/src/components/intro/CinematicIntro.tsx",
                        lineNumber: 228,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: logoContainerRef,
                        className: "absolute flex items-center justify-center",
                        style: {
                            top: '50%',
                            left: '50%',
                            width: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_LOGO_SIZE"],
                            height: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_LOGO_SIZE"],
                            willChange: 'transform, opacity'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$IntroLogoSvg$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IntroLogoSvg"], {
                            ref: logoSvgRef,
                            style: {
                                width: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_LOGO_SIZE"],
                                height: __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTRO_LOGO_SIZE"]
                            }
                        }, void 0, false, {
                            fileName: "[project]/Qarshiyev/src/components/intro/CinematicIntro.tsx",
                            lineNumber: 256,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Qarshiyev/src/components/intro/CinematicIntro.tsx",
                        lineNumber: 245,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$IntroTypography$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IntroTypography"], {
                        ref: typographyRef,
                        className: "absolute text-center px-6",
                        style: {
                            top: 'calc(50% + 104px)',
                            left: '50%',
                            width: 'min(90vw, 380px)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/Qarshiyev/src/components/intro/CinematicIntro.tsx",
                        lineNumber: 262,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Qarshiyev/src/components/intro/CinematicIntro.tsx",
                lineNumber: 188,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: handleToggleMute,
                className: "absolute top-6 right-6 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.04] hover:bg-white/[0.09] transition-colors duration-300",
                "aria-label": isMuted ? 'Unmute intro sounds' : 'Mute intro sounds',
                title: isMuted ? 'Unmute' : 'Mute',
                children: isMuted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__VolumeX$3e$__["VolumeX"], {
                    size: 16,
                    className: "text-white/40"
                }, void 0, false, {
                    fileName: "[project]/Qarshiyev/src/components/intro/CinematicIntro.tsx",
                    lineNumber: 278,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__["Volume2"], {
                    size: 16,
                    className: "text-white/40"
                }, void 0, false, {
                    fileName: "[project]/Qarshiyev/src/components/intro/CinematicIntro.tsx",
                    lineNumber: 280,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Qarshiyev/src/components/intro/CinematicIntro.tsx",
                lineNumber: 270,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: handleSkip,
                className: "absolute bottom-6 right-6 z-10 text-[11px] font-sans tracking-[0.25em] uppercase text-white/25 hover:text-white/50 transition-colors duration-300",
                "aria-label": "Skip introduction",
                children: "Skip"
            }, void 0, false, {
                fileName: "[project]/Qarshiyev/src/components/intro/CinematicIntro.tsx",
                lineNumber: 285,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Qarshiyev/src/components/intro/CinematicIntro.tsx",
        lineNumber: 169,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/Qarshiyev/src/components/intro/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$CinematicIntro$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/components/intro/CinematicIntro.tsx [app-ssr] (ecmascript)");
;
;
}),
"[project]/Qarshiyev/src/app/(public)/layout.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PublicLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$layout$2f$Navbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/components/layout/Navbar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$layout$2f$Footer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/components/layout/Footer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$layout$2f$FloatingButtons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/components/layout/FloatingButtons.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$assistant$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/components/assistant/index.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Qarshiyev/src/components/intro/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$CinematicIntro$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Qarshiyev/src/components/intro/CinematicIntro.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function PublicLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col min-h-screen",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$intro$2f$CinematicIntro$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CinematicIntro"], {}, void 0, false, {
                fileName: "[project]/Qarshiyev/src/app/(public)/layout.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$layout$2f$Navbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Navbar"], {}, void 0, false, {
                fileName: "[project]/Qarshiyev/src/app/(public)/layout.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "site-reveal",
                className: "flex-grow",
                children: children
            }, void 0, false, {
                fileName: "[project]/Qarshiyev/src/app/(public)/layout.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$layout$2f$Footer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Footer"], {}, void 0, false, {
                fileName: "[project]/Qarshiyev/src/app/(public)/layout.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$layout$2f$FloatingButtons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FloatingButtons"], {}, void 0, false, {
                fileName: "[project]/Qarshiyev/src/app/(public)/layout.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Qarshiyev$2f$src$2f$components$2f$assistant$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Assistant"], {}, void 0, false, {
                fileName: "[project]/Qarshiyev/src/app/(public)/layout.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Qarshiyev/src/app/(public)/layout.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=Qarshiyev_src_17r0k4g._.js.map