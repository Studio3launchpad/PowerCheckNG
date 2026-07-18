import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";

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
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">

        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
          Why PowerCheckNG?
        </span>

        <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
          Managing Electricity
          <br />
          Shouldn't Be Guesswork.
        </h2>

        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Whether you're trying to reduce electricity costs,
          choose the right backup solution or understand
          energy usage, PowerCheckNG gives you the insights
          needed to make informed decisions.
        </p>

      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">

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

            <GlassCard className="h-full p-8 transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-3xl">
                {item.icon}
              </div>

              <h3 className="mt-6 text-2xl font-semibold">
                {item.title}
              </h3>

              <p className="mt-4 leading-8 text-muted-foreground">
                {item.description}
              </p>

            </GlassCard>

          </motion.div>

        ))}

      </div>

    </section>
  );
}