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
import {loadEnergyAnalysis, loadSavedBudget} from "@/lib/energy/energyStorage";

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
      <div className="space-y-6 pb-24 lg:pb-6">
        <header>
          <h1 className="text-3xl font-display font-bold">Dashboard</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Start by creating your Smart Energy Plan to unlock your personalised dashboard.
          </p>
        </header>

        <GlassCard className="p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl">
            ⚡
          </div>

          <h2 className="mt-5 text-xl font-semibold">No Energy Profile Yet</h2>

          <p className="mt-3 text-sm text-muted-foreground">
            Build your Smart Energy Plan to see your energy summary, recommendations, backup
            solution and community power information.
          </p>

          <Link
            to="/energy"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            Build Your Energy Plan
          </Link>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24 lg:pb-6">
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
