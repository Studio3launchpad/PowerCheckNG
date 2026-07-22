import { motion } from "framer-motion";
import { BatteryCharging, BarChart3, Lightbulb, MapPinned } from "lucide-react";
import { GlassCard } from "@/components/common/GlassCard";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";

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
    <Section id="features">
      <PageContainer>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Core Features
          </span>

          <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Everything You Need
            <br />
            To Make Better Energy Decisions
          </h2>

          <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            PowerCheckNG combines energy planning, consumption insights, backup recommendations and
            community outage reporting in one simple platform.
          </p>
        </div>

        <ResponsiveGrid columns={2} className="mt-20 gap-6 lg:gap-8">
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
                <GlassCard className="group h-full p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary sm:h-14 sm:w-14">
                    <Icon className="h-6 w-6 text-primary transition-colors group-hover:text-primary-foreground sm:h-7 sm:w-7" />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold sm:text-2xl">{feature.title}</h3>

                  <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </ResponsiveGrid>
      </PageContainer>
    </Section>
  );
}
