import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/common/GlassCard";
import { AccountNavigation } from "@/components/account/AccountNavigation";
import {
  getUserSessions,
  revokeAllSessions,
  revokeSession,
} from "@/lib/account/account-sessions.functions";
import { useClerk } from "@clerk/tanstack-react-start";
import { toast } from "sonner";
import { AccountPage } from "@/components/account/AccountPage";

export const Route = createFileRoute("/_app/account/sessions")({
  component: SessionsPage,
});

function SessionsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["account-sessions"],
    queryFn: () => getUserSessions(),
  });
  const queryClient = useQueryClient();

  const clerk = useClerk();

  const revokeOne = useMutation({
    mutationFn: revokeSession,
    onSuccess: async () => {
      toast.success("Signed out successfully.");

      await new Promise((resolve) => setTimeout(resolve, 800));

      await clerk.signOut();
    },
  });

  const revokeAll = useMutation({
    mutationFn: revokeAllSessions,
    onSuccess: async () => {
      toast.success("Signed out from all devices.");

      await new Promise((resolve) => setTimeout(resolve, 800));

      await clerk.signOut();
    },
  });

  return (
    <AccountPage title="Active Sessions" description="Devices currently signed into your account.">

      <GlassCard className="rounded-2xl p-6">
        {isLoading ? (
          <p>Loading sessions...</p>
        ) : data?.length ? (
          <div className="space-y-5">
            {data.map((session, index) => (
              <div
                key={session.id}
                className="flex flex-col gap-5 rounded-2xl border border-border/50 bg-background/40 p-5 transition hover:border-primary/30 hover:bg-primary/5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">
                      {session.activity?.device ?? "Unknown Device"}
                    </h3>

                    {index === 0 && (
                      <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs text-green-400">
                        Current Device
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {session.activity?.browser ?? "Unknown Browser"}
                    {session.activity?.browserVersion ? ` ${session.activity.browserVersion}` : ""}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {session.activity?.city}, {session.activity?.country}
                  </p>

                  <p className="text-xs text-primary">
                    Last active {new Date(session.lastActiveAt).toLocaleString()}
                  </p>
                </div>
                <Button
  className="w-full sm:w-auto"
                  variant="outline"
                  size="sm"
                  disabled={revokeOne.isPending}
                  onClick={() =>
                    revokeOne.mutate({
                      data: session.id,
                    })
                  }
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No active sessions found.</p>
        )}
      </GlassCard>
      <div className="flex justify-stretch pt-6 sm:justify-end">
        <Button
  className="w-full sm:w-auto"
          variant="destructive"
          disabled={revokeAll.isPending}
          onClick={() =>
            revokeAll.mutate({
              data: undefined,
            })
          }
        >
          Sign Out All Devices
        </Button>
      </div>
    </AccountPage>
  );
}
