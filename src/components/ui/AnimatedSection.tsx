import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ANIMATION_VARIANTS } from '@/constants';
import { cn } from '@/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof ANIMATION_VARIANTS;
  delay?: number;
  once?: boolean;
  threshold?: number;
  as?: React.ElementType;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  variant = 'fadeUp',
  delay = 0,
  once = true,
  threshold = 0.1,
  as: Tag = 'div',
}) => {
  const { ref, inView } = useInView({ triggerOnce: once, threshold });

  const variantConfig = ANIMATION_VARIANTS[variant];
  const visibleWithDelay = {
    ...variantConfig.visible,
    transition: {
      ...(variantConfig.visible as { transition?: object }).transition,
      delay,
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{ hidden: variantConfig.hidden, visible: visibleWithDelay }}
    >
      <Tag>{children}</Tag>
    </motion.div>
  );
};

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  threshold?: number;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className,
  delay = 0,
  once = true,
  threshold = 0.1,
}) => {
  const { ref, inView } = useInView({ triggerOnce: once, threshold });

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof ANIMATION_VARIANTS;
}> = ({ children, className, variant = 'fadeUp' }) => {
  return (
    <motion.div
      className={cn(className)}
      variants={ANIMATION_VARIANTS[variant]}
    >
      {children}
    </motion.div>
  );
};

