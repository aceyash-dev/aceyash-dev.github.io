#!/usr/bin/env node
/**
 * Post-build prerender: bakes the React app's static markup into
 * dist/index.html so the page is fully readable without JavaScript
 * (crawlers, AI answer engines, and the no-JS experience).
 *
 * Runs automatically as part of `npm run build`.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const ssrDir = resolve(root, '.dist-ssr');
const distIndex = resolve(root, 'dist', 'index.html');

if (!existsSync(distIndex)) {
  console.error('[prerender] dist/index.html not found — run `vite build` first.');
  process.exit(1);
}

console.log('[prerender] building SSR bundle…');
rmSync(ssrDir, { recursive: true, force: true });

try {
  execFileSync(
    process.execPath,
    [resolve(root, 'node_modules/vite/bin/vite.js'), 'build', '--ssr', 'src/entry-server.tsx', '--outDir', '.dist-ssr', '--logLevel', 'error'],
    { stdio: 'inherit' }
  );
} catch (error) {
  console.error('[prerender] SSR bundle failed; keeping client-only build.');
  process.exit(1);
}

const { render } = await import(resolve(ssrDir, 'entry-server.js'));
const appHtml = render();

if (!appHtml || appHtml.length < 500) {
  console.error('[prerender] suspiciously small render output — aborting injection.');
  process.exit(1);
}

const template = readFileSync(distIndex, 'utf8');
const marker = '<div id="root"></div>';

if (!template.includes(marker)) {
  console.error('[prerender] root marker not found in dist/index.html');
  process.exit(1);
}

const out = template.replace(marker, `<div id="root">${appHtml}</div>`);
writeFileSync(distIndex, out);

rmSync(ssrDir, { recursive: true, force: true });
console.log(`[prerender] injected ${appHtml.length.toLocaleString()} chars of static markup into dist/index.html`);
