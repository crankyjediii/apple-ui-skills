---
name: apple-ui-cross-platform
description: Apple-style UI in React Native, Flutter, Kotlin Multiplatform or Compose Multiplatform, and web frameworks other than Next.js (Vue, Svelte, Angular). Use when the user wants an iOS, iPadOS or macOS look in a cross-platform codebase, or wants to port a kit component to one of these stacks. Maps kit components to each stack's closest control and says what is approximated.
---

# Apple look in other stacks

Load `apple-ui-core` and the platform skill first. For Vue, Svelte and Angular reuse `apple-ui-web` (tokens and recipes are framework-neutral CSS); the rest of this skill covers mobile and desktop stacks.

## Licensing note (tell the user)

Anything that runs on Android, Windows, Linux or the web is not Apple-OS software, so the kit license does not cover it. Build from public HIG principles and the platform's own controls, do not copy kit artwork, and say the look is an approximation. On iOS builds, prefer controls that render natively.

## Rules for every stack

1. **Prefer native-rendered controls on iOS** over restyled lookalikes, so Liquid Glass, Dynamic Type and accessibility come for free.
2. **Use platform colors by semantic name** where the stack offers them, not hex.
3. **Branch by platform** when the Apple look should apply only on Apple devices; keep Android/web on their own design language unless the user asks otherwise.
4. Keep one shared component API (`<AppleButton variant="prominent">`) and swap implementations per platform.

## React Native / Expo

| Kit component | Use |
|---|---|
| Switch / Toggle | `Switch` |
| Alert, Action Sheet | `Alert.alert`, `ActionSheetIOS.showActionSheetWithOptions` |
| Segmented Control | `@react-native-segmented-control/segmented-control` |
| Date and time picker | `@react-native-community/datetimepicker` |
| Colors | `PlatformColor('label')`, `PlatformColor('systemBlue')`, `DynamicColorIOS` |
| SF Symbols | `expo-symbols` (`SymbolView`) |
| Blur / material | `expo-blur` (`BlurView`); for Liquid Glass check the current `expo-glass-effect` and `@expo/ui` SwiftUI bridge docs |
| Tab bar, navigation, sheets | `react-native-screens`-based native stack and tabs (React Navigation native stack / Expo Router tabs) |

## Flutter

| Kit component | Use |
|---|---|
| Button (prominent, tinted) | `CupertinoButton.filled`, `CupertinoButton.tinted` |
| Switch, Checkbox, Radio, Slider | `CupertinoSwitch`, `CupertinoCheckbox`, `CupertinoRadio`, `CupertinoSlider` |
| Segmented Control | `CupertinoSlidingSegmentedControl` |
| Navigation bar, large title | `CupertinoNavigationBar`, `CupertinoSliverNavigationBar` |
| Tab bar | `CupertinoTabScaffold` + `CupertinoTabBar` |
| Alert, Action Sheet, Sheet | `CupertinoAlertDialog`, `CupertinoActionSheet`, `showCupertinoModalPopup`, `CupertinoSheetRoute` |
| Lists | `CupertinoListSection.insetGrouped`, `CupertinoListTile` |
| Pickers | `CupertinoPicker`, `CupertinoDatePicker` |
| Search | `CupertinoSearchTextField` |
| Context menu | `CupertinoContextMenu` |
| Material / glass | `BackdropFilter` with `ImageFilter.blur`; true Liquid Glass needs a native SwiftUI platform view |
| macOS | the `macos_ui` package |

## Kotlin Multiplatform / Compose Multiplatform

There is no Apple-style component set in Compose. On iOS targets embed real SwiftUI through `UIKitView` / `UIKitViewController` interop for the controls that matter (tab bar, navigation, sheets) and keep shared logic in Kotlin. Elsewhere, build small custom composables from the tokens in `apple-ui-web/references/tokens.css` (copy the values, not the file).

## Verify

Run on an iOS simulator in light and dark, with large text. Compare with a kit screenshot (`get_screenshot`). List what each stack could not match.
