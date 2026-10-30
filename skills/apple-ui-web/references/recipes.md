# Web recipes

All assume `tokens.css` is imported. Plain CSS shown; classes translate directly to Tailwind or CSS modules. The names echo the kit's component axes (Style, Size, State) as ordinary CSS variants.

## Button

```css
.btn {
  font: var(--text-body); font-weight: 600;
  min-height: 44px; padding: 0 20px; border: 0; border-radius: var(--r-pill);
  cursor: pointer; transition: transform var(--dur) var(--ease-spring), opacity 120ms;
}
.btn:active { transform: scale(0.97); opacity: 0.85; }
.btn:focus-visible { outline: 3px solid color-mix(in srgb, var(--tint) 50%, transparent); outline-offset: 2px; }
.btn:disabled { opacity: 0.35; cursor: default; }
.btn--prominent { background: var(--tint); color: #fff; }                         /* Bordered - Prominent */
.btn--tinted    { background: color-mix(in srgb, var(--tint) 15%, transparent); color: var(--tint); } /* Bordered */
.btn--gray      { background: var(--fill-2); color: var(--tint); }                /* Bordered - Secondary */
.btn--plain     { background: none; color: var(--tint); }                         /* Borderless */
.btn--destructive.btn--prominent { background: var(--red); }
.btn--small { min-height: 32px; padding: 0 14px; font: var(--text-subheadline); font-weight: 600; }
.btn--large { min-height: 50px; padding: 0 28px; }
```

## Switch

```html
<label class="switch"><input type="checkbox" role="switch"><span></span> Wi-Fi</label>
```
```css
.switch { display: inline-flex; align-items: center; gap: 12px; }
.switch input { appearance: none; width: 51px; height: 31px; border-radius: 16px; background: var(--fill);
  position: relative; transition: background var(--dur) var(--ease-spring); margin: 0; }
.switch input::after { content: ""; position: absolute; top: 2px; left: 2px; width: 27px; height: 27px;
  border-radius: 50%; background: #fff; box-shadow: 0 2px 4px rgba(0,0,0,.25);
  transition: transform var(--dur) var(--ease-spring); }
.switch input:checked { background: var(--green); }
.switch input:checked::after { transform: translateX(20px); }
.switch input:focus-visible { outline: 3px solid color-mix(in srgb, var(--tint) 50%, transparent); outline-offset: 2px; }
.switch input:disabled { opacity: .4; }
```

## Segmented control

```tsx
"use client";
import { useId, useState } from "react";
export function Segmented({ options, defaultValue }: { options: string[]; defaultValue: string }) {
  const name = useId();
  const [v, setV] = useState(defaultValue);
  return (
    <div role="radiogroup" className="seg">
      {options.map(o => (
        <label key={o} data-on={v === o}>
          <input type="radio" name={name} checked={v === o} onChange={() => setV(o)} />{o}
        </label>
      ))}
    </div>
  );
}
```
```css
.seg { display: inline-flex; padding: 2px; border-radius: 9px; background: var(--fill-2); }
.seg label { padding: 6px 14px; border-radius: 7px; font: var(--text-subheadline); font-weight: 500; cursor: pointer; }
.seg label[data-on="true"] { background: var(--bg-3); box-shadow: 0 1px 3px rgba(0,0,0,.15); }
.seg input { position: absolute; opacity: 0; pointer-events: none; }
.seg label:has(input:focus-visible) { outline: 3px solid color-mix(in srgb, var(--tint) 50%, transparent); }
```

## Floating tab bar (glass)

```html
<nav class="tabbar glass" aria-label="Primary">
  <a aria-current="page" href="/">Home</a><a href="/library">Library</a><a href="/search">Search</a>
</nav>
```
```css
.tabbar { position: fixed; inset: auto 16px max(16px, env(safe-area-inset-bottom)) 16px;
  display: flex; justify-content: space-around; padding: 8px; border-radius: 32px; }
.tabbar a { padding: 8px 16px; border-radius: 24px; color: var(--label-2); text-decoration: none; font: var(--text-caption-1); }
.tabbar a[aria-current="page"] { background: var(--fill-2); color: var(--tint); }
```

## Sheet (native dialog)

```html
<dialog class="sheet"><div class="grabber"></div> ... </dialog>
```
```css
.sheet { border: 0; padding: 8px 20px 24px; width: min(100%, 560px); margin: auto auto 0;
  border-radius: var(--r-sheet) var(--r-sheet) 0 0; background: var(--bg-2); color: var(--label); }
.sheet::backdrop { background: rgba(0,0,0,.35); }
.sheet .grabber { width: 36px; height: 5px; border-radius: 3px; background: var(--label-3); margin: 0 auto 12px; }
```
Open with `dialog.showModal()`; Escape and focus trap come for free.

## Grouped inset list

```css
.list { background: var(--bg-3); border-radius: var(--r-card); margin: 0 16px; padding: 0; list-style: none; overflow: hidden; }
.list > li { display: flex; align-items: center; justify-content: space-between; min-height: 44px; padding: 0 16px; }
.list > li + li { border-top: 0.5px solid var(--separator); }
```
Set the page background to `var(--grouped-bg)` for this look.

## Large title that collapses

Use `position: sticky; top: 0` on a compact bar and an `IntersectionObserver` on the large title: when it leaves view, add `data-collapsed` to the bar to fade in its inline title.
