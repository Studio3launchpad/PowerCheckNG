import { GlassCard } from "@/components/common/GlassCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import type { SavingsOpportunity } from "@/lib/insights/insight.types";
import { PiggyBank } from "lucide-react";

type Props = {
  opportunities: SavingsOpportunity[];
  potentialMonthlySavings: number;
};

export function SavingsOpportunities({ opportunities, potentialMonthlySavings }: Props) {
  return (
    <GlassCard className="p-4 sm:p-5">
      <SectionHeader
        icon={PiggyBank}
        title="Potential Savings Opportunities"
        description="Practical usage adjustments identified from your current energy profile."
        action={
          potentialMonthlySavings > 0 ? (
            <div className="text-left sm:text-right">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Potential Savings
              </p>

              <p className="mt-1 text-xl font-bold text-green-500">
                ₦{Math.round(potentialMonthlySavings).toLocaleString()}
                <span className="ml-1 text-xs font-normal text-muted-foreground">/month</span>
              </p>
            </div>
          ) : undefined
        }
      />

      {opportunities.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-border p-5">
          <p className="font-medium">No major savings opportunities identified</p>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Your current appliance usage does not trigger any of PowerCheckNG&apos;s targeted usage
            reduction recommendations. You can adjust your appliance hours in the Smart Energy
            Planner to compare different energy plans.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {opportunities.map((opportunity) => (
            <div
              key={`${opportunity.appliance}-${opportunity.action}`}
              className="rounded-2xl border border-border bg-background/30 p-4 transition-all hover:border-primary/30 hover:bg-primary/5 sm:p-5"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-base font-semibold leading-6">{opportunity.appliance}</h3>

                  <p className="mt-2 text-[13px] leading-6 text-muted-foreground sm:text-sm">
                    {opportunity.action}
                  </p>
                </div>

                <div className="sm:text-right">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Estimated monthly saving
                  </p>

                  <p className="mt-2 text-xl font-bold text-green-500">
                    ₦{Math.round(opportunity.estimatedMonthlySavings).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
}
