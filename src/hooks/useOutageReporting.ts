import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { reportOutage } from "@/lib/outages.functions";
import type { FormValues } from "@/lib/outages.types";

type Options = {
  onSuccess?: () => void;
};

export function useOutageReporting({
  onSuccess,
}: Options = {}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const submitFn = useServerFn(reportOutage);

  const mutation = useMutation({
      mutationFn: (values: FormValues) => submitFn({ data: values }),
      onSuccess: async (created) => {
        toast.success(`Outage report saved for ${created.area}`);
        await queryClient.invalidateQueries({ queryKey: ["outages"], refetchType: "all" });
        await router.invalidate();
        onSuccess?.();
      },
      onError: (err: unknown) => {
        const msg = err instanceof Error ? err.message : "Failed to save outage";
        toast.error(msg);
      },
    });
  

  return {
  submit: mutation.mutate,
  submitAsync: mutation.mutateAsync,
  isSubmitting: mutation.isPending,
};
}