export interface PlatformData {
  id: "ios" | "macos" | "visionos" | "watchos";
  name: string;
  shortName: string;
  osName: string;
  highlight: string;
  description: string;
  components: string[];
  guidelinesSummary: string;
}

export const PLATFORMS: PlatformData[] = [
  {
    id: "ios",
    name: "iPhone & iPad",
    shortName: "iOS / iPadOS",
    osName: "iOS & iPadOS 26",
    highlight: "Fluid touch navigation, stacked views & grouped lists",
    description:
      "Modern iOS and iPadOS interfaces balance clarity with tactile depth. Liquid Glass elevates navigation toolbars and floating action bars while grouped inset cards organize controls seamlessly.",
    components: [
      "Navigation Bar & Stack",
      "Floating Glass Tab Bar",
      "Grouped Inset Lists",
      "Sheet Presentation Modal",
      "Liquid Glass Prominent Button",
      "Native Switch Toggle",
      "Segmented Control",
      "Context Menus & Actions",
    ],
    guidelinesSummary: "44pt touch minimum, Dynamic Type scaling, bottom-anchored floating bars.",
  },
  {
    id: "macos",
    name: "Mac",
    shortName: "macOS",
    osName: "macOS 26",
    highlight: "Unified window chrome, sidebar hierarchies & precision density",
    description:
      "macOS 26 brings unified window styling with subtle translucent vibrancy, robust split-view sidebars, precision controls, desktop menus, and high-density inspector panels.",
    components: [
      "Unified Window Titlebar",
      "Three-pane Split Sidebar",
      "System Push Buttons",
      "Desktop Popover Dialogs",
      "Inset Data Tables",
      "Segmented Mode Pickers",
      "Menu Bar Items",
      "Interactive Search Fields",
    ],
    guidelinesSummary: "Keyboard shortcuts, hover affordances, multi-column density, unified window chrome.",
  },
  {
    id: "visionos",
    name: "Vision Pro",
    shortName: "visionOS",
    osName: "visionOS 26",
    highlight: "Spatial depth, curved glass volumes & gaze interactions",
    description:
      "visionOS immerses UI in the user's physical space using deep glass materials that dynamically adapt to ambient light, edge ornaments, and 60pt targets optimized for gaze and pinch.",
    components: [
      "Curved Glass Window Surfaces",
      "Anchored Window Ornaments",
      "60pt Gaze-Target Controls",
      "Hover Glow Affordances",
      "Spatial Floating Toolbars",
      "Volumetric Modals",
      "SharePlay Spatial Canvases",
      "Gaze-and-Pinch Selectors",
    ],
    guidelinesSummary: "60pt minimum gaze targets, dynamic light refraction, no hard edges.",
  },
  {
    id: "watchos",
    name: "Apple Watch",
    shortName: "watchOS",
    osName: "watchOS 26",
    highlight: "Glanceable metrics, OLED contrast & crown-driven flow",
    description:
      "watchOS maximizes legibility on compact wrist displays with true OLED black canvases, high-contrast pill actions, Smart Stack widgets, and digital crown responsiveness.",
    components: [
      "Full-bleed OLED Canvas",
      "Full-width Pill Buttons",
      "Smart Stack Metric Cards",
      "Corner & Circular Complications",
      "Crown-responsive Lists",
      "Status Glances & Rings",
      "Vibrant Value Counters",
      "Vertical Paged Views",
    ],
    guidelinesSummary: "Glanceable simplicity, high OLED contrast, quick-tap pill controls.",
  },
];
