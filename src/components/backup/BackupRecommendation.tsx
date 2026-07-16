import {
  Brain,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

import { GlassCard } from "@/components/GlassCard";
import type { BackupRecommendation as BackupRecommendationType } from "@/lib/backup/backupAdvisor";

type Props = {
  recommendation: BackupRecommendationType;
  readinessScore: number;
};

export function BackupRecommendation({
  recommendation,
  readinessScore,
}: Props) {
  const confidence =
  recommendation.suitability >= 90
    ? "High"
    : recommendation.suitability >= 75
    ? "Good"
    : recommendation.suitability >= 60
    ? "Limited"
    : "Low";

  const upgradeAdvice =
    recommendation.maxLoad < 1500
      ? "If you expect to add more appliances in the future, consider upgrading to a larger inverter system when your electricity demand increases."
      : recommendation.maxLoad < 2500
        ? "This system provides some room for expansion. If you later add heavy appliances such as an Air Conditioner or Chest Freezer, consider moving to the next inverter size."
        : "This recommendation already provides substantial capacity for future expansion based on your current energy profile.";

  return (
    <GlassCard>
      <div className="space-y-6">

        <div className="flex items-center gap-3">
          <Brain className="h-7 w-7 text-primary" />

          <div>
            <h2 className="text-xl font-bold">
              PowerCheckNG Recommendation
            </h2>

            <p className="text-sm text-muted-foreground">
              An explanation of why this backup system was recommended.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm leading-7">
            {recommendation.reason}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">

          <div className="rounded-xl border border-border p-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />

              <p className="font-semibold">
                Recommendation Confidence
              </p>
            </div>

            <p className="mt-3 text-2xl font-bold">
              {confidence}
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Suitability Score: {recommendation.suitability}%
            </p>
          </div>

          <div className="rounded-xl border border-border p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />

              <p className="font-semibold">
                Backup Readiness
              </p>
            </div>

            <p className="mt-3 text-2xl font-bold">
              {readinessScore}/100
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Based on your selected essential appliances.
            </p>
          </div>

        </div>

        <div className="rounded-xl border border-border p-5">
          <h3 className="font-semibold">
            Future Upgrade Advice
          </h3>

          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {upgradeAdvice}
          </p>
        </div>

      </div>
    </GlassCard>
  );
}