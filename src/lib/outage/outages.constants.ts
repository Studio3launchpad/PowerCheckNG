export const STATUS_STYLES: Record<string, string> = {
  REPORTED: "bg-warning/15 text-warning border-warning/30",
  CONFIRMED: "bg-destructive/15 text-destructive border-destructive/30",
  RESTORED: "bg-primary/15 text-primary border-primary/30",
  CANCELLED: "bg-muted text-muted-foreground border-border",
};

export const CURRENT_POWER_WINDOW_MS =
  6 * 60 * 60 * 1000;

export const POWER_PATTERN_WINDOW_MS =
  30 * 24 * 60 * 60 * 1000;