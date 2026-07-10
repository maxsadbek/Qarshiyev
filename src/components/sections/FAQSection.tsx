import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { faqItems } from '@/data/faq';
import { cn } from '@/utils';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id || null);

  // Show only first 6 FAQs on home page
  const displayedFaqs = faqItems.slice(0, 6);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          <motion.div
            className="lg:col-span-5 lg:sticky lg:top-32"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionHeader
              overline="Got Questions?"
              title="Frequently Asked"
              titleAccent="Questions"
              description="Find answers to common questions about our courses, admissions, schedule, and more. Can't find what you're looking for? Feel free to contact our support team."
              align="left"
            />
          </motion.div>

          <div className="lg:col-span-7">
            <div className="flex flex-col gap-3">
              {displayedFaqs.map((faq, i) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <button
                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                    className={cn(
                      'w-full text-left p-5 md:p-6 rounded-lg transition-all duration-300 border',
                      openId === faq.id
                        ? 'bg-slate-50 border-violet-200 shadow-sm'
                        : 'bg-white border-slate-100 hover:border-slate-300 hover:bg-slate-50/50'
                    )}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h4 className={cn(
                        'font-bold text-base md:text-lg pr-4 transition-colors',
                        openId === faq.id ? 'text-violet-600' : 'text-slate-950'
                      )}>
                        {faq.question}
                      </h4>
                      <div className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300',
                        openId === faq.id
                          ? 'bg-violet-500 text-white rotate-180'
                          : 'bg-slate-100 text-slate-500'
                      )}>
                        <ChevronDown size={18} />
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {openId === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <p className="pt-4 text-slate-500 text-sm md:text-base leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
