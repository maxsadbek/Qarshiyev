import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Volume2, VolumeX } from 'lucide-react';
import { useLenis } from '@/context/SmoothScrollProvider';
import { useIntro } from '@/context/IntroContext';
import { ROUTES } from '@/constants';
import { IntroNetworkSvg } from './IntroNetworkSvg';
import { IntroLogoSvg } from './IntroLogoSvg';
import { IntroTypography } from './IntroTypography';
import { IntroSymbols } from './IntroSymbols';
import { IntroSoundEngine } from './IntroSoundEngine';
import { useIntroTimeline } from './useIntroTimeline';
import { INTRO_COLORS, INTRO_LOGO_SIZE } from './constants';

/**
 * Premium cinematic introduction overlay.
 * Plays once per session on the home page only.
 * Seamlessly transitions into the existing website via logo flight to navbar.
 */
export const CinematicIntro: React.FC = () => {
  const location = useLocation();
  const lenis = useLenis();
  const { shouldPlayIntro, startIntro, completeIntro, skipIntro } = useIntro();

  const overlayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const glowPointRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<SVGSVGElement>(null);
  const logoSvgRef = useRef<SVGSVGElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const typographyRef = useRef<HTMLDivElement>(null);

  const soundRef = useRef<IntroSoundEngine | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const isHome = location.pathname === ROUTES.HOME;
  const shouldRender = shouldPlayIntro && isHome;

  // Initialize sound engine
  useEffect(() => {
    soundRef.current = new IntroSoundEngine();
    return () => {
      soundRef.current?.destroy();
      soundRef.current = null;
    };
  }, []);

  // Lock scroll while intro is active
  useEffect(() => {
    if (!isPlaying) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.classList.add('intro-active');

    if (lenis) lenis.stop();

    return () => {
      document.body.style.overflow = prevOverflow;
      document.documentElement.classList.remove('intro-active');
      if (lenis) lenis.start();
    };
  }, [isPlaying, lenis]);

  // Start intro when conditions are met
  useEffect(() => {
    if (shouldRender && !isPlaying) {
      // Small delay to ensure DOM refs are ready
      const timer = requestAnimationFrame(() => {
        startIntro();
        setIsPlaying(true);
      });
      return () => cancelAnimationFrame(timer);
    }
  }, [shouldRender, isPlaying, startIntro]);

  const handleScene6Start = useCallback(() => {
    // Trigger hero animations and reveal navbar logo target
    completeIntro();
  }, [completeIntro]);

  const handleComplete = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleToggleMute = useCallback(() => {
    if (!soundRef.current) return;
    const muted = soundRef.current.toggleMute();
    setIsMuted(muted);
  }, []);

  const handleSkip = useCallback(() => {
    skipIntro();
    setIsPlaying(false);
    if (overlayRef.current) {
      overlayRef.current.style.opacity = '0';
      overlayRef.current.style.pointerEvents = 'none';
      overlayRef.current.style.visibility = 'hidden';
    }
  }, [skipIntro]);

  // Keyboard skip (Escape)
  useEffect(() => {
    if (!isPlaying) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleSkip();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isPlaying, handleSkip]);

  useIntroTimeline({
    refs: {
      overlay: overlayRef,
      stage: stageRef,
      glowPoint: glowPointRef,
      network: networkRef,
      logoSvg: logoSvgRef,
      logoContainer: logoContainerRef,
      typography: typographyRef,
    },
    sound: soundRef.current ?? new IntroSoundEngine(),
    onScene6Start: handleScene6Start,
    onComplete: handleComplete,
  });

  if (!shouldRender && !isPlaying) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        backgroundColor: INTRO_COLORS.white,
        willChange: 'opacity, background-color',
        pointerEvents: isPlaying ? 'auto' : 'none',
      }}
      role="presentation"
      aria-hidden={!isPlaying}
    >
      {/* Sound toggle */}
      <button
        type="button"
        onClick={handleToggleMute}
        className="absolute top-6 right-6 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-black/[0.04] hover:bg-black/[0.08] transition-colors duration-300"
        aria-label={isMuted ? 'Unmute intro sounds' : 'Mute intro sounds'}
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <VolumeX size={16} className="text-black/30" />
        ) : (
          <Volume2 size={16} className="text-black/30" />
        )}
      </button>

      {/* Skip hint */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute bottom-6 right-6 z-10 text-[11px] font-sans tracking-widest uppercase text-black/20 hover:text-black/40 transition-colors duration-300"
        aria-label="Skip introduction"
      >
        Skip
      </button>

      {/* Main stage */}
      <div
        ref={stageRef}
        className="relative flex flex-col items-center justify-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Scene 1: Glowing center point */}
        <div
          ref={glowPointRef}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 6,
            height: 6,
            background: `radial-gradient(circle, ${INTRO_COLORS.primary} 0%, ${INTRO_COLORS.accent} 50%, transparent 100%)`,
            boxShadow: `0 0 20px 4px ${INTRO_COLORS.primary}40, 0 0 40px 8px ${INTRO_COLORS.accent}20`,
            willChange: 'transform, opacity',
          }}
        />

        {/* Scene 2-3: Knowledge network */}
        <IntroNetworkSvg
          ref={networkRef}
          className="absolute"
          style={{ width: INTRO_LOGO_SIZE * 2.2, height: INTRO_LOGO_SIZE * 2.2 }}
        />

        {/* Scene 3: Floating symbols */}
        <IntroSymbols className="absolute inset-0 pointer-events-none" />

        {/* Scene 4-6: Logo container */}
        <div
          ref={logoContainerRef}
          className="relative flex items-center justify-center"
          style={{
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

        {/* Scene 5: Brand typography */}
        <IntroTypography
          ref={typographyRef}
          className="absolute top-full mt-10 w-full max-w-md px-6"
        />
      </div>
    </div>
  );
};
