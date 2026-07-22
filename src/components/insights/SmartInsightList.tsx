import { GlassCard } from "@/components/GlassCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import type { InsightSeverity, SmartInsight } from "@/lib/insights/insight.types";
import { Lightbulb } from "lucide-react";

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

const severityConfig: Record<InsightSeverity, SeverityConfig> = {
  POSITIVE: {
    icon: "✓",
    label: "Positive",
    containerClass: "border-green-500/20 bg-green-500/5",
    iconClass: "bg-green-500/15 text-green-500",
    labelClass: "text-green-500",
  },

  INFO: {
    icon: "i",
    label: "Insight",
    containerClass: "border-primary/20 bg-primary/5",
    iconClass: "bg-primary/15 text-primary",
    labelClass: "text-primary",
  },

  WARNING: {
    icon: "!",
    label: "Attention",
    containerClass: "border-yellow-500/20 bg-yellow-500/5",
    iconClass: "bg-yellow-500/15 text-yellow-500",
    labelClass: "text-yellow-500",
  },

  CRITICAL: {
    icon: "!",
    label: "Critical",
    containerClass: "border-red-500/20 bg-red-500/5",
    iconClass: "bg-red-500/15 text-red-500",
    labelClass: "text-red-500",
  },
};

export function SmartInsightList({ insights }: Props) {
  return (
    <GlassCard className="p-4 sm:p-5">
      <SectionHeader
        icon={Lightbulb}
        title="Smart Energy Insights"
        description="Personalized observations generated from your latest energy profile."
      />

      {insights.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-border p-5">
          <p className="text-sm text-muted-foreground">No energy insights are available yet.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {insights.map((insight) => {
            const config = severityConfig[insight.severity];

            return (
              <div
                key={insight.id}
                className={`rounded-2xl border p-4 sm:p-5 transition-all ${config.containerClass}`}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${config.iconClass}`}
                  >
                    {config.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-semibold leading-6">{insight.title}</h3>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${config.labelClass}`}
                      >
                        {config.label}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-[13px] leading-6 text-muted-foreground sm:ml-[52px] sm:mt-3 sm:text-sm lg:text-base">
                  {insight.message}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </GlassCard>
  );
}
