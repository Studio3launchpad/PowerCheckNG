import { ArrowUpRight } from "lucide-react";

type Props = {
  title: string;
  subtitle: string;
  cost?: number;
  maxLoad?: number;
  recommended?: boolean;
  recommendation?: string;
};

export function BackupOptionCard({
  title,
  subtitle,
  cost,
  maxLoad,
  recommended = false,
  recommendation,
}: Props) {
  return (
    <div
      className={`rounded-2xl border p-4 transition-all duration-200 sm:p-5 ${
        recommended
  ? "border-primary bg-primary/5 ring-1 ring-primary/20"
          : "border-border hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm"
      }`}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-base font-semibold leading-6">
              {title}
            </p>

            {recommended && (
              <span className="rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                ✓ Recommended
              </span>
            )}
          </div>

          <p className="mt-2 text-[13px] leading-6 text-muted-foreground sm:text-sm">
            {subtitle}
          </p>
        </div>

        {(cost || maxLoad) && (
          <div className="sm:text-right">
            {cost && (
              <p className="text-lg font-bold leading-none sm:text-xl">
                ₦{cost.toLocaleString()}
              </p>
            )}

            {maxLoad && (
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Max Load {maxLoad}W
              </p>
            )}
          </div>
        )}
      </div>

      {!recommended && recommendation && (
        <div className="mt-4 flex items-start gap-2 text-[13px] leading-6 text-muted-foreground sm:text-sm">
          <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

          <span>{recommendation}</span>
        </div>
      )}
    </div>
  );
}