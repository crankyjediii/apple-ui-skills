---
name: apple-ui-watchos
description: Apple Watch (watchOS 26) UI kit knowledge. Use when designing or building Apple Watch screens, complications, Smart Stack widgets, watch lists, pill buttons, digital-crown pickers, or when reading the watchOS 26 Community Figma kit. Maps each kit component to its native watchOS API.
---

# watchOS 26 kit

Load `apple-ui-core` first for license guardrails and the Figma read workflow.

- Kit: file key `il8U8FmGZmtGH3yNPFCPUV` (see `apple-ui-core/references/kits.md`).
- Component index with page ids and variant axes: `references/components.md`.
- Write code with `apple-ui-swiftui`.

## Platform facts

- Screens come in five case sizes (40, 42, 44, 46, 49 mm). The kit's **Layout Grid** page has display masks and grids per size; design to the smallest size and let layout scale up.
- Content is one vertical column, edge to edge. Prefer full-width pill buttons at the bottom of the screen; avoid side-by-side buttons except the three-bottom-button pattern.
- Navigation is a `NavigationStack` with a status-bar title; tabs are vertical pages driven by the Digital Crown. Modals use a confirm/cancel control pair.
- Use the Digital Crown for pickers, sliders and scrolling instead of on-screen controls.
- Glanceable first: lists use carousel/elliptical styles and large type; keep interactions to one or two taps.

## Kit component to native API

| Kit component | watchOS API |
|---|---|
| Button - Pill (Default, Primary, Destructive, Floating...) | `Button` with `.buttonBorderShape(.capsule)`; `.tint` for Primary; `role: .destructive` |
| Button - Circular | `Button` with `.buttonBorderShape(.circle)` |
| Button - Pay | `PayWithApplePayButton` |
| Lists: Item, Source List, Carousel | `List` with `.listStyle(.carousel)` / `.elliptical`; `Section` headers and footers |
| Navigation Bar (status, large title, modal) | `NavigationStack`, `.navigationTitle`; toolbar placements `.topBarLeading`, `.topBarTrailing`, `.bottomBar`, `.confirmationAction`, `.cancellationAction` |
| Alerts, Action sheets, Errors | `.alert`, `.confirmationDialog` |
| Notifications (Short Look, Long Look, Banner) | UserNotifications with a notification content scene (`WKUserNotificationHostingController`) |
| Pickers | `Picker` (wheel style by default); `.pickerStyle(.navigationLink)` for long lists |
| Progress Indicator | `ProgressView`, `Gauge` |
| Tabs and Scrollbar | `TabView` with `.tabViewStyle(.verticalPage)` or `.page`; scrollbar is system-drawn |
| Slider | `Slider` (verify availability for your deployment target); crown: `.digitalCrownRotation($value)` |
| Toggle | `Toggle` |
| Smart Stack (Widgets) | WidgetKit accessory families; give relevance hints so the widget rises in the stack |
| Activity Rings | System-rendered; for a look-alike use a custom `Circle().trim` stack or `Gauge` |
| App Icon | Icon Composer asset in the Xcode project |

## Gotchas

- Check each size: text that fits at 49 mm can truncate at 40 mm.
- Do not draw the bezel or status bar yourself; Product Bezels are for mock-ups only.
