import { GlassCard } from "../GlassCard";
import type { Outage } from "@/lib/outage/outages.types";

type Props = {
  outages: Outage[];
};

export function CommunityStats({ outages }: Props) {
  const today = new Date().toDateString();

  const reportsToday = outages.filter(
    (o) => new Date(o.startedAt).toDateString() === today,
  ).length;

  const activeOutages = outages.filter(
    (o) => o.status === "POWER_OFF",
  ).length;

  const restoredToday = outages.filter(
    (o) =>
      o.status === "POWER_ON" &&
      new Date(o.startedAt).toDateString() === today,
  ).length;

  return (
    <GlassCard>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-muted-foreground">
            Reports Today
          </p>

          <h2 className="text-2xl font-bold">
            {reportsToday}
          </h2>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">
            Active Outages
          </p>

          <h2 className="text-2xl font-bold text-red-500">
            {activeOutages}
          </h2>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">
            Restored Today
          </p>

          <h2 className="text-2xl font-bold text-green-500">
            {restoredToday}
          </h2>
        </div>
      </div>
    </GlassCard>
  );
}