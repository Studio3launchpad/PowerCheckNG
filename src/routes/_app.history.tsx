import { createFileRoute } from "@tanstack/react-router";
import { GlassCard } from "@/components/GlassCard";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { listOutages } from "@/lib/outages.functions";
import type { Outage } from "@/lib/outages.types";
import { OutageList } from "@/components/outage/OutageList";
import { useState } from "react";
import { HistoryFilters } from "@/components/outage/HistoryFilters";


const outagesQO = queryOptions({
  queryKey: ["outages"],
  queryFn: () => listOutages(),
});

export const Route = createFileRoute("/_app/history")({
  component: HistoryPage,
});

function HistoryPage() {
    const { data } = useSuspenseQuery(outagesQO);

    const [search, setSearch] = useState("");

    const [disco, setDisco] = useState("");

    const [status, setStatus] = useState("");

    const clearFilters = () => {
  setSearch("");
  setDisco("");
  setStatus("");
};

const today = new Date().toDateString();

const discos = [...new Set(data.outages.map((o) => o.discoCode))].sort();

const statuses = [...new Set(data.outages.map((o) => o.status))].sort();

const filteredReports = data.outages.filter((o) => {
  const matchesSearch =
    o.area.toLowerCase().includes(search.toLowerCase());

  const matchesDisco =
    !disco || o.discoCode === disco;

  const matchesStatus =
    !status || o.status === status;

  return (
    matchesSearch &&
    matchesDisco &&
    matchesStatus
  );
});

const totalReports = filteredReports.length;

const activeOutages = filteredReports.filter(
  (o) =>
    o.status === "REPORTED" ||
    o.status === "CONFIRMED"
).length;

const restoredToday = filteredReports.filter(
  (o) =>
    o.status === "RESTORED" &&
    new Date(o.startedAt).toDateString() === today
).length;

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Report History
        </h1>

        <p className="text-muted-foreground mt-2">
          Browse previous community reports submitted across Nigeria.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">

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
      Active Outages
    </p>

    <h2 className="text-3xl font-bold mt-2 text-red-500">
      {activeOutages}
    </h2>
  </GlassCard>

  <GlassCard>
    <p className="text-sm text-muted-foreground">
      Restored Today
    </p>

    <h2 className="text-3xl font-bold mt-2 text-green-500">
      {restoredToday}
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
    outages={filteredReports}
  title="Community Report History"
  subtitle={`${totalReports} community reports found`}
  limit={undefined}
  showViewAll={false}
/>

</div>
  );
}