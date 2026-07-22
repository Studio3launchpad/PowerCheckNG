import { Activity, Clock, Lightbulb } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { analyzePowerAvailability } from "@/lib/outage/powerAvailability";
import { POWER_PATTERN_WINDOW_MS } from "@/lib/outage/outages.constants";
import type { Outage } from "@/lib/outage/outages.types";
import { TrendingUp } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";

type Props = {
  outages: Outage[];
  area: string;
};

export function PowerAvailabilityOutlook({ outages, area }: Props) {
  if (!area) {
    return null;
  }

  const now = Date.now();
  const windowStart = now - POWER_PATTERN_WINDOW_MS;

  const recentAreaReports = outages.filter((outage) => {
    const startedAt = new Date(outage.startedAt).getTime();

    if (Number.isNaN(startedAt)) {
      return false;
    }

    return (
      outage.area.trim().toLowerCase() === area.trim().toLowerCase() && startedAt >= windowStart
    );
  });

  const analytics = analyzePowerAvailability(recentAreaReports);

  const { strongestPeriod, overallAvailability, totalReports } = analytics;

  return (
    <GlassCard>
      <div className="space-y-6">
        <SectionHeader
          icon={TrendingUp}
          badge="Community Power Outlook"
          title="30-Day Power Outlook"
          description={`A community-supported view of recent electricity availability patterns in ${area}.`}
        />

        {!strongestPeriod ? (
          <div className="rounded-2xl border border-border bg-muted/30 p-5">
            <div className="flex items-start gap-3">
              <Activity className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />

              <div>
                <p className="font-medium">Not enough confirmed reports yet</p>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  PowerCheckNG needs more Power ON or Power OFF reports from {area} {""}
                  before a recent availability outlook can be generated.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                <div>
                  <p className="text-sm text-muted-foreground">
                    Strongest community-supported period
                  </p>

                  <h3 className="mt-1 text-2xl font-bold sm:text-3xl">{strongestPeriod.label}</h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Community reports indicate{" "}
                    <span className="font-semibold text-foreground">
                      {strongestPeriod.availability}% reported availability
                    </span>{" "}
                    during the{" "}
                    <span className="font-semibold text-foreground">
                      {strongestPeriod.label.toLowerCase()}
                    </span>{" "}
                    period over the last 30 days.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-background/30 p-5">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Confirmed Reports
                </p>

                <p className="mt-2 text-3xl font-bold">{totalReports}</p>

                <p className="mt-2 text-sm text-muted-foreground">
                  Overall availability:
                  <span className="font-medium text-foreground"> {overallAvailability}%</span>
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background/30 p-5">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {strongestPeriod.label} Reports
                </p>

                <p className="mt-2 text-3xl font-bold">{strongestPeriod.definiteReports}</p>

                <p className="mt-2 text-sm text-muted-foreground">
                  {strongestPeriod.powerOn} ON • {strongestPeriod.powerOff} OFF
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-border bg-background/30 p-5">
              <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

              <div>
                <p className="text-sm font-medium">PowerCheckNG Insight</p>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Based on community reports collected over the last 30 days, electricity has been
                  reported most consistently during the{" "}
                  <span className="font-medium text-foreground">
                    {strongestPeriod.label.toLowerCase()}
                  </span>{" "}
                  period.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-border/60 p-4">
              <p className="text-xs leading-6 text-muted-foreground">
                This outlook is generated from community-submitted Power ON and Power OFF reports
                over the last 30 days. It reflects historical reporting trends and should be used as
                guidance rather than a guaranteed electricity forecast.
              </p>
            </div>
          </>
        )}
      </div>
    </GlassCard>
  );
}
