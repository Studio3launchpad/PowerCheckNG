import { createFileRoute } from "@tanstack/react-router";
import { SignIn } from "@clerk/tanstack-react-start";

export const Route = createFileRoute("/sign-in/$")({
  head: () => ({ meta: [{ title: "Sign in — PowerCheckNG" }] }),
  component: () => (
    <div className="min-h-screen grid-bg flex items-center justify-center p-6">
      <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" forceRedirectUrl="/dashboard" />
    </div>
  ),
});
