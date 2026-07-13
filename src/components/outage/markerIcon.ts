import L from "leaflet";

export function createMarker(status: string) {
  const color =
    status === "RESTORED"
      ? "#22c55e" // green
      : status === "CONFIRMED"
      ? "#ef4444" // red
      : status === "REPORTED"
      ? "#f59e0b" // amber
      : "#6b7280"; // gray

  return L.divIcon({
    className: "",
    html: `
      <div
        style="
          width:32px;
          height:32px;
          border-radius:50%;
          background:${color};
          display:flex;
          align-items:center;
          justify-content:center;
          color:white;
          font-size:18px;
          font-weight:bold;
          box-shadow:0 0 12px ${color};
          border:2px solid white;
        "
      >
        ⚡
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}