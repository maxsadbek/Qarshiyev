import React from 'react';
import { cn } from '@/utils';

interface SectionHeaderProps {
  overline?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  inverted?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  overline,
  title,
  titleAccent,
  description,
  align = 'center',
  className,
  inverted = false,
}) => {
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div className={cn('flex flex-col gap-3', alignClasses[align], className)}>
      {overline && (
        <div className="flex items-center gap-2">
          {align === 'center' && <div className="w-8 h-px bg-violet-500" />}
          <span
            className={cn(
              'text-xs font-bold tracking-widest uppercase',
              inverted ? 'text-violet-400' : 'text-violet-600'
            )}
          >
            {overline}
          </span>
          {align === 'center' && <div className="w-8 h-px bg-violet-500" />}
          {align === 'left' && <div className="w-8 h-px bg-violet-500" />}
        </div>
      )}
      <h2
        className={cn(
          'text-4xl md:text-5xl font-serif font-bold leading-tight',
          inverted ? 'text-white' : 'text-slate-950'
        )}
      >
        {title}
        {titleAccent && (
          <>
            {' '}
            <span className="gold-shimmer">{titleAccent}</span>
          </>
        )}
      </h2>
      {description && (
        <p
          className={cn(
            'text-base md:text-lg leading-relaxed max-w-2xl',
            inverted ? 'text-slate-300' : 'text-slate-500',
            align === 'center' && 'mx-auto'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};

