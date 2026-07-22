import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { GlassCard } from "@/components/GlassCard";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { SectionHeader } from "@/components/common/SectionHeader";

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

function ProfileMetric({ label, value }: ProfileMetricProps) {
  return (
    <div className="rounded-2xl border border-border p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>

      <div className="mt-2 text-xl font-bold leading-none sm:text-2xl">{value}</div>
    </div>
  );
}

export function EnergyProfileCard({ analysis }: EnergyProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <GlassCard className="p-4 sm:p-5">
        <SectionHeader
          title="Energy Profile"
          description="Your current energy setup."
          action={
            <Link
              to="/energy"
              className="text-[13px] font-semibold text-primary transition-colors hover:underline sm:text-sm"
            >
              Update
            </Link>
          }
        />
        <div className="mt-6 grid grid-cols-2 gap-4">
          <ProfileMetric label="Selected" value={analysis.applianceCount} />

          <ProfileMetric label="Essential" value={analysis.essentialApplianceCount} />

          <ProfileMetric label="Peak Load" value={`${analysis.peakLoad.toLocaleString()}W`} />

          <ProfileMetric
            label="Highest Consumer"
            value={
              <span className="text-sm font-semibold leading-6 sm:text-base">
                {analysis.highestConsumer}
              </span>
            }
          />
        </div>
      </GlassCard>
    </motion.div>
  );
}
