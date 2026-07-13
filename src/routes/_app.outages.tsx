import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { GlassCard } from "@/components/GlassCard";
import { LiveOutageMap } from "@/components/outage/LiveOutageMap";
import { listOutages, reportOutage } from "@/lib/outages.functions";
import { PowerStatusModal } from "@/components/outage/PowerStatusModal";
import { OutageHeader } from "@/components/outage/OutageHeader";
import { CommunityStats } from "@/components/outage/CommunityStats";
import { OutageList } from "@/components/outage/OutageList";
import { calculateCommunityPower } from "@/lib/communitypower";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { FormSchema } from "@/lib/outages.schema";
import type { FormValues } from "@/lib/outages.schema";
import { useOutageReporting } from "@/hooks/useOutageReporting";

const outagesQO = queryOptions({
  queryKey: ["outages"],
  queryFn: () => listOutages(),
  refetchInterval: 60000,
});

export const Route = createFileRoute("/_app/outages")({
  head: () => ({ meta: [{ title: "Outage Tracker — PowerCheckNG" }] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(outagesQO),
  component: OutagesPage,
});

function OutagesPage() {
  const { data } = useSuspenseQuery(outagesQO);
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { area: "", discoCode: "IKEDC", latitude: 6.5, longitude: 3.35 },
  });

  const { location, setLocation, showPowerModal, setShowPowerModal, getCurrentLocation } =
    useCurrentLocation();

  const router = useRouter();
  const queryClient = useQueryClient();
  const submitFn = useServerFn(reportOutage);

  const reportPower = useOutageReporting({
    onSuccess: () => {
      setOpen(false);
      form.reset();
    },
  });

  const [powerStatus, setPowerStatus] = useState<"ON" | "OFF" | "NOT_SURE">("NOT_SURE");

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const {
    nearbyReports,
    reportCount,
    powerOnReports,
    powerOffReports,
    majorityStatus,
    confidence,
    currentStatus,
  } = calculateCommunityPower(location, data.outages);

  useEffect(() => {
    if (!location.area) return;

    form.setValue("latitude", location.latitude);
    form.setValue("longitude", location.longitude);
    form.setValue("area", location.area);
  }, [location, form]);

  return (
    <div className="space-y-6 pb-24 lg:pb-6">
      <OutageHeader
        onUpdateLocation={getCurrentLocation}
        onRefresh={() =>
          queryClient.invalidateQueries({
            queryKey: ["outages"],
          })
        }
      />
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

      <CommunityStats outages={data.outages} />

      {/* Live map */}
      <LiveOutageMap outages={data.outages} />

      <OutageList outages={data.outages} />

      <PowerStatusModal
        open={showPowerModal}
        area={location.area}
        state={location.state}
        onClose={() => setShowPowerModal(false)}
        onSelect={(status) => {
          setPowerStatus(status);

          reportPower.submit({
            area: location.area,
            discoCode: "AEDC",
            latitude: location.latitude,
            longitude: location.longitude,
            description: `Community reported: ${status}`,
          });

          setShowPowerModal(false);
        }}
      />
    </div>
  );
}
