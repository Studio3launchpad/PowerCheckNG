import type {
  Appliance,
  EnergyAnalysis,
} from "./energy.types";

const APPLIANCES_STORAGE_KEY =
  "powercheckng-energy-appliances";

const BUDGET_STORAGE_KEY =
  "powercheckng-energy-budget";

const ANALYSIS_STORAGE_KEY =
  "powercheckng-energy-analysis";

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

export function saveEnergyAnalysis(
  analysis: EnergyAnalysis,
) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      ANALYSIS_STORAGE_KEY,
      JSON.stringify({
        analysis,
        savedAt: Date.now(),
      }),
    );
  } catch (error) {
    console.error(
      "Failed to save analysis:",
      error,
    );
  }
}

export function loadEnergyAnalysis():
  | EnergyAnalysis
  | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const saved =
      window.localStorage.getItem(
        ANALYSIS_STORAGE_KEY,
      );

    if (!saved) {
      return null;
    }

    const parsed = JSON.parse(saved);

    /*
     * Planner expires after
     * 30 minutes.
     */
    const expired =
      Date.now() - parsed.savedAt >
      30 * 60 * 1000;

    if (expired) {
      window.localStorage.removeItem(
        ANALYSIS_STORAGE_KEY,
      );

      return null;
    }

    return parsed.analysis;
  } catch (error) {
    console.error(
      "Failed to load analysis:",
      error,
    );

    return null;
  }
}