import { GlassCard } from "@/components/GlassCard";
import { CommunityPowerMap } from "@/components/outage/CommunityPowerMap";
import type { Outage } from "@/lib/outage/outages.types";

type Props = {
  outages: Outage[];
};

export function LiveOutageMap({
  outages,
}: Props) {
  
  return (
    <GlassCard className="p-0 overflow-hidden">
      <CommunityPowerMap
        outages={outages}
      />
    </GlassCard>
  );
}