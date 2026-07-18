import { createFileRoute } from "@tanstack/react-router";
import { LandingNav } from "@/components/landing/LandingNav";
import { Hero } from "@/components/landing/Hero";
import { WhyPowerCheck } from "@/components/landing/WhyPowerCheck";
import { CoreFeatures } from "@/components/landing/CoreFeatures";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { CTASection } from "@/components/landing/CTASection";
import { LandingFooter } from "@/components/landing/LandingFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PowerCheckNG — Power, in your hands." },
      {
        name: "description",
        content: "Track outages, and monitor your consumption in real-time -all in one place.",
      },
      { property: "og:title", content: "PowerCheckNG — Power, in your hands." },
      {
        property: "og:description",
        content: "Track outages, and monitor your consumption in real-time -all in one place.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const previewCards = [
    {
      title: "Energy Health",
      value: "Good",
      subtitle: "Energy Profile Ready",
      subtitleClass: "text-green-500",
      valueClass: "",
    },
    {
      title: "Monthly Cost",
      value: "Estimated",
      subtitle: "Usage Analysis",
      subtitleClass: "text-primary",
      valueClass: "",
    },
    {
      title: "Community Power",
      value: "Reports Available",
      subtitle: "Nearby Updates",
      subtitleClass: "text-muted-foreground",
      valueClass: "text-red-500",
    },
    {
      title: "Backup Advisor",
      value: "Recommendations",
      subtitle: "Personalised",
      subtitleClass: "text-muted-foreground",
      valueClass: "",
    },
  ] as const;

  return (
    <div className="min-h-screen grid-bg">
      {/* Nav */}
      <LandingNav />

      {/* Hero */}
      <Hero />

      {/* Why PowerCheckNG */}
      <WhyPowerCheck />

      {/* Core Features */}
      <CoreFeatures />

      {/* How It Works */}
      <HowItWorks />

      <DashboardPreview />

      <CTASection />

      <LandingFooter />

    </div>
  );
}
