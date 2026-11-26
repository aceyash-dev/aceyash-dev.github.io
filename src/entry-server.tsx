import { renderToString } from 'react-dom/server';
import App from './App';

/**
 * SSR entry used only by scripts/prerender.mjs to bake static HTML
 * into dist/index.html at build time. Never shipped to the browser.
 */
export function render(): string {
  return renderToString(<App />);
}
