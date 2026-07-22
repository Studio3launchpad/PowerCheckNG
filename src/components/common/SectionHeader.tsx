import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type SectionHeaderProps = {
  title: string;
  description?: string;
  icon?: LucideIcon;
  badge?: string;
  action?: ReactNode;
  className?: string;
};

export function SectionHeader({
  title,
  description,
  icon: Icon,
  badge,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={`flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between ${className ?? ""}`}
    >
      <div className="space-y-2">
        {badge && (
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            {badge}
          </p>
        )}

        <div className="flex items-center gap-3">
          {Icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-background/40">
              <Icon className="h-5 w-5 text-primary" />
            </div>
          )}

          <h2 className="text-xl font-bold leading-tight sm:text-2xl">
            {title}
          </h2>
        </div>

        {description && (
          <p className="max-w-3xl text-[13px] leading-6 text-muted-foreground sm:text-sm lg:text-base">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className="w-full sm:w-auto">
          {action}
        </div>
      )}
    </div>
  );
}