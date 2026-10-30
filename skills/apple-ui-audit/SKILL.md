---
name: apple-ui-audit
description: Review existing UI (SwiftUI/UIKit/AppKit code, web code, or Figma frames) against Apple's 26-series kits and Human Interface Guidelines. Use when asked to audit, review or critique whether an interface looks and behaves like a native Apple app, or to find where custom controls should be system components.
---

# Apple UI audit

Load `apple-ui-core` and the platform skill for the surface under review. For native code also use `apple-ui-swiftui`; for web `apple-ui-web`.

## Checklist (score each as pass / fix / n/a)

**Structure**
- Navigation pattern fits the platform (iOS tab bar + stack, iPad sidebar-adaptable, Mac sidebar + toolbar, visionOS ornaments, watch vertical pages).
- Each control is a system control where one exists; custom replacements are justified.
- Modals use the right container: sheet, popover (iPad/Mac), alert for decisions, confirmation dialog for action choices.

**Type and color**
- System text styles, Dynamic Type honored, no fixed point sizes.
- Semantic colors; works in Dark mode and increased contrast; accent used for interactive meaning only.

**Liquid Glass (26)**
- Glass only on floating controls and navigation; not on content; not stacked; grouped in one container.
- Reduce Transparency and Reduce Motion handled.

**Interaction and accessibility**
- Hit targets 44 pt (iOS/iPadOS) / 60 pt (visionOS); hover states on Mac and visionOS.
- Icon-only controls labeled; focus order logical; keyboard shortcuts and menu items on Mac.

**Kit fidelity** (when a Figma frame is provided)
- Instances come from the kit and are not detached.
- Variant choices (Style, Size, State) match intent; spacing and radii match the kit's component.

## Output

Return a table: `Area | Finding | Severity (high/med/low) | Fix`. Order by severity. For each fix, name the kit component or system API to use. Do not change code unless asked.
