export type SavedPowerLocation = {
  latitude: number;
  longitude: number;
  state: string;
  lga: string;
  area: string;
  discoCode: string;
};

const LOCATION_STORAGE_KEY =
  "powercheckng:last-location";

export function loadSavedPowerLocation():
  | SavedPowerLocation
  | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const saved = window.localStorage.getItem(
      LOCATION_STORAGE_KEY,
    );

    if (!saved) {
      return null;
    }

    return JSON.parse(
      saved,
    ) as SavedPowerLocation;
  } catch {
    return null;
  }
}

export function savePowerLocation(
  location: SavedPowerLocation,
) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      LOCATION_STORAGE_KEY,
      JSON.stringify(location),
    );
  } catch {
    // Location persistence should not block outage reporting.
  }
}