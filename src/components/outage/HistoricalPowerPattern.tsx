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

          <h2 className="mt-1 text-xl font-bold sm:text-2xl">Historical Power Pattern</h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            Based on confirmed community reports from the last 30 days.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-background/30 p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Overall Availability
            </p>

            <p className="mt-2 text-3xl font-bold">{overallAvailability}%</p>
          </div>

          <div className="rounded-xl border border-border bg-background/30 p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Reports Analysed
            </p>

            <p className="mt-2 text-3xl font-bold">{totalReports}</p>
          </div>
        </div>

        <div className="space-y-5">
          {periods.map((period) => (
            <div
              key={period.key}
              className="space-y-3 rounded-xl border border-border bg-background/30 p-4"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-medium">{period.label}</p>

                  <p className="text-xs text-muted-foreground">{period.timeRange}</p>
                </div>

                <div className="text-right">
                  <p className="font-bold">
                    {period.definiteReports > 0
                      ? `Availability: ${period.availability}%`
                      : "No data"}
                  </p>

                  {period.definiteReports > 0 && (
                    <p className="text-xs text-muted-foreground">
                      {period.definiteReports} reports
                    </p>
                  )}
                </div>
              </div>

              <div className="h-4 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary origin-left transition-all duration-700"
                  style={{
                    width: `${period.availability}%`,
                  }}
                />
              </div>

              {period.definiteReports > 0 && (
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span>ON: {period.powerOn}</span>

                  <span>OFF: {period.powerOff}</span>

                  <span>Confidence: {period.confidenceScore}%</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Community Pattern Summary
          </p>

          <p className="mt-3 text-sm leading-7 text-muted-foreground">
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
