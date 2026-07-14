import { Link } from "@tanstack/react-router";
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
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold">{title}</h2>

          <p className="text-sm text-muted-foreground">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((o) => (
          <OutageCard
            key={o.id}
            outage={o}
          />
        ))}
      </div>

      {showViewAll && (
        <div className="flex justify-center mt-8">
          <Link
            to="/history"
            className="text-primary font-medium hover:underline transition-colors hover:text-primary/80"
          >
            View Full Report History →
          </Link>
        </div>
      )}
    </>
  );
}