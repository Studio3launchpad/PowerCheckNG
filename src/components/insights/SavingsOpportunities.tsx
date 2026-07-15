import { GlassCard } from "@/components/GlassCard";

import type {
  SavingsOpportunity,
} from "@/lib/insights/insight.types";

type Props = {
  opportunities: SavingsOpportunity[];
  potentialMonthlySavings: number;
};

export function SavingsOpportunities({
  opportunities,
  potentialMonthlySavings,
}: Props) {
  return (
    <GlassCard>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            Potential Savings Opportunities
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Practical usage adjustments identified from
            your energy profile.
          </p>
        </div>

        {potentialMonthlySavings > 0 && (
          <div className="sm:text-right">
            <p className="text-xs text-muted-foreground">
              Estimated Potential Savings
            </p>

            <p className="mt-1 text-xl font-bold text-green-500">
              ₦
              {Math.round(
                potentialMonthlySavings,
              ).toLocaleString()}
              <span className="text-xs font-normal text-muted-foreground">
                /month
              </span>
            </p>
          </div>
        )}
      </div>

      {opportunities.length === 0 ? (
        <div className="mt-6 rounded-xl border border-border p-5">
          <p className="font-medium">
            No major savings opportunities identified
          </p>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Your current appliance usage does not trigger
            any of PowerCheckNG&apos;s targeted usage
            reduction recommendations. You can adjust your
            appliance hours in the Smart Energy Planner to
            compare different energy plans.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {opportunities.map((opportunity) => (
            <div
              key={`${opportunity.appliance}-${opportunity.action}`}
              className="rounded-xl border border-border bg-background/30 p-4"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-semibold">
                    {opportunity.appliance}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {opportunity.action}
                  </p>
                </div>

                <div className="sm:text-right">
                  <p className="text-xs text-muted-foreground">
                    Estimated monthly saving
                  </p>

                  <p className="mt-1 text-lg font-bold text-green-500">
                    ₦
                    {Math.round(
                      opportunity.estimatedMonthlySavings,
                    ).toLocaleString()}
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