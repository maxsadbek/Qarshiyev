export const ROUTES = {
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
} as const;

export const NAV_ITEMS = [
  { label: 'Bosh Sahifa', href: ROUTES.HOME },
  { label: 'Biz Haqimizda', href: ROUTES.ABOUT },
  { label: 'Kurslar', href: ROUTES.COURSES },
  { label: 'O\'qituvchilar', href: ROUTES.TEACHERS },
  { label: 'Galereya', href: ROUTES.GALLERY },
  { label: 'O\'quvchi Natijalari', href: ROUTES.RESULTS },
  { label: 'Tadbirlar', href: ROUTES.EVENTS },
  { label: 'Blog', href: ROUTES.BLOG },
  { label: 'Savollar', href: ROUTES.FAQ },
];

export const CONTACT_INFO = {
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
    { day: 'Dushanba – Juma', hours: '08:00 – 21:00' },
    { day: 'Shanba', hours: '09:00 – 18:00' },
    { day: 'Yakshanba', hours: 'Yopiq' },
  ],
};

export const ANIMATION_VARIANTS = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  },
  staggerContainer: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  },
};
