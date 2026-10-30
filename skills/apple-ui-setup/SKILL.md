---
name: apple-ui-setup
description: Friendly first-run check for the Apple UI kit skills. Use when the user says "set up", "get started", "is this working", "check my setup", asks how to begin with these skills, or when a kit cannot be read. Confirms the Figma connection, finds or guides duplicating the four Apple kits, picks the target platform and stack, and finishes with example prompts.
---

# Apple UI kits: setup check

Be brief and friendly. Do one step at a time and say what you found in plain words. Never ask the user to paste tokens or passwords.

## 1. What are you making?

Ask once (offer the choices as a short list):
- Platform: iPhone/iPad, Mac, Apple Vision Pro, Apple Watch (one or more).
- Output: design in Figma, native SwiftUI, Next.js/React, or another stack (React Native, Flutter...).

Remember the answers; load the matching skills from `apple-ui-core`'s routing table.

## 2. Is Figma connected?

Try a harmless read with the Figma MCP (for example `whoami`). If the tools do not exist or fail:
- Tell the user the Figma connection is missing and that only Figma-based steps need it. Native code and web recipes still work without it.
- Point them to Figma's MCP server setup for their agent, then retry.

## 3. Can the kits be read?

For each platform they chose, call `get_metadata` with the kit's file key (see `apple-ui-core/references/kits.md`) and no node id. Expected: a list of pages such as Cover, Getting Started, Colors, component pages.

- Works: say which kits are ready.
- Fails (no access): explain in two sentences. The kits are Community files, so the user opens the link, chooses *Open in Figma* or duplicates it into their drafts, then shares the new URL. Use the new file key from that URL from now on.

## 4. Toolchain (only if they chose Swift or web)

- Swift: run `xcodebuild -version`. Xcode 26 or later is needed for Liquid Glass APIs. If older, say the `.glass` styles need a fallback (see `apple-ui-swiftui` rule 6).
- Web: check `node -v` and the project's framework in `package.json`.

## 5. Finish

Reply with a short summary (what is ready, what is missing, one fix per missing item) and three example prompts tailored to their answers, such as:
- "Build the Settings screen from <their kit URL> in SwiftUI."
- "Design an iPhone onboarding flow with the Apple components."
- "Audit this view against the Apple kits."

Do not start building until they pick one.
