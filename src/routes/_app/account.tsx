import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/account")({
  component: AccountLayout,
});

function AccountLayout() {
  return (
    <div className="w-full max-w-4xl">
      <Outlet />
    </div>
  );
}