---
name: apple-ui-core
description: Entry point for building UI with Apple's official 26-series design kits (macOS, iOS/iPadOS, visionOS, watchOS). Use when a task mentions Apple, iOS, iPadOS, macOS, visionOS, watchOS, Liquid Glass, HIG, "Apple-style" UI, or Apple UI kit components in Figma or code. Covers license guardrails, how to read the kits through the Figma MCP, and which platform and stack skill to load next.
---

# Apple UI kits: core workflow

Use this skill first. It routes to the platform skill (what the components are) and the stack skill (how to write them).

## Route

| Need | Load |
|---|---|
| iPhone / iPad components | `apple-ui-ios-ipados` |
| Mac components | `apple-ui-macos` |
| Apple Vision Pro components | `apple-ui-visionos` |
| Apple Watch components | `apple-ui-watchos` |
| Compose a design in Figma from kit components | `apple-ui-figma-build` |
| Turn a kit node or a user's design into code | `apple-ui-figma-to-code`, then a stack skill |
| Native code | `apple-ui-swiftui` |
| Next.js / React / CSS | `apple-ui-web` |
| React Native, Flutter, Compose, Vue, Svelte | `apple-ui-cross-platform` |
| Review existing UI against the kits | `apple-ui-audit` |
| First run, "is this working?", kit not readable | `apple-ui-setup` |

If the stack is not covered, map each kit component to that stack's closest native control, keep the semantic tokens below, and say what you approximated.

## License guardrails (always apply)

The kits are Apple Design Resources: licensed for **mock-ups of UIs for Apple-OS software only**. Do not:
- export, copy or commit kit artwork (PNG, SVG, screenshots, `.fig` data) into a repo, package or website;
- ship kit-derived assets in a shipped app or any non-Apple-OS product;
- bundle SF Pro or SF Symbols files. Reference them by name; users install them under Apple's separate terms.

Reading structure (names, variant axes, sizes, spacing) to guide your own implementation is the intended use. Write original code. When asked for a web/non-Apple-OS product, use the public HIG principles and the tokens in `apple-ui-web`, not kit artwork, and tell the user the look is an approximation.

## Reading a kit (Figma MCP)

1. The user needs their own copy of the Community file (Figma: *Open in Figma*, then duplicate). Ask for its URL if the default key is not readable. Keys: `references/kits.md`.
2. Call `create_session` once with the file key, then reuse its `sessionId`.
3. `get_metadata` with a page node id lists the page's component sets. Page ids are in the platform skill's `<platform skill>/references/components.md`.
4. For variant axes and values of a component set, run the read-only snippet in `references/figma-read.md` with `use_figma` (no write access needed; this skill never modifies the kit).
5. For one variant's exact spacing, radii and text styles, call `get_design_context` on that variant node, then `get_screenshot` to compare.
6. Prefer the kit's variables and styles by **name** (a text style or color style) over copying hex values.

## Cross-platform rules

- **Semantic colors**: use system/semantic colors (label, secondaryLabel, systemBackground, accent) so light, dark and increased-contrast work. Never hard-code hex for text or backgrounds in native code.
- **Text**: use the system text styles (Large Title, Title 1-3, Headline, Body, Callout, Subheadline, Footnote, Caption 1-2). Support Dynamic Type; never fix font sizes in native code.
- **Symbols**: use SF Symbols by name. Match symbol weight to adjacent text.
- **Liquid Glass (26)**: glass belongs to the *controls and navigation layer* floating above content (toolbars, tab bars, sidebars, floating buttons), not to content itself. Do not stack glass on glass. Group nearby glass elements in one container. Tint glass only to signal the primary action or state.
- **States**: kit variants encode States (Idle, Hover, Clicked, Pressed, Disabled, Selected, Focused) and Mode (Light, Dark). Implement states through the platform's own control behaviour, not by drawing each variant.
- **Accessibility**: respect Reduce Transparency, Reduce Motion, Increase Contrast, Bold Text. Minimum hit targets: iOS/iPadOS 44 pt, visionOS 60 pt. Every icon-only control needs a label.
- **Underscore components** (`_Name`) in the kits are internal building blocks. Use the public parent component instead.

## Output checklist

- [ ] Platform and kit page identified; variant axes read, not guessed.
- [ ] Each UI element maps to a native control or a named kit component.
- [ ] Light/Dark, state and size variants covered by system behaviour.
- [ ] No kit artwork copied; SF fonts/symbols referenced, not bundled.
- [ ] Deviations from the kit listed in your reply.
