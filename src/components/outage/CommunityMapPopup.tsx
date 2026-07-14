import type { CommunityStatus } from "@/lib/community.types";
import { timeAgo } from "@/lib/outage/time";

type Props = {
  community: CommunityStatus;
};

export function CommunityMapPopup({
  community,
}: Props) {
  const statusColor =
    community.status === "Power ON"
      ? "text-green-600"
      : community.status === "Power OFF"
        ? "text-red-600"
        : "text-yellow-600";

  return (
    <div className="space-y-3 min-w-[220px]">
      <div>
        <h3 className="font-bold text-base">
          ⚡ {community.area}
        </h3>

        <p
          className={`text-sm font-semibold ${statusColor}`}
        >
          {community.status}
        </p>
      </div>

      <div>
        <div className="flex justify-between text-xs mb-1">
          <span>Confidence</span>

          <span>
            {community.confidence}%
          </span>
        </div>

        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-primary"
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

        <p>
          🟢 ON: {community.powerOn}
        </p>

        <p>
          🔴 OFF: {community.powerOff}
        </p>

        <p>
          🟡 NOT SURE: {community.notSure}
        </p>
      </div>

      <div className="text-xs text-muted-foreground">
        Updated {timeAgo(community.lastUpdated)}
      </div>
    </div>
  );
}