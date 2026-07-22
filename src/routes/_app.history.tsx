import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassCard } from "@/components/GlassCard";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { listOutages } from "@/lib/outage/outages.functions";
import type { Outage } from "@/lib/outage/outages.types";
import { OutageList } from "@/components/outage/OutageList";
import { useEffect, useState } from "react";
import { HistoryFilters } from "@/components/outage/HistoryFilters";
import { HistoricalPowerPattern } from "@/components/outage/HistoricalPowerPattern";

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

  const [visibleCount, setVisibleCount] = useState(REPORTS_PER_PAGE);

  const [search, setSearch] = useState("");
  const [disco, setDisco] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");

  const clearFilters = () => {
    setSearch("");
    setDisco("");
    setStatus("");
    setDate("");
  };

  useEffect(() => {
    setVisibleCount(REPORTS_PER_PAGE);
  }, [search, disco, status, date]);

  const discos = Array.from(
  new Set(
    data.outages.map((outage: Outage) => outage.discoCode),
  ),
) as string[];

  const statuses = Array.from(
  new Set(
    data.outages.map((outage: Outage) => outage.status),
  ),
) as string[];

  const filteredReports = data.outages.filter((outage: Outage) => {
    const matchesSearch = outage.area.toLowerCase().includes(search.toLowerCase());

    const matchesDisco = !disco || outage.discoCode === disco;

    const matchesStatus = !status || outage.status === status;

    const matchesDate = !date || outage.startedAt.startsWith(date);

    return matchesSearch && matchesDisco && matchesStatus && matchesDate;
  });

  const reportsForAnalytics = filteredReports.length > 0 ? filteredReports : data.outages;

  const visibleReports = filteredReports.slice(0, visibleCount);

  const hasMoreReports = visibleCount < filteredReports.length;

  const totalReports = data.outages.length;

  const powerOffReports = data.outages.filter(
    (outage: Outage) => outage.status === "POWER_OFF",
  ).length;

  const powerOnReports = data.outages.filter(
    (outage: Outage) => outage.status === "POWER_ON",
  ).length;

  const notSureReports = data.outages.filter(
    (outage: Outage) => outage.status === "NOT_SURE",
  ).length;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Link
          to="/outages"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
        >
          <span aria-hidden="true">←</span>
          Back to Outage Tracker
        </Link>

        <div className="space-y-2">
         <h1 className="text-2xl font-bold sm:text-3xl">
            Community Report History
          </h1>

          <p className="max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
            Browse previous community reports submitted across Nigeria.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <GlassCard className="p-5">
          <p className="text-sm text-muted-foreground">Total Reports</p>

          <h2 className="text-3xl sm:text-4xl font-bold mt-2">{totalReports}</h2>
        </GlassCard>

        <GlassCard className="p-5">
          <p className="text-sm text-muted-foreground">Power OFF Reports</p>

          <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-red-500">{powerOffReports}</h2>
        </GlassCard>

        <GlassCard className="p-5">
          <p className="text-sm text-muted-foreground">Power ON Reports</p>

          <h2 className="text-3xl font-bold mt-2 text-green-500">{powerOnReports}</h2>
        </GlassCard>

        <GlassCard className="p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Not Sure Reports</p>

          <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-yellow-500">{notSureReports}</h2>
        </GlassCard>
      </div>

      <HistoricalPowerPattern outages={reportsForAnalytics} />

      
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
        date={date}
        onDateChange={setDate}
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
            onClick={() => setVisibleCount((current) => current + REPORTS_PER_PAGE)}
            className="w-full rounded-2xl border border-primary/30 px-6 py-3 font-medium text-primary transition hover:bg-primary/10 sm:w-auto"
          >
            Load More Reports
          </button>
        </div>
      )}
    </div>
  );
}
