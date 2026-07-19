import { AlertTriangle, Battery, TrendingUp, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { GlassCard } from "@/components/GlassCard";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { DashboardSection } from "@/components/dashboard/common/DashboardSection";

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
      <GlassCard className="p-5 sm:p-6">
        <DashboardSection
          title="PowerCheck Tools"
          description="Access all PowerCheckNG tools."
        >
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
                    flex-col
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-border
                    p-6
                    text-center
                    transition-all
                    hover:border-primary
                    hover:bg-primary/5
                    sm:p-8
                  "
                >
                  <Icon className="h-10 w-10 text-primary transition-transform duration-300 group-hover:scale-110" />

                  <span className="mt-5 font-semibold">
                    {tool.title}
                  </span>
                </Link>
              );
            })}
          </ResponsiveGrid>
        </DashboardSection>
      </GlassCard>
    </motion.div>
  );
}