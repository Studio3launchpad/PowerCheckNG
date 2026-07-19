import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { GlassCard } from "@/components/GlassCard";
import { DashboardSection } from "@/components/dashboard/common/DashboardSection";

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
      <GlassCard className="p-6">
        <DashboardSection
          title="Energy Recommendation"
          description="Personalised guidance based on your current energy profile."
        >
          <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-5">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              TODAY'S RECOMMENDATION
            </p>

            <p className="mt-3 text-base leading-7">
              {analysis.recommendations[0]}
            </p>
          </div>

          <div className="mt-6">
            <Link
              to="/insights"
              className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
            >
              View Smart Insights →
            </Link>
          </div>
        </DashboardSection>
      </GlassCard>
    </motion.div>
  );
}