import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Phone } from 'lucide-react';
import { CONTACT_INFO } from '@/constants';
import { cn } from '@/utils';
import { useLenis } from '@/context/SmoothScrollProvider';
import { Instagram } from '@/components/ui/Icons';

// Telegram SVG icon
const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

export const FloatingButtons: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handler = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
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
    </div>
  );
};
