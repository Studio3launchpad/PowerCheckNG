import type { Appliance } from "./energy.types";

export const ESTIMATED_TARIFF_PER_KWH = 72;

export const DEFAULT_APPLIANCES: Appliance[] = [
  {
    id: "fan",
    name: "Fan",
    selected: true,
    watts: 75,
    quantity: 2,
    hours: 10,
    essential: true,
  },
  {
    id: "television",
    name: "Television",
    selected: true,
    watts: 120,
    quantity: 1,
    hours: 6,
    essential: false,
  },
  {
    id: "refrigerator",
    name: "Refrigerator",
    selected: true,
    watts: 180,
    quantity: 1,
    hours: 24,
    essential: true,
  },
  {
    id: "standing-freezer",
    name: "Standing Freezer",
    selected: true,
    watts: 450,
    quantity: 1,
    hours: 24,
    essential: true,
  },
  {
    id: "led-bulbs",
    name: "LED Bulbs",
    selected: true,
    watts: 10,
    quantity: 8,
    hours: 6,
    essential: true,
  },
  {
    id: "decoder",
    name: "Decoder",
    selected: true,
    watts: 25,
    quantity: 1,
    hours: 6,
    essential: false,
  },
  {
    id: "wifi-router",
    name: "WiFi Router",
    selected: true,
    watts: 15,
    quantity: 1,
    hours: 24,
    essential: true,
  },
  {
    id: "phone-chargers",
    name: "Phone Chargers",
    selected: true,
    watts: 15,
    quantity: 2,
    hours: 3,
    essential: false,
  },
  {
    id: "water-pump",
    name: "Water Pump",
    selected: false,
    watts: 750,
    quantity: 1,
    hours: 1,
    essential: false,
  },
];

export const APPLIANCE_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "Cooling", label: "Cooling" },
  { id: "Kitchen", label: "Kitchen" },
  { id: "Entertainment", label: "Entertainment" },
  { id: "Office", label: "Office" },
  { id: "Laundry", label: "Laundry" },
  { id: "Water", label: "Water" },
  { id: "Security", label: "Security" },
  {
    id: "Workshop & Business",
    label: "Workshop & Business",
  },
];

export type ApplianceCategory =
  (typeof APPLIANCE_CATEGORIES)[number];

export const POWER_RANGES = [
  {
    id: "very-low",
    label: "Very Low (1–50W)",
    defaultWatts: 25,
  },
  {
    id: "low",
    label: "Low (51–150W)",
    defaultWatts: 100,
  },
  {
    id: "medium",
    label: "Medium (151–500W)",
    defaultWatts: 300,
  },
  {
    id: "high",
    label: "High (501–1500W)",
    defaultWatts: 900,
  },
  {
    id: "very-high",
    label: "Very High (1500W+)",
    defaultWatts: 2500,
  },
] as const;
