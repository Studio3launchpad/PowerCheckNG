import { Wallet, Info } from "lucide-react";
import { GlassCard } from "@/components/common/GlassCard";
import type {
  BackupRecommendation,
  BackupType,
  GeneratorRecommendation,
} from "@/lib/backup/backupAdvisor";
import { buildBackupDisplayModel } from "@/lib/backup/displayModel";
import { SectionHeader } from "@/components/common/SectionHeader";

type Props = {
  bestTechnology: BackupType;

  inverter: BackupRecommendation;

  generator: GeneratorRecommendation;
};

export function BackupCostBreakdown({ bestTechnology, inverter, generator }: Props) {
  const display = buildBackupDisplayModel(bestTechnology, inverter, generator);

  return (
    <GlassCard>
      <div className="space-y-6">
        <SectionHeader
          icon={Wallet}
          title="Estimated Investment"
          description="An approximate cost for the recommended backup system."
        />

        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Estimated System Cost
          </p>

          <h3 className="mt-2 break-words text-xl font-bold leading-tight text-primary sm:text-2xl">
            ₦{display.cost.toLocaleString()}
          </h3>

          <p className="mt-3 text-[13px] leading-6 text-muted-foreground sm:text-sm">
            This estimate is intended as a planning guide rather than a fixed quotation.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            This estimate typically includes:
          </h3>

          <ul className="mt-3 space-y-3 text-[13px] leading-6 text-muted-foreground sm:text-sm">
            {display.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted/40"
              >

                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

            <div>
              <p className="text-base font-semibold">Final price may vary</p>

              <p className="mt-2 text-[13px] leading-6 text-muted-foreground sm:text-sm">
                {display.note}
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs leading-5 text-muted-foreground">
          PowerCheckNG provides an estimated investment to help with planning. Obtain quotations
          from qualified installers before making a purchase.
        </p>
      </div>
    </GlassCard>
  );
}
