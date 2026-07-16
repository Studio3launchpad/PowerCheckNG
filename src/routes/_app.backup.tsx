import { createFileRoute, Link } from "@tanstack/react-router";
import { BackupHeader } from "@/components/backup/BackupHeader";
import { BackupSummary } from "@/components/backup/BackupSummary";
import { BackupReadinessCard } from "@/components/backup/BackupReadinessCard";
import { RecommendedBackupCard } from "@/components/backup/RecommendedBackupCard";
import { BackupRecommendation } from "@/components/backup/BackupRecommendation";
import { BackupCostBreakdown } from "@/components/backup/BackupCostBreakdown";
import { CanItPowerCard } from "@/components/backup/CanItPowerCard";
import { AlternativeBackupOptions } from "@/components/backup/AlternativeBackupOptions";
import { BestBackupSolutionCard } from "@/components/backup/BestBackupSolutionCard";
import { loadEnergyAnalysis, loadSavedAppliances } from "@/lib/energy/energyStorage";
import { buildBackupAdvisor } from "@/lib/backup/backupAdvisor";

export const Route = createFileRoute("/_app/backup")({
  component: BackupPage,
});

function BackupPage() {
  const analysis = loadEnergyAnalysis();

  const appliances = loadSavedAppliances() ?? [];

  if (!analysis) {
    return (
      <div className="space-y-6 pb-24 lg:pb-6">
        <BackupHeader />

        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <h2 className="text-2xl font-bold">No Energy Plan Found</h2>

          <p className="mt-3 text-muted-foreground">
            Build your Smart Energy Plan first before requesting a backup recommendation.
          </p>

          <Link
            to="/energy"
            className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground"
          >
            Open Energy Planner
          </Link>
        </div>
      </div>
    );
  }

  const advisor = buildBackupAdvisor(analysis);

  return (
    <div className="space-y-6 pb-24 lg:pb-6">
      <BackupHeader />

      <BackupSummary recommendation={advisor.recommendation} />

      <BackupReadinessCard score={advisor.readinessScore} />

      <BestBackupSolutionCard
  technology={advisor.bestTechnology}
  inverter={advisor.recommendation}
  generator={advisor.generatorRecommendation}
  essentialApplianceCount={
    analysis.essentialApplianceCount
  }
/>

      <RecommendedBackupCard
  recommendation={advisor.recommendation}
  bestTechnology={advisor.bestTechnology}
/>

      <BackupRecommendation
        recommendation={advisor.recommendation}
        readinessScore={advisor.readinessScore}
      />
      <CanItPowerCard appliances={appliances} recommendation={advisor.recommendation} />

      <BackupCostBreakdown recommendation={advisor.recommendation} />

      <AlternativeBackupOptions recommendation={advisor.recommendation} />
    </div>
  );
}
