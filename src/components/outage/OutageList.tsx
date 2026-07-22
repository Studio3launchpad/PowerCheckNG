import { Clock3 } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { OutageCard } from "./OutageCard";
import type { Outage } from "@/lib/outage/outages.types";

type Props = {
  outages: Outage[];
  title?: string;
  subtitle?: string;
  limit?: number;
  showViewAll?: boolean;
};

export function OutageList({
  outages,
  title = "Recent Community Activity",
  subtitle = "Showing recent community reports",
  limit,
  showViewAll = true,
}: Props) {
  const reports = typeof limit === "number" ? outages.slice(0, limit) : outages;

  return (
    <>
      <SectionHeader icon={Clock3} title={title} description={subtitle} />

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reports.map((o) => (
          <OutageCard key={o.id} outage={o} />
        ))}
      </div>
    </>
  );
}
