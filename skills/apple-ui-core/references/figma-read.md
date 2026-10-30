# Read-only Figma snippets

Run with `use_figma` (pass `sessionId` and `skillNames: "figma-use"`). They only read.

## List component sets and variant axes on one page

Switch pages once per call. Replace `PAGE_ID` with a page id from the platform's `references/components.md`.

```js
const page = await figma.getNodeByIdAsync('PAGE_ID');
await figma.setCurrentPageAsync(page);
const sets = page.findAllWithCriteria({ types: ['COMPONENT_SET'] });
return sets.map(s => ({
  name: s.name,
  id: s.id,
  variants: s.children.length,
  axes: Object.fromEntries(Object.entries(s.variantGroupProperties || {}).map(([k, v]) => [k, v.values])),
}));
```

## Find the variant node for a combination

```js
const set = await figma.getNodeByIdAsync('COMPONENT_SET_ID');
const want = { Style: 'Bordered Colored', State: 'Idle' };   // axis -> value
const hit = set.children.find(v => Object.entries(want).every(([k, val]) => v.name.includes(`${k}=${val}`)));
return hit ? { id: hit.id, name: hit.name, w: hit.width, h: hit.height } : null;
```

Then call `get_design_context` on `hit.id` for exact layout, radii and text styles.

## Never

- Read `componentPropertyDefinitions` on a variant component (read it from the `COMPONENT_SET`).
- Loop over every page of a big kit in one call (macOS and iOS return too much); fan out one call per page.
