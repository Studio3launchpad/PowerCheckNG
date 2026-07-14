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
  },
  {
    id: "television",
    name: "Television",
    selected: true,
    watts: 120,
    quantity: 1,
    hours: 6,
  },
  {
    id: "refrigerator",
    name: "Refrigerator",
    selected: true,
    watts: 180,
    quantity: 1,
    hours: 24,
  },
  {
    id: "air-conditioner",
    name: "Air Conditioner",
    selected: false,
    watts: 1500,
    quantity: 1,
    hours: 8,
  },
  {
    id: "water-pump",
    name: "Water Pump",
    selected: false,
    watts: 750,
    quantity: 1,
    hours: 1,
  },
  {
    id: "electric-iron",
    name: "Electric Iron",
    selected: false,
    watts: 1000,
    quantity: 1,
    hours: 1,
  },
];