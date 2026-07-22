import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { GlassCard } from "@/components/GlassCard";
import { LiveOutageMap } from "@/components/outage/LiveOutageMap";
import { PowerStatusModal } from "@/components/outage/PowerStatusModal";
import { OutageHeader } from "@/components/outage/OutageHeader";
import { CommunityStats } from "@/components/outage/CommunityStats";
import { OutageList } from "@/components/outage/OutageList";
import { listOutages } from "@/lib/outage/outages.functions";
import { calculateCommunityPower } from "@/lib/outage/communitypower";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { useOutageReporting } from "@/hooks/useOutageReporting";
import { PowerAvailabilityOutlook } from "@/components/outage/PowerAvailabilityOutlook";

const outagesQO = queryOptions({
  queryKey: ["outages"],
  queryFn: () => listOutages(),
  staleTime: 30_000,
  refetchInterval: 60_000,
});

export const Route = createFileRoute("/_app/outages")({
  head: () => ({
    meta: [
      {
        title: "Outage Tracker — PowerCheckNG",
      },
    ],
  }),

  component: OutagesPage,
});

function OutagesPage() {
  const { data, refetch, isFetching, isPending } = useQuery(outagesQO);

  const outages = data?.outages ?? [];

  const { location, showPowerModal, setShowPowerModal, getCurrentLocation, isLocating } =
    useCurrentLocation();

  const reportPower = useOutageReporting();

  // useEffect(() => {
  //   getCurrentLocation();
  // }, []);

  const { reportCount, confidence, currentStatus } = calculateCommunityPower(location, outages);

  return (
    <div className="space-y-6 px-4 pb-24 sm:px-0 lg:pb-6">
      <OutageHeader
        onUpdateLocation={getCurrentLocation}
        onRefresh={refetch}
        isRefreshing={isFetching}
        isLocating={isLocating}
      />

      {isPending && (
        <div className="rounded-2xl border border-border bg-card/40 px-4 py-3">
          <p className="text-sm text-muted-foreground">Loading community power reports...</p>
        </div>
      )}

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
                {reportCount} recent community {reportCount === 1 ? "report" : "reports"}
              </p>
            </div>
          </div>
        </div>
      </GlassCard>

      {!isPending && (
        <>
          <CommunityStats outages={outages} />

          <LiveOutageMap outages={outages} />

          <PowerAvailabilityOutlook outages={outages} area={location.area} />

          <OutageList outages={outages} limit={10} />

          <div className="flex justify-center pt-2">
            <Link
              to="/history"
              className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              View Full Report History →
            </Link>
          </div>
        </>
      )}

      <PowerStatusModal
        open={showPowerModal}
        area={location.area}
        state={location.state}
        onClose={() => setShowPowerModal(false)}
        onSelect={(status) => {
          reportPower.submit({
            area: location.area,
            discoCode: location.discoCode,
            latitude: location.latitude,
            longitude: location.longitude,

            // Add these two lines
            rawLatitude: location.latitude,
            rawLongitude: location.longitude,

            status: status === "OFF" ? "POWER_OFF" : status === "ON" ? "POWER_ON" : "NOT_SURE",

            description: `Community reported: ${status}`,
          });

          setShowPowerModal(false);
        }}
      />
    </div>
  );
}
