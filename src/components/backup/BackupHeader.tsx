import { BatteryCharging } from "lucide-react";

export function BackupHeader() {
  return (
    <header>
      <div className="flex gap-3">
        <BatteryCharging className="size-8 text-primary mt-3" />

        <div>
          <h1 className="text-3xl font-bold font-display">Power Backup Advisor</h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            Based on your Smart Energy Plan, PowerCheckNG estimates your backup power requirements
            and recommends an inverter system, battery configuration, and investment range tailored
            to your household's energy profile.
          </p>

          <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-4">
            <p className="text-sm leading-6">
              Review your backup readiness, recommended inverter size, estimated investment, and
              whether your selected appliances can be powered during an outage.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
