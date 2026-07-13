import { MapPin, Zap, Power, HelpCircle, X } from "lucide-react";

type Props = {
  open: boolean;
  area: string;
  state: string;
  onClose: () => void;
  onSelect: (status: "ON" | "OFF" | "NOT_SURE") => void;
};

export function PowerStatusModal({
  open,
  area,
  state,
  onClose,
  onSelect,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-2">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0D171B] p-3 shadow-2xl">

        <div className="flex items-start justify-between">

          <div>
            <div className="flex items-center gap-2">
              <Zap className="text-primary" size={22} />
              <h2 className="text-xl font-bold">
                Help Keep Your Community Informed
              </h2>
            </div>

            <p className="mt-2 text-sm text-muted-foreground leading-6">
              PowerCheckNG relies on community reports to provide live
              electricity updates.
            </p>
          </div>

          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="mt-4">

          <p className="text-sm font-medium mb-3">
            What is the current electricity status where you are?
          </p>

          <div className="space-y-2">

            <button
              onClick={() => onSelect("ON")}
              className="w-full rounded-xl bg-green-600 hover:bg-green-700 py-3 px-4 text-left transition"
            >
              <div className="flex items-center gap-2">
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

          <div className="mt-4 rounded-xl bg-primary/10 border border-primary/20 p-2">

            <div className="flex gap-2">

              <MapPin className="text-primary mt-1" size={18} />

              <div>

                <p className="font-semibold">
                  {area || "Detecting area..."}
                </p>

                <p className="text-sm text-muted-foreground">
                  {state || ""}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}