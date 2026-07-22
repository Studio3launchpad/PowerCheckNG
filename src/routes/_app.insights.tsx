import { createFileRoute, Link } from "@tanstack/react-router";
import { BatteryCharging } from "lucide-react";
import { InsightSummaryCards } from "@/components/insights/InsightSummaryCards";
import { BudgetRiskCard } from "@/components/insights/BudgetRiskCard";
import { SmartInsightList } from "@/components/insights/SmartInsightList";
import { SavingsOpportunities } from "@/components/insights/SavingsOpportunities";
import { EnergyBreakdownChart } from "@/components/insights/EnergyBreakdownChart";
import { generateEnergyInsights } from "@/lib/insights/insightEngine";
import { PageHeader } from "@/components/common/PageHeader";

import type { Appliance } from "@/lib/energy/energy.types";

export const Route = createFileRoute("/_app/insights")({
  head: () => ({
    meta: [
      {
        title: "Smart Insights — PowerCheckNG",
      },
    ],
  }),
  component: SmartInsightsPage,
});

const APPLIANCES_STORAGE_KEY = "powercheckng-energy-appliances";

const BUDGET_STORAGE_KEY = "powercheckng-energy-budget";

function loadSavedAppliances(): Appliance[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const saved = window.localStorage.getItem(APPLIANCES_STORAGE_KEY);

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? (parsed as Appliance[]) : [];
  } catch (error) {
    console.error("Failed to load saved appliances:", error);

    return [];
  }
}

function loadSavedBudget(): number {
  if (typeof window === "undefined") {
    return 0;
  }

  try {
    const saved = window.localStorage.getItem(BUDGET_STORAGE_KEY);

    if (!saved) {
      return 0;
    }

    const parsed = Number(saved);

    return Number.isFinite(parsed) ? parsed : 0;
  } catch (error) {
    console.error("Failed to load saved energy budget:", error);

    return 0;
  }
}

function SmartInsightsPage() {
  const appliances = loadSavedAppliances();

  const budget = loadSavedBudget();

  const selectedAppliances = appliances.filter((appliance) => appliance.selected);

  const hasEnergyProfile = selectedAppliances.length > 0;

  if (!hasEnergyProfile) {
    return (
      <div className="space-y-6 pb-24 lg:pb-6">
        <div>
          <h1 className=" text-3xl font-bold">Smart Insights</h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Understand your estimated energy usage, budget risk, cost drivers and potential savings
            opportunities.
          </p>
        </div>

        <div className="glass rounded-2xl p-5 text-center sm:p-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-xl sm:h-14 sm:w-14 sm:text-2xl">
            ⚡
          </div>

          <h2 className="mt-5 text-lg font-semibold sm:text-xl">No energy profile available yet</h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            Smart Insights uses your saved Smart Energy Planner configuration to analyse
            consumption, budget alignment and potential savings.
          </p>

          <Link
            to="/energy"
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 sm:w-auto"
          >
            Build Your Energy Plan
          </Link>
        </div>
      </div>
    );
  }

  const profile = generateEnergyInsights(appliances, budget);

  return (
    <div className="space-y-6 px-4 pb-24 sm:px-0 lg:pb-6">
      <div className="space-y-4">
        <Link
          to="/energy"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
        >
          <span aria-hidden="true">←</span>
          Back to Smart Energy Planner
        </Link>

        <PageHeader
          title="Smart Insights"
          description="Personalized analysis based on your saved Smart Energy Planner profile."
        />
      </div>

      <InsightSummaryCards profile={profile} />

      <BudgetRiskCard profile={profile} />

      <SmartInsightList insights={profile.insights} />

      <SavingsOpportunities
        opportunities={profile.savingsOpportunities}
        potentialMonthlySavings={profile.potentialMonthlySavings}
      />

      <EnergyBreakdownChart breakdown={profile.analysis.breakdown} />

      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-primary/10 p-3">
              <BatteryCharging className="h-6 w-6 text-primary" />
            </div>

            <div>
              <h2 className="text-lg font-semibold sm:text-xl">Need Backup Power?</h2>

              <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                Based on your selected appliances and energy usage, PowerCheckNG can recommend the
                right inverter or generator for your home or business.
              </p>
            </div>
          </div>

          <Link
            to="/backup"
            className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 lg:w-auto"
          >
            Open Backup Advisor →
          </Link>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-background/30 p-4">
        <p className="text-xs leading-6 text-muted-foreground">
          PowerCheckNG insights are estimates based on your configured appliance usage, selected
          quantities, daily runtime and the application&apos;s estimated electricity tariff. Actual
          electricity consumption and cost may vary.
        </p>
      </div>
    </div>
  );
}
