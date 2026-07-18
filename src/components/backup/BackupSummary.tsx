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

export function BackupSummary({
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
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <GlassCard>
        <p className="text-sm text-muted-foreground">
          Recommended System
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          {display.system}
        </h2>
      </GlassCard>

      <GlassCard>
        <p className="text-sm text-muted-foreground">
          Estimated Backup
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          {display.runtime}
        </h2>
      </GlassCard>

      <GlassCard>
        <p className="text-sm text-muted-foreground">
          Estimated Cost
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          ₦{display.cost.toLocaleString()}
        </h2>
      </GlassCard>

      <GlassCard>
        <p className="text-sm text-muted-foreground">
          Estimated Capacity
        </p>

        <h2 className="mt-2 text-2xl font-bold text-primary">
          {display.capacity}W
        </h2>
      </GlassCard>
    </div>
  );
}