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
}: Props) {
  return (
    <div className="space-y-4">
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
        <select
  value={status}
  onChange={(e) => onStatusChange(e.target.value)}
  className="rounded-xl border border-border bg-background/50 px-3 py-3"
>
  <option value="">All Status</option>

  {statuses.map((s) => (
    <option key={s} value={s}>
      {s}
    </option>
  ))}
</select>

        <select
          value={disco}
          onChange={(e) => onDiscoChange(e.target.value)}
          className="rounded-xl border border-border bg-background/50 px-3 py-3"
        >
          <option value="">All DisCos</option>

          {discos.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select className="rounded-xl border border-border bg-background/50 px-3 py-3">
          <option>All Dates</option>
        </select>
      </div>
    </div>
  );
}
