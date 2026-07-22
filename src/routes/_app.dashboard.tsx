import { createFileRoute } from "@tanstack/react-router";
import { GlassCard } from "@/components/GlassCard";
import { Link } from "@tanstack/react-router";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { buildBackupAdvisor } from "@/lib/backup/backupAdvisor";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { calculateCommunityPower } from "@/lib/outage/communitypower";
import { listOutages } from "@/lib/outage/outages.functions";
import { CommunityPowerCard } from "@/components/dashboard/CommunityPowerCard";
import { EnergyProfileCard } from "@/components/dashboard/EnergyProfileCard";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { DashboardTools } from "@/components/dashboard/DashboardTools";
import { RecommendationCard } from "@/components/dashboard/RecommendationCard";
import { loadEnergyAnalysis, loadSavedBudget } from "@/lib/energy/energyStorage";
import { PageHeader } from "@/components/common/PageHeader";
import { LayoutDashboard } from "lucide-react";

const outagesQO = queryOptions({
  queryKey: ["outages"],
  queryFn: () => listOutages(),
  staleTime: 30_000,
  refetchInterval: 60_000,
});

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — PowerCheckNG" }] }),
  component: Dashboard,
});

function Dashboard() {
  const analysis = loadEnergyAnalysis();

  const { data, isPending } = useQuery(outagesQO);

  const outages = data?.outages ?? [];

  const { location } = useCurrentLocation();

  const { reportCount, confidence, currentStatus } = calculateCommunityPower(location, outages);

  const budget = Number(loadSavedBudget() ?? 0);

  const hasEnergyProfile = analysis !== null;

  const advisor = analysis ? buildBackupAdvisor(analysis) : null;

  if (!hasEnergyProfile) {
    return (
      <div className="space-y-6 px-4 pb-24 sm:px-0 lg:pb-6">
        <PageHeader
          icon={LayoutDashboard}
          title="Dashboard"
          description="Start by creating your Smart Energy Plan to unlock your personalised dashboard."
        />

        <GlassCard className="p-5 text-center sm:p-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-xl sm:h-14 sm:w-14 sm:text-2xl">
            ⚡
          </div>

          <h2 className="mt-5 text-lg font-semibold sm:text-xl">No Energy Profile Yet</h2>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Build your Smart Energy Plan to see your energy summary, recommendations, backup
            solution and community power information.
          </p>

          <Link
            to="/energy"
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 sm:w-auto sm:px-5"
          >
            Build Your Energy Plan
          </Link>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 pb-24 sm:px-0 lg:pb-6">
      <DashboardHeader
        monthlyCost={analysis.monthlyCost}
        budget={budget}
        currentStatus={currentStatus}
        area={location.area}
      />

      <DashboardStats analysis={analysis} advisor={advisor} budget={budget} />

      <div className="space-y-6">
        {/* ================= COMMUNITY POWER ================= */}

        <CommunityPowerCard
          location={location}
          currentStatus={currentStatus}
          confidence={confidence}
          reportCount={reportCount}
          isPending={isPending}
        />

        {/* ================= POWERCHECK TOOLS ================= */}
        <DashboardTools />
      </div>

      <div className="space-y-6">
        <EnergyProfileCard analysis={analysis} />

        <RecommendationCard analysis={analysis} />
      </div>
    </div>
  );
}
