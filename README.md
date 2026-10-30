# Apple UI Skills

Teach your coding agent to build with **Apple's official UI kits**: design in Figma with real iOS, iPadOS, macOS, visionOS and watchOS components, turn them (or your own design) into SwiftUI or Next.js code, and check existing UI against them.

Works with Claude Code, Cursor, Windsurf, GitHub Copilot, Codex and [dozens of other agents](https://github.com/vercel-labs/skills/blob/main/docs/agents.md). Includes ready-to-use rule files: `.cursor/rules/apple-ui.mdc`, `.cursorrules`, and `.github/copilot-instructions.md`.

> Unofficial. Not affiliated with or endorsed by Apple. Contains no Apple artwork (see [NOTICE.md](NOTICE.md)).

## Quick start (about 3 minutes)

**1. Install**

```bash
npx skills add crankyjediii/apple-ui-skills
```

The installer asks which skills and which agents. Press Enter to accept the defaults. In Claude Code you can instead install it as a plugin, which also adds two helper agents and three commands:

```
/plugin marketplace add crankyjediii/apple-ui-skills
/plugin install apple-ui-skills@apple-ui-skills
```

**2. Optional: copy the kits into your Figma** (only for Figma steps)

Open each link, then choose *Open in Figma* and duplicate it to your drafts:
[macOS 26](https://www.figma.com/design/1oJBVhrLD3oLk3FwQPlFD4/) ·
[iOS and iPadOS 26](https://www.figma.com/design/huNIqDttz2Gg4R8L6g91YA/) ·
[visionOS 26](https://www.figma.com/design/r9eDkx0DAfRqGdTX6UkkG4/) ·
[watchOS 26](https://www.figma.com/design/il8U8FmGZmtGH3yNPFCPUV/)

For Figma steps only, connect the [Figma MCP server](https://help.figma.com/hc/en-us/articles/32132100833559) to your agent. Skip this if you don't use Figma.

**3. Ask**

> Set up the Apple UI kit skills for me. I'm building an iPhone app in SwiftUI.

The agent checks your setup and suggests a first task. Figma is not required: the skills work from their built-in references. Figma adds kit-file reads and Figma design steps.

## What can I ask for?

| I want to... | Say something like |
|---|---|
| Build a screen | "Build a SwiftUI settings screen for my iPhone app: `<describe it>`" |
| Design in Figma (needs Figma) | "Design a 3-step iPhone onboarding flow with the Apple components." |
| Build from a Figma link (needs Figma) | "Implement the macOS Buttons page in SwiftUI: `<figma link>`" |
| Use my design as a base | "Build my screen `<link>` in SwiftUI. Keep my custom cards as reusable views." |
| Get a web version | "Make this Next.js dashboard feel like iOS." |
| Review | "Audit this SwiftUI view against the Apple kits." |

More ready-to-paste prompts: [docs/prompts.md](docs/prompts.md). Having trouble? [docs/troubleshooting.md](docs/troubleshooting.md).

Want to see the web output first? Try the live interactive showcase & component playground at [crankyjediii.github.io/apple-ui-skills](https://crankyjediii.github.io/apple-ui-skills/) or open [`examples/web-demo/index.html`](examples/web-demo/index.html) in a browser. Want native Swift previews in Xcode? Open [`examples/apple-ui-gallery`](examples/apple-ui-gallery) in Xcode and activate the Canvas (`⌥⌘↩`).

## What is inside

| Skill | What it does |
|---|---|
| `apple-ui-setup` | Friendly first-run check and guidance |
| `apple-ui-core` | Entry point: routing, license guardrails, how kits are read |
| `apple-ui-ios-ipados` · `-macos` · `-visionos` · `-watchos` | Platform facts, a kit component index, and component-to-native-API tables |
| `apple-ui-figma-build` | Compose screens in Figma from kit component instances (needs Figma) |
| `apple-ui-figma-to-code` | Figma node to code, recognising kit components (needs Figma) |
| `apple-ui-swiftui` | SwiftUI and Liquid Glass patterns for all four platforms |
| `apple-ui-web` | Next.js, React and CSS tokens, materials and recipes |
| `apple-ui-cross-platform` | React Native, Flutter, Compose, Vue, Svelte |
| `apple-ui-audit` | HIG and kit-fidelity review |

Install only some: `npx skills add crankyjediii/apple-ui-skills --skill apple-ui-core --skill apple-ui-macos --skill apple-ui-swiftui`

Claude Code plugin extras: agents `apple-ui-implementer` and `apple-ui-reviewer`, commands `/apple-ui-skills:setup`, `/apple-ui-skills:implement`, and `/apple-ui-skills:audit`. Terminal diagnostic: `npm run doctor`.

## FAQ

**Does this include the Apple kits?** No. It reads your own Figma copy of Apple's Community files and writes original code. That keeps you within Apple's license.

**Is the web output "official"?** No. A website isn't Apple-OS software, so the web and cross-platform skills approximate Apple's look from public design guidelines and say so. Read [NOTICE.md](NOTICE.md).

**How current is it?** Indexed against the 26-series kits on 2026-10-30. The Swift snippets are type-checked against Xcode 26 SDKs for iOS, macOS, visionOS and watchOS (`npm run check:swift`). See [CHANGELOG.md](CHANGELOG.md) for version history.

**Can I contribute?** Yes, see [CONTRIBUTING.md](CONTRIBUTING.md). Kit updates and wrong mappings are the most useful reports.

## License

Code and prose: MIT ([LICENSE](LICENSE)). Apple's kits, SF fonts, SF Symbols and trademarks belong to Apple under their own terms.
