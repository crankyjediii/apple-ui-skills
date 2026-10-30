#!/usr/bin/env node
// Apple UI Skills: System, Toolchain, and Skills Doctor
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, basename, relative } from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const root = fileURLToPath(new URL('..', import.meta.url));

const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

const ok = (msg, detail = '') => console.log(` ${c.green}✓${c.reset} ${c.bold}${msg}${c.reset}${detail ? c.gray + ' (' + detail + ')' + c.reset : ''}`);
const warn = (msg, hint = '') => console.log(` ${c.yellow}!${c.reset} ${c.bold}${msg}${c.reset}${hint ? '\n     ' + c.yellow + '→ ' + hint + c.reset : ''}`);
const fail = (msg, hint = '') => console.log(` ${c.red}x${c.reset} ${c.bold}${msg}${c.reset}${hint ? '\n     ' + c.red + '→ ' + hint + c.reset : ''}`);
const info = (msg) => console.log(` ${c.cyan}ℹ${c.reset} ${msg}`);

const run = (cmd) => {
  try {
    return execSync(cmd, { stdio: ['pipe', 'pipe', 'ignore'], encoding: 'utf8' }).trim();
  } catch {
    return null;
  }
};

console.log(`\n${c.bold}Apple UI Skills Doctor${c.reset} ${c.gray}(v0.2.1)${c.reset}\n`);

let passed = 0;
let warnings = 0;
let failures = 0;

// 1. Environment & Node
console.log(`${c.bold}1. Runtime Environment${c.reset}`);
const nodeVer = process.versions.node;
const major = parseInt(nodeVer.split('.')[0], 10);
if (major >= 18) {
  ok('Node.js', `v${nodeVer}`);
  passed++;
} else {
  fail(`Node.js v${nodeVer} is older than required v18+`, 'Upgrade Node.js to 18 or newer');
  failures++;
}

const osPlatform = process.platform;
if (osPlatform === 'darwin') {
  const osVer = run('sw_vers -productVersion') || 'macOS';
  ok('Operating System', `macOS ${osVer}`);
  passed++;
} else {
  warn(`Host OS is ${osPlatform}`, 'Native Swift compiler checks require macOS. Web and cross-platform skills work on all OSes.');
  warnings++;
}

// 2. Xcode & Swift SDKs
console.log(`\n${c.bold}2. Native Apple Toolchain (macOS / Xcode)${c.reset}`);
const swiftVer = run('swift --version');
if (swiftVer) {
  const shortSwift = swiftVer.split('\n')[0].replace(/Apple Swift version /, 'Swift ');
  ok('Swift Compiler', shortSwift);
  passed++;
} else {
  warn('Swift compiler not found in PATH', 'Install Xcode or Xcode Command Line Tools for native Swift verification.');
  warnings++;
}

const xcodeVer = run('xcodebuild -version');
if (xcodeVer) {
  const xcLine = xcodeVer.split('\n')[0];
  ok('Xcode IDE', xcLine);
  passed++;
} else {
  info('xcodebuild not detected (Command Line Tools only or non-macOS)');
}

const checkSdk = (name, sdkName, targetSeries = '26') => {
  const sdkVer = run(`xcrun --sdk ${sdkName} --show-sdk-version`);
  const sdkPath = run(`xcrun --sdk ${sdkName} --show-sdk-path`);
  if (sdkVer && sdkPath) {
    const isTarget = sdkVer.startsWith(targetSeries);
    if (isTarget) {
      ok(`${name} SDK`, `v${sdkVer} (Apple ${targetSeries}-series native)`);
    } else {
      ok(`${name} SDK`, `v${sdkVer}`);
    }
    passed++;
  } else {
    warn(`${name} SDK (${sdkName}) not installed`, `Required only for compiling native ${name} targets.`);
    warnings++;
  }
};

if (osPlatform === 'darwin') {
  checkSdk('iOS Simulator', 'iphonesimulator');
  checkSdk('macOS', 'macosx');
  checkSdk('visionOS Simulator', 'xrsimulator');
  checkSdk('watchOS Simulator', 'watchsimulator');
}

// 3. Apple UI Skills Integrity
console.log(`\n${c.bold}3. Apple UI Skills & Reference Assets${c.reset}`);
const skillsDir = join(root, 'skills');
const expectedSkills = [
  'apple-ui-audit',
  'apple-ui-core',
  'apple-ui-cross-platform',
  'apple-ui-figma-build',
  'apple-ui-figma-to-code',
  'apple-ui-ios-ipados',
  'apple-ui-macos',
  'apple-ui-setup',
  'apple-ui-swiftui',
  'apple-ui-visionos',
  'apple-ui-watchos',
  'apple-ui-web'
];

let skillsHealthy = 0;
for (const s of expectedSkills) {
  const file = join(skillsDir, s, 'SKILL.md');
  if (existsSync(file)) {
    skillsHealthy++;
  } else {
    fail(`Missing skill: ${s}`);
    failures++;
  }
}
if (skillsHealthy === expectedSkills.length) {
  ok('Skills Directory', `All ${expectedSkills.length} skills present and indexed`);
  passed++;
}

// Reference files check
const expectedRefs = [
  'skills/apple-ui-core/references/patterns.md',
  'skills/apple-ui-core/references/kits.md',
  'skills/apple-ui-core/references/figma-read.md',
  'skills/apple-ui-ios-ipados/references/usage.md',
  'skills/apple-ui-ios-ipados/references/components.md',
  'skills/apple-ui-macos/references/usage.md',
  'skills/apple-ui-macos/references/components.md',
  'skills/apple-ui-visionos/references/usage.md',
  'skills/apple-ui-visionos/references/components.md',
  'skills/apple-ui-watchos/references/usage.md',
  'skills/apple-ui-watchos/references/components.md',
  'skills/apple-ui-web/references/tokens.css',
  'skills/apple-ui-web/references/recipes.md',
  'skills/apple-ui-web/references/tailwind-theme.css',
  'skills/apple-ui-cross-platform/references/recipes.md'
];

let refsHealthy = 0;
for (const r of expectedRefs) {
  if (existsSync(join(root, r))) refsHealthy++;
  else {
    fail(`Missing reference file: ${r}`);
    failures++;
  }
}
if (refsHealthy === expectedRefs.length) {
  ok('HIG References & Component Indexes', `${expectedRefs.length} canonical references verified`);
  passed++;
}

// 4. Claude Code Plugin & Slash Commands
console.log(`\n${c.bold}4. Claude Code Plugin Integration${c.reset}`);
const pluginJson = join(root, '.claude-plugin/plugin.json');
const marketJson = join(root, '.claude-plugin/marketplace.json');
const pkgJson = join(root, 'package.json');

if (existsSync(pluginJson) && existsSync(marketJson) && existsSync(pkgJson)) {
  try {
    const pkg = JSON.parse(readFileSync(pkgJson, 'utf8'));
    const plugin = JSON.parse(readFileSync(pluginJson, 'utf8'));
    const market = JSON.parse(readFileSync(marketJson, 'utf8'));
    const ver = pkg.version;
    if (plugin.version === ver && market.plugins?.[0]?.version === ver) {
      ok('Plugin Manifests', `v${ver} synchronized`);
      passed++;
    } else {
      fail('Version mismatch between package.json and .claude-plugin manifests');
      failures++;
    }
  } catch (e) {
    fail('Error parsing JSON manifests', e.message);
    failures++;
  }
}

const commands = ['setup.md', 'implement.md', 'audit.md'];
let commandsCount = 0;
for (const cmd of commands) {
  if (existsSync(join(root, 'commands', cmd))) commandsCount++;
}
if (commandsCount === commands.length) {
  ok('Slash Commands', `/setup, /implement, /audit registered`);
  passed++;
} else {
  warn(`Commands: found ${commandsCount}/${commands.length} expected commands`);
  warnings++;
}

const agents = ['apple-ui-implementer.md', 'apple-ui-reviewer.md'];
let agentsCount = 0;
for (const ag of agents) {
  if (existsSync(join(root, 'agents', ag))) agentsCount++;
}
if (agentsCount === agents.length) {
  ok('Helper Agents', `apple-ui-implementer, apple-ui-reviewer`);
  passed++;
}

// 5. Figma MCP Status (Optional Accelerator)
console.log(`\n${c.bold}5. Figma MCP Integration ${c.gray}(Optional Accelerator)${c.reset}`);
let figmaDetected = false;
let figmaSource = '';

if (process.env.FIGMA_ACCESS_TOKEN) {
  figmaDetected = true;
  figmaSource = 'FIGMA_ACCESS_TOKEN env variable';
} else {
  const claudeJson = join(homedir(), '.claude.json');
  if (existsSync(claudeJson)) {
    try {
      const content = readFileSync(claudeJson, 'utf8');
      if (content.toLowerCase().includes('figma')) {
        figmaDetected = true;
        figmaSource = '~/.claude.json configuration';
      }
    } catch {}
  }
}

if (figmaDetected) {
  ok('Figma MCP Connection', `Configured via ${figmaSource}`);
  info('Figma skills (apple-ui-figma-build, apple-ui-figma-to-code) available for live kit inspect & build.');
  passed++;
} else {
  info('Figma MCP is not connected.');
  info('Figma is optional: all skills work standalone using built-in HIG references.');
  info('To enable Figma kit reads, connect the Figma MCP server to your agent.');
}

// Summary
console.log(`\n${c.bold}──────── Summary ────────${c.reset}`);
if (failures === 0) {
  console.log(`${c.green}${c.bold}All systems ready!${c.reset} ${c.gray}(${passed} checks passed, ${warnings} warnings)${c.reset}\n`);
  console.log(`${c.bold}Next steps to try:${c.reset}`);
  console.log(` • In Claude Code: run ${c.cyan}/apple-ui-skills:setup${c.reset}`);
  console.log(` • In CLI: run ${c.cyan}npm run check:swift${c.reset} to type-check native Swift code`);
  console.log(` • In Chat: say ${c.cyan}"Build a SwiftUI settings screen for my iPhone app"${c.reset}\n`);
  process.exit(0);
} else {
  console.log(`${c.red}${c.bold}${failures} check(s) failed.${c.reset} Please review the issues above.\n`);
  process.exit(1);
}
