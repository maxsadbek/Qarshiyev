import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  as?: 'button' | 'a';
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  children: React.ReactNode;
}

const variants = {
  primary:
    'bg-slate-950 text-white hover:bg-slate-800 shadow-sm hover:shadow-md',
  secondary:
    'bg-white text-slate-950 border border-slate-200 hover:border-slate-400 hover:bg-slate-50',
  outline:
    'bg-transparent text-slate-950 border-2 border-slate-950 hover:bg-slate-950 hover:text-white',
  ghost:
    'bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-950',
  gold:
    'bg-violet-500 text-white hover:bg-violet-600 shadow-sm hover:shadow-violet-200 hover:shadow-lg',
};

const sizes = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-sm gap-2',
  lg: 'px-8 py-3.5 text-base gap-2',
  xl: 'px-10 py-4 text-base gap-2.5',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  as: Tag = 'button',
  href,
  icon,
  iconPosition = 'right',
  loading = false,
  children,
  className,
  ...props
}) => {
  const classes = cn(
    'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer select-none',
    variants[variant],
    sizes[size],
    className
  );

  const content = (
    <>
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {icon && iconPosition === 'left' && <span>{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span>{icon}</span>}
    </>
  );

  if (Tag === 'a' || href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{}}
        whileTap={{}}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      whileHover={{}}
      whileTap={{}}
      {...(props as object)}
    >
      {content}
    </motion.button>
  );
};
