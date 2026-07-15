import { analyzeEnergyPlan } from "@/lib/energy/energyPlanner";
import { ESTIMATED_TARIFF_PER_KWH } from "@/lib/energy/energy.constants";

import type { Appliance } from "@/lib/energy/energy.types";

import type {
  BudgetRisk,
  EnergyInsightProfile,
  SavingsOpportunity,
  SmartInsight,
} from "./insight.types";

function calculateBudgetRisk(
  monthlyCost: number,
  budget: number,
): BudgetRisk {
  if (budget <= 0) {
    return "NO_BUDGET";
  }

  const budgetUsagePercentage =
    (monthlyCost / budget) * 100;

  if (budgetUsagePercentage <= 80) {
    return "LOW";
  }

  if (budgetUsagePercentage <= 110) {
    return "MODERATE";
  }

  if (budgetUsagePercentage <= 175) {
    return "HIGH";
  }

  return "CRITICAL";
}

function calculateSavingsOpportunities(
  appliances: Appliance[],
): SavingsOpportunity[] {
  const selectedAppliances = appliances.filter(
    (appliance) => appliance.selected,
  );

  const opportunities: SavingsOpportunity[] = [];

  const airConditioner = selectedAppliances.find(
    (appliance) =>
      appliance.name === "Air Conditioner",
  );

  if (
    airConditioner &&
    airConditioner.hours > 6
  ) {
    const estimatedMonthlySavings =
      ((airConditioner.watts *
        airConditioner.quantity *
        2 *
        30) /
        1000) *
      ESTIMATED_TARIFF_PER_KWH;

    opportunities.push({
      appliance: airConditioner.name,
      action: "Reduce daily usage by 2 hours",
      estimatedMonthlySavings,
    });
  }

  const electricIron = selectedAppliances.find(
    (appliance) =>
      appliance.name === "Electric Iron",
  );

  if (
    electricIron &&
    electricIron.hours > 1
  ) {
    const estimatedMonthlySavings =
      ((electricIron.watts *
        electricIron.quantity *
        0.5 *
        30) /
        1000) *
      ESTIMATED_TARIFF_PER_KWH;

    opportunities.push({
      appliance: electricIron.name,
      action: "Reduce daily usage by 30 minutes",
      estimatedMonthlySavings,
    });
  }

  const waterPump = selectedAppliances.find(
    (appliance) =>
      appliance.name === "Water Pump",
  );

  if (
    waterPump &&
    waterPump.hours > 2
  ) {
    const estimatedMonthlySavings =
      ((waterPump.watts *
        waterPump.quantity *
        1 *
        30) /
        1000) *
      ESTIMATED_TARIFF_PER_KWH;

    opportunities.push({
      appliance: waterPump.name,
      action: "Reduce daily usage by 1 hour",
      estimatedMonthlySavings,
    });
  }

  return opportunities.sort(
    (a, b) =>
      b.estimatedMonthlySavings -
      a.estimatedMonthlySavings,
  );
}

function buildSmartInsights({
  budget,
  budgetRisk,
  budgetDifference,
  budgetUsagePercentage,
  topConsumerName,
  topConsumerPercentage,
  score,
  potentialMonthlySavings,
}: {
  budget: number;
  budgetRisk: BudgetRisk;
  budgetDifference: number;
  budgetUsagePercentage: number;
  topConsumerName: string | null;
  topConsumerPercentage: number;
  score: number;
  potentialMonthlySavings: number;
}): SmartInsight[] {
  const insights: SmartInsight[] = [];

  if (budgetRisk === "NO_BUDGET") {
    insights.push({
      id: "no-budget",
      title: "Set an Energy Budget",
      message:
        "Add a monthly electricity budget in the Smart Energy Planner to unlock budget risk analysis and more personalized cost insights.",
      severity: "INFO",
    });
  }

  if (budgetRisk === "LOW") {
    insights.push({
      id: "budget-low",
      title: "Healthy Budget Position",
      message: `Your estimated electricity cost uses approximately ${Math.round(
        budgetUsagePercentage,
      )}% of your monthly energy budget, giving you a comfortable cost buffer.`,
      severity: "POSITIVE",
    });
  }

  if (budgetRisk === "MODERATE") {
    const message =
      budgetDifference > 0
        ? `Your projected monthly electricity cost is approximately ₦${Math.round(
            budgetDifference,
          ).toLocaleString()} above your current budget. Small usage adjustments could bring your plan back within target.`
        : `Your estimated electricity cost is approaching your monthly budget limit. Monitor high-consumption appliances to avoid exceeding your target.`;

    insights.push({
      id: "budget-moderate",
      title: "Budget Needs Attention",
      message,
      severity: "WARNING",
    });
  }

  if (budgetRisk === "HIGH") {
    insights.push({
      id: "budget-high",
      title: "High Budget Risk",
      message: `Your projected monthly electricity cost exceeds your budget by approximately ₦${Math.round(
        Math.max(budgetDifference, 0),
      ).toLocaleString()}. Prioritize reducing usage from your largest energy cost drivers.`,
      severity: "WARNING",
    });
  }

  if (budgetRisk === "CRITICAL") {
    insights.push({
      id: "budget-critical",
      title: "Critical Budget Risk",
      message: `Your projected electricity cost is more than 75% above your planned monthly budget. Your current appliance usage pattern may be financially difficult to sustain without major adjustments.`,
      severity: "CRITICAL",
    });
  }

  if (topConsumerName) {
    const severity =
      topConsumerPercentage >= 60
        ? "WARNING"
        : "INFO";

    insights.push({
      id: "top-consumer",
      title: "Largest Energy Cost Driver",
      message: `${topConsumerName} contributes approximately ${Math.round(
        topConsumerPercentage,
      )}% of your estimated electricity consumption. Changes to this appliance may have the greatest impact on your monthly energy cost.`,
      severity,
    });
  }

  if (potentialMonthlySavings > 0) {
    insights.push({
      id: "savings-opportunity",
      title: "Potential Savings Identified",
      message: `PowerCheckNG identified usage adjustments that could reduce your estimated monthly electricity cost by approximately ₦${Math.round(
        potentialMonthlySavings,
      ).toLocaleString()}.`,
      severity: "POSITIVE",
    });
  }

  if (score >= 90) {
    insights.push({
      id: "excellent-score",
      title: "Excellent Energy Profile",
      message: `Your Energy Health Score is ${score}/100. Your current appliance usage and budget alignment indicate a highly efficient energy plan.`,
      severity: "POSITIVE",
    });
  } else if (score >= 70) {
    insights.push({
      id: "good-score",
      title: "Good Energy Profile",
      message: `Your Energy Health Score is ${score}/100. Your plan is generally healthy, although targeted adjustments could further improve efficiency and cost control.`,
      severity: "INFO",
    });
  } else {
    insights.push({
      id: "score-needs-attention",
      title: "Energy Profile Needs Attention",
      message: `Your Energy Health Score is ${score}/100. Review your highest-consuming appliances and budget position to improve the efficiency of your current energy plan.`,
      severity: "WARNING",
    });
  }

  return insights;
}

export function generateEnergyInsights(
  appliances: Appliance[],
  budget: number,
): EnergyInsightProfile {
  const analysis = analyzeEnergyPlan(
    appliances,
    budget,
  );

  const selectedApplianceCount =
    appliances.filter(
      (appliance) => appliance.selected,
    ).length;

  const budgetDifference =
    analysis.monthlyCost - budget;

  const budgetUsagePercentage =
    budget > 0
      ? (analysis.monthlyCost / budget) * 100
      : 0;

  const budgetRisk = calculateBudgetRisk(
    analysis.monthlyCost,
    budget,
  );

  const topConsumer =
    analysis.breakdown[0] ?? null;

  const savingsOpportunities =
    calculateSavingsOpportunities(appliances);

  const potentialMonthlySavings =
    savingsOpportunities.reduce(
      (total, opportunity) =>
        total +
        opportunity.estimatedMonthlySavings,
      0,
    );

  const insights = buildSmartInsights({
    budget,
    budgetRisk,
    budgetDifference,
    budgetUsagePercentage,
    topConsumerName:
      topConsumer?.name ?? null,
    topConsumerPercentage:
      topConsumer?.percentage ?? 0,
    score: analysis.score,
    potentialMonthlySavings,
  });

  return {
    analysis,
    budget,
    budgetRisk,
    budgetDifference,
    budgetUsagePercentage,
    topConsumer,
    selectedApplianceCount,
    potentialMonthlySavings,
    savingsOpportunities,
    insights,
  };
}