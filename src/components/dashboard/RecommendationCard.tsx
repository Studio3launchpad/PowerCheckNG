import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { GlassCard } from "@/components/common/GlassCard";
import { SectionHeader } from "@/components/common/SectionHeader";

import type { EnergyAnalysis } from "@/lib/energy/energy.types";

interface RecommendationCardProps {
  analysis: EnergyAnalysis;
}

export function RecommendationCard({
  analysis,
}: RecommendationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
    >
      <GlassCard className="p-4 sm:p-5">
        <SectionHeader
  title="Energy Recommendation"
  description="Personalised guidance based on your current energy profile."
/>
          <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              TODAY'S RECOMMENDATION
            </p>

            <p className="mt-3 text-[13px] leading-6 sm:text-sm lg:text-base">
              {analysis.recommendations[0]}
            </p>
          </div>

          <div className="mt-6">
            <Link
              to="/insights"
              className="inline-flex items-center text-[13px] font-semibold text-primary rounded-2xl border border-primary/40 bg-primary/5 px-5 py-3 transition-colors hover:underline sm:text-sm"
            >
              View Smart Insights →
            </Link>
          </div>
        
      </GlassCard>
    </motion.div>
  );
}