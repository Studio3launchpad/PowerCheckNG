import { Cell, Pie, PieChart as EnergyPieChart, ResponsiveContainer, Tooltip } from "recharts";
import { SectionHeader } from "@/components/common/SectionHeader";
import { GlassCard } from "@/components/GlassCard";
import { PieChart as PieChartIcon } from "lucide-react";
import type { ApplianceBreakdown } from "@/lib/energy/energy.types";

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

export function EnergyBreakdownChart({ breakdown }: Props) {
  const chartData = breakdown.filter((item) => item.usage > 0);

  if (chartData.length === 0) {
    return (
      <GlassCard className="p-4 sm:p-5">
        <SectionHeader
          icon={PieChartIcon}
          title="Energy Consumption Distribution"
          description="See how your estimated monthly electricity usage is distributed across your appliances."
        />

        <div className="mt-6 rounded-2xl border border-border p-6 text-center">
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
        <h2 className="text-xl font-semibold">Energy Consumption Distribution</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Estimated share of monthly electricity usage by appliance.
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.8fr)] lg:items-center">
        <div className="h-[260px] min-w-0 sm:h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <EnergyPieChart>
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
                  <Cell key={item.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>

              <Tooltip
                formatter={(value, _name, item) => {
                  const rawValue = Array.isArray(value) ? value[0] : value;

                  const usage = Number(rawValue ?? 0);

                  const percentage = Number(item?.payload?.percentage ?? 0);

                  return [`${usage.toFixed(1)} kWh (${Math.round(percentage)}%)`, "Monthly usage"];
                }}
                contentStyle={{
                  background: "rgba(20,28,40,0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  fontSize: 12,
                  color: "#ffffff",
                }}
                itemStyle={{
                  color: "#ffffff",
                }}
                labelStyle={{
                  color: "#ffffff",
                }}
                cursor={{
                  fill: "rgba(255,255,255,0.05)",
                }}
              />
            </EnergyPieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          {chartData.map((item, index) => (
            <div
              key={item.name}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-background/30 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-center gap-4">
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{
                    backgroundColor: CHART_COLORS[index % CHART_COLORS.length],
                  }}
                />

                <div className="min-w-0">
                  <p className="break-words text-sm font-semibold leading-6 sm:text-base">
                    {item.name}
                  </p>

                  <p className="text-xs text-muted-foreground">{item.usage.toFixed(1)} kWh/month</p>
                </div>
              </div>

              <div className="w-full sm:w-auto sm:shrink-0 sm:text-right">
                <p className="text-lg font-bold">{Math.round(item.percentage)}%</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  ₦{Math.round(item.cost).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
