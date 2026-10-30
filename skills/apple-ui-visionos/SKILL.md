---
name: apple-ui-visionos
description: Apple Vision Pro (visionOS 26) UI kit knowledge. Use when designing or building visionOS windows, ornaments, glass UI, hover/gaze states, tab bars, sidebars, gestures or SharePlay surfaces, or when reading the visionOS 26 Community Figma kit. Maps each kit component to its native visionOS API.
---

# visionOS 26 kit

Load `apple-ui-core` first for license guardrails and the Figma read workflow.

- Kit: file key `r9eDkx0DAfRqGdTX6UkkG4` (see `apple-ui-core/references/kits.md`).
- Component index with page ids and variant axes: `references/components.md`.
- Write code with `apple-ui-swiftui`.

## Platform facts

- UI lives on **glass** windows that blend with the room. Do not add your own opaque backgrounds to window chrome; use `.glassBackgroundEffect()` for custom panels.
- Input is look-and-pinch. Every custom interactive element needs a **hover** state (the kit encodes Idle, Hover, Hover + Dwell, Pinch). Targets are at least 60 pt.
- Navigation chrome floats outside the window as **ornaments**: the tab bar sits on the window's leading edge, the toolbar below the window.
- Window controls (close, resize, share status) are system-drawn.
- Text is bolder and larger than on iPhone; use system text styles.
- The Gestures page documents hand poses for tap, double tap, triple tap, pinch and two-hand gestures. It is reference for design reviews, not something to implement.

## Kit component to native API

| Kit component | visionOS API |
|---|---|
| Button - Text / Text and Symbol / Symbol | `Button` (default glass style); `.hoverEffect(.highlight)` and `.contentShape(.hoverEffect, shape)` on custom buttons |
| Drop Down Button | `Menu`, or `Picker` with `.pickerStyle(.menu)` |
| Link | `Link` |
| Tab Bar (Expanded / Collapsed) | `TabView` with `Tab` items; renders as the leading ornament |
| Toolbar, Toolbar - Symbols | `.toolbar { ToolbarItem(placement: .bottomOrnament) }`, or `.ornament(attachmentAnchor:)` for custom content |
| Navigation Bar | `NavigationStack`, `.navigationTitle`, toolbar items |
| Sidebars | `NavigationSplitView` with `List` |
| Lists (rows, section headers, index bar) | `List`, `Section`, `.swipeActions` |
| Menus, Context Menu | `Menu`, `.contextMenu` |
| Alerts | `.alert`, `.confirmationDialog` |
| Text / Search / Secure Field | `TextField`, `.searchable`, `SecureField` |
| Toggle | `Toggle` |
| Checkbox | No system checkbox style on visionOS: build one with `Button` and an SF Symbol (`checkmark.square`), expose it with `.accessibilityAddTraits(.isToggle)` |
| Sliders | `Slider` |
| Segmented Controls | `Picker` with `.pickerStyle(.segmented)` |
| Pickers (date, time) | `DatePicker` |
| Progress Indicators | `ProgressView` |
| Page Controls | `TabView` with `.tabViewStyle(.page)` |
| Color Pickers | `ColorPicker` |
| Share Sheets | `ShareLink` |
| SharePlay (System Activities, Requests) | GroupActivities (`GroupActivity`, `GroupSession`) |
| Window Controls | System; configure with `.windowResizability`, `.defaultWindowPlacement` |
| Backgrounds | `ImmersiveSpace` with a RealityKit environment |
| Keyboards | System keyboard; `.keyboardType`, `.submitLabel` |
| App Icon | Icon Composer asset (layered) |

## Gotchas

- Do not put pure white or opaque dark panels behind text; contrast against the live background varies. Use the glass material and system label colors.
- Add spacing between adjacent targets so gaze lands on one control.
