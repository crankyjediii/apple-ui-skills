#!/usr/bin/env node
import { mkdirSync, writeFileSync, copyFileSync, cpSync, rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const root = fileURLToPath(new URL('..', import.meta.url));
const siteDir = join(root, '_site');
const websiteDir = join(root, 'apple-ui-skills-website');
const websiteOut = join(websiteDir, 'out');

// 1. Build Next.js website
console.log('Building apple-ui-skills-website (Next.js export)...');
if (!existsSync(join(websiteDir, 'node_modules'))) {
  console.log('Installing website dependencies...');
  execSync('npm ci', { cwd: websiteDir, stdio: 'inherit' });
}
execSync('npm run build', { cwd: websiteDir, stdio: 'inherit' });

// 2. Prepare _site directory
if (existsSync(siteDir)) {
  rmSync(siteDir, { recursive: true, force: true });
}
mkdirSync(siteDir, { recursive: true });

// 3. Copy Next.js exported site into _site
cpSync(websiteOut, siteDir, { recursive: true });

// 4. Disable Jekyll processing on GitHub Pages so _next directory is served
writeFileSync(join(siteDir, '.nojekyll'), '', 'utf8');

// 5. Copy direct CSS tokens & Tailwind theme for external references
copyFileSync(
  join(root, 'skills/apple-ui-web/references/tokens.css'),
  join(siteDir, 'tokens.css')
);
copyFileSync(
  join(root, 'skills/apple-ui-web/references/tailwind-theme.css'),
  join(siteDir, 'tailwind-theme.css')
);

// 6. Also preserve legacy web-demo at /examples/web-demo/
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

console.log('ok: _site built successfully from apple-ui-skills-website for GitHub Pages');
