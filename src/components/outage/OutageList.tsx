
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
  const reports =
  typeof limit === "number"
    ? outages.slice(0, limit)
    : outages;

  return (
    <>
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>

          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reports.map((o) => (
          <OutageCard
            key={o.id}
            outage={o}
          />
        ))}
      </div>
    </>
  );
}