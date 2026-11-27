import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'motion/react';

type BlurFadeProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
};

/**
 * MagicUI BlurFade: smooth blur-to-sharp entrance animation.
 */
export function BlurFade({
  children,
  delay = 0,
  duration = 0.45,
  yOffset = 10,
  className = ''
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: yOffset, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: yOffset, filter: 'blur(6px)' }}
      transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
