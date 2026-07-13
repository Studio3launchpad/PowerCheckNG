import { GlassCard } from "@/components/GlassCard";
import { CommunityPowerMap } from "@/components/outage/CommunityPowerMap";
import type { Outage } from "@/lib/outages.types";

type Props = {
  outages: Outage[];
};

export function LiveOutageMap({ outages }: Props) {
  return (
    <GlassCard className="p-0 overflow-hidden">
      <CommunityPowerMap
        outages={outages.map((o: any) => ({
          id: o.id,
          area: o.area,
          discoCode: o.discoCode,
          status: o.status,
          latitude: o.latitude,
          longitude: o.longitude,
        }))}
      />
    </GlassCard>
  );
}