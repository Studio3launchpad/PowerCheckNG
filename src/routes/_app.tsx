import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useAuth, RedirectToSignIn, ClerkLoaded, ClerkLoading } from "@clerk/tanstack-react-start";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  const { isSignedIn } = useAuth();
  return (
    <>
      <ClerkLoading>
        <div className="min-h-screen grid-bg flex items-center justify-center text-sm text-muted-foreground">
          Loading…
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        {isSignedIn ? (
          <AppShell>
            <Outlet />
          </AppShell>
        ) : (
          <RedirectToSignIn />
        )}
      </ClerkLoaded>
    </>
  );
}
