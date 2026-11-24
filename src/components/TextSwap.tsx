import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

type Phase = 'idle' | 'exit' | 'enter';

type TextSwapProps = {
  words: readonly string[];
  className?: string;
  intervalMs?: number;
};

export function TextSwap({ words, className = '', intervalMs = 2800 }: TextSwapProps) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const reducedMotion = Boolean(useReducedMotion());

  useEffect(() => {
    if (reducedMotion || words.length < 2) return undefined;

    let exitTimer = 0;
    let frameOne = 0;
    let frameTwo = 0;

    const interval = window.setInterval(() => {
      setPhase('exit');

      exitTimer = window.setTimeout(() => {
        setIndex((current) => (current + 1) % words.length);
        setPhase('enter');

        // Let the browser paint the no-transition start state, then release it
        // so the enter transition actually plays.
        frameOne = requestAnimationFrame(() => {
          frameTwo = requestAnimationFrame(() => setPhase('idle'));
        });
      }, 150);
    }, intervalMs);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(exitTimer);
      cancelAnimationFrame(frameOne);
      cancelAnimationFrame(frameTwo);
    };
  }, [reducedMotion, words.length, intervalMs]);

  const phaseClass = phase === 'exit' ? 'is-exit' : phase === 'enter' ? 'is-enter-start' : '';

  return (
    <span className={`text-swap-host${className ? ` ${className}` : ''}`}>
      <span className="sr-only">{words[0]}</span>
      <span className={`t-text-swap ${phaseClass}`} aria-hidden="true">
        {words[index]}
      </span>
    </span>
  );
}
