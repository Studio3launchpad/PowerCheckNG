import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

import { GlassCard } from "@/components/GlassCard";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { AccountPage } from "@/components/account/AccountPage";

import {
  getPreferences,
  savePreferences,
} from "@/lib/preferences.storage";

import type { UserPreferences } from "@/lib/preferences.types";

export const Route = createFileRoute(
  "/_app/account/preferences",
)({
  component: PreferencesPage,
});

function PreferencesPage() {
  const [preferences, setPreferences] =
    React.useState<UserPreferences>(
      getPreferences(),
    );

  React.useEffect(() => {
    savePreferences(preferences);
  }, [preferences]);

  function updateNotification(
    key: keyof UserPreferences["notifications"],
    value: boolean,
  ) {
    setPreferences((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }));
  }

  function updatePrivacy(
    key: keyof UserPreferences["privacy"],
    value: boolean,
  ) {
    setPreferences((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value,
      },
    }));
  }

  return (
  <AccountPage
    title="Preferences"
    description="Customize your PowerCheckNG experience."
  >
    <GlassCard className="space-y-8 p-6">

        <div className="space-y-5">

          <h2 className="text-lg font-semibold">
            Notifications
          </h2>

          <Preference
            title="Email Notifications"
            description="Receive important account updates by email."
            checked={
              preferences.notifications.email
            }
            onCheckedChange={(checked) =>
              updateNotification(
                "email",
                checked,
              )
            }
          />

          <Preference
            title="Outage Alerts"
            description="Notify me whenever an outage is reported near my location."
            checked={
              preferences.notifications.outageAlerts
            }
            onCheckedChange={(checked) =>
              updateNotification(
                "outageAlerts",
                checked,
              )
            }
          />

          <Preference
            title="Weekly Summary"
            description="Receive a weekly summary of your energy usage."
            checked={
              preferences.notifications.weeklySummary
            }
            onCheckedChange={(checked) =>
              updateNotification(
                "weeklySummary",
                checked,
              )
            }
          />

        </div>

        <div className="border-t pt-8 space-y-5">

          <h2 className="text-lg font-semibold">
            Privacy
          </h2>

          <Preference
            title="Anonymous Outage Reports"
            description="Hide your identity when submitting outage reports."
            checked={
              preferences.privacy.anonymousReports
            }
            onCheckedChange={(checked) =>
              updatePrivacy(
                "anonymousReports",
                checked,
              )
            }
          />

          <Preference
            title="Usage Analytics"
            description="Help improve PowerCheckNG by sharing anonymous usage analytics."
            checked={
              preferences.privacy.analytics
            }
            onCheckedChange={(checked) =>
              updatePrivacy(
                "analytics",
                checked,
              )
            }
          />

        </div>

      </GlassCard>
  </AccountPage>
);
}

function Preference({
  title,
  description,
  checked,
  onCheckedChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (
    checked: boolean,
  ) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-6">

      <div className="space-y-1">

        <Label className="font-medium">
          {title}
        </Label>

        <p className="text-sm text-muted-foreground">
          {description}
        </p>

      </div>

      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
      />

    </div>
  );
}