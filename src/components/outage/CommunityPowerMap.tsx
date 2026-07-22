import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { createMarker } from "@/components/outage/markerIcon";
import { buildCommunities } from "@/lib/outage/communityAggregation";
import type { Outage } from "@/lib/outage/outages.types";
import { CommunityMapPopup } from "@/components/outage/CommunityMapPopup";
import { useMemo } from "react";



function FitBounds({
  communities,
}: {
  communities: ReturnType<typeof buildCommunities>;
}) {
  const map = useMap();

  useEffect(() => {
    if (communities.length === 0) return;

const validCommunities = communities.filter(
  (c) =>
    typeof c.latitude === "number" &&
    typeof c.longitude === "number" &&
    !Number.isNaN(c.latitude) &&
    !Number.isNaN(c.longitude),
);

    if (validCommunities.length === 0) {
  return;
}

   if (validCommunities.length === 1) {
  map.setView(
    [
      validCommunities[0].latitude,
      validCommunities[0].longitude,
    ],
    13,
    { animate: true },
  );
  return;
}

   const bounds = L.latLngBounds(
  validCommunities.map(
    (c) =>
      [c.latitude, c.longitude] as [
        number,
        number,
      ],
  ),
);

    map.fitBounds(bounds, {
      padding: [40, 40],
      animate: true,
    });
  }, [map, communities]);

  return null;
}

export function CommunityPowerMap({ outages }: { outages: Outage[] }) {
  const [mounted, setMounted] = useState(false);

  const communities = useMemo(
  () => buildCommunities(outages),
  [outages],
);

  

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-[320px] w-full items-center justify-center rounded-2xl bg-muted animate-pulse sm:h-[420px] lg:h-[520px]">
        <p className="text-sm text-muted-foreground">Loading community map...</p>
      </div>
    );
  }



  return (
    <div className="relative z-0 overflow-hidden rounded-2xl">
    <MapContainer
      center={[9.082, 8.6753]}
      zoom={6}
      className="h-[280px] sm:h-[380px] lg:h-[520px] w-full z-0">
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FitBounds communities={communities} />

      <>
        {communities.map((community) => (
          <Marker
            key={`${community.state}-${community.area}`}
            position={[community.latitude, community.longitude]}
            icon={createMarker(
              community.status === "Power ON"
                ? "POWER_ON"
                : community.status === "Power OFF"
                  ? "POWER_OFF"
                  : "NOT_SURE",
            )}
          >
            <Popup>
              <CommunityMapPopup community={community} />
            </Popup>
          </Marker>
        ))}
      </>
    </MapContainer>
     </div>
  );
}
