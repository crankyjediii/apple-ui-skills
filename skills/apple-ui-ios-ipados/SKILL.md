---
name: apple-ui-ios-ipados
description: iOS and iPadOS 26 UI kit knowledge. Use when designing or building iPhone or iPad screens, tab bars, navigation and toolbars, sheets, lists, menus, keyboards, widgets, Liquid Glass buttons, alerts or action sheets, or when reading the iOS and iPadOS 26 Community Figma kit. Maps each kit component to its native SwiftUI / UIKit API.
---

# iOS and iPadOS 26 kit

Load `apple-ui-core` first for license guardrails and the Figma read workflow.

- Kit: file key `huNIqDttz2Gg4R8L6g91YA` (see `apple-ui-core/references/kits.md`).
- Component index with page ids and variant axes: `references/components.md`.
- Write code with `apple-ui-swiftui`.

## Platform facts

- Most components exist in **Light/Dark** modes and, where it matters, **iPhone** and **iPad** variants (for example Menu Items - iPhone / iPad). Implement one adaptive view, not two.
- Min hit target 44 pt. Respect safe areas, Dynamic Type and the home indicator.
- Navigation chrome in 26 is Liquid Glass: the **tab bar floats** and can minimize on scroll; toolbars group items; a scroll edge effect (Soft or Hard) separates content from glass. Content scrolls under the chrome.
- Tab bar: 2-5 tabs; search can be a separate trailing tab. iPad can show the tab bar as a sidebar.
- Sheets use detents; Popovers are iPad-only (on iPhone they adapt to sheets).
- Bezels (iPhone 16/17 family, iPad) are for mock-up presentation only; never recreate them in app UI.
- Widgets page covers Home Screen and Lock Screen widgets (WidgetKit).

## Kit component to native API

| Kit component | SwiftUI / UIKit |
|---|---|
| Button - Content Area (Size, Style, Label Type, Enabled, Destructive) | `Button` + `.buttonStyle(.borderedProminent / .bordered / .borderless)`, `.controlSize(.small / .regular / .large)`, `Button(role: .destructive)`, `Label` for Symbol + Text |
| Button - Liquid Glass (Tinted) | `.buttonStyle(.glass)` or `.glassProminent`; `.tint` for Tinted |
| Toolbar - Top (Default, Large Title, Compact Large, Title 2 Line) | `NavigationStack`, `.navigationTitle`, `.toolbarTitleDisplayMode(.large / .inline)`, `.toolbar { ToolbarItem(placement: .topBarLeading / .topBarTrailing / .principal) }` |
| Toolbar - Bottom (Buttons, Search, Page Dots) | `ToolbarItemGroup(placement: .bottomBar)`, `DefaultToolbarItem(kind: .search, placement: .bottomBar)` |
| Tab Bar - iPhone / iPad | `TabView { Tab("Title", systemImage: "...") { ... } }`; Separate Search = `Tab(role: .search)`; Minimized = `.tabBarMinimizeBehavior(.onScrollDown)`; iPad sidebar = `.tabViewStyle(.sidebarAdaptable)` |
| Sidebars | `NavigationSplitView` with `List`, `.listStyle(.sidebar)` |
| Lists: Row, Header, Swipe Actions, Index Bar | `List`, `Section`, `.swipeActions`, `.listStyle(.insetGrouped / .plain)`; index bar via UIKit table index |
| Menus, Contextual Menus | `Menu`, `.contextMenu`, Submenus = nested `Menu`, destructive = `role: .destructive` |
| Pop-up Buttons | `Picker` with `.pickerStyle(.menu)` |
| Sheets (Full Screen, Inspector, iPad) | `.sheet` with `.presentationDetents([.medium, .large])`, `.fullScreenCover`, `.inspector` |
| Popovers (iPad only) | `.popover(isPresented:attachmentAnchor:arrowEdge:)`; `.presentationCompactAdaptation(.popover)` to keep on iPhone |
| Alerts | `.alert(_:isPresented:actions:message:)` |
| Action Sheets | `.confirmationDialog` |
| Activity Views | `ShareLink` |
| Pickers (Date and time) | `DatePicker` with `.datePickerStyle(.compact / .graphical)`; wheels via `.wheel` |
| Segmented Controls | `Picker` with `.pickerStyle(.segmented)` |
| Sliders, Steppers, Toggles | `Slider`, `Stepper`, `Toggle` |
| Text Fields | `TextField`, `SecureField`, `.textContentType`, `.keyboardType`, `.submitLabel` |
| Keyboards | System keyboard; configure only, never redraw |
| Progress bar / indicator | `ProgressView(value:)`, `ProgressView()` |
| Page Controls | `TabView` with `.tabViewStyle(.page)` |
| Color Pickers | `ColorPicker` |
| Empty States | `ContentUnavailableView` |
| Face ID | `LocalAuthentication` (`LAContext.evaluatePolicy`) |
| Notifications | UserNotifications; rich content via a notification content extension |
| Widgets (Home, Lock Screen) | WidgetKit `Widget`, `StaticConfiguration`, families `.systemSmall`...`.systemExtraLarge`, `.accessoryCircular / .accessoryRectangular / .accessoryInline` |
| Status Bars and Menu Bars (iPad) | `.statusBarHidden`, `.commands { CommandMenu }` for the iPad menu bar |
| Windows (iPad) | `WindowGroup`, `openWindow`; window controls are system-drawn |
| Scroll edge effect | `.scrollEdgeEffectStyle(.soft / .hard, for: .top)` |
| Materials, Liquid Glass | `.glassEffect()`, `GlassEffectContainer`; `Material` (`.ultraThinMaterial` ... `.thickMaterial`) for non-glass blur |
| App Icons | Icon Composer asset (Default, Dark, Clear) |
| Home Screen / Lock Screen / Control Center | System surfaces: use for mock-ups, not app UI. Controls: WidgetKit `ControlWidget` |

## Gotchas

- Kit Mode: Light|Dark is a property of the screenshot, not an API. Use semantic colors and let the system switch.
- `Button - Content Area` has Style `Bordered - Secondary`: use `.bordered` with a gray `.tint`.
- Do not stack `.glassEffect()` on views inside a toolbar or tab bar; the system already supplies glass.
