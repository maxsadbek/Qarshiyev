'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Volume2, VolumeX } from 'lucide-react';
import { useLenis } from '@/context/SmoothScrollProvider';
import { useIntro } from '@/context/IntroContext';
import { ROUTES } from '@/constants';
import { IntroLogoSvg } from './IntroLogoSvg';
import { IntroTypography } from './IntroTypography';
import { IntroSoundEngine } from './IntroSoundEngine';
import { useIntroTimeline } from './useIntroTimeline';
import {
  INTRO_COLORS,
  INTRO_LOGO_SIZE,
  INTRO_ORB_SIZE,
  INTRO_TOTAL_DURATION,
} from './constants';

/**
 * Cinematic preloader for the Qarshiyev Education Center.
 * Plays once per session on the home page only. The black overlay reveals the
 * site behind it through a growing radial hole (blur -> sharp), then the emblem
 * flies into the navbar so the sequence flows seamlessly into the homepage.
 */
export const CinematicIntro: React.FC = () => {
  const pathname = usePathname();
  const lenis = useLenis();
  const { shouldPlayIntro, startIntro, completeIntro, skipIntro } = useIntro();

  const overlayRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);
  const logoSvgRef = useRef<SVGSVGElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const typographyRef = useRef<HTMLDivElement>(null);

  const soundRef = useRef<IntroSoundEngine | null>(null);
  if (!soundRef.current) soundRef.current = new IntroSoundEngine();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const hasPlayedRef = useRef(false);
  const finishTimerRef = useRef<number | null>(null);

  // Always reference the latest Lenis instance for locking / unlocking
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;

  const isHome = pathname === ROUTES.HOME;
  const shouldRender = shouldPlayIntro && isHome;

  const refs = useMemo(
    () => ({
      overlay: overlayRef,
      mask: maskRef,
      stage: stageRef,
      glow: glowRef,
      orb: orbRef,
      rings: ringsRef,
      logoSvg: logoSvgRef,
      logoContainer: logoContainerRef,
      typography: typographyRef,
    }),
    [],
  );

  useEffect(() => {
    return () => {
      if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
      soundRef.current?.destroy();
      soundRef.current = null;
    };
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = '';
    document.documentElement.classList.remove('intro-active');
    document.documentElement.classList.remove('lenis-stopped');
    lenisRef.current?.start();
  }, []);

  const lockScroll = useCallback(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.classList.add('intro-active');
    lenisRef.current?.stop();
  }, []);

  const finishIntro = useCallback(() => {
    if (finishTimerRef.current) {
      clearTimeout(finishTimerRef.current);
      finishTimerRef.current = null;
    }
    // Safety: clear any blur/scale left on the hidden site (e.g. on skip)
    const site = document.getElementById('site-reveal');
    if (site) {
      site.style.filter = '';
      site.style.transform = '';
      site.style.willChange = '';
    }
    setIsPlaying(false);
    setIsDone(true);
    unlockScroll();
    soundRef.current?.stopAll();
  }, [unlockScroll]);

  useEffect(() => {
    if (shouldRender && !isPlaying && !hasPlayedRef.current) {
      const timer = requestAnimationFrame(() => {
        hasPlayedRef.current = true;
        startIntro();
        setIsPlaying(true);
        lockScroll();
        finishTimerRef.current = window.setTimeout(
          finishIntro,
          (INTRO_TOTAL_DURATION + 3) * 1000,
        );
      });
      return () => cancelAnimationFrame(timer);
    }
  }, [shouldRender, isPlaying, startIntro, lockScroll, finishIntro]);

  const handleScene6Start = useCallback(() => {
    completeIntro();
  }, [completeIntro]);

  const handleComplete = useCallback(() => {
    finishIntro();
  }, [finishIntro]);

  const handleToggleMute = useCallback(() => {
    if (!soundRef.current) return;
    const muted = soundRef.current.toggleMute();
    setIsMuted(muted);
  }, []);

  const handleSkip = useCallback(() => {
    skipIntro();
    finishIntro();
    if (overlayRef.current) {
      overlayRef.current.style.opacity = '0';
      overlayRef.current.style.pointerEvents = 'none';
      overlayRef.current.style.visibility = 'hidden';
    }
  }, [skipIntro, finishIntro]);

  useEffect(() => {
    if (!isPlaying) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleSkip();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isPlaying, handleSkip]);

  useIntroTimeline({
    refs,
    sound: soundRef.current,
    onScene6Start: handleScene6Start,
    onComplete: handleComplete,
  });

  if (isDone || (!shouldRender && !isPlaying)) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999]"
      style={{
        backgroundColor: 'transparent',
        pointerEvents: isPlaying ? 'auto' : 'none',
        willChange: 'opacity',
      }}
      role="presentation"
      aria-hidden={!isPlaying}
    >
      {/* Black stage that develops a growing transparent hole to reveal the site */}
      <div
        ref={maskRef}
        className="absolute inset-0"
        style={{ backgroundColor: INTRO_COLORS.background, willChange: 'mask-image' }}
      />

      {/* Foreground content — never masked, so the emblem stays visible through the reveal */}
      <div ref={stageRef} className="absolute inset-0">
        {/* Scene 1 — the seed of light */}
        <div
          ref={glowRef}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: '50%',
            left: '50%',
            width: 8,
            height: 8,
            background:
              'radial-gradient(circle, #ffffff 0%, #c9a7ff 40%, #8a2be2 70%, transparent 100%)',
            boxShadow:
              '0 0 22px 6px rgba(138,43,226,0.55), 0 0 60px 18px rgba(138,43,226,0.28)',
            willChange: 'transform, opacity',
          }}
        />

        {/* Scenes 2-5 — polished glass orb with moving liquid reflections */}
        <div
          ref={orbRef}
          className="intro-orb absolute"
          style={{
            top: '50%',
            left: '50%',
            width: INTRO_ORB_SIZE,
            height: INTRO_ORB_SIZE,
            willChange: 'transform, opacity',
          }}
        >
          <div className="intro-orb-glow" />
          <div className="intro-orb-body">
            <div className="intro-orb-liquid intro-orb-liquid-a" />
            <div className="intro-orb-liquid intro-orb-liquid-b" />
            <div className="intro-orb-shine" />
            <div className="intro-orb-rim" />
          </div>
        </div>

        {/* Scene 4 — thin, slow rotating light rings */}
        <div
          ref={ringsRef}
          className="intro-rings absolute"
          style={{
            top: '50%',
            left: '50%',
            width: INTRO_ORB_SIZE * 1.85,
            height: INTRO_ORB_SIZE * 1.85,
            willChange: 'transform, opacity',
          }}
        >
          <div className="intro-ring intro-ring-1" />
          <div className="intro-ring intro-ring-2" />
          <div className="intro-ring intro-ring-3" />
        </div>

        {/* Scenes 5-6 — emblem + brand lockup */}
        <div
          ref={logoContainerRef}
          className="absolute flex items-center justify-center"
          style={{
            top: '50%',
            left: '50%',
            width: INTRO_LOGO_SIZE,
            height: INTRO_LOGO_SIZE,
            willChange: 'transform, opacity',
          }}
        >
          <IntroLogoSvg
            ref={logoSvgRef}
            style={{ width: INTRO_LOGO_SIZE, height: INTRO_LOGO_SIZE }}
          />
        </div>

        <IntroTypography
          ref={typographyRef}
          className="absolute text-center px-6"
          style={{ top: 'calc(50% + 104px)', left: '50%', width: 'min(90vw, 380px)' }}
        />
      </div>

      {/* Sound toggle */}
      <button
        type="button"
        onClick={handleToggleMute}
        className="absolute top-6 right-6 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.04] hover:bg-white/[0.09] transition-colors duration-300"
        aria-label={isMuted ? 'Unmute intro sounds' : 'Mute intro sounds'}
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <VolumeX size={16} className="text-white/40" />
        ) : (
          <Volume2 size={16} className="text-white/40" />
        )}
      </button>

      {/* Skip hint */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute bottom-6 right-6 z-10 text-[11px] font-sans tracking-[0.25em] uppercase text-white/25 hover:text-white/50 transition-colors duration-300"
        aria-label="Skip introduction"
      >
        Skip
      </button>
    </div>
  );
};

