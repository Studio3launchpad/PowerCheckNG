import { ChevronDown } from "lucide-react";

type Props = {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
};

export function BackupOptionSection({ title, open, onToggle, children }: Props) {
  return (
    <section className="overflow-hidden rounded-2xl border border-border">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-2xl px-5 py-4 text-left transition-all duration-200 hover:bg-muted/40"
      >
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {title}
        </h3>

        <ChevronDown
          className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
            open ? "rotate-180 text-primary" : "text-muted-foreground"
          }`}
        />
      </button>

      {open && <div className="space-y-4 border-t border-border p-4">{children}</div>}
    </section>
  );
}
