import { forwardRef } from 'react';
import { INTRO_COLORS } from './constants';

interface IntroTypographyProps {
  className?: string;
}

/**
 * Scene 5 typography — brand name, subtitle, and tagline.
 * Fades in with premium easing, no typing or bounce effects.
 */
export const IntroTypography = forwardRef<HTMLDivElement, IntroTypographyProps>(
  ({ className }, ref) => {
    return (
      <div
        ref={ref}
        className={className}
        style={{ willChange: 'opacity, transform' }}
        aria-hidden="true"
      >
        <h1
          className="intro-brand-title font-sans font-bold tracking-[0.35em] text-center uppercase"
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
            color: INTRO_COLORS.primary,
            letterSpacing: '0.35em',
          }}
        >
          QARSHIYEV
        </h1>

        <p
          className="intro-brand-subtitle font-sans text-center mt-3"
          style={{
            fontSize: 'clamp(0.75rem, 2vw, 0.95rem)',
            color: 'rgba(138, 43, 226, 0.55)',
            letterSpacing: '0.2em',
          }}
        >
          Education Center
        </p>

        <div
          className="intro-brand-tagline flex items-center justify-center gap-6 mt-6"
          style={{ fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)' }}
        >
          {['Learn.', 'Create.', 'Lead.'].map((word) => (
            <span
              key={word}
              className="font-sans font-medium"
              style={{ color: 'rgba(0, 0, 0, 0.35)', letterSpacing: '0.08em' }}
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
