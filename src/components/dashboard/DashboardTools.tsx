import { AlertTriangle, Battery, TrendingUp, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { GlassCard } from "@/components/common/GlassCard";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { SectionHeader } from "@/components/common/SectionHeader";

const tools = [
  {
    title: "Planner",
    to: "/energy",
    icon: Zap,
  },
  {
    title: "Insights",
    to: "/insights",
    icon: TrendingUp,
  },
  {
    title: "Backup",
    to: "/backup",
    icon: Battery,
  },
  {
    title: "Outages",
    to: "/outages",
    icon: AlertTriangle,
  },
];

export function DashboardTools() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
    >
      <GlassCard className="p-4 sm:p-5">
        <SectionHeader
          title="PowerCheck Tools"
          description="Quick access to all PowerCheckNG tools."
        />
        <div className="mt-6">
          <ResponsiveGrid columns={4}>
            {tools.map((tool) => {
              const Icon = tool.icon;

              return (
                <Link
                  key={tool.title}
                  to={tool.to}
                  className="
  group
  flex
  h-full
  flex-col
  items-center
  justify-center
  rounded-2xl
  border
  border-border
  bg-background/40
  p-5
  text-center
  transition-all
  duration-300
  hover:-translate-y-1
  hover:border-primary
  hover:bg-primary/5
  hover:shadow-lg
  sm:p-6
"
                >
                  <Icon className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />

                  <span className="mt-4 text-sm font-semibold sm:text-base">{tool.title}</span>
                </Link>
              );
            })}
          </ResponsiveGrid>
        </div>
      </GlassCard>
    </motion.div>
  );
}
