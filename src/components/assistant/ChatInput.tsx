import { memo, useState, type KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Square } from 'lucide-react';
import { cn } from '@/utils';

interface Props {
  onSend: (text: string) => void;
  onStop: () => void;
  streaming: boolean;
  dark: boolean;
}

export const ChatInput: React.FC<Props> = memo(({ onSend, onStop, streaming, dark }) => {
  const [value, setValue] = useState('');

  const submit = () => {
    const t = value.trim();
    if (!t || streaming) return;
    onSend(t);
    setValue('');
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div
      className={cn(
        'rounded-2xl border p-2 transition',
        dark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white/80'
      )}
    >
      <div className="flex items-end gap-2">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          rows={1}
          placeholder="Xabaringizni yozing..."
          aria-label="Xabaringizni yozing"
          className={cn(
            'max-h-28 min-h-[24px] flex-1 resize-none bg-transparent px-2 py-1.5 text-[0.9rem] outline-none placeholder:opacity-60',
            dark ? 'text-slate-100' : 'text-slate-800'
          )}
        />
        {streaming ? (
          <motion.button
            type="button"
            onClick={onStop}
            aria-label="To'xtatish"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-slate-700 text-white shadow"
          >
            <Square size={14} fill="currentColor" />
          </motion.button>
        ) : (
          <motion.button
            type="button"
            onClick={submit}
            disabled={!value.trim()}
            aria-label="Yuborish"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: value.trim() ? 1.05 : 1 }}
            className={cn(
              'assistant-ripple flex h-9 w-9 flex-none items-center justify-center rounded-xl text-white shadow transition',
              value.trim()
                ? 'bg-gradient-to-br from-violet-600 to-indigo-600'
                : dark
                  ? 'bg-white/10 text-slate-400'
                  : 'bg-slate-200 text-slate-400'
            )}
          >
            <ArrowUp size={16} strokeWidth={2.4} />
          </motion.button>
        )}
      </div>
    </div>
  );
});

ChatInput.displayName = 'ChatInput';

