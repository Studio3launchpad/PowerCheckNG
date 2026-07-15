import type { Outage } from "@/lib/outage/outages.types";
import { resolveLocation } from "@/lib/outage/geoResolver";

export function getCanonicalArea(
  outage: Outage,
): string {
  const resolved = resolveLocation(
    outage.latitude,
    outage.longitude,
  );

  return resolved?.area ?? outage.area;
}