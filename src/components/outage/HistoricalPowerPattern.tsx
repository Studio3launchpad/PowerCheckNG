import { GlassCard } from "@/components/GlassCard";
import { analyzePowerAvailability } from "@/lib/outage/powerAvailability";
import type { Outage } from "@/lib/outage/outages.types";

type Props = {
  outages: Outage[];
};

export function HistoricalPowerPattern({ outages }: Props) {
  const analytics = analyzePowerAvailability(outages);

  const { periods, strongestPeriod, totalReports, overallAvailability } = analytics;

  if (totalReports === 0) {
    return (
      <GlassCard>
        <h2 className="text-xl font-bold">Historical Power Pattern</h2>

        <p className="mt-3 text-sm text-muted-foreground">
          There are not enough confirmed community reports to identify a historical power
          availability pattern yet.
        </p>
      </GlassCard>
    );
  }

  return (
    <GlassCard>
      <div className="space-y-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            Community Power Analytics
          </p>

          <h2 className="mt-1 text-xl font-bold">Historical Power Pattern</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Based on confirmed community reports from the last 30 days.
          </p>
        </div>

        <div className="space-y-5">
          {periods.map((period) => (
            <div key={period.key} className="space-y-2">
              <div className="flex items-end justify-between">
                <div>
                  <p className="font-medium">{period.label}</p>

                  <p className="text-xs text-muted-foreground">{period.timeRange}</p>
                </div>

                <div className="text-right">
                  <p className="font-bold">
                    {period.definiteReports > 0 ? `${period.availability}%` : "No data"}
                  </p>

                  {period.definiteReports > 0 && (
                    <p className="text-xs text-muted-foreground">
                      {period.definiteReports} reports
                    </p>
                  )}
                </div>
              </div>

              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-700"
                  style={{
                    width: `${period.availability}%`,
                  }}
                />
              </div>

              {period.definiteReports > 0 && (
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span>ON: {period.powerOn}</span>

                  <span>OFF: {period.powerOff}</span>

                  <span>Reliability: {period.reliabilityScore}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm font-semibold text-primary">Community Pattern Summary</p>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Community reports from the last 30 days suggest that electricity has been most
            consistently available during the{" "}
            <span className="font-medium text-foreground">
              {strongestPeriod?.label.toLowerCase()}
            </span>{" "}
            period. Overall reported availability across all confirmed reports is{" "}
            <span className="font-medium text-foreground">{overallAvailability}%</span>.
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
