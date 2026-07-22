import { BatteryCharging, Zap, Fuel } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { GlassCard } from "@/components/common/GlassCard";

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
        <SectionHeader
          icon={isGenerator ? Fuel : BatteryCharging}
          title="Recommended Backup Solution"
        />
        <div>
          <h3 className="break-words text-xl font-bold leading-tight sm:text-2xl">
            {isGenerator ? generator.name : isHybrid ? "Hybrid Backup System" : inverter.inverter}
          </h3>
        </div>

        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-5">
          <p className="text-[13px] leading-6 text-muted-foreground sm:text-sm lg:text-base">
            {isGenerator &&
              "Based on your energy profile, a generator offers the best balance between purchase cost, starting power and long-duration backup."}

            {technology === "INVERTER" &&
              "Your energy demand is well suited to an inverter system, providing quiet operation and low running costs."}

            {isHybrid &&
              "A hybrid solution combines the efficiency of an inverter with the reliability of a generator for heavy appliances and extended outages."}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-background/40 p-5">
          <p className="mb-5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            System Specifications
          </p>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-border bg-background p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Battery
              </p>

              <p className="mt-1 text-lg font-bold leading-none sm:text-xl">
                {isGenerator
                  ? "Not Required"
                  : isHybrid
                    ? `${inverter.battery} + Generator`
                    : inverter.battery}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background p-4">
              <p className="text-xs uppercase text-muted-foreground">Runtime</p>

              <p className="mt-1 text-lg font-bold leading-none sm:text-xl">
                {isGenerator ? "Unlimited (with fuel)" : `${inverter.estimatedRuntime} hrs`}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background p-4">
              <p className="text-xs uppercase text-muted-foreground">Suitability</p>

              <p className="mt-1 text-lg font-bold leading-none sm:text-xl text-green-500">
                {isGenerator ? "100%" : `${inverter.suitability}%`}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-background/40 p-4 sm:p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Backup sizing
          </p>

          <p className="mt-3 text-[13px] leading-6 text-muted-foreground sm:text-sm lg:text-base">
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
