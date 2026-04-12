'use client';
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Declare all motion elements at module scope (never inside render) to
// satisfy the react-hooks/static-components ESLint rule.
const MOTION = {
  p:       motion.p,
  span:    motion.span,
  div:     motion.div,
  h1:      motion.h1,
  h2:      motion.h2,
  h3:      motion.h3,
  h4:      motion.h4,
  h5:      motion.h5,
  h6:      motion.h6,
  a:       motion.a,
  button:  motion.button,
  section: motion.section,
  article: motion.article,
  li:      motion.li,
} as const;

type MotionTag = keyof typeof MOTION;

interface TextShimmerProps {
  children: string;
  as?: MotionTag;
  className?: string;
  duration?: number;
  spread?: number;
}

export function TextShimmer({
  children,
  as: tag = 'p',
  className,
  duration = 2,
  spread = 2,
}: TextShimmerProps) {
  const MotionComponent = MOTION[tag];

  const dynamicSpread = useMemo(() => {
    return children.length * spread;
  }, [children, spread]);

  return (
    <MotionComponent
      className={cn(
        'relative inline-block bg-[length:250%_100%,auto] bg-clip-text',
        'text-transparent [--base-color:#a1a1aa] [--base-gradient-color:#000]',
        '[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box]',
        'dark:[--base-color:#71717a] dark:[--base-gradient-color:#ffffff] dark:[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))]',
        className
      )}
      initial={{ backgroundPosition: '100% center' }}
      animate={{ backgroundPosition: '0% center' }}
      transition={{
        repeat: Infinity,
        duration,
        ease: 'linear',
      }}
      style={
        {
          '--spread': `${dynamicSpread}px`,
          backgroundImage: `var(--bg), linear-gradient(var(--base-color), var(--base-color))`,
        } as React.CSSProperties
      }
    >
      {children}
    </MotionComponent>
  );
}
