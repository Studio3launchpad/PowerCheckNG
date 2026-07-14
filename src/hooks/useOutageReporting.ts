import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { reportOutage } from "@/lib/outage/outages.functions";
import type { FormValues } from "@/lib/outage/outages.types";


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
    mutationFn: (values: FormValues) =>
      submitFn({ data: values }),

    onSuccess: async (result) => {
      if (!result.success) {
        toast.warning(result.message);
        return;
      }

      toast.success(
        `Power status reported for ${result.outage.area}`,
      );

      await queryClient.invalidateQueries({
        queryKey: ["outages"],
        refetchType: "all",
      });

      await router.invalidate();

      onSuccess?.();
    },

    onError: (err: unknown) => {
      console.error("Submit Error:", err);

      const message =
        err instanceof Error
          ? err.message
          : "Failed to submit power status";

      toast.error(message);
    },
  });

  return {
    submit: mutation.mutate,
    submitAsync: mutation.mutateAsync,
    isSubmitting: mutation.isPending,
  };
}