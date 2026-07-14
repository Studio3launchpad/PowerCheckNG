import { useState } from "react";
import { toast } from "sonner";
import { resolveLocation } from "@/lib/outage/geoResolver";


export function useCurrentLocation() {
  const [showPowerModal, setShowPowerModal] = useState(false);

  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    state: "",
    lga: "",
    area: "",
    discoCode: "UNKNOWN",
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

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Current Coordinates:", latitude, longitude);

        const address = await reverseGeocode(latitude, longitude);

        // Use our own resolver first
        const resolved = resolveLocation(latitude, longitude);

        console.log("Resolved Location:", resolved);

        setLocation({
          latitude,
          longitude,
          state: resolved?.state ?? address.state,
          lga: resolved?.lga ?? address.lga,
          area: resolved?.area ?? address.area,
          discoCode: resolved?.discoCode ?? "UNKNOWN",
        });

        setShowPowerModal(true);
      },
      () => {
        toast.error("Unable to retrieve your location.");
      },
    );
  };

  return {
    location,
    setLocation,
    showPowerModal,
    setShowPowerModal,
    getCurrentLocation,
  };
}
