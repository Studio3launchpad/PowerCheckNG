import type {
  ApplianceBreakdown,
  EnergyAnalysis,
} from "@/lib/energy/energy.types";

export type BudgetRisk =
  | "NO_BUDGET"
  | "LOW"
  | "MODERATE"
  | "HIGH"
  | "CRITICAL";

export type InsightSeverity =
  | "POSITIVE"
  | "INFO"
  | "WARNING"
  | "CRITICAL";

export type SmartInsight = {
  id: string;
  title: string;
  message: string;
  severity: InsightSeverity;
};

export type SavingsOpportunity = {
  appliance: string;
  action: string;
  estimatedMonthlySavings: number;
};

export type EnergyInsightProfile = {
  analysis: EnergyAnalysis;

  budget: number;

  budgetRisk: BudgetRisk;

  budgetDifference: number;

  budgetUsagePercentage: number;

  topConsumer: ApplianceBreakdown | null;

  selectedApplianceCount: number;

  potentialMonthlySavings: number;

  savingsOpportunities: SavingsOpportunity[];

  insights: SmartInsight[];
};