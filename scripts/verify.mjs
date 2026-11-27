#!/usr/bin/env node
/**
 * Post-build verification gate. Asserts the production artifact is
 * complete and internally consistent — fails the build otherwise.
 */
import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const dist = (p) => resolve(root, 'dist', p);

const failures = [];
const check = (label, condition) => {
  if (condition) {
    console.log(`  ok    ${label}`);
  } else {
    failures.push(label);
    console.error(`  FAIL  ${label}`);
  }
};

console.log('[verify] dist artifact…');

// 1. Entry document
const indexPath = dist('index.html');
check('dist/index.html exists', existsSync(indexPath));
const html = existsSync(indexPath) ? readFileSync(indexPath, 'utf8') : '';

// 2. Prerendered content
const rootMatch = html.match(/<div id="root">([\s\S]*?)<\/div>\s*<noscript>/);
check('root contains prerendered markup', Boolean(rootMatch && rootMatch[1].length > 20000));
for (const marker of ['id="work"', 'id="activity"', 'id="ace-base"', 'id="about"', 'id="skills"', 'id="contact"', 'The Ace Base', 'Who is Ace Yash?']) {
  check(`markup contains ${marker}`, html.includes(marker));
}

// 3. SEO fundamentals
check('title present', /<title>Ace Yash/.test(html));
check('canonical present', html.includes('<link rel="canonical" href="https://aceyash-dev.github.io/" />'));
check('meta description present', html.includes('name="description"'));
check('theme-color present', html.includes('name="theme-color" content="#F7F4EC"'));
check('single h1', (html.match(/<h1/g) || []).length === 1);

// 4. JSON-LD
const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
check('JSON-LD block present', Boolean(ld));
let graph = [];
try {
  graph = JSON.parse(ld[1])['@graph'] ?? [];
  check('JSON-LD parses', true);
} catch {
  check('JSON-LD parses', false);
}
const types = graph.map((node) => node['@type']);
for (const t of ['Person', 'Organization', 'WebSite', 'ProfilePage', 'SoftwareSourceCode', 'FAQPage']) {
  check(`JSON-LD has ${t}`, types.includes(t));
}
const person = graph.find((n) => n['@type'] === 'Person');
const org = graph.find((n) => n['@type'] === 'Organization');
if (person && org) {
  check('Person.worksFor points at The Ace Base', person.worksFor?.['@id'] === org['@id']);
  check('Organization.founder points at person', org.founder?.['@id'] === person['@id']);
  check('Person sameAs verified profiles', ['https://github.com/aceyash-dev', 'https://www.instagram.com/yash.hits', 'https://ace-base.cc/'].every((s) => person.sameAs?.includes(s)));
}
const faq = graph.find((n) => n['@type'] === 'FAQPage');
check('FAQPage has 7 questions', faq?.mainEntity?.length === 7);
if (faq) {
  for (const q of faq.mainEntity) {
    check(`visible FAQ question: "${q.name}"`, html.includes(q.name));
  }
}

// 5. Static discovery files
for (const file of ['llms.txt', 'llms-full.txt', 'robots.txt', 'sitemap.xml', 'favicon.svg', 'me.jpg', 'bg.jpg', 'widgets/index.html', '.nojekyll', 'skills.md']) {
  check(`dist/${file} exists`, existsSync(dist(file)));
}

// 6. Sitemap + robots content
const sitemap = existsSync(dist('sitemap.xml')) ? readFileSync(dist('sitemap.xml'), 'utf8') : '';
check('sitemap well-formed urlset', sitemap.includes('<urlset') && sitemap.includes('</urlset>'));
check('sitemap locs are canonical', [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].every((m) => m[1].startsWith('https://aceyash-dev.github.io/')));
const robots = existsSync(dist('robots.txt')) ? readFileSync(dist('robots.txt'), 'utf8') : '';
check('robots.txt references sitemap', robots.includes('Sitemap: https://aceyash-dev.github.io/sitemap.xml'));
check('robots.txt allows crawling', /User-agent: \*\s*\nAllow: \//.test(robots));

// 7. No leaked local URLs or secrets
check('no localhost URLs in artifact', !/localhost|127\.0\.0\.1/.test(html));

// 8. Payload weight sanity
const js = html.match(/\/assets\/index-[^"]+\.js/);
if (js) {
  const size = statSync(dist(js[0].slice(1))).size;
  check(`JS bundle under 450 KB (actual ${(size / 1024).toFixed(0)} KB)`, size < 450 * 1024);
}

if (failures.length) {
  console.error(`\n[verify] ${failures.length} check(s) failed.`);
  process.exit(1);
}
console.log('\n[verify] all checks passed.');
