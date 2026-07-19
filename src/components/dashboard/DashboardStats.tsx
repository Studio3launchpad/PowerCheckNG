import { motion } from "framer-motion";
import {
  Activity,
  Battery,
  CreditCard,
  Zap,
} from "lucide-react";

import type { EnergyAnalysis } from "@/lib/energy/energy.types";
import {
  buildBackupAdvisor,
} from "@/lib/backup/backupAdvisor";

import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { DashboardMetric } from "@/components/dashboard/common/DashboardMetric";

interface DashboardStatsProps {
  analysis: EnergyAnalysis;
  budget: number;
  advisor: ReturnType<typeof buildBackupAdvisor> | null;
}

export function DashboardStats({
  analysis,
  budget,
  advisor,
}: DashboardStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
    >
      <ResponsiveGrid columns={4}>
        <DashboardMetric
          title="Energy Health Score"
          value={`${analysis.score}/100`}
          description={
            analysis.score >= 80
              ? "Excellent"
              : analysis.score >= 60
                ? "Good"
                : "Needs Improvement"
          }
          icon={Zap}
        />

        <DashboardMetric
          title="Monthly Usage"
          value={`${analysis.monthlyUsage.toFixed(1)} kWh`}
          description="Estimated consumption"
          icon={Activity}
        />

        <DashboardMetric
  title="Monthly Cost"
  value={
    analysis.monthlyCost > 0
      ? `₦${analysis.monthlyCost.toLocaleString()}`
      : "—"
  }
  description={
    analysis.monthlyCost > 0
      ? analysis.monthlyCost <= budget
        ? `₦${(budget - analysis.monthlyCost).toLocaleString()} below budget`
        : `₦${(analysis.monthlyCost - budget).toLocaleString()} above budget`
      : "Run Energy Planner to estimate your cost"
  }
  icon={CreditCard}
/>

        <DashboardMetric
  title="Backup Ready"
  value={
    advisor
      ? `${advisor.readinessScore}%`
      : "—"
  }
  description={
    advisor
      ? advisor.bestTechnology === "INVERTER"
        ? "Inverter Recommended"
        : advisor.bestTechnology === "GENERATOR"
          ? "Generator Recommended"
          : "Hybrid Recommended"
      : "Complete Energy Planner"
  }
  icon={Battery}
/>
      </ResponsiveGrid>
    </motion.div>
  );
}