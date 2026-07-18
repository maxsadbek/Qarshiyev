import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUpModule from 'react-countup';
import type { ComponentType } from 'react';
import type { CountUpProps } from 'react-countup';
const CountUp = ((CountUpModule as { default?: ComponentType<CountUpProps> }).default ?? CountUpModule) as ComponentType<CountUpProps>;
import { SectionHeader } from '@/components/ui/SectionHeader';
import { statistics } from '@/data/statistics';
import { Users, GraduationCap, Award, BadgeCheck, Star, TrendingUp } from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Users: <Users size={28} />,
  GraduationCap: <GraduationCap size={28} />,
  Award: <Award size={28} />,
  BadgeCheck: <BadgeCheck size={28} />,
  Star: <Star size={28} />,
  TrendingUp: <TrendingUp size={28} />,
};

export const StatisticsSection: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <SectionHeader
            overline="Bizning Ta'sirimiz"
            title="Gapiradigan"
            titleAccent="Raqamlar"
            description="Mukammallikka o'n yillik sodiqlik — o'quvchilarga kuch berish, hayotlarni o'zgartirish va orzularni ro'yobga chiqarish bilan o'lchanadi."
          />
        </motion.div>

        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-3 gap-6"
        >
          {statistics.map((stat, i) => (
            <motion.div
              key={stat.id}
              className="relative overflow-hidden rounded-xl bg-slate-50 p-4 sm:p-6 md:p-8 text-center group hover:bg-slate-950 transition-all duration-500 cursor-default"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{}}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-violet-500/10 transition-colors" />

              {/* Icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-white group-hover:bg-violet-500/20 text-violet-500 mb-3 sm:mb-5 shadow-sm transition-all duration-300 mx-auto">
                {ICON_MAP[stat.icon]}
              </div>

              {/* Number */}
              <div className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-950 group-hover:text-white transition-colors mb-2">
                {stat.prefix}
                {inView ? (
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    separator=","
                    decimals={stat.suffix === '%' ? 0 : 0}
                  />
                ) : '0'}
                <span className="text-violet-500">{stat.suffix}</span>
              </div>

              {/* Label */}
              <div className="font-semibold text-slate-700 group-hover:text-white transition-colors mb-2 text-lg">
                {stat.label}
              </div>

              {/* Description */}
              {stat.description && (
                <p className="text-slate-400 group-hover:text-slate-300 text-xs transition-colors">
                  {stat.description}
                </p>
              )}

              {/* Gold accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-violet-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

