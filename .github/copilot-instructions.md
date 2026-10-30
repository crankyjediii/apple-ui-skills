# GitHub Copilot Instructions for Apple UI Skills

This repository provides agent skills, Claude Code plugin commands, and reference implementations for Apple's 26-series UI kits across iOS, iPadOS, macOS, visionOS, and watchOS.

## Core Directives for Code Suggestions

### 1. Native SwiftUI (iOS, macOS, visionOS, watchOS)
- **Prefer System Controls**: Suggest native SwiftUI components (`Button`, `Toggle`, `Picker`, `TabView`, `NavigationSplitView`, `List`, `Menu`, `ContentUnavailableView`) instead of drawing custom shapes.
- **Variant Modifiers**:
  - Size → `.controlSize(.small | .regular | .large)`
  - Style → `.buttonStyle(.borderedProminent | .bordered | .borderless)`
  - Destructive → `role: .destructive`
  - Keyboard shortcuts → `.keyboardShortcut(.defaultAction)` on macOS primary actions
- **Colors**: Always use semantic system colors (`Color.primary`, `.secondary`, `Color(.systemBackground)`, `Color(nsColor: .windowBackgroundColor)`), tinted via `.tint()`. Never hardcode hex values for system chrome.
- **Typography**: Always use system text styles (`.font(.title)`, `.headline`, `.body`, `.caption`) and honor Dynamic Type.
- **Liquid Glass (26-Series)**:
  - Gate new APIs with `if #available(iOS 26, macOS 26, visionOS 26, watchOS 26, *)`.
  - Use `GlassEffectContainer` or `.glassEffect(.regular.interactive(), in: ...)` for floating controls only.
  - Provide fallbacks with `.background(.regularMaterial, in: ...)` or `.buttonStyle(.bordered)`.

### 2. Web (Next.js, React, Tailwind CSS)
- **Tokens**: Import `skills/apple-ui-web/references/tailwind-theme.css` or `tokens.css`. Use CSS variables like `var(--label)`, `var(--bg)`, `var(--tint)`, `var(--separator)`.
- **HTML Semantics**: Use `<button>`, `<input type="checkbox" role="switch">`, `<dialog>` (for sheets with `.showModal()`), and `<select>`.
- **Accessibility**: Support `:focus-visible`, `prefers-color-scheme`, `prefers-reduced-motion`, and `prefers-reduced-transparency`.

### 3. Cross-Platform (React Native / Expo & Flutter)
- **React Native**: Use `PlatformColor('label')`, `PlatformColor('secondarySystemGroupedBackground')`, and `ActionSheetIOS` on iOS.
- **Flutter**: Use Cupertino widgets (`CupertinoListSection.insetGrouped`, `CupertinoButton`, `CupertinoActionSheet`).

### 4. Apple Design Resources Compliance
- **Zero Artwork**: Never suggest adding or committing Apple Design Resources artwork, SVGs, `.fig` files, or SF font binaries.
- Use SF Symbols by name via `Label("...", systemImage: "...")` in Swift.
