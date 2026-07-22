import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: LucideIcon;
};

export function PageHeader({
  title,
  description,
  action,
  icon: Icon,
}: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          {Icon && (
            <Icon className="h-8 w-8 shrink-0 text-primary sm:h-10 sm:w-10" />
          )}

          <h1 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
            {title}
          </h1>
        </div>

        {description && (
          <p className="mt-3 max-w-3xl text-[13px] leading-6 text-muted-foreground sm:text-sm lg:text-base">
            {description}
          </p>
        )}
      </div>

      {action && <div className="w-full lg:w-auto">{action}</div>}
    </header>
  );
}