import { BatteryCharging } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";

type Props = {
  score: number;
};

export function BackupReadinessCard({
  score,
}: Props) {
  const status =
    score >= 90
      ? "Excellent"
      : score >= 75
        ? "Good"
        : score >= 60
          ? "Fair"
          : "Needs Improvement";

  return (
    <GlassCard>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-primary">
              Backup Readiness
            </p>

            <h2 className="mt-1 text-4xl font-bold">
              {score}%
            </h2>
          </div>

          <BatteryCharging className="h-10 w-10 text-primary" />
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700"
            style={{
              width: `${score}%`,
            }}
          />
        </div>

        <p className="text-sm text-muted-foreground">
          {status}
        </p>
      </div>
    </GlassCard>
  );
}