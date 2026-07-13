import { Zap, Plus, RefreshCcw } from "lucide-react";

type OutageHeaderProps = {
  onUpdateLocation: () => void;
  onRefresh: () => void;
};

export function OutageHeader({
  onUpdateLocation,
  onRefresh,
}: OutageHeaderProps) {
  return (
    <header className="flex items-end justify-between flex-wrap gap-3">
      <div>
        <h1 className="text-3xl font-display font-bold flex items-center gap-2">
          <Zap className="size-7 text-primary" />
          Outage Tracker
        </h1>

        <p className="text-sm text-muted-foreground mt-1">
          Live outage reports from your area. Confirm, report, restore.
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onUpdateLocation}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 glow-primary"
        >
          <Plus className="size-4" />
          Update My Power Status
        </button>

        <button
          onClick={onRefresh}
          className="rounded-xl border border-border px-4 py-2 flex items-center gap-2"
        >
          <RefreshCcw size={16} />
          Refresh
        </button>
      </div>
    </header>
  );
}