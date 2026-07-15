import { useEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';
import {
  INTRO_COLORS,
  INTRO_EASE,
  INTRO_LOGO_SIZE,
  INTRO_SCENES,
  NAVBAR_LOGO_SIZE,
} from './constants';
import type { IntroSoundEngine } from './IntroSoundEngine';

interface IntroRefs {
  overlay: RefObject<HTMLDivElement | null>;
  stage: RefObject<HTMLDivElement | null>;
  glowPoint: RefObject<HTMLDivElement | null>;
  network: RefObject<SVGSVGElement | null>;
  logoSvg: RefObject<SVGSVGElement | null>;
  logoContainer: RefObject<HTMLDivElement | null>;
  typography: RefObject<HTMLDivElement | null>;
}

interface UseIntroTimelineOptions {
  refs: IntroRefs;
  sound: IntroSoundEngine;
  onScene6Start: () => void;
  onComplete: () => void;
}

/**
 * GSAP master timeline orchestrating all 6 intro scenes.
 * Uses GPU-accelerated transforms and SVG stroke animations.
 */
export function useIntroTimeline({
  refs,
  sound,
  onScene6Start,
  onComplete,
}: UseIntroTimelineOptions): void {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const { overlay, stage, glowPoint, network, logoSvg, logoContainer, typography } = refs;
    if (
      !overlay.current ||
      !stage.current ||
      !glowPoint.current ||
      !network.current ||
      !logoSvg.current ||
      !logoContainer.current ||
      !typography.current
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const lines = network.current!.querySelectorAll('.intro-network-line');
      const nodesGroup = network.current!.querySelector('.intro-network-nodes');
      const linesGroup = network.current!.querySelector('.intro-network-lines');
      const nodeElements = network.current!.querySelectorAll('.intro-network-node');
      const logoGroup = logoSvg.current!.querySelector('.intro-logo-group');
      const lightSweep = logoSvg.current!.querySelector('.intro-light-sweep');
      const symbols = overlay.current!.querySelectorAll('.intro-symbol');

      // Initial states
      gsap.set(glowPoint.current, { scale: 0, opacity: 0 });
      gsap.set(network.current, { opacity: 1, scale: 0.3, transformOrigin: 'center center' });
      gsap.set(logoContainer.current, { opacity: 0, scale: 0.8 });
      gsap.set(typography.current, { opacity: 0, y: 24 });
      gsap.set(stage.current, { perspective: 900, transformStyle: 'preserve-3d' });

      const tl = gsap.timeline({
        onComplete,
        defaults: { ease: INTRO_EASE.premium },
      });

      // ─── Scene 1: Pure white pause, then glowing point ───
      tl.to({}, { duration: INTRO_SCENES.pause });

      tl.add(() => {
        sound.init().then((ok) => {
          if (ok) {
            sound.play('ambient');
            sound.play('bassRise');
          }
        });
      }, INTRO_SCENES.glowAppear);

      tl.fromTo(
        glowPoint.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.35, ease: INTRO_EASE.reveal },
        INTRO_SCENES.glowAppear,
      );

      // ─── Scene 2: Point expands, network draws itself ───
      tl.to(
        glowPoint.current,
        {
          scale: 6,
          opacity: 0.25,
          duration: 0.9,
          ease: 'power2.out',
        },
        INTRO_SCENES.networkExpand,
      );

      tl.to(
        network.current,
        { scale: 1, duration: 1, ease: INTRO_EASE.reveal },
        INTRO_SCENES.networkExpand,
      );

      tl.to(
        linesGroup,
        { opacity: 1, duration: 0.2 },
        INTRO_SCENES.networkDraw,
      );

      tl.to(
        lines,
        {
          strokeDashoffset: 0,
          duration: 0.9,
          stagger: { each: 0.025, from: 'center' },
          ease: 'power1.inOut',
          onStart: () => sound.play('pulse'),
        },
        INTRO_SCENES.networkDraw + 0.05,
      );

      tl.to(
        nodesGroup,
        { opacity: 1, duration: 0.3 },
        INTRO_SCENES.networkDraw + 0.15,
      );

      tl.fromTo(
        nodeElements,
        { scale: 0, opacity: 0, transformOrigin: 'center center' },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: { each: 0.03, from: 'center' },
          ease: INTRO_EASE.reveal,
        },
        INTRO_SCENES.networkDraw + 0.2,
      );

      // ─── Scene 3: 3D rotation, glowing connections, symbols ───
      tl.to(
        network.current,
        {
          rotationY: 14,
          rotationX: -10,
          duration: 0.85,
          ease: INTRO_EASE.premium,
        },
        INTRO_SCENES.rotation3d,
      );

      // Pulse select connection lines with accent glow
      const glowLines = Array.from(lines).filter((_, i) => i % 4 === 0);
      tl.to(
        glowLines,
        {
          stroke: INTRO_COLORS.accent,
          opacity: 1,
          strokeWidth: 1.2,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          stagger: 0.08,
          onStart: () => sound.play('shimmer'),
        },
        INTRO_SCENES.rotation3d + 0.1,
      );

      // Futuristic symbols flash in and out
      tl.fromTo(
        symbols,
        { opacity: 0, scale: 0.7 },
        {
          opacity: 0.45,
          scale: 1,
          duration: 0.25,
          stagger: 0.06,
          ease: INTRO_EASE.reveal,
        },
        INTRO_SCENES.symbolsFlash,
      );

      tl.to(
        symbols,
        {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          stagger: 0.04,
        },
        INTRO_SCENES.symbolsFlash + 0.5,
      );

      // ─── Scene 4: Converge to center, morph into logo ───
      // Nodes attract toward center hub
      tl.to(
        nodeElements,
        {
          attr: { transform: 'translate(0, 0)' },
          duration: 0.7,
          ease: INTRO_EASE.morph,
          onStart: () => sound.play('whoosh'),
        },
        INTRO_SCENES.morphStart,
      );

      // Animate each node toward center (200, 200 in viewBox = center)
      nodeElements.forEach((node) => {
        const nodeId = node.getAttribute('data-node-id');
        if (nodeId === 'center') return;

        const core = node.querySelector('.intro-node-core');
        if (!core) return;

        const cx = parseFloat(core.getAttribute('cx') || '200');
        const cy = parseFloat(core.getAttribute('cy') || '200');

        tl.to(
          core,
          {
            attr: { cx: 200, cy: 200 },
            duration: 0.65,
            ease: INTRO_EASE.morph,
          },
          INTRO_SCENES.morphStart,
        );

        // Also move the glow circle
        const glow = node.querySelector('circle:first-child');
        if (glow) {
          tl.to(
            glow,
            {
              attr: { cx: 200, cy: 200 },
              duration: 0.65,
              ease: INTRO_EASE.morph,
            },
            INTRO_SCENES.morphStart,
          );
        }

        // Prevent unused variable warning
        void cx;
        void cy;
      });

      // Lines morph — shrink toward center
      tl.to(
        lines,
        {
          attr: { x2: 200, y2: 200 },
          opacity: 0,
          duration: 0.55,
          stagger: 0.015,
          ease: INTRO_EASE.morph,
        },
        INTRO_SCENES.morphStart + 0.1,
      );

      // Network fades as logo emerges (true morph feel — no pop)
      tl.to(
        network.current,
        {
          scale: 0.15,
          opacity: 0,
          rotationY: 0,
          rotationX: 0,
          duration: 0.5,
          ease: INTRO_EASE.morph,
        },
        INTRO_SCENES.logoReveal,
      );

      tl.to(
        glowPoint.current,
        { scale: 0, opacity: 0, duration: 0.3 },
        INTRO_SCENES.logoReveal,
      );

      // Logo emerges from the converged network
      tl.to(
        logoGroup,
        { opacity: 1, duration: 0.45, ease: INTRO_EASE.reveal },
        INTRO_SCENES.logoReveal,
      );

      tl.to(
        logoContainer.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: INTRO_EASE.morph,
          onComplete: () => sound.play('logoComplete'),
        },
        INTRO_SCENES.logoReveal,
      );

      // ─── Scene 5: Logo still, light sweep, typography ───
      tl.to({}, { duration: 0.15 }, INTRO_SCENES.lightSweep);

      tl.to(
        lightSweep,
        {
          opacity: 1,
          attr: { x: 300 },
          duration: 0.7,
          ease: 'power1.inOut',
          onComplete: () => {
            gsap.set(lightSweep, { opacity: 0, attr: { x: -100 } });
          },
        },
        INTRO_SCENES.lightSweep,
      );

      tl.to(
        typography.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: INTRO_EASE.reveal,
        },
        INTRO_SCENES.typography,
      );

      // ─── Scene 6: Logo flies to navbar, hero reveals ───
      tl.to(
        typography.current,
        { opacity: 0, y: -12, duration: 0.25, ease: INTRO_EASE.premium },
        INTRO_SCENES.flyToNav,
      );

      tl.add(() => {
        onScene6Start();
        sound.play('transition');
      }, INTRO_SCENES.flyToNav);

      // Fade white background to reveal the site underneath
      tl.to(
        overlay.current,
        {
          backgroundColor: 'rgba(255, 255, 255, 0)',
          duration: 0.5,
          ease: INTRO_EASE.premium,
        },
        INTRO_SCENES.flyToNav,
      );

      // Calculate navbar logo position for precise landing
      tl.add(() => {
        const navLogo = document.getElementById('navbar-logo');
        if (!navLogo || !logoContainer.current) return;

        const navRect = navLogo.getBoundingClientRect();
        const containerRect = logoContainer.current.getBoundingClientRect();

        const deltaX =
          navRect.left + navRect.width / 2 - (containerRect.left + containerRect.width / 2);
        const deltaY =
          navRect.top + navRect.height / 2 - (containerRect.top + containerRect.height / 2);
        const scale = NAVBAR_LOGO_SIZE / INTRO_LOGO_SIZE;

        gsap.to(logoContainer.current, {
          x: deltaX,
          y: deltaY,
          scale,
          duration: 0.65,
          ease: INTRO_EASE.fly,
          onComplete: () => {
            // Hand off to navbar logo
            gsap.set(navLogo, { opacity: 1 });
            gsap.set(logoContainer.current, { opacity: 0 });
          },
        });
      }, INTRO_SCENES.flyToNav + 0.05);

      // Remove overlay
      tl.to(
        overlay.current,
        {
          opacity: 0,
          duration: 0.25,
          ease: INTRO_EASE.reveal,
          onComplete: () => {
            if (overlay.current) {
              overlay.current.style.pointerEvents = 'none';
              overlay.current.style.visibility = 'hidden';
            }
          },
        },
        INTRO_SCENES.overlayExit,
      );

      timelineRef.current = tl;
    }, overlay);

    return () => {
      timelineRef.current?.kill();
      ctx.revert();
    };
  }, [refs, sound, onScene6Start, onComplete]);
}
