import { GlassCard } from "../GlassCard";
import type { Outage } from "@/lib/outage/outages.types";
import { MetricCard } from "@/components/common/MetricCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Activity } from "lucide-react";

type Props = {
  outages: Outage[];
};

export function CommunityStats({ outages }: Props) {
  const today = new Date().toDateString();

  const reportsToday = outages.filter(
    (outage) => new Date(outage.startedAt).toDateString() === today,
  );

  const powerOffToday = reportsToday.filter((outage) => outage.status === "POWER_OFF").length;

  const powerOnToday = reportsToday.filter((outage) => outage.status === "POWER_ON").length;

  return (
    <GlassCard className="p-4 sm:p-5">
      <SectionHeader
        icon={Activity}
        title="Today's Community Reports"
        description="A quick overview of electricity reports submitted by the community today."
      />
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <MetricCard title="Reports Today" value={reportsToday.length} />

        <MetricCard title="Power OFF" value={powerOffToday} valueClassName="text-red-500" />

        <MetricCard title="Power ON" value={powerOnToday} valueClassName="text-green-500" />
      </div>
    </GlassCard>
  );
}
