import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Phone } from 'lucide-react';
import { CONTACT_INFO } from '@/constants';
import { cn } from '@/utils';
import { useLenis } from '@/context/SmoothScrollProvider';
import { useAssistant } from '@/assistant/AssistantContext';
import { Instagram } from '@/components/ui/Icons';

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

export const FloatingButtons: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [aiReady, setAiReady] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const { isOpen, toggle } = useAssistant();

  useEffect(() => {
    const handler = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setAiReady(true);
      setShowTip(true);
      setTimeout(() => setShowTip(false), 5000);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  const lenis = useLenis();

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.6 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const buttons = [
    {
      id: 'telegram',
      href: CONTACT_INFO.telegram,
      label: 'Telegram',
      icon: <TelegramIcon />,
      bg: 'bg-[#0088cc]',
      hover: 'hover:bg-[#0077bb]',
    },
    {
      id: 'instagram',
      href: CONTACT_INFO.instagram,
      label: 'Instagram',
      icon: <Instagram size={20} />,
      bg: 'bg-[#E1306C]',
      hover: 'hover:bg-[#c9255e]',
    },
    {
      id: 'phone',
      href: `tel:${CONTACT_INFO.phone}`,
      label: 'Call us',
      icon: <Phone size={18} />,
      bg: 'bg-slate-950',
      hover: 'hover:bg-slate-800',
    },
  ];

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col gap-3 items-center">
      {/* Scroll To Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scroll-top"
            onClick={scrollToTop}
            className="w-11 h-11 rounded-full bg-white border border-slate-200 shadow-lg text-slate-600 flex items-center justify-center hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all duration-200"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Contact Buttons */}
      {buttons.map((btn, i) => (
        <motion.a
          key={btn.id}
          href={btn.href}
          target={btn.id !== 'phone' ? '_blank' : undefined}
          rel="noopener noreferrer"
          className={cn(
            'w-12 h-12 rounded-full text-white flex items-center justify-center shadow-lg transition-all duration-200 animate-[float_6s_ease-in-out_infinite]',
            btn.bg,
            btn.hover
          )}
          style={{ animationDelay: `${i * 0.8}s` }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + i * 0.1 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          aria-label={btn.label}
          title={btn.label}
        >
          {btn.icon}
        </motion.a>
      ))}

      {/* AI Assistant Button */}
      {aiReady && (
        <div className="relative">
          <motion.button
            type="button"
            onClick={toggle}
            onMouseEnter={() => setShowTip(true)}
            aria-label={isOpen ? 'Close AI assistant' : 'Open AI assistant'}
            aria-expanded={isOpen}
            className={cn(
              'assistant-violet assistant-ripple h-16 w-16 rounded-full flex items-center justify-center text-white shadow-2xl cursor-pointer group select-none pointer-events-auto',
              'bg-gradient-to-br from-violet-500 to-indigo-600',
              isOpen ? 'z-[10000]' : 'z-[99999]'
            )}
            initial={{ opacity: 0, scale: 0.3, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
          >
            <span className="relative z-10 flex items-center justify-center">
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
              )}
            </span>
          </motion.button>

          {/* Tooltip */}
          {showTip && !isOpen && (
            <div className="pointer-events-none absolute right-[4.5rem] top-1/2 -translate-y-1/2 hidden whitespace-nowrap rounded-2xl bg-slate-950/92 px-3.5 py-2 text-xs font-medium text-white shadow-xl backdrop-blur md:block">
              👋 Hi! I&apos;m your AI School Assistant.
            </div>
          )}
        </div>
      )}
    </div>
  );
};