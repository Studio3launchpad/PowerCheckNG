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
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/_app/backup")({
  component: BackupPage,
});

function BackupPage() {
  const analysis = loadEnergyAnalysis();

  const appliances = loadSavedAppliances() ?? [];

  if (!analysis) {
    return (
      <div className="space-y-8 pb-24 lg:space-y-10 lg:pb-6">
        <div className="space-y-4">
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <span aria-hidden="true">←</span>
            Back to Smart Insights
          </Link>
        </div>
        

        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-border bg-card p-6 text-center sm:p-8">
          <h2 className="text-2xl font-bold sm:text-3xl">No Energy Plan Found</h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            Build your Smart Energy Plan first before requesting a backup recommendation.
          </p>

          <Link
            to="/energy"
            className="mt-6 inline-flex w-full justify-center rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90 sm:w-auto"
          >
            Open Energy Planner
          </Link>
        </div>
        </div>
      </div>
    );
  }

  const advisor = buildBackupAdvisor(analysis);

  return (
    <div className="space-y-6 px-4 pb-24 sm:px-0 lg:pb-6">
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
      
<div className="mt-8 flex justify-center">
  <Link to="/energy">
    <Button size="lg" className="w-full max-w-sm">
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back to Smart Energy Planner
    </Button>
  </Link>
</div>

    </div>
  );
}
