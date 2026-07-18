import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { Lightbulb, BarChart3, CircleCheckBig } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Add Your Appliances",
    description:
      "Select the appliances you use, specify quantities and estimated daily usage to create your personalised energy profile.",
  },
  {
    number: "02",
    icon: BarChart3,
    title: "Review Your Analysis",
    description:
      "Instantly see your estimated monthly usage, electricity cost, energy health score and appliance breakdown.",
  },
  {
    number: "03",
    icon: CircleCheckBig,
    title: "Make Better Decisions",
    description:
      "Use personalised recommendations, backup advice and community outage reports to plan with confidence.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      className="mx-auto max-w-7xl px-6 py-24"
    >
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
          How It Works
        </span>

        <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
          Three Simple Steps
        </h2>

        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Set up your energy profile once, then let PowerCheckNG
          help you make smarter electricity decisions every day.
        </p>
      </div>

      <div className="relative mt-20">

        {/* Vertical Timeline */}
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border lg:block" />

        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <motion.div
              key={step.number}
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
              className={`mb-16 flex flex-col items-center gap-8 lg:flex-row ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1">
                <GlassCard className="group h-full p-8 transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">

                  <div className="flex items-center gap-4">

                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                      {step.number}
                    </div>

                    <div>

                      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">

                        <Icon className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground" />

                      </div>

                      <h3 className="text-2xl font-semibold">
                        {step.title}
                      </h3>

                    </div>

                  </div>

                  <p className="mt-6 leading-8 text-muted-foreground">
                    {step.description}
                  </p>

                </GlassCard>
              </div>

              <div className="hidden w-20 justify-center lg:flex">
                <div className="h-5 w-5 rounded-full border-4 border-primary bg-background" />
              </div>

              <div className="hidden flex-1 lg:block" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}