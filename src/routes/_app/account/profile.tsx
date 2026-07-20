import { createFileRoute } from "@tanstack/react-router";
import { UserProfile } from "@clerk/tanstack-react-start";

import { AccountPage } from "@/components/account/AccountPage";

export const Route = createFileRoute("/_app/account/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <AccountPage
      title="Personal & Security"
      description="Manage your profile, security settings and connected accounts."
    >
      <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
        <UserProfile routing="hash" />
      </div>
    </AccountPage>
  );
}