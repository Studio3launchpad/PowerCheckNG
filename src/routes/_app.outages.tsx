import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Zap, MapPin, Clock, ThumbsUp, Plus } from "lucide-react";
import { useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import { OutageMap } from "@/components/OutageMap";
import { listOutages, reportOutage } from "@/lib/outages.functions";

const outagesQO = queryOptions({
  queryKey: ["outages"],
  queryFn: () => listOutages(),
});

export const Route = createFileRoute("/_app/outages")({
  head: () => ({ meta: [{ title: "Outage Tracker — PowerCheckNG" }] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(outagesQO),
  component: OutagesPage,
});

const FormSchema = z.object({
  area: z.string().min(2, "Where is this?"),
  discoCode: z.string().min(2),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  description: z.string().optional(),
});
type FormValues = z.infer<typeof FormSchema>;

const STATUS_STYLES: Record<string, string> = {
  REPORTED: "bg-warning/15 text-warning border-warning/30",
  CONFIRMED: "bg-destructive/15 text-destructive border-destructive/30",
  RESTORED: "bg-primary/15 text-primary border-primary/30",
  CANCELLED: "bg-muted text-muted-foreground border-border",
};

function OutagesPage() {
  const { data } = useSuspenseQuery(outagesQO);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const submitFn = useServerFn(reportOutage);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { area: "", discoCode: "IKEDC", latitude: 6.5, longitude: 3.35 },
  });

  const mutation = useMutation({
    mutationFn: (values: FormValues) => submitFn({ data: values }),
    onSuccess: async (created) => {
      toast.success(`Outage report saved for ${created.area}`);
      await queryClient.invalidateQueries({ queryKey: ["outages"], refetchType: "all" });
      await router.invalidate();
      setOpen(false);
      form.reset();
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to save outage";
      toast.error(msg);
    },
  });

  return (
    <div className="space-y-6 pb-24 lg:pb-6">
      <header className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-display font-bold flex items-center gap-2">
            <Zap className="size-7 text-primary" /> Outage Tracker
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Live outage reports from your area. Confirm, report, restore.
          </p>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 glow-primary"
        >
          <Plus className="size-4" /> Report outage
        </button>
      </header>

      {open && (
        <GlassCard variant="strong">
          <form
            onSubmit={form.handleSubmit((v) => mutation.mutate(v))}
            className="grid sm:grid-cols-2 gap-4"
          >
            <Field label="Area">
              <input
                {...form.register("area")}
                className="w-full rounded-lg bg-white/5 border border-border px-3 py-2 text-sm outline-none focus:border-primary"
                placeholder="e.g. Lekki Phase 1"
              />
            </Field>
            <Field label="Disco">
              <select
                {...form.register("discoCode")}
                className="w-full rounded-lg bg-white/5 border border-border px-3 py-2 text-sm outline-none focus:border-primary"
              >
                {["IKEDC", "EKEDC", "AEDC", "PHED", "KEDCO", "JED", "IBEDC"].map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </Field>
            <Field label="Latitude">
              <input
                {...form.register("latitude")}
                type="number"
                step="any"
                className="w-full rounded-lg bg-white/5 border border-border px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </Field>
            <Field label="Longitude">
              <input
                {...form.register("longitude")}
                type="number"
                step="any"
                className="w-full rounded-lg bg-white/5 border border-border px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </Field>
            <Field label="Description (optional)" className="sm:col-span-2">
              <textarea
                {...form.register("description")}
                rows={2}
                className="w-full rounded-lg bg-white/5 border border-border px-3 py-2 text-sm outline-none focus:border-primary"
                placeholder="Any details about the outage…"
              />
            </Field>
            <div className="sm:col-span-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-border px-4 py-2 text-sm hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 glow-primary disabled:opacity-50"
              >
                {mutation.isPending ? "Submitting…" : "Submit report"}
              </button>
            </div>
          </form>
        </GlassCard>
      )}

      {/* Live map */}
      <GlassCard className="p-0 overflow-hidden">
        <OutageMap
          outages={data.outages.map((o) => ({
            id: o.id,
            area: o.area,
            discoCode: o.discoCode,
            status: o.status,
            latitude: o.latitude,
            longitude: o.longitude,
          }))}
        />
      </GlassCard>


      {/* List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.outages.map((o) => (
          <GlassCard key={o.id}>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold flex items-center gap-1.5">
                  <MapPin className="size-4 text-primary" /> {o.area}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{o.discoCode}</p>
              </div>
              <span
                className={`text-[10px] uppercase tracking-wide px-2 py-1 rounded-full border ${STATUS_STYLES[o.status]}`}
              >
                {o.status}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="size-3" /> {timeAgo(o.startedAt)}
              </span>
              <span className="flex items-center gap-1">
                <ThumbsUp className="size-3" /> {o.confirmations} confirmed
              </span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function timeAgo(iso: string) {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 60) return `${mins}m ago`;
  const h = Math.floor(mins / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}
