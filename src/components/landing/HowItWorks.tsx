import { motion } from "framer-motion";
import {
  BarChart3,
  CircleCheckBig,
  Lightbulb,
} from "lucide-react";

import { GlassCard } from "@/components/GlassCard";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";

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
    <Section id="how">
      <PageContainer>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            How It Works
          </span>

          <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Three Simple Steps
          </h2>

          <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Set up your energy profile once, then let PowerCheckNG
            help you make smarter electricity decisions every day.
          </p>
        </div>

        <div className="relative mt-16 lg:mt-20">
          {/* Desktop Timeline */}
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
                className={`mb-10 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-center lg:gap-8 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1">
                  <GlassCard className="group h-full p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 sm:p-8">
                    <div className="flex items-start gap-4 sm:items-center">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground sm:h-14 sm:w-14 sm:text-lg">
                        {step.number}
                      </div>

                      <div className="min-w-0">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                          <Icon className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground" />
                        </div>

                        <h3 className="text-xl font-semibold sm:text-2xl">
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    <p className="mt-5 text-sm leading-7 text-muted-foreground sm:mt-6 sm:text-base sm:leading-8">
                      {step.description}
                    </p>
                  </GlassCard>
                </div>

                {/* Desktop Timeline Dot */}
                <div className="hidden w-20 justify-center lg:flex">
                  <div className="h-5 w-5 rounded-full border-4 border-primary bg-background" />
                </div>

                {/* Spacer */}
                <div className="hidden flex-1 lg:block" />
              </motion.div>
            );
          })}
        </div>
      </PageContainer>
    </Section>
  );
}