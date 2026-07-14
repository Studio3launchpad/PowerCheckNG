import { createFileRoute } from "@tanstack/react-router";
import { GlassCard } from "@/components/GlassCard";
import {
  useSuspenseQuery,
  queryOptions,
} from "@tanstack/react-query";
import { listOutages } from "@/lib/outage/outages.functions";
import type { Outage } from "@/lib/outage/outages.types";
import { OutageList } from "@/components/outage/OutageList";
import { useEffect, useState } from "react";
import { HistoryFilters } from "@/components/outage/HistoryFilters";

const REPORTS_PER_PAGE = 12;

const outagesQO = queryOptions({
  queryKey: ["outages"],
  queryFn: () => listOutages(),
});

export const Route = createFileRoute("/_app/history")({
  component: HistoryPage,
});

function HistoryPage() {
  const { data } = useSuspenseQuery(outagesQO);

  const [visibleCount, setVisibleCount] = useState(
    REPORTS_PER_PAGE,
  );

  const [search, setSearch] = useState("");
  const [disco, setDisco] = useState("");
  const [status, setStatus] = useState("");

  const clearFilters = () => {
    setSearch("");
    setDisco("");
    setStatus("");
  };

  useEffect(() => {
    setVisibleCount(REPORTS_PER_PAGE);
  }, [search, disco, status]);

  const discos = [
    ...new Set(
      data.outages.map((outage) => outage.discoCode),
    ),
  ].sort();

  const statuses = [
    ...new Set(
      data.outages.map((outage) => outage.status),
    ),
  ].sort();

  const filteredReports = data.outages.filter(
    (outage) => {
      const matchesSearch =
        outage.area
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesDisco =
        !disco || outage.discoCode === disco;

      const matchesStatus =
        !status || outage.status === status;

      return (
        matchesSearch &&
        matchesDisco &&
        matchesStatus
      );
    },
  );

  const visibleReports = filteredReports.slice(
    0,
    visibleCount,
  );

  const hasMoreReports =
    visibleCount < filteredReports.length;

  const totalReports = data.outages.length;

  const powerOffReports = data.outages.filter(
    (outage: Outage) =>
      outage.status === "POWER_OFF",
  ).length;

  const powerOnReports = data.outages.filter(
    (outage: Outage) =>
      outage.status === "POWER_ON",
  ).length;

  const notSureReports = data.outages.filter(
    (outage: Outage) =>
      outage.status === "NOT_SURE",
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Report History
        </h1>

        <p className="text-muted-foreground mt-2">
          Browse previous community reports submitted
          across Nigeria.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <GlassCard>
          <p className="text-sm text-muted-foreground">
            Total Reports
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {totalReports}
          </h2>
        </GlassCard>

        <GlassCard>
          <p className="text-sm text-muted-foreground">
            Power OFF Reports
          </p>

          <h2 className="text-3xl font-bold mt-2 text-red-500">
            {powerOffReports}
          </h2>
        </GlassCard>

        <GlassCard>
          <p className="text-sm text-muted-foreground">
            Power ON Reports
          </p>

          <h2 className="text-3xl font-bold mt-2 text-green-500">
            {powerOnReports}
          </h2>
        </GlassCard>

        <GlassCard>
          <p className="text-sm text-muted-foreground">
            Not Sure Reports
          </p>

          <h2 className="text-3xl font-bold mt-2 text-yellow-500">
            {notSureReports}
          </h2>
        </GlassCard>
      </div>

      <HistoryFilters
        search={search}
        onSearchChange={setSearch}
        disco={disco}
        onDiscoChange={setDisco}
        discos={discos}
        status={status}
        onStatusChange={setStatus}
        statuses={statuses}
        onClearFilters={clearFilters}
      />

      <OutageList
        outages={visibleReports}
        title="Community Report History"
        subtitle={`Showing ${visibleReports.length} of ${filteredReports.length} reports`}
        showViewAll={false}
      />

      {hasMoreReports && (
        <div className="flex justify-center pt-4">
          <button
            type="button"
            onClick={() =>
              setVisibleCount(
                (current) =>
                  current + REPORTS_PER_PAGE,
              )
            }
            className="rounded-xl border border-primary/30 px-6 py-3 font-medium text-primary transition hover:bg-primary/10"
          >
            Load More Reports
          </button>
        </div>
      )}
    </div>
  );
}