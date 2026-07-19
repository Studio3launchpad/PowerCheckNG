import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";

const challenges = [
  {
    icon: "💸",
    title: "High Electricity Bills",
    description:
      "Many homes and businesses spend more than necessary because they don't know what consumes the most electricity.",
  },
  {
    icon: "🔋",
    title: "Choosing the Right Backup",
    description:
      "Buying the wrong generator, inverter or battery can lead to unnecessary costs and poor performance.",
  },
  {
    icon: "📍",
    title: "Uncertain Power Outages",
    description:
      "Community outage reporting helps you understand power availability in your area and stay informed.",
  },
];

export function WhyPowerCheck() {
  return (
    <Section>
      <PageContainer>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Why PowerCheckNG?
          </span>

          <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Managing Electricity
            <br />
            Shouldn't Be Guesswork.
          </h2>

          <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Whether you're trying to reduce electricity costs, choose the right backup solution or
            understand energy usage, PowerCheckNG gives you the insights needed to make informed
            decisions.
          </p>
        </div>

        <ResponsiveGrid columns={3} className="mt-16 gap-6 lg:gap-8">
          {challenges.map((item, index) => (
            <motion.div
              key={item.title}
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
                delay: index * 0.15,
              }}
            >
              <GlassCard className="h-full p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-2xl sm:h-14 sm:w-14 sm:text-3xl">
                  {item.icon}
                </div>

                <h3 className="mt-5 text-xl font-semibold sm:text-2xl">{item.title}</h3>

                <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                  {item.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </ResponsiveGrid>
      </PageContainer>
    </Section>
  );
}
