import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Brain} from "lucide-react";
import { analyzeEnergyPlan } from "@/lib/energy/energyPlanner";
import { DEFAULT_APPLIANCES } from "@/lib/energy/energy.constants";
import type {Appliance, EnergyAnalysis} from "@/lib/energy/energy.types";
import { ApplianceSelector } from "@/components/energy/ApplianceSelector";
import { EnergyBudgetInput } from "@/components/energy/EnergyBudgetInput";
import { EnergyAnalysisResults } from "@/components/energy/EnergyAnalysisResults";
import {
  loadSavedAppliances,
  loadSavedBudget,
  saveAppliances,
  saveBudget,
} from "@/lib/energy/energyStorage";


export const Route = createFileRoute("/_app/energy")({
  component: SmartEnergyPlanner,
});

function SmartEnergyPlanner() {
  const [hasLoadedSavedPlan, setHasLoadedSavedPlan] =
  useState(false);

  const [appliances, setAppliances] =
  useState<Appliance[]>(() =>
    DEFAULT_APPLIANCES.map((appliance) => ({
      ...appliance,
    })),
  );

  const [budget, setBudget] = useState("25000");

  const [analysis, setAnalysis] =
  useState<EnergyAnalysis | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
  const savedAppliances = loadSavedAppliances();
  const savedBudget = loadSavedBudget();

  if (
    savedAppliances &&
    savedAppliances.length > 0
  ) {
    setAppliances(savedAppliances);
  }

  if (savedBudget !== null) {
    setBudget(savedBudget);
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

  setAnalysis(null);
};

  const updateAppliance = (
  name: string,
  field: "watts" | "quantity" | "hours",
  value: number,
) => {
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

  setAnalysis(null);
};

const updateBudget = (value: string) => {
  setBudget(value);
  setAnalysis(null);
};

  const addCustomAppliance = (
  appliance: Appliance,
) => {
  setAppliances((current) => [
    ...current,
    appliance,
  ]);

  setAnalysis(null);
};

  const analyzePlan = () => {
  const budgetValue = Number(budget);

  if (
    !Number.isFinite(budgetValue) ||
    budgetValue <= 0
  ) {
    return;
  }

  setIsAnalyzing(true);
  setAnalysis(null);

  setTimeout(() => {
    const result = analyzeEnergyPlan(
      appliances,
      budgetValue,
    );

    setAnalysis(result);
    setIsAnalyzing(false);
  }, 1200);
};

  return (
    <div className="space-y-6 pb-24 lg:pb-6">
      <header>
        <h1 className="text-3xl font-display font-bold flex items-center gap-2">
          <Brain className="text-primary" />
          Smart Energy Planner
        </h1>

        <p className="text-sm text-muted-foreground mt-2">
          Build an energy plan based on your appliances and monthly electricity budget.
        </p>
      </header>

      <ApplianceSelector
  appliances={appliances}
  onToggle={toggle}
  onUpdate={updateAppliance}
  onAddAppliance={addCustomAppliance}
/>

<EnergyBudgetInput
  budget={budget}
  onBudgetChange={updateBudget}
  onAnalyze={analyzePlan}
  isAnalyzing={isAnalyzing}
/>

      {analysis && (
  <EnergyAnalysisResults
    analysis={analysis}
    budget={Number(budget)}
  />
)}
    </div>
  );
}
