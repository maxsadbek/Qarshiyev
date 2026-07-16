import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { generateResponse, greetingMessage } from './controller';
import type { ChatMessage, MessageRole } from './types';

const STORAGE_KEY = 'qarshiyev_assistant_history';
const MAX_MEMORY = 20;

interface AssistantContextValue {
  isOpen: boolean;
  messages: ChatMessage[];
  isThinking: boolean;
  isStreaming: boolean;
  online: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  send: (text: string) => void;
  regenerate: () => void;
  clear: () => void;
  stop: () => void;
}

const AssistantContext = createContext<AssistantContextValue | null>(null);

function uid(): string {
  return `m_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function loadHistory(): ChatMessage[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ChatMessage[];
    if (Array.isArray(parsed) && parsed.length) return parsed;
  } catch {
    /* ignore */
  }
  return null;
}

export const AssistantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => loadHistory() ?? [greetingMessage()]);
  const [isThinking, setIsThinking] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const lastUserQuery = useRef<string>('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_MEMORY)));
    } catch {
      /* ignore quota */
    }
  }, [messages]);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsThinking(false);
    setIsStreaming(false);
    setMessages((prev) => prev.map((m) => ({ ...m, streaming: false })));
  }, []);

  const runAssistant = useCallback(async (userText: string) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const assistantId = uid();
    setMessages((prev) => [
      ...prev,
      {
        id: assistantId,
        role: 'assistant' as MessageRole,
        content: '',
        timestamp: Date.now(),
        streaming: true,
      },
    ]);
    setIsThinking(true);
    setIsStreaming(false);

    let source: ChatMessage['source'] = undefined;
    let confidence: number | undefined;

    try {
      for await (const evt of generateResponse(userText, messages, controller.signal)) {
        if (controller.signal.aborted) break;
        if (evt.kind === 'source') {
          source = evt.source;
          confidence = evt.confidence;
        } else if (evt.kind === 'token') {
          setIsThinking(false);
          setIsStreaming(true);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: m.content + evt.token } : m
            )
          );
        }
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: 'Kechirasiz, xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.', error: true, streaming: false }
            : m
        )
      );
    } finally {
      setIsThinking(false);
      setIsStreaming(false);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, streaming: false, source: source ?? m.source, confidence: confidence ?? m.confidence }
            : m
        )
      );
    }
  }, [messages]);

  const send = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isStreaming) return;
      lastUserQuery.current = trimmed;
      const userMsg: ChatMessage = {
        id: uid(),
        role: 'user',
        content: trimmed,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, userMsg]);
      void runAssistant(trimmed);
    },
    [isStreaming, runAssistant]
  );

  const regenerate = useCallback(() => {
    if (isStreaming) return;
    setMessages((prev) => {
      const withoutLast = [...prev];
      // Remove the last assistant message so it regenerates.
      if (withoutLast.length && withoutLast[withoutLast.length - 1].role === 'assistant') {
        withoutLast.pop();
      }
      return withoutLast;
    });
    if (lastUserQuery.current) void runAssistant(lastUserQuery.current);
  }, [isStreaming, runAssistant]);

  const clear = useCallback(() => {
    stop();
    setMessages([greetingMessage()]);
  }, [stop]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((o) => !o), []);

  const value = useMemo<AssistantContextValue>(
    () => ({
      isOpen,
      messages,
      isThinking,
      isStreaming,
      online: true,
      open,
      close,
      toggle,
      send,
      regenerate,
      clear,
      stop,
    }),
    [isOpen, messages, isThinking, isStreaming, open, close, toggle, send, regenerate, clear, stop]
  );

  return <AssistantContext.Provider value={value}>{children}</AssistantContext.Provider>;
};

export function useAssistant(): AssistantContextValue {
  const ctx = useContext(AssistantContext);
  if (!ctx) throw new Error('useAssistant must be used within AssistantProvider');
  return ctx;
}
