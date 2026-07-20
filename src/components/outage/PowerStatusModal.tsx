import { MapPin, Zap, Power, HelpCircle, X } from "lucide-react";

type Props = {
  open: boolean;
  area: string;
  state: string;
  onClose: () => void;
  onSelect: (status: "ON" | "OFF" | "NOT_SURE") => void;
};

export function PowerStatusModal({ open, area, state, onClose, onSelect }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-6">
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0D171B] p-5 shadow-2xl sm:rounded-3xl sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="text-primary" size={22} />
              <h2 className="text-lg font-bold leading-tight sm:text-xl">
                Help Keep Your Community Informed
              </h2>
            </div>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              PowerCheckNG relies on community reports to provide live electricity updates.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition-colors hover:bg-white/10"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-6">
          <p className="mb-4 text-sm font-medium">
            What is the current electricity status where you are?
          </p>

          <div className="space-y-2">
            <button
              onClick={() => onSelect("ON")}
              className="w-full rounded-xl bg-green-600 hover:bg-green-700 px-4 py-3 text-left transition"
            >
              <div className="flex items-center gap-3">
                <Power />
                <span className="font-semibold">Power ON</span>
              </div>
            </button>

            <button
              onClick={() => onSelect("OFF")}
              className="w-full rounded-xl bg-red-600 hover:bg-red-700 py-3 px-4 text-left transition"
            >
              <div className="flex items-center gap-2">
                <Power />
                <span className="font-semibold">Power OFF</span>
              </div>
            </button>

            <button
              onClick={() => onSelect("NOT_SURE")}
              className="w-full rounded-xl border border-border hover:border-primary py-3 px-4 text-left transition"
            >
              <div className="flex items-center gap-2">
                <HelpCircle />
                <span className="font-semibold">Not Sure</span>
              </div>
            </button>
          </div>

          <div className="mt-6 rounded-xl border border-primary/20 bg-primary/10 p-4">
            <div className="flex gap-2">
              <MapPin className="mt-0.5 shrink-0 text-primary" size={18} />

              <div>
                <p className="font-semibold leading-tight">{area || "Detecting area..."}</p>

                <p className="mt-1 text-sm text-muted-foreground">{state || ""}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
