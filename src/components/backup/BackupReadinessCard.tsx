import { BatteryCharging } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { SectionHeader } from "@/components/common/SectionHeader";

type Props = {
  score: number;
};

export function BackupReadinessCard({ score }: Props) {
  const status =
    score >= 90 ? "Excellent" : score >= 75 ? "Good" : score >= 60 ? "Fair" : "Needs Improvement";

  return (
    <GlassCard>
      <div className="space-y-5">
        <SectionHeader icon={BatteryCharging} title="Backup Readiness" />

        <div className="flex gap-6">
          <p className="text-xl font-bold leading-none sm:text-2xl">{score}%</p>
        <p
          className={`text-lg font-bold leading-6 sm:text-xl ${
            score >= 90
              ? "text-green-500"
              : score >= 75
                ? "text-primary"
                : score >= 60
                  ? "text-yellow-500"
                  : "text-red-500"
          }`}
        >
          {status}
        </p>
        </div>

        <p className="mt-2 text-[13px] leading-6 text-muted-foreground sm:text-sm">
          Overall preparedness for power outages.
        </p>

        <div className="h-3 overflow-hidden rounded-full bg-muted/70">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700"
            style={{
              width: `${score}%`,
            }}
          />
        </div>

      </div>
    </GlassCard>
  );
}
