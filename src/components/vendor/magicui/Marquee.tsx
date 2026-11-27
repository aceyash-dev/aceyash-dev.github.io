import type { CSSProperties, ReactNode } from 'react';

type MarqueeProps = {
  children: ReactNode;
  reverse?: boolean;
  pauseOnHover?: boolean;
  duration?: string;
  gap?: string;
  repeat?: number;
  className?: string;
};

export function Marquee({
  children,
  reverse = false,
  pauseOnHover = true,
  duration = '32s',
  gap = '1.25rem',
  repeat = 3,
  className = ''
}: MarqueeProps) {
  const style = {
    '--marquee-duration': duration,
    '--marquee-gap': gap
  } as CSSProperties;

  return (
    <div
      className={`magic-marquee ${pauseOnHover ? 'magic-marquee--pause' : ''} ${className}`.trim()}
      style={style}
      aria-hidden="true"
    >
      {Array.from({ length: repeat }).map((_, index) => (
        <div
          key={index}
          className={`magic-marquee__track ${reverse ? 'magic-marquee__track--reverse' : ''}`}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
