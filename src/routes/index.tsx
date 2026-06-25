import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Zap, Activity, ShieldCheck, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PowerCheckNG — Power, in your hands." },
      {
        name: "description",
        content:
          "Track outages, and monitor your consumption in real-time -all in one place.",
      },
      { property: "og:title", content: "PowerCheckNG — Power, in your hands." },
      {
        property: "og:description",
        content: "Track outages, and monitor your consumption in real-time -all in one place.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen grid-bg">
      {/* Nav */}
      <header className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-9 rounded-xl bg-primary glow-primary flex items-center justify-center">
            <Zap className="size-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-semibold">PowerCheckNG</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#how" className="hover:text-foreground">How it works</a>
          <a href="#trust" className="hover:text-foreground">Trust</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/sign-in" className="text-sm text-muted-foreground hover:text-foreground">
            Sign in
          </Link>
          <Link
            to="/sign-up"
            className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 glow-primary"
          >
            Get started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-12 pb-24 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            Live outage data across Nigeria
          </span>
          <h1 className="mt-5 text-5xl md:text-6xl font-bold leading-[1.05] font-display">
            Power, <span className="text-primary">in your hands.</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-lg">
            Track outages, and monitor your consumption in real-time -all in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/sign-up"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 glow-primary"
            >
              Start free <ArrowRight className="size-4" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/40 px-5 py-3 text-sm font-medium hover:bg-card/70"
            >
              See features
            </a>
          </div>
          <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
            <div><strong className="text-foreground">12k+</strong> outages tracked</div>
            <div><strong className="text-foreground">99.9%</strong> uptime</div>
            <div><strong className="text-foreground">256-bit</strong> encryption</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <GlassCard className="p-0 overflow-hidden">
            <div className="p-6 border-b border-border/50 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Current draw</p>
                <p className="text-3xl font-display font-bold mt-1">
                  2.4 <span className="text-base text-muted-foreground">kW</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="text-primary font-medium flex items-center gap-2 mt-1">
                  <span className="size-2 rounded-full bg-primary animate-pulse" /> On grid
                </p>
              </div>
            </div>
            <div className="px-6 pb-6 pt-4">
              <div className="h-40 flex items-end gap-1.5">
                {[40, 60, 35, 80, 55, 70, 90, 65, 50, 75, 95, 60, 80, 45].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.2 + i * 0.05, duration: 0.5 }}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-primary/30 to-primary"
                  />
                ))}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                {[
                  { l: "Today", v: "14.2 kWh" },
                  { l: "Avg", v: "₦127/kWh" },
                  { l: "Saved", v: "₦4,320" },
                ].map((s) => (
                  <div key={s.l} className="rounded-xl bg-white/5 p-3">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{s.l}</p>
                    <p className="text-sm font-semibold mt-0.5">{s.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-display font-bold">
          Everything your meter should've told you.
        </h2>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {[
            { i: Zap, t: "Outage Tracker", d: "Crowdsourced, geo-pinned outage reports with live restore times." },
            { i: Activity, t: "Real-time Consumption", d: "Watch every appliance pull power and spot anomalies fast." },
            { i: ShieldCheck, t: "Bank-grade Security", d: "MFA, device recognition, and bot protection on every login." },
            { i: Activity, t: "AI Insights", d: "Weekly summaries explain spikes, savings, and what to switch off." },
            { i: Zap, t: "Backup Manager", d: "Track generator fuel, inverter battery, and switchover automatically." },
          ].map((f) => (
            <GlassCard key={f.t}>
              <div className="size-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
                <f.i className="size-5" />
              </div>
              <h3 className="mt-4 font-semibold text-lg">{f.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-6 py-10 text-xs text-muted-foreground flex flex-wrap justify-between gap-3 border-t border-border/40">
        <span>© {new Date().getFullYear()} PowerCheckNG</span>
        <span>Built for Nigerian homes ⚡</span>
      </footer>
    </div>
  );
}
