import type { HTMLAttributes } from 'react';

type M3eProps = HTMLAttributes<HTMLElement> & {
  [attribute: string]: unknown;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'm3e-theme': M3eProps;
      'm3e-button': M3eProps;
      'm3e-card': M3eProps;
      'm3e-expansion-panel': M3eProps;
    }
  }
}

export {};
