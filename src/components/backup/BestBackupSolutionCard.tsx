import { BatteryCharging, Zap, Fuel } from "lucide-react";

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
  const isGenerator = technology === "GENERATOR";

  const isHybrid = technology === "HYBRID";

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
              Recommended Backup Solution
            </p>

            <h2 className="text-2xl font-bold">
              {isGenerator ? generator.name : isHybrid ? "Hybrid Backup System" : inverter.inverter}
            </h2>
          </div>
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="leading-7">
            {isGenerator &&
              "Based on your energy profile, a generator offers the best balance between purchase cost, starting power and long-duration backup."}

            {technology === "INVERTER" &&
              "Your energy demand is well suited to an inverter system, providing quiet operation and low running costs."}

            {isHybrid &&
              "A hybrid solution combines the efficiency of an inverter with the reliability of a generator for heavy appliances and extended outages."}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-background/40 p-5">
  <p className="mb-5 text-sm font-medium">
    System Specifications
  </p>

  <div className="grid gap-6 md:grid-cols-3">
    <div>
      <p className="text-xs text-muted-foreground">
        Battery
      </p>

      <p className="mt-1 text-lg font-semibold">
        {isGenerator
          ? "Not Required"
          : isHybrid
          ? `${inverter.battery} + Generator`
          : inverter.battery}
      </p>
    </div>

    <div>
      <p className="text-xs text-muted-foreground">
        Runtime
      </p>

      <p className="mt-1 text-lg font-semibold">
        {isGenerator
          ? "Unlimited (with fuel)"
          : `${inverter.estimatedRuntime} hrs`}
      </p>
    </div>

    <div>
      <p className="text-xs text-muted-foreground">
        Suitability
      </p>

      <p className="mt-1 text-lg font-semibold text-green-500">
        {isGenerator
          ? "100%"
          : `${inverter.suitability}%`}
      </p>
    </div>
  </div>
</div>

        <div className="rounded-xl border border-border bg-background/40 p-4">
          <p className="text-sm font-medium">Backup sizing</p>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {essentialApplianceCount > 0 ? (
              <>
                This recommendation is based on{" "}
                <span className="font-semibold text-foreground">{essentialApplianceCount}</span>{" "}
                appliance
                {essentialApplianceCount === 1 ? "" : "s"} marked for use during power outages.
              </>
            ) : (
              <>
                No appliances were marked for use during power outages, so PowerCheckNG assumed you
                want to back up all selected appliances.
              </>
            )}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
