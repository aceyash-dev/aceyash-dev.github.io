import type { CSSProperties, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  y?: number;
  amount?: number;
  once?: boolean;
};

export function Reveal({
  children,
  className,
  style,
  delay = 0,
  y = 24,
  amount = 0.22,
  once = true
}: RevealProps) {
  const reducedMotion = Boolean(useReducedMotion());

  return (
    <motion.div
      className={className}
      style={style}
      initial={reducedMotion ? false : { opacity: 0, y, filter: 'blur(12px)' }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, amount }}
      transition={{ duration: 0.78, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
