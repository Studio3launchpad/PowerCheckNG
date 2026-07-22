import { MetricCard } from "@/components/common/MetricCard";
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

export function BackupSummary({ bestTechnology, inverter, generator }: Props) {
  const display = buildBackupDisplayModel(bestTechnology, inverter, generator);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard title="Recommended System" value={display.system} valueClassName="mt-3" />

      <MetricCard title="Estimated Backup" value={display.runtime} valueClassName="mt-3"/>

      <MetricCard title="Estimated Cost" value={`₦${display.cost.toLocaleString()}`} valueClassName="mt-3"/>

      <MetricCard
        title="Estimated Capacity"
        value={`${display.capacity}W`}
        valueClassName="text-primary mt-3"
      />
    </div>
  );
}
