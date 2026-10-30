# Troubleshooting

Start with: *"Check my Apple UI kit setup."* Or in Claude Code, run `/apple-ui-skills:setup`. From the terminal, run `node scripts/doctor.mjs` (or `npm run doctor`). The `apple-ui-setup` skill walks through everything below.

| Problem | Fix |
|---|---|
| The agent doesn't use the skills | Check they're installed: `npx skills list`. Then name the platform in your request ("iPhone", "Mac"...). Restart the agent session after installing. |
| `npx skills add` finds only some skills | A `SKILL.md` has invalid frontmatter. Run `node scripts/validate.mjs` in a clone and fix what it reports (usually a `: ` inside an unquoted description). |
| I don't use Figma, and I'm asked to install something | Nothing to install. The skills work from the built-in references. Figma steps are optional. |
| The agent says it can't read the kit (Figma steps only) | Open the kit link in Figma, duplicate it to your drafts, and give the agent your copy's URL. For Figma steps, the Figma MCP server must be connected to your agent. |
| `get_metadata` works but `use_figma` fails | `use_figma` needs the Figma MCP server's write-capable tools enabled. Reads in these skills are read-only; if your setup blocks the tool, ask for `get_metadata` and `get_design_context` only. |
| A component name isn't in the index | Apple changed the kit. Open the kit's *Change log* page, then re-run the snippet in `skills/apple-ui-core/references/figma-read.md` for that page and update `references/components.md`. |
| Liquid Glass APIs don't compile | They need Xcode 26 and a 26 deployment target. Wrap them in `#available` and fall back to `.bordered` or `Material` (see `apple-ui-swiftui`). |
| The web demo has no blur | Your browser lacks `backdrop-filter`, or Reduce Transparency is on. The opaque fallback is intentional. |
| `npm` says the cache is root-owned | Run `sudo chown -R "$(id -u):$(id -g)" ~/.npm` once, or set `npm_config_cache` to a folder you own. |
| Is this allowed by Apple's license? | The repo ships no Apple artwork and tells agents to write original code. Read `NOTICE.md`. Web and non-Apple targets are approximations and outside the kit license. |
