import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { createMarker } from "@/components/outage/markerIcon";
import { buildCommunities } from "@/lib/communityAggregation";
import type { Outage } from "@/lib/outages.types";
import { CommunityMapPopup } from "@/components/outage/CommunityMapPopUp";

function FitBounds({ outages }: { outages: Outage[] }) {
  const map = useMap();

  useEffect(() => {
    if (outages.length === 0) return;

    const validOutages = outages.filter(
      (o) =>
        typeof o.latitude === "number" &&
        typeof o.longitude === "number" &&
        !Number.isNaN(o.latitude) &&
        !Number.isNaN(o.longitude)
    );

    if (validOutages.length === 0) return;

    if (validOutages.length === 1) {
      map.setView(
        [validOutages[0].latitude, validOutages[0].longitude],
        13,
        { animate: true }
      );
      return;
    }

    const bounds = L.latLngBounds(
      validOutages.map((o) => [o.latitude, o.longitude] as [number, number])
    );

    map.fitBounds(bounds, {
      padding: [40, 40],
      animate: true,
    });
  }, [map, outages]);

  return null;
}

export function CommunityPowerMap({ outages }: { outages: Outage[] }) {
  const [mounted, setMounted] = useState(false);

  const communities = buildCommunities(outages);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[420px] md:h-[520px] w-full rounded-xl bg-muted animate-pulse flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading community map...</p>
      </div>
    );
  }

  console.log("Outages received:", outages);

  return (
    <MapContainer center={[9.082, 8.6753]} zoom={6} className="h-96 w-full rounded-xl z-0">
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FitBounds outages={outages} />

      <>
  {communities.map((community) => (
    <Marker
      key={community.area}
      position={[
  community.latitude,
  community.longitude,
]}
      icon={createMarker(
  community.status === "Power ON"
    ? "RESTORED"
    : "CONFIRMED"
)}
    >
      
        <Popup>
   <CommunityMapPopup community={community} />
</Popup>
    </Marker>
  ))}
</>
    </MapContainer>
  );
}
