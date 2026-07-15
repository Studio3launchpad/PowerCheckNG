import { GlassCard } from "@/components/GlassCard";

import type {
  BudgetRisk,
  EnergyInsightProfile,
} from "@/lib/insights/insight.types";

type Props = {
  profile: EnergyInsightProfile;
};

type RiskConfig = {
  label: string;
  description: string;
  textClass: string;
  barClass: string;
};

const riskConfig: Record<
  BudgetRisk,
  RiskConfig
> = {
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

export function BudgetRiskCard({
  profile,
}: Props) {
  const {
    analysis,
    budget,
    budgetRisk,
    budgetDifference,
    budgetUsagePercentage,
  } = profile;

  const config = riskConfig[budgetRisk];

  const progressPercentage =
    budget <= 0
      ? 0
      : Math.min(
          budgetUsagePercentage,
          100,
        );

  return (
    <GlassCard>
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">
  Monthly Budget Risk
</h2>

          <h2
            className={`mt-2 text-2xl font-bold ${config.textClass}`}
          >
            {config.label}
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            {config.description}
          </p>
        </div>

        {budget > 0 && (
          <div className="md:text-right">
            <p className="text-xs text-muted-foreground">
              Estimated Cost / Budget
            </p>

            <p className="mt-2 text-lg font-semibold">
              ₦
              {Math.round(
                analysis.monthlyCost,
              ).toLocaleString()}
              {" / "}
              ₦
              {Math.round(
                budget,
              ).toLocaleString()}
            </p>

            <p
              className={`mt-1 text-sm font-medium ${config.textClass}`}
            >
              {Math.round(
                budgetUsagePercentage,
              )}
              % of budget
            </p>
          </div>
        )}
      </div>

      {budget > 0 && (
        <>
          <div className="mt-6 h-3 overflow-hidden rounded-full bg-border">
            <div
              className={`h-full rounded-full transition-all duration-500 ${config.barClass}`}
              style={{
                width: `${progressPercentage}%`,
              }}
            />
          </div>

          <div className="mt-3">
            {budgetDifference > 0 ? (
              <p className="text-sm text-muted-foreground">
                Projected to exceed your budget by{" "}
                <span className={`font-semibold ${config.textClass}`}>
                  ₦
                  {Math.round(
                    budgetDifference,
                  ).toLocaleString()}
                </span>
                .
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Estimated budget remaining:{" "}
                <span className="font-semibold text-green-500">
                  ₦
                  {Math.round(
                    Math.abs(budgetDifference),
                  ).toLocaleString()}
                </span>
                .
              </p>
            )}
          </div>
        </>
      )}
    </GlassCard>
  );
}