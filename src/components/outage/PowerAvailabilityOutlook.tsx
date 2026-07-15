import { Activity, Clock, Lightbulb } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { analyzePowerAvailability } from "@/lib/outage/powerAvailability";
import { POWER_PATTERN_WINDOW_MS } from "@/lib/outage/outages.constants";
import type { Outage } from "@/lib/outage/outages.types";

type Props = {
  outages: Outage[];
  area: string;
};

export function PowerAvailabilityOutlook({
  outages,
  area,
}: Props) {
  if (!area) {
    return null;
  }

  const now = Date.now();

  const windowStart = now - POWER_PATTERN_WINDOW_MS;

  const recentAreaReports = outages.filter(
    (outage) => {
      const startedAt = new Date(
        outage.startedAt,
      ).getTime();

      if (Number.isNaN(startedAt)) {
        return false;
      }

      return (
        outage.area.trim().toLowerCase() ===
          area.trim().toLowerCase() &&
        startedAt >= windowStart
      );
    },
  );

  const periods = analyzePowerAvailability(
    recentAreaReports,
  );

  const supportedPeriods = periods.filter(
    (period) => period.definiteReports > 0,
  );

  const strongestPeriod =
    supportedPeriods.length > 0
      ? supportedPeriods.reduce(
          (strongest, period) =>
            period.reliabilityScore >
            strongest.reliabilityScore
              ? period
              : strongest,
        )
      : null;

  const totalDefiniteReports =
    supportedPeriods.reduce(
      (total, period) =>
        total + period.definiteReports,
      0,
    );

  return (
    <GlassCard>
      <div className="space-y-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            Community Power Outlook
          </p>

          <h2 className="mt-1 text-xl font-bold">
            30-Day Power Outlook
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            A community-supported view of recent
            electricity availability patterns in{" "}
            <span className="font-medium text-foreground">
              {area}
            </span>
            .
          </p>
        </div>

        {!strongestPeriod ? (
          <div className="rounded-xl border border-border bg-muted/30 p-5">
            <div className="flex items-start gap-3">
              <Activity className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />

              <div>
                <p className="font-medium">
                  Not enough confirmed reports yet
                </p>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  PowerCheckNG needs more Power ON or
                  Power OFF reports from {area} before
                  a recent availability outlook can be
                  generated.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                <div>
                  <p className="text-sm text-muted-foreground">
                    Strongest community-supported period
                  </p>

                  <h3 className="mt-1 text-2xl font-bold">
                    {strongestPeriod.label}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Power was reported ON in{" "}
                    <span className="font-semibold text-foreground">
                      {strongestPeriod.availability}%
                    </span>{" "}
                    of confirmed{" "}
{strongestPeriod.label.toLowerCase()}{" "}
reports from the last 30 days.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-background/30 p-4">
                <p className="text-xs text-muted-foreground">
                  Confirmed Reports
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {totalDefiniteReports}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Used across all time periods
                </p>
              </div>

              <div className="rounded-xl border border-border bg-background/30 p-4">
                <p className="text-xs text-muted-foreground">
                  {strongestPeriod.label} Reports
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {strongestPeriod.definiteReports}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {strongestPeriod.powerOn} ON ·{" "}
                  {strongestPeriod.powerOff} OFF
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-border bg-background/30 p-4">
              <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

              <div>
                <p className="text-sm font-medium">
                  PowerCheckNG Insight
                </p>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Based on recent community reports,
                  consider scheduling flexible
                  high-energy tasks during{" "}
                  <span className="font-medium text-foreground">
                    {strongestPeriod.label.toLowerCase()}
                  </span>{" "}
                  periods where practical.
                </p>
              </div>
            </div>

            <p className="text-xs leading-5 text-muted-foreground">
              This outlook is based on community-submitted
Power ON and Power OFF reports from the last 30
days. It reflects observed reporting patterns
and is not a guaranteed electricity forecast.
            </p>
          </>
        )}
      </div>
    </GlassCard>
  );
}