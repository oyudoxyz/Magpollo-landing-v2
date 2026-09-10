// Build-time prerender. Runs after `vite build` and the SSR build:
//   dist/index.html is the template; each route becomes dist/<route>/index.html
//   with real markup in #root and its own head. The client hydrates on load.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const { render, PAGES, PRERENDER_ROUTES } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href);

const template = readFileSync(resolve(dist, 'index.html'), 'utf8');
if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
  throw new Error('index.html is missing the <!--app-head--> / <!--app-html--> markers');
}

function write(page, file) {
  const { html, head } = render(page);
  const out = template.replace('<!--app-head-->', head).replace('<!--app-html-->', html);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, out);
  console.log('prerendered', page.path, '→', file.replace(dist, 'dist'));
}

for (const page of PRERENDER_ROUTES) {
  const file = page.path === '/' ? resolve(dist, 'index.html') : resolve(dist, page.path.slice(1), 'index.html');
  write(page, file);
}
write(PAGES.notFound, resolve(dist, '404.html'));

// The SSR bundle is a build tool, not a deliverable.
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true });
