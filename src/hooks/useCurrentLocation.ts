import { useState } from "react";
import { toast } from "sonner";
import { resolveLocation } from "@/lib/geoResolver";


export function useCurrentLocation() {
  const [showPowerModal, setShowPowerModal] = useState(false);

  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    state: "",
    lga: "",
    area: "",
  });

  const reverseGeocode = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
      );

      const data = await response.json();
      console.log("Reverse Geocode Response:", data);

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

setLocation({
  latitude,
  longitude,
  state: resolved?.state ?? address.state,
  lga: resolved?.lga ?? address.lga,
  area: resolved?.area ?? address.area,
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
