import { UserButton, useClerk, useUser } from "@clerk/tanstack-react-start";
import { Shield, Mail, Monitor, LogOut } from "lucide-react";
import { ChevronRight, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { AccountAvatar } from "@/components/account/AccountAvatar";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/account/")({
  component: AccountPage,
});

function AccountPage() {
  const clerk = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Account</h1>
        <p className="text-muted-foreground">Manage your PowerCheckNG account.</p>
      </div>

      <GlassCard className="group cursor-pointer rounded-2xl p-6 transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/5">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <AccountAvatar imageUrl={user?.imageUrl} name={user?.fullName} size={80} />

            <div className="space-y-2">
              <h2 className="text-3xl font-bold">{user?.fullName ?? "PowerCheck User"}</h2>

              <p className="text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
                  Verified
                </span>

                <span className="rounded-full border border-primary/20 px-3 py-1 text-xs">
                  PowerCheckNG Member
                </span>
              </div>
            </div>
          </div>

          <Button
            onClick={() =>
              navigate({
                to: "/account/profile",
              })
            }
            variant="default"
          >
            Edit Profile
          </Button>
        </div>
      </GlassCard>

      <div className="grid gap-5 lg:grid-cols-2">
        <GlassCard
          onClick={() =>
            navigate({
              to: "/account/profile",
            })
          }
          className="cursor-pointer p-6 transition hover:border-primary/30 hover:bg-primary/5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="text-primary" />
              <div>
                <h3 className="font-semibold">Email Address</h3>

                <p className="text-sm text-muted-foreground">Manage your email addresses.</p>
              </div>
            </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </GlassCard>

        <GlassCard
          onClick={() =>
            navigate({
              to: "/account/profile",
            })
          }
          className="cursor-pointer p-6 transition hover:border-primary/30 hover:bg-primary/5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="text-primary" />

              <div>
                <h3 className="font-semibold">Password & Security</h3>

                <p className="text-sm text-muted-foreground">Update your password.</p>
              </div>
            </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </GlassCard>

        <GlassCard
          onClick={() =>
            navigate({
              to: "/account/sessions",
            })
          }
          className="cursor-pointer p-6 transition hover:border-primary/30 hover:bg-primary/5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Monitor className="text-primary" />

              <div>
                <h3 className="font-semibold">Active Sessions</h3>

                <p className="text-sm text-muted-foreground">View signed-in devices.</p>
              </div>
            </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </GlassCard>

        <GlassCard
          onClick={() => clerk.signOut()}
          className="group cursor-pointerrounded-2xl border border-red-500/20 p-6 transition-all hover:bg-red-500/10 hover:border-red-500"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LogOut className="text-red-500" />

              <div>
                <h3 className="font-semibold">Sign Out</h3>

                <p className="text-sm text-muted-foreground">End your current session.</p>
              </div>
            </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
