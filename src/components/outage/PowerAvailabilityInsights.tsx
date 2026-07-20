import { GlassCard } from "@/components/GlassCard";
import { analyzePowerAvailability } from "@/lib/outage/powerAvailability";
import type { Outage } from "@/lib/outage/outages.types";
import { POWER_PATTERN_WINDOW_MS } from "@/lib/outage/outages.constants";

type Props = {
  outages: Outage[];
  area: string;
};

export function PowerAvailabilityInsights({
  outages,
  area,
}: Props) {
  const patternCutoff =
  Date.now() - POWER_PATTERN_WINDOW_MS;

const areaReports = outages.filter((outage) => {
  const matchesArea =
    outage.area.trim().toLowerCase() ===
    area.trim().toLowerCase();

  const reportTime = new Date(
    outage.startedAt,
  ).getTime();

  const isWithinPatternWindow =
    reportTime >= patternCutoff;

  return matchesArea && isWithinPatternWindow;
});

  const analytics = analyzePowerAvailability(areaReports);

const {
  periods,
  strongestPeriod,
  totalReports: totalDefiniteReports,
} = analytics;

  if (!area) {
    return null;
  }

  return (
    <GlassCard>
      <div className="space-y-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            Power Availability Insights
          </p>

          <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
            Historical Power Pattern
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
  Community-reported power availability patterns for{" "}
  <span className="font-medium text-foreground">
    {area}
  </span>{" "}
  based on reports from the last 30 days.
</p>
        </div>

        {totalDefiniteReports === 0 ? (
          <div className="rounded-xl border border-border bg-muted/30 p-5 sm:p-6">
            <p className="text-lg font-semibold">
              Not enough confirmed power reports yet
            </p>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
  PowerCheckNG needs Power ON or Power OFF reports
  from {area} within the last 30 days before a recent
  availability pattern can be calculated.
</p>
          </div>
        ) : (
          <>
            <div className="space-y-5">
              {periods.map((period) => (
                <div
                  key={period.key}
                  className="space-y-3 rounded-xl border border-border bg-background/30 p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="font-medium">
                        {period.label}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {period.timeRange}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-left sm:text-right">
    <p className="text-xs uppercase tracking-wide text-muted-foreground">
        Availability
    </p>

    <p className="text-lg font-bold">
        {period.definiteReports > 0
            ? `${period.availability}%`
            : "No data"}
    </p>

    ...
</div>

                      {period.definiteReports > 0 && (
                        <p className="text-xs text-muted-foreground">
                          {period.definiteReports} definite{" "}
                          {period.definiteReports === 1
                            ? "report"
                            : "reports"}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{
                        width: `${period.availability}%`,
                      }}
                    />
                  </div>

                  {period.definiteReports > 0 && (
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span>
                        ON: {period.powerOn}
                      </span>

                      <span>
                        OFF: {period.powerOff}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {strongestPeriod && (
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Pattern Insight
                </p>

                <p className="mt-3 leading-7 text-muted-foreground">
                  Based on community reports from the last 30 days,{" "}
                  <span className="font-medium text-foreground">
                    {strongestPeriod.label.toLowerCase()}
                  </span>{" "}
                  shows the strongest reported power
                  availability in {area}, at{" "}
                  <span className="font-medium text-foreground">
                    {strongestPeriod.availability}%
                  </span>
                  .
                </p>
              </div>
            )}

            <p className="border-t border-border pt-4 text-xs leading-6 text-muted-foreground">
  Insights are based on community-submitted Power ON
  and Power OFF reports from the last 30 days. Not Sure
  reports are excluded from availability calculations.
</p>
          </>
        )}
      </div>
    </GlassCard>
  );
}