import {
  Zap,
  Plus,
  RefreshCcw,
  LoaderCircle,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

type OutageHeaderProps = {
  onUpdateLocation: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  isLocating: boolean;
};

export function OutageHeader({
  onUpdateLocation,
  onRefresh,
  isRefreshing,
  isLocating,
}: OutageHeaderProps) {
  return (
    <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-2">
        <h1 className="flex items-center gap-2 text-2xl font-bold font-display sm:text-3xl">
          <Zap className="size-6 text-primary sm:size-7" />
          Outage Tracker
        </h1>

        <p className="max-w-2xl text-sm text-muted-foreground">
          Live outage reports from your area. Confirm, report and stay informed
          about your community's power status.
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:justify-end">
        <button
          type="button"
          onClick={onUpdateLocation}
          disabled={isLocating}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto glow-primary"
        >
          {isLocating ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <Plus className="size-4" />
          )}

          {isLocating
            ? "Getting Location..."
            : "Update My Power Status"}
        </button>

        <Link
          to="/history"
          className="inline-flex w-full items-center justify-center rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition hover:bg-accent/20 sm:w-auto"
        >
          Report History
        </Link>

        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          title="Refresh reports"
          className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-border transition hover:bg-accent/20 disabled:opacity-70 sm:h-auto sm:w-11"
        >
          <RefreshCcw
            size={18}
            className={isRefreshing ? "animate-spin" : ""}
          />
        </button>
      </div>
    </header>
  );
}