import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import { Brain, Plus, Check } from "lucide-react";

export const Route = createFileRoute("/_app/energy")({
  component: SmartEnergyPlanner,
});

function SmartEnergyPlanner() {
  const [appliances, setAppliances] = useState([
    {
      name: "Fan",
      selected: true,
      watts: 75,
      quantity: 2,
      hours: 10,
    },
    {
      name: "Television",
      selected: true,
      watts: 120,
      quantity: 1,
      hours: 6,
    },
    {
      name: "Refrigerator",
      selected: true,
      watts: 180,
      quantity: 1,
      hours: 24,
    },
    {
      name: "Air Conditioner",
      selected: false,
      watts: 1500,
      quantity: 1,
      hours: 8,
    },
    {
      name: "Water Pump",
      selected: false,
      watts: 750,
      quantity: 1,
      hours: 1,
    },
    {
      name: "Electric Iron",
      selected: false,
      watts: 1000,
      quantity: 1,
      hours: 1,
    },
  ]);

  const [budget, setBudget] = useState("25000");

  const [analysis, setAnalysis] = useState<{
    dailyUsage: number;
    monthlyUsage: number;
    monthlyCost: number;
    score: number;
    highestConsumer: string;
    recommendations: string[];
    breakdown: {
      name: string;
      cost: number;
    }[];
  } | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const toggle = (name: string) => {
    setAppliances((prev) =>
      prev.map((appliance) =>
        appliance.name === name
          ? {
              ...appliance,
              selected: !appliance.selected,
            }
          : appliance,
      ),
    );
  };

  const updateAppliance = (name: string, field: "watts" | "quantity" | "hours", value: number) => {
    setAppliances((prev) =>
      prev.map((appliance) =>
        appliance.name === name
          ? {
              ...appliance,
              [field]: value,
            }
          : appliance,
      ),
    );
  };

  const analyzePlan = () => {
    setIsAnalyzing(true);

    setTimeout(() => {
      const dailyUsage = appliances
        .filter((a) => a.selected)
        .reduce((sum, appliance) => {
          return sum + (appliance.watts * appliance.quantity * appliance.hours) / 1000;
        }, 0);

      const totalUsage = dailyUsage * 30;

      const estimatedCost = totalUsage * 72;

      const breakdown = appliances
        .filter((a) => a.selected)
        .map((a) => {
          const usage = (a.watts * a.quantity * a.hours * 30) / 1000;

          return {
            name: a.name,
            cost: usage * 72,
          };
        })
        .sort((a, b) => b.cost - a.cost);
        

      const highestConsumer =
        appliances
          .filter((a) => a.selected)
          .sort((a, b) => b.watts * b.quantity * b.hours - a.watts * a.quantity * a.hours)[0]
          ?.name ?? "None";

      const budgetValue = Number(budget);

      let score = 100;

      if (estimatedCost > budgetValue) score -= 25;
      if (appliances.some((a) => a.name === "Air Conditioner" && a.selected)) score -= 10;

      if (appliances.some((a) => a.name === "Electric Iron" && a.selected)) score -= 5;

      score = Math.max(score, 45);

      const topConsumer = breakdown[0];
      

      const recommendations: string[] = [];

      if (topConsumer) {
  recommendations.push(
    `${topConsumer.name} contributes the highest share of your electricity cost. Optimizing its usage will have the greatest impact.`
  );
}

      // Rule 1
      if (estimatedCost > budgetValue) {
        recommendations.push(
          `Your estimated bill exceeds your budget by ₦${(
            estimatedCost - budgetValue
          ).toLocaleString()}.`,
        );
      }

      // Rule 2
      const ac = appliances.find((a) => a.name === "Air Conditioner" && a.selected);

      if (ac && ac.hours > 6) {
  const savings =
    ((ac.watts * 2 * ac.quantity * 30) / 1000) * 72;

  recommendations.push(
    `Reducing your Air Conditioner usage by 2 hours per day could save approximately ₦${Math.round(
      savings
    ).toLocaleString()} each month.`
  );
}

      // Rule 3
      const fridge = appliances.find((a) => a.name === "Refrigerator" && a.selected);

      if (fridge) {
        recommendations.push(
          "Keep your refrigerator door closed as much as possible to reduce energy consumption.",
        );
      }

      // Rule 4
      const iron = appliances.find((a) => a.name === "Electric Iron" && a.selected);

      if (iron && iron.hours > 1) {
  const savings =
    ((iron.watts * 0.5 * iron.quantity * 30) / 1000) * 72;

  recommendations.push(
    `Ironing clothes in batches could save about ₦${Math.round(
      savings
    ).toLocaleString()} every month.`
  );
}

      // Rule 5
      const pump = appliances.find((a) => a.name === "Water Pump" && a.selected);

      if (pump && pump.hours > 2) {
  const savings =
    ((pump.watts * 1 * pump.quantity * 30) / 1000) * 72;

  recommendations.push(
    `Reducing water pump usage by 1 hour daily could save around ₦${Math.round(
      savings
    ).toLocaleString()} monthly.`
  );
}

      // Rule 6
      if (score >= 90) {
        recommendations.push("Excellent! Your appliance usage is already very energy efficient.");
      }

      // Rule 7
      recommendations.push(
        "Using high-power appliances during periods of public electricity can help reduce generator or inverter costs.",
      );

      setAnalysis({
        dailyUsage,
        monthlyUsage: totalUsage,
        monthlyCost: estimatedCost,
        score,
        highestConsumer,
        recommendations,
        breakdown,
      });

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

      <GlassCard>
        <h2 className="font-semibold mb-4">Select Your Appliances</h2>

        <div className="grid md:grid-cols-2 gap-x-10 gap-y-4">
          {appliances.map((item) => (
            <div>
              <button type="button" onClick={() => toggle(item.name)} className="w-full text-left">
                <div className="flex items-start gap-3">
                  <div>
                    <h3 className="font-semibold text-base">{item.name}</h3>

                    <p className="text-xs text-muted-foreground">Typical Power: {item.watts}W</p>
                  </div>

                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded-full transition-all duration-300 ${
                      item.selected
                        ? "bg-primary text-white shadow-lg"
                        : "border border-muted-foreground/40 text-transparent"
                    }`}
                  >
                    {item.selected && <Check size={12} />}
                  </div>
                </div>
              </button>

              {item.selected && (
                <div className="mt-4 space-y-3">
                  <div className="rounded-lg bg-primary/5 border border-primary/20 p-3">
                    <p className="text-xs text-muted-foreground">Typical Power Rating</p>

                    <p className="text-lg font-semibold">{item.watts} W</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-muted-foreground">Quantity</label>

                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateAppliance(item.name, "quantity", Number(e.target.value))
                        }
                        className="mt-1 w-full rounded-lg border border-border bg-transparent p-2"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-muted-foreground">Hours/day</label>

                      <input
                        type="number"
                        value={item.hours}
                        onChange={(e) =>
                          updateAppliance(item.name, "hours", Number(e.target.value))
                        }
                        className="mt-1 w-full rounded-lg border border-border bg-transparent p-2"
                      />
                    </div>

                    <div className="rounded-lg bg-muted/20 p-3">
                      <p className="text-xs text-muted-foreground">Estimated Monthly Consumption</p>

                      <p className="font-semibold text-primary">
                        {((item.watts * item.quantity * item.hours * 30) / 1000).toFixed(1)} kWh
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <button className="mt-4 flex items-center gap-2 text-primary text-sm">
          <Plus className="size-4" />
          Add Custom Appliance
        </button>
      </GlassCard>

      <GlassCard>
        <h2 className="font-semibold mb-4">Monthly Electricity Budget</h2>

        <input
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full rounded-xl border border-border bg-transparent p-3"
          placeholder="25000"
        />
      </GlassCard>

      <button
        onClick={analyzePlan}
        disabled={isAnalyzing}
        className={`
               w-full rounded-xl py-4 font-semibold
               transition-all duration-300
        ${
          isAnalyzing
            ? "bg-primary/60 cursor-not-allowed"
            : "bg-primary hover:bg-primary/90 hover:scale-[1.01]"
        }
        text-primary-foreground
       `}
      >
        {isAnalyzing ? "Analyzing your energy plan..." : "Analyze My Energy Plan"}
      </button>

      {analysis && (
        <GlassCard className="mt-8">
          <h2 className="text-xl font-semibold mb-6">Analysis Results</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">Daily Usage</p>

              <p className="text-2xl font-bold mt-2">{analysis.dailyUsage.toFixed(1)} kWh</p>
            </div>

            <div className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">Monthly Usage</p>

              <p className="text-2xl font-bold mt-2">{analysis.monthlyUsage.toFixed(1)} kWh</p>
            </div>

            <div className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">Estimated Monthly Bill</p>

              <p className="text-2xl font-bold mt-2">₦{analysis.monthlyCost.toLocaleString()}</p>
            </div>

            <div className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">Energy Health Score</p>

              <p className="text-2xl font-bold mt-2 text-primary">{analysis.score}/100</p>
            </div>

            <div className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">Highest Consuming Appliance</p>

              <p className="text-xl font-semibold mt-2">{analysis.highestConsumer}</p>
            </div>
          </div>

          <GlassCard className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Budget Progress</h3>

              <span className="text-sm">
                ₦{analysis.monthlyCost.toLocaleString()} / ₦{Number(budget).toLocaleString()}
              </span>
            </div>

            <div className="h-3 bg-border rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  analysis.monthlyCost > Number(budget) ? "bg-red-500" : "bg-primary"
                }`}
                style={{
                  width: `${Math.min((analysis.monthlyCost / Number(budget)) * 100, 100)}%`,
                }}
              />
            </div>

            <p className="mt-3 text-sm text-muted-foreground">
              {analysis.monthlyCost > Number(budget)
                ? `⚠ You're over budget by ₦${(
                    analysis.monthlyCost - Number(budget)
                  ).toLocaleString()}`
                : `✅ You're within your monthly electricity budget.`}
            </p>
          </GlassCard>

          <GlassCard className="mt-6">
            <h3 className="font-semibold mb-4">Appliance Cost Breakdown</h3>

            <div className="space-y-4">
              {analysis.breakdown.map((item) => (
                <div key={item.name} className="flex justify-between items-center">
                  <span>{item.name}</span>

                  <span className="font-semibold">₦{item.cost.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <h3 className="font-semibold mb-4 mt-8">🤖 AI Energy Advisor</h3>

          <div className="space-y-3">
            {analysis.recommendations.map((tip, index) => (
              <div key={index} className="rounded-lg bg-background/40 p-3 border border-border">
                <p className="text-sm leading-6">💡 {tip}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  );
}
