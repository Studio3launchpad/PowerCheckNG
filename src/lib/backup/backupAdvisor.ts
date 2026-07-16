import type { EnergyAnalysis } from "@/lib/energy/energy.types";
import { calculateBackupReadiness } from "./readiness";

export const BACKUP_SYSTEMS = [
  {
    inverter: "850VA Inverter",
    maxLoad: 500,
    battery: "100Ah",
    runtimeFactor: 0.8,
    estimatedCost: 320000,
  },

  {
    inverter: "1.5kVA Inverter",
    maxLoad: 1000,
    battery: "200Ah",
    runtimeFactor: 1,
    estimatedCost: 780000,
  },

  {
    inverter: "2.5kVA Inverter",
    maxLoad: 1800,
    battery: "200Ah x2",
    runtimeFactor: 1.4,
    estimatedCost: 1450000,
  },

  {
    inverter: "3.5kVA Inverter",
    maxLoad: 2800,
    battery: "220Ah x4",
    runtimeFactor: 2,
    estimatedCost: 2350000,
  },
];

export const GENERATOR_SYSTEMS = [
  {
    name: "2.5kVA Petrol Generator",
    maxLoad: 1800,
    estimatedCost: 260000,
    fuelCost: "Low",
    maintenance: "Moderate",
  },

  {
    name: "3.5kVA Petrol Generator",
    maxLoad: 2800,
    estimatedCost: 430000,
    fuelCost: "Moderate",
    maintenance: "Moderate",
  },

  {
    name: "5.5kVA Petrol Generator",
    maxLoad: 4500,
    estimatedCost: 720000,
    fuelCost: "High",
    maintenance: "Moderate",
  },

  {
    name: "7.5kVA Petrol Generator",
    maxLoad: 6500,
    estimatedCost: 1200000,
    fuelCost: "High",
    maintenance: "High",
  },
];

export type BackupType = "INVERTER" | "GENERATOR" | "HYBRID";

export type BackupRecommendation = {
  type: BackupType;

  title: string;

  inverter: string;

  battery: string;

  estimatedCost: number;

  estimatedRuntime: number;

  suitability: number;

  maxLoad: number;

  reason: string;
};

export type GeneratorRecommendation = {
  name: string;

  estimatedCost: number;

  maxLoad: number;

  fuelCost: string;

  maintenance: string;

  reason: string;
};

export function recommendBackupSystem(peakLoad: number, dailyEnergy: number): BackupRecommendation {
  /*
   * Allow some headroom for
   * startup surge, future appliances,
   * and inverter efficiency.
   */
  const recommendedLoad = Math.round(peakLoad * 1.25);

  const system =
    BACKUP_SYSTEMS.find((system) => recommendedLoad <= system.maxLoad) ??
    BACKUP_SYSTEMS[BACKUP_SYSTEMS.length - 1];

  const estimatedRuntime = Number(((dailyEnergy * system.runtimeFactor) / 2).toFixed(1));

  let suitability: number;

  if (recommendedLoad > BACKUP_SYSTEMS[BACKUP_SYSTEMS.length - 1].maxLoad) {
    suitability = 65;
  } else {
    const loadScore = Math.max(70, 100 - Math.abs(system.maxLoad - recommendedLoad) / 20);

    suitability = Math.round(loadScore);
  }

  const reason = `Your estimated simultaneous backup load is ${peakLoad}W. After applying a 25% safety margin (${recommendedLoad}W), the ${system.inverter} is the most suitable recommendation, providing sufficient capacity for startup surge and future expansion.`;

  return {
    type: "INVERTER",

    title: "Recommended Inverter System",

    inverter: system.inverter,

    battery: system.battery,

    estimatedCost: system.estimatedCost,

    estimatedRuntime,

    suitability,

    maxLoad: system.maxLoad,

    reason,
  };
}

export function recommendGenerator(
  peakLoad: number,
): GeneratorRecommendation {
  const system =
    GENERATOR_SYSTEMS.find(
      (generator) =>
        peakLoad <= generator.maxLoad,
    ) ??
    GENERATOR_SYSTEMS[
      GENERATOR_SYSTEMS.length - 1
    ];

  return {
    ...system,

    reason:
      "Generators are generally more suitable for higher electrical loads, long outages, and appliances with heavy startup requirements such as water pumps and air conditioners.",
  };
}

export function buildBackupAdvisor(analysis: EnergyAnalysis) {
  const inverterRecommendation =
  recommendBackupSystem(analysis.peakLoad, analysis.dailyUsage);

  const generatorRecommendation = recommendGenerator(analysis.peakLoad);

  const readinessScore = calculateBackupReadiness(
    analysis.peakLoad,
    analysis.essentialApplianceCount,
  );

  let bestTechnology: BackupType;

if (analysis.peakLoad <= 1800) {
  bestTechnology = "INVERTER";
} else if (analysis.peakLoad <= 3000) {
  bestTechnology =
    analysis.essentialApplianceCount >= 4
      ? "HYBRID"
      : "GENERATOR";
} else {
  bestTechnology = "GENERATOR";
}
return {
  readinessScore,

  bestTechnology,

  recommendation: inverterRecommendation,

  generatorRecommendation,
};
}
