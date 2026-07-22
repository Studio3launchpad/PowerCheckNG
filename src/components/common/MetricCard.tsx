import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { GlassCard } from "@/components/GlassCard";

type MetricCardProps = {
  title: string;
  value: ReactNode;

  icon?: LucideIcon;

  subtitle?: string;

  footer?: ReactNode;

  badge?: ReactNode;

  action?: ReactNode;

  valueClassName?: string;

  className?: string;

  iconSize?: "sm" | "md";

  compact?: boolean;
};

export function MetricCard({
  title,
  value,
  icon: Icon,
  subtitle,
  footer,
  badge,
  action,
  valueClassName,
  className,
  iconSize = "md",
  compact = false,
}: MetricCardProps) {
  return (
    <GlassCard className={`p-4 sm:p-5 h-full ${className ?? ""}`}>
      <div className={compact ? "space-y-3" : "space-y-4"}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {Icon && (
              <Icon
                className={
                  iconSize === "sm"
                    ? "h-5 w-5 shrink-0 text-primary"
                    : "h-8 w-8 shrink-0 text-primary sm:h-10 sm:w-10"
                }
              />
            )}

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {title}
              </p>

              {badge}
            </div>
          </div>

          {action}
        </div>

        <div>
          <p
            className={`${
              compact
                ? "text-lg font-bold leading-none sm:text-xl"
                : "text-xl font-bold leading-none sm:text-2xl"
            } ${valueClassName ?? ""}`}
          >
            {value}
          </p>

          {subtitle && (
            <p className="mt-2 text-[13px] leading-6 text-muted-foreground sm:text-sm lg:text-base">
              {subtitle}
            </p>
          )}
        </div>

        {footer && <div className="border-t pt-3">{footer}</div>}
      </div>
    </GlassCard>
  );
}
