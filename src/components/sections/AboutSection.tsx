import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUpModule from 'react-countup';
const CountUp = (CountUpModule as any).default || CountUpModule;
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { statistics } from '@/data/statistics';

const ABOUT_POINTS = [
  'Cambridge & DELTA certified instructors',
  'Maximum 12 students per class',
  'Authentic exam materials & mock tests',
  'Personalized progress tracking',
  '10+ years of proven results',
  'International partnerships & study abroad support',
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
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&q=90"
                alt="Students learning at Qarshiyev Education Center"
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
              <div className="text-4xl font-serif font-bold text-violet-400 leading-none">10+</div>
              <div className="text-slate-300 text-sm mt-1 font-medium">Years of</div>
              <div className="text-white text-sm font-semibold">Excellence</div>
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
                  <div className="font-serif font-bold text-slate-950 text-xl">96%</div>
                  <div className="text-slate-500 text-xs">Success Rate</div>
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
                overline="Who We Are"
                title="A Decade of Transforming"
                titleAccent="Futures"
                description="Founded in 2015, Qarshiyev Education Center has grown from a small language school into Qarshi's most trusted international education institution — with over 8,500 students and a legacy of academic excellence."
                align="left"
              />
            </motion.div>

            {/* Mission & Vision */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: 'Our Mission',
                  text: 'To provide world-class education that empowers Uzbek students to succeed in international academic and professional environments.',
                  accent: 'border-l-4 border-violet-500',
                },
                {
                  title: 'Our Vision',
                  text: 'To become the leading education center in Central Asia, recognized for excellence, innovation, and the global success of our graduates.',
                  accent: 'border-l-4 border-slate-950',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className={`bg-slate-50 rounded-2xl p-5 ${item.accent}`}
                >
                  <h4 className="font-semibold text-slate-950 mb-2 text-sm uppercase tracking-wider">
                    {item.title}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
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
              <Link to="/about">
                <Button variant="primary" size="lg" icon={<ArrowRight size={16} />}>
                  Learn More About Us
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
