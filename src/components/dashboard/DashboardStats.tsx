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
import { MetricCard } from "@/components/common/MetricCard";

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
        <MetricCard
  title="Energy Health Score"
  value={`${analysis.score}/100`}
  subtitle={
    analysis.score >= 80
      ? "Excellent"
      : analysis.score >= 60
        ? "Good"
        : "Needs Improvement"
  }
  icon={Zap}
/>

        <MetricCard
  title="Monthly Usage"
  value={`${analysis.monthlyUsage.toFixed(1)} kWh`}
  subtitle="Estimated consumption"
  icon={Activity}
/>

        <MetricCard
  title="Monthly Cost"
  value={
    analysis.monthlyCost > 0
      ? `₦${analysis.monthlyCost.toLocaleString()}`
      : "—"
  }
  subtitle={
    analysis.monthlyCost > 0
      ? analysis.monthlyCost <= budget
        ? `₦${(budget - analysis.monthlyCost).toLocaleString()} below budget`
        : `₦${(analysis.monthlyCost - budget).toLocaleString()} above budget`
      : "Run Energy Planner to estimate your cost"
  }
  icon={CreditCard}
/>

        <MetricCard
  title="Backup Ready"
  value={
    advisor
      ? `${advisor.readinessScore}%`
      : "—"
  }
  subtitle={
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