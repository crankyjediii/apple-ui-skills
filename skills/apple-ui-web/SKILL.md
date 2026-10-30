---
name: apple-ui-web
description: Build Apple-style interfaces for the web with Next.js/React, Tailwind and plain CSS, covering system colors, text styles, Liquid Glass-like materials, switches, segmented controls, tab bars and sheets that follow Apple HIG principles. Use when asked for iOS/macOS/visionOS/watchOS-looking web UI, web mock-ups of Apple apps, or to port a kit component to the web.
---

# Apple-style UI for the web

Start with `apple-ui-core` and the platform skill to identify the component and its states.

## Licensing note (tell the user)

The Apple kits are licensed for mock-ups of **Apple-OS software**. A website is not Apple-OS software. So this skill builds from public HIG principles and the tokens in `references/tokens.css`, and **does not copy kit artwork or pixel measurements** from the kits. The result is an approximation. Do not use SF Pro or SF Symbols files on the web; use the system font stack and your own or licensed icons. Do not imply Apple endorsement.

## Rules

1. **Native HTML first**: `<button>`, `<input type="checkbox" role="switch">`, `<input type="range">`, `<select>`, `<dialog>`, `<details>`. Style them; do not replace them with `div`s.
2. **Tokens, not literals.** Import `references/tokens.css`; use `var(--label)`, `var(--bg)`, `var(--tint)`, `var(--text-body)`. Dark mode is automatic through `prefers-color-scheme`.
3. **Font**: `font-family: var(--font)` resolves to `-apple-system, system-ui`. It renders SF on Apple devices and a system font elsewhere. Never `@font-face` SF.
4. **Materials**: use the `.glass` / `.material-*` classes. Glass only for floating controls (tab bar, toolbar, sheet grabber area), never for content cards. Provide the opaque fallback for `prefers-reduced-transparency` and for browsers without `backdrop-filter` (already in tokens.css).
5. **States**: implement `:hover`, `:active`, `:focus-visible`, `:disabled`, `[aria-pressed]`, `[aria-selected]`, not one class per kit variant.
6. **Motion**: spring-like ease (`--ease-spring`), 200-350 ms; wrap in `@media (prefers-reduced-motion: reduce)`.
7. **Next.js**: components are server components by default; add `"use client"` only for stateful controls (switch, segmented, sheet). Use `next/font` only for fonts you are licensed to ship.
8. **Touch targets** at least 44 px on touch devices; focus rings visible.

## Platform flavor

| Platform look | Layout cues |
|---|---|
| iOS / iPadOS | Large title that collapses, grouped inset lists, floating glass tab bar at bottom, bottom sheets with grabber |
| macOS | Window chrome with toolbar, sidebar + content, compact controls (28 px high), menu-like popovers, visible hover |
| visionOS | Large rounded glass panels, generous spacing, 60 px targets, strong hover highlight |
| watchOS | Single column, full-width pill buttons, big type, no hover |

## Tailwind

Map tokens in Tailwind v4 with `@theme { --color-tint: var(--tint); --color-label: var(--label); ... }` after importing `tokens.css`, or use `bg-[var(--bg)]` arbitrary values. See `references/recipes.md` for components.

## Verify

- Load the page in light and dark, with `prefers-reduced-transparency` and `prefers-reduced-motion` emulated.
- Keyboard-only pass: every control reachable, focus visible, switches toggle with Space.
- Say which parts are approximations of the native control.
