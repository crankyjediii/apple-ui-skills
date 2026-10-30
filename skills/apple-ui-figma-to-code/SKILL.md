---
name: apple-ui-figma-to-code
description: Turn a Figma node into code by recognising which Apple UI kit component each element is, then emitting the native control or its closest equivalent. Use when the user shares a Figma URL (a kit page or a design built from the Apple kits), asks to "implement this", or wants the kits used as a base and reference for their own design. Chooses SwiftUI, Next.js/React, or another stack.
---

# Figma node to code, Apple-kit aware

Load `apple-ui-core`, then the platform skill, then the stack skill (`apple-ui-swiftui` or `apple-ui-web`). Also load the Figma plugin's `figma-design-to-code` guidance before calling `get_design_context`.

## Workflow

1. **Parse the URL**: file key and node id (`1-2` becomes `1:2`). `create_session` once.
2. **Look**: `get_screenshot` for the target, `get_metadata` for the tree.
3. **Classify each element**:
   - Instance of a kit component: its `mainComponent` name (for example `Button - Content Area`, `Tab Bar - iPhone`) plus variant properties tell you the component and state. Look it up in the platform skill's `<platform skill>/references/components.md`.
   - Custom component built by the user: treat as their design; implement it with system controls where one fits, otherwise custom views using semantic tokens.
4. **Read details** with `get_design_context` on the nodes you need exact values for (spacing, radii, text style names, variable names). Prefer variable and style **names** over raw values.
5. **Map** each element with the platform skill's table (native stack) or `apple-ui-web` recipes (web). Variant axes become modifiers or props, not separate components.
6. **Write the code** following the stack skill. Keep the user's project conventions (look at their existing components first).
7. **Compare**: render the result, compare to the screenshot at the same size and mode, fix differences in layout, type and color.
8. **Report**: list kit components recognised, how each was mapped, and any approximations or skipped variants.

## "Use my design as a base"

When the user's design extends a kit: keep kit-derived pieces as system controls, factor the user's custom pieces into reusable views/components with the user's naming, and extract their custom colors and sizes into tokens rather than hard-coding.

## Guardrails

- Do not export or copy kit artwork or image fills into the codebase. Use SF Symbols by name; for web use your own icons.
- If the screenshot shows a Product Bezel, Home Screen or Lock Screen, those are mock-up frames: omit them from app code.
- If a node is a Figma Make or FigJam file, this skill does not apply.
