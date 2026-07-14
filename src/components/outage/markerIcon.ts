import L from "leaflet";
import type { PowerStatus } from "@/lib/outage/outages.types";

export function createMarker(
  status: PowerStatus,
) {
  const markerClass =
    status === "POWER_ON"
      ? "community-marker community-marker-on"
      : status === "POWER_OFF"
        ? "community-marker community-marker-off"
        : "community-marker community-marker-unknown";

  return L.divIcon({
    className: "",
    html: `
      <div class="${markerClass}">
        ⚡
      </div>
    `,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
    popupAnchor: [0, -22],
  });
}