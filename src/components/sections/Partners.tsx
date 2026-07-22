import React from 'react';
import { motion } from 'framer-motion';
import { partners } from '@/data/partners';
import { ShieldCheck } from 'lucide-react';

export const Partners: React.FC = () => {
  return (
    <section className="py-12 border-y border-slate-100 bg-white overflow-hidden">
      <div className="container-custom mb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2"
        >
          <ShieldCheck size={16} className="text-violet-500" />
          <span className="text-slate-500 text-sm font-semibold uppercase tracking-widest">
            Xalqaro Hamkorlarimiz
          </span>
        </motion.div>
      </div>

      <div className="marquee-wrapper">
        <div className="marquee-track flex items-center gap-12 md:gap-24">
          {/* Double the logos to create a seamless infinite loop */}
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-10 md:h-12 object-contain"
                loading="lazy"
                onError={(e) => {
                  // Fallback if logo URL is broken
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallbackSpan = document.createElement('span');
                  fallbackSpan.className = 'font-serif font-bold text-xl text-slate-400';
                  fallbackSpan.innerText = partner.name;
                  target.parentElement?.appendChild(fallbackSpan);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

