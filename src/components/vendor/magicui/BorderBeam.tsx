import type { CSSProperties } from 'react';

type BorderBeamProps = {
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  borderWidth?: number;
  className?: string;
};

export function BorderBeam({
  size = 240,
  duration = 10,
  delay = 0,
  colorFrom = '#f07836',
  colorTo = '#fde2cc',
  borderWidth = 1.5,
  className = ''
}: BorderBeamProps) {
  const style = {
    '--beam-size': `${size}px`,
    '--beam-duration': `${duration}s`,
    '--beam-delay': `${-delay}s`,
    '--beam-from': colorFrom,
    '--beam-to': colorTo,
    '--beam-width': `${borderWidth}px`
  } as CSSProperties;

  return <span className={`magic-border-beam ${className}`.trim()} style={style} aria-hidden="true" />;
}
