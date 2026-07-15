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

  const periods = analyzePowerAvailability(areaReports);

  const periodsWithData = periods.filter(
    (period) => period.definiteReports > 0,
  );

  const totalDefiniteReports = periods.reduce(
    (total, period) =>
      total + period.definiteReports,
    0,
  );

  const strongestPeriod =
    periodsWithData.length > 0
      ? periodsWithData.reduce((strongest, period) =>
          period.availability > strongest.availability
            ? period
            : strongest,
        )
      : null;

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

          <h2 className="mt-1 text-xl font-bold">
            Historical Power Pattern
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
  Community-reported power availability patterns for{" "}
  <span className="font-medium text-foreground">
    {area}
  </span>{" "}
  based on reports from the last 30 days.
</p>
        </div>

        {totalDefiniteReports === 0 ? (
          <div className="rounded-xl border border-border bg-muted/30 p-5">
            <p className="font-medium">
              Not enough confirmed power reports yet
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
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
                  className="space-y-2"
                >
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="font-medium">
                        {period.label}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {period.timeRange}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold">
                        {period.definiteReports > 0
                          ? `${period.availability}%`
                          : "No data"}
                      </p>

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
                    <div className="flex gap-4 text-xs text-muted-foreground">
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
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                <p className="text-sm font-medium text-primary">
                  Pattern Insight
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
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

            <p className="text-xs text-muted-foreground">
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