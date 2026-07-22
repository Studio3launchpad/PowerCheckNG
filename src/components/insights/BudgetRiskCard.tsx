import { GlassCard } from "@/components/common/GlassCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import type { BudgetRisk, EnergyInsightProfile } from "@/lib/insights/insight.types";
import { TriangleAlert } from "lucide-react";


type Props = {
  profile: EnergyInsightProfile;
};

type RiskConfig = {
  label: string;
  description: string;
  textClass: string;
  barClass: string;
};

const riskConfig: Record<BudgetRisk, RiskConfig> = {
  NO_BUDGET: {
    label: "No Budget Set",
    description:
      "Set a monthly electricity budget in the Smart Energy Planner to unlock budget risk analysis.",
    textClass: "text-muted-foreground",
    barClass: "bg-muted-foreground",
  },

  LOW: {
    label: "Low Risk",
    description:
      "Your projected electricity cost is comfortably within your current monthly energy budget.",
    textClass: "text-green-500",
    barClass: "bg-green-500",
  },

  MODERATE: {
    label: "Moderate Risk",
    description:
      "Your projected electricity cost is close to your monthly budget limit and may need monitoring.",
    textClass: "text-yellow-500",
    barClass: "bg-yellow-500",
  },

  HIGH: {
    label: "High Risk",
    description:
      "Your projected electricity cost significantly exceeds your planned monthly energy budget.",
    textClass: "text-orange-500",
    barClass: "bg-orange-500",
  },

  CRITICAL: {
    label: "Critical Risk",
    description:
      "Your current appliance usage pattern may be financially difficult to sustain within your planned budget.",
    textClass: "text-red-500",
    barClass: "bg-red-500",
  },
};

export function BudgetRiskCard({ profile }: Props) {
  const { analysis, budget, budgetRisk, budgetDifference, budgetUsagePercentage } = profile;

  const config = riskConfig[budgetRisk];

  const progressPercentage = budget <= 0 ? 0 : Math.min(budgetUsagePercentage, 100);

  return (
    <GlassCard className="p-4 sm:p-5">
      <SectionHeader
        icon={TriangleAlert}
        title="Monthly Budget Risk"
        description="Understand how your projected electricity cost compares with your monthly budget."
      />
      <div
        className={`mt-6 rounded-2xl border p-5 ${
          budgetRisk === "LOW"
            ? "border-green-500/20 bg-green-500/5"
            : budgetRisk === "MODERATE"
              ? "border-yellow-500/20 bg-yellow-500/5"
              : budgetRisk === "HIGH"
                ? "border-orange-500/20 bg-orange-500/5"
                : budgetRisk === "CRITICAL"
                  ? "border-red-500/20 bg-red-500/5"
                  : "border-border"
        }`}
      >
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Current Risk Level
        </p>

        <p className={`mt-2 text-xl font-bold ${config.textClass}`}>{config.label}</p>

        <p className="mt-3 text-[13px] leading-6 text-muted-foreground sm:text-sm lg:text-base">
          {config.description}
        </p>
      </div>

      {budget > 0 && (
        <>
          <div className="mt-8 h-3 overflow-hidden rounded-full bg-border">
            <div
              className={`h-full rounded-full transition-all duration-500 ${config.barClass}`}
              style={{
                width: `${progressPercentage}%`,
              }}
            />
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Estimated Cost
              </p>

              <p className="mt-1 text-lg font-semibold">
                ₦{Math.round(analysis.monthlyCost).toLocaleString()}
              </p>
            </div>

            {budget > 0 && (
              <div className="sm:text-right">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Monthly Budget
                </p>

                <p className="mt-1 text-lg font-semibold">₦{Math.round(budget).toLocaleString()}</p>
              </div>
            )}
          </div>
        </>
      )}
    </GlassCard>
  );
}
