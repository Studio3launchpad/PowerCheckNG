import { GlassCard } from "@/components/GlassCard";
import { Clock, MapPin, ThumbsUp } from "lucide-react";
import { ConfidenceBar } from "@/components/outage/ConfidenceBar";
import { timeAgo } from "@/lib/outages.utils";
import type { Outage } from "@/lib/outages.types";
import { STATUS_STYLES } from "@/lib/outages.constants";

type Props = {
  outage: Outage;
};

export function OutageCard({ outage }: Props) {
  const cardConfidence = Math.min(
    100,
    40 + outage.confirmations * 10
  );

  return (
    <GlassCard>
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold flex items-center gap-1.5">
            <MapPin className="size-4 text-primary" />
            {outage.area}
          </p>

          <p className="text-xs text-muted-foreground mt-0.5">
            {outage.discoCode}
          </p>
        </div>

        <span
          className={`text-[10px] uppercase tracking-wide px-2 py-1 rounded-full border ${
            STATUS_STYLES[outage.status]
          }`}
        >
          {outage.status}
        </span>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-3" />
            {timeAgo(outage.startedAt)}
          </span>

          <span className="flex items-center gap-1">
            <ThumbsUp className="size-3" />
            {outage.confirmations} confirmed
          </span>
        </div>

        <ConfidenceBar confidence={cardConfidence} />
      </div>
    </GlassCard>
  );
}