# Springs: maths, presets and cross-platform equivalents

Sources: WWDC23 "Animate with springs" (10158) and "Explore SwiftUI animation" (10156). Constants below were read back from the iOS 26 SDK (`Spring.smooth`, `.snappy`, `.bouncy`) and the CSS curves were generated from the equations in this file.

## The model

A spring pulls a value toward its target: `m·x'' + c·x' + k·x = 0`, where `x` is the distance from the target, `m` mass, `c` damping, `k` stiffness. Three numbers describe the feel:

| Symbol | Meaning | Formula (mass = 1) |
|---|---|---|
| `ω₀` | natural frequency | `√(k/m) = 2π / duration` |
| `ζ` | damping ratio (1 = no overshoot, <1 bounces) | `c / (2·√(k·m))` |
| `duration` / `response` | perceptual duration, the period of the undamped spring | `2π / ω₀` |

SwiftUI's two spring initialisers are the same spring in different clothes:

- `Spring(duration:bounce:)` : `bounce` in −1…1. `ζ = 1 − bounce` for bounce ≥ 0, `ζ = 1 / (1 + bounce)` for bounce < 0.
- `.spring(response:dampingFraction:)` : `response = duration`, `dampingFraction = ζ`.

`duration` is **not** the settle time. A `bounce: 0` spring at 0.5 s is within 0.1 % of its target after about 0.74 s. Perceptually it "arrives" near `duration`; the tail is the soft landing. Budget for the tail when you set a CSS `transition-duration`.

## Presets (SwiftUI, iOS 17+)

| Preset | duration | bounce | ζ | stiffness k | damping c (m=1) | Use |
|---|---|---|---|---|---|---|
| `.smooth` | 0.5 | 0 | 1.00 | 157.9 | 25.13 | State changes, layout, default |
| `.snappy` | 0.5 | 0.15 | 0.85 | 157.9 | 21.36 | Selection, toggles, quick UI |
| `.bouncy` | 0.5 | 0.30 | 0.70 | 157.9 | 17.59 | Playful confirmation |
| `.spring` (default) | 0.5 | 0 | 1.00 | 157.9 | 25.13 | Same as `.smooth` numerically |
| `.interactiveSpring` | 0.15 | 0.14 | 0.86 | 1754.6 | 72.05 | Tracking a finger; short and stiff |

`.smooth(duration:extraBounce:)`, `.snappy(...)` and `.bouncy(...)` accept a custom duration and extra bounce. `Animation.default` is a spring in iOS 17+, but its exact constants are not documented; do not depend on them. Shorten with `duration:` rather than inventing new bounce values: 0.35 s for small controls, 0.5 s for panels, 0.6 s or more only for large full-screen moves.

Rule: `bounce: 0` unless a gesture's momentum or a playful moment justifies more. Above `bounce: 0.3` is cartoonish in system-style UI.

## SwiftUI patterns

```swift
// Implicit: animates whenever `expanded` changes, only for the views above it.
Rectangle().frame(height: expanded ? 200 : 100)
    .animation(.smooth(duration: 0.4), value: expanded)

// Explicit: animates everything the state change causes.
Button("Toggle") { withAnimation(.snappy) { expanded.toggle() } }

// Custom spring by perceptual duration, or by response/damping.
.animation(Animation.spring(duration: 0.5, bounce: 0.3), value: expanded)
.animation(.spring(response: 0.35, dampingFraction: 0.8), value: liked)

// Following a finger: stiff and short.
.animation(.interactiveSpring, value: offset)

// Read the physics behind a preset.
let s = Spring(duration: 0.5, bounce: 0.3)
let _ = (s.response, s.dampingRatio, s.stiffness, s.mass)

// Override or remove animation for one subtree (for example in a drag).
Text("x").transaction { t in
    t.animation = t.disablesAnimations ? nil : .snappy
}
```

Prefer `.animation(_:value:)` with an explicit value over the deprecated value-less form. Springs carry velocity when retargeted: tapping a toggle again mid-flight reverses from the current speed, so never block input during an animation.

Multi-step choreography:

```swift
// Cycle through phases (WWDC23 10157).
Image(systemName: "star.fill")
    .phaseAnimator([false, true]) { content, big in
        content.scaleEffect(big ? 1.2 : 1)
    } animation: { _ in .bouncy }

// Several tracks on a shared timeline; trigger replays it.
Image(systemName: "bolt.fill")
    .keyframeAnimator(initialValue: V(), trigger: tick) { c, v in
        c.scaleEffect(v.scale).offset(y: v.y)
    } keyframes: { _ in
        KeyframeTrack(\.scale) { SpringKeyframe(1.3, duration: 0.2, spring: .bouncy); SpringKeyframe(1, spring: .smooth) }
        KeyframeTrack(\.y) { LinearKeyframe(-12, duration: 0.15); SpringKeyframe(0, spring: .snappy) }
    }
// where: struct V { var scale = 1.0; var y = 0.0 }
```

Use `PhaseAnimator` for "go through these states"; `KeyframeAnimator` when tracks need different timing. Neither should be used to fake what a single spring does.

## Web: CSS

### `linear()` spring curves

`transition-timing-function: linear(...)` samples a curve at evenly spaced times across `transition-duration`, so set the duration to the **settle time** below. Each curve is the step response of the spring above (0 → 1), 28 samples, tolerance 0.1 %:

```css
:root {
  /* .smooth  ζ=1.00, settle 0.74s */
  --spring-smooth: linear(0, 0.044, 0.142, 0.26, 0.38, 0.491, 0.588, 0.671, 0.74, 0.796, 0.841, 0.877, 0.905, 0.927, 0.945, 0.958, 0.968, 0.976, 0.982, 0.986, 0.99, 0.992, 0.994, 0.996, 0.997, 0.998, 0.998, 0.999, 1);
  --spring-smooth-duration: 0.74s;
  /* .snappy  ζ=0.85, settle 0.70s, overshoot ≈0.6% */
  --spring-snappy: linear(0, 0.041, 0.137, 0.259, 0.386, 0.507, 0.615, 0.708, 0.784, 0.845, 0.893, 0.929, 0.955, 0.974, 0.987, 0.996, 1.001, 1.004, 1.006, 1.006, 1.006, 1.005, 1.005, 1.004, 1.003, 1.002, 1.002, 1.001, 1);
  --spring-snappy-duration: 0.7s;
  /* .bouncy  ζ=0.70, settle 0.82s, overshoot ≈4.6% */
  --spring-bouncy: linear(0, 0.057, 0.189, 0.353, 0.518, 0.668, 0.792, 0.887, 0.956, 1.002, 1.029, 1.043, 1.046, 1.043, 1.037, 1.03, 1.022, 1.015, 1.009, 1.005, 1.002, 1, 0.999, 0.998, 0.998, 0.998, 0.998, 0.999, 1);
  --spring-bouncy-duration: 0.82s;
  /* Fallback and for opacity/colour. Community-derived iOS-drawer ease, not an Apple-published value. */
  --ease-ios: cubic-bezier(0.32, 0.72, 0, 1);
}
.card {
  transition: transform var(--spring-snappy-duration) var(--spring-snappy), opacity 0.2s ease-out;
}
@supports not (transition-timing-function: linear(0, 1)) {
  .card { transition: transform 0.5s var(--ease-ios), opacity 0.2s ease-out; }
}
```

Notes:
- `linear()` is supported in current Chrome, Safari and Firefox (all since 2023). Keep the `@supports` fallback for older browsers.
- Overshoot works on `transform` and `opacity` (clamped at 1). Do not use bouncy curves on properties where values below 0 or above the range are invalid.
- Animate `transform` and `opacity`. Use `will-change: transform` only during the animation.
- `cubic-bezier(0.32, 0.72, 0, 1)` approximates a critically damped spring's shape: fast start, long soft tail. It is a common web approximation of iOS sheet motion; it is not an Apple constant and carries no velocity.

### Generate your own curve (with optional release velocity)

```js
// node spring-curve.mjs 0.5 0.3 0   (duration, bounce, v0 in 1/s)
// v0 is progress per second at t=0: pass 0 for taps, and a positive number when
// the gesture was already moving toward the target (release velocity / remaining distance).
const [duration = 0.5, bounce = 0, v0 = 0] = process.argv.slice(2).map(Number);
const zeta = bounce >= 0 ? 1 - bounce : 1 / (1 + bounce);
const w = (2 * Math.PI) / duration, a = zeta * w;
const progress = (t) => {
  // d(t) = remaining distance fraction, d(0)=1, d'(0) = -v0
  const d = Math.abs(zeta - 1) < 1e-9
    ? (1 + (w - v0) * t) * Math.exp(-w * t)
    : (() => { const wd = w * Math.sqrt(1 - zeta ** 2); return Math.exp(-a * t) * (Math.cos(wd * t) + ((a - v0) / wd) * Math.sin(wd * t)); })();
  return 1 - d;
};
let settle = 0;
for (let t = 0; t < 5; t += 0.001) if (Math.abs(1 - progress(t)) > 0.001) settle = t + 0.001;
const N = 28, pts = Array.from({ length: N + 1 }, (_, i) => +progress((settle * i) / N).toFixed(3));
pts[N] = 1;
console.log(`transition-duration: ${settle.toFixed(2)}s;\ntransition-timing-function: linear(${pts.join(', ')});`);
```

This handles under-damped (`bounce` ≥ 0 gives ζ ≤ 1) and critically damped springs. For negative bounce (over-damped, ζ > 1) use a library; the closed form differs.

## React Native (Reanimated 3+)

`withSpring` uses `mass`, `stiffness`, `damping`, so the table above maps directly. Reanimated does not need duration.

```ts
import { withSpring, ReduceMotion } from 'react-native-reanimated';

export const spring = {
  smooth:      { mass: 1, stiffness: 157.9,  damping: 25.13 },
  snappy:      { mass: 1, stiffness: 157.9,  damping: 21.36 },
  bouncy:      { mass: 1, stiffness: 157.9,  damping: 17.59 },
  interactive: { mass: 1, stiffness: 1754.6, damping: 72.05 },
} as const;

// Tap: from rest.
x.value = withSpring(target, { ...spring.snappy, reduceMotion: ReduceMotion.System });

// Gesture release: pass the gesture's velocity (px/s) so motion continues.
const pan = Gesture.Pan()
  .onChange((e) => { x.value += e.changeX; })              // 1:1, no animation
  .onEnd((e) => { x.value = withSpring(target, { ...spring.smooth, velocity: e.velocityX }); });
```

Notes:
- Reanimated's `velocity` is in value units per second (px/s), unlike SwiftUI's normalised `initialVelocity`.
- Reanimated rests when displacement < `restDisplacementThreshold` (default 0.01) and speed < `restSpeedThreshold` (default 2). For pixel values these defaults are fine; for 0–1 values lower both.
- Newer Reanimated versions also accept `{ duration, dampingRatio }`. If you use it, check the installed version's docs; the physical triple above is the stable form.
- Layout animations: `LinearTransition.springify().damping(25).stiffness(158)` (check the name in your version).

## Flutter

`SpringSimulation` runs in the units you give it, so animate a 0 → 1 progress and scale.

```dart
import 'package:flutter/physics.dart';

// Preset constants (mass 1, stiffness 157.9).
const smooth = SpringDescription.withDampingRatio(mass: 1, stiffness: 157.9, ratio: 1.0);
const snappy = SpringDescription.withDampingRatio(mass: 1, stiffness: 157.9, ratio: 0.85);
const bouncy = SpringDescription.withDampingRatio(mass: 1, stiffness: 157.9, ratio: 0.70);
const interactive = SpringDescription.withDampingRatio(mass: 1, stiffness: 1754.6, ratio: 0.86);

// Newer Flutter only: same parametrisation as SwiftUI's Spring(duration:bounce:).
final spring = SpringDescription.withDurationAndBounce(
    duration: const Duration(milliseconds: 500), bounce: 0.3);

// controller is an unbounded or 0..1 AnimationController.
void run(double velocityPxPerSec, double remainingPx) {
  // Normalise: fraction of the remaining distance per second, toward the target.
  final v = remainingPx == 0 ? 0.0 : velocityPxPerSec / remainingPx;
  controller.animateWith(SpringSimulation(smooth, controller.value, 1.0, v));
}
```

`withDurationAndBounce` may be missing on older Flutter stable; fall back to `withDampingRatio` with the constants above. Cupertino widgets (`CupertinoSliverNavigationBar`, `CupertinoPageRoute`, sheets) already carry system motion: do not re-implement them.

## Checks before shipping a spring

- Does a second tap mid-animation reverse smoothly (no restart from rest)?
- Is there any bounce on something that is not a flick or a delight moment?
- Is the web `transition-duration` equal to the curve's settle time, not 0.5 s?
- Reduce Motion path present? See `reduced-motion.md`.
