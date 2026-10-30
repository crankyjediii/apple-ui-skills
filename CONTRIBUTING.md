# Contributing

Thanks for helping. Small fixes (typos, a wrong API mapping) can go straight to a pull request.

## Ground rules

1. **Never commit Apple artwork**: no images, SVG, PDF, `.fig`, fonts or icon files. CI fails if you do. Names, variant options and node ids as text are fine.
2. Write original prose and code. Don't paste text from Apple's documentation or kits.
3. Every API in a table should compile. Add it to `tests/swift/` and run `npm run check:swift` (needs Xcode 26).

## Add or change a skill

```
skills/<name>/SKILL.md          # required; name must equal the folder
skills/<name>/references/*.md   # optional detail loaded on demand
```

- Frontmatter needs `name` and a `description` of 40 to 1024 characters that says *when* to use it. Don't put `: ` inside an unquoted description.
- List new skills in `.claude-plugin/marketplace.json` and in the README table.
- Run `npm run validate` before opening a pull request.

## Update an index after Apple changes a kit

1. Open the kit's Change log page and note the date.
2. Run the snippet in `skills/apple-ui-core/references/figma-read.md` for each changed page (needs the Figma MCP).
3. Update that platform's `references/components.md`, including the "Indexed" date.
4. Check mappings in the platform's `SKILL.md` still fit.

## Test by hand

```bash
npx skills add ./ --list                      # discovery
npx skills add ./ --skill apple-ui-macos -a claude-code -y --copy   # run in a scratch project
```
