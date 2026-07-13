import type { Outage } from "./outages.types";
import {calculateDistance} from "@/lib/outages.utils"

type Location = {
  latitude: number;
  longitude: number;
};

export function calculateCommunityPower(
  location: Location,
  outages: Outage[],
) {

const nearbyReports = outages
    .filter((o: any) => {
      const distance = calculateDistance(
        location.latitude,
        location.longitude,
        o.latitude,
        o.longitude,
      );

      return distance <= 500;
    })
    .sort((a: any, b: any) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());

const reportCount = nearbyReports.length;

const powerOnReports = nearbyReports.filter((o: any) => o.status === "RESTORED").length;

const powerOffReports = nearbyReports.filter(
    (o: any) => o.status === "REPORTED" || o.status === "CONFIRMED",
  ).length;

const majorityStatus = powerOnReports >= powerOffReports ? "Power ON" : "Power OFF";

const confidence =
    reportCount === 0
      ? 0
      : Math.round((Math.max(powerOnReports, powerOffReports) / reportCount) * 100);

const currentStatus = reportCount === 0 ? "Unknown" : majorityStatus;

return {
        nearbyReports,
        reportCount,
        powerOnReports,
        powerOffReports,
        majorityStatus,
        confidence,
        currentStatus,
    }
}