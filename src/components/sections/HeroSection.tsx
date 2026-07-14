import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Users, GraduationCap, Star, Award, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import heroPhoneVideo from '@/assets/5318996866413656030.mp4';

const THUMBNAIL = 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=90';

const stats = [
  { icon: Users, value: '8,500+', label: "O'quvchilar" },
  { icon: GraduationCap, value: '6,200+', label: 'Bitiruvchilar' },
  { icon: Star, value: '96%', label: 'Muvaffaqiyat' },
  { icon: Award, value: '10+', label: 'Yillar' },
];

export const HeroSection: React.FC = () => {
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(245,158,11,0.08)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(245,158,11,0.05)_0%,_transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container-custom relative z-10 pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
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

            <motion.h1
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.08] mb-6"
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

            <motion.p
              className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              IELTS Band 7+ dan xalqaro universitetlargacha — biz sertifikatlangan o'qituvchilar va isbotlangan 96% muvaffaqiyat ko'rsatkichi bilan dunyo darajasidagi ingliz tili ta'limini taqdim etamiz.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              <a
                href="https://telegram.me/SIROJIDDIN_QARSHIYEV"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="gold" size="xl" icon={<Play size={18} />}>
                  Safaringizni Boshlang
                </Button>
              </a>
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

          <motion.div
            className="flex items-center justify-center lg:justify-end relative"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <div
              className="relative"
              style={{ perspective: '1200px' }}
            >
              <div
                className="relative"
                style={{
                  width: 'clamp(200px, 40vw, 280px)',
                  height: 'clamp(400px, 80vw, 570px)',
                  background: 'linear-gradient(145deg, #2d2d2d 0%, #1a1a1a 40%, #0d0d0d 100%)',
                  borderRadius: 'clamp(32px, 8vw, 44px)',
                  padding: 'clamp(6px, 1.5vw, 10px)',
                  boxShadow: `
                    0 0 0 1px rgba(255,255,255,0.08),
                    0 0 0 2px rgba(0,0,0,0.8),
                    20px 40px 80px rgba(0,0,0,0.7),
                    -5px -5px 20px rgba(255,255,255,0.03),
                    inset 0 1px 1px rgba(255,255,255,0.12)
                  `,
                }}
              >
                <div className="absolute -right-[3px] top-24 w-[3px] h-10 bg-slate-700 rounded-r-sm" />
                <div className="absolute -left-[3px] top-20 w-[3px] h-7 bg-slate-700 rounded-l-sm" />
                <div className="absolute -left-[3px] top-32 w-[3px] h-14 bg-slate-700 rounded-l-sm" />
                <div className="absolute -left-[3px] top-48 w-[3px] h-14 bg-slate-700 rounded-l-sm" />

                <div
                  className="relative overflow-hidden bg-black"
                  style={{
                    borderRadius: '36px',
                    height: '100%',
                  }}
                >
                  <div
                    className="absolute top-3 left-1/2 -translate-x-1/2 z-20 bg-black rounded-full"
                    style={{ width: '110px', height: '34px' }}
                  />

                  <div className="absolute top-0 left-0 right-0 h-12 flex items-end justify-between px-6 pb-1 z-10">
                    <span className="text-white text-xs font-semibold">9:41</span>
                    <div className="flex items-center gap-1">
                      {[3, 2, 1].map((b) => (
                        <div key={b} className={`bg-white rounded-sm`} style={{ width: '3px', height: `${b * 4 + 2}px` }} />
                      ))}
                      <div className="text-white text-xs ml-1">100%</div>
                    </div>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center bg-black">
                    {videoPlaying ? (
                      <div className="relative w-full h-full overflow-hidden">
                        <video
                          src={heroPhoneVideo}
                          className="absolute inset-0 w-full h-full object-cover"
                          autoPlay
                          controls
                          playsInline
                          title="Qarshiyev Ta'lim Markazi - Tanishuv"
                        />
                        <button
                          className="absolute top-14 right-4 z-30 w-8 h-8 rounded-full bg-black/70 hover:bg-black/95 flex items-center justify-center text-white transition-colors border border-white/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            setVideoPlaying(false);
                          }}
                          aria-label="Videoni yopish"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <img
                          src={THUMBNAIL}
                          alt="Education Center Video"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-950/50" />
                        <button
                          className="relative z-10 flex flex-col items-center gap-3"
                          onClick={() => setVideoPlaying(true)}
                          aria-label="Play video"
                        >
                          <div
                            className="w-16 h-16 rounded-full bg-violet-500/30 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg shadow-violet-500/40 transition-colors hover:bg-violet-500/50"
                          >
                            <Play size={24} fill="white" className="text-white ml-1" />
                          </div>
                          <span className="text-white text-xs font-semibold tracking-wide">
                            Bizning Hikoyamizni Ko'ring
                          </span>
                        </button>
                      </>
                    )}
                  </div>

                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.02) 100%)',
                      borderRadius: '36px',
                    }}
                  />

                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/40 rounded-full" />
                </div>

                <div
                  className="absolute inset-0 pointer-events-none rounded-[44px]"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)',
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
