import { GlassCard } from "@/components/GlassCard";

import type { EnergyInsightProfile } from "@/lib/insights/insight.types";

type Props = {
  profile: EnergyInsightProfile;
};

export function InsightSummaryCards({ profile }: Props) {
  const { analysis, potentialMonthlySavings, selectedApplianceCount } = profile;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <GlassCard>
        <p className="text-sm text-muted-foreground">Energy Health Score</p>

        <p className="mt-2 text-3xl font-bold text-primary">
          {analysis.score}
          <span className="text-3xl font-bold text-muted-foreground">/100</span>
        </p>

        <p className="mt-2 text-xs text-muted-foreground">Based on usage and budget alignment</p>
      </GlassCard>

      <GlassCard>
        <p className="text-sm text-muted-foreground">Estimated Monthly Cost</p>

        <p className="mt-2 text-3xl font-bold">
          ₦{Math.round(analysis.monthlyCost).toLocaleString()}
        </p>

        <p className="mt-2 text-xs text-muted-foreground">From your saved energy plan</p>
      </GlassCard>

      <GlassCard>
        <p className="text-sm text-muted-foreground">Potential Monthly Savings</p>

        {potentialMonthlySavings > 0 ? (
          <>
            <p className="mt-2 text-3xl font-bold text-green-500">
              ₦{Math.round(potentialMonthlySavings).toLocaleString()}
            </p>

            <p className="mt-2 text-xs text-muted-foreground">From identified usage adjustments</p>
          </>
        ) : (
          <>
            <p className="mt-2 text-xl font-bold">No major savings identified</p>

            <p className="mt-2 text-xs text-muted-foreground">
              Current usage does not trigger targeted reduction opportunities
            </p>
          </>
        )}
      </GlassCard>

      <GlassCard>
        <p className="text-sm text-muted-foreground">Active Appliances</p>

        <p className="mt-2 text-3xl font-bold">{selectedApplianceCount}</p>

        <p className="mt-2 text-xs text-muted-foreground">Included in your latest analysis</p>
      </GlassCard>
    </div>
  );
}
