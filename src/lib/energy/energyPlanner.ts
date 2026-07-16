import type {
  Appliance,
  ApplianceBreakdown,
  EnergyAnalysis,
} from "./energy.types";

import { ESTIMATED_TARIFF_PER_KWH } from "./energy.constants";

import { LOAD_FACTORS } from "@/lib/backup/loadFactors";




export function analyzeEnergyPlan(
  appliances: Appliance[],
  budget: number,
): EnergyAnalysis {
  const selectedAppliances = appliances.filter(
    (appliance) => appliance.selected,
  );

  const applianceCount =
  selectedAppliances.length;

const totalSelectedWatts =
  selectedAppliances.reduce(
    (total, appliance) =>
      total +
      appliance.watts * appliance.quantity,
    0,
  );

const essentialAppliances =
  selectedAppliances.filter(
    (appliance) => appliance.essential,
  );

/*
 * Use essential appliances where available.
 * Otherwise fall back to all selected appliances.
 */
const appliancesForBackup =
  essentialAppliances.length > 0
    ? essentialAppliances
    : selectedAppliances;

    const essentialApplianceCount =
  essentialAppliances.length;

const peakLoad = Math.round(
  appliancesForBackup.reduce(
    (total, appliance) => {
     const factor =
  LOAD_FACTORS[appliance.name]?.surgeMultiplier ??
  1;

return (
  total +
  appliance.watts *
  appliance.quantity *
  factor
);
    },
    0,
  ),
);

  const dailyUsage = selectedAppliances.reduce(
    (total, appliance) => {
      const applianceDailyUsage =
        (appliance.watts *
          appliance.quantity *
          appliance.hours) /
        1000;

      return total + applianceDailyUsage;
    },
    0,
  );

  const monthlyUsage = dailyUsage * 30;

  const monthlyCost =
    monthlyUsage * ESTIMATED_TARIFF_PER_KWH;

  const breakdown: ApplianceBreakdown[] =
    selectedAppliances
      .map((appliance) => {
        const usage =
          (appliance.watts *
            appliance.quantity *
            appliance.hours *
            30) /
          1000;

        const cost =
          usage * ESTIMATED_TARIFF_PER_KWH;

        return {
          name: appliance.name,
          usage,
          cost,
          percentage:
            monthlyUsage > 0
              ? (usage / monthlyUsage) * 100
              : 0,
        };
      })
      .sort((a, b) => b.usage - a.usage);

  const highestConsumer =
    breakdown[0]?.name ?? "None";

  let score = 100;

  /*
   * Budget alignment
   */
  if (budget > 0 && monthlyCost > budget) {
    const overBudgetPercentage =
      ((monthlyCost - budget) / budget) * 100;

    if (overBudgetPercentage >= 100) {
      score -= 35;
    } else if (overBudgetPercentage >= 50) {
      score -= 25;
    } else if (overBudgetPercentage >= 20) {
      score -= 15;
    } else {
      score -= 10;
    }
  }

  /*
   * Consumption concentration
   *
   * A plan is less balanced when one appliance
   * dominates total electricity consumption.
   */
  const topConsumer = breakdown[0];

  if (topConsumer) {
    if (topConsumer.percentage >= 70) {
      score -= 15;
    } else if (topConsumer.percentage >= 50) {
      score -= 10;
    }
  }

  /*
   * Extreme usage patterns
   */
  const extremeUsageCount =
    selectedAppliances.filter(
      (appliance) =>
        appliance.hours > 18 &&
        appliance.name !== "Refrigerator",
    ).length;

  score -= extremeUsageCount * 5;

  score = Math.max(40, Math.min(score, 100));

  const recommendations: string[] = [];

  /*
   * Highest consuming appliance
   */
  if (topConsumer) {
    recommendations.push(
      `${topConsumer.name} contributes approximately ${Math.round(
        topConsumer.percentage,
      )}% of your estimated electricity consumption. Optimizing its usage could have the greatest impact on your energy cost.`,
    );
  }

  /*
   * Budget recommendation
   */
  if (budget > 0 && monthlyCost > budget) {
    const budgetDifference = monthlyCost - budget;

    recommendations.push(
      `Your estimated monthly electricity cost exceeds your budget by approximately ₦${Math.round(
        budgetDifference,
      ).toLocaleString()}. Consider reducing the usage duration of your highest-consuming appliances.`,
    );
  } else if (budget > 0) {
    const remainingBudget = budget - monthlyCost;

    recommendations.push(
      `Your current energy plan is within budget, leaving an estimated ₦${Math.round(
        remainingBudget,
      ).toLocaleString()} of your monthly electricity budget.`,
    );
  }

  /*
   * Air conditioner recommendation
   */
  const airConditioner = selectedAppliances.find(
    (appliance) =>
      appliance.name === "Air Conditioner",
  );

  if (
    airConditioner &&
    airConditioner.hours > 6
  ) {
    const estimatedSavings =
      ((airConditioner.watts *
        2 *
        airConditioner.quantity *
        30) /
        1000) *
      ESTIMATED_TARIFF_PER_KWH;

    recommendations.push(
      `Reducing your Air Conditioner usage by 2 hours per day could lower your estimated monthly electricity cost by about ₦${Math.round(
        estimatedSavings,
      ).toLocaleString()}.`,
    );
  }

  /*
   * Refrigerator recommendation
   */
  const refrigerator = selectedAppliances.find(
    (appliance) =>
      appliance.name === "Refrigerator",
  );

  if (refrigerator) {
    recommendations.push(
      "Keeping your refrigerator door closed as much as possible and maintaining proper ventilation around the appliance can help reduce unnecessary energy consumption.",
    );
  }

  /*
   * Electric iron recommendation
   */
  const electricIron = selectedAppliances.find(
    (appliance) =>
      appliance.name === "Electric Iron",
  );

  if (
    electricIron &&
    electricIron.hours > 1
  ) {
    const estimatedSavings =
      ((electricIron.watts *
        0.5 *
        electricIron.quantity *
        30) /
        1000) *
      ESTIMATED_TARIFF_PER_KWH;

    recommendations.push(
      `Ironing clothes in batches and reducing daily ironing time by 30 minutes could save approximately ₦${Math.round(
        estimatedSavings,
      ).toLocaleString()} each month.`,
    );
  }

  /*
   * Water pump recommendation
   */
  const waterPump = selectedAppliances.find(
    (appliance) =>
      appliance.name === "Water Pump",
  );

  if (waterPump && waterPump.hours > 2) {
    const estimatedSavings =
      ((waterPump.watts *
        waterPump.quantity *
        30) /
        1000) *
      ESTIMATED_TARIFF_PER_KWH;

    recommendations.push(
      `Reducing Water Pump usage by 1 hour per day could save around ₦${Math.round(
        estimatedSavings,
      ).toLocaleString()} monthly.`,
    );
  }

  /*
   * High efficiency recommendation
   */
  if (score >= 90) {
    recommendations.push(
      "Your current appliance usage pattern is highly energy efficient based on your estimated consumption and budget.",
    );
  }

  /*
   * General PowerCheckNG recommendation
   */
  recommendations.push(
    "Where practical, schedule high-power appliances during periods of public electricity availability to reduce dependence on generators or battery backup systems.",
  );

  return {
  dailyUsage,
  monthlyUsage,
  monthlyCost,

  score,

  highestConsumer,

  recommendations,

  breakdown,

  peakLoad,

  totalSelectedWatts,

  applianceCount,

  essentialApplianceCount,
};
}