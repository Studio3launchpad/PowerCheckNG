import type { Outage } from "@/lib/outages.types";
import type { CommunityStatus } from "./community.types";

export function buildCommunities(outages: Outage[]): CommunityStatus[] {
  const communities = new Map<string, CommunityStatus>();

  for (const outage of outages) {
    const key = outage.area.trim().toLowerCase();

    if (!communities.has(key)) {
      communities.set(key, {
        area: outage.area,
        state: "",

        latitude: outage.latitude,
        longitude: outage.longitude,

        reports: 0,

        powerOn: 0,
        powerOff: 0,

        confidence: 0,

        status: "Power OFF",

        lastUpdated: outage.startedAt,
      });
    }

    const community = communities.get(key)!;
    community.reports++;

    if (outage.status === "RESTORED") {
      community.powerOn++;
    } else {
      community.powerOff++;
    }

    if (new Date(outage.startedAt) > new Date(community.lastUpdated)) {
      community.lastUpdated = outage.startedAt;
    }
  }

  for (const community of communities.values()) {
    community.status = community.powerOn >= community.powerOff ? "Power ON" : "Power OFF";
  
const majority = Math.max(
  community.powerOn,
  community.powerOff,
);

community.confidence = Math.round(
  (majority / community.reports) * 100,
);

}

  return Array.from(communities.values()).sort(
  (a, b) => b.reports - a.reports,
);
}
