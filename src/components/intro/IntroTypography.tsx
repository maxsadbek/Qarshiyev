import { forwardRef, type CSSProperties } from 'react';
import { INTRO_COLORS } from './constants';

interface IntroTypographyProps {
  className?: string;
  style?: CSSProperties;
}

/**
 * Brand lockup shown after the emblem settles.
 *  - "QARSHIYEV"  elegant serif, wide tracking, white highlight
 *  - "Education Center" thin sans-serif, 75% opacity
 *  - "Learn. Create. Lead." staggered, one word at a time
 * Each piece is animated independently by the GSAP timeline (no bounce).
 */
export const IntroTypography = forwardRef<HTMLDivElement, IntroTypographyProps>(
  ({ className, style }, ref) => {
    return (
      <div
        ref={ref}
        className={className}
        style={{ willChange: 'opacity, transform', ...style }}
        aria-hidden="true"
      >
        <h1
          className="intro-brand-title font-serif text-center uppercase"
          style={{
            fontSize: 'clamp(1.7rem, 4.6vw, 2.6rem)',
            color: INTRO_COLORS.highlight,
            letterSpacing: '0.42em',
            fontWeight: 700,
            marginRight: '-0.42em',
            textShadow: '0 0 28px rgba(138,43,226,0.35)',
          }}
        >
          QARSHIYEV
        </h1>

        <p
          className="intro-brand-subtitle font-sans text-center mt-4"
          style={{
            fontSize: 'clamp(0.78rem, 2vw, 0.95rem)',
            color: INTRO_COLORS.highlight,
            opacity: 0.75,
            letterSpacing: '0.34em',
            fontWeight: 300,
            marginRight: '-0.34em',
          }}
        >
          Education Center
        </p>

        <div
          className="intro-brand-tagline flex items-center justify-center gap-5 mt-7"
          style={{ fontSize: 'clamp(0.7rem, 1.6vw, 0.85rem)' }}
        >
          {['Learn.', 'Create.', 'Lead.'].map((word, i) => (
            <span
              key={word}
              className="intro-tag-word font-sans font-medium"
              data-index={i}
              style={{
                color: INTRO_COLORS.secondary,
                letterSpacing: '0.16em',
                opacity: 0,
                willChange: 'opacity, transform',
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    );
  },
);

IntroTypography.displayName = 'IntroTypography';

