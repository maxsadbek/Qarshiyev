// ============================================================
// ASSISTANT TYPES — Hybrid AI Assistant
// ============================================================

export type KnowledgeCategory =
  | 'school'
  | 'courses'
  | 'pricing'
  | 'faq'
  | 'contacts'
  | 'schedule'
  | 'branches'
  | 'teachers'
  | 'news'
  | 'admission';

export interface SchoolInfo {
  name: string;
  legalName: string;
  tagline: string;
  founded: number;
  description: string;
  mission: string;
  values: string[];
  ageGroups: { group: string; range: string }[];
  successRate: number;
  branches: number;
  teachersCount: number;
  studentsCount: number;
}

export interface KBCourse {
  id: string;
  title: string;
  category: string;
  level: string;
  duration: string;
  lessons: number;
  price: number;
  discountPrice?: number;
  schedule: string;
  language: string;
  certificate: boolean;
  shortDescription: string;
  description: string;
  tags: string[];
}

export interface KBPrice {
  id: string;
  courseTitle: string;
  category: string;
  price: number;
  discountPrice?: number;
  currency: string;
  period: string;
  installments: boolean;
  earlyBirdDiscount: number;
  paymentMethods: string[];
  refundPolicy: string;
  notes: string;
}

export interface KBFAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
}

export interface KBContacts {
  phone: string;
  phone2: string;
  email: string;
  email2: string;
  telegram: string;
  instagram: string;
  facebook: string;
  youtube: string;
  address: string;
  workingHours: { day: string; hours: string }[];
  admissionEmail: string;
  supportEmail: string;
}

export interface KBSchedule {
  timezone: string;
  weekdays: { day: string; hours: string }[];
  slots: { period: string; time: string }[];
  onlineAvailable: boolean;
  today: {
    date: string;
    lessons: { course: string; time: string; room: string; type: string }[];
  };
}

export interface KBBranch {
  id: string;
  name: string;
  city: string;
  region: string;
  address: string;
  phone: string;
  isMain: boolean;
  facilities: string[];
  hours: string;
}

export interface KBTeacher {
  id: string;
  name: string;
  title: string;
  specialization: string[];
  experience: number;
  rating: number;
  bio: string;
  languages: string[];
}

export interface KBNewsItem {
  id: string;
  type: 'event' | 'news';
  title: string;
  date: string;
  summary: string;
  category: string;
}

export interface KBAdmission {
  steps: { step: number; title: string; description: string }[];
  requirements: string[];
  freeConsultation: boolean;
  consultationDuration: string;
  startAnytime: string;
  contact: { admissionsEmail: string; phone: string; telegram: string };
}

export interface KnowledgeBase {
  school: SchoolInfo;
  courses: KBCourse[];
  pricing: KBPrice[];
  faq: KBFAQ[];
  contacts: KBContacts;
  schedule: KBSchedule;
  branches: KBBranch[];
  teachers: KBTeacher[];
  news: KBNewsItem[];
  admission: KBAdmission;
}

// ── Search / Engine ──

export interface SearchDoc {
  id: string;
  category: KnowledgeCategory;
  title: string;
  content: string;
  keywords: string[];
  source: string;
  raw?: unknown;
}

export interface SearchResult {
  doc: SearchDoc;
  score: number;
  confidence: number;
}

export type AnswerSource = 'knowledge-base' | 'llm' | 'fallback';

export interface KnowledgeAnswer {
  matched: boolean;
  confidence: number;
  content: string;
  category?: KnowledgeCategory;
  source?: string;
  relatedDocs?: SearchDoc[];
}

// ── LLM ──

export interface LLMConfig {
  apiKey: string;
  baseURL: string;
  model: string;
  temperature: number;
  maxTokens: number;
  enabled: boolean;
}

export interface LLMMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// ── Chat ──

export type MessageRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  source?: AnswerSource;
  confidence?: number;
  streaming?: boolean;
  error?: boolean;
}

export interface QuickReply {
  label: string;
  value: string;
}
