import { forwardRef } from 'react';
import { INTRO_COLORS } from './constants';

interface IntroLogoSvgProps {
  className?: string;
}

/**
 * Vector representation of the Qarshiyev logo for morph and light-sweep animations.
 * Simplified circular emblem with swirl — matches the official PNG aesthetic.
 */
export const IntroLogoSvg = forwardRef<SVGSVGElement, IntroLogoSvgProps>(
  ({ className }, ref) => {
    return (
      <svg
        ref={ref}
        className={className}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ willChange: 'transform, opacity' }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="logoBgGrad" cx="40%" cy="60%" r="65%">
            <stop offset="0%" stopColor="#4c1d95" />
            <stop offset="40%" stopColor={INTRO_COLORS.primary} />
            <stop offset="100%" stopColor="#1a0533" />
          </radialGradient>
          <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={INTRO_COLORS.accent} stopOpacity="0.9" />
            <stop offset="50%" stopColor={INTRO_COLORS.primary} stopOpacity="0.7" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="swirlGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#e9d5ff" stopOpacity="0.85" />
          </linearGradient>
          <clipPath id="logoCircleClip">
            <circle cx="100" cy="100" r="88" />
          </clipPath>
          <linearGradient id="lightSweepGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="45%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.35" />
            <stop offset="55%" stopColor="white" stopOpacity="0" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor={INTRO_COLORS.primary} floodOpacity="0.3" />
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

          {/* Main circular body */}
          <circle
            cx="100"
            cy="100"
            r="88"
            fill="url(#logoBgGrad)"
            className="intro-logo-body"
          />

          {/* Swirl emblem — stylized Q shape */}
          <g clipPath="url(#logoCircleClip)">
            <path
              className="intro-logo-swirl"
              d="M100 175 C60 175 35 140 40 100 C45 65 75 40 110 45 C130 48 145 60 150 75 C155 90 148 105 135 110 C122 115 108 108 105 95 C102 82 112 72 125 75 C138 78 148 92 145 108 C140 130 120 148 95 155 C85 158 78 165 82 172 C86 179 95 178 100 175 Z"
              fill="url(#swirlGrad)"
              opacity="0.95"
            />
            <path
              d="M130 55 C145 62 155 78 152 95 C148 115 128 130 108 132"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.6"
            />
          </g>

          {/* Light sweep overlay */}
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
