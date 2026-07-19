import { useRef, type RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import {
  INTRO_EASE,
  INTRO_LOGO_SIZE,
  INTRO_SCENES,
  NAVBAR_LOGO_SIZE,
} from './constants';
import type { IntroSoundEngine } from './IntroSoundEngine';

interface IntroRefs {
  overlay: RefObject<HTMLDivElement | null>;
  mask: RefObject<HTMLDivElement | null>;
  stage: RefObject<HTMLDivElement | null>;
  glow: RefObject<HTMLDivElement | null>;
  orb: RefObject<HTMLDivElement | null>;
  rings: RefObject<HTMLDivElement | null>;
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
 * GSAP master timeline — one continuous animation from black silence to the
 * live homepage. GPU-only transforms/opacity; the page behind is revealed
 * through a growing radial hole (blur -> sharp) and the emblem flies into
 * the navbar.
 *
 * Uses `useGSAP` from @gsap/react which correctly handles React 19 StrictMode
 * so the animation only executes once.
 */
export function useIntroTimeline({
  refs,
  sound,
  onScene6Start,
  onComplete,
}: UseIntroTimelineOptions): void {
  // Store mutable references to avoid recreating the GSAP timeline
  const floatsRef = useRef<gsap.core.Tween[]>([]);
  const ringTweensRef = useRef<gsap.core.Tween[]>([]);

  useGSAP(
    () => {
      const { overlay, mask, stage, glow, orb, rings, logoSvg, logoContainer, typography } = refs;
      if (
        !overlay.current ||
        !mask.current ||
        !glow.current ||
        !orb.current ||
        !rings.current ||
        !logoSvg.current ||
        !logoContainer.current ||
        !typography.current
      ) {
        return;
      }

      const floats = floatsRef.current;
      const ringTweens = ringTweensRef.current;

      const logoGroup = logoSvg.current!.querySelector('.intro-logo-group');
      const lightSweep = logoSvg.current!.querySelector('.intro-light-sweep');
      const tagWords = overlay.current!.querySelectorAll('.intro-tag-word');
      const ringEls = rings.current!.querySelectorAll('.intro-ring');
      const site = document.getElementById('site-reveal');

      // ── Initial states (pure black, nothing visible) ──
      const fullyBlackMask = 'radial-gradient(circle at 50% 50%, transparent -10%, #050505 0%)';
      const setMask = (css: string) => {
        mask.current!.style.webkitMaskImage = css;
        mask.current!.style.maskImage = css;
      };
      setMask(fullyBlackMask);

      // Reveal the stage container (hidden initially to prevent pre-animation flash)
      gsap.set(stage.current, { opacity: 1 });

      // Center every element on the viewport
      gsap.set([glow.current, orb.current, rings.current, logoContainer.current], {
        xPercent: -50,
        yPercent: -50,
      });
      gsap.set(typography.current, { xPercent: -50 });

      gsap.set(glow.current, { scale: 0, opacity: 0 });
      gsap.set(orb.current, { scale: 0.18, opacity: 0 });
      gsap.set(rings.current, { scale: 0.55, opacity: 0 });
      gsap.set(logoContainer.current, { scale: 0.55, opacity: 0 });
      gsap.set(logoGroup, { opacity: 0 });
      gsap.set(typography.current, { opacity: 0, y: 26 });
      gsap.set(tagWords, { opacity: 0, y: 12 });

      // Hidden site starts blurred + slightly scaled for the radial reveal
      if (site) {
        site.style.filter = 'blur(22px) brightness(0.5)';
        site.style.transform = 'scale(1.06)';
        site.style.transformOrigin = '50% 46%';
        site.style.willChange = 'filter, transform';
      }

      const tl = gsap.timeline({
        onComplete,
        defaults: { ease: INTRO_EASE.premium },
      });

      // ── 0.0s — hold on black ──
      tl.to({}, { duration: INTRO_SCENES.glowAppear });

      // ── 0.5s — a tiny purple light appears ──
      tl.add(() => {
        sound.init().then((ok) => {
          if (ok) {
            sound.play('ambient');
            sound.play('bassRise');
          }
        });
      }, INTRO_SCENES.glowAppear);

      tl.fromTo(
        glow.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: INTRO_EASE.reveal },
        INTRO_SCENES.glowAppear,
      );

      // ── 1.2s — the light expands into a polished glass orb ──
      tl.to(
        glow.current,
        { scale: 2.6, opacity: 0, duration: 0.9, ease: 'power2.out' },
        INTRO_SCENES.orbExpand,
      );
      tl.fromTo(
        orb.current,
        { scale: 0.18, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.95, ease: INTRO_EASE.premium },
        INTRO_SCENES.orbExpand,
      );

      // Tiny floating motion — the emblem breathes gently
      floats.push(
        gsap.to([orb.current, rings.current], {
          y: -7,
          duration: 3.2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        }),
      );
      floats.push(
        gsap.to(logoContainer.current, {
          y: -7,
          duration: 3.2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 2.7,
        }),
      );

      // ── 2.0s — thin, slow light rings rotate around the orb ──
      tl.to(
        rings.current,
        { scale: 1, opacity: 1, duration: 0.8, ease: INTRO_EASE.premium },
        INTRO_SCENES.ringsAppear,
      );
      ringTweens.length = 0;
      ringTweens.push(
        gsap.to(ringEls[0], { rotation: 360, duration: 26, ease: 'none', repeat: -1 }),
        gsap.to(ringEls[1], { rotation: -360, duration: 34, ease: 'none', repeat: -1 }),
        gsap.to(ringEls[2], { rotation: 360, duration: 44, ease: 'none', repeat: -1 }),
      );

      // ── 2.7s — the orb fluidly morphs into the Qarshiyev emblem ──
      tl.to(
        orb.current,
        { scale: 0.9, opacity: 0, duration: 0.6, ease: INTRO_EASE.morph },
        INTRO_SCENES.morphStart,
      );
      tl.to(
        rings.current,
        { opacity: 0, scale: 1.15, duration: 0.5, ease: INTRO_EASE.morph },
        INTRO_SCENES.morphStart,
      );
      tl.to(
        logoContainer.current,
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: INTRO_EASE.morph,
          onStart: () => sound.play('logoComplete'),
        },
        INTRO_SCENES.morphStart,
      );
      tl.to(logoGroup, { opacity: 1, duration: 0.5, ease: INTRO_EASE.reveal }, INTRO_SCENES.morphStart);

      // ── 3.3s — a light reflection slides across the emblem ──
      tl.to(
        lightSweep,
        {
          opacity: 1,
          attr: { x: 300 },
          duration: 0.8,
          ease: INTRO_EASE.soft,
          onComplete: () => gsap.set(lightSweep, { opacity: 0, attr: { x: -100 } }),
        },
        INTRO_SCENES.lightSweep,
      );

      // ── 4.0s — the brand lockup fades in ──
      tl.fromTo(
        typography.current!.querySelector('.intro-brand-title'),
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6, ease: INTRO_EASE.reveal },
        INTRO_SCENES.brandTitle,
      );
      tl.fromTo(
        typography.current!.querySelector('.intro-brand-subtitle'),
        { opacity: 0, y: 12 },
        { opacity: 0.75, y: 0, duration: 0.6, ease: INTRO_EASE.reveal },
        INTRO_SCENES.brandSubtitle,
      );
      tl.to(
        tagWords,
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.18,
          ease: INTRO_EASE.reveal,
        },
        INTRO_SCENES.taglineStart,
      );

      // ── 5.5s — radial blur reveal: the homepage emerges behind the emblem ──
      const revealProxy = { hole: -8 };
      tl.to(
        revealProxy,
        {
          hole: 165,
          duration: 1.5,
          ease: INTRO_EASE.premium,
          onUpdate: () => {
            const h = revealProxy.hole;
            setMask(`radial-gradient(circle at 50% 50%, transparent ${h}%, #050505 ${h + 26}%)`);
          },
        },
        INTRO_SCENES.revealStart,
      );

      if (site) {
        const siteProxy = { blur: 22, bright: 0.5, scale: 1.06 };
        tl.to(
          siteProxy,
          {
            blur: 0,
            bright: 1,
            scale: 1,
            duration: 1.5,
            ease: INTRO_EASE.premium,
            onUpdate: () => {
              site.style.filter = `blur(${siteProxy.blur}px) brightness(${siteProxy.bright})`;
              site.style.transform = `scale(${siteProxy.scale})`;
            },
            onComplete: () => {
              site.style.filter = '';
              site.style.transform = '';
              site.style.willChange = '';
            },
          },
          INTRO_SCENES.revealStart,
        );
      }

      // ── 6.0s — the emblem shrinks and flies into the navbar ──
      tl.to(
        typography.current,
        { opacity: 0, y: -16, duration: 0.4, ease: INTRO_EASE.premium },
        INTRO_SCENES.flyToNav,
      );

      tl.add(() => {
        onScene6Start();
        sound.play('transition');
        floats.forEach((t) => t.kill());
        ringTweens.forEach((t) => t.kill());
        gsap.killTweensOf(logoContainer.current);
      }, INTRO_SCENES.flyToNav);

      tl.add(() => {
        const navLogo = document.getElementById('navbar-logo');
        if (!navLogo || !logoContainer.current) return;
        const navRect = navLogo.getBoundingClientRect();
        const box = logoContainer.current.getBoundingClientRect();
        const dx = navRect.left + navRect.width / 2 - (box.left + box.width / 2);
        const dy = navRect.top + navRect.height / 2 - (box.top + box.height / 2);
        const scale = NAVBAR_LOGO_SIZE / INTRO_LOGO_SIZE;
        gsap.to(logoContainer.current, {
          x: dx,
          y: dy,
          scale,
          duration: 0.7,
          ease: INTRO_EASE.fly,
          onComplete: () => {
            gsap.set(navLogo, { opacity: 1 });
            gsap.set(logoContainer.current, { opacity: 0 });
          },
        });
      }, INTRO_SCENES.flyToNav + 0.05);

      // ── 6.7s — let the live site take over ──
      tl.to(
        overlay.current,
        {
          opacity: 0,
          duration: 0.35,
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
    },
    {
      dependencies: [refs, sound, onScene6Start, onComplete],
      scope: refs.overlay,
    },
  );
}

