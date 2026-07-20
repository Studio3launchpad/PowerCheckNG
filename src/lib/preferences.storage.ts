import {
  DEFAULT_PREFERENCES,
  type UserPreferences,
} from "./preferences.types";

const PREFERENCES_STORAGE_KEY =
  "powercheckng-user-preferences";

export function loadPreferences():
  | UserPreferences
  | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const saved = window.localStorage.getItem(
      PREFERENCES_STORAGE_KEY,
    );

    if (!saved) {
      return null;
    }

    return JSON.parse(saved) as UserPreferences;
  } catch (error) {
    console.error(
      "Failed to load preferences:",
      error,
    );

    return null;
  }
}

export function savePreferences(
  preferences: UserPreferences,
) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      PREFERENCES_STORAGE_KEY,
      JSON.stringify(preferences),
    );
  } catch (error) {
    console.error(
      "Failed to save preferences:",
      error,
    );
  }
}

export function getPreferences() {
  return (
    loadPreferences() ??
    DEFAULT_PREFERENCES
  );
}