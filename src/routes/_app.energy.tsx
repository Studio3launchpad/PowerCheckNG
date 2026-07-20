import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { analyzeEnergyPlan } from "@/lib/energy/energyPlanner";
import { DEFAULT_APPLIANCES } from "@/lib/energy/energy.constants";
import type { Appliance, EnergyAnalysis } from "@/lib/energy/energy.types";
import { ApplianceSelector } from "@/components/energy/ApplianceSelector";
import { EnergyBudgetInput } from "@/components/energy/EnergyBudgetInput";
import { EnergyAnalysisResults } from "@/components/energy/EnergyAnalysisResults";
import {loadSavedAppliances, loadSavedBudget, saveAppliances, saveBudget, saveEnergyAnalysis} from "@/lib/energy/energyStorage";

const ANALYSIS_SESSION_KEY = "powercheckng-energy-analysis-timestamp";

const ANALYSIS_EXPIRY_MS = 30 * 60 * 1000;

export const Route = createFileRoute("/_app/energy")({
  component: SmartEnergyPlanner,
});

function SmartEnergyPlanner() {
  const [hasLoadedSavedPlan, setHasLoadedSavedPlan] = useState(false);

  const [appliances, setAppliances] = useState<Appliance[]>(() =>
    DEFAULT_APPLIANCES.map((appliance) => ({
      ...appliance,
    })),
  );

  const [budget, setBudget] = useState("25000");

  const [analysis, setAnalysis] = useState<EnergyAnalysis | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const budgetSectionRef = useRef<HTMLDivElement>(null);

  const resultsSectionRef = useRef<HTMLDivElement>(null);

  const clearAnalysis = () => {
    setAnalysis(null);

    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(ANALYSIS_SESSION_KEY);
    }
  };

  useEffect(() => {
    const savedAppliances = loadSavedAppliances();
    const savedBudget = loadSavedBudget();

    const restoredAppliances =
      savedAppliances && savedAppliances.length > 0
        ? savedAppliances
        : DEFAULT_APPLIANCES.map((appliance) => ({
            ...appliance,
          }));

    const restoredBudget = savedBudget !== null ? savedBudget : "25000";

    setAppliances(restoredAppliances);
    setBudget(restoredBudget);

    const analysisTimestamp = window.sessionStorage.getItem(ANALYSIS_SESSION_KEY);

    const analysisTime = Number(analysisTimestamp);

    const analysisIsRecent =
      Number.isFinite(analysisTime) && Date.now() - analysisTime < ANALYSIS_EXPIRY_MS;

    if (analysisIsRecent) {
      const budgetValue = Number(restoredBudget);

      if (Number.isFinite(budgetValue) && budgetValue > 0) {
        const restoredAnalysis = analyzeEnergyPlan(restoredAppliances, budgetValue);

        setAnalysis(restoredAnalysis);
      }
    } else {
      window.sessionStorage.removeItem(ANALYSIS_SESSION_KEY);
    }

    setHasLoadedSavedPlan(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedSavedPlan) {
      return;
    }

    saveAppliances(appliances);
  }, [appliances, hasLoadedSavedPlan]);

  useEffect(() => {
    if (!hasLoadedSavedPlan) {
      return;
    }

    saveBudget(budget);
  }, [budget, hasLoadedSavedPlan]);

  useEffect(() => {
  if (!analysis) return;

  resultsSectionRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}, [analysis]);

  const toggle = (name: string) => {
    setAppliances((current) =>
      current.map((appliance) =>
        appliance.name === name
          ? {
              ...appliance,
              selected: !appliance.selected,
            }
          : appliance,
      ),
    );

    clearAnalysis();
  };

  const toggleEssential = (name: string) => {
    setAppliances((current) =>
      current.map((appliance) =>
        appliance.name === name
          ? {
              ...appliance,
              essential: !appliance.essential,
            }
          : appliance,
      ),
    );

    clearAnalysis();
  };

  const updateAppliance = (name: string, field: "watts" | "quantity" | "hours", value: number) => {
    setAppliances((current) =>
      current.map((appliance) =>
        appliance.name === name
          ? {
              ...appliance,
              [field]: value,
            }
          : appliance,
      ),
    );

    clearAnalysis();
  };

  const updateBudget = (value: string) => {
    setBudget(value);
    clearAnalysis();
  };

  const addCustomAppliance = (appliance: Appliance) => {
    setAppliances((current) => [appliance, ...current]);

    clearAnalysis();
  };

  const removeAppliance = (id: string) => {
    setAppliances((current) => current.filter((appliance) => appliance.id !== id));

    clearAnalysis();
  };

  const analyzePlan = () => {
    const budgetValue = Number(budget);

    if (!Number.isFinite(budgetValue) || budgetValue <= 0) {
      return;
    }

    setIsAnalyzing(true);
    clearAnalysis();

    setTimeout(() => {
      const result = analyzeEnergyPlan(appliances, budgetValue);

      setAnalysis(result);

      saveEnergyAnalysis(result);

      window.sessionStorage.setItem(ANALYSIS_SESSION_KEY, Date.now().toString());

      setIsAnalyzing(false);
    }, 1200);
  };

  const scrollToBudget = () => {
    budgetSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="space-y-6 px-4 pb-24 sm:px-0 lg:pb-6">
      <PageHeader
  title="Smart Energy Planner"
  description="Build an energy plan based on your appliances and monthly electricity budget."
  actions={
    analysis ? (
      <Link
        to="/insights"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10 sm:w-auto"
      >
        View Smart Insights
        <span>→</span>
      </Link>
    ) : undefined
  }
/>

      <ApplianceSelector
        appliances={appliances}
        onToggle={toggle}
        onUpdate={updateAppliance}
        onAddAppliance={addCustomAppliance}
        onRemoveAppliance={removeAppliance}
        onToggleEssential={toggleEssential}
        onContinueToBudget={scrollToBudget}
      />

      <div ref={budgetSectionRef}>
        <EnergyBudgetInput
          budget={budget}
          onBudgetChange={updateBudget}
          onAnalyze={analyzePlan}
          isAnalyzing={isAnalyzing}
        />
      </div>

      {analysis && (
        <div className="space-y-6" ref={resultsSectionRef}>
          <EnergyAnalysisResults analysis={analysis} budget={Number(budget)} />

          <div className="flex justify-center px-4 sm:px-0">
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
  <Link
    to="/dashboard"
    className="inline-flex w-full items-center justify-center rounded-xl border border-border px-4 py-3 text-sm font-semibold transition hover:bg-white/5 sm:w-auto sm:px-6"
  >
    ← View Dashboard
  </Link>

  <Link
    to="/insights"
    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10 sm:w-auto sm:px-6"
  >
    View Full Smart Insights
    <span className="transition-transform group-hover:translate-x-1">
      →
    </span>
  </Link>
</div>
          </div>
        </div>
      )}
    </div>
  );
}
