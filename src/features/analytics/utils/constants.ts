import { type AnalyticsFilters, type DateRangePreset } from '../types';

// ============================================================
// Date Range Presets
// ============================================================
// TODO: Add more presets (e.g., "Last 30 days", "This quarter")

export const DATE_RANGE_PRESETS: DateRangePreset[] = [
  {
    label: 'Bugun',
    value: 'today',
    start: new Date(new Date().setHours(0, 0, 0, 0)),
    end: new Date(new Date().setHours(23, 59, 59, 999)),
  },
  {
    label: 'Bu hafta',
    value: 'week',
    start: new Date(new Date().setDate(new Date().getDate() - new Date().getDay())),
    end: new Date(),
  },
  {
    label: 'Bu oy',
    value: 'month',
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    end: new Date(),
  },
  {
    label: 'Oxirgi 7 kun',
    value: 'last7days',
    start: new Date(new Date().setDate(new Date().getDate() - 7)),
    end: new Date(),
  },
  {
    label: 'Oxirgi 30 kun',
    value: 'last30days',
    start: new Date(new Date().setDate(new Date().getDate() - 30)),
    end: new Date(),
  },
];

// ============================================================
// Default Filters
// ============================================================
// TODO: Load default filters from localStorage or user preferences

export const DEFAULT_FILTERS: AnalyticsFilters = {
  dateRange: {
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
  },
};

// ============================================================
// Filter Options
// ============================================================
// TODO: Fetch these from API based on available data

export const FILTER_OPTIONS = {
  courses: [
    { value: 'all', label: 'Barcha Kurslar' },
    { value: 'ielts', label: 'IELTS' },
    { value: 'toefl', label: 'TOEFL' },
    { value: 'english', label: 'English' },
    { value: 'math', label: 'Math' },
    { value: 'programming', label: 'Programming' },
  ],
  regions: [
    { value: 'all', label: 'Barcha Viloyatlar' },
    { value: 'tashkent', label: 'Toshkent' },
    { value: 'samarkand', label: 'Samarqand' },
    { value: 'bukhara', label: 'Buxoro' },
    { value: 'khorezm', label: 'Xorazm' },
    { value: 'kashkadarya', label: 'Qashqadaryo' },
    { value: 'fergana', label: "Farg'ona" },
    { value: 'andijan', label: 'Andijon' },
    { value: 'namangan', label: 'Namangan' },
    { value: 'sirdarya', label: 'Sirdaryo' },
    { value: 'jizzakh', label: 'Jizzax' },
    { value: 'navoi', label: 'Navoiy' },
    { value: 'karakalpakstan', label: "Qoraqalpog'iston" },
  ],
  districts: {
    tashkent: [
      { value: 'all', label: 'Barcha Tumanlar' },
      { value: 'uychi', label: "Uchtepa" },
      { value: 'yunusabad', label: 'Yunusabad' },
      { value: 'mirzo-ulugbek', label: 'Mirzo Ulug‘bek' },
    ],
    samarkand: [
      { value: 'all', label: 'Barcha Tumanlar' },
      { value: 'samarkand-city', label: 'Samarqand shahar' },
      { value: 'urgut', label: "Urgut" },
    ],
  },
  teachers: [
    { value: 'all', label: 'Barcha O‘qituvchilar' },
  ],
  statuses: [
    { value: 'all', label: 'Barcha Holatlar' },
    { value: 'pending', label: 'Kutilmoqda' },
    { value: 'accepted', label: 'Qabul qilindi' },
    { value: 'rejected', label: 'Rad etildi' },
    { value: 'active', label: 'Faol' },
  ],
  languages: [
    { value: 'all', label: 'Barcha Tillar' },
    { value: 'uz', label: 'O‘zbek' },
    { value: 'en', label: 'Ingliz' },
    { value: 'ru', label: 'Rus' },
  ],
};

// ============================================================
// Chart Colors
// ============================================================
// TODO: Move to theme config for dynamic theming

export const CHART_COLORS = {
  primary: '#7C3AED',
  secondary: '#A78BFA',
  tertiary: '#C4B5FD',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#3B82F6',
  slate: '#64748B',
  palette: ['#7C3AED', '#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6', '#EC4899', '#14B8A6'],
} as const;
