import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

import { GlassCard } from "@/components/GlassCard";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";

export function CTASection() {
  return (
    <Section>
      <PageContainer>
        <motion.div
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
            duration: 0.5,
          }}
        >
          <GlassCard className="relative overflow-hidden p-6 sm:p-10 lg:p-16">
            {/* Background Glow */}

            <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-primary/10 blur-3xl sm:h-72 sm:w-72" />

            <div className="relative text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg sm:h-16 sm:w-16">
                <Zap className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>

              <h2 className="mt-8 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Start Making
                <br />
                Better Energy Decisions Today
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                Build your energy profile, estimate electricity
                costs, receive personalised recommendations and
                discover the best backup solution—all in one place.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  to="/sign-up/$"
                  params={{ _splat: "" }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 sm:w-auto glow-primary"
                >
                  Get Started

                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href="#features"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-background/40 px-6 py-3 text-sm font-semibold transition hover:bg-background sm:w-auto"
                >
                  Explore Features
                </a>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </PageContainer>
    </Section>
  );
}