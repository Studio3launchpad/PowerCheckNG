import { GlassCard } from "../GlassCard";
import type { Outage } from "@/lib/outage/outages.types";

type Props = {
  outages: Outage[];
};

export function CommunityStats({
  outages,
}: Props) {
  const today = new Date().toDateString();

  const reportsToday = outages.filter(
    (outage) =>
      new Date(outage.startedAt).toDateString() ===
      today,
  );

  const powerOffToday = reportsToday.filter(
    (outage) =>
      outage.status === "POWER_OFF",
  ).length;

  const powerOnToday = reportsToday.filter(
    (outage) =>
      outage.status === "POWER_ON",
  ).length;

  return (
    <GlassCard>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border/50 p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Reports Today
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {reportsToday.length}
          </h2>
        </div>

        <div className="rounded-xl border border-border/50 p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Power OFF
          </p>

          <h2 className="mt-2 text-3xl font-bold text-red-500">
            {powerOffToday}
          </h2>
        </div>

        <div className="rounded-xl border border-border/50 p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Power ON
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-500">
            {powerOnToday}
          </h2>
        </div>
      </div>
    </GlassCard>
  );
}