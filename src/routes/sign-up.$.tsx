import { createFileRoute } from "@tanstack/react-router";
import { SignUp } from "@clerk/tanstack-react-start";

export const Route = createFileRoute("/sign-up/$")({
  head: () => ({ meta: [{ title: "Create account — PowerCheckNG" }] }),
  component: () => (
    <div className="min-h-screen grid-bg flex items-center justify-center p-6">
      <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" forceRedirectUrl="/dashboard" />
    </div>
  ),
});
