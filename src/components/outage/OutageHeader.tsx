import {
  Zap,
  Plus,
  RefreshCcw,
  LoaderCircle,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/PageHeader";

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
      <PageHeader
          icon={Zap}
          title="Outage Tracker"
          description="Live outage reports from your area. Confirm, report and stay informed
          about your community's power status."
        />

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
        <button
          type="button"
          onClick={onUpdateLocation}
          disabled={isLocating}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 h-11 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto glow-primary"
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
          className="inline-flex w-full items-center justify-center rounded-2xl border border-border px-4 h-11 text-sm font-medium transition hover:bg-accent/20 sm:w-auto"
        >
          Report History
        </Link>

        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          title="Refresh reports"
          className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-border transition hover:bg-accent/20 disabled:opacity-70 sm:h-11 sm:w-11"
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