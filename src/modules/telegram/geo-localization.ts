/**
 * src/modules/telegram/geo-localization.ts
 * Localized geographic names for regions and districts.
 *
 * All data uses canonical Uzbek IDs for internal storage and database operations.
 * Translated names are returned for display only — never stored.
 *
 * Usage:
 *   import { getRegionName, getDistrictName } from './geo-localization';
 *   getRegionName('toshkent', 'ru')     // → "Ташкент"
 *   getDistrictName('chilonzor', 'ru')  // → "Чиланзар"
 */

// ── Types ──────────────────────────────────────────────────────────
export type LangCode = 'uz' | 'ru' | 'en';

// ── Region Localization Map ────────────────────────────────────────
// Key is the canonical (Uzbek) region name.
// Each entry has translations in all supported languages.
const REGION_TRANSLATIONS: Record<string, Record<LangCode, string>> = {
  toshkent: {
    uz: 'Toshkent',
    ru: 'Ташкент',
    en: 'Tashkent',
  },
  samarqand: {
    uz: 'Samarqand',
    ru: 'Самарканд',
    en: 'Samarkand',
  },
  buxoro: {
    uz: 'Buxoro',
    ru: 'Бухара',
    en: 'Bukhara',
  },
  qashqadaryo: {
    uz: 'Qashqadaryo',
    ru: 'Кашкадарья',
    en: 'Kashkadarya',
  },
  surxondaryo: {
    uz: 'Surxondaryo',
    ru: 'Сурхандарья',
    en: 'Surkhandarya',
  },
  andijon: {
    uz: 'Andijon',
    ru: 'Андижан',
    en: 'Andijan',
  },
  namangan: {
    uz: 'Namangan',
    ru: 'Наманган',
    en: 'Namangan',
  },
  fargona: {
    uz: "Farg'ona",
    ru: 'Фергана',
    en: 'Fergana',
  },
  jizzax: {
    uz: 'Jizzax',
    ru: 'Джизак',
    en: 'Jizzakh',
  },
  navoiy: {
    uz: 'Navoiy',
    ru: 'Навои',
    en: 'Navoi',
  },
  xorazm: {
    uz: 'Xorazm',
    ru: 'Хорезм',
    en: 'Khorezm',
  },
  sirdaryo: {
    uz: 'Sirdaryo',
    ru: 'Сырдарья',
    en: 'Syr Darya',
  },
  qoraqalpogiston: {
    uz: "Qoraqalpog'iston",
    ru: 'Каракалпакстан',
    en: 'Karakalpakstan',
  },
};

// ── District Localization Map ──────────────────────────────────────
// Key is the canonical district ID.
const DISTRICT_TRANSLATIONS: Record<string, Record<LangCode, string>> = {
  // Toshkent
  chilonzor: {
    uz: 'Chilonzor',
    ru: 'Чиланзар',
    en: 'Chilonzor',
  },
  sergeli: {
    uz: 'Sergeli',
    ru: 'Сергели',
    en: 'Sergeli',
  },
  'mirzo-ulugbek': {
    uz: "Mirzo Ulug'bek",
    ru: 'Мирзо Улугбек',
    en: 'Mirzo Ulugbek',
  },
  yunusobod: {
    uz: 'Yunusobod',
    ru: 'Юнусабад',
    en: 'Yunusabad',
  },
  // Samarqand
  ishtixon: {
    uz: 'Ishtixon',
    ru: 'Иштыхан',
    en: 'Ishtikhon',
  },
  kattakurgon: {
    uz: 'Kattakurgon',
    ru: 'Каттакурган',
    en: 'Kattakurgan',
  },
  'samarqand-shahar': {
    uz: 'Samarqand shahar',
    ru: 'город Самарканд',
    en: 'Samarkand City',
  },
  urgut: {
    uz: 'Urgut',
    ru: 'Ургут',
    en: 'Urgut',
  },
  // Buxoro
  'buxoro-shahar': {
    uz: 'Buxoro shahar',
    ru: 'город Бухара',
    en: 'Bukhara City',
  },
  kogon: {
    uz: 'Kogon',
    ru: 'Каган',
    en: 'Kagan',
  },
  romitan: {
    uz: 'Romitan',
    ru: 'Ромитан',
    en: 'Romitan',
  },
  vobkent: {
    uz: 'Vobkent',
    ru: 'Вабкент',
    en: 'Vabkent',
  },
  // Qashqadaryo
  kitob: {
    uz: 'Kitob',
    ru: 'Китаб',
    en: 'Kitab',
  },
  koson: {
    uz: 'Koson',
    ru: 'Касан',
    en: 'Kasan',
  },
  qarshi: {
    uz: 'Qarshi',
    ru: 'Карши',
    en: 'Karshi',
  },
  shahrisabz: {
    uz: 'Shahrisabz',
    ru: 'Шахрисабз',
    en: 'Shakhrisabz',
  },
  // Surxondaryo
  boysun: {
    uz: 'Boysun',
    ru: 'Байсун',
    en: 'Boysun',
  },
  denov: {
    uz: 'Denov',
    ru: 'Денау',
    en: 'Denau',
  },
  sariosiyo: {
    uz: 'Sariosiyo',
    ru: 'Сариасия',
    en: 'Sariasiya',
  },
  termiz: {
    uz: 'Termiz',
    ru: 'Термез',
    en: 'Termez',
  },
  // Andijon
  'andijon-shahar': {
    uz: 'Andijon shahar',
    ru: 'город Андижан',
    en: 'Andijan City',
  },
  asaka: {
    uz: 'Asaka',
    ru: 'Асака',
    en: 'Asaka',
  },
  shahrixon: {
    uz: 'Shahrixon',
    ru: 'Шахрихан',
    en: 'Shahrikhan',
  },
  xonobod: {
    uz: 'Xonobod',
    ru: 'Ханабад',
    en: 'Khanabad',
  },
  // Namangan
  chust: {
    uz: 'Chust',
    ru: 'Чуст',
    en: 'Chust',
  },
  mingbuloq: {
    uz: 'Mingbuloq',
    ru: 'Мингбулак',
    en: 'Mingbulak',
  },
  'namangan-shahar': {
    uz: 'Namangan shahar',
    ru: 'город Наманган',
    en: 'Namangan City',
  },
  pop: {
    uz: 'Pop',
    ru: 'Пап',
    en: 'Pap',
  },
  // Farg'ona
  bgdod: {
    uz: "Bag'dod",
    ru: 'Багдад',
    en: 'Bagdad',
  },
  'fargona-shahar': {
    uz: "Farg'ona shahar",
    ru: 'город Фергана',
    en: 'Fergana City',
  },
  quva: {
    uz: 'Quva',
    ru: 'Кува',
    en: 'Kuva',
  },
  rishton: {
    uz: 'Rishton',
    ru: 'Риштан',
    en: 'Rishtan',
  },
  // Jizzax
  baxmal: {
    uz: 'Baxmal',
    ru: 'Бахмал',
    en: 'Bakhmel',
  },
  dustlik: {
    uz: 'Dustlik',
    ru: 'Дустлик',
    en: 'Dustlik',
  },
  'jizzax-shahar': {
    uz: 'Jizzax shahar',
    ru: 'город Джизак',
    en: 'Jizzakh City',
  },
  zomin: {
    uz: 'Zomin',
    ru: 'Заамин',
    en: 'Zamin',
  },
  // Navoiy
  'navoiy-shahar': {
    uz: 'Navoiy shahar',
    ru: 'город Навои',
    en: 'Navoi City',
  },
  nurota: {
    uz: 'Nurota',
    ru: 'Нурата',
    en: 'Nurata',
  },
  qiziltepa: {
    uz: 'Qiziltepa',
    ru: 'Кызылтепа',
    en: 'Kyzyltepa',
  },
  zarafshon: {
    uz: 'Zarafshon',
    ru: 'Зарафшан',
    en: 'Zarafshan',
  },
  // Xorazm
  bogot: {
    uz: "Bog'ot",
    ru: 'Багат',
    en: 'Bagat',
  },
  urganch: {
    uz: 'Urganch',
    ru: 'Ургенч',
    en: 'Urgench',
  },
  xiva: {
    uz: 'Xiva',
    ru: 'Хива',
    en: 'Khiva',
  },
  yangibozor: {
    uz: 'Yangibozor',
    ru: 'Янгибазар',
    en: 'Yangibazar',
  },
  // Sirdaryo
  guliston: {
    uz: 'Guliston',
    ru: 'Гулистан',
    en: 'Gulistan',
  },
  oqoltin: {
    uz: 'Oqoltin',
    ru: 'Акалтын',
    en: 'Akaltyn',
  },
  'sirdaryo-shahar': {
    uz: 'Sirdaryo shahar',
    ru: 'город Сырдарья',
    en: 'Syr Darya City',
  },
  yangiyer: {
    uz: 'Yangiyer',
    ru: 'Янгиер',
    en: 'Yangiyer',
  },
  // Qoraqalpog'iston
  moynoq: {
    uz: "Mo'ynoq",
    ru: 'Муйнак',
    en: 'Muynak',
  },
  nukus: {
    uz: 'Nukus',
    ru: 'Нукус',
    en: 'Nukus',
  },
};

// ── Helpers ─────────────────────────────────────────────────────────

/**
 * Returns the translated name for a region.
 * Falls back to canonical Uzbek name if translation not found.
 * @param regionId - Canonical region ID (e.g. 'toshkent')
 * @param lang - Target language code
 * @returns Translated region name for display
 */
export function getRegionName(regionId: string, lang?: string): string {
  const canonical = REGION_TRANSLATIONS[regionId]?.uz || regionId;
  if (!lang || lang === 'uz') return canonical;
  const langKey = (lang === 'ru' || lang === 'en') ? lang as LangCode : 'uz';
  return REGION_TRANSLATIONS[regionId]?.[langKey] || canonical;
}

/**
 * Returns the translated name for a district.
 * Falls back to canonical Uzbek name if translation not found.
 * @param districtId - Canonical district ID (e.g. 'chilonzor')
 * @param lang - Target language code
 * @returns Translated district name for display
 */
export function getDistrictName(districtId: string, lang?: string): string {
  const canonical = DISTRICT_TRANSLATIONS[districtId]?.uz || districtId;
  if (!lang || lang === 'uz') return canonical;
  const langKey = (lang === 'ru' || lang === 'en') ? lang as LangCode : 'uz';
  return DISTRICT_TRANSLATIONS[districtId]?.[langKey] || canonical;
}

/**
 * Returns the canonical (Uzbek) name for a region.
 * Use this for database operations, filtering, and searching.
 */
export function getCanonicalRegionName(regionId: string): string {
  return REGION_TRANSLATIONS[regionId]?.uz || regionId;
}

/**
 * Returns the canonical (Uzbek) name for a district.
 * Use this for database operations, filtering, and searching.
 */
export function getCanonicalDistrictName(districtId: string): string {
  return DISTRICT_TRANSLATIONS[districtId]?.uz || districtId;
}

/**
 * Maps region items to display-ready format with translated names.
 * The canonical ID is preserved for internal use.
 */
export function mapRegionsForDisplay(
  regions: Array<{ id: string; name: string }>,
  lang?: string
): Array<{ id: string; name: string; displayName: string }> {
  return regions.map((r) => ({
    id: r.id,
    name: r.name,
    displayName: getRegionName(r.id, lang),
  }));
}

/**
 * Maps district items to display-ready format with translated names.
 * The canonical ID is preserved for internal use.
 */
export function mapDistrictsForDisplay(
  districts: Array<{ id: string; name: string; regionId: string }>,
  lang?: string
): Array<{ id: string; name: string; regionId: string; displayName: string }> {
  return districts.map((d) => ({
    id: d.id,
    name: d.name,
    regionId: d.regionId,
    displayName: getDistrictName(d.id, lang),
  }));
}
