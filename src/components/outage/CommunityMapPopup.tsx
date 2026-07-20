import type { CommunityStatus } from "@/lib/outage/community.types";
import { timeAgo } from "@/lib/outage/time";

type Props = {
  community: CommunityStatus;
};

export function CommunityMapPopup({ community }: Props) {
  const statusColor =
    community.status === "Power ON"
      ? "text-green-600"
      : community.status === "Power OFF"
        ? "text-red-600"
        : "text-yellow-600";

  return (
    <div className="min-w-[240px] space-y-4">
      <div>
        <h3 className="text-base font-bold leading-tight">⚡ {community.area}</h3>

        <p className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusColor}`}>
          {community.status}
        </p>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Confidence</span>

          <span className="font-medium">{community.confidence}%</span>
        </div>

        <div className="h-2.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{
              width: `${community.confidence}%`,
            }}
          />
        </div>
      </div>

      <div className="text-sm space-y-1">
        <p>
          👥 {community.reports} report
          {community.reports !== 1 ? "s" : ""}
        </p>

        <p>🟢 ON: {community.powerOn}</p>

        <p>🔴 OFF: {community.powerOff}</p>

        <p>🟡 NOT SURE: {community.notSure}</p>
      </div>

      <div className="text-xs text-muted-foreground">Updated {timeAgo(community.lastUpdated)}</div>
    </div>
  );
}
