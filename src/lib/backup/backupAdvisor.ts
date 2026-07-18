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
  type: BackupType;

  title: string;

  name: string;

  estimatedCost: number;

  maxLoad: number;

  fuelCost: string;

  maintenance: string;

  reason: string;

  suitability: number;
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

  let reason: string;

  if (system.maxLoad <= 500) {
    reason =
      "An inverter is the most practical choice for your selected appliances because their combined outage load is relatively low. It provides quiet operation, lower running costs, and sufficient backup capacity for your essential appliances while leaving room for modest future expansion.";
  } else if (system.maxLoad <= 1800) {
    reason =
      "Your energy needs are well suited to an inverter system. It provides reliable backup for your essential appliances while maintaining good efficiency and lower operating costs compared to fuel-powered alternatives.";
  } else {
    reason =
      "Your energy demand is approaching the upper range for residential inverter systems. This recommendation provides enough capacity for your current essential appliances while allowing room for future expansion if your energy needs grow.";
  }

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

export function recommendGenerator(peakLoad: number): GeneratorRecommendation {
  const system =
    GENERATOR_SYSTEMS.find((generator) => peakLoad <= generator.maxLoad) ??
    GENERATOR_SYSTEMS[GENERATOR_SYSTEMS.length - 1];

  let suitability: number;

  if (peakLoad > GENERATOR_SYSTEMS[GENERATOR_SYSTEMS.length - 1].maxLoad) {
    suitability = 65;
  } else {
    const loadScore = Math.max(70, 100 - Math.abs(system.maxLoad - peakLoad) / 30);

    suitability = Math.round(loadScore);
  }

  return {
    type: "GENERATOR",

    title: "Recommended Generator",

    suitability,

    ...system,

    reason:
      "A generator is recommended because your outage power demand is relatively high and may need to be sustained for extended periods. It can comfortably support heavier appliances and avoids the runtime limitations associated with battery-only backup systems.",
  };
}

export function buildBackupAdvisor(analysis: EnergyAnalysis) {
  const inverterRecommendation = recommendBackupSystem(analysis.peakLoad, analysis.dailyUsage);

  const generatorRecommendation = recommendGenerator(analysis.peakLoad);

  const readinessScore = calculateBackupReadiness(
    analysis.peakLoad,
    analysis.essentialApplianceCount,
  );

  let bestTechnology: BackupType;

  if (analysis.peakLoad <= 1800) {
    bestTechnology = "INVERTER";
  } else if (analysis.peakLoad <= 3000) {
    bestTechnology = analysis.essentialApplianceCount >= 4 ? "HYBRID" : "GENERATOR";
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
