import type { BackupRecommendation, BackupType, GeneratorRecommendation } from "./backupAdvisor";

type DisplayModel = {
  system: string;

  runtime: string;

  cost: number;

  capacity: number;

  items: string[];

  note: string;

  confidence: string;

  suitability: number;

  upgradeAdvice: string;

  reason: string;
};

export function buildBackupDisplayModel(
  technology: BackupType,
  inverter: BackupRecommendation,
  generator: GeneratorRecommendation,
): DisplayModel {

const hybridSuitability = Math.round(
  (inverter.suitability + generator.suitability) / 2,
);

const hybridConfidence =
  hybridSuitability >= 90
    ? "High"
    : hybridSuitability >= 75
      ? "Good"
      : hybridSuitability >= 60
        ? "Limited"
        : "Low";

  switch (technology) {
    case "GENERATOR":
      return {
        system: generator.name,

        runtime: "Unlimited (Fuel Dependent)",

        cost: generator.estimatedCost,

        capacity: generator.maxLoad,

        confidence:
  generator.suitability >= 90
    ? "High"
    : generator.suitability >= 75
      ? "Good"
      : generator.suitability >= 60
        ? "Limited"
        : "Low",

suitability: generator.suitability,

        reason: generator.reason,

        upgradeAdvice:
  "If your power demand increases in the future, consider moving to a higher-capacity generator or a hybrid backup system for greater flexibility and longer-term reliability.",
        items: [
          "✓ Generator",
          "✓ Initial fuel",
          "✓ Basic installation materials",
          "✓ Standard electrical accessories",
        ],

        note: "Actual costs depend on generator brand, fuel type, installation requirements, and current market prices.",
      };

    case "HYBRID":
      return {
        system: "Hybrid Backup System",

        runtime: `${inverter.estimatedRuntime} Hours + Generator`,

        cost: inverter.estimatedCost + generator.estimatedCost,

        capacity: Math.max(inverter.maxLoad, generator.maxLoad),

        confidence: hybridConfidence,

suitability: hybridSuitability,

reason:
  "A hybrid backup system offers the best balance for your energy needs. The inverter efficiently powers your everyday essential appliances during shorter outages, while the generator provides additional support whenever higher loads or prolonged outages occur.",

upgradeAdvice:
  "This configuration already provides excellent flexibility. Future upgrades can focus on increasing battery storage or integrating renewable energy such as solar panels.",

        items: ["✓ Inverter", "✓ Battery configuration", "✓ Generator", "✓ Installation materials"],

        note: "Hybrid systems combine inverter and generator costs, providing greater flexibility and reliability.",
      };

    default:
      return {
        system: inverter.inverter,

        runtime: `${inverter.estimatedRuntime} Hours`,

        cost: inverter.estimatedCost,

        capacity: inverter.maxLoad,

        confidence:
  inverter.suitability >= 90
    ? "High"
    : inverter.suitability >= 75
      ? "Good"
      : inverter.suitability >= 60
        ? "Limited"
        : "Low",

suitability: inverter.suitability,

reason: inverter.reason,

upgradeAdvice:
  inverter.maxLoad < 1500
    ? "If you expect to add more appliances in the future, consider upgrading to a larger inverter system when your electricity demand increases."
    : inverter.maxLoad < 2500
      ? "This system provides some room for expansion. If you later add heavy appliances such as an Air Conditioner or Chest Freezer, consider moving to the next inverter size."
      : "This recommendation already provides substantial capacity for future expansion based on your current energy profile.",

        items: [
          "✓ Inverter",
          "✓ Recommended battery configuration",
          "✓ Basic installation materials",
          "✓ Standard electrical accessories",
        ],

        note: "Actual costs depend on inverter brand, battery technology, installation complexity, and current market prices.",
      };
  }
}
