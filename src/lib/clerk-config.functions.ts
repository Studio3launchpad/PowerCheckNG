import { createServerFn } from "@tanstack/react-start";

export const getClerkPublishableKey = createServerFn({ method: "GET" }).handler(
  async () => {
    return {
      publishableKey: (process.env.CLERK_PUBLISHABLE_KEY ?? "") as string,
    };
  },
);
