import { Check, Plus, Trash2 } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import type { Appliance } from "@/lib/energy/energy.types";
import { useState } from "react";
import { CustomApplianceForm } from "@/components/energy/CustomApplianceForm";
import { APPLIANCE_CATALOGUE } from "@/lib/energy/applianceCatalogue";

type Props = {
  appliances: Appliance[];
  onToggle: (name: string) => void;
  onUpdate: (name: string, field: "watts" | "quantity" | "hours", value: number) => void;
  onAddAppliance: (appliance: Appliance) => void;
  onRemoveAppliance: (id: string) => void;
  onToggleEssential: (name: string) => void;
};

export function ApplianceSelector({
  appliances,
  onToggle,
  onUpdate,
  onAddAppliance,
  onRemoveAppliance,
  onToggleEssential,
}: Props) {
  const [showCustomForm, setShowCustomForm] = useState(false);

  const [showCatalogue, setShowCatalogue] = useState(false);

  const [search, setSearch] = useState("");

  const existingAppliances = new Set(appliances.map((a) => a.name.toLowerCase()));

  const filteredCatalogue = APPLIANCE_CATALOGUE.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());

    const alreadyAdded = existingAppliances.has(item.name.toLowerCase());

    return matchesSearch && !alreadyAdded;
  });

  return (
    <GlassCard>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Select Your Appliances</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Choose the appliances you use and adjust their daily usage.
          </p>
        </div>

        {showCatalogue && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-3xl rounded-2xl border border-border bg-background p-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Add an Appliance</h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Choose from our appliance library or create your own.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowCatalogue(false)}
                  className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  ✕
                </button>
              </div>

              <input
                type="text"
                placeholder="Search appliances..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mt-5 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
              />

              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCatalogue.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onAddAppliance({
                        id: item.id,

                        name: item.name,

                        selected: true,

                        watts: item.watts,

                        quantity: 1,

                        hours: item.defaultHours,

                        essential: false,
                      });

                      setShowCatalogue(false);
                    }}
                    className="rounded-lg border border-border bg-background px-4 py-3 text-left transition hover:border-primary hover:bg-primary/5"
                  >
                    <p className="font-medium">{item.name}</p>

                    <p className="text-xs text-muted-foreground">
                      {item.category} • {item.watts}W
                    </p>
                  </button>
                ))}
              </div>

              <div className="mt-6 border-t border-border pt-5 display flex flex-col items-center justify-center gap-3">
                <p className="text-sm text-muted-foreground">Can't find your appliance?</p>

                <button
                  type="button"
                  onClick={() => {
                    setShowCatalogue(false);
                    setShowCustomForm(true);
                  }}
                  className="mt-3 rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                >
                  + Create Custom Appliance
                </button>
              </div>
            </div>
          </div>
        )}

        {!showCustomForm && (
          <button
            type="button"
            onClick={() => setShowCatalogue(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Add Appliance
          </button>
        )}
      </div>

      {showCustomForm && (
        <CustomApplianceForm
          onAdd={(appliance) => {
            onAddAppliance(appliance);
            setShowCustomForm(false);
          }}
          onCancel={() => setShowCustomForm(false)}
        />
      )}

      <div className="space-y-3">
        {appliances.map((appliance) => (
          <div key={appliance.id} className="rounded-xl border border-border bg-background/30 p-4">
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
                  {appliance.selected && <Check className="h-4 w-4" />}
                </div>

                <div className="min-w-0">
                  <p className="font-semibold">{appliance.name}</p>

                  <p className="text-xs text-muted-foreground">{appliance.watts}W</p>
                </div>
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();

                  onRemoveAppliance(appliance.id);
                }}
                aria-label={`Remove ${appliance.name}`}
                title={`Remove ${appliance.name}`}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-red-500/10 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {appliance.selected && (
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <label className="space-y-1">
                  <span className="text-xs text-muted-foreground">Watts</span>

                  <input
                    type="number"
                    min="1"
                    value={appliance.watts}
                    onChange={(event) =>
                      onUpdate(appliance.name, "watts", Number(event.target.value))
                    }
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary"
                  />
                </label>

                <label className="space-y-1">
                  <span className="text-xs text-muted-foreground">Quantity</span>

                  <input
                    type="number"
                    min="1"
                    value={appliance.quantity}
                    onChange={(event) =>
                      onUpdate(appliance.name, "quantity", Number(event.target.value))
                    }
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary"
                  />
                </label>

                <label className="space-y-1">
                  <span className="text-xs text-muted-foreground">Hours/day</span>

                  <input
                    type="number"
                    min="0"
                    max="24"
                    step="0.5"
                    value={appliance.hours}
                    onChange={(event) =>
                      onUpdate(appliance.name, "hours", Number(event.target.value))
                    }
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary"
                  />
                </label>

<div className="sm:col-span-3">
  <label className="inline-flex cursor-pointer items-center gap-3 rounded-lg border border-border px-3 py-2 transition hover:bg-background/50">
    <input
      type="checkbox"
      checked={appliance.essential}
      onChange={() =>
        onToggleEssential(appliance.name)
      }
      className="h-4 w-4 accent-primary"
    />

    <div>
      <p className="text-sm font-medium">
        Power during outage
      </p>

      <p className="text-xs text-muted-foreground">
        Include this appliance when sizing your backup system.
      </p>
    </div>
  </label>
</div>

              </div>
            )}
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
