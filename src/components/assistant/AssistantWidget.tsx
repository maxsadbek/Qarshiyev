import { memo, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Eraser, RefreshCw, Sparkles, X } from 'lucide-react';
import { useAssistant } from '@/assistant/AssistantContext';
import { SUGGESTED_QUESTIONS } from '@/assistant/controller';
import { cn } from '@/utils';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';

function useIsDark(): boolean {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.__assistantDark ?? window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => setDark(window.__assistantDark ?? mq.matches);
    mq.addEventListener('change', handler);
    const interval = setInterval(() => setDark(window.__assistantDark ?? mq.matches), 1000);
    return () => {
      mq.removeEventListener('change', handler);
      clearInterval(interval);
    };
  }, []);
  return dark;
}

const Header: React.FC<{ dark: boolean; onClose: () => void }> = ({ dark, onClose }) => (
  <div
    className={cn(
      'flex items-center gap-3 rounded-t-3xl px-4 py-3.5',
      dark ? 'bg-white/[0.06] border-b border-white/10' : 'bg-white/80 border-b border-slate-100'
    )}
  >
    <div className="assistant-avatar-glow relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow">
      <Sparkles size={18} />
      <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-400" />
    </div>
    <div className="flex-1">
      <p className={cn('text-sm font-semibold leading-tight', dark ? 'text-white' : 'text-slate-800')}>
        AI School Assistant
      </p>
      <p className={cn('text-[0.68rem] leading-tight', dark ? 'text-slate-300' : 'text-slate-500')}>
        Ask me anything about Qarshiyev School.
      </p>
    </div>
    <button
      type="button"
      onClick={onClose}
      aria-label="Close assistant"
      className={cn(
        'rounded-lg p-1.5 transition hover:bg-black/5',
        dark ? 'text-slate-300 hover:bg-white/10' : 'text-slate-500'
      )}
    >
      <X size={18} />
    </button>
  </div>
);

const Controls: React.FC<{ dark: boolean; onRegenerate: () => void; onClear: () => void; disabled: boolean }> = ({
  dark,
  onRegenerate,
  onClear,
  disabled,
}) => (
  <div className="flex items-center justify-end gap-1 px-4 pb-1">
    <button
      type="button"
      onClick={onRegenerate}
      disabled={disabled}
      className={cn(
        'flex items-center gap-1 rounded-lg px-2 py-1 text-[0.68rem] transition disabled:opacity-40',
        dark ? 'text-slate-300 hover:bg-white/10' : 'text-slate-500 hover:bg-slate-100'
      )}
    >
      <RefreshCw size={12} /> Qayta
    </button>
    <button
      type="button"
      onClick={onClear}
      className={cn(
        'flex items-center gap-1 rounded-lg px-2 py-1 text-[0.68rem] transition',
        dark ? 'text-slate-300 hover:bg-white/10' : 'text-slate-500 hover:bg-slate-100'
      )}
    >
      <Eraser size={12} /> Tozalash
    </button>
  </div>
);

export const AssistantWidget: React.FC = memo(() => {
  const { isOpen, messages, isThinking, isStreaming, close, send, regenerate, clear, stop } = useAssistant();
  const dark = useIsDark();
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const showSuggestions = messages.length <= 1;

  // Auto-scroll to bottom on new content.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  // Close on Escape and on click outside the panel.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) close();
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onClick);
    };
  }, [isOpen, close]);

  // Prevent background scroll on mobile and lock body overflow when chat is open.
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="assistant-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] bg-black/10 backdrop-blur-[2px]"
          />
          <motion.div
          key="assistant-panel"
          ref={panelRef}
          initial={{ opacity: 0, y: 24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={cn(
            'assistant-violet fixed bottom-24 right-4 z-[10000] flex h-[70vh] w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-3xl md:bottom-24 md:right-6 md:h-[640px]',
            dark ? 'assistant-glass-dark' : 'assistant-glass'
          )}
          role="dialog"
          aria-label="AI School Assistant"
        >
          <Header dark={dark} onClose={close} />

          {/* Messages */}
          <div ref={scrollRef} className="assistant-scroll flex-1 space-y-4 overflow-y-auto px-4 py-4">
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} dark={dark} />
            ))}

            {isThinking && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-2.5"
              >
                <div className="assistant-avatar-glow mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-white">
                  <Sparkles size={15} />
                </div>
                <div
                  className={cn(
                    'rounded-2xl rounded-tl-md px-4 py-3',
                    dark ? 'bg-white/10' : 'bg-white border border-slate-100'
                  )}
                >
                  <TypingIndicator />
                </div>
              </motion.div>
            )}
          </div>

          {/* Suggested questions */}
          {showSuggestions && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q.label}
                    type="button"
                    onClick={() => send(q.value)}
                    disabled={isStreaming}
                    className={cn(
                      'assistant-ripple rounded-full border px-3 py-1.5 text-[0.72rem] font-medium transition hover:border-violet-400 hover:text-violet-600 disabled:opacity-50',
                      dark
                        ? 'border-white/15 bg-white/5 text-slate-200 hover:bg-white/10'
                        : 'border-slate-200 bg-white text-slate-600'
                    )}
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <Controls dark={dark} onRegenerate={regenerate} onClear={clear} disabled={isStreaming} />

          <div className="px-4 pb-4 pt-1">
            <ChatInput onSend={send} onStop={stop} streaming={isStreaming} dark={dark} />
            <p className={cn('mt-2 text-center text-[0.6rem]', dark ? 'text-slate-500' : 'text-slate-400')}>
              AI may make mistakes. For important info, contact the school administration.
            </p>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
  );
});

AssistantWidget.displayName = 'AssistantWidget';
