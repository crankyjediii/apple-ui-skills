export interface SkillItem {
  id: string;
  name: string;
  oneLiner: string;
  category: "Setup & Core" | "Platform Kits" | "Figma & Design" | "Code Implementation" | "Quality & Audit";
  description: string;
  whenToUse: string;
  routeInfo: string;
  samplePrompt: string;
  components?: string[];
}

export const SKILLS: SkillItem[] = [
  {
    id: "apple-ui-setup",
    name: "apple-ui-setup",
    oneLiner: "Friendly first-run check and setup guidance.",
    category: "Setup & Core",
    description:
      "Performs a polite onboarding check. Verifies your Figma MCP connection, helps duplicate the four official 26-series kits into your Figma account, identifies your target platform, and prepares your agent with tailored prompts.",
    whenToUse:
      "Use when first installing the skills, asking 'is this working', or whenever a Figma kit cannot be accessed.",
    routeInfo: "Routes to platform-specific and code-generation skills after checking setup.",
    samplePrompt: "Set up the Apple UI kit skills for me. I'm building an iPhone app in SwiftUI.",
  },
  {
    id: "apple-ui-core",
    name: "apple-ui-core",
    oneLiner: "Workflow entry point, routing, license guardrails, and kit reading.",
    category: "Setup & Core",
    description:
      "The foundational skill. Routes requests to the appropriate platform or stack skill, enforces strict license boundaries (never exporting or committing Apple artwork), and directs agents how to read Figma kits non-destructively.",
    whenToUse:
      "Always loaded first or referenced when tasks mention Apple, iOS, macOS, visionOS, watchOS, Liquid Glass, or HIG.",
    routeInfo: "Directs flow to platform skills (what controls exist) and stack skills (how to code them).",
    samplePrompt: "Read the button specifications from my duplicate of the iOS 26 Figma kit.",
  },
  {
    id: "apple-ui-ios-ipados",
    name: "apple-ui-ios-ipados",
    oneLiner: "iOS and iPadOS 26 kit knowledge, component index, and native API mappings.",
    category: "Platform Kits",
    description:
      "Deep knowledge of the iOS & iPadOS 26 design kit. Contains structured component indices and mapping tables linking Figma component sets to native SwiftUI and UIKit APIs.",
    whenToUse:
      "Use when designing or coding iPhone or iPad screens, tab bars, navigation stacks, sheets, lists, widgets, and Liquid Glass buttons.",
    routeInfo: "Pairs with apple-ui-swiftui or apple-ui-web for implementation.",
    samplePrompt: "Design an iOS 26 settings view with grouped inset lists and Liquid Glass controls.",
    components: ["Navigation Bar", "Tab Bar", "Inset Grouped List", "Sheet Modal", "Liquid Glass Button", "Segmented Control"],
  },
  {
    id: "apple-ui-macos",
    name: "apple-ui-macos",
    oneLiner: "macOS 26 kit knowledge, window chrome, toolbars, sidebars, and AppKit/SwiftUI mappings.",
    category: "Platform Kits",
    description:
      "Specialized in the desktop Mac experience. Covers window titlebars, traffic lights, unified toolbars, split-view sidebars, popovers, table views, sheets, and Liquid Glass chrome.",
    whenToUse:
      "Use when building or reviewing Mac desktop applications, window management, or desktop menu structures.",
    routeInfo: "Pairs with apple-ui-swiftui (AppKit backings) or apple-ui-web.",
    samplePrompt: "Implement the macOS Buttons page in SwiftUI from my Figma kit.",
    components: ["Window Chrome", "Unified Toolbar", "Split-View Sidebar", "Push Buttons", "Popovers", "Table Views"],
  },
  {
    id: "apple-ui-visionos",
    name: "apple-ui-visionos",
    oneLiner: "visionOS 26 kit knowledge, spatial windows, ornaments, glass UI, and eye-tracking targets.",
    category: "Platform Kits",
    description:
      "Comprehensive knowledge of Apple Vision Pro spatial UI: curved glass materials, depth layering, window ornaments, minimum 60pt eye-tracking hit targets, gaze-hover states, and SharePlay canvases.",
    whenToUse:
      "Use when designing or coding immersive visionOS applications, ornaments, or spatial windows.",
    routeInfo: "Pairs with apple-ui-swiftui using visionOS 26 SDK modifiers.",
    samplePrompt: "Create a spatial media viewer with bottom floating ornaments and 60pt hit targets.",
    components: ["Spatial Windows", "Window Ornaments", "Deep Glass Material", "60pt Eye Targets", "Gaze Hover"],
  },
  {
    id: "apple-ui-watchos",
    name: "apple-ui-watchos",
    oneLiner: "watchOS 26 kit knowledge, complications, Smart Stack widgets, and crown pickers.",
    category: "Platform Kits",
    description:
      "Knowledge of Apple Watch glanceable UI: full-bleed OLED pure-black canvas, high-contrast pill buttons, Smart Stack cards, circular and corner complications, and Digital Crown scrolling.",
    whenToUse:
      "Use when building Apple Watch apps, complication slots, or Smart Stack glanceable experiences.",
    routeInfo: "Pairs with apple-ui-swiftui for watchOS targets.",
    samplePrompt: "Design a watchOS workout tracker with Smart Stack metrics and large pill controls.",
    components: ["OLED Dark Canvas", "Pill Buttons", "Smart Stack Cards", "Watch Complications", "Crown Pickers"],
  },
  {
    id: "apple-ui-figma-build",
    name: "apple-ui-figma-build",
    oneLiner: "Compose screens in Figma from real kit component instances.",
    category: "Figma & Design",
    description:
      "Teaches coding agents to assemble screens inside Figma by instantiating real components from your kit duplicate—preserving component linkages, autolayout, and variant properties without detaching.",
    whenToUse:
      "Use when you want an agent to mock up or expand a design directly in Figma using official components.",
    routeInfo: "Works directly via the Figma MCP server.",
    samplePrompt: "Design a 3-step iPhone onboarding flow with the Apple components in Figma.",
  },
  {
    id: "apple-ui-figma-to-code",
    name: "apple-ui-figma-to-code",
    oneLiner: "Turn Figma nodes into code by recognizing official kit components.",
    category: "Figma & Design",
    description:
      "Analyzes Figma frames, identifies which elements correspond to Apple kit components, and translates them directly into idiomatic SwiftUI or Next.js code while keeping custom elements intact.",
    whenToUse:
      "Use when you provide a Figma link (kit page or custom design) and say 'implement this'.",
    routeInfo: "Hands off to apple-ui-swiftui, apple-ui-web, or apple-ui-cross-platform.",
    samplePrompt: "Build my screen <figma-url> in SwiftUI. Keep my custom cards as reusable views.",
  },
  {
    id: "apple-ui-swiftui",
    name: "apple-ui-swiftui",
    oneLiner: "Idiomatic SwiftUI and Liquid Glass patterns for all four Apple platforms.",
    category: "Code Implementation",
    description:
      "Emits production-ready, type-checked SwiftUI code matching the 26-series kits. Adheres to Dynamic Type, semantic colors, system materials, safe areas, and native platform conventions.",
    whenToUse:
      "Use when writing native iOS, iPadOS, macOS, visionOS, or watchOS code in Swift.",
    routeInfo: "References Xcode 26 SDK APIs and system modifiers.",
    samplePrompt: "Write a SwiftUI View for an iPad sidebar and detail navigation stack.",
  },
  {
    id: "apple-ui-web",
    name: "apple-ui-web",
    oneLiner: "Next.js, React and CSS tokens, materials, and recipes following Apple HIG principles.",
    category: "Code Implementation",
    description:
      "Provides CSS tokens, semantic colors, light/dark mode parity, glass materials for floating navigation, accessible switches, segmented controls, tab bars, and native dialog sheets for web applications.",
    whenToUse:
      "Use when building web interfaces, admin dashboards, or web mockups with an authentic Apple aesthetic.",
    routeInfo: "Contains self-contained tokens.css and recipes.md with zero runtime dependencies.",
    samplePrompt: "Make this Next.js dashboard feel like iOS using Apple design tokens.",
  },
  {
    id: "apple-ui-motion",
    name: "apple-ui-motion",
    oneLiner: "Springs, symbol effects, transitions, gesture velocity, and Reduce Motion.",
    category: "Code Implementation",
    description:
      "Codifies Apple motion: spring presets (.smooth, .snappy, .bouncy, .interactiveSpring) with exact constants, CSS linear() spring curves, Reanimated and Flutter equivalents, SF Symbol effects, matched-geometry and zoom transitions, sheet detents, release-velocity gestures, and a Reduce Motion audit.",
    whenToUse:
      "Use when choosing or tuning an animation, converting a spring to CSS, animating SF Symbols, or making motion accessible.",
    routeInfo: "Pairs with apple-ui-swiftui, apple-ui-web, or apple-ui-cross-platform for implementation.",
    samplePrompt: "Make this card expand with an Apple-style spring and a Reduce Motion fallback.",
  },
  {
    id: "apple-ui-cross-platform",
    name: "apple-ui-cross-platform",
    oneLiner: "Apple-style UI in React Native, Flutter, Compose, Vue, and Svelte.",
    category: "Code Implementation",
    description:
      "Maps Apple kit components and semantic tokens to cross-platform UI frameworks like React Native, Flutter, Kotlin Multiplatform Compose, Vue, and Svelte, noting platform approximations.",
    whenToUse:
      "Use when bringing an Apple-like look and feel to multi-platform codebases.",
    routeInfo: "Provides framework-specific mapping tables and styling guidelines.",
    samplePrompt: "Port this Apple-style segmented control and grouped list to Flutter.",
  },
  {
    id: "apple-ui-audit",
    name: "apple-ui-audit",
    oneLiner: "HIG and kit-fidelity review for SwiftUI, AppKit, UIKit, web, or Figma designs.",
    category: "Quality & Audit",
    description:
      "Runs systematic audits evaluating navigation structure, control selection, Dynamic Type, semantic color contrast, Liquid Glass placement (floating only, never on content), and 44pt/60pt hit targets.",
    whenToUse:
      "Use when reviewing, critiquing, or QA-testing existing UI code or Figma frames for HIG compliance.",
    routeInfo: "Produces an actionable findings table ordered by severity: High, Medium, Low.",
    samplePrompt: "Audit this SwiftUI view against the Apple kits and Human Interface Guidelines.",
  },
];

export const PLUGIN_EXTRAS = {
  agents: [
    {
      name: "apple-ui-implementer",
      role: "Implementation Specialist",
      description: "Autonomous agent configured to read kit specifications and generate type-checked SwiftUI or clean web code.",
    },
    {
      name: "apple-ui-reviewer",
      role: "HIG & Quality Reviewer",
      description: "Specialized auditor agent that checks existing UI against Human Interface Guidelines and returns prioritized issue tables.",
    },
  ],
  commands: [
    {
      command: "/apple-ui-skills:implement",
      description: "Quick command to turn a Figma node or UI specification into native SwiftUI or Next.js code.",
    },
    {
      command: "/apple-ui-skills:audit",
      description: "Instant command to run the apple-ui-audit checklist on the current view or code file.",
    },
  ],
};
