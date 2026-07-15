import { GlassCard } from "../GlassCard";
import type { Outage } from "@/lib/outage/outages.types";

type Props = {
  outages: Outage[];
};

export function CommunityStats({ outages }: Props) {
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
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-muted-foreground">
            Reports Today
          </p>

          <h2 className="text-2xl font-bold">
            {reportsToday.length}
          </h2>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">
            Power OFF Today
          </p>

          <h2 className="text-2xl font-bold text-red-500">
            {powerOffToday}
          </h2>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">
            Power ON Today
          </p>

          <h2 className="text-2xl font-bold text-green-500">
            {powerOnToday}
          </h2>
        </div>
      </div>
    </GlassCard>
  );
}