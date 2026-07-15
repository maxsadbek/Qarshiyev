import { forwardRef, type CSSProperties } from 'react';
import { INTRO_COLORS } from './constants';

interface IntroLogoSvgProps {
  className?: string;
  style?: CSSProperties;
}

/**
 * Vector Qarshiyev emblem used for the morph + light-sweep animations.
 * A polished purple crystal disc with a stylised "Q" mark — matches the
 * official brand geometry and the glass orb it grows out of.
 */
export const IntroLogoSvg = forwardRef<SVGSVGElement, IntroLogoSvgProps>(
  ({ className, style }, ref) => {
    return (
      <svg
        ref={ref}
        className={className}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ willChange: 'transform, opacity', ...style }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="logoBgGrad" cx="36%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#b98bff" />
            <stop offset="34%" stopColor={INTRO_COLORS.primary} />
            <stop offset="72%" stopColor="#5b16a8" />
            <stop offset="100%" stopColor="#2a0a4d" />
          </radialGradient>
          <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={INTRO_COLORS.highlight} stopOpacity="0.85" />
            <stop offset="50%" stopColor={INTRO_COLORS.secondary} stopOpacity="0.7" />
            <stop offset="100%" stopColor={INTRO_COLORS.primary} stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="swirlGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor={INTRO_COLORS.secondary} stopOpacity="0.85" />
          </linearGradient>
          <clipPath id="logoCircleClip">
            <circle cx="100" cy="100" r="88" />
          </clipPath>
          <linearGradient id="lightSweepGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="45%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.45" />
            <stop offset="55%" stopColor="white" stopOpacity="0" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <filter id="logoShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor={INTRO_COLORS.primary} floodOpacity="0.4" />
          </filter>
        </defs>

        <g className="intro-logo-group" opacity="0" filter="url(#logoShadow)">
          {/* Outer rim glow */}
          <circle
            cx="100"
            cy="100"
            r="94"
            fill="none"
            stroke="url(#rimGrad)"
            strokeWidth="2"
            className="intro-logo-rim"
          />

          {/* Main crystal body */}
          <circle
            cx="100"
            cy="100"
            r="88"
            fill="url(#logoBgGrad)"
            className="intro-logo-body"
          />

          {/* Stylised "Q" swirl mark */}
          <g clipPath="url(#logoCircleClip)">
            <path
              className="intro-logo-swirl"
              d="M100 168 C62 168 38 136 43 100 C48 68 76 44 110 49 C132 52 148 66 152 82 C156 98 148 113 135 118 C123 123 108 116 105 102 C102 89 113 79 126 82 C139 85 149 100 146 116 C141 138 120 154 95 160 C85 163 78 170 82 177 C86 184 95 183 100 168 Z"
              fill="url(#swirlGrad)"
              opacity="0.92"
            />
            <path
              d="M132 56 C147 63 157 80 154 98 C150 118 130 133 109 135"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.55"
            />
          </g>

          {/* Glass reflection sweep */}
          <rect
            className="intro-light-sweep"
            x="-100"
            y="0"
            width="100"
            height="200"
            fill="url(#lightSweepGrad)"
            opacity="0"
          />
        </g>
      </svg>
    );
  },
);

IntroLogoSvg.displayName = 'IntroLogoSvg';
