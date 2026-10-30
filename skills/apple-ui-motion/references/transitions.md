# Spatial transitions and gestures

Sources: WWDC24 "What's new in SwiftUI" (10144: zoom navigation transition, scroll transitions), WWDC23 "Explore SwiftUI animation" (10156), WWDC18 "Designing Fluid Interfaces" (803), Human Interface Guidelines: Motion, Sheets. Swift snippets are compiled by `./scripts/check-swift.sh`.

## Principles (WWDC18 803)

1. **Direct manipulation.** While a finger is down, content follows it 1:1 with no animation.
2. **Release continues momentum.** The animation that starts on release inherits the finger's velocity.
3. **Interruptible and redirectable.** A touch during any animation takes over from the current position and velocity. Never lock input while something moves.
4. **Project, don't threshold.** Decide the destination from where the motion would come to rest, not only where the finger is.
5. **Spatial consistency.** What slides in from the right leaves to the right; what zooms from a card returns to that card.

## Matched geometry (hero moves)

```swift
struct MotionHero: View {
    @Namespace private var hero          // one namespace per hero relationship, owned by the common parent
    @State private var open = false
    var body: some View {
        ZStack {
            if open {
                RoundedRectangle(cornerRadius: 28).matchedGeometryEffect(id: "card", in: hero).frame(height: 400)
            } else {
                RoundedRectangle(cornerRadius: 12).matchedGeometryEffect(id: "card", in: hero).frame(width: 80, height: 80)
            }
        }
        .onTapGesture { withAnimation(.smooth) { open.toggle() } }
    }
}
```

Namespace scoping rules:
- Declare `@Namespace` once in the view that owns **both** ends, and pass `Namespace.ID` down (`let ns: Namespace.ID`). A new `@Namespace` in each child breaks the match.
- The `id` is unique per on-screen pair. In a list use the model's identifier (`item.id`), never the index.
- Exactly one view per id should be present at a time (the `if/else` above), or mark the source with `isSource:`.
- Apply `matchedGeometryEffect` **before** `.frame`/size modifiers on each end, so the effect sees the size you want animated.
- The change must happen inside `withAnimation` or an `.animation(_:value:)` that covers it.
- Different `id`s in the same namespace do not interact. Use a second namespace for an unrelated hero, not a prefix trick.
- Keep matched geometry for in-view transformations. For cross-screen moves use the navigation zoom below.

## Navigation zoom transition (iOS 18+, WWDC24)

```swift
struct MotionTransitions: View {
    @Namespace private var ns
    let items = ["a", "b"]
    var body: some View {
        NavigationStack {
            List(items, id: \.self) { item in
                NavigationLink(value: item) { Text(item) }
                    .matchedTransitionSource(id: item, in: ns)
            }
            .navigationDestination(for: String.self) { item in
                Text(item).navigationTransition(.zoom(sourceID: item, in: ns))
            }
        }
    }
}
```

- The source gets `matchedTransitionSource(id:in:)`; the destination gets `.navigationTransition(.zoom(sourceID:in:))`, with the same id and namespace.
- Works for `NavigationStack` pushes and for `sheet`/`fullScreenCover` content. It brings the system's interactive swipe-back and interruption for free.
- Use it when a tile, card or thumbnail visibly becomes the next screen. For plain list drill-ins keep the default push.
- Lists with reuse: keep the id stable per model, not per cell.

## Glass morphing (iOS 26)

Liquid Glass shapes in one `GlassEffectContainer` blend and morph when they appear, disappear or change. Give related elements an id:

```swift
GlassEffectContainer(spacing: 16) {
    HStack {
        Button("A") { withAnimation(.bouncy) { expanded.toggle() } }.glassEffectID("a", in: ns)
        if expanded { Button("B") { }.glassEffectID("b", in: ns) }
    }
    .buttonStyle(.glass)
}
```

Use `.bouncy` here: glass separating is one of the few places bounce reads as physical. Put glass only on floating controls (`apple-ui-swiftui`).

## Sheets and detents

```swift
.sheet(isPresented: $sheet) {
    Text("Sheet")
        .presentationDetents([.height(220), .medium, .large], selection: $detent)
        .presentationDragIndicator(.visible)
        .presentationBackgroundInteraction(.enabled(upThrough: .medium))
}
```

- System sheets already carry spring motion, velocity-aware dismissal and interruption. Customise detents, not the animation.
- Offer detents that match content: `.height` for a fixed panel, `.medium` for partial, `.large` for full. Two or three is plenty.
- `presentationBackgroundInteraction(.enabled(upThrough:))` keeps the content behind live (maps, players); omit it for modal tasks.
- Do not stack custom `offset` animations on a system sheet. If you need a bespoke bottom panel, build it with the drag pattern below.

## Scroll transitions

```swift
ScrollView {
    ForEach(0..<5) { _ in
        Rectangle().frame(height: 120)
            .scrollTransition(.animated(.snappy)) { c, phase in
                c.opacity(phase.isIdentity ? 1 : 0.4).scaleEffect(phase.isIdentity ? 1 : 0.95)
            }
    }
}
```

Small opacity and scale only. Large parallax, rotation or blur on scroll is a Reduce Motion hazard; see `reduced-motion.md`.

## Drag release with velocity

SwiftUI: `DragGesture.Value.velocity` (pt/s, iOS 17+) gives release speed. Spring `initialVelocity` is **normalised**: fractions of the remaining distance per second, positive toward the target.

```swift
/// Where a flick would come to rest (WWDC18 803); velocity in pt/s, rate per ms.
func project(velocity: CGFloat, decelerationRate: CGFloat = 0.998) -> CGFloat {
    (velocity / 1000) * decelerationRate / (1 - decelerationRate)
}

struct MotionDragRelease: View {
    @State private var y: CGFloat = 0
    @State private var dismissed = false
    private let travel: CGFloat = 300
    var body: some View {
        RoundedRectangle(cornerRadius: 24).frame(height: 400)
            .offset(y: y)
            .gesture(
                DragGesture()
                    .onChanged { y = max(0, $0.translation.height) }   // 1:1 tracking, no animation
                    .onEnded { value in
                        let rest = y + project(velocity: value.velocity.height)
                        let target: CGFloat = rest > travel / 2 ? travel : 0
                        // Normalise: fraction of the remaining distance covered per second.
                        let distance = target - y
                        let v = abs(distance) < 1 ? 0 : value.velocity.height / distance
                        withAnimation(.interpolatingSpring(.smooth, initialVelocity: v)) {
                            y = target
                            dismissed = target == travel
                        }
                    }
            )
    }
}
```

`decelerationRate` 0.998 is UIKit's `.normal` scroll deceleration; use 0.99 (`.fast`) for snappier projection.

Shake for errors (pair with a haptic):

```swift
.keyframeAnimator(initialValue: 0.0, trigger: failures) { c, x in c.offset(x: x) } keyframes: { _ in
    KeyframeTrack {
        LinearKeyframe(-8, duration: 0.05); LinearKeyframe(8, duration: 0.08)
        LinearKeyframe(-5, duration: 0.08); SpringKeyframe(0, duration: 0.2, spring: .snappy)
    }
}
.sensoryFeedback(.error, trigger: failures)
```

### UIKit

```swift
// Normalised velocity, then hand it to a spring.
let v = CGVector(dx: 0, dy: velocity.y / max(abs(target - view.center.y), 1))
let timing = UISpringTimingParameters(dampingRatio: 1, initialVelocity: v)   // or mass/stiffness/damping
let animator = UIViewPropertyAnimator(duration: 0, timingParameters: timing)
animator.addAnimations { view.center.y = target }
animator.startAnimation()
// Interrupt: animator.pauseAnimation(); read view.layer.presentation(); then retarget.
```

(UIKit snippet is not compiled by the repo scripts.)

### Web

```js
// Track recent pointer samples, measure velocity over the last ~100 ms.
const samples = [];
el.addEventListener('pointermove', (e) => {
  samples.push({ t: e.timeStamp, y: e.clientY });
  while (samples.length && e.timeStamp - samples[0].t > 100) samples.shift();
});
function releaseVelocity() {            // px per second
  if (samples.length < 2) return 0;
  const a = samples[0], b = samples.at(-1);
  return ((b.y - a.y) / (b.t - a.t)) * 1000;
}
// Then: remaining = target - currentY; v0 = releaseVelocity() / remaining (1/s).
// Generate a curve with that v0 (springs.md generator), or use a spring library that takes velocity.
```

Use `touch-action: none` on the draggable, set `pointer-capture`, and update `transform` directly while dragging (no transition). Add `transition` only on release. A CSS transition cannot be retargeted with velocity; for fully interruptible web motion use the Web Animations API (`el.getAnimations()`, read the current `transform`, cancel, restart) or a spring library.

Shared-element equivalent on the web: View Transitions (`document.startViewTransition(() => update())` with matching `view-transition-name`). Customise with `::view-transition-group(*) { animation-timing-function: var(--spring-smooth); animation-duration: var(--spring-smooth-duration); }`. Feature-detect and fall back to an instant update.

### React Native (Reanimated + Gesture Handler)

```ts
const y = useSharedValue(0);
const pan = Gesture.Pan()
  .onChange((e) => { y.value = Math.max(0, y.value + e.changeY); })
  .onEnd((e) => {
    const rest = y.value + (e.velocityY / 1000) * (0.998 / (1 - 0.998));
    const target = rest > TRAVEL / 2 ? TRAVEL : 0;
    y.value = withSpring(target, { mass: 1, stiffness: 157.9, damping: 25.13, velocity: e.velocityY });
  });
```

### Flutter

```dart
// `controller` is AnimationController.unbounded and drives y in pixels, so the simulation
// takes the raw pixel velocity. `smooth` is from springs.md.
void onDragEnd(DragEndDetails d) {
  final vy = d.velocity.pixelsPerSecond.dy;
  final rest = y + (vy / 1000) * (0.998 / (1 - 0.998));
  final target = rest > travel / 2 ? travel : 0.0;
  controller.animateWith(SpringSimulation(smooth, y, target, vy));
}
```

(Web, RN and Flutter snippets are not compiled by the repo.)
