import { OutageCard } from "./OutageCard";
import type { Outage } from "@/lib/outages.types";

type Props = {
  outages: Outage[];
};

export function OutageList({ outages }: Props) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {outages.map((o: any) => (
        <OutageCard
          key={o.id}
          outage={o}
        />
      ))}
    </div>
  );
}