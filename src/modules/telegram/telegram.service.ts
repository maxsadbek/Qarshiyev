import { z } from 'zod';
import { logger } from '../../lib/security/logger';
import { applicationStore } from '../applications/store';

// ── Validation Schema ──────────────────────────────────────────────
export const RegistrationSchema = z.object({
  telegramId: z.string(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(9),
  districtId: z.string().min(1),
  courseId: z.string().min(1),
  shift: z.string(),
  age: z.number().min(5).max(100),
  experience: z.string(),
  device: z.string(),
  note: z.string().optional(),
});

export type RegistrationData = z.infer<typeof RegistrationSchema>;

// ── Interfaces ─────────────────────────────────────────────────────
export interface RegionItem {
  id: string;
  name: string;
}

export interface DistrictItem {
  id: string;
  name: string;
  regionId: string;
}

export interface CourseItem {
  id: string;
  title: string;
}

// ── Supported language codes for translations ───────────────────
type LangCode = 'uz' | 'ru' | 'en';

// ── Hardcoded Data ─────────────────────────────────────────────────

const REGIONS: RegionItem[] = [
  { id: 'toshkent', name: 'Toshkent' },
  { id: 'samarqand', name: 'Samarqand' },
  { id: 'buxoro', name: 'Buxoro' },
  { id: 'qashqadaryo', name: 'Qashqadaryo' },
  { id: 'surxondaryo', name: 'Surxondaryo' },
  { id: 'andijon', name: 'Andijon' },
  { id: 'namangan', name: 'Namangan' },
  { id: 'fargona', name: "Farg'ona" },
  { id: 'jizzax', name: 'Jizzax' },
  { id: 'navoiy', name: 'Navoiy' },
  { id: 'xorazm', name: 'Xorazm' },
  { id: 'sirdaryo', name: 'Sirdaryo' },
  { id: 'qoraqalpogiston', name: "Qoraqalpog'iston" },
];

const DISTRICTS: DistrictItem[] = [
  // Toshkent
  { id: 'chilonzor', name: 'Chilonzor', regionId: 'toshkent' },
  { id: 'sergeli', name: 'Sergeli', regionId: 'toshkent' },
  { id: 'mirzo-ulugbek', name: "Mirzo Ulug'bek", regionId: 'toshkent' },
  { id: 'yunusobod', name: 'Yunusobod', regionId: 'toshkent' },
  // Samarqand
  { id: 'ishtixon', name: 'Ishtixon', regionId: 'samarqand' },
  { id: 'kattakurgon', name: 'Kattakurgon', regionId: 'samarqand' },
  { id: 'samarqand-shahar', name: 'Samarqand shahar', regionId: 'samarqand' },
  { id: 'urgut', name: 'Urgut', regionId: 'samarqand' },
  // Buxoro
  { id: 'buxoro-shahar', name: 'Buxoro shahar', regionId: 'buxoro' },
  { id: 'kogon', name: 'Kogon', regionId: 'buxoro' },
  { id: 'romitan', name: 'Romitan', regionId: 'buxoro' },
  { id: 'vobkent', name: 'Vobkent', regionId: 'buxoro' },
  // Qashqadaryo
  { id: 'kitob', name: 'Kitob', regionId: 'qashqadaryo' },
  { id: 'koson', name: 'Koson', regionId: 'qashqadaryo' },
  { id: 'qarshi', name: 'Qarshi', regionId: 'qashqadaryo' },
  { id: 'shahrisabz', name: 'Shahrisabz', regionId: 'qashqadaryo' },
  // Surxondaryo
  { id: 'boysun', name: 'Boysun', regionId: 'surxondaryo' },
  { id: 'denov', name: 'Denov', regionId: 'surxondaryo' },
  { id: 'sariosiyo', name: 'Sariosiyo', regionId: 'surxondaryo' },
  { id: 'termiz', name: 'Termiz', regionId: 'surxondaryo' },
  // Andijon
  { id: 'andijon-shahar', name: 'Andijon shahar', regionId: 'andijon' },
  { id: 'asaka', name: 'Asaka', regionId: 'andijon' },
  { id: 'shahrixon', name: 'Shahrixon', regionId: 'andijon' },
  { id: 'xonobod', name: 'Xonobod', regionId: 'andijon' },
  // Namangan
  { id: 'chust', name: 'Chust', regionId: 'namangan' },
  { id: 'mingbuloq', name: 'Mingbuloq', regionId: 'namangan' },
  { id: 'namangan-shahar', name: 'Namangan shahar', regionId: 'namangan' },
  { id: 'pop', name: 'Pop', regionId: 'namangan' },
  // Farg'ona
  { id: 'bgdod', name: "Bag'dod", regionId: 'fargona' },
  { id: 'fargona-shahar', name: "Farg'ona shahar", regionId: 'fargona' },
  { id: 'quva', name: 'Quva', regionId: 'fargona' },
  { id: 'rishton', name: 'Rishton', regionId: 'fargona' },
  // Jizzax
  { id: 'baxmal', name: 'Baxmal', regionId: 'jizzax' },
  { id: 'dustlik', name: 'Dustlik', regionId: 'jizzax' },
  { id: 'jizzax-shahar', name: 'Jizzax shahar', regionId: 'jizzax' },
  { id: 'zomin', name: 'Zomin', regionId: 'jizzax' },
  // Navoiy
  { id: 'navoiy-shahar', name: 'Navoiy shahar', regionId: 'navoiy' },
  { id: 'nurota', name: 'Nurota', regionId: 'navoiy' },
  { id: 'qiziltepa', name: 'Qiziltepa', regionId: 'navoiy' },
  { id: 'zarafshon', name: 'Zarafshon', regionId: 'navoiy' },
  // Xorazm
  { id: 'bogot', name: "Bog'ot", regionId: 'xorazm' },
  { id: 'urganch', name: 'Urganch', regionId: 'xorazm' },
  { id: 'xiva', name: 'Xiva', regionId: 'xorazm' },
  { id: 'yangibozor', name: 'Yangibozor', regionId: 'xorazm' },
  // Sirdaryo
  { id: 'guliston', name: 'Guliston', regionId: 'sirdaryo' },
  { id: 'oqoltin', name: 'Oqoltin', regionId: 'sirdaryo' },
  { id: 'sirdaryo-shahar', name: 'Sirdaryo shahar', regionId: 'sirdaryo' },
  { id: 'yangiyer', name: 'Yangiyer', regionId: 'sirdaryo' },
  // Qoraqalpog'iston
  { id: 'moynoq', name: "Mo'ynoq", regionId: 'qoraqalpogiston' },
  { id: 'nukus', name: 'Nukus', regionId: 'qoraqalpogiston' },
];

// ── Canonical course names (Uzbek, stored in DB) ──────────────────
const COURSES: CourseItem[] = [
  { id: 'backend', title: 'Backend dasturlash (Python/Node.js)' },
  { id: 'grafik-dizayn', title: 'Grafik dizayn' },
  { id: 'ingliz-tili', title: 'Ingliz tili' },
  { id: 'mobile', title: 'Mobil dasturlash' },
  { id: 'smm', title: 'SMM / Marketing' },
  { id: 'web-dasturlash', title: 'Web dasturlash (Frontend)' },
];

// ── Translated course names per language ───────────────────────────
// Course buttons in the UI use these translations.
// The database always stores the canonical course ID.
// Admin messages display canonical Uzbek names for consistency.
const COURSE_TRANSLATIONS: Record<string, Record<LangCode, string>> = {
  'backend': {
    uz: '⚙️ Backend dasturlash (Python/Node.js)',
    ru: '⚙️ Бэкенд разработка (Python/Node.js)',
    en: '⚙️ Backend (Python/Node.js)',
  },
  'grafik-dizayn': {
    uz: '🎨 Grafik dizayn',
    ru: '🎨 Графический дизайн',
    en: '🎨 Graphic Design',
  },
  'ingliz-tili': {
    uz: '🇬🇧 Ingliz tili',
    ru: '🇬🇧 Английский язык',
    en: '🇬🇧 English Language',
  },
  'mobile': {
    uz: '📱 Mobil dasturlash',
    ru: '📱 Мобильная разработка',
    en: '📱 Mobile Development',
  },
  'smm': {
    uz: '📊 SMM / Marketing',
    ru: '📊 SMM / Маркетинг',
    en: '📊 SMM / Marketing',
  },
  'web-dasturlash': {
    uz: '🌐 Web dasturlash (Frontend)',
    ru: '🌐 Веб-разработка (Frontend)',
    en: '🌐 Web Development (Frontend)',
  },
};

// ── Service ────────────────────────────────────────────────────────
export class TelegramService {
  async getRegions(): Promise<RegionItem[]> {
    return REGIONS;
  }

  async getDistricts(regionId: string): Promise<DistrictItem[]> {
    return DISTRICTS.filter((d) => d.regionId === regionId);
  }

  async getAllDistricts(): Promise<DistrictItem[]> {
    return [...DISTRICTS];
  }

  async getDistrictById(id: string): Promise<DistrictItem | undefined> {
    return DISTRICTS.find((d) => d.id === id);
  }

  async getActiveCourses(): Promise<CourseItem[]> {
    return COURSES;
  }

  /**
   * Returns the translated title for a course.
   * Falls back to canonical Uzbek name if translation not found.
   * @param courseId - The canonical course ID
   * @param lang - User's language code ('uz', 'ru', 'en')
   * @returns Translated course title for UI, or canonical Uzbek name
   */
  getCourseTitle(courseId: string, lang?: string): string {
    const canonical = COURSES.find((c) => c.id === courseId)?.title || courseId;
    if (!lang || lang === 'uz') {
      return COURSE_TRANSLATIONS[courseId]?.uz || canonical;
    }
    const normalizedLang = (lang === 'ru' || lang === 'en') ? lang : 'uz';
    return COURSE_TRANSLATIONS[courseId]?.[normalizedLang] || canonical;
  }

  /**
   * Returns the canonical (Uzbek) course name for admin display.
   * This ensures admin panel always shows consistent values.
   */
  getCanonicalCourseTitle(courseId: string): string {
    return COURSES.find((c) => c.id === courseId)?.title || courseId;
  }

  /**
   * Logs the completed registration and saves to in-memory store.
   */
  async completeRegistration(data: RegistrationData) {
    logger.info('Telegram registration completed', {
      telegramId: data.telegramId,
      name: `${data.firstName} ${data.lastName}`,
      phone: data.phone,
      districtId: data.districtId,
      courseId: data.courseId,
      shift: data.shift,
      age: data.age,
    });

    // Save to in-memory store so it appears in the admin panel
    const application = applicationStore.create(data);

    return { id: application.id, status: application.status };
  }
}

export const telegramService = new TelegramService();
