import { CheckCircle2, XCircle } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import type { Appliance } from "@/lib/energy/energy.types";
import type {
  BackupRecommendation,
  BackupType,
  GeneratorRecommendation,
} from "@/lib/backup/backupAdvisor";

type Props = {
  appliances: Appliance[];

  bestTechnology: BackupType;

  inverter: BackupRecommendation;

  generator: GeneratorRecommendation;
};

export function CanItPowerCard({
  appliances,
  bestTechnology,
  inverter,
  generator,
}: Props) {

const maxLoad =
  bestTechnology === "GENERATOR"
    ? generator.maxLoad
    : bestTechnology === "HYBRID"
      ? Math.max(inverter.maxLoad, generator.maxLoad)
      : inverter.maxLoad;

  const selected = appliances.filter(
    (appliance) => appliance.selected,
  );

  const supported: Appliance[] = [];
  const unsupported: Appliance[] = [];

  let runningLoad = 0;

  for (const appliance of selected) {
    const load =
      appliance.watts * appliance.quantity;

    if (
      runningLoad + load <=
      maxLoad
    ) {
      supported.push(appliance);
      runningLoad += load;
    } else {
      unsupported.push(appliance);
    }
  }

  return (
    <GlassCard>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold">
            Can This Backup Power My Appliances?
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Based on your selected appliances and
            the recommended backup system.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <h3 className="mb-3 font-semibold text-green-500">
              ✓ Supported
            </h3>

            <div className="space-y-2">
              {supported.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No appliances.
                </p>
              ) : (
                supported.map((appliance) => (
                  <div
                    key={appliance.id}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4 text-green-500" />

                    <span>
                      {appliance.name}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-red-500">
              ⚠ May Overload
            </h3>

            <div className="space-y-2">
              {unsupported.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  None
                </p>
              ) : (
                unsupported.map((appliance) => (
                  <div
                    key={appliance.id}
                    className="flex items-center gap-2"
                  >
                    <XCircle className="h-4 w-4 text-red-500" />

                    <span>
                      {appliance.name}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </GlassCard>
  );
}