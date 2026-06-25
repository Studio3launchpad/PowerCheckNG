import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

type Outage = {
  id: string;
  area: string;
  discoCode: string;
  status: string;
  latitude: number;
  longitude: number;
};

const FALLBACK_TOKEN = "pk.placeholder_key_for_testing_only";
const RAW_TOKEN = (import.meta.env.VITE_MAPBOX_TOKEN as string | undefined) ?? FALLBACK_TOKEN;
// Treat the placeholder as "no token" so the map renders its friendly fallback instead of crashing.
const TOKEN = RAW_TOKEN === FALLBACK_TOKEN ? undefined : RAW_TOKEN;

export function OutageMap({ outages }: { outages: Outage[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!TOKEN || !containerRef.current || mapRef.current) return;
    mapboxgl.accessToken = TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [8.6753, 9.082], // Nigeria
      zoom: 5.2,
      attributionControl: false,
    });
    mapRef.current.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
    outages.forEach((o) => {
      if (typeof o.latitude !== "number" || typeof o.longitude !== "number") return;
      const el = document.createElement("div");
      el.className = "outage-marker";
      el.style.cssText =
        "width:14px;height:14px;border-radius:9999px;background:hsl(var(--primary));box-shadow:0 0 0 4px hsl(var(--primary)/0.25),0 0 12px hsl(var(--primary)/0.8);cursor:pointer;";
      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([o.longitude, o.latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 14, closeButton: false }).setHTML(
            `<div style="font-family:inherit"><strong>${o.area}</strong><br/><span style="opacity:.7">${o.discoCode} · ${o.status}</span></div>`,
          ),
        )
        .addTo(map);
      markersRef.current.push(marker);
    });
  }, [outages]);

  if (!TOKEN) {
    return (
      <div className="relative h-72 flex items-center justify-center bg-gradient-to-br from-primary/10 via-transparent to-chart-2/10">
        <p className="text-xs text-muted-foreground text-center px-6">
          Set <code className="text-primary">VITE_MAPBOX_TOKEN</code> in your environment to enable the live outage map.
        </p>
      </div>
    );
  }

  return <div ref={containerRef} className="h-96 w-full" />;
}
