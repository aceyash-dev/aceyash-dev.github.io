import type { ReactNode } from 'react';
import ShinyText from './vendor/reactbits/ShinyText';

/** Dark pill with the ReactBits ShinyText sheen (replaces the hand-rolled sheen). */
export function SheenPill({ children }: { children: ReactNode }) {
  return (
    <span className="sheen-pill">
      <span className="dot" aria-hidden="true" />
      <ShinyText color="#f7f4ec" shineColor="#f07836" speed={3} delay={2}>
        {children}
      </ShinyText>
    </span>
  );
}
