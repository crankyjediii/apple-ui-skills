# SF Symbol effects

Source: WWDC23 "Animate symbols in your app" (10258), "What's new in SF Symbols 5/6/7". API: `symbolEffect(_:options:value:)`, `symbolEffect(_:options:isActive:)`, `contentTransition(.symbolEffect)`, `transition(.symbolEffect)`. Effects need SF Symbols; custom images only animate if they are symbol images.

## Three kinds of effect

| Kind | Runs | You drive it with | Stops |
|---|---|---|---|
| **Discrete** | Once, then returns to rest | `value:` (fires when the value changes) | By itself |
| **Indefinite** | Until you turn it off | `isActive:` (a Bool tied to real state) | When `isActive` becomes false |
| **Transition** | During an appear/disappear or an image swap | `.transition(.symbolEffect(...))` or `.contentTransition(.symbolEffect(...))` | By itself |

Some effects are two kinds at once (for example pulse is both discrete and indefinite). Use the form that matches the intent: "this just happened" is discrete, "this is in progress" is indefinite.

## Matrix

| Effect | Discrete (`value:`) | Indefinite (`isActive:`) | Transition | Min OS | Use for |
|---|---|---|---|---|---|
| `.bounce` (+ `.up`, `.down`) | yes | | | 17 | Acknowledge a tap or arrival (added, sent, favourited) |
| `.pulse` | yes | yes | | 17 | Ongoing or pending state (recording, syncing); dims layers |
| `.variableColor` | yes | yes | | 17 | Progress or signal strength: layers highlight in turn |
| `.scale` (+ `.up`, `.down`) | | yes | | 17 | Selected or emphasised state held on screen |
| `.appear` / `.disappear` | | yes | yes | 17 | Show or hide a symbol with life |
| `.replace` (+ `.downUp`, `.upUp`, `.offUp`) | | | yes (content) | 17 | Swap one symbol for another: play/pause, heart/heart.fill |
| `.wiggle` (+ `.clockwise`, `.left`, ...) | yes | yes | | 18 | Attention: notification, error, incomplete |
| `.rotate` | yes | yes | | 18 | Refresh, settings gear, working |
| `.breathe` | yes | yes | | 18 | Calm "alive" state (listening, standby) |
| `.replace.magic(fallback:)` | | | yes (content) | 18 | Replace where the symbols share a badge or shape; morphs the common parts |
| `.drawOn` / `.drawOff` | | yes | yes | 26 | Draw a symbol's path on or off (checkmark completion, progress) |

(Minimum OS is the SDK that introduced the effect. Gate the 18 and 26 effects with `#available` if you support older systems.)

```swift
// Discrete: fires each time `liked` changes.
Image(systemName: "heart").symbolEffect(.bounce, value: liked)

// Indefinite: runs while the state is true. Tie it to real work, not decoration.
Image(systemName: "mic").symbolEffect(.pulse, isActive: isRecording)

// Progress: layers light up one after another, back and forth.
Image(systemName: "wifi")
    .symbolEffect(.variableColor.iterative.reversing, options: .repeating, isActive: isSearching)

// Transition between two symbols.
Image(systemName: liked ? "heart.fill" : "heart")
    .contentTransition(.symbolEffect(.replace.downUp.byLayer))

// 18+: magic replace falls back gracefully on older renderers.
Image(systemName: playing ? "pause.fill" : "play.fill")
    .contentTransition(.symbolEffect(.replace.magic(fallback: .replace)))

// 26: draw on/off.
Image(systemName: "checkmark.circle").symbolEffect(.drawOn, isActive: done)
```

## Modifiers on an effect

| Modifier | Meaning |
|---|---|
| `.byLayer` | Layers animate separately (sequenced). Needs a multi-layer symbol; falls back to whole-symbol |
| `.wholeSymbol` | Animate the symbol as one piece |
| `.up` / `.down` / `.clockwise` / `.counterClockwise` | Direction of bounce, scale, wiggle or rotate |
| `.iterative` / `.cumulative` (variableColor) | One layer at a time vs layers accumulating |
| `.reversing` (variableColor) | Run forward then backward |
| `.dimInactiveLayers` / `.hideInactiveLayers` (variableColor) | What happens to layers not currently highlighted |

Options: `.repeat(n)`, `.repeating`, `.repeat(.continuous)`, `.nonRepeating`, `.speed(x)`; combine as `options: .repeat(2).speed(1.5)`.

## Layer-aware vs whole-symbol

- **Layer-aware** (`.byLayer`, `.iterative`, `.cumulative`, hierarchical rendering) needs a symbol with several layers, such as `wifi` (arcs) or `speaker.wave.3`. Single-layer symbols (`star`) look identical either way.
- Rendering mode matters: `.symbolRenderingMode(.hierarchical)` or `.palette` makes layer effects visible; `.monochrome` still animates but with less contrast.
- **Whole-symbol** is right for acknowledgement (`bounce`) and for symbols that read as one object (`heart`, `bell`).
- Combine at most one indefinite effect plus one discrete effect on a symbol. Stacking several indefinite effects fights itself.
- Disable inherited effects with `.symbolEffectsRemoved()` for a subtree that should stay still.

## UIKit and AppKit

```swift
imageView.addSymbolEffect(.bounce)                       // discrete
imageView.addSymbolEffect(.pulse)                        // indefinite until removed
imageView.removeSymbolEffect(ofType: .pulse)
imageView.setSymbolImage(newImage, contentTransition: .replace)
```

## Do and don't

- Do trigger discrete effects from user actions and confirmations; do bind indefinite effects to a state that ends.
- Do keep the effect close to the control that caused it.
- Don't loop a symbol effect as pure decoration on a screen the user is reading.
- Don't use `.bounce` plus a bouncy spring plus haptics on the same tap; pick two.
- Reduce Motion: replace repeating effects with a static change (colour, fill, `.replace` without direction). See `reduced-motion.md`. Gate repeating effects yourself; do not assume the system suppresses them.
