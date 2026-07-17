import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { useAssistant } from '@/assistant/AssistantContext';
import { cn } from '@/utils';

export const FloatingAssistantButton: React.FC = () => {
  const { isOpen, toggle } = useAssistant();
  const [ready, setReady] = useState(false);
  const [showTip, setShowTip] = useState(false);

  const hoverX = useMotionValue(0);
  const hoverY = useMotionValue(0);
  const springX = useSpring(hoverX, { stiffness: 300, damping: 20 });
  const springY = useSpring(hoverY, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const t = setTimeout(() => {
      setReady(true);
      setShowTip(true);
      setTimeout(() => setShowTip(false), 5000);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    hoverX.set(x * 0.25);
    hoverY.set(y * 0.25);
  };

  const handleMouseLeave = () => {
    hoverX.set(0);
    hoverY.set(0);
  };

  return (
    <>
      {ready && (
        <motion.button
          type="button"
          onClick={toggle}
          onMouseEnter={() => setShowTip(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          aria-label={isOpen ? 'Close information' : 'Open information'}
          aria-expanded={isOpen}
          className={cn(
            'assistant-violet assistant-ripple fixed bottom-6 right-20 md:right-24',
            'h-16 w-16 rounded-full flex items-center justify-center',
            'text-white shadow-2xl cursor-pointer group select-none pointer-events-auto',
            isOpen ? 'z-[10000]' : 'z-[99999]'
          )}
          initial={{ opacity: 0, scale: 0.3, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.3, y: 30 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
        >
          <motion.div style={{ x: springX, y: springY }} className="absolute inset-0">
            {!isOpen && <span className="assistant-pulse-glow" />}
            <span className="absolute inset-0 rounded-full assistant-conic opacity-90" />
            <span className="absolute inset-[1.5px] rounded-full bg-gradient-to-br from-violet-500 to-indigo-600" />

            <span className="relative z-10 flex items-center justify-center">
              <motion.span
                animate={isOpen ? { rotate: 90, scale: 0.9 } : { rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {isOpen ? <X size={24} strokeWidth={2.2} /> : <Sparkles size={24} strokeWidth={2.2} />}
              </motion.span>
            </span>

            <AnimatePresence>
              {showTip && !isOpen && (
                <motion.span
                  initial={{ opacity: 0, x: 10, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  className="pointer-events-none absolute right-[4.5rem] top-1/2 -translate-y-1/2 hidden whitespace-nowrap rounded-2xl bg-slate-950/92 px-3.5 py-2 text-xs font-medium text-white shadow-xl backdrop-blur md:block"
                >
                  Information
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.button>
      )}
    </>
  );
};
