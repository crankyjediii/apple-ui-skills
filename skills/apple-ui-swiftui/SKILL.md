---
name: apple-ui-swiftui
description: Write native SwiftUI (with AppKit/UIKit fallbacks) that matches Apple's 26-series UI kits on iOS, iPadOS, macOS, visionOS and watchOS. Use when implementing a kit component or a Figma design as Swift code, adopting Liquid Glass APIs, or choosing the right system control instead of custom drawing. Pair with the platform skill for the component-to-API table.
---

# SwiftUI implementation of the Apple kits

Start with `apple-ui-core`, then the platform skill (its table says which API each kit component maps to). This skill covers how to write the code.

## Rules

1. **System control first.** If a native control exists (`Button`, `Toggle`, `Picker`, `TabView`, `NavigationSplitView`, `List`, `Menu`...), use it with a style modifier. Do not rebuild it with shapes. Custom drawing only for things the kit shows but SwiftUI lacks (macOS combo box, circular dial: wrap `NSComboBox` / `NSSlider`).
2. **Variants are modifiers, not views.** Kit axes map to modifiers: Size to `.controlSize`, Style to `.buttonStyle`, Destructive to `role: .destructive`, Disabled to `.disabled`, Selected to binding state. Light/Dark, Active Window, Hover and Pressed come from the system.
3. **Semantic color and type only.** `Color.primary`, `.secondary`, `Color(.systemBackground)` (iOS) or `Color(nsColor: .windowBackgroundColor)` (macOS); `.font(.headline)` etc. Never fixed point sizes. Accent via `.tint`.
4. **Symbols by name** with `Label("Title", systemImage: "name")`.
5. **Liquid Glass (26).** Apply glass to floating controls only, never to content or to views the system already glazes (toolbars, tab bars, sidebars).
6. **Gate new APIs.** Wrap 26-only APIs in `if #available(iOS 26, macOS 26, visionOS 26, watchOS 26, *)` and fall back to `.bordered` / `Material` if the deployment target is older.
7. **Accessibility.** Label icon-only buttons (`.accessibilityLabel`), keep 44 pt (iOS) / 60 pt (visionOS) hit areas via `.frame(minWidth:minHeight:)` and `.contentShape`.

## Liquid Glass snippets

```swift
// Grouped floating controls share one container so the glass morphs together.
GlassEffectContainer(spacing: 12) {
    HStack(spacing: 12) {
        Button("Edit", systemImage: "pencil") { }
            .buttonStyle(.glass)
        Button("Share", systemImage: "square.and.arrow.up") { }
            .buttonStyle(.glassProminent)   // tinted / primary
    }
}

// Custom glass surface
Text("Now playing")
    .padding()
    .glassEffect(.regular.interactive(), in: .capsule)

// Scroll edge effect under glass chrome
ScrollView { content }
    .scrollEdgeEffectStyle(.soft, for: .top)
```

## Shell patterns per platform

```swift
// iOS / iPadOS: tab bar that minimizes on scroll, separate search tab
TabView {
    Tab("Home", systemImage: "house") { NavigationStack { HomeView() } }
    Tab("Library", systemImage: "books.vertical") { NavigationStack { LibraryView() } }
    Tab(role: .search) { NavigationStack { SearchView() } }
}
.tabBarMinimizeBehavior(.onScrollDown)

// macOS: sidebar + detail + toolbar
NavigationSplitView {
    List(selection: $selection) { ForEach(items) { Label($0.name, systemImage: $0.symbol).tag($0.id) } }
        .listStyle(.sidebar)
} detail: {
    DetailView(selection)
}
.toolbar { ToolbarItem(placement: .primaryAction) { Button("Add", systemImage: "plus") { } } }

// visionOS: ornament toolbar on glass
ContentView()
    .ornament(attachmentAnchor: .scene(.bottom)) {
        HStack { Button("Play", systemImage: "play.fill") { } }
            .padding()
            .glassBackgroundEffect()
    }

// watchOS: carousel list with a bottom pill button
NavigationStack {
    List(items) { item in NavigationLink(item.name, value: item) }
        .listStyle(.carousel)
        .toolbar { ToolbarItem(placement: .bottomBar) { Button("Add") { } } }
}
```

## Verify

- Build for each target platform you touched: `xcodebuild -scheme <Scheme> -destination 'generic/platform=iOS Simulator' build` (swap for `macOS`, `visionOS Simulator`, `watchOS Simulator`).
- Run it and compare with `get_screenshot` of the kit node (see `apple-ui-figma-to-code`). Check Light/Dark, largest Dynamic Type, and the smallest device.
- Report which kit variants you deliberately did not implement.
