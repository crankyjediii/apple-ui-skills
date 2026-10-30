# Apple UI Skills — Marketing Website

Single-page marketing website for [Apple UI Skills](https://github.com/crankyjediii/apple-ui-skills), built with Next.js (App Router, TypeScript) as a static export, styled using the official `apple-ui-web` tokens and recipes.

- **Production URL**: [https://crankyjediii.github.io/apple-ui-skills/](https://crankyjediii.github.io/apple-ui-skills/)
- **Upstream Repository**: [crankyjediii/apple-ui-skills](https://github.com/crankyjediii/apple-ui-skills)
- **License**: MIT (Prose and Code)

---

## Features

- **Apple Design Language**: Implements Liquid Glass materials strictly on floating controls and navigation, solid grouped inset cards for content, system font stack (`-apple-system, system-ui`), and spring motion.
- **Automatic & Manual Appearance**: Adapts automatically to system light/dark mode (`color-scheme: light dark`), with an interactive client-side theme switcher.
- **Accessible (100% Lighthouse)**: Touch targets ≥ 44pt (60pt for visionOS), WCAG AA color contrast, visible focus rings, native `<dialog class="sheet">` with grabber and escape traps, and complete `prefers-reduced-motion` / `prefers-reduced-transparency` fallbacks.
- **10 Complete Sections**:
  1. Sticky Liquid Glass navigation bar with brand, badge, and links.
  2. Hero with large title, one-sentence subhead, tabbed install command, and ambient gradient.
  3. Three Core Pillars (Design, Build, Audit) with original CSS/SVG illustrations.
  4. Platform Showcase with interactive segmented control covering iOS, macOS, visionOS, and watchOS.
  5. 3-step Quick Start guide with interactive terminal simulator.
  6. 12-skill modular grid; tapping any card opens a native dialog sheet with details.
  7. Ready-to-paste prompt cards with one-click clipboard copying.
  8. Verified proof points (Xcode 26 SDK CI type-checks) and Honest Limits.
  9. Native `<details>` FAQ accordion.
  10. Final Call to Action and legal disclaimer footer linking to `NOTICE.md`.

---

## Quick Start & Local Development

### 1. Prerequisites
- Node.js 18.18.0 or newer
- npm 9+ or bun

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build static export
```bash
npm run build
```
The optimized static HTML, CSS, JavaScript, and assets are output to the `out/` directory.

---

## One-Line Configuration Changes

All project metadata and skill definitions are centralized in `src/data/` for clean, single-line updates:

### Updating the Version Number (One Line)
Open [`src/data/project.ts`](src/data/project.ts) and edit line 3:
```ts
export const PROJECT = {
  version: "0.2.0", // <-- Change version here
  ...
};
```
This automatically updates the header badge, hero pill, command copy strings, and footer metadata across the entire website.

### Adding or Updating Skills (One Line per Skill)
Open [`src/data/skills.ts`](src/data/skills.ts) and add or modify an entry in the `SKILLS` array:
```ts
{ id: "apple-ui-new", name: "apple-ui-new", oneLiner: "One line description.", category: "Platform Kits", ... }
```
The grid, search filters, and sheet detail dialogs update automatically.

---

## Deploying to Vercel

### Option A: Via Vercel CLI (Recommended)
```bash
npm i -g vercel
vercel
```
When prompted:
- **Framework Preset**: Next.js
- **Build Command**: `next build`
- **Output Directory**: `out`

### Option B: Via Git Integration (Vercel Dashboard)
1. Push this repository to GitHub or GitLab.
2. In the [Vercel Dashboard](https://vercel.com/new), import the repository.
3. Vercel automatically detects Next.js.
4. Set the Root Directory if deploying from a subfolder.
5. Click **Deploy**.

---

## Lighthouse Scores

Audit verified with Lighthouse 13.6 against production build:

| Metric | Score | Target |
|---|---|---|
| **Performance** | **98** / 100 | ≥ 95 |
| **Accessibility** | **100** / 100 | ≥ 95 |
| **Best Practices** | **100** / 100 | ≥ 95 |
| **SEO** | **100** / 100 | ≥ 95 |

---

## Legal & Trademarks

This open-source project is independent and is **not affiliated with, sponsored by, or endorsed by Apple Inc.**

Contains **no Apple Design Resources artwork**: no exported images, SVGs, screenshots, Figma file data, font files, or SF Symbols.

Apple, iOS, iPadOS, macOS, visionOS, watchOS, SF Symbols, Face ID, Liquid Glass and related marks are trademarks of Apple Inc. Figma is a trademark of Figma, Inc.
See [`NOTICE.md`](https://github.com/crankyjediii/apple-ui-skills/blob/main/NOTICE.md) for full licensing information.
