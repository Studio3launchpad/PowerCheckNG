import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { GlassCard } from "@/components/GlassCard";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { DashboardSection } from "@/components/dashboard/common/DashboardSection";

interface EnergyProfileCardProps {
  analysis: {
    applianceCount: number;
    essentialApplianceCount: number;
    peakLoad: number;
    highestConsumer: string;
  };
}

interface ProfileMetricProps {
  label: string;
  value: React.ReactNode;
}

function ProfileMetric({
  label,
  value,
}: ProfileMetricProps) {
  return (
    <div className="rounded-xl border border-border p-4">
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <div className="mt-2 text-2xl font-bold">
        {value}
      </div>
    </div>
  );
}

export function EnergyProfileCard({
  analysis,
}: EnergyProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <GlassCard className="p-5 sm:p-6">
        <DashboardSection
          title="Energy Profile"
          description="Your current energy setup."
          action={
            <Link
              to="/energy"
              className="text-sm font-semibold text-primary hover:underline"
            >
              Update →
            </Link>
          }
        >
          <div className="mt-5 grid grid-cols-2 gap-5">
            <ProfileMetric
              label="Selected"
              value={analysis.applianceCount}
            />

            <ProfileMetric
              label="Essential"
              value={analysis.essentialApplianceCount}
            />

            <ProfileMetric
              label="Peak Load"
              value={`${analysis.peakLoad.toLocaleString()}W`}
            />

            <ProfileMetric
  label="Highest Consumer"
  value={
    <span className="text-lg font-semibold leading-tight">
      {analysis.highestConsumer}
    </span>
  }
/>
          </div>
        </DashboardSection>
      </GlassCard>
    </motion.div>
  );
}