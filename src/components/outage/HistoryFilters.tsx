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
    <div className="sticky top-0 z-40 -mx-4 border-b border-border bg-background/95 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:mx-0 sm:rounded-2xl sm:border sm:px-5">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="🔍 Search by area..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="
      flex-1
      rounded-2xl
      border
      border-border
      bg-background/50
      px-4
      py-3
      outline-none
      mb-3
      focus:border-primary
    "
        />

        <button
          onClick={onClearFilters}
          className="w-full rounded-2xl border border-border px-4 py-3 hover:bg-white/5 sm:w-auto mb-3"
        >
          Clear
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="relative">
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full
            appearance-none
            rounded-2xl
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
            rounded-2xl
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
            className="w-full rounded-2xl border border-border bg-background/50 px-3 py-3 [color-scheme:dark]"
          />

          <p className="text-xs text-muted-foreground">Filter reports by date.</p>
        </div>
      </div>
    </div>
  );
}
