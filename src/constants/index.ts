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
  CONTACT: '/contact',
} as const;

export const NAV_ITEMS = [
  { label: 'Bosh Sahifa', href: ROUTES.HOME },
  { label: 'Biz Haqimizda', href: ROUTES.ABOUT },
  { label: 'Kurslar', href: ROUTES.COURSES },
  { label: 'O\'qituvchilar', href: ROUTES.TEACHERS },
  {
    label: 'Yana',
    href: '#',
    children: [
      { label: 'Galereya', href: ROUTES.GALLERY },
      { label: 'O\'quvchi Natijalari', href: ROUTES.RESULTS },
      { label: 'Tadbirlar', href: ROUTES.EVENTS },
      { label: 'Blog', href: ROUTES.BLOG },
      { label: 'Savollar', href: ROUTES.FAQ },
    ],
  },
  { label: 'Aloqa', href: ROUTES.CONTACT },
];

export const CONTACT_INFO = {
  phone: '+998 90 123 45 67',
  phone2: '+998 91 234 56 78',
  email: 'info@qarshiyev.uz',
  email2: 'admissions@qarshiyev.uz',
  telegram: 'https://t.me/qarshiyev_edu',
  instagram: 'https://instagram.com/qarshiyev_edu',
  facebook: 'https://facebook.com/qarshiyev_edu',
  youtube: 'https://youtube.com/@qarshiyev_edu',
  address: 'Qarshi, Kashkadarya Region, Uzbekistan',
  addressFull: '12 Amir Temur Street, Qarshi 180100, Kashkadarya, Uzbekistan',
  workingHours: [
    { day: 'Dushanba – Juma', hours: '08:00 – 21:00' },
    { day: 'Shanba', hours: '09:00 – 18:00' },
    { day: 'Yakshanba', hours: 'Yopiq' },
  ],
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12200.123456789!2d65.7956!3d38.8600!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDUxJzM2LjAiTiA2NcKwNDcnNDQuMiJF!5e0!3m2!1sen!2sus!4v1234567890',
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
