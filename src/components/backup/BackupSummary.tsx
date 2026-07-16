import { GlassCard } from "@/components/GlassCard";
import type { BackupRecommendation } from "@/lib/backup/backupAdvisor";



type Props = {
  recommendation: BackupRecommendation;
};

export function BackupSummary({
  recommendation,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <GlassCard>
        <p className="text-sm text-muted-foreground">
          Recommended System
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          {recommendation.inverter}
        </h2>
      </GlassCard>

      <GlassCard>
        <p className="text-sm text-muted-foreground">
          Estimated Backup
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          {recommendation.estimatedRuntime} Hours
        </h2>
      </GlassCard>

      <GlassCard>
        <p className="text-sm text-muted-foreground">
          Estimated Cost
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          ₦{recommendation.estimatedCost.toLocaleString()}
        </h2>
      </GlassCard>

      <GlassCard>
        <p className="text-sm text-muted-foreground">
          Estimated Capacity
        </p>

        <h2 className="mt-2 text-2xl font-bold text-primary">
          {recommendation.maxLoad}W
        </h2>
      </GlassCard>
    </div>
  );
}