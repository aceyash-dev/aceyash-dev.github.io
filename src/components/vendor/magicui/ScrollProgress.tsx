import { motion, useScroll, useSpring } from 'motion/react';

/**
 * MagicUI ScrollProgress: top-edge reading progress bar driven by scroll position.
 */
export function ScrollProgress({ className = '' }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001
  });

  return (
    <motion.div
      className={`magic-scroll-progress ${className}`.trim()}
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
