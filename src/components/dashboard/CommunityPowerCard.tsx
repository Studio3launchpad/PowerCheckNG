import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { GlassCard } from "@/components/GlassCard";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { SectionHeader } from "@/components/common/SectionHeader";

interface CommunityPowerCardProps {
  location: {
    area: string;
    discoCode: string;
  };
  currentStatus: string;
  confidence: number;
  reportCount: number;
  isPending: boolean;
}

interface StatItemProps {
  label: string;
  value: React.ReactNode;
}

function StatItem({ label, value }: StatItemProps) {
  return (
    <div className="rounded-2xl border border-border p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>

      <div className="mt-2">{value}</div>
    </div>
  );
}

export function CommunityPowerCard({
  location,
  currentStatus,
  confidence,
  reportCount,
  isPending,
}: CommunityPowerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <GlassCard className="p-5 sm:p-6">
        <SectionHeader
          title="Community Power"
          description="Live community power status from nearby reports."
          action={
            <Link
              to="/outages"
              className="inline-flex w-full items-center justify-center rounded-2xl border border-primary/30 bg-primary/5 px-5 py-3 text-sm font-medium text-primary transition hover:bg-primary/10 sm:w-auto"
            >
              Open Outage Tracker
            </Link>
          }
        />

        <ResponsiveGrid columns={4}>
          <StatItem
            label="Status"
            value={
              <span
                className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                  reportCount === 0
                    ? "bg-muted text-muted-foreground"
                    : currentStatus === "Power ON"
                      ? "bg-green-500/10 text-green-500"
                      : currentStatus === "Power OFF"
                        ? "bg-red-500/10 text-red-500"
                        : "bg-yellow-500/10 text-yellow-500"
                }`}
              >
                {isPending ? "Loading..." : reportCount === 0 ? "No Reports Yet" : currentStatus}
              </span>
            }
          />

          <StatItem label="Area" value={<p className="text-lg font-semibold">{location.area}</p>} />

          <StatItem
            label="Distribution Company"
            value={<p className="text-lg font-semibold">{location.discoCode}</p>}
          />

          <StatItem
            label="Community Confidence"
            value={
              reportCount === 0 ? (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Awaiting the first report from your area.
                  </p>

                  <Link
                    to="/outages"
                    className="inline-flex items-center rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                  >
                    Report Power Status
                  </Link>
                </div>
              ) : (
                <div>
                  <p className="text-lg font-semibold">{confidence}% confidence</p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Based on {reportCount} report{reportCount > 1 ? "s" : ""}
                  </p>
                </div>
              )
            }
          />
        </ResponsiveGrid>
      </GlassCard>
    </motion.div>
  );
}
