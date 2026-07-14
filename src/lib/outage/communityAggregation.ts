import type { Outage } from "@/lib/outage/outages.types";
import type { CommunityStatus } from "./community.types";

export function buildCommunities(
  outages: Outage[],
): CommunityStatus[] {
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
        notSure: 0,

        confidence: 0,

        status: "Needs Confirmation",

        lastUpdated: outage.startedAt,
      });
    }

    const community = communities.get(key)!;

    community.reports++;

    if (outage.status === "POWER_ON") {
      community.powerOn++;
    }

    if (outage.status === "POWER_OFF") {
      community.powerOff++;
    }

    if (outage.status === "NOT_SURE") {
      community.notSure++;
    }

    if (
      new Date(outage.startedAt).getTime() >
      new Date(community.lastUpdated).getTime()
    ) {
      community.lastUpdated = outage.startedAt;
    }
  }

  for (const community of communities.values()) {
    const definiteReports =
      community.powerOn + community.powerOff;

    if (
      definiteReports === 0 ||
      community.powerOn === community.powerOff
    ) {
      community.status = "Needs Confirmation";
    } else if (community.powerOn > community.powerOff) {
      community.status = "Power ON";
    } else {
      community.status = "Power OFF";
    }

    const majority = Math.max(
      community.powerOn,
      community.powerOff,
    );

    community.confidence =
      definiteReports > 0
        ? Math.round(
            (majority / definiteReports) * 100,
          )
        : 0;
  }

  return Array.from(communities.values()).sort(
    (a, b) => b.reports - a.reports,
  );
}