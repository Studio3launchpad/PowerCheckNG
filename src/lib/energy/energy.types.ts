export type Appliance = {
  id: string;
  name: string;
  selected: boolean;
  watts: number;
  quantity: number;
  hours: number;
};

export type ApplianceBreakdown = {
  name: string;
  usage: number;
  cost: number;
  percentage: number;
};

export type EnergyAnalysis = {
  dailyUsage: number;
  monthlyUsage: number;
  monthlyCost: number;
  score: number;
  highestConsumer: string;
  recommendations: string[];
  breakdown: ApplianceBreakdown[];
};