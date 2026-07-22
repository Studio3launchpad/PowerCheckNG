import { useState } from "react";
import type { Appliance } from "@/lib/energy/energy.types";
import { POWER_RANGES } from "@/lib/energy/energy.constants";

type Props = {
  onAdd: (appliance: Appliance) => void;
  onCancel: () => void;
};

export function CustomApplianceForm({ onAdd, onCancel }: Props) {
  const [name, setName] = useState("");
  const [powerRange, setPowerRange] = useState<string>(POWER_RANGES[2].id);
  const [watts, setWatts] = useState(POWER_RANGES[2].defaultWatts.toString());
  const [quantity, setQuantity] = useState("1");
  const [hours, setHours] = useState("1");

  const nameValue = name.trim();
  const wattsValue = Number(watts);
  const quantityValue = Number(quantity);
  const hoursValue = Number(hours);

  const isValid =
    nameValue.length >= 2 &&
    Number.isFinite(wattsValue) &&
    wattsValue > 0 &&
    Number.isFinite(quantityValue) &&
    quantityValue >= 1 &&
    Number.isFinite(hoursValue) &&
    hoursValue > 0 &&
    hoursValue <= 24;

  const handleSubmit = () => {
    if (!isValid) return;

    const appliance: Appliance = {
      id: `custom-${Date.now()}`,
      name: nameValue,
      selected: true,
      watts: wattsValue,
      quantity: quantityValue,
      hours: hoursValue,
      essential: false,
    };

    onAdd(appliance);
  };

  return (
    <div className="mt-4 mb-4 rounded-xl border border-primary/30 bg-primary/5 p-4">
      <div>
        <h3 className="font-semibold">Add Custom Appliance</h3>

        <p className="mt-1 text-xs text-muted-foreground">
          Give your appliance a name, choose an estimated power range, and adjust the values if you
          know the exact specifications.
        </p>
      </div>

      <div className="mt-4 space-y-3">
        <label className="block space-y-1">
          <span className="text-xs text-muted-foreground">Appliance Name</span>

          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Deep Freezer"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary"
          />
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="space-y-1">
            <span className="text-xs text-muted-foreground">Estimated Power</span>

            <select
              value={powerRange}
              onChange={(event) => {
                const selected = POWER_RANGES.find((range) => range.id === event.target.value);

                setPowerRange(event.target.value);

                if (selected) {
                  setWatts(selected.defaultWatts.toString());
                }
              }}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary"
            >
              {POWER_RANGES.map((range) => (
                <option key={range.id} value={range.id}>
                  {range.label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-xs text-muted-foreground">Power (Watts)</span>

            <input
              type="number"
              min="1"
              value={watts}
              onChange={(event) => setWatts(event.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary"
            />
          </label>
          <label className="space-y-1">
            <span className="text-xs text-muted-foreground">Quantity</span>

            <input
              type="number"
              min="1"
              step="1"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary"
            />
          </label>

          <label className="space-y-1">
            <span className="text-xs text-muted-foreground">Hours/day</span>

            <input
              type="number"
              min="0.5"
              max="24"
              step="0.5"
              value={hours}
              onChange={(event) => setHours(event.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary"
            />
          </label>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:bg-background/60"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isValid}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add Appliance
        </button>
      </div>
    </div>
  );
}
