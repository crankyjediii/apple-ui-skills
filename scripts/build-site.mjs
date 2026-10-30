#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const siteDir = join(root, '_site');

mkdirSync(siteDir, { recursive: true });

// Copy tokens to root
copyFileSync(
  join(root, 'skills/apple-ui-web/references/tokens.css'),
  join(siteDir, 'tokens.css')
);
copyFileSync(
  join(root, 'skills/apple-ui-web/references/tailwind-theme.css'),
  join(siteDir, 'tailwind-theme.css')
);

// Read demo html
let html = readFileSync(join(root, 'examples/web-demo/index.html'), 'utf8');

// Replace relative path for root deployment
html = html.replace(
  '../../skills/apple-ui-web/references/tokens.css',
  './tokens.css'
);

// Write root index.html
writeFileSync(join(siteDir, 'index.html'), html, 'utf8');

// Disable Jekyll processing on GitHub Pages
writeFileSync(join(siteDir, '.nojekyll'), '', 'utf8');

// Also preserve original examples/web-demo relative structure
mkdirSync(join(siteDir, 'examples/web-demo'), { recursive: true });
copyFileSync(
  join(root, 'examples/web-demo/index.html'),
  join(siteDir, 'examples/web-demo/index.html')
);

mkdirSync(join(siteDir, 'skills/apple-ui-web/references'), { recursive: true });
copyFileSync(
  join(root, 'skills/apple-ui-web/references/tokens.css'),
  join(siteDir, 'skills/apple-ui-web/references/tokens.css')
);
copyFileSync(
  join(root, 'skills/apple-ui-web/references/tailwind-theme.css'),
  join(siteDir, 'skills/apple-ui-web/references/tailwind-theme.css')
);

console.log('ok: _site built successfully for GitHub Pages');
