import { ArrowUpRight } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import {
  BACKUP_SYSTEMS,
  GENERATOR_SYSTEMS,
  type BackupRecommendation,
  type BackupType,
  type GeneratorRecommendation,
} from "@/lib/backup/backupAdvisor";

type Props = {
  bestTechnology: BackupType;
  inverter: BackupRecommendation;
  generator: GeneratorRecommendation;
};

export function AlternativeBackupOptions({
  bestTechnology,
  inverter,
  generator,
}: Props) {
  return (
    <GlassCard>
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold">
            Alternative Backup Solutions
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Explore alternative backup solutions for different power needs and
            budgets.
          </p>
        </div>

        {/* ===================== INVERTERS ===================== */}

        <section className="space-y-3">
          <h3 className="text-lg font-semibold">Inverters</h3>

          {BACKUP_SYSTEMS.map((system) => {
            const recommended =
              bestTechnology !== "GENERATOR" &&
              system.inverter === inverter.inverter;

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
        </section>

        {/* ===================== GENERATORS ===================== */}

        <section className="space-y-3">
          <h3 className="text-lg font-semibold">Generators</h3>

          {GENERATOR_SYSTEMS.map((system) => {
            const recommended =
              bestTechnology === "GENERATOR" &&
              system.name === generator.name;

            return (
              <div
                key={system.name}
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
                        {system.name}
                      </p>

                      {recommended && (
                        <span className="rounded-full bg-primary px-2 py-1 text-[10px] font-medium text-primary-foreground">
                          Recommended
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Fuel: {system.fuelCost}
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
                    Suitable for longer outages and heavier electrical loads.
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {/* ===================== HYBRID ===================== */}

        <section className="space-y-3">
          <h3 className="text-lg font-semibold">
            Hybrid Backup System
          </h3>

          <div
            className={`rounded-xl border p-4 ${
              bestTechnology === "HYBRID"
                ? "border-primary bg-primary/5"
                : "border-border"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">
                    Inverter + Generator
                  </p>

                  {bestTechnology === "HYBRID" && (
                    <span className="rounded-full bg-primary px-2 py-1 text-[10px] font-medium text-primary-foreground">
                      Recommended
                    </span>
                  )}
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  Combines an inverter for efficient daily backup with a
                  generator for extended outages and higher electrical demand.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </GlassCard>
  );
}