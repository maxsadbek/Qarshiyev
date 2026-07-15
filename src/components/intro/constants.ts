/** Session key — intro plays once per browser tab session */
export const INTRO_STORAGE_KEY = 'qarshiyev_intro_seen';

/** Brand palette for the cinematic intro */
export const INTRO_COLORS = {
  white: '#FFFFFF',
  primary: '#8A2BE2',
  accent: '#00D4FF',
  primarySoft: 'rgba(138, 43, 226, 0.15)',
  accentSoft: 'rgba(0, 212, 255, 0.12)',
} as const;

/** Premium easing curves — matches site-wide [0.22, 1, 0.36, 1] feel */
export const INTRO_EASE = {
  premium: 'power3.inOut',
  reveal: 'power2.out',
  morph: 'power4.inOut',
  fly: 'power3.inOut',
} as const;

/** Total intro duration in seconds */
export const INTRO_TOTAL_DURATION = 4.5;

/** Scene timing markers (seconds) */
export const INTRO_SCENES = {
  pause: 0.4,
  glowAppear: 0.4,
  networkExpand: 0.7,
  networkDraw: 0.85,
  rotation3d: 1.5,
  symbolsFlash: 1.6,
  morphStart: 2.3,
  logoReveal: 2.65,
  lightSweep: 3.1,
  typography: 3.25,
  flyToNav: 3.75,
  overlayExit: 4.2,
} as const;

/** Intro logo display size before flying to navbar */
export const INTRO_LOGO_SIZE = 148;

/** Navbar logo target size */
export const NAVBAR_LOGO_SIZE = 52;
