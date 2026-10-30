---
name: apple-ui-figma-build
description: Compose screens in Figma from the official Apple 26 UI kit components (instances of the kit's real components, not redrawn shapes). Use when asked to design, mock up or lay out an iPhone, iPad, Mac, Vision Pro or Apple Watch screen in Figma using Apple components, or to extend a design built on the kits. Requires the Figma MCP and a duplicate of the relevant kit.
---

# Build Apple screens in Figma from the kits

Load `apple-ui-core` and the platform skill (`apple-ui-ios-ipados`, `apple-ui-macos`, `apple-ui-visionos`, `apple-ui-watchos`) first. Also follow the Figma plugin's `figma-use` and `figma-generate-design` skills; they are mandatory before any `use_figma` write.

## Where to build

- **Option A (no publishing needed)**: in the user's **duplicate of the kit**, add a new page (for example "My screens") and build there. Kit components are local, so instances are created from the component sets by node id.
- **Option B**: publish the duplicated kit as a team library, then in the user's design file use `search_design_system` and import by key. Prefer B for real projects; it needs a plan that allows library publishing.

Never modify the kit's own pages; work on a new page or file.

## Workflow

1. **Inspect**: `create_session`, then read the kit page for each component you need (`get_metadata` with the page id from the platform skill's `<platform skill>/references/components.md`). Read variant axes with the snippet in `apple-ui-core/references/figma-read.md`.
2. **Plan**: list the screen's regions (navigation, content, controls) and choose a kit component for each. Prefer public components; skip underscore parts.
3. **Frame**: use the device or window size from the kit's Examples page (read a sample frame with `get_metadata`) so safe areas and chrome line up. Use auto-layout for content stacks.
4. **Instantiate** (Option A): get the component set by id, find the variant matching the wanted axes, `createInstance()`, then adjust text and component properties with `setProperties`. Do not detach instances.
5. **Mode**: set Light or Dark by choosing the variant's `Mode` axis, or by setting the frame's variable mode if the kit exposes one.
6. **Styles**: apply the kit's text styles and color styles/variables by name. Do not paint new hex fills over system colors.
7. **Verify**: `get_screenshot` once after composition; fix overlaps or clipped text; one more screenshot after fixes. Return the frame's node id and URL to the user.

## Rules

- Instances only. If a needed control is not in the kit, say so and use the closest one, or draw a clearly named placeholder.
- Keep hit-target and spacing norms (44 pt iOS, 60 pt visionOS).
- Liquid Glass components go on the control layer above content, not behind text blocks.
- Do not export kit artwork out of Figma into the repo or the user's codebase (license). Exporting the user's own composed design for review is fine.
