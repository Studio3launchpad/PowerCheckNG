import { Check, Plus } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import type { Appliance } from "@/lib/energy/energy.types";
import { useState } from "react";
import { CustomApplianceForm } from "@/components/energy/CustomApplianceForm";

type Props = {
  appliances: Appliance[];
  onToggle: (name: string) => void;
  onUpdate: (
    name: string,
    field: "watts" | "quantity" | "hours",
    value: number,
  ) => void;
  onAddAppliance: (appliance: Appliance) => void;
};

export function ApplianceSelector({
  appliances,
  onToggle,
  onUpdate,
  onAddAppliance,
}: Props) {
  const [showCustomForm, setShowCustomForm] = useState(false);

  return (
    <GlassCard>
      <div className="mb-5">
        <h2 className="text-xl font-bold">
          Select Your Appliances
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Choose the appliances you use and adjust their
          daily usage.
        </p>
      </div>

      <div className="space-y-3">
        {appliances.map((appliance) => (
          <div
            key={appliance.name}
            className="rounded-xl border border-border bg-background/30 p-4"
          >
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => onToggle(appliance.name)}
                className="flex min-w-0 items-center gap-3 text-left"
              >
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition ${
                    appliance.selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background"
                  }`}
                >
                  {appliance.selected && (
                    <Check className="h-4 w-4" />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="font-semibold">
                    {appliance.name}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {appliance.watts}W
                  </p>
                </div>
              </button>
            </div>

            {appliance.selected && (
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <label className="space-y-1">
                  <span className="text-xs text-muted-foreground">
                    Watts
                  </span>

                  <input
                    type="number"
                    min="1"
                    value={appliance.watts}
                    onChange={(event) =>
                      onUpdate(
                        appliance.name,
                        "watts",
                        Number(event.target.value),
                      )
                    }
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary"
                  />
                </label>

                <label className="space-y-1">
                  <span className="text-xs text-muted-foreground">
                    Quantity
                  </span>

                  <input
                    type="number"
                    min="1"
                    value={appliance.quantity}
                    onChange={(event) =>
                      onUpdate(
                        appliance.name,
                        "quantity",
                        Number(event.target.value),
                      )
                    }
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary"
                  />
                </label>

                <label className="space-y-1">
                  <span className="text-xs text-muted-foreground">
                    Hours/day
                  </span>

                  <input
                    type="number"
                    min="0"
                    max="24"
                    step="0.5"
                    value={appliance.hours}
                    onChange={(event) =>
                      onUpdate(
                        appliance.name,
                        "hours",
                        Number(event.target.value),
                      )
                    }
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary"
                  />
                </label>
              </div>
            )}
          </div>
        ))}
      </div>

      {showCustomForm ? (
  <CustomApplianceForm
    onAdd={(appliance) => {
      onAddAppliance(appliance);
      setShowCustomForm(false);
    }}
    onCancel={() => setShowCustomForm(false)}
  />
) : (
  <button
    type="button"
    onClick={() => setShowCustomForm(true)}
    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-primary/40 px-4 py-3 text-sm font-medium text-primary transition hover:bg-primary/10"
  >
    <Plus className="h-4 w-4" />
    Add Custom Appliance
  </button>
)}
    </GlassCard>
  );
}