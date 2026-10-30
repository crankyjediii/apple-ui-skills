import { Hero } from "@/components/Hero";
import { ThreePillars } from "@/components/ThreePillars";
import { PlatformsSection } from "@/components/PlatformsSection";
import { PlaygroundSection } from "@/components/PlaygroundSection";
import { HowItWorks } from "@/components/HowItWorks";
import { SkillsGrid } from "@/components/SkillsGrid";
import { PromptsSection } from "@/components/PromptsSection";
import { VerifiedSection } from "@/components/VerifiedSection";
import { FaqSection } from "@/components/FaqSection";
import { CtaSection } from "@/components/CtaSection";

export default function Home() {
  return (
    <main>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Three things it does */}
      <ThreePillars />

      {/* 3. Platforms (segmented control + original mocks) */}
      <PlatformsSection />

      {/* 4. Interactive Playground (Liquid Glass & dynamic island) */}
      <PlaygroundSection />

      {/* 5. How it works (3 steps + terminal) */}
      <HowItWorks />

      {/* 6. The 12 skills (grid + native dialog sheet) */}
      <SkillsGrid />

      {/* 7. Try these prompts (copyable prompt cards) */}
      <PromptsSection />

      {/* 8. Verified (proof points list + honest limits) */}
      <VerifiedSection />

      {/* 9. FAQ (native <details> accordion) */}
      <FaqSection />

      {/* 10. Final Call to Action */}
      <CtaSection />
    </main>
  );
}
