import { useState } from "react";
import { toast } from "sonner";
import type { UseFormReturn } from "react-hook-form";

type LocationForm = {
  area: string;
  discoCode: string;
  latitude: number;
  longitude: number;
  description?: string;
};

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

        const address = await reverseGeocode(latitude, longitude);

        setLocation({
          latitude,
          longitude,
          state: address.state,
          lga: address.lga,
          area: address.area,
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
