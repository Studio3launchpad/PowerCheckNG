import { KNOWN_AREAS } from "@/lib/outage/knownAreas";
import { calculateDistance } from "./outages.utils";

const LOCATION_TOLERANCE_KM = 2;


export function resolveLocation(
  latitude: number,
  longitude: number,
) {
  const matchedAreas = KNOWN_AREAS
    .map((area) => {
      const distanceMetres = calculateDistance(
        latitude,
        longitude,
        area.latitude,
        area.longitude,
      );

      return {
        area,
        distanceKm: distanceMetres / 1000,
      };
    })
    .filter(({ area, distanceKm }) => {
      const allowedRadius =
        area.radiusKm +
        LOCATION_TOLERANCE_KM;

      return distanceKm <= allowedRadius;
    })
    .sort(
      (a, b) =>
        a.distanceKm - b.distanceKm,
    );

  const closestMatch = matchedAreas[0];

  if (!closestMatch) {
    return null;
  }

  const matchedArea = closestMatch.area;

  return {
  area: matchedArea.area,
  state: matchedArea.state,
  lga: "",
  discoCode: matchedArea.discoCode,
};
}