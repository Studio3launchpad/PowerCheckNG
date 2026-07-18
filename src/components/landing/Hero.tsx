import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";

const previewCards = [
  {
    title: "Energy Health",
    value: "Good",
    subtitle: "Energy Profile Ready",
    subtitleClass: "text-green-500",
    valueClass: "",
  },
  {
    title: "Monthly Cost",
    value: "Estimated",
    subtitle: "Usage Analysis",
    subtitleClass: "text-primary",
    valueClass: "",
  },
  {
    title: "Community Power",
    value: "Reports Available",
    subtitle: "Nearby Updates",
    subtitleClass: "text-muted-foreground",
    valueClass: "text-red-500",
  },
  {
    title: "Backup Advisor",
    value: "Recommendations",
    subtitle: "Personalised",
    subtitleClass: "text-muted-foreground",
    valueClass: "",
  },
];

export function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-12 lg:grid-cols-2">
      {/* Left */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
          <span className="size-1.5 animate-pulse rounded-full bg-primary" />
          ⚡ Smarter Energy Planning for Nigeria
        </span>

        <h1 className="mt-5 font-display text-5xl font-bold leading-tight md:text-6xl">
          Good Energy Decisions,
          <br />

          <span className="text-primary">
            Start With Better Insights
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-xl leading-8 text-muted-foreground">
          PowerCheckNG helps Nigerian homes and businesses
          understand electricity usage, estimate monthly costs,
          choose the right backup solution and stay informed
          about power outages in their community.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/sign-up/$"
            params={{ _splat: "" }}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 glow-primary"
          >
            Get Started
            <ArrowRight className="size-4" />
          </Link>

          <a
            href="#features"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/40 px-5 py-3 text-sm font-medium transition hover:bg-card/70"
          >
            Explore Features
          </a>
        </div>
      </motion.div>

      {/* Right */}

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.7,
          delay: 0.1,
        }}
      >
        <GlassCard className="overflow-hidden p-0">

          <div className="p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Product Preview
                </p>

                <h3 className="mt-1 text-xl font-semibold">
                  Your Energy Workspace
                </h3>

              </div>

            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">

              {previewCards.map((card, index) => (

                <motion.div
                  key={card.title}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.25 + index * 0.15,
                  }}
                  className="rounded-2xl border border-border bg-background/30 p-4"
                >

                  <p className="text-xs text-muted-foreground">
                    {card.title}
                  </p>

                  <p
                    className={`mt-2 text-xl font-bold ${card.valueClass}`}
                  >
                    {card.value}
                  </p>

                  <p
                    className={`mt-2 text-xs ${card.subtitleClass}`}
                  >
                    {card.subtitle}
                  </p>

                </motion.div>

              ))}

            </div>

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.95,
              }}
              className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5"
            >

              <p className="text-xs uppercase tracking-wide text-primary">
                Smart Recommendations
              </p>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Receive personalised energy recommendations,
                backup guidance and consumption insights based
                on your household or business energy profile.
              </p>

            </motion.div>

          </div>

        </GlassCard>

      </motion.div>
    </section>
  );
}