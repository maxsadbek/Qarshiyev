import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUpModule from 'react-countup';
import type { ComponentType } from 'react';
import type { CountUpProps } from 'react-countup';
const CountUp = ((CountUpModule as { default?: ComponentType<CountUpProps> }).default ?? CountUpModule) as ComponentType<CountUpProps>;
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { statistics } from '@/data/statistics';
import sirojUstoz from '@/assets/SirojUstoz.jpg';

const ABOUT_POINTS = [
  "Xalqaro va Milliy sertifikatga ega o'qituvchilar",
  'Har bir fandan chuqurlashtirilgan darslar',
  "Sifatli ta'lim va kuchli nazorat",
  'Qulay joylashuv va raqobatbardosh muhit',
  "Ilm majlisi, tarbiya darslari va suhbatlari",
  'Ichki sayohatlar va ekskursiyalar',
  "Ta'lim va tarbiya uyg'unligi",
  'Ota-onalar bilan muntazam suhbatlar',
];

export const AboutSection: React.FC = () => {
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const statsToShow = statistics.slice(0, 4);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
              <img
                 src={sirojUstoz.src}
                alt="Siroj Ustoz"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
            </div>

            {/* Floating card: Experience */}
            <motion.div
              className="absolute -bottom-6 -right-6 bg-slate-950 text-white rounded-2xl p-5 shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-4xl font-serif font-bold text-violet-400 leading-none">8+</div>
              <div className="text-slate-300 text-sm mt-1 font-medium">Yillik</div>
              <div className="text-white text-sm font-semibold">Tajriba</div>
            </motion.div>

            {/* Floating card: Success */}
            <motion.div
              className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-100"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                  <span className="text-violet-600 text-lg font-bold">%</span>
                </div>
                <div>
                  <div className="font-serif font-bold text-slate-950 text-xl">90%</div>
                  <div className="text-slate-500 text-xs">Muvaffaqiyat Ko'rsatkichi</div>
                </div>
              </div>
            </motion.div>

            {/* Decorative element */}
            <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-3xl bg-violet-50 -z-10" />
          </motion.div>

          {/* Content Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <SectionHeader
                overline="Biz Haqimizda"
                title="Qarshiyev School —"
                titleAccent="Ishonch va Natija"
                description="2018-yilda tashkil etilgan 'QARSHIYEV SCHOOL' Ta'lim Markazi kichik o'quv markazidan Nuriston shaharchasidagi eng ishonchli va eng natijabardor ta'lim markaziga aylandi. Bugungi kunda 2000 dan ortiq o'quvchilar ta'lim olib, 1500 dan ortiq bitiruvchilar o'z maqsadlariga erishgan."
                align="left"
              />
            </motion.div>

            {/* Mission */}
            <div className="mt-8">
              <div className="bg-slate-50 rounded-2xl p-5 border-l-4 border-violet-500">
                <h4 className="font-semibold text-slate-950 mb-2 text-sm uppercase tracking-wider">
                  Bizning Missiyamiz
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Xalqimiz farzandlariga sifatli ta'lim va tarbiya berish, ularning hayotiga ijobiy o'zgartirish kiritish.
                </p>
              </div>
            </div>

            {/* Checklist */}
            <StaggerContainer className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
              {ABOUT_POINTS.map((point) => (
                <StaggerItem key={point} className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-violet-500 mt-0.5 shrink-0" />
                  <span className="text-slate-600 text-sm">{point}</span>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* CTA */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/about">
                <Button variant="primary" size="lg" icon={<ArrowRight size={16} />}>
                  Biz Haqimizda Ko'proq
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Stats Row */}
        <div
          ref={statsRef}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {statsToShow.map((stat, i) => (
            <motion.div
              key={stat.id}
              className="text-center p-6 rounded-3xl bg-slate-50 hover:bg-slate-950 hover:text-white transition-all duration-300 group card-shadow-hover"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div className="text-4xl font-serif font-bold text-violet-500 mb-1">
                {stat.prefix}
                {statsInView ? (
                  <CountUp end={stat.value} duration={2.5} separator="," />
                ) : (
                  '0'
                )}
                {stat.suffix}
              </div>
              <div className="text-sm font-semibold text-slate-400 group-hover:text-slate-300 transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

