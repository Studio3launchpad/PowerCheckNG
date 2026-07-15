import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { GlassCard } from "@/components/GlassCard";

import type {
  ApplianceBreakdown,
} from "@/lib/energy/energy.types";

type Props = {
  breakdown: ApplianceBreakdown[];
};

const CHART_COLORS = [
  "#00C853",
  "#38BDF8",
  "#FACC15",
  "#A78BFA",
  "#FB7185",
  "#F97316",
  "#2DD4BF",
  "#94A3B8",
];

export function EnergyBreakdownChart({
  breakdown,
}: Props) {
  const chartData = breakdown.filter(
    (item) => item.usage > 0,
  );

  if (chartData.length === 0) {
    return (
      <GlassCard>
        <h2 className="text-xl font-semibold">
          Energy Consumption Distribution
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          See how your estimated electricity consumption
          is distributed across appliances.
        </p>

        <div className="mt-6 rounded-xl border border-border p-6 text-center">
          <p className="text-sm text-muted-foreground">
            No appliance consumption data is available yet.
          </p>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard>
      <div>
        <h2 className="text-xl font-semibold">
          Energy Consumption Distribution
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Estimated share of monthly electricity usage by
          appliance.
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.8fr)] lg:items-center">
        <div className="h-[320px] min-w-0">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={chartData}
                dataKey="usage"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
              >
                {chartData.map((item, index) => (
                  <Cell
                    key={item.name}
                    fill={
                      CHART_COLORS[
                        index % CHART_COLORS.length
                      ]
                    }
                  />
                ))}
              </Pie>

              <Tooltip
  formatter={(value, _name, item) => {
    const rawValue = Array.isArray(value)
      ? value[0]
      : value;

    const usage = Number(rawValue ?? 0);

    const percentage = Number(
      item?.payload?.percentage ?? 0,
    );

    return [
      `${usage.toFixed(1)} kWh (${Math.round(
        percentage,
      )}%)`,
      "Monthly usage",
    ];
  }}
  contentStyle={{
    background: "rgba(20,28,40,0.95)",
    border:
      "1px solid rgba(255,255,255,0.1)",
    borderRadius: 12,
    fontSize: 12,
  }}
/>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          {chartData.map((item, index) => (
            <div
              key={item.name}
              className="flex items-center justify-between gap-4 rounded-xl border border-border bg-background/30 p-3"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{
                    backgroundColor:
                      CHART_COLORS[
                        index % CHART_COLORS.length
                      ],
                  }}
                />

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {item.name}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {item.usage.toFixed(1)} kWh/month
                  </p>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <p className="font-semibold">
                  {Math.round(item.percentage)}%
                </p>

                <p className="text-xs text-muted-foreground">
                  ₦
                  {Math.round(
                    item.cost,
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}