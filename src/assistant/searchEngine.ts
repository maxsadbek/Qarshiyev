import Fuse from 'fuse.js';
import { searchDocs } from './knowledgeBase';
import type {
  KnowledgeAnswer,
  KnowledgeCategory,
  SearchDoc,
  SearchResult,
} from './types';

export const CONFIDENCE_THRESHOLD = 0.75;

const fuseOptions: import('fuse.js').IFuseOptions<SearchDoc> = {
  includeScore: true,
  includeMatches: true,
  ignoreLocation: true,
  threshold: 0.5,
  minMatchCharLength: 2,
  keys: [
    { name: 'title', weight: 0.35 },
    { name: 'keywords', weight: 0.4 },
    { name: 'content', weight: 0.25 },
  ],
};

const fuse = new Fuse(searchDocs, fuseOptions);

// Lightweight Uzbek/English stopword removal for semantic-ish normalization.
const STOPWORDS = new Set([
  'qanday', 'nima', 'nimasi', 'qayerda', 'qanaqa', 'nechta', 'necha', 'bor',
  'yoq', 'haqida', 'haq', 'uchun', 'bilan', 'va', 'the', 'a', 'an', 'is', 'are',
  'do', 'does', 'what', 'where', 'how', 'much', 'many', 'can', 'i', 'you', 'to',
  'of', 'in', 'on', 'at', 'men', 'menga', 'kerak', 'xoxlaysan', 'mumkin',
]);

function normalize(query: string): string {
  return query
    .toLowerCase()
    .replace(/[?.,!;:'"()]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOPWORDS.has(w))
    .join(' ');
}

// Boost when the query explicitly mentions a known category/topic.
const CATEGORY_HINTS: { hint: string[]; category: KnowledgeCategory }[] = [
  { hint: ['narx', 'price', 'pul', 'tolov', 'tuit', 'tuition', 'chegirma', 'qancha'], category: 'pricing' },
  { hint: ['kurs', 'course', 'dastur', 'oqish', 'o\'qish'], category: 'courses' },
  { hint: ['jadval', 'schedule', 'vaqt', 'dars', 'bugun', 'online', 'onlayn'], category: 'schedule' },
  { hint: ['kontakt', 'contact', 'telefon', 'phone', 'email', 'manzil', 'address', 'telegram'], category: 'contacts' },
  { hint: ['qabul', 'admission', 'ro\'yxat', 'register', 'registratsiya', 'ariza', 'boshlash'], category: 'admission' },
  { hint: ['filial', 'branch', 'joy', 'shahar'], category: 'branches' },
  { hint: ['oqituvchi', 'teacher', 'ustoz'], category: 'teachers' },
  { hint: ['sertifikat', 'certificate', 'guvohnoma'], category: 'faq' },
  { hint: ['yangilik', 'news', 'tadbir', 'event'], category: 'news' },
];

function detectCategoryHint(query: string): KnowledgeCategory | null {
  const q = query.toLowerCase();
  for (const { hint, category } of CATEGORY_HINTS) {
    if (hint.some((h) => q.includes(h))) return category;
  }
  return null;
}

/**
 * Hybrid search: fuzzy (Fuse.js) + lightweight keyword overlap scoring.
 * Returns ranked results with a normalized 0–1 confidence.
 */
export function searchKnowledge(query: string): SearchResult[] {
  const normalized = normalize(query);
  if (!normalized.trim()) return [];

  const fuseResults = fuse.search(normalized);
  const hint = detectCategoryHint(query);

  const scored: SearchResult[] = fuseResults
    .map((r) => {
      const baseScore = 1 - (r.score ?? 1); // Fuse: 0 perfect, 1 none

      // Keyword-overlap bonus
      const qWords = new Set(normalized.split(' '));
      const overlap = r.item.keywords.filter((k) =>
        qWords.has(k.toLowerCase()) || normalized.includes(k.toLowerCase())
      ).length;
      const keywordBonus = Math.min(overlap * 0.08, 0.24);

      // Category hint bonus
      const categoryBonus = hint && r.item.category === hint ? 0.12 : 0;

      const score = baseScore + keywordBonus + categoryBonus;
      const confidence = Math.max(0, Math.min(1, score));
      return { doc: r.item, score, confidence };
    })
    .filter((r) => r.confidence > 0.25)
    .sort((a, b) => b.confidence - a.confidence);

  return scored;
}

/**
 * Resolve a confident answer from the knowledge base.
 * confidence > 0.75 → instant answer. Otherwise caller falls back to LLM.
 */
export function resolveFromKnowledge(query: string): KnowledgeAnswer {
  const results = searchKnowledge(query);

  if (results.length === 0) {
    return { matched: false, confidence: 0, content: '' };
  }

  const best = results[0];

  if (best.confidence >= CONFIDENCE_THRESHOLD) {
    return {
      matched: true,
      confidence: best.confidence,
      content: best.doc.content,
      category: best.doc.category,
      source: best.doc.source,
      relatedDocs: results.slice(0, 3).map((r) => r.doc),
    };
  }

  // Low confidence — return best context so the LLM can use it if needed.
  return {
    matched: false,
    confidence: best.confidence,
    content: best.doc.content,
    category: best.doc.category,
    source: best.doc.source,
    relatedDocs: results.slice(0, 3).map((r) => r.doc),
  };
}

export function getContextForLLM(): string {
  return JSON.stringify({
    school: {
      name: 'Qarshiyev School',
      address: 'Nuriston, Qashqadaryo Region, Uzbekistan',
      contacts: searchDocs.find((d) => d.category === 'contacts')?.content,
    },
  });
}

