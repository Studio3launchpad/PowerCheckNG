import { MetricCard } from "@/components/common/MetricCard";
import type { EnergyInsightProfile } from "@/lib/insights/insight.types";

type Props = {
  profile: EnergyInsightProfile;
};

export function InsightSummaryCards({ profile }: Props) {
  const { analysis, potentialMonthlySavings, selectedApplianceCount } = profile;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Energy Health Score"
        value={
          <>
            {analysis.score}
            <span className="text-muted-foreground">/100</span>
          </>
        }
        subtitle="Based on usage and budget alignment"
        valueClassName="text-primary"
      />

      <MetricCard
        title="Estimated Monthly Cost"
        value={`₦${Math.round(analysis.monthlyCost).toLocaleString()}`}
        subtitle="From your saved energy plan"
      />

      <MetricCard
        title="Potential Monthly Savings"
        value={
          potentialMonthlySavings > 0
            ? `₦${Math.round(potentialMonthlySavings).toLocaleString()}`
            : "None"
        }
        subtitle={
          potentialMonthlySavings > 0
            ? "From identified usage adjustments"
            : "Current usage is already well optimised"
        }
        valueClassName={potentialMonthlySavings > 0 ? "text-green-500" : undefined}
      />

      <MetricCard
        title="Active Appliances"
        value={selectedApplianceCount}
        subtitle="Included in your latest analysis"
      />
    </div>
  );
}
