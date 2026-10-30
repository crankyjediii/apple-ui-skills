---
name: apple-ui-motion
description: Apply Apple-style motion and animation in SwiftUI, CSS, React Native and Flutter. Use when choosing or tuning springs (.smooth, .snappy, .bouncy, .interactiveSpring), animating SF Symbols (bounce, pulse, variableColor, replace), building matched-geometry or zoom navigation transitions, sheet detents, interruptible drag gestures with release velocity, converting a spring to a CSS linear() curve, or adding Reduce Motion fallbacks. Triggers on animation, spring, transition, motion, easing, gesture velocity, symbolEffect, matchedGeometryEffect, prefers-reduced-motion.
---

# Apple motion

Apple motion is **physical, interruptible and quiet**: springs not curves, gestures that keep their velocity, and motion that explains a change rather than decorating it. Start with `apple-ui-core` for routing; this skill owns animation.

## Pick the animation

| Situation | Use | Why |
|---|---|---|
| Push/pop, modal, sheet | System transition. Add `.navigationTransition(.zoom)` only for a visible source (thumbnail, card) | The system already handles interruption and the back-swipe |
| Selection, toggle, tab or filter change | `.snappy` | Quick, tiny overshoot, feels responsive |
| State change, expand/collapse, layout change | `.smooth` (the default feel) | No bounce, so nothing draws attention to itself |
| Playful confirmation (like, add to cart, achievement) | `.bouncy`, or `.symbolEffect(.bounce)` | Bounce signals delight; use sparingly |
| Gesture is tracking the finger | No animation while dragging; `.interactiveSpring` for follow-through | Content must stay 1:1 under the finger |
| Gesture released | Spring seeded with release velocity (`transitions.md`) | Motion continues the gesture's momentum |
| Error or attention | Short horizontal shake plus `.sensoryFeedback(.error)`; `.symbolEffect(.wiggle)` for icons | Draws the eye without a modal |
| Loading, listening, in progress | Indefinite symbol effect (`.pulse`, `.variableColor`) bound to state | Stops cleanly when the state ends |
| Alert, confirmation dialog | Leave the system animation alone | Custom motion on system alerts reads as broken |

Rules of thumb:
1. Bounce only when momentum exists (a flick, a throw) or the moment is playful. Everything else is `bounce: 0`.
2. Durations stay short: about 0.35 to 0.5 s perceived. Longer for large full-screen moves, never for feedback.
3. Animate what changed (position, scale, opacity). Do not animate layout properties on web; use `transform` and `opacity`.
4. One focal motion per moment. If two things move, one leads and the other follows.
5. Motion is never the only signal. Pair it with color, text or haptics.

## Anti-patterns

- **`easeInOut` everywhere.** Fixed-duration curves ignore velocity and feel robotic. Use springs; keep `easeOut`/`linear` for opacity and color only.
- **Un-interruptible motion.** Gestures and taps must be able to cancel or reverse an animation mid-flight. Never disable hit-testing for the duration of an animation, and never gate state on `completion`.
- **Animating during a drag.** Wrapping `onChanged` updates in `withAnimation` makes content lag the finger.
- **Dropping velocity on release.** Snapping back with a fresh animation from rest feels dead.
- **Bounce on everything.** Bouncy lists, bouncy nav bars and bouncy toggles together read as noise.
- **Full-screen parallax, zoom, spin or auto-playing loops with no Reduce Motion path.** See `references/reduced-motion.md`.
- **Fixed `Task.sleep`/`setTimeout` choreography.** Use `PhaseAnimator`, `KeyframeAnimator` or transaction completion instead.
- **Custom motion on system chrome** (tab bar, toolbar, Liquid Glass containers). Let the system animate it; group glass in a `GlassEffectContainer` so it morphs.
- **Layout-thrashing CSS.** Animating `width`, `height`, `top` or `left` instead of `transform`.

## References

Load only what the task needs.

- `references/springs.md` : exact preset constants, the `(duration, bounce)` / `(response, dampingFraction)` / physical-spring maths, SwiftUI patterns, CSS `linear()` curves and a generator, Reanimated and Flutter presets.
- `references/symbol-effects.md` : discrete vs indefinite vs transition effects, layer-aware vs whole-symbol, availability.
- `references/transitions.md` : `matchedGeometryEffect` and namespaces, zoom navigation transitions, glass morphing, sheet detents, scroll transitions, drag release with velocity (SwiftUI, web, RN, Flutter).
- `references/reduced-motion.md` : how to audit and adapt every pattern for Reduce Motion across platforms.

## Verification

Swift snippets in these references are compiled by `./scripts/check-swift.sh` (`tests/swift/ios.swift`, section "apple-ui-motion"). Edit a snippet in both places. Web, React Native and Flutter snippets are not compiled by the repo; say so when handing them over. CSS and RN curves are derived from the spring equations, not copied from Apple, so describe them as matching the physics, not as Apple's own values.

Sources: WWDC23 "Animate with springs" (10158), "Explore SwiftUI animation" (10156), "Wind your way through advanced animations in SwiftUI" (10157), "Animate symbols in your app" (10258); WWDC24 "What's new in SwiftUI" (10144); WWDC18 "Designing Fluid Interfaces" (803); Human Interface Guidelines: Motion, and Accessibility (Motion).
