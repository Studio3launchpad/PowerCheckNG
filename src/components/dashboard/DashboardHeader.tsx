import { motion } from "framer-motion";

import { GlassCard } from "@/components/GlassCard";
import { PageHeader } from "@/components/common/PageHeader";

interface DashboardHeaderProps {
  monthlyCost: number;
  budget: number;
  currentStatus: string;
  area: string;
}

export function DashboardHeader({
  monthlyCost,
  budget,
  currentStatus,
  area,
}: DashboardHeaderProps) {
  const difference = Math.abs(budget - monthlyCost);

  const greeting =
    new Date().getHours() < 12
      ? "Morning"
      : new Date().getHours() < 17
        ? "Afternoon"
        : "Evening";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      <PageHeader
    title="Dashboard"
    description="Monitor your energy usage, backup readiness, outage status, and personalised recommendations in one place."
/>

      <p className="text-sm font-medium text-muted-foreground">
        Good {greeting} 👋
      </p>

      <GlassCard className="p-5 sm:p-6">
        <h2 className="text-lg font-semibold">
          Today's Summary
        </h2>

        <div className="mt-4 space-y-4">
          <p className="leading-7 text-muted-foreground">
            Your estimated monthly electricity cost is{" "}
            <span className="font-semibold text-foreground">
              ₦{monthlyCost.toLocaleString()}
            </span>{" "}
            which is{" "}
            <span className="font-semibold text-primary">
              ₦{difference.toLocaleString()}
            </span>
            {monthlyCost <= budget
              ? " below your planned budget."
              : " above your planned budget."}
          </p>

          <p className="leading-7 text-muted-foreground">
            Community reports currently indicate{" "}
            <span
              className={
                currentStatus === "Power ON"
                  ? "font-semibold text-green-500"
                  : "font-semibold text-red-500"
              }
            >
              {currentStatus}
            </span>{" "}
            around{" "}
            <span className="font-semibold text-foreground">
              {area}
            </span>
            .
          </p>
        </div>
      </GlassCard>
    </motion.div>
  );
}