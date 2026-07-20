import type { ReactNode } from "react";

import { AccountNavigation } from "./AccountNavigation";

interface AccountPageProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function AccountPage({
  title,
  description,
  children,
}: AccountPageProps) {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <header>
        <h1 className="text-3xl font-bold">
          {title}
        </h1>

        <p className="text-muted-foreground">
          {description}
        </p>
      </header>

      <AccountNavigation />

      {children}
    </div>
  );
}