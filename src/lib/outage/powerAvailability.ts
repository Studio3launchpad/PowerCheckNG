import type { Outage } from "@/lib/outage/outages.types";

export type AvailabilityPeriod = {
  key:
    | "overnight"
    | "morning"
    | "afternoon"
    | "evening";

  label: string;
  timeRange: string;

  powerOn: number;
  powerOff: number;

  definiteReports: number;

  availability: number;

  reliabilityScore: number;
};

const periods = [
  {
    key: "overnight",
    label: "Overnight",
    timeRange: "12 AM – 5:59 AM",
    startHour: 0,
    endHour: 5,
  },
  {
    key: "morning",
    label: "Morning",
    timeRange: "6 AM – 11:59 AM",
    startHour: 6,
    endHour: 11,
  },
  {
    key: "afternoon",
    label: "Afternoon",
    timeRange: "12 PM – 5:59 PM",
    startHour: 12,
    endHour: 17,
  },
  {
    key: "evening",
    label: "Evening",
    timeRange: "6 PM – 11:59 PM",
    startHour: 18,
    endHour: 23,
  },
] as const;

export function analyzePowerAvailability(
  outages: Outage[],
): AvailabilityPeriod[] {
  return periods.map((period) => {
    const periodReports = outages.filter(
      (outage) => {
        const reportDate = new Date(
          outage.startedAt,
        );

        if (
          Number.isNaN(reportDate.getTime())
        ) {
          return false;
        }

        const hour = reportDate.getHours();

        return (
          hour >= period.startHour &&
          hour <= period.endHour
        );
      },
    );

    const powerOn = periodReports.filter(
      (outage) =>
        outage.status === "POWER_ON",
    ).length;

    const powerOff = periodReports.filter(
      (outage) =>
        outage.status === "POWER_OFF",
    ).length;

    const definiteReports =
      powerOn + powerOff;

    const availability =
      definiteReports === 0
        ? 0
        : Math.round(
            (powerOn / definiteReports) * 100,
          );

    /*
     * Confidence-aware historical score.
     *
     * Availability is weighted by report volume so
     * one 100% report does not automatically outrank
     * a period supported by many community reports.
     */
    const sampleWeight = Math.min(
      definiteReports / 5,
      1,
    );

    const reliabilityScore = Math.round(
      availability * sampleWeight,
    );

    return {
      key: period.key,
      label: period.label,
      timeRange: period.timeRange,
      powerOn,
      powerOff,
      definiteReports,
      availability,
      reliabilityScore,
    };
  });
}