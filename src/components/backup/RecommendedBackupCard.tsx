import { Battery } from "lucide-react";
import { GlassCard } from "@/components/common/GlassCard";
import type { BackupRecommendation, BackupType } from "@/lib/backup/backupAdvisor";

type Props = {
  recommendation: BackupRecommendation;

  bestTechnology: BackupType;
};

export function RecommendedBackupCard({ recommendation, bestTechnology }: Props) {
  return (
    <GlassCard>
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <Battery className="h-8 w-8 text-primary" />

          <div>
            <p className="text-xs uppercase tracking-wider text-primary">
              {bestTechnology === "INVERTER"
                ? "Recommended Inverter System"
                : bestTechnology === "GENERATOR"
                  ? "Recommended Inverter Alternative"
                  : "Recommended Inverter Component"}
            </p>

            <h2 className="text-2xl font-bold">{recommendation.inverter}</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Battery</p>

            <p className="font-semibold">{recommendation.battery}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Runtime</p>

            <p className="font-semibold">{recommendation.estimatedRuntime} hrs</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Estimated Cost</p>

            <p className="font-semibold">₦{recommendation.estimatedCost.toLocaleString()}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Suitability</p>

            <p className="font-semibold text-green-500">{recommendation.suitability}%</p>
          </div>
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
          <p className="text-sm font-medium">Why this recommendation?</p>

          <p className="mt-2 text-sm text-muted-foreground leading-6">{recommendation.reason}</p>
        </div>
      </div>
    </GlassCard>
  );
}
