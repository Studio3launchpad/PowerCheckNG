import type { LucideIcon } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { cn } from "@/lib/outage/utils";

interface DashboardMetricProps {
  title: string;
  value: React.ReactNode;
  description: React.ReactNode;
  icon: LucideIcon;
  valueClassName?: string;
}

export function DashboardMetric({
  title,
  value,
  description,
  icon: Icon,
  valueClassName,
}: DashboardMetricProps) {
  return (
    <GlassCard className="h-full p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {title}
        </span>

        <Icon className="size-4 text-primary" />
      </div>

      <p
        className={cn(
          "mt-3 text-2xl font-display font-bold sm:text-3xl",
          valueClassName,
        )}
      >
        {value}
      </p>

      <div className="mt-2 text-xs text-muted-foreground">
        {description}
      </div>
    </GlassCard>
  );
}