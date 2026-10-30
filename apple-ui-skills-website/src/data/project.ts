export const PROJECT = {
  name: "Apple UI Skills",
  version: "0.4.0",
  tagline: "Teach your coding agent to build with Apple's official 26-series UI kits.",
  description:
    "Agent skills and a Claude Code plugin that teach coding agents to design in Figma with real Apple components, write native SwiftUI or Next.js code, and audit existing UI against the Human Interface Guidelines.",
  repoUrl: "https://github.com/crankyjediii/apple-ui-skills",
  releaseUrl: "https://github.com/crankyjediii/apple-ui-skills/releases/latest",
  issuesUrl: "https://github.com/crankyjediii/apple-ui-skills/issues",
  noticeUrl: "https://github.com/crankyjediii/apple-ui-skills/blob/main/NOTICE.md",
  licenseUrl: "https://github.com/crankyjediii/apple-ui-skills/blob/main/LICENSE",
  npxInstallCommand: "npx skills add crankyjediii/apple-ui-skills",
  npxSelectiveInstallCommand:
    "npx skills add crankyjediii/apple-ui-skills --skill apple-ui-core --skill apple-ui-web --skill apple-ui-audit",
  claudePluginMarketplace: "/plugin marketplace add crankyjediii/apple-ui-skills",
  claudePluginInstall: "/plugin install apple-ui-skills@apple-ui-skills",
};

export const PROOF_POINTS = [
  {
    title: "Swift snippets type-checked in CI",
    description:
      "All emitted Swift and SwiftUI code passes strict type-checking against Xcode 26 SDKs for iOS, macOS, visionOS, and watchOS.",
  },
  {
    title: "Web recipes build with strict TypeScript",
    description:
      "CSS tokens and React components build cleanly under strict TypeScript, rendering pixel-accurately in both light and dark modes.",
  },
  {
    title: "Live Figma node IDs spot-checked",
    description:
      "Component IDs and variant axes are verified against live Apple Community files for the 26-series kits.",
  },
  {
    title: "Complete 4-platform kit index",
    description:
      "A structured component index covering all four official Apple design kits: iOS/iPadOS, macOS, visionOS, and watchOS.",
  },
];

export const HONEST_LIMITS = [
  {
    title: "Approximated for web & cross-platform",
    description:
      "The web and cross-platform skills approximate Apple's look from public Human Interface Guidelines and operate outside Apple's kit license.",
  },
  {
    title: "Zero Apple artwork included",
    description:
      "The repository contains no Apple artwork: no Apple logo, no San Francisco font files, no SF Symbols assets, and no Figma file exports.",
  },
  {
    title: "Independent & unofficial",
    description:
      "This project is an independent community open-source project and is not affiliated with, sponsored by, or endorsed by Apple Inc.",
  },
];
