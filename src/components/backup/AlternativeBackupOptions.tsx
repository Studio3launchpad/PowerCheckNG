import { ArrowUpRight } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import {
  BACKUP_SYSTEMS,
  type BackupRecommendation,
} from "@/lib/backup/backupAdvisor";

type Props = {
  recommendation: BackupRecommendation;
};


export function AlternativeBackupOptions({
  recommendation,
}: Props) {
  return (
    <GlassCard>
      <div className="space-y-5">

        <div>
          <h2 className="text-xl font-bold">
            Other Backup Options
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Compare nearby inverter sizes before making a decision.
          </p>
        </div>

        <div className="space-y-3">

          {BACKUP_SYSTEMS.map((system) => {

            const recommended =
              system.inverter ===
              recommendation.inverter;

            return (
              <div
                key={system.inverter}
                className={`rounded-xl border p-4 transition ${
                  recommended
                    ? "border-primary bg-primary/5"
                    : "border-border"
                }`}
              >
                <div className="flex items-center justify-between">

                  <div>

                    <div className="flex items-center gap-2">

                      <p className="font-semibold">
                        {system.inverter}
                      </p>

                      {recommended && (
                        <span className="rounded-full bg-primary px-2 py-1 text-[10px] font-medium text-primary-foreground">
                          Recommended
                        </span>
                      )}

                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Battery: {system.battery}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="font-semibold">
                      ₦{system.estimatedCost.toLocaleString()}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Max Load {system.maxLoad}W
                    </p>

                  </div>

                </div>

                {!recommended && (
                  <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">

                    <ArrowUpRight className="h-3 w-3" />

                    {system.maxLoad <= 500
  ? "Ideal for lighting, fans and basic entertainment."
  : system.maxLoad <= 1000
  ? "Suitable for small homes and essential appliances."
  : system.maxLoad <= 1800
  ? "Recommended for medium households with moderate power demand."
  : "Designed for larger homes with higher backup requirements."}

                  </div>
                )}

              </div>
            );
          })}

        </div>

      </div>
    </GlassCard>
  );
}