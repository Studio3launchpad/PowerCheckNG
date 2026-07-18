import { Wallet, Info } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import type {
  BackupRecommendation,
  BackupType,
  GeneratorRecommendation,
} from "@/lib/backup/backupAdvisor";
import { buildBackupDisplayModel } from "@/lib/backup/displayModel";

type Props = {
  bestTechnology: BackupType;

  inverter: BackupRecommendation;

  generator: GeneratorRecommendation;
};

export function BackupCostBreakdown({
  bestTechnology,
  inverter,
  generator,
}: Props) {

const display = buildBackupDisplayModel(
  bestTechnology,
  inverter,
  generator,
);

  return (
    <GlassCard>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Wallet className="h-7 w-7 text-primary" />

          <div>
            <h2 className="text-xl font-bold">
              Estimated Investment
            </h2>

            <p className="text-sm text-muted-foreground">
              An approximate cost for the recommended backup system.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-sm text-muted-foreground">
            Estimated System Cost
          </p>

          <h3 className="mt-2 text-3xl font-bold text-primary">
            ₦{display.cost.toLocaleString()}
          </h3>

          <p className="mt-3 text-sm text-muted-foreground">
            This estimate is intended as a planning guide rather than a fixed quotation.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">
            This estimate typically includes:
          </h3>

          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
  {display.items.map((item) => (
    <li key={item}>{item}</li>
  ))}
</ul>
        </div>

        <div className="rounded-xl border border-border p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 text-primary shrink-0" />

            <div>
              <p className="font-medium">
                Final price may vary
              </p>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
  {display.note}
</p>
            </div>
          </div>
        </div>

        <p className="text-xs leading-5 text-muted-foreground">
          PowerCheckNG provides an estimated investment to help with planning.
          Obtain quotations from qualified installers before making a purchase.
        </p>
      </div>
    </GlassCard>
  );
}