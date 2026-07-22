import { GlassCard } from "@/components/common/GlassCard";
import { Clock, MapPin, ThumbsUp } from "lucide-react";
import { ConfidenceBar } from "@/components/outage/ConfidenceBar";
import { timeAgo } from "@/lib/outage/outages.utils";
import type { Outage } from "@/lib/outage/outages.types";
import { STATUS_STYLES } from "@/lib/outage/outages.constants";

type Props = {
  outage: Outage;
};

export function OutageCard({ outage }: Props) {
  const cardConfidence = Math.min(
    100,
    40 + outage.confirmations * 10
  );

  return (
    <GlassCard className="p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="flex items-center gap-2 break-words font-semibold">
            <MapPin className="size-4 shrink-0 text-primary" />
            {outage.area}
          </p>

          <p className="text-xs text-muted-foreground mt-0.5">
            {outage.discoCode}
          </p>
        </div>

        <span
          className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-xs font-medium uppercase tracking-wide ${STATUS_STYLES[outage.status]}`}
        >
          {outage.status.replace("_", " ")}
        </span>
      </div>

      <div className="mt-4 space-y-3 border-t border-border pt-4">
        <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
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