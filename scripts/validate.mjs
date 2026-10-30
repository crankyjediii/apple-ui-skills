#!/usr/bin/env node
// Lint the repo: skill frontmatter, referenced files, manifests, agents, commands, and forbidden asset types (Apple license).
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, extname, relative, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const errors = [];
const err = (m) => errors.push(m);

// Parse simple YAML frontmatter
const parseFrontmatter = (text, fileContext) => {
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) { err(`${fileContext}: missing frontmatter`); return null; }
  return Object.fromEntries(
    m[1].split('\n')
      .map((l) => l.match(/^(\w[\w-]*):\s*(.*)$/))
      .filter(Boolean)
      .map((x) => [x[1], x[2]])
  );
};

// Skills
const skillsDir = join(root, 'skills');
const skillNames = readdirSync(skillsDir).filter((d) => statSync(join(skillsDir, d)).isDirectory());
for (const name of skillNames) {
  const dir = join(skillsDir, name);
  const file = join(dir, 'SKILL.md');
  if (!existsSync(file)) { err(`${name}: missing SKILL.md`); continue; }
  const text = readFileSync(file, 'utf8');
  const fm = parseFrontmatter(text, name);
  if (!fm) continue;
  if (fm.name !== name) err(`${name}: frontmatter name "${fm.name}" must equal directory`);
  if (!/^[a-z0-9-]+$/.test(name)) err(`${name}: name must be lowercase letters, digits, hyphens`);
  if (!fm.description) err(`${name}: missing description`);
  else if (/^[^"'].*: /.test(fm.description)) err(`${name}: description has ": " unquoted, which breaks YAML parsers (quote it or reword)`);
  else if (fm.description.length > 1024) err(`${name}: description over 1024 chars (${fm.description.length})`);
  else if (fm.description.length < 40) err(`${name}: description too short to trigger reliably`);
  // Files referenced as `references/...` must exist
  for (const r of text.matchAll(/`(references\/[^`\s]+)`/g)) {
    if (!existsSync(join(dir, r[1]))) err(`${name}: references missing file ${r[1]}`);
  }
}

// Agents
const agentsDir = join(root, 'agents');
const agentFiles = existsSync(agentsDir) ? readdirSync(agentsDir).filter((f) => f.endsWith('.md')) : [];
for (const file of agentFiles) {
  const name = basename(file, '.md');
  const filePath = join(agentsDir, file);
  const text = readFileSync(filePath, 'utf8');
  const fm = parseFrontmatter(text, `agent ${file}`);
  if (!fm) continue;
  if (fm.name !== name) err(`agent ${file}: frontmatter name "${fm.name}" must match filename`);
  if (!fm.description) err(`agent ${file}: missing description`);
  if (!fm.tools) err(`agent ${file}: missing tools`);
}

// Commands
const commandsDir = join(root, 'commands');
const commandFiles = existsSync(commandsDir) ? readdirSync(commandsDir).filter((f) => f.endsWith('.md')) : [];
for (const file of commandFiles) {
  const filePath = join(commandsDir, file);
  const text = readFileSync(filePath, 'utf8');
  const fm = parseFrontmatter(text, `command ${file}`);
  if (!fm) continue;
  if (!fm.description) err(`command ${file}: missing description`);
}

// Manifests & Version alignment
const readJson = (p) => { try { return JSON.parse(readFileSync(join(root, p), 'utf8')); } catch (e) { err(`${p}: ${e.message}`); return null; } };
const pkg = readJson('package.json');
const plugin = readJson('.claude-plugin/plugin.json');
const market = readJson('.claude-plugin/marketplace.json');

const targetVersion = pkg?.version;
if (!targetVersion) {
  err('package.json: missing version');
} else {
  if (plugin && plugin.version !== targetVersion) {
    err(`.claude-plugin/plugin.json: version "${plugin.version}" does not match package.json "${targetVersion}"`);
  }
  for (const p of market?.plugins ?? []) {
    if (p.version && p.version !== targetVersion) {
      err(`.claude-plugin/marketplace.json (${p.name}): version "${p.version}" does not match package.json "${targetVersion}"`);
    }
  }
}

for (const p of market?.plugins ?? []) {
  for (const s of p.skills ?? []) {
    if (!existsSync(join(root, s, 'SKILL.md'))) err(`marketplace: ${s} has no SKILL.md`);
  }
  const listed = new Set((p.skills ?? []).map((s) => s.replace('./skills/', '')));
  for (const n of skillNames) if (!listed.has(n)) err(`marketplace: skill ${n} not listed`);
}

// Forbidden assets: Apple Design Resources must not be redistributed
const forbidden = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.pdf', '.fig', '.sketch', '.otf', '.ttf', '.woff', '.woff2', '.icon', '.heic']);
const ignoredDirs = new Set(['.git', 'node_modules', '_site', '.build', 'apple-ui-skills-website']);
const walk = (d) => {
  for (const e of readdirSync(d)) {
    if (ignoredDirs.has(e)) continue;
    const p = join(d, e);
    if (statSync(p).isDirectory()) walk(p);
    else if (forbidden.has(extname(e).toLowerCase())) err(`forbidden asset type: ${relative(root, p)}`);
  }
};
walk(root);

if (errors.length) {
  console.error(errors.map((e) => `x ${e}`).join('\n'));
  process.exit(1);
}
console.log(`ok: ${skillNames.length} skills, ${agentFiles.length} agents, ${commandFiles.length} commands validated (v${targetVersion})`);
