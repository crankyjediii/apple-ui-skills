import type { Metadata, Viewport } from "next";
import "./globals.css";
import { HeaderNav } from "@/components/HeaderNav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

const basePath = process.env.BASE_PATH ?? "/apple-ui-skills";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export const metadata: Metadata = {
  title: "Apple UI Skills — Build with Apple's Official 26-Series Kits",
  description:
    "Agent skills and a Claude Code plugin that teach coding agents to design in Figma with real Apple components, write native SwiftUI or Next.js code, and audit UI against Human Interface Guidelines.",
  metadataBase: new URL("https://crankyjediii.github.io/apple-ui-skills"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Apple UI Skills",
    "Coding Agents",
    "Claude Code",
    "Figma MCP",
    "SwiftUI",
    "Next.js",
    "Liquid Glass",
    "iOS 26",
    "macOS 26",
    "visionOS 26",
    "watchOS 26",
    "Human Interface Guidelines",
  ],
  authors: [{ name: "crankyjediii", url: "https://github.com/crankyjediii" }],
  openGraph: {
    title: "Apple UI Skills — Build with Apple's Official 26-Series Kits",
    description:
      "Agent skills and a Claude Code plugin that teach coding agents to design in Figma with real Apple components, write native SwiftUI or Next.js code, and audit UI against Human Interface Guidelines.",
    url: "https://crankyjediii.github.io/apple-ui-skills",
    siteName: "Apple UI Skills",
    images: [
      {
        url: `${basePath}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Apple UI Skills - Agent skills for official 26-series UI kits",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apple UI Skills — Build with Apple's Official 26-Series Kits",
    description:
      "Agent skills and a Claude Code plugin that teach coding agents to design in Figma with real Apple components, write native SwiftUI or Next.js code, and audit UI against Human Interface Guidelines.",
    images: [`${basePath}/og-image.png`],
  },
  icons: {
    icon: [
      { url: `${basePath}/icon.svg`, type: "image/svg+xml" },
      { url: `${basePath}/favicon.png`, type: "image/png" },
    ],
    shortcut: `${basePath}/favicon.png`,
    apple: `${basePath}/icon.svg`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  name: "Apple UI Skills",
  description:
    "Agent skills and a Claude Code plugin that teach coding agents to build with Apple's official 26-series UI kits.",
  codeRepository: "https://github.com/crankyjediii/apple-ui-skills",
  programmingLanguage: ["Swift", "TypeScript", "CSS"],
  version: "0.4.0",
  license: "https://opensource.org/licenses/MIT",
  runtimePlatform: ["iOS", "macOS", "visionOS", "watchOS", "Web"],
  author: {
    "@type": "Person",
    name: "crankyjediii",
    url: "https://github.com/crankyjediii",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ScrollReveal />
        <HeaderNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
