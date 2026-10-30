# Apple UI Skills — 30s motion ad

Programmatic, frame-exact ad: one HTML scene (`index.html`) driven by a shared timeline (`timeline.js`),
captured frame by frame with `puppeteer-core` + your installed Chrome, encoded with ffmpeg. Sound is synthesized in
`scripts/make-audio.mjs` from the same timeline, so cues stay locked to picture.

```bash
npm install          # puppeteer-core only (uses your installed Chrome; set CHROME_PATH to override)
npm run dev          # live preview at http://localhost:4321  (?size=square for 1:1)
npm run render       # out/apple-ui-skills-ad.mp4, out/apple-ui-skills-ad.gif, out/apple-ui-skills-ad-square.mp4
npm run render:stills  # key-frame PNGs in out/ for quick review
```

Requires Node 18+, Chrome/Chromium, and ffmpeg (`brew install ffmpeg`). Full render takes a few minutes.
The render fails loudly if the encoded frame count doesn't equal 1800.

| Time | Scene |
|---|---|
| 0:00–0:05 | The problem: agent writes outdated UIKit, glitch banner, shake, desaturate |
| 0:05–0:09 | Radial bloom, emblem spring drop, Liquid Glass capsule, kinetic headline |
| 0:09–0:19 | iOS (Dynamic Island → Live Activity), macOS (inspector), visionOS (ornaments), watchOS (crown carousel) |
| 0:19–0:24 | `npx skills add` terminal + Figma node → 12 lines of SwiftUI |
| 0:24–0:30 | Collapse into glowing install pill, CTA, URL, hold |

Timing lives in `timeline.js`; edit it and both picture and audio follow. Springs use SwiftUI's
`response`/`dampingFraction` model (default 0.32 / 0.76); fades use `cubic-bezier(0.16, 1, 0.3, 1)`.
The emblem and all UI are original drawings; no Apple artwork, SF Symbols, or emoji are embedded.
