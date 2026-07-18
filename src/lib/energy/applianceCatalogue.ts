export type CatalogueAppliance = {
  id: string;
  name: string;
  category:
  | "Cooling"
  | "Entertainment"
  | "Kitchen"
  | "Office"
  | "Laundry"
  | "Lighting"
  | "Water"
  | "Security"
  | "Workshop & Business";

  watts: number;
  defaultHours: number;
};

export const APPLIANCE_CATALOGUE: CatalogueAppliance[] = [
  // Cooling
  {
    id: "air-conditioner",
    name: "Air Conditioner",
    category: "Cooling",
    watts: 1500,
    defaultHours: 8,
  },
  {
    id: "ceiling-fan",
    name: "Ceiling Fan",
    category: "Cooling",
    watts: 80,
    defaultHours: 10,
  },
  {
    id: "standing-fan",
    name: "Standing Fan",
    category: "Cooling",
    watts: 70,
    defaultHours: 10,
  },
  {
    id: "chest-freezer",
    name: "Chest Freezer",
    category: "Cooling",
    watts: 350,
    defaultHours: 24,
  },

  // Entertainment
  {
    id: "home-theatre",
    name: "Home Theatre",
    category: "Entertainment",
    watts: 150,
    defaultHours: 4,
  },

  // Kitchen
  {
    id: "microwave",
    name: "Microwave",
    category: "Kitchen",
    watts: 1200,
    defaultHours: 0.5,
  },
  {
    id: "electric-kettle",
    name: "Electric Kettle",
    category: "Kitchen",
    watts: 1800,
    defaultHours: 0.5,
  },
  {
    id: "blender",
    name: "Blender",
    category: "Kitchen",
    watts: 350,
    defaultHours: 0.25,
  },

  // Office
  {
    id: "laptop",
    name: "Laptop",
    category: "Office",
    watts: 65,
    defaultHours: 6,
  },
  {
    id: "desktop",
    name: "Desktop Computer",
    category: "Office",
    watts: 250,
    defaultHours: 6,
  },
  {
    id: "printer",
    name: "Printer",
    category: "Office",
    watts: 100,
    defaultHours: 1,
  },

  // Laundry
  {
    id: "washing-machine",
    name: "Washing Machine",
    category: "Laundry",
    watts: 500,
    defaultHours: 1,
  },
  {
    id: "electric-iron",
    name: "Electric Iron",
    category: "Laundry",
    watts: 1000,
    defaultHours: 1,
  },

  // Water
  {
    id: "borehole-pump",
    name: "Borehole Pump",
    category: "Water",
    watts: 1100,
    defaultHours: 1,
  },

  // Security
{
  id: "cctv-camera",
  name: "CCTV Camera",
  category: "Security",
  watts: 15,
  defaultHours: 24,
},

// Workshop & Business
{
  id: "pos-terminal",
  name: "POS Terminal",
  category: "Workshop & Business",
  watts: 15,
  defaultHours: 10,
},
{
  id: "photocopier",
  name: "Photocopier",
  category: "Workshop & Business",
  watts: 900,
  defaultHours: 2,
},
{
  id: "hair-clipper",
  name: "Hair Clipper",
  category: "Workshop & Business",
  watts: 20,
  defaultHours: 4,
},
{
  id: "hair-dryer",
  name: "Hair Dryer",
  category: "Workshop & Business",
  watts: 1800,
  defaultHours: 1,
},
];