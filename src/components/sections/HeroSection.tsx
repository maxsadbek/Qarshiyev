import React, { useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Play, ArrowRight, Users, GraduationCap, Star, Award } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useGyroscope } from '@/hooks/useGyroscope';
import { Modal } from '@/components/ui/Modal';

const HERO_VIDEO_URL = 'https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1&controls=1&rel=0&modestbranding=1';
const THUMBNAIL = 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=90';

const stats = [
  { icon: Users, value: '8,500+', label: 'O\'quvchilar' },
  { icon: GraduationCap, value: '6,200+', label: 'Bitiruvchilar' },
  { icon: Star, value: '96%', label: 'Muvaffaqiyat' },
  { icon: Award, value: '10+', label: 'Yillar' },
];

export const HeroSection: React.FC = () => {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { gamma, beta, isSupported: gyroSupported } = useGyroscope();

  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), springConfig);

  // Gyroscope override
  const gyroRotateX = gyroSupported && beta !== null ? Math.max(-12, Math.min(12, (beta - 45) * 0.4)) : null;
  const gyroRotateY = gyroSupported && gamma !== null ? Math.max(-18, Math.min(18, gamma * 0.6)) : null;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(245,158,11,0.08)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(245,158,11,0.05)_0%,_transparent_60%)]" />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-violet-500/40"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10 pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT — Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Overline badge */}
            <motion.div
              className="inline-flex items-center gap-2 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-1.5 bg-violet-500/15 border border-violet-500/30 rounded-full px-4 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                <span className="text-violet-400 text-xs font-bold tracking-widest uppercase">
                  Qarshiyev Ta'lim Markazi
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="font-serif text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-[1.08] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              O'z{' '}
              <span className="gold-shimmer">Global</span>
              <br />
              Salohiyatingizni Oching{' '}
              <span className="text-violet-400">Sifatli</span>
              <br />
              Ta'lim Bilan
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              IELTS Band 7+ dan xalqaro universitetlargacha — biz sertifikatlangan o'qituvchilar va isbotlangan 96% muvaffaqiyat ko'rsatkichi bilan dunyo darajasidagi ingliz tili ta'limini taqdim etamiz.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              <Link to="/contact">
                <Button variant="gold" size="xl" icon={<ArrowRight size={18} />}>
                  Safaringizni Boshlang
                </Button>
              </Link>
              <Link to="/courses">
                <Button
                  variant="ghost"
                  size="xl"
                  className="text-white hover:bg-white/10 border border-white/20 hover:border-white/40"
                >
                  Kurslarni Ko'ring
                </Button>
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
            >
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="text-center sm:text-left">
                  <div className="flex items-center gap-2 mb-1 justify-center sm:justify-start">
                    <Icon size={14} className="text-violet-500" />
                    <span className="text-violet-400 font-bold text-sm tracking-wider">{label}</span>
                  </div>
                  <div className="text-white font-serif font-bold text-2xl">{value}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — 3D iPhone Mockup */}
          <motion.div
            ref={containerRef}
            className="flex items-center justify-center lg:justify-end relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{ perspective: '1200px' }}
          >
            {/* Floating glow behind phone */}
            <motion.div
              className="absolute w-72 h-72 rounded-full bg-violet-500/10 blur-3xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Phone wrapper with 3D tilt */}
            <motion.div
              className="relative"
              style={{
                rotateX: gyroRotateX ?? rotateX,
                rotateY: gyroRotateY ?? rotateY,
                transformStyle: 'preserve-3d',
              }}
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              {/* Phone outer shell */}
              <div
                className="relative"
                style={{
                  width: '280px',
                  height: '570px',
                  background: 'linear-gradient(145deg, #2d2d2d 0%, #1a1a1a 40%, #0d0d0d 100%)',
                  borderRadius: '44px',
                  padding: '10px',
                  boxShadow: `
                    0 0 0 1px rgba(255,255,255,0.08),
                    0 0 0 2px rgba(0,0,0,0.8),
                    20px 40px 80px rgba(0,0,0,0.7),
                    -5px -5px 20px rgba(255,255,255,0.03),
                    inset 0 1px 1px rgba(255,255,255,0.12)
                  `,
                }}
              >
                {/* Side buttons */}
                <div className="absolute -right-[3px] top-24 w-[3px] h-10 bg-slate-700 rounded-r-sm" />
                <div className="absolute -left-[3px] top-20 w-[3px] h-7 bg-slate-700 rounded-l-sm" />
                <div className="absolute -left-[3px] top-32 w-[3px] h-14 bg-slate-700 rounded-l-sm" />
                <div className="absolute -left-[3px] top-48 w-[3px] h-14 bg-slate-700 rounded-l-sm" />

                {/* Screen bezel */}
                <div
                  className="relative overflow-hidden bg-black"
                  style={{
                    borderRadius: '36px',
                    height: '100%',
                  }}
                >
                  {/* Dynamic island */}
                  <div
                    className="absolute top-3 left-1/2 -translate-x-1/2 z-20 bg-black rounded-full"
                    style={{ width: '110px', height: '34px' }}
                  />

                  {/* Status bar */}
                  <div className="absolute top-0 left-0 right-0 h-12 flex items-end justify-between px-6 pb-1 z-10">
                    <span className="text-white text-xs font-semibold">9:41</span>
                    <div className="flex items-center gap-1">
                      {[3, 2, 1].map((b) => (
                        <div key={b} className={`bg-white rounded-sm`} style={{ width: '3px', height: `${b * 4 + 2}px` }} />
                      ))}
                      <div className="text-white text-xs ml-1">100%</div>
                    </div>
                  </div>

                  {/* VIDEO / THUMBNAIL */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Thumbnail */}
                    <img
                      src={THUMBNAIL}
                      alt="Education Center Video"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-slate-950/50" />
                    {/* Play button */}
                    <motion.button
                      className="relative z-10 flex flex-col items-center gap-3"
                      onClick={() => setVideoPlaying(true)}
                      whileHover={{}}
                      whileTap={{}}
                      aria-label="Play video"
                    >
                      <motion.div
                        className="w-16 h-16 rounded-full bg-violet-500 flex items-center justify-center shadow-lg shadow-violet-500/50"
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <Play size={24} fill="white" className="text-white ml-1" />
                      </motion.div>
                      <span className="text-white text-xs font-semibold tracking-wide">
                        Bizning Hikoyamizni Ko'ring
                      </span>
                    </motion.button>
                  </div>

                  {/* Screen edge glare */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.02) 100%)',
                      borderRadius: '36px',
                    }}
                  />

                  {/* Home indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/40 rounded-full" />
                </div>

                {/* Phone top reflection */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-[44px]"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)',
                  }}
                />
              </div>

              {/* Phone shadow (3D depth) */}
              <motion.div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-8 bg-black/50 blur-xl rounded-full"
                style={{ scaleX: 0.9 }}
              />
            </motion.div>

            {/* Floating badges */}
            <motion.div
              className="absolute -left-6 top-24 bg-white rounded-2xl p-3 shadow-xl flex items-center gap-3"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center">
                <GraduationCap size={18} className="text-violet-600" />
              </div>
              <div>
                <div className="font-serif font-bold text-slate-950 text-sm">IELTS Band 8.0</div>
                <div className="text-slate-400 text-xs">So'nggi yutuq</div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -right-6 bottom-32 bg-white rounded-2xl p-3 shadow-xl"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} fill="#f59e0b" className="text-violet-500" />
                ))}
              </div>
              <div className="text-slate-950 font-bold text-xs">4.9 / 5.0</div>
              <div className="text-slate-400 text-xs">O'quvchi Reytingi</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-violet-500"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>

      {/* Video Modal */}
      <Modal isOpen={videoPlaying} onClose={() => setVideoPlaying(false)} size="xl" showClose title="Qarshiyev Ta'lim Markazi — Bizning Hikoyamiz">
        <div className="p-4 bg-slate-950">
          <div className="aspect-video rounded-lg overflow-hidden bg-black">
            <iframe
              src={HERO_VIDEO_URL}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Qarshiyev Ta'lim Markazi - Bizning Hikoyamiz"
            />
          </div>
        </div>
      </Modal>
    </section>
  );
};
