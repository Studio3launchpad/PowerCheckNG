import { GlassCard } from "@/components/GlassCard";
import { CommunityPowerMap } from "@/components/outage/CommunityPowerMap";
import type { Outage } from "@/lib/outage/outages.types";
import { Map } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";

type Props = {
  outages: Outage[];
};

export function LiveOutageMap({ outages }: Props) {
  return (
    <GlassCard className="overflow-hidden p-4 sm:p-5">
      <SectionHeader
        icon={Map}
        title="Live Community Power Map"
        description="Explore real-time community electricity reports across nearby areas."
      />
      <div className="mt-6 overflow-hidden rounded-2xl">
        <CommunityPowerMap outages={outages} />
      </div>
    </GlassCard>
  );
}
