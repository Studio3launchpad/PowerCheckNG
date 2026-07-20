import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { UserProfile } from "@clerk/tanstack-react-start";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/account-security")({
  component: AccountSecurity,
});

function AccountSecurity() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl p-8 space-y-6">
        <Button
          variant="ghost"
          className="gap-2"
          onClick={() =>
            navigate({
              to: "/account/profile",
            })
          }
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Account
        </Button>

        <div>
          <h1 className="text-3xl font-bold">
            Security Center
          </h1>

          <p className="text-muted-foreground">
            Manage your password, email addresses, authentication methods and connected accounts.
          </p>
        </div>

        <UserProfile routing="hash" />
      </div>
    </div>
  );
}