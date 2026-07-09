import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Zap,
  Activity,
  AlertTriangle,
  CreditCard,
  TrendingUp,
  Battery,
} from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { GlassCard } from "@/components/GlassCard";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — PowerCheckNG" }] }),
  component: Dashboard,
});

const series = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  kw: +(Math.sin(i / 3) * 0.8 + 1.8 + Math.random() * 0.5).toFixed(2),
}));

const STATS = [
  {
    label: "Energy Health Score",
    value: "84/100",
    icon: Zap,
    delta: "Excellent",
  },
  {
    label: "Estimated Monthly Usage",
    value: "326 kWh",
    icon: Activity,
    delta: "+4% from last month",
  },
  {
    label: "Estimated Monthly Cost",
    value: "₦23,400",
    icon: CreditCard,
    delta: "Within budget",
  },
  {
    label: "Current Outage Status",
    value: "Power Available",
    icon: AlertTriangle,
    delta: "IKEDC • Updated now",
  },
];

function Dashboard() {
  return (
    <div className="space-y-6 pb-24 lg:pb-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-display font-bold">Welcome back 👋</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor your electricity usage, manage outages, and make smarter energy decisions.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary border border-primary/30">
          <span className="size-1.5 rounded-full bg-primary animate-pulse" /> On grid · IKEDC
        </span>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <GlassCard className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{s.label}</span>
                <s.icon className="size-4 text-primary" />
              </div>
              <p className="mt-2 text-2xl font-display font-bold">{s.value}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">{s.delta}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold">Today's consumption</h2>
              <p className="text-xs text-muted-foreground">kW over 24h</p>
            </div>
            <TrendingUp className="size-4 text-primary" />
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={series}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00C853" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#00C853" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="hour" tick={{ fontSize: 10, fill: "#888" }} interval={3} />
                <YAxis tick={{ fontSize: 10, fill: "#888" }} width={28} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(20,28,40,0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="kw"
                  stroke="#00C853"
                  strokeWidth={2}
                  fill="url(#g1)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="font-semibold flex items-center gap-2">
            <Battery className="size-4 text-primary" />
            Today's AI Recommendation
          </h2>
          <div className="mt-4 space-y-4">
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <p className="text-sm leading-6">
                Running your iron during public electricity hours instead of generator hours could
                reduce your monthly energy cost by approximately
                <span className="font-semibold text-primary"> ₦3,200.</span>
              </p>
            </div>

            <div className="rounded-xl border border-white/10 p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Energy Tip</p>

              <p className="mt-2 text-sm">
                Your refrigerator consumes energy continuously. Consider reducing air conditioner
                usage by 2 hours daily to stay within your monthly budget.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
