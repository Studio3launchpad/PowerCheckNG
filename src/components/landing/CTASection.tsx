import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";

export function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
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
        <GlassCard className="relative overflow-hidden p-10 md:p-16">

          {/* Background Glow */}

          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
              <Zap className="h-8 w-8" />
            </div>

            <h2 className="mt-8 font-display text-4xl font-bold md:text-5xl">
              Start Making
              <br />
              Better Energy Decisions Today
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Build your energy profile, estimate electricity costs,
              receive personalised recommendations and discover the
              best backup solution—all in one place.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">

              <Link
                to="/sign-up/$"
                params={{ _splat: "" }}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 glow-primary"
              >
                Get Started

                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="#features"
                className="inline-flex items-center rounded-xl border border-border bg-background/40 px-6 py-3 text-sm font-semibold transition hover:bg-background"
              >
                Explore Features
              </a>

            </div>

          </div>

        </GlassCard>
      </motion.div>
    </section>
  );
}