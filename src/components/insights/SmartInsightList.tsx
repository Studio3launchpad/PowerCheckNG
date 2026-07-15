import { GlassCard } from "@/components/GlassCard";

import type {
  InsightSeverity,
  SmartInsight,
} from "@/lib/insights/insight.types";

type Props = {
  insights: SmartInsight[];
};

type SeverityConfig = {
  icon: string;
  label: string;
  containerClass: string;
  iconClass: string;
  labelClass: string;
};

const severityConfig: Record<
  InsightSeverity,
  SeverityConfig
> = {
  POSITIVE: {
    icon: "✓",
    label: "Positive",
    containerClass:
      "border-green-500/20 bg-green-500/5",
    iconClass:
      "bg-green-500/15 text-green-500",
    labelClass: "text-green-500",
  },

  INFO: {
    icon: "i",
    label: "Insight",
    containerClass:
      "border-primary/20 bg-primary/5",
    iconClass:
      "bg-primary/15 text-primary",
    labelClass: "text-primary",
  },

  WARNING: {
    icon: "!",
    label: "Attention",
    containerClass:
      "border-yellow-500/20 bg-yellow-500/5",
    iconClass:
      "bg-yellow-500/15 text-yellow-500",
    labelClass: "text-yellow-500",
  },

  CRITICAL: {
    icon: "!",
    label: "Critical",
    containerClass:
      "border-red-500/20 bg-red-500/5",
    iconClass:
      "bg-red-500/15 text-red-500",
    labelClass: "text-red-500",
  },
};

export function SmartInsightList({
  insights,
}: Props) {
  return (
    <GlassCard>
      <div>
        <h2 className="text-xl font-semibold">
          Smart Energy Insights
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Personalized observations from your saved
          energy profile.
        </p>
      </div>

      {insights.length === 0 ? (
        <div className="mt-6 rounded-xl border border-border p-5">
          <p className="text-sm text-muted-foreground">
            No energy insights are available yet.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {insights.map((insight) => {
            const config =
              severityConfig[insight.severity];

            return (
              <div
                key={insight.id}
                className={`rounded-xl border p-4 ${config.containerClass}`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${config.iconClass}`}
                  >
                    {config.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">
                        {insight.title}
                      </h3>

                      <span
                        className={`text-xs font-medium ${config.labelClass}`}
                      >
                        {config.label}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {insight.message}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </GlassCard>
  );
}