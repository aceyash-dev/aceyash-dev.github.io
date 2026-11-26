import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const root = process.cwd();

/**
 * The repository predates Vite and keeps a handful of canonical files and the
 * standalone widgets at the project root. Vite serves those directly in dev;
 * this plugin carries them into the production bundle so GitHub Pages and
 * Vercel keep every existing URL working.
 */
function copyLegacyAssets(): Plugin {
  return {
    name: 'copy-legacy-assets',
    apply: 'build',
    closeBundle() {
      const outDir = resolve(root, 'dist');
      mkdirSync(outDir, { recursive: true });

      const files = [
        'bg.jpg',
        'me.jpg',
        'robots.txt',
        'sitemap.xml',
        'llms.txt',
        'llms-full.txt',
        'skills.md',
        'CNAME'
      ];

      for (const file of files) {
        const from = resolve(root, file);
        if (existsSync(from)) cpSync(from, resolve(outDir, file));
      }

      const directories = ['widgets'];
      for (const directory of directories) {
        const from = resolve(root, directory);
        if (existsSync(from)) cpSync(from, resolve(outDir, directory), { recursive: true });
      }

      // GitHub Pages should never run the built output through Jekyll.
      writeFileSync(resolve(outDir, '.nojekyll'), '');
    }
  };
}

export default defineConfig({
  plugins: [react(), copyLegacyAssets()],
  publicDir: 'public',
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: true
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    target: 'es2020'
  }
});
