import { Brain, TrendingUp, ShieldCheck } from "lucide-react";
import { buildBackupDisplayModel } from "@/lib/backup/displayModel";
import { GlassCard } from "@/components/GlassCard";
import type {
  BackupRecommendation as BackupRecommendationType,
  BackupType,
  GeneratorRecommendation,
} from "@/lib/backup/backupAdvisor";
import { SectionHeader } from "@/components/common/SectionHeader";
import { MetricCard } from "@/components/common/MetricCard";

type Props = {
  bestTechnology: BackupType;

  inverter: BackupRecommendationType;

  generator: GeneratorRecommendation;

  readinessScore: number;
};

export function BackupRecommendation({
  bestTechnology,
  inverter,
  generator,
  readinessScore,
}: Props) {
  const display = buildBackupDisplayModel(bestTechnology, inverter, generator);

  return (
    <GlassCard>
      <div className="space-y-6">
        <SectionHeader
          icon={Brain}
          title="PowerCheckNG Recommendation"
          description="An explanation of why this backup system was recommended."
        />

        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-5">
          <p className="text-[13px] leading-6 text-muted-foreground sm:text-sm lg:text-base">
            {display.reason}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 text-muted-foreground">
          <MetricCard
            icon={ShieldCheck}
            iconSize="sm"
            compact
            title="Recommendation Confidence"
            value={display.confidence}
            subtitle={`Suitability Score: ${display.suitability}%`}
          />

          <MetricCard
            icon={TrendingUp}
            iconSize="sm"
            compact
            title="Backup Readiness"
            value={`${readinessScore}/100`}
            subtitle="Based on your selected essential appliances."
          />
        </div>

        <div className="rounded-2xl border border-border p-4 sm:p-5">
          <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Future Upgrade Advice
          </h3>

          <p className="mt-3 text-[13px] leading-6 text-muted-foreground sm:text-sm lg:text-base">
            {display.upgradeAdvice}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
