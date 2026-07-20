import type { Outage } from "@/lib/outage/outages.types";
import type { CommunityStatus } from "./community.types";
import { CURRENT_POWER_WINDOW_MS } from "@/lib/outage/outages.constants";
import { resolveLocation } from "@/lib/outage/geoResolver";

export function buildCommunities(
  outages: Outage[],
): CommunityStatus[] {
  const communities = new Map<
    string,
    CommunityStatus
  >();

  const recentOutages = outages.filter(
    (outage) => {
      const reportTime = new Date(
        outage.startedAt,
      ).getTime();

      if (Number.isNaN(reportTime)) {
        return false;
      }

      const reportAge =
        Date.now() - reportTime;

      return (
        reportAge >= 0 &&
        reportAge <= CURRENT_POWER_WINDOW_MS
      );
    },
  );

  for (const outage of recentOutages) {
    const resolvedLocation = resolveLocation(
      outage.latitude,
      outage.longitude,
    );

    const canonicalArea =
      resolvedLocation?.area ?? outage.area;

    const canonicalState =
      resolvedLocation?.state ?? "";

    const canonicalLatitude =
  resolvedLocation?.communityLatitude ??
  outage.latitude;

const canonicalLongitude =
  resolvedLocation?.communityLongitude ??
  outage.longitude;

    const key = `${canonicalState}:${canonicalArea}`
  .trim()
  .toLowerCase();

    if (!communities.has(key)) {
      communities.set(key, {
        area: canonicalArea,
        state: canonicalState,

        latitude: canonicalLatitude,
        longitude: canonicalLongitude,

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
      new Date(
        community.lastUpdated,
      ).getTime()
    ) {
      community.lastUpdated =
        outage.startedAt;
    }
  }

  for (const community of communities.values()) {
    const definiteReports =
      community.powerOn +
      community.powerOff;

    if (
      definiteReports === 0 ||
      community.powerOn ===
        community.powerOff
    ) {
      community.status =
        "Needs Confirmation";
    } else if (
      community.powerOn >
      community.powerOff
    ) {
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
            (majority /
              definiteReports) *
              100,
          )
        : 0;
  }

  return Array.from(
    communities.values(),
  ).sort(
    (a, b) =>
      b.reports - a.reports,
  );
}