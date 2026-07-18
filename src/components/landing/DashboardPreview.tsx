import { motion } from "framer-motion";
import {
  BatteryCharging,
  BarChart3,
  Lightbulb,
  MapPinned,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { GlassCard } from "@/components/GlassCard";

const summary = [
  {
    title: "Health",
    value: "Good",
    icon: ShieldCheck,
  },
  {
    title: "Usage",
    value: "Estimated",
    icon: BarChart3,
  },
  {
    title: "Cost",
    value: "Monthly",
    icon: Zap,
  },
  {
    title: "Backup",
    value: "Ready",
    icon: BatteryCharging,
  },
];

const tools = [
  "Smart Planner",
  "Smart Insights",
  "Backup Advisor",
  "Community Power",
];

export function DashboardPreview() {
  return (
    <section
      id="dashboard"
      className="mx-auto max-w-7xl px-6 py-24"
    >
      <div className="mx-auto max-w-3xl text-center">

        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
          Dashboard Preview
        </span>

        <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
          Everything In One Place
        </h2>

        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Monitor your energy profile, review recommendations,
          explore community reports and access every PowerCheckNG
          tool from one clean dashboard.
        </p>

      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16"
      >

        <GlassCard className="overflow-hidden p-8">

          {/* Today's Summary */}

          <div>

            <h3 className="text-xl font-semibold">
              Today's Summary
            </h3>

            <div className="mt-6 grid gap-4 md:grid-cols-4">

              {summary.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-xl border border-border bg-background/30 p-5"
                  >
                    <Icon className="mb-3 h-6 w-6 text-primary" />

                    <p className="text-sm text-muted-foreground">
                      {item.title}
                    </p>

                    <p className="mt-2 text-xl font-semibold">
                      {item.value}
                    </p>

                  </div>
                );
              })}

            </div>

          </div>

          {/* Lower Section */}

          <div className="mt-8 grid gap-6 lg:grid-cols-3">

            <GlassCard className="p-6">

              <div className="flex items-center gap-3">

                <MapPinned className="h-6 w-6 text-primary" />

                <h4 className="font-semibold">
                  Community Power
                </h4>

              </div>

              <p className="mt-5 text-3xl font-bold">
                Reports Available
              </p>

              <p className="mt-3 text-sm text-muted-foreground">
                Stay informed about power availability around you.
              </p>

            </GlassCard>

            <GlassCard className="lg:col-span-2 p-6">

              <div className="flex items-center gap-3">

                <Lightbulb className="h-6 w-6 text-primary" />

                <h4 className="font-semibold">
                  PowerCheck Tools
                </h4>

              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">

                {tools.map((tool) => (

                  <div
                    key={tool}
                    className="rounded-xl border border-border bg-background/30 px-4 py-3"
                  >
                    {tool}
                  </div>

                ))}

              </div>

            </GlassCard>

          </div>

          {/* Recommendation */}

          <GlassCard className="mt-8 border-primary/20 bg-primary/5 p-6">

            <p className="text-xs uppercase tracking-wide text-primary">
              Today's Recommendation
            </p>

            <p className="mt-4 text-lg font-medium">
              Your estimated monthly energy profile is ready.
            </p>

            <p className="mt-3 leading-7 text-muted-foreground">
              Review your energy analysis to understand
              your highest energy consumers, estimated
              monthly cost and the most suitable backup
              solution for your home or business.
            </p>

          </GlassCard>

        </GlassCard>

      </motion.div>

    </section>
  );
}