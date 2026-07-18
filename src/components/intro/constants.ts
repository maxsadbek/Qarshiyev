/** Session key — intro plays once per browser tab session */
export const INTRO_STORAGE_KEY = 'qarshiyev_intro_seen';

/** Brand palette for the cinematic preloader — exact Qarshiyev system */
export const INTRO_COLORS = {
  background: '#050505',
  primary: '#8A2BE2',
  secondary: '#C9A7FF',
  highlight: '#FFFFFF',
  glow: 'rgba(138, 43, 226, 0.28)',
  primarySoft: 'rgba(138, 43, 226, 0.15)',
  secondarySoft: 'rgba(201, 167, 255, 0.12)',
} as const;

/** Premium easing curves — matches site-wide [0.22, 1, 0.36, 1] feel */
export const INTRO_EASE = {
  premium: 'power3.inOut',
  reveal: 'power2.out',
  morph: 'power2.inOut',
  fly: 'power3.inOut',
  soft: 'power1.inOut',
} as const;

/**
 * Scene timing markers (seconds) — follows the brand brief precisely.
 * 0.0 pure black · 0.5 light · 1.2 orb · 2.0 rings · 2.7 morph
 * 3.3 sweep · 4.0 brand · 4.8 tagline · 5.5 reveal · 6.0 fly · 6.5 live
 */
export const INTRO_SCENES = {
  pause: 0.0,
  glowAppear: 0.5,
  orbExpand: 1.2,
  ringsAppear: 2.0,
  morphStart: 2.7,
  lightSweep: 3.3,
  brandTitle: 4.0,
  brandSubtitle: 4.35,
  taglineStart: 4.8,
  revealStart: 5.5,
  flyToNav: 6.0,
  overlayExit: 6.7,
} as const;

/** Hard fallback timeout (seconds) — forces completion if GSAP never fires */
export const INTRO_TOTAL_DURATION = 7.4;

/** Glass orb display size before it morphs into the logo */
export const INTRO_ORB_SIZE = 152;

/** Intro logo display size before flying to the navbar */
export const INTRO_LOGO_SIZE = 138;

/** Navbar logo target size */
export const NAVBAR_LOGO_SIZE = 52;

