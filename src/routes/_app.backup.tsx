import { createFileRoute, Link } from "@tanstack/react-router";
import { BackupHeader } from "@/components/backup/BackupHeader";
import { BackupSummary } from "@/components/backup/BackupSummary";
import { BackupReadinessCard } from "@/components/backup/BackupReadinessCard";
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
        <div className="space-y-4">
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
          >
            <span aria-hidden="true">←</span>
            Back to Smart Insights
          </Link>
        </div>
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

      <BackupSummary
        bestTechnology={advisor.bestTechnology}
        inverter={advisor.recommendation}
        generator={advisor.generatorRecommendation}
      />

      <BackupReadinessCard score={advisor.readinessScore} />

      <BestBackupSolutionCard
        technology={advisor.bestTechnology}
        inverter={advisor.recommendation}
        generator={advisor.generatorRecommendation}
        essentialApplianceCount={analysis.essentialApplianceCount}
      />

      <BackupRecommendation
        bestTechnology={advisor.bestTechnology}
        inverter={advisor.recommendation}
        generator={advisor.generatorRecommendation}
        readinessScore={advisor.readinessScore}
      />
      <CanItPowerCard
        appliances={appliances}
        bestTechnology={advisor.bestTechnology}
        inverter={advisor.recommendation}
        generator={advisor.generatorRecommendation}
      />

      <BackupCostBreakdown
        bestTechnology={advisor.bestTechnology}
        inverter={advisor.recommendation}
        generator={advisor.generatorRecommendation}
      />

      <AlternativeBackupOptions
        bestTechnology={advisor.bestTechnology}
        inverter={advisor.recommendation}
        generator={advisor.generatorRecommendation}
      />
    </div>
  );
}
