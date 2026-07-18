import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Zap, Activity, AlertTriangle, CreditCard, TrendingUp, Battery } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { Link } from "@tanstack/react-router";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { buildBackupAdvisor } from "@/lib/backup/backupAdvisor";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { calculateCommunityPower } from "@/lib/outage/communitypower";
import { listOutages } from "@/lib/outage/outages.functions";

import {
  loadEnergyAnalysis,
  loadSavedAppliances,
  loadSavedBudget,
} from "@/lib/energy/energyStorage";

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

  const appliances = loadSavedAppliances() ?? [];

  const budget = Number(loadSavedBudget() ?? 0);

  const selectedAppliances = appliances.filter((appliance) => appliance.selected);

  const essentialAppliances = selectedAppliances.filter((appliance) => appliance.essential);

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
      <header className="space-y-5">
        <div>
          <h1 className="text-3xl font-display font-bold">Dashboard</h1>

          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Everything you need to plan, analyse and optimise your electricity usage in one place.
          </p>

          <p className="mt-6 text-lg font-medium text-muted-foreground">
            Good{" "}
            {new Date().getHours() < 12
              ? "Morning"
              : new Date().getHours() < 17
                ? "Afternoon"
                : "Evening"}{" "}
            👋
          </p>
        </div>

        <GlassCard className="p-5">
          <h2 className="text-lg font-semibold">Today's Summary</h2>

          <p className="mt-3 leading-7 text-muted-foreground">
            Your estimated monthly electricity cost is
            <span className="font-semibold text-foreground">
              {" "}
              ₦{analysis.monthlyCost.toLocaleString()}
            </span>{" "}
            which is{" "}
            <span className="font-semibold text-primary">
              ₦{Math.abs(budget - analysis.monthlyCost).toLocaleString()}
            </span>
            {analysis.monthlyCost <= budget
              ? " below your planned budget."
              : " above your planned budget."}
          </p>

          <p className="mt-3 leading-7 text-muted-foreground">
            Community reports currently indicate
            <span
              className={`ml-1 font-semibold ${
                currentStatus === "Power ON" ? "text-green-500" : "text-red-500"
              }`}
            >
              {currentStatus}
            </span>{" "}
            around <span className="font-semibold">{location.area}</span>.
          </p>
        </GlassCard>
      </header>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Energy Health Score</span>

            <Zap className="size-4 text-primary" />
          </div>

          <p className="mt-2 text-2xl font-display font-bold">{analysis.score}/100</p>

          <p className="mt-1 text-xs text-muted-foreground">
            {analysis.score >= 80
              ? "Excellent"
              : analysis.score >= 60
                ? "Good"
                : "Needs Improvement"}
          </p>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Monthly Usage</span>

            <Activity className="size-4 text-primary" />
          </div>

          <p className="mt-2 text-2xl font-display font-bold">
            {analysis.monthlyUsage.toFixed(1)} kWh
          </p>

          <p className="mt-1 text-xs text-muted-foreground">Estimated consumption</p>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Monthly Cost</span>

            <CreditCard className="size-4 text-primary" />
          </div>

          <p className="mt-2 text-2xl font-display font-bold">
            ₦{analysis.monthlyCost.toLocaleString()}
          </p>

          <p
            className={`mt-1 text-xs font-medium ${
              analysis.monthlyCost <= budget ? "text-green-500" : "text-red-500"
            }`}
          >
            {analysis.monthlyCost <= budget
              ? `₦${(budget - analysis.monthlyCost).toLocaleString()} below budget`
              : `₦${(analysis.monthlyCost - budget).toLocaleString()} above budget`}
          </p>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Backup Ready</span>

            <Battery className="size-4 text-primary" />
          </div>

          <p className="mt-2 text-2xl font-display font-bold">{advisor?.readinessScore ?? 0}%</p>

          <p className="mt-1 text-xs text-muted-foreground">
            {advisor?.bestTechnology === "INVERTER"
              ? "Inverter Recommended"
              : advisor?.bestTechnology === "GENERATOR"
                ? "Generator Recommended"
                : "Hybrid Recommended"}
          </p>
        </GlassCard>
      </div>

      <div className="space-y-6">
        {/* ================= COMMUNITY POWER ================= */}

        <GlassCard className="p-6">
          <div className="flex flex-col gap-6 h-16 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-primary" />

                <h2 className="text-xl font-semibold">Community Power</h2>
              </div>

              <p className="mt-2 text-sm text-muted-foreground">
                Live community power status from nearby reports.
              </p>
            </div>

            <Link
              to="/outages"
              className="inline-flex items-center rounded-xl border border-primary/30 bg-primary/5 px-5 py-3 font-medium text-primary transition hover:bg-primary/10"
            >
              Open Outage Tracker →
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-4">
            <div>
              <p className="text-xs uppercase text-muted-foreground">Status</p>

              <span
                className={`mt-3 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                  currentStatus === "Power ON"
                    ? "bg-green-500/10 text-green-500"
                    : currentStatus === "Power OFF"
                      ? "bg-red-500/10 text-red-500"
                      : "bg-yellow-500/10 text-yellow-500"
                }`}
              >
                {isPending ? "Loading..." : currentStatus}
              </span>
            </div>

            <div>
              <p className="text-xs uppercase text-muted-foreground">Area</p>

              <p className="mt-3 text-lg font-semibold">{location.area}</p>
            </div>

            <div>
              <p className="text-xs uppercase text-muted-foreground">Distribution Company</p>

              <p className="mt-3 text-lg font-semibold">{location.discoCode}</p>
            </div>

            <div>
              <p className="text-xs uppercase text-muted-foreground">Community Confidence</p>

              <p className="mt-3 text-lg font-semibold">
                {confidence}% ({reportCount} reports)
              </p>
            </div>
          </div>
        </GlassCard>

        {/* ================= POWERCHECK TOOLS ================= */}

        <GlassCard className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">PowerCheck Tools</h2>

            <p className="mt-2 text-sm text-muted-foreground">Access all PowerCheckNG tools.</p>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            <Link
              to="/energy"
              className="group flex flex-col items-center rounded-2xl border border-border p-8 transition-all hover:border-primary hover:bg-primary/5"
            >
              <Zap className="h-10 w-10 text-primary transition group-hover:scale-110" />

              <span className="mt-5 font-semibold">Planner</span>
            </Link>

            <Link
              to="/insights"
              className="group flex flex-col items-center rounded-2xl border border-border p-8 transition-all hover:border-primary hover:bg-primary/5"
            >
              <TrendingUp className="h-10 w-10 text-primary transition group-hover:scale-110" />

              <span className="mt-5 font-semibold">Insights</span>
            </Link>

            <Link
              to="/backup"
              className="group flex flex-col items-center rounded-2xl border border-border p-8 transition-all hover:border-primary hover:bg-primary/5"
            >
              <Battery className="h-10 w-10 text-primary transition group-hover:scale-110" />

              <span className="mt-5 font-semibold">Backup</span>
            </Link>

            <Link
              to="/outages"
              className="group flex flex-col items-center rounded-2xl border border-border p-8 transition-all hover:border-primary hover:bg-primary/5"
            >
              <AlertTriangle className="h-10 w-10 text-primary transition group-hover:scale-110" />

              <span className="mt-5 font-semibold">Outages</span>
            </Link>
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Energy Profile</h2>

              <p className="mt-1 text-sm text-muted-foreground">Your current energy setup.</p>
            </div>

            <Link to="/energy" className="text-sm font-semibold text-primary hover:underline">
              Update →
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-5">
            <div className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">Selected</p>

              <p className="mt-2 text-2xl font-bold">{analysis.applianceCount}</p>
            </div>

            <div className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">Essential</p>

              <p className="mt-2 text-2xl font-bold">{analysis.essentialApplianceCount}</p>
            </div>

            <div className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">Peak Load</p>

              <p className="mt-2 text-2xl font-bold">{analysis.peakLoad.toLocaleString()}W</p>
            </div>

            <div className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">Highest Consumer</p>

              <p className="mt-2 font-semibold">{analysis.highestConsumer}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="lg:col-span-2 p-6">
          <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-5">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Today's Recommendation
            </p>

            <p className="mt-3 text-base leading-7">{analysis.recommendations[0]}</p>
          </div>

          <div className="mt-6">
            <Link
              to="/insights"
              className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
            >
              View Smart Insights →
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
