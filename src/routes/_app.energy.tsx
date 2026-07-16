import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Brain } from "lucide-react";
import { analyzeEnergyPlan } from "@/lib/energy/energyPlanner";
import { DEFAULT_APPLIANCES } from "@/lib/energy/energy.constants";
import type { Appliance, EnergyAnalysis } from "@/lib/energy/energy.types";
import { ApplianceSelector } from "@/components/energy/ApplianceSelector";
import { EnergyBudgetInput } from "@/components/energy/EnergyBudgetInput";
import { EnergyAnalysisResults } from "@/components/energy/EnergyAnalysisResults";
import {
  loadSavedAppliances,
  loadSavedBudget,
  saveAppliances,
  saveBudget,
  saveEnergyAnalysis,
} from "@/lib/energy/energyStorage";


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
    setAppliances((current) => [...current, appliance]);

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

  return (
    <div className="space-y-6 pb-24 lg:pb-6">
      <header className="flex flex-wrap items-start justify-between gap-2">
        <div>

<h1 className="text-3xl font-display font-bold flex items-center gap-2">
          <Brain className="text-primary" />
          Smart Energy Planner
        </h1>

        <p className="text-sm text-muted-foreground mt-2">
          Build an energy plan based on your appliances and monthly electricity budget.
        </p>

        </div>

         {analysis && (
    <Link
      to="/insights"
      className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10"
    >
      View Smart Insights

      <span>→</span>
    </Link>
  )}
      </header>

      <ApplianceSelector
  appliances={appliances}
  onToggle={toggle}
  onUpdate={updateAppliance}
  onAddAppliance={addCustomAppliance}
  onRemoveAppliance={removeAppliance}
  onToggleEssential={toggleEssential}
/>

      <EnergyBudgetInput
        budget={budget}
        onBudgetChange={updateBudget}
        onAnalyze={analyzePlan}
        isAnalyzing={isAnalyzing}
      />

      {analysis && (
        <div className="space-y-6">
          <EnergyAnalysisResults analysis={analysis} budget={Number(budget)} />

          <div className="flex justify-center">
            <Link
              to="/insights"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
            >
              View Full Smart Insights
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
