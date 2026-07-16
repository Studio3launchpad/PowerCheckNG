import {
  BatteryCharging,
  Zap,
  Fuel,
} from "lucide-react";

import { GlassCard } from "@/components/GlassCard";

import type {
  BackupRecommendation,
  GeneratorRecommendation,
  BackupType,
} from "@/lib/backup/backupAdvisor";

type Props = {
  technology: BackupType;

  inverter: BackupRecommendation;

  generator: GeneratorRecommendation;

  essentialApplianceCount: number;
};

export function BestBackupSolutionCard({
  technology,
  inverter,
  generator,
  essentialApplianceCount,
}: Props) {
  const isGenerator =
    technology === "GENERATOR";

  const isHybrid =
    technology === "HYBRID";

  return (
    <GlassCard>
      <div className="space-y-6">

        <div className="flex items-center gap-3">

          {isGenerator ? (
            <Fuel className="h-8 w-8 text-primary" />
          ) : (
            <BatteryCharging className="h-8 w-8 text-primary" />
          )}

          <div>
            <p className="text-xs uppercase tracking-widest text-primary">
              Best Backup Solution
            </p>

            <h2 className="text-2xl font-bold">
              {isGenerator
                ? generator.name
                : isHybrid
                ? "Hybrid Backup System"
                : inverter.inverter}
            </h2>
          </div>

        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">

          <p className="leading-7">

            {isGenerator &&
              "Based on your energy profile, a generator offers the best balance between purchase cost, starting power and long-duration backup."}

            {technology ===
              "INVERTER" &&
              "Your energy demand is well suited to an inverter system, providing quiet operation and low running costs."}

            {isHybrid &&
              "A hybrid solution combines the efficiency of an inverter with the reliability of a generator for heavy appliances and extended outages."}

          </p>

        </div>

        <div className="rounded-xl border border-border bg-background/40 p-4">
  <p className="text-sm font-medium">
    Backup sizing
  </p>

  <p className="mt-2 text-sm text-muted-foreground">
    This recommendation is based on{" "}
    <span className="font-semibold text-foreground">
      {essentialApplianceCount > 0
        ? essentialApplianceCount
        : "all selected"}
    </span>{" "}
    appliance
    {essentialApplianceCount === 1 ? "" : "s"}{" "}
    marked for use during power outages.
  </p>
</div>

        <div className="grid gap-4 md:grid-cols-3">

          <div className="rounded-xl border border-border p-4">

            <Zap className="mb-2 h-5 w-5 text-primary" />

            <p className="text-xs text-muted-foreground">
              Estimated Investment
            </p>

            <p className="mt-2 text-xl font-bold">

              ₦
              {(isGenerator
                ? generator.estimatedCost
                : inverter.estimatedCost
              ).toLocaleString()}

            </p>

          </div>

          <div className="rounded-xl border border-border p-4">

            <p className="text-xs text-muted-foreground">
              Maximum Load
            </p>

            <p className="mt-2 text-xl font-bold">

              {isGenerator
                ? generator.maxLoad
                : inverter.maxLoad}
              W

            </p>

          </div>

          <div className="rounded-xl border border-border p-4">

            <p className="text-xs text-muted-foreground">
              Recommended Technology
            </p>

            <p className="mt-2 text-xl font-bold">

              {technology}

            </p>

          </div>

        </div>

      </div>
    </GlassCard>
  );
}