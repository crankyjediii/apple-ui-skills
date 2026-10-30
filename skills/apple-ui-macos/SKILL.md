---
name: apple-ui-macos
description: macOS 26 UI kit knowledge. Use when designing or building Mac app windows, toolbars, titlebars, sidebars, menus, menu bar items, push buttons, checkboxes, pop-up buttons, tables, popovers, sheets or Liquid Glass on Mac, or when reading the macOS 26 Community Figma kit. Maps each kit component to its native AppKit / SwiftUI API.
---

# macOS 26 kit

Load `apple-ui-core` first for license guardrails and the Figma read workflow.

- Kit: file key `1oJBVhrLD3oLk3FwQPlFD4` (see `apple-ui-core/references/kits.md`).
- Component index with page ids and variant axes: `references/components.md`.
- Write code with `apple-ui-swiftui` (SwiftUI first, AppKit when SwiftUI has no equivalent).

## Platform facts

- Controls have **Active Window** (True/False) and pointer **State** (Idle, Clicked, Disabled) axes. Active-window dimming and hover/press feedback come from the system; do not hand-draw them.
- Controls come in sizes (mini, small, regular, large, extra large); the toolbar kit uses **Medium** and **XL**. Set the size once with `.controlSize`.
- Windows: standard window with titlebar and traffic lights, or a utility panel. Toolbar sits in the titlebar and uses Liquid Glass in 26.
- Menu bar and keyboard shortcuts are first-class: every command should be in a menu with a shortcut where sensible.
- Dark and light appearances are both required; use semantic colors.
- Default (preferred) button is the blue accent push button that answers Return.

## Kit component to native API

| Kit component | SwiftUI / AppKit |
|---|---|
| Push Button: Default / Preferred | `Button` with `.keyboardShortcut(.defaultAction)` and `.buttonStyle(.borderedProminent)`; `NSButton` `keyEquivalent = "\r"` |
| Push Button: Bordered Neutral / Secondary | `.buttonStyle(.bordered)` |
| Push Button: Bordered Colored | `.buttonStyle(.bordered)` + `.tint(color)` |
| Push Button: Bordered Destructive | `Button(role: .destructive)` |
| Push Button: Borderless | `.buttonStyle(.borderless)` or `.plain` |
| Arrow Buttons, Disclosure Button | `DisclosureGroup`; `NSButton` `.disclosure` bezel |
| Checkboxes | `Toggle` with `.toggleStyle(.checkbox)`; Mixed state via `NSButton` `allowsMixedState` |
| Radio Button | `Picker` with `.pickerStyle(.radioGroup)` |
| Switch | `Toggle` with `.toggleStyle(.switch)` |
| Pop-Up Button | `Picker` with `.pickerStyle(.menu)`; `NSPopUpButton` |
| Pulldown Button | `Menu`; `NSPopUpButton` `pullsDown = true` |
| Combo Box | `NSComboBox` via `NSViewRepresentable` (no SwiftUI equivalent) |
| Segmented Control | `Picker` with `.pickerStyle(.segmented)` |
| Slider, Dial | `Slider`; circular via `NSSlider` `sliderType = .circular` |
| Stepper | `Stepper` |
| Text Field, Search Field | `TextField`, `.searchable`; `NSSearchField` |
| Color Well | `ColorPicker` |
| Image Well | `NSImageView` (`isEditable = true`) or `.dropDestination` |
| Progress Indicators | `ProgressView` (linear, circular, indeterminate) |
| Lists and Tables | `List`, `Table` with `TableColumn`; alternating rows `.alternatingRowBackgrounds()` |
| Sidebars | `NavigationSplitView` with `List` and `.listStyle(.sidebar)` |
| Toolbars and Titlebars | `.toolbar`, `ToolbarItemGroup`, `ControlGroup` for Button Group, `.toolbarRole`; `NSToolbar` |
| Windows, Utility Panel | `WindowGroup`, `Window`, `.windowStyle`, `.windowResizability`; `NSPanel` |
| Sheets | `.sheet(isPresented:)` |
| Popovers | `.popover(isPresented:arrowEdge:)` (Arrow Direction maps to `arrowEdge`) |
| Alerts | `.alert`, `.confirmationDialog`; `NSAlert` |
| Dialogs (open/save) | `.fileImporter`, `.fileExporter`; `NSOpenPanel`, `NSSavePanel` |
| Menus | `Menu`, `.contextMenu`, `.commands { CommandMenu }` |
| Menu Bar and Dock | `MenuBarExtra`, `.commands`; dock tile via `NSApp.dockTile` |
| Boxes (Group Box) | `GroupBox` |
| Tooltips | `.help("text")` |
| Pointers | `NSCursor` |
| Notifications | UserNotifications |
| Forms | `Form` with `.formStyle(.grouped)` |
| Liquid Glass (Materials page) | `.glassEffect()`, `GlassEffectContainer`; legacy `NSVisualEffectView` |

## Gotchas

- Do not use iOS-style tab bars or large titles on Mac; use sidebars and toolbars.
- Do not recolor controls to fake variants; use `.tint` and `.controlSize`.
- Underscore components (for example `_Knob`, `_Track Filled`) are parts of a parent control, not controls to build.
