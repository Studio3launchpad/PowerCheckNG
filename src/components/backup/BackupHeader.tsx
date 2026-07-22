import { BatteryCharging } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";

export function BackupHeader() {
  return (
    <header>
      <PageHeader
        icon={BatteryCharging}
        title="Power Backup Advisor"
        description="Based on your Smart Energy Plan, PowerCheckNG review your backup readiness, estimates your backup power requirements,
            and recommends an inverter system, battery configuration, and estimated investment range tailored
            to your household's energy profile."
      />
    </header>
  );
}
