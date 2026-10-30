# Reduced motion

Sources: Human Interface Guidelines: Motion and Accessibility (Motion), WWDC23 "Animate with springs" (10158). Reduce Motion is a system setting (iOS/iPadOS/visionOS: Accessibility > Motion; macOS: Accessibility > Display; web: `prefers-reduced-motion`). It is for people who get dizzy, nauseated or distracted by movement. It does not mean "no animation".

## Principle

Keep the **information**, drop the **travel**.

| If the motion is... | Under Reduce Motion do this |
|---|---|
| Large translation, zoom, parallax, spin, 3D, camera-like moves | Cross-fade (opacity) or an instant change |
| A bounce or overshoot | Same change with `bounce: 0`, or a short `easeInOut` |
| An indefinite loop (pulse, shimmer, auto-advancing carousel, looping video or Lottie) | Static state, or a single non-moving change (colour, fill) |
| A short opacity or colour change | Keep |
| Progress that conveys state (determinate progress bar, value changes) | Keep; it is information |
| Motion tied to the finger (drag, scrub) | Keep; the user is causing it |
| Haptics and sound | Keep; unaffected by this setting |

Never remove a state change itself: if motion was the only thing showing that something happened, replace it with a cross-fade, text, a colour change or a haptic.

## Audit checklist

Go through every animation in the code:

1. Does it move more than about a third of the screen, scale a large view, or run on scroll? Add a reduced path.
2. Is it infinite or auto-playing? Gate it on the setting and give users a pause control for anything that moves automatically for more than 5 s (WCAG 2.2.2).
3. Does it use bounce or overshoot? Under Reduce Motion use `.smooth` or a fade.
4. Is the only cue motion? Add a non-motion cue.
5. Is there a gesture version of the same transition? Gestures stay, but the animation that follows should be the reduced one.
6. Toggle Reduce Motion in Simulator or browser devtools and walk the screen.

## SwiftUI

```swift
struct MotionReduced: View {
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var on = false
    var body: some View {
        Text("x").offset(y: on ? 0 : 40).opacity(on ? 1 : 0)
            .animation(reduceMotion ? .easeInOut(duration: 0.2) : .snappy, value: on)
        Image(systemName: "wifi")
            .symbolEffect(.variableColor.iterative, options: .repeating, isActive: on && !reduceMotion)
    }
}
```

Better still, change the *transition* too, not only the timing:

```swift
.transition(reduceMotion ? .opacity : .move(edge: .bottom).combined(with: .opacity))
```

Patterns:

- Wrap the choice once: `func motion(_ full: Animation) -> Animation { reduceMotion ? .easeInOut(duration: 0.2) : full }` in a small view modifier or `Animation` extension, and call it everywhere.
- `matchedGeometryEffect` and `.navigationTransition(.zoom)`: pick the plain transition when `reduceMotion` is true. The zoom and automatic transitions are different types, so a ternary does not compile; branch instead:

```swift
extension View {
    /// Zoom transition, or the plain push when Reduce Motion is on (the two types differ, so branch).
    @ViewBuilder func zoomTransition<ID: Hashable>(from id: ID, in ns: Namespace.ID, reduced: Bool) -> some View {
        if reduced { self } else { navigationTransition(.zoom(sourceID: id, in: ns)) }
    }
}
```
- `phaseAnimator` / `keyframeAnimator`: when reduced, skip the animator or set `trigger` so it does not run.
- `scrollTransition`: return the content unchanged when reduced.
- Symbol effects: bind `isActive` to `... && !reduceMotion`; for discrete effects skip or use `.replace` only.
- Auto-playing video, Lottie, animated GIFs: pause on `reduceMotion`; offer a play button.
- Related: Prefer Cross-Fade Transitions (`UIAccessibility.prefersCrossFadeTransitions`), Dim Flashing Lights, and Auto-Play Video Previews are separate settings; honour them for flashing and autoplay.

## UIKit

```swift
if UIAccessibility.isReduceMotionEnabled {
    UIView.transition(with: view, duration: 0.2, options: .transitionCrossDissolve) { show() }
} else {
    UIView.animate(springDuration: 0.5, bounce: 0.2) { show() }
}
NotificationCenter.default.addObserver(
    forName: UIAccessibility.reduceMotionStatusDidChangeNotification, object: nil, queue: .main
) { _ in self.updateMotion() }
```

AppKit equivalent: `NSWorkspace.shared.accessibilityDisplayShouldReduceMotion`, observed through `NSWorkspace.accessibilityDisplayOptionsDidChangeNotification`.

## Web

```css
.card { transition: transform var(--spring-snappy-duration) var(--spring-snappy), opacity 0.2s ease-out; }

@media (prefers-reduced-motion: reduce) {
  .card { transition: opacity 0.2s ease-out; }          /* drop transform travel, keep the fade */
  .parallax, .marquee, .pulse { animation: none; }
  html { scroll-behavior: auto; }
}
```

- Prefer `no-preference` as the opt-in for heavy effects: `@media (prefers-reduced-motion: no-preference) { ... }`, so the default is the calm one.
- In JS: `const q = matchMedia('(prefers-reduced-motion: reduce)'); q.matches; q.addEventListener('change', ...)`. Pass the result to animation libraries (Framer Motion: `useReducedMotion()` or `<MotionConfig reducedMotion="user">`).
- View Transitions: skip `startViewTransition` when `q.matches`, or set `::view-transition-group(*) { animation-duration: 0.01ms; }` and keep the cross-fade.
- Videos and carousels: no autoplay when reduced; always provide controls.

## React Native

```ts
import { AccessibilityInfo } from 'react-native';
import { ReduceMotion, useReducedMotion, withSpring } from 'react-native-reanimated';

// Reanimated animations accept a per-animation policy; System is the default for withSpring/withTiming.
x.value = withSpring(target, { ...spring.snappy, reduceMotion: ReduceMotion.System });

// Elsewhere (JS state):
const reduce = useReducedMotion();                       // Reanimated hook
AccessibilityInfo.isReduceMotionEnabled().then(setReduce);
const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduce);
```

## Flutter

```dart
final reduce = MediaQuery.disableAnimationsOf(context);   // true when Reduce Motion is on
final spec = reduce ? const Duration(milliseconds: 200) : const Duration(milliseconds: 500);
// Swap the transition widget: reduce ? FadeTransition(...) : SlideTransition(...)
```

## Testing

- Simulator: Settings > Accessibility > Motion > Reduce Motion.
- Web: DevTools > Rendering > Emulate CSS media feature `prefers-reduced-motion`.
- Automated: assert no `transform` transition or infinite animation is active when the media query matches.
- Record the result in the handover: which patterns have a reduced path, and which were left unchanged and why.
