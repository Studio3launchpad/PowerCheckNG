import type { Outage } from "./outages.types";
import { calculateDistance } from "@/lib/outage/outages.utils";
import { CURRENT_POWER_WINDOW_MS } from "@/lib/outage/outages.constants";

type Location = {
  latitude: number;
  longitude: number;
};

export function calculateCommunityPower(
  location: Location,
  outages: Outage[],
) {
  const nearbyReports = outages
  .filter((outage) => {
    const distance = calculateDistance(
      location.latitude,
      location.longitude,
      outage.latitude,
      outage.longitude,
    );

    const reportAge =
      Date.now() -
      new Date(outage.startedAt).getTime();

    const isRecent =
      reportAge <= CURRENT_POWER_WINDOW_MS;

    return distance <= 500 && isRecent;
  })
    .sort(
      (a, b) =>
        new Date(b.startedAt).getTime() -
        new Date(a.startedAt).getTime(),
    );

  const reportCount = nearbyReports.length;

  const powerOnReports = nearbyReports.filter(
    (outage) => outage.status === "POWER_ON",
  ).length;

  const powerOffReports = nearbyReports.filter(
    (outage) => outage.status === "POWER_OFF",
  ).length;

  const notSureReports = nearbyReports.filter(
    (outage) => outage.status === "NOT_SURE",
  ).length;

  const definiteReportCount =
    powerOnReports + powerOffReports;

  let majorityStatus:
    | "Power ON"
    | "Power OFF"
    | "Needs Confirmation";

  if (
    definiteReportCount === 0 ||
    powerOnReports === powerOffReports
  ) {
    majorityStatus = "Needs Confirmation";
  } else if (powerOnReports > powerOffReports) {
    majorityStatus = "Power ON";
  } else {
    majorityStatus = "Power OFF";
  }

  const majority = Math.max(
    powerOnReports,
    powerOffReports,
  );

  const confidence =
    definiteReportCount === 0
      ? 0
      : Math.round(
          (majority / definiteReportCount) * 100,
        );

  const currentStatus =
  reportCount === 0
    ? "Unknown"
    : definiteReportCount === 0
      ? "Needs Confirmation"
      : majorityStatus;

  return {
    nearbyReports,
    reportCount,
    powerOnReports,
    powerOffReports,
    notSureReports,
    majorityStatus,
    confidence,
    currentStatus,
  };
}