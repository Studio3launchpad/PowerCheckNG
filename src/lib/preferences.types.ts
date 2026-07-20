export interface UserPreferences {
  appearance: "system" | "light" | "dark";

  notifications: {
    email: boolean;
    outageAlerts: boolean;
    weeklySummary: boolean;
  };

  privacy: {
    anonymousReports: boolean;
    analytics: boolean;
  };
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  appearance: "system",

  notifications: {
    email: true,
    outageAlerts: true,
    weeklySummary: true,
  },

  privacy: {
    anonymousReports: true,
    analytics: true,
  },
};