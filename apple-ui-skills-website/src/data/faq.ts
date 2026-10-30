export interface FaqItem {
  question: string;
  answer: string;
  moreLink?: {
    text: string;
    url: string;
  };
}

export const FAQS: FaqItem[] = [
  {
    question: "Does it include the Apple kits?",
    answer:
      "No. The repository contains zero Apple artwork, no exported Figma files, no SF font files, and no SF Symbols. Instead, it directs agents to read your own duplicated copy of Apple's official Community Figma files via the Figma MCP server and generates original, clean code. This architecture keeps your project strictly compliant with Apple's license agreement.",
    moreLink: {
      text: "Read NOTICE.md",
      url: "https://github.com/crankyjediii/apple-ui-skills/blob/main/NOTICE.md",
    },
  },
  {
    question: "Is the web output official?",
    answer:
      "No. Apple Design Resources are officially licensed for creating mock-ups of user interfaces for software that runs on Apple operating systems. Websites and cross-platform codebases are not Apple-OS software, so the apple-ui-web and cross-platform skills approximate Apple's visual hierarchy and interaction models from public Human Interface Guidelines using independent CSS tokens and recipes.",
    moreLink: {
      text: "See web recipes and tokens",
      url: "https://github.com/crankyjediii/apple-ui-skills/tree/main/skills/apple-ui-web",
    },
  },
  {
    question: "How current is it?",
    answer:
      "All skills are indexed against the official 26-series Apple kits (released for iOS/iPadOS 26, macOS 26, visionOS 26, and watchOS 26, Liquid Glass era). The Swift and SwiftUI snippets are continuously type-checked against Xcode 26 SDKs in CI across all four platforms.",
    moreLink: {
      text: "View v0.1.0 release notes",
      url: "https://github.com/crankyjediii/apple-ui-skills/releases/tag/v0.1.0",
    },
  },
  {
    question: "How do I contribute?",
    answer:
      "Contributions are warmly welcomed! The most valuable community contributions include updates for newly released Apple kit revisions, corrections to component-to-API mappings, additional web recipe patterns, and edge-case audit rules.",
    moreLink: {
      text: "Review CONTRIBUTING.md",
      url: "https://github.com/crankyjediii/apple-ui-skills/blob/main/CONTRIBUTING.md",
    },
  },
];
