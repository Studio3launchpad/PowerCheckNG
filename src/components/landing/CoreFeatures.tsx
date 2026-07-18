import { motion } from "framer-motion";
import {
  BatteryCharging,
  BarChart3,
  Lightbulb,
  MapPinned,
} from "lucide-react";
import { GlassCard } from "@/components/GlassCard";

const features = [
  {
    icon: Lightbulb,
    title: "Smart Energy Planner",
    description:
      "Build your energy profile by selecting appliances, estimating daily usage and understanding your expected monthly electricity consumption.",
  },
  {
    icon: BarChart3,
    title: "Smart Insights",
    description:
      "View your energy health score, monthly usage estimates, electricity costs, highest energy consumers and practical recommendations.",
  },
  {
    icon: BatteryCharging,
    title: "Backup Advisor",
    description:
      "Receive tailored generator and inverter recommendations based on your estimated energy needs and essential appliances.",
  },
  {
    icon: MapPinned,
    title: "Community Power",
    description:
      "View and contribute community outage reports to stay informed about power availability in your neighbourhood.",
  },
];

export function CoreFeatures() {
  return (
    <section
      id="features"
      className="mx-auto max-w-7xl px-6 py-24"
    >
      <div className="mx-auto max-w-3xl text-center">

        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
          Core Features
        </span>

        <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
          Everything You Need
          <br />
          To Make Better Energy Decisions
        </h2>

        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          PowerCheckNG combines energy planning,
          consumption insights, backup recommendations
          and community outage reporting in one
          simple platform.
        </p>

      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2">

        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <motion.div
              key={feature.title}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.45,
                delay: index * 0.12,
              }}
            >
              <GlassCard className="group h-full p-8 transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary">

                  <Icon className="h-7 w-7 text-primary transition-colors group-hover:text-primary-foreground" />

                </div>

                <h3 className="mt-6 text-2xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-8 text-muted-foreground">
                  {feature.description}
                </p>

              </GlassCard>
            </motion.div>
          );
        })}

      </div>
    </section>
  );
}