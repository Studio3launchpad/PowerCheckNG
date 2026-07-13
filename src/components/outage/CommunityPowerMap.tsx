import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";

type Outage = {
  id: string;
  area: string;
  discoCode: string;
  status: string;
  latitude: number;
  longitude: number;
};

const marker = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export function CommunityPowerMap({
  outages,
}: {
  outages: Outage[];
}) {

const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) {
  return (
    <div className="h-[420px] md:h-[520px] w-full rounded-xl bg-muted animate-pulse flex items-center justify-center">
      <p className="text-sm text-muted-foreground">
        Loading community map...
      </p>
    </div>
  );
}

  return (
    <MapContainer
      center={[9.082, 8.6753]}
      zoom={6}
      className="h-96 w-full rounded-xl"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {outages.map((o) => (
        <Marker
          key={o.id}
          position={[o.latitude, o.longitude]}
          icon={marker}
        >
          <Popup>
            <strong>{o.area}</strong>

            <br />

            {o.discoCode}

            <br />

            {o.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}