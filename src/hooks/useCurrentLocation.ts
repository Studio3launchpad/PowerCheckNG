import { useState } from "react";
import { toast } from "sonner";
import { resolveLocation } from "@/lib/outage/geoResolver";
import { loadSavedPowerLocation, savePowerLocation } from "@/lib/outage/locationStorage";

export function useCurrentLocation() {
  const [showPowerModal, setShowPowerModal] = useState(false);

  const [isLocating, setIsLocating] = useState(false);

  const [location, setLocation] = useState(() => {
    const savedLocation = loadSavedPowerLocation();

    return (
      savedLocation ?? {
        latitude: 0,
        longitude: 0,
        state: "",
        lga: "",
        area: "",
        discoCode: "UNKNOWN",
      }
    );
  });

  const reverseGeocode = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
      );

      const data = await response.json();

      return {
        state: data.address?.state || "",
        lga: data.address?.county || data.address?.city_district || "",
        area:
          data.address?.suburb ||
          data.address?.neighbourhood ||
          data.address?.village ||
          data.address?.town ||
          data.address?.city ||
          "Unknown Area",
      };
    } catch (error) {
      console.error(error);

      return {
        state: "",
        lga: "",
        area: "Unknown Area",
      };
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported.");
      return;
    }

    if (isLocating) {
      return;
    }

    setIsLocating(true);

    const locationToast = toast.loading("Getting your current location...");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          console.log("Current Coordinates:", latitude, longitude);

          const resolved = resolveLocation(latitude, longitude);

          console.log("Resolved Location:", resolved);

          if (resolved) {
  const nextLocation = {
    latitude,
    longitude,
    state: resolved.state,
    lga: resolved.lga,
    area: resolved.area,
    discoCode: resolved.discoCode,
  };

  setLocation(nextLocation);
  savePowerLocation(nextLocation);

  toast.dismiss(locationToast);

  setShowPowerModal(true);

  return;
}

          const address = await reverseGeocode(latitude, longitude);

          const fallbackLocation = {
            latitude,
            longitude,
            state: address.state,
            lga: address.lga,
            area: address.area,
            discoCode: "UNKNOWN",
          };

          setLocation(fallbackLocation);
          savePowerLocation(fallbackLocation);

          toast.dismiss(locationToast);

          setShowPowerModal(true);
        } catch (error) {
          console.error("Location resolution error:", error);

          toast.error("Unable to resolve your current location.", {
            id: locationToast,
          });
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);

        setIsLocating(false);

        const message =
          error.code === error.PERMISSION_DENIED
            ? "Location permission was denied."
            : error.code === error.POSITION_UNAVAILABLE
              ? "Your location is currently unavailable."
              : error.code === error.TIMEOUT
                ? "Location request timed out. Please try again."
                : "Unable to retrieve your location.";

        toast.error(message, {
          id: locationToast,
        });
      },
      {
        enableHighAccuracy: false,
        timeout: 15_000,
        maximumAge: 5 * 60 * 1000,
      },
    );
  };

  return {
    location,
    setLocation,
    showPowerModal,
    setShowPowerModal,
    getCurrentLocation,
    isLocating,
  };
}
