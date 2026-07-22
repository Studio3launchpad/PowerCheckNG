import { GlassCard } from "@/components/common/GlassCard";

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

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Your Area</p>

            <h2 className="mt-1 text-2xl font-bold leading-tight sm:text-3xl">{location.area}</h2>

            <p className="mt-1 text-sm text-muted-foreground">{location.state}</p>
          </div>

          <div className="text-left sm:text-right">
            <p
  className={`text-xl font-bold sm:text-2xl ${
                currentStatus === "Power ON"
                  ? "text-green-500"
                  : currentStatus === "Power OFF"
                    ? "text-red-500"
                    : "text-yellow-500"
              }`}
            >
              {currentStatus}
            </p>

            <div className="mt-3 space-y-1">
              <p className="text-sm font-medium">Confidence: {confidence}%</p>

              <p className="text-xs leading-5 text-muted-foreground">
                {reportCount} nearby community reports
              </p>
            </div>
          </div>
        </div>

    </GlassCard>
  );
}