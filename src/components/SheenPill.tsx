import type { ReactNode } from 'react';

/**
 * A quiet dark pill with a periodic sheen sweep.
 * Recreated from the documented "shiny pill" pattern on originkit.dev
 * (their registry was unreachable from this environment, so no code was copied).
 * The sheen is disabled under prefers-reduced-motion via CSS.
 */
export function SheenPill({ children }: { children: ReactNode }) {
  return (
    <span className="sheen-pill">
      <span className="dot" aria-hidden="true" />
      {children}
    </span>
  );
}
