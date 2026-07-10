import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-violet-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-violet-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
              <span className="gold-shimmer">Hamjamiyatimizga</span> Qo'shiling
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
              Haftalik o'quv maslahatlari, bepul resurslar va seminarlarimizga erta kirish uchun yangiliklarimizga obuna bo'ling.
            </p>

            <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email manzilingizni kiriting"
                  disabled={status === 'success'}
                  className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-36 text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all disabled:opacity-50"
                  required
                />
                <div className="absolute right-1.5">
                  <Button
                    type="submit"
                    variant="gold"
                    className="py-2.5 px-6"
                    disabled={status === 'success' || status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <span className="animate-pulse">Yuborilmoqda...</span>
                    ) : status === 'success' ? (
                      <span className="flex items-center gap-2">
                        <CheckCircle2 size={16} /> Obuna Bo'ldingiz
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Obuna Bo'lish <Send size={14} />
                      </span>
                    )}
                  </Button>
                </div>
              </div>
              
              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-violet-400 text-sm mt-3"
                >
                  Rahmat! Yangiliklarimizga muvaffaqiyatli obuna bo'ldingiz.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
