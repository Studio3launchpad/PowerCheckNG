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
import { OutagesHistory } from "@/components/OutagesHistory";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — PowerCheckNG" }] }),
  component: Dashboard,
});

const series = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  kw: +(Math.sin(i / 3) * 0.8 + 1.8 + Math.random() * 0.5).toFixed(2),
}));

const STATS = [
  { label: "Live draw", value: "2.4 kW", icon: Zap, delta: "+0.3" },
  { label: "Today", value: "14.2 kWh", icon: Activity, delta: "-5%" },
  { label: "Outages", value: "1 nearby", icon: AlertTriangle, delta: "12m ago" },
  { label: "Last purchase", value: "₦5,000", icon: CreditCard, delta: "3d ago" },
];

function Dashboard() {
  return (
    <div className="space-y-6 pb-24 lg:pb-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-display font-bold">Good evening 👋</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Here's your home's energy pulse right now.
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
            <Battery className="size-4 text-primary" /> Backup
          </h2>
          <div className="mt-4 space-y-4">
            {[
              { name: "Inverter", pct: 78, sub: "~4h 20m remaining" },
              { name: "Generator", pct: 42, sub: "Fuel: 8.4 L" },
            ].map((b) => (
              <div key={b.name}>
                <div className="flex justify-between text-sm">
                  <span>{b.name}</span>
                  <span className="text-muted-foreground">{b.pct}%</span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-primary glow-primary rounded-full"
                    style={{ width: `${b.pct}%` }}
                  />
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">{b.sub}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <OutagesHistory limit={10} />
    </div>
  );
}
