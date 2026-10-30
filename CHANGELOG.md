# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2026-10-30

### Added
- **SwiftUI Preview Gallery (`examples/apple-ui-gallery/`)**: Standalone Swift Package featuring `#Preview` blocks for iOS (adaptive tab bar, Liquid Glass buttons, inset grouped lists), macOS (unified toolbar, split view, push buttons), visionOS (spatial glass ornaments, gaze hover effects), and watchOS (carousel, Digital Crown, capsule action button).
- **Tailwind v4 Theme Preset (`skills/apple-ui-web/references/tailwind-theme.css`)**: Drop-in `@theme` configuration mapping all Apple system colors, label hierarchies, background levels, corner radii, and spring curves.
- **Cross-Platform Recipes (`skills/apple-ui-cross-platform/references/recipes.md`)**: Copy-pasteable snippets for React Native / Expo (`PlatformColor` Inset Grouped lists, native buttons, ActionSheetIOS, `expo-blur` glass container) and Flutter Cupertino widgets.

## [0.2.1] - 2026-10-30

### Added
- **Apple UI Doctor (`scripts/doctor.mjs`)**: Toolchain and environment diagnostic utility checking Node, host OS, Swift compiler, Xcode 26 SDKs (iOS, macOS, visionOS, watchOS), skill integrity, and optional Figma MCP status. Accessible via `npm run doctor` or `node scripts/doctor.mjs`.
- **Setup Command (`commands/setup.md`)**: Registered `/apple-ui-skills:setup` command in Claude Code for guided workspace onboarding and environment validation.

## [0.2.0] - 2026-10-30

### Added
- **Standalone Reference Mode (Figma Optional)**: Agents can now implement screens, choose native components, and audit code directly from built-in references without requiring a Figma connection or Figma MCP server.
- **Screen Patterns Reference** (`skills/apple-ui-core/references/patterns.md`): Canonical HIG patterns covering *where, when, why, how (native APIs), and what to avoid* for navigation, drill-downs, settings, search, forms, sheets, alerts, empty states, and tip flows.
- **Platform Usage Guides** (`references/usage.md`): Deep per-component HIG rules for:
  - iOS and iPadOS (`skills/apple-ui-ios-ipados/references/usage.md`)
  - macOS (`skills/apple-ui-macos/references/usage.md`)
  - visionOS (`skills/apple-ui-visionos/references/usage.md`)
  - watchOS (`skills/apple-ui-watchos/references/usage.md`)
- **Manifest and Workflow Validation**: Expanded `scripts/validate.mjs` to validate agent configurations (`agents/*.md`), slash commands (`commands/*.md`), and version synchronization across `package.json`, `.claude-plugin/plugin.json`, and `.claude-plugin/marketplace.json`.

### Changed
- Decoupled Figma from `apple-ui-setup`, `apple-ui-core`, and all platform skills: Figma is now treated as an optional accelerator for reading custom community kit duplicates rather than a required dependency.
- Updated `apple-ui-implementer` agent to select between standalone reference and Figma-based workflows based on tool availability and inputs.
- Expanded `docs/prompts.md` and `docs/troubleshooting.md` with prompt templates and fixes tailored for non-Figma usage.

---

## [0.1.0] - 2026-10-29

### Added
- Initial release with 12 agent skills for Apple's official 26-series UI kits.
- Claude Code plugin integration with `apple-ui-implementer` and `apple-ui-reviewer` agents, alongside `/implement` and `/audit` slash commands.
- Structural component indexing for iOS/iPadOS (`huNIqDttz2Gg4R8L6g91YA`), macOS (`1oJBVhrLD3oLk3FwQPlFD4`), visionOS (`r9eDkx0DAfRqGdTX6UkkG4`), and watchOS (`il8U8FmGZmtGH3yNPFCPUV`).
- Swift test harness validating native snippets against Apple 26 simulator and macOS SDKs (`scripts/check-swift.sh`).
- Web tokens and component demo (`examples/web-demo/index.html`).
- Strict license guardrails enforcing Apple Design Resources compliance (zero binary artwork or fonts redistributed).
