import { createFileRoute, useRouter } from "@tanstack/react-router";
import {
  useSuspenseQuery,
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, Zap, DollarSign, TrendingDown, Plus } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { addReading, getConsumption } from "@/lib/consumption.functions";

const consumptionQO = (range: "7d" | "30d" | "90d") =>
  queryOptions({
    queryKey: ["consumption", range],
    queryFn: () => getConsumption({ data: { range } }),
  });

export const Route = createFileRoute("/_app/consumption")({
  head: () => ({ meta: [{ title: "Consumption — PowerCheckNG" }] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(consumptionQO("7d")),
  component: ConsumptionPage,
});

const PIE_COLORS = ["#00C853", "#22D3EE", "#FBBF24", "#A78BFA", "#FB7185"];

function ConsumptionPage() {
  const [range, setRange] = useState<"7d" | "30d" | "90d">("7d");
  const [open, setOpen] = useState(false);
  const [kwh, setKwh] = useState("");
  const [source, setSource] =
    useState<"MANUAL" | "METER_SYNC" | "ESTIMATED">("MANUAL");

  const { data } = useSuspenseQuery(consumptionQO(range));
  const qc = useQueryClient();
  const router = useRouter();
  const addReadingFn = useServerFn(addReading);

  const mutation = useMutation({
    mutationFn: (values: { kwh: number; source: typeof source }) =>
      addReadingFn({ data: values }),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["consumption"] });
      await router.invalidate();
      setKwh("");
      setOpen(false);
    },
  });

  const stats = [
    { label: "Total used", value: `${data.totalKwh} kWh`, icon: Activity },
    {
      label: "Estimated cost",
      value: `₦${data.totalCost.toLocaleString()}`,
      icon: DollarSign,
    },
    { label: "Daily average", value: `${data.avgPerDay} kWh`, icon: Zap },
    { label: "vs last period", value: "—", icon: TrendingDown },
  ];

  return (
    <div className="space-y-6 pb-24 lg:pb-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-display font-bold">Consumption</h1>
          <p className="text-sm text-muted-foreground mt-1">
            How much power your home is drawing, and where it's going.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-xl glass p-1">
            {(["7d", "30d", "90d"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1.5 text-xs rounded-lg transition ${
                  range === r
                    ? "bg-primary text-primary-foreground glow-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 glow-primary"
          >
            <Plus className="size-4" /> Add reading
          </button>
        </div>
      </header>

      {open && (
        <GlassCard variant="strong">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const n = Number(kwh);
              if (!Number.isFinite(n) || n <= 0) return;
              mutation.mutate({ kwh: n, source });
            }}
            className="grid sm:grid-cols-3 gap-4"
          >
            <label className="block">
              <span className="text-xs text-muted-foreground">kWh consumed</span>
              <input
                value={kwh}
                onChange={(e) => setKwh(e.target.value)}
                type="number"
                step="0.01"
                min="0"
                placeholder="e.g. 4.2"
                className="mt-1 w-full rounded-lg bg-white/5 border border-border px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="block">
              <span className="text-xs text-muted-foreground">Source</span>
              <select
                value={source}
                onChange={(e) =>
                  setSource(e.target.value as typeof source)
                }
                className="mt-1 w-full rounded-lg bg-white/5 border border-border px-3 py-2 text-sm outline-none focus:border-primary"
              >
                <option value="MANUAL">Manual</option>
                <option value="METER_SYNC">Meter sync</option>
                <option value="ESTIMATED">Estimated</option>
              </select>
            </label>
            <div className="flex items-end justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-border px-4 py-2 text-sm hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 glow-primary disabled:opacity-50"
              >
                {mutation.isPending ? "Saving…" : "Save"}
              </button>
            </div>
            {mutation.isError && (
              <p className="sm:col-span-3 text-xs text-destructive">
                Could not save reading. Make sure you're signed in.
              </p>
            )}
          </form>
        </GlassCard>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <GlassCard key={s.label} className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{s.label}</span>
              <s.icon className="size-4 text-primary" />
            </div>
            <p className="mt-2 text-2xl font-display font-bold">{s.value}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <GlassCard className="lg:col-span-2">
          <h2 className="font-semibold mb-4">Daily usage (kWh)</h2>
          <div className="h-72">
            {data.totalKwh > 0 ? (
              <ResponsiveContainer>
                <BarChart data={data.daily}>
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10, fill: "#888" }}
                    tickFormatter={(v) => v.slice(5)}
                    interval={range === "90d" ? 9 : range === "30d" ? 3 : 0}
                  />
                  <YAxis tick={{ fontSize: 10, fill: "#888" }} width={28} />
                  <Tooltip
                    cursor={{ fill: "rgba(0,200,83,0.06)" }}
                    contentStyle={{
                      background: "rgba(20,28,40,0.95)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="kwh" fill="#00C853" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyState onAdd={() => setOpen(true)} />
            )}
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="font-semibold mb-2">Breakdown</h2>
          <p className="text-xs text-muted-foreground mb-2">By appliance category</p>
          <div className="h-48">
            {data.totalKwh > 0 ? (
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={data.breakdown}
                    dataKey="kwh"
                    nameKey="name"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={3}
                  >
                    {data.breakdown.map((_, i) => (
                      <Cell
                        key={i}
                        fill={PIE_COLORS[i % PIE_COLORS.length]}
                        stroke="none"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "rgba(20,28,40,0.95)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-muted-foreground">
                No data yet
              </div>
            )}
          </div>
          <ul className="mt-3 space-y-1.5 text-xs">
            {data.breakdown.map((b, i) => (
              <li key={b.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span
                    className="size-2 rounded-full"
                    style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
                  />
                  {b.name}
                </span>
                <span className="text-muted-foreground">{b.kwh} kWh</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-2 text-center">
      <p className="text-sm text-muted-foreground">
        No readings yet for this range.
      </p>
      <button
        onClick={onAdd}
        className="inline-flex items-center gap-1.5 rounded-lg bg-primary/15 text-primary px-3 py-1.5 text-xs hover:bg-primary/25"
      >
        <Plus className="size-3.5" /> Add your first reading
      </button>
    </div>
  );
}
