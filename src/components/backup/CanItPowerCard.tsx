import { CheckCircle2, XCircle } from "lucide-react";
import { GlassCard } from "@/components/common/GlassCard";
import type { Appliance } from "@/lib/energy/energy.types";
import type {
  BackupRecommendation,
  BackupType,
  GeneratorRecommendation,
} from "@/lib/backup/backupAdvisor";
import { SectionHeader } from "@/components/common/SectionHeader";
import { PlugZap } from "lucide-react";

type Props = {
  appliances: Appliance[];

  bestTechnology: BackupType;

  inverter: BackupRecommendation;

  generator: GeneratorRecommendation;
};

export function CanItPowerCard({ appliances, bestTechnology, inverter, generator }: Props) {
  const maxLoad =
    bestTechnology === "GENERATOR"
      ? generator.maxLoad
      : bestTechnology === "HYBRID"
        ? Math.max(inverter.maxLoad, generator.maxLoad)
        : inverter.maxLoad;

  const selected = appliances.filter((appliance) => appliance.selected);

  const supported: Appliance[] = [];
  const unsupported: Appliance[] = [];

  let runningLoad = 0;

  for (const appliance of selected) {
    const load = appliance.watts * appliance.quantity;

    if (runningLoad + load <= maxLoad) {
      supported.push(appliance);
      runningLoad += load;
    } else {
      unsupported.push(appliance);
    }
  }

  return (
    <GlassCard>
      <div className="space-y-6">
        <SectionHeader
          icon={PlugZap}
          title="Can This Backup Power My Appliances?"
          description="Based on your selected appliances and the recommended backup system."
        />

        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-5">
          <p className="text-[13px] leading-6 text-muted-foreground sm:text-sm lg:text-base">
            <span className="font-semibold text-foreground">{supported.length}</span> appliance
            {supported.length !== 1 ? "s" : ""} can run safely, while{" "}
            <span className="font-semibold text-foreground">{unsupported.length}</span> may overload
            the recommended backup system.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <div className="rounded-2xl border border-border bg-background/40 p-4 sm:p-5">
              <div className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-muted/40">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />

                  <h3 className="text-xs font-medium uppercase tracking-wide text-green-500">
                    Supported
                  </h3>
                </div>

                <span className="rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-semibold text-green-500">
                  {supported.length}
                </span>
              </div>

              <div className="space-y-2">
                {supported.length === 0 ? (
                  <p className="text-[13px] leading-6 text-muted-foreground sm:text-sm">
                    No appliances.
                  </p>
                ) : (
                  supported.map((appliance) => (
                    <div
                      key={appliance.id}
                      className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/40"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />

                      <span className="text-sm font-medium leading-6">{appliance.name}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-2xl border border-border bg-background/40 p-4 sm:p-5">
              <div className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-muted/40">
                <div className="flex items-center gap-3">
                  <XCircle className="h-5 w-5 shrink-0 text-red-500" />

                  <h3 className="text-xs font-medium uppercase tracking-wide text-red-500">
                    May Overload
                  </h3>
                </div>

                <span className="rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-500">
                  {unsupported.length}
                </span>
              </div>

              <div className="space-y-2">
                {unsupported.length === 0 ? (
                  <p className="text-[13px] leading-6 text-muted-foreground sm:text-sm">None</p>
                ) : (
                  unsupported.map((appliance) => (
                    <div
                      key={appliance.id}
                      className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/40"
                    >
                      <XCircle className="h-4 w-4 shrink-0 text-red-500" />

                      <span className="text-sm font-medium leading-6">{appliance.name}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
