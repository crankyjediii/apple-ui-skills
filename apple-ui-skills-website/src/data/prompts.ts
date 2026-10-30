export interface PromptExample {
  title: string;
  category: "Design" | "SwiftUI" | "Web" | "Audit" | "Setup";
  prompt: string;
  description: string;
}

export const PROMPT_EXAMPLES: PromptExample[] = [
  {
    title: "Design Onboarding Flow in Figma",
    category: "Design",
    prompt: "Design a 3-step iPhone onboarding flow with the Apple components.",
    description: "Instructs your agent to compose complete onboarding screens in Figma using real instances from the iOS 26 kit.",
  },
  {
    title: "Implement macOS Controls in SwiftUI",
    category: "SwiftUI",
    prompt: "Implement the macOS Buttons page in SwiftUI: <figma link>",
    description: "Takes a Figma page or frame node and generates clean, native AppKit/SwiftUI button variants with system styling.",
  },
  {
    title: "Apple-Style Next.js Dashboard",
    category: "Web",
    prompt: "Make this Next.js dashboard feel like iOS.",
    description: "Applies tokens.css semantic colors, inset grouped lists, and glass navigation to bring Apple polish to a web application.",
  },
  {
    title: "HIG & Kit-Fidelity Audit",
    category: "Audit",
    prompt: "Audit this SwiftUI view against the Apple kits.",
    description: "Reviews your SwiftUI code against Human Interface Guidelines, flagging custom non-system controls, contrast bugs, and misplaced glass.",
  },
  {
    title: "Turn Custom Figma Design into Code",
    category: "SwiftUI",
    prompt: "Build my screen <figma link> in SwiftUI. Keep my custom cards as reusable views.",
    description: "Maps standard kit elements to system components while preserving your custom branded cards as clean reusable views.",
  },
  {
    title: "Setup & Guided Onboarding",
    category: "Setup",
    prompt: "Set up the Apple UI kit skills for me. I'm building an iPhone app in SwiftUI.",
    description: "Verifies your environment, checks your duplicated Figma kits, and tailors the workflow to your specific project stack.",
  },
];
