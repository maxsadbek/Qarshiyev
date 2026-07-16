import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, Database, Sparkles } from 'lucide-react';
import { cn } from '@/utils';
import type { ChatMessage } from '@/assistant/types';
import { Markdown } from './Markdown';

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
}

interface Props {
  message: ChatMessage;
  dark: boolean;
}

export const MessageBubble: React.FC<Props> = memo(({ message, dark }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const copy = () => {
    navigator.clipboard?.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        className="flex justify-end"
      >
        <div className="max-w-[82%] rounded-2xl rounded-br-md bg-gradient-to-br from-violet-600 to-indigo-600 px-4 py-2.5 text-white shadow-lg">
          <p className="whitespace-pre-wrap break-words text-[0.9rem] leading-relaxed">{message.content}</p>
          <div className="mt-1 text-right text-[0.65rem] text-white/70">{formatTime(message.timestamp)}</div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      className="flex gap-2.5"
    >
      {/* Avatar */}
      <div className="assistant-avatar-glow mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow">
        <Sparkles size={15} />
      </div>

      <div className="flex max-w-[85%] flex-col">
        <div
          className={cn(
            'group/bubble relative rounded-2xl rounded-tl-md px-4 py-3',
            dark ? 'bg-white/10 text-slate-100' : 'bg-white text-slate-800 border border-slate-100'
          )}
        >
          <Markdown content={message.content} dark={dark} />

          {/* Streaming cursor */}
          {message.streaming && (
            <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-violet-500 align-middle" />
          )}

          {/* Source badge */}
          {!message.streaming && message.source && (
            <div
              className={cn(
                'mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.6rem] font-medium',
                dark ? 'bg-violet-500/20 text-violet-200' : 'bg-violet-100 text-violet-700'
              )}
            >
              {message.source === 'knowledge-base' ? (
                <>
                  <Database size={10} /> Maktab bazasidan
                  {typeof message.confidence === 'number' && (
                    <span className="opacity-70">· {Math.round(message.confidence * 100)}%</span>
                  )}
                </>
              ) : (
                <>
                  <Sparkles size={10} /> AI
                </>
              )}
            </div>
          )}

          {/* Copy button */}
          {message.content && !message.streaming && (
            <button
              type="button"
              onClick={copy}
              aria-label="Javobni nusxalash"
              className={cn(
                'absolute -bottom-3 -right-2 rounded-full p-1.5 opacity-0 shadow transition group-hover/bubble:opacity-100',
                dark ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' : 'bg-white text-slate-600 hover:bg-slate-100'
              )}
            >
              {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
            </button>
          )}
        </div>
        <div className={cn('mt-1 px-1 text-[0.65rem]', dark ? 'text-slate-400' : 'text-slate-400')}>
          {formatTime(message.timestamp)}
        </div>
      </div>
    </motion.div>
  );
});

MessageBubble.displayName = 'MessageBubble';
