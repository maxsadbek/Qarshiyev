import { getFallbackMessage, streamLLM } from './llm';
import { resolveFromKnowledge } from './searchEngine';
import type { ChatMessage, QuickReply } from './types';

export const SUGGESTED_QUESTIONS: QuickReply[] = [
  { label: 'Courses', value: 'Courses' },
  { label: 'Tuition Fees', value: 'Tuition Fees' },
  { label: 'Admission', value: 'Admission' },
  { label: 'Teachers', value: 'Teachers' },
  { label: 'Contact', value: 'Contact' },
];

export function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 6) return 'Xayrli tun';
  if (h < 12) return 'Xayrli tong';
  if (h < 18) return 'Xayrli kun';
  return 'Xayrli kech';
}

export function greetingMessage(): ChatMessage {
  const greet = getGreeting();
  return {
    id: 'greeting',
    role: 'assistant',
    content: `${greet}! 👋 **Qarshiyev School**ga xush kelibsiz.\n\nQanday yordam bera olaman? Kurslar, narxlar, qabul jarayoni yoki dars jadvali bo'yicha savollaringizni bering.`,
    timestamp: Date.now(),
    source: 'knowledge-base',
  };
}

export const WELCOME_MESSAGE = `${getGreeting()}! 👋 **Qarshiyev School**ga xush kelibsiz.\n\nQanday yordam bera olaman?`;

export const EN_GREETING =
  "👋 Hi! I'm your AI School Assistant.\n\nAsk me anything about **Qarshiyev School** — courses, tuition, admission, schedules, or branches.";

/**
 * Orchestrates the hybrid response: KB first (instant), else LLM stream.
 * Returns the assistant message id; caller feeds streamed tokens into it.
 */
export async function* generateResponse(
  query: string,
  history: ChatMessage[],
  signal?: AbortSignal
): AsyncGenerator<{ kind: 'source'; source: ChatMessage['source']; confidence?: number } | { kind: 'token'; token: string }, void, unknown> {
  const kbAnswer = resolveFromKnowledge(query);

  if (kbAnswer.matched) {
    yield { kind: 'source', source: 'knowledge-base', confidence: kbAnswer.confidence };
    // Simulate a small, premium "typing" delay for instantaneous KB answers.
    await new Promise((r) => setTimeout(r, 350));
    yield { kind: 'token', token: kbAnswer.content };
    return;
  }

  // Fallback to LLM with school context.
  const llmHistory = history
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .map((m) => ({ role: m.role, content: m.content })) as {
    role: 'user' | 'assistant';
    content: string;
  }[];

  let any = false;
  for await (const token of streamLLM(llmHistory, query, signal)) {
    any = true;
    yield { kind: 'token', token };
  }
  // If LLM produced nothing (disabled / error handled internally), use fallback.
  if (!any) {
    yield { kind: 'source', source: 'fallback' };
    yield { kind: 'token', token: getFallbackMessage() };
  }
}

