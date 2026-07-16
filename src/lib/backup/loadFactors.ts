export const LOAD_FACTORS: Record<
  string,
  {
    surgeMultiplier: number;
  }
> = {
  Fan: {
    surgeMultiplier: 1,
  },

  "Ceiling Fan": {
    surgeMultiplier: 1,
  },

  "Standing Fan": {
    surgeMultiplier: 1,
  },

  Television: {
    surgeMultiplier: 1,
  },

  Refrigerator: {
    surgeMultiplier: 3,
  },

  "Chest Freezer": {
    surgeMultiplier: 3,
  },

  "Air Conditioner": {
    surgeMultiplier: 2.5,
  },

  "Water Pump": {
    surgeMultiplier: 3,
  },

  "Electric Iron": {
    surgeMultiplier: 1,
  },

  "Washing Machine": {
    surgeMultiplier: 2,
  },

  Microwave: {
    surgeMultiplier: 1.5,
  },

  Blender: {
    surgeMultiplier: 2,
  },

  "Rice Cooker": {
    surgeMultiplier: 1,
  },

  "Electric Kettle": {
    surgeMultiplier: 1,
  },

  Laptop: {
    surgeMultiplier: 1,
  },

  "Desktop Computer": {
    surgeMultiplier: 1,
  },

  Printer: {
    surgeMultiplier: 1,
  },

  "Security Light": {
    surgeMultiplier: 1,
  },

  "Borehole Pump": {
    surgeMultiplier: 3,
  },
};