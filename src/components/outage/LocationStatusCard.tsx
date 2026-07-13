import { GlassCard } from "@/components/GlassCard";

type Props = {
  location: {
    area: string;
    state: string;
  };

  currentStatus: string;

  confidence: number;

  reportCount: number;
};

export function LocationStatusCard({
  location,
  currentStatus,
  confidence,
  reportCount,
}: Props) {
  return (
    
    <GlassCard>

      <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Your Area</p>

            <h2 className="text-xl font-bold mt-1">{location.area}</h2>

            <p className="text-sm text-muted-foreground">{location.state}</p>
          </div>

          <div className="text-right">
            <p
              className={`font-bold text-lg ${
                currentStatus === "Power ON"
                  ? "text-green-500"
                  : currentStatus === "Power OFF"
                    ? "text-red-500"
                    : "text-yellow-500"
              }`}
            >
              {currentStatus}
            </p>

            <div className="mt-2">
              <p className="text-sm font-semibold">Confidence: {confidence}%</p>

              <p className="text-xs text-muted-foreground">
                {reportCount} nearby community reports
              </p>
            </div>
          </div>
        </div>

    </GlassCard>
  );
}