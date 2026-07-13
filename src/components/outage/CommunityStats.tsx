 import { GlassCard } from "../GlassCard";
 import type { Outage } from "@/lib/outages.types";

type Props = {
  outages: Outage[];
};

export function CommunityStats({ outages }: Props) {
  return (
    <GlassCard>
       <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Reports Today</p>

            <h2 className="text-2xl font-bold">{outages.length}</h2>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Active Outages</p>

            <h2 className="text-2xl font-bold text-red-500">
              {outages.filter((o: any) => o.status === "CONFIRMED").length}
            </h2>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Restored</p>

            <h2 className="text-2xl font-bold text-green-500">
              {outages.filter((o: any) => o.status === "RESTORED").length}
            </h2>
          </div>
        </div>
    </GlassCard>
  );
}
 