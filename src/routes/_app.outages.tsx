import { createFileRoute } from "@tanstack/react-router";
import {
  queryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useEffect } from "react";
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
import { PowerAvailabilityInsights } from "@/components/outage/PowerAvailabilityInsights";

const outagesQO = queryOptions({
  queryKey: ["outages"],
  queryFn: () => listOutages(),
  refetchInterval: 60000,
});

export const Route = createFileRoute("/_app/outages")({
  head: () => ({
    meta: [
      {
        title: "Outage Tracker — PowerCheckNG",
      },
    ],
  }),

  loader: ({ context }) =>
    context.queryClient.ensureQueryData(outagesQO),

  component: OutagesPage,
});

function OutagesPage() {
  const {
    data,
    refetch,
    isFetching,
  } = useSuspenseQuery(outagesQO);

  const {
    location,
    showPowerModal,
    setShowPowerModal,
    getCurrentLocation,
  } = useCurrentLocation();

  const reportPower = useOutageReporting();

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const {
    reportCount,
    confidence,
    currentStatus,
  } = calculateCommunityPower(
    location,
    data.outages,
  );

  return (
    <div className="space-y-6 pb-24 lg:pb-6">
      <OutageHeader
        onUpdateLocation={getCurrentLocation}
        onRefresh={refetch}
        isRefreshing={isFetching}
      />

      <GlassCard>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">
              Your Area
            </p>

            <h2 className="text-xl font-bold mt-1">
              {location.area}
            </h2>

            <p className="text-sm text-muted-foreground">
              {location.state}
            </p>
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
              <p className="text-sm font-semibold">
                Confidence: {confidence}%
              </p>

              <p className="text-xs text-muted-foreground">
                {reportCount} nearby community reports
              </p>
            </div>
          </div>
        </div>
      </GlassCard>

      <CommunityStats outages={data.outages} />

      <LiveOutageMap outages={data.outages} />

      <PowerAvailabilityInsights
  outages={data.outages}
  area={location.area}
/>

      <OutageList
        outages={data.outages}
        limit={10}
      />

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

            status:
              status === "OFF"
                ? "POWER_OFF"
                : status === "ON"
                  ? "POWER_ON"
                  : "NOT_SURE",

            description: `Community reported: ${status}`,
          });

          setShowPowerModal(false);
        }}
      />
    </div>
  );
}