---
name: apple-ui-setup
description: Friendly first-run check for the Apple UI kit skills. Use when the user says "set up", "get started", "is this working", "check my setup", or asks how to begin with these skills. Picks the platform and stack, checks the toolchain, and offers optional Figma access for kit files and Figma designs.
---

# Apple UI kits: setup check

Be brief and friendly. Do one step at a time and say what you found in plain words. Never ask the user to paste tokens or passwords. Figma is optional: nothing here requires it.

## 1. What are you making?

Ask once (offer the choices as a short list):
- Platform: iPhone/iPad, Mac, Apple Vision Pro, Apple Watch (one or more).
- Output: native SwiftUI, Next.js/React, another stack (React Native, Flutter...), or a review of existing UI.

Remember the answers; load the matching skills from `apple-ui-core`'s routing table.

## 2. Do they want Figma?

Ask once: do they want Figma (their own copy of the kits, or a design in Figma), or code and review from the built-in references only?

- References only: skip to step 4. Nothing needs installing.
- Figma: try a harmless read with the Figma MCP (for example `whoami`). If the tools are missing or fail, say that Figma is optional, the skills still work from the references, and point to Figma's MCP setup only for this Figma path. Then continue without it.

## 3. Can the kits be read? (only if they chose Figma and it works)

For each platform they chose, call `get_metadata` with the kit's file key (see `apple-ui-core/references/kits.md`) and no node id. Expected: a list of pages such as Cover, Getting Started, Colors, component pages.

- Works: say which kits are ready.
- Fails (no access): explain in two sentences. The kits are Community files, so the user opens the link, chooses *Open in Figma* or duplicates it into their drafts, then shares the new URL. Use the new file key from that URL from now on.

## 4. Toolchain (only if they chose Swift or web)

- Swift: run `xcodebuild -version`. Xcode 26 or later is needed for Liquid Glass APIs. If older, say the `.glass` styles need a fallback (see `apple-ui-swiftui` rule 6).
- Web: check `node -v` and the project's framework in `package.json`.

## 5. Finish

Reply with a short summary (what is ready, what is missing, one fix per missing item) and three example prompts tailored to their answers, such as:
- "Build the Settings screen for my iPhone app in SwiftUI: <describe it>."
- "Design an iPhone onboarding flow with the Apple components." (Figma path only)
- "Audit this view against the Apple kits."

Do not start building until they pick one.
