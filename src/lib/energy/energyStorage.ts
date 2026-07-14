import type { Appliance } from "./energy.types";

const APPLIANCES_STORAGE_KEY =
  "powercheckng-energy-appliances";

const BUDGET_STORAGE_KEY =
  "powercheckng-energy-budget";

export function loadSavedAppliances():
  | Appliance[]
  | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const saved = window.localStorage.getItem(
      APPLIANCES_STORAGE_KEY,
    );

    if (!saved) {
      return null;
    }

    const parsed: unknown = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return null;
    }

    return parsed as Appliance[];
  } catch (error) {
    console.error(
      "Failed to load saved appliances:",
      error,
    );

    return null;
  }
}

export function saveAppliances(
  appliances: Appliance[],
) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      APPLIANCES_STORAGE_KEY,
      JSON.stringify(appliances),
    );
  } catch (error) {
    console.error(
      "Failed to save appliances:",
      error,
    );
  }
}

export function loadSavedBudget(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage.getItem(
      BUDGET_STORAGE_KEY,
    );
  } catch (error) {
    console.error(
      "Failed to load saved budget:",
      error,
    );

    return null;
  }
}

export function saveBudget(budget: string) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      BUDGET_STORAGE_KEY,
      budget,
    );
  } catch (error) {
    console.error(
      "Failed to save budget:",
      error,
    );
  }
}