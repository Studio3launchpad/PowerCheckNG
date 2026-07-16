import { ChevronDown } from "lucide-react";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;

  disco: string;
  onDiscoChange: (value: string) => void;
  discos: string[];

  status: string;
  onStatusChange: (value: string) => void;
  statuses: string[];

  onClearFilters: () => void;

  date: string;
  onDateChange: (value: string) => void;
};

export function HistoryFilters({
  search,
  onSearchChange,
  disco,
  onDiscoChange,
  discos,
  status,
  onStatusChange,
  statuses,
  onClearFilters,
  date,
  onDateChange,
}: Props) {
  return (
    <div className="sticky top-4 z-20 rounded-2xl border border-border bg-background/90 backdrop-blur p-4 space-y-4">
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="🔍 Search by area..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="
      flex-1
      rounded-xl
      border
      border-border
      bg-background/50
      px-4
      py-3
      outline-none
      focus:border-primary
    "
        />

        <button
          onClick={onClearFilters}
          className="rounded-xl border border-border px-4 hover:bg-white/5"
        >
          Clear
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="relative">

<select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="w-full
            appearance-none
            rounded-xl
            border
            border-border
            bg-background/50
            px-4
            py-3
            pr-10"
        >
          <option value="">All Status</option>

          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <ChevronDown
    className="
        pointer-events-none
        absolute
        right-4
        top-1/2
        -translate-y-1/2
        size-5
        text-muted-foreground
    "
/>

        </div>

        <div className="relative">
          <select
          value={disco}
          onChange={(e) => onDiscoChange(e.target.value)}
          className="w-full
            appearance-none
            rounded-xl
            border
            border-border
            bg-background/50
            px-4
            py-3
            pr-10"
        >
          <option value="">All DisCos</option>

          {discos.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <ChevronDown
    className="
        pointer-events-none
        absolute
        right-4
        top-1/2
        -translate-y-1/2
        size-5
        text-muted-foreground
    "
/>
        </div>

        <div className="space-y-1">

  <input
    type="date"
    value={date}
    onChange={(e) => onDateChange(e.target.value)}
    className="w-full rounded-xl border border-border bg-background/50 px-3 py-3 [color-scheme:dark]"
  />

  <p className="text-xs text-muted-foreground">
    Type a date (DD/MM/YYYY) or click the calendar icon.
  </p>
</div>
      </div>
    </div>
  );
}
