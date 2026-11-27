import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

type NumberTickerProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  durationMs?: number;
  className?: string;
};

export function NumberTicker({
  value,
  suffix = '',
  prefix = '',
  durationMs = 900,
  className = ''
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState<number>(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setDisplay(value);
      hasAnimated.current = true;
      return;
    }

    hasAnimated.current = true;
    const start = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    setDisplay(0);
    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [isInView, value, durationMs]);

  return (
    <span ref={ref} className={`magic-number-ticker ${className}`.trim()}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
