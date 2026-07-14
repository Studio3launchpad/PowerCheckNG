import { GlassCard } from "@/components/GlassCard";
import type { EnergyAnalysis } from "@/lib/energy/energy.types";

type Props = {
  analysis: EnergyAnalysis;
  budget: number;
};

export function EnergyAnalysisResults({
  analysis,
  budget,
}: Props) {
  const isOverBudget =
    analysis.monthlyCost > budget;

  const budgetProgress =
    budget > 0
      ? Math.min(
          (analysis.monthlyCost / budget) * 100,
          100,
        )
      : 0;

  const budgetDifference = Math.abs(
    analysis.monthlyCost - budget,
  );

  return (
    <GlassCard className="mt-8">
      <h2 className="mb-6 text-xl font-semibold">
        Analysis Results
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground">
            Daily Usage
          </p>

          <p className="mt-2 text-2xl font-bold">
            {analysis.dailyUsage.toFixed(1)} kWh
          </p>
        </div>

        <div className="rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground">
            Monthly Usage
          </p>

          <p className="mt-2 text-2xl font-bold">
            {analysis.monthlyUsage.toFixed(1)} kWh
          </p>
        </div>

        <div className="rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground">
            Estimated Monthly Bill
          </p>

          <p className="mt-2 text-2xl font-bold">
            ₦{analysis.monthlyCost.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground">
            Energy Health Score
          </p>

          <p className="mt-2 text-2xl font-bold text-primary">
            {analysis.score}/100
          </p>
        </div>

        <div className="rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground">
            Highest Consuming Appliance
          </p>

          <p className="mt-2 text-xl font-semibold">
            {analysis.highestConsumer}
          </p>
        </div>
      </div>

      <GlassCard className="mt-6">
        <div className="mb-3 flex items-center justify-between gap-4">
          <h3 className="font-semibold">
            Budget Progress
          </h3>

          <span className="text-sm">
            ₦{analysis.monthlyCost.toLocaleString()} / ₦
            {budget.toLocaleString()}
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-border">
          <div
            className={`h-full ${
              isOverBudget
                ? "bg-red-500"
                : "bg-primary"
            }`}
            style={{
              width: `${budgetProgress}%`,
            }}
          />
        </div>

        <p className="mt-3 text-sm text-muted-foreground">
          {isOverBudget
            ? `⚠ You're over budget by ₦${budgetDifference.toLocaleString()}`
            : "✅ You're within your monthly electricity budget."}
        </p>
      </GlassCard>

      <GlassCard className="mt-6">
        <h3 className="mb-4 font-semibold">
          Appliance Cost Breakdown
        </h3>

        <div className="space-y-4">
          {analysis.breakdown.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between gap-4"
            >
              <span>{item.name}</span>

              <span className="font-semibold">
                ₦{item.cost.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </GlassCard>

      <h3 className="mb-4 mt-8 font-semibold">
        🤖 Personalized Energy Insights
      </h3>

      <div className="space-y-3">
        {analysis.recommendations.map(
          (tip, index) => (
            <div
              key={`${index}-${tip}`}
              className="rounded-lg border border-border bg-background/40 p-3"
            >
              <p className="text-sm leading-6">
                💡 {tip}
              </p>
            </div>
          ),
        )}
      </div>
    </GlassCard>
  );
}