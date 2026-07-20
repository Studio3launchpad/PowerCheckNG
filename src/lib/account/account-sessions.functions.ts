import { createServerFn } from "@tanstack/react-start";
import { auth, clerkClient } from "@clerk/tanstack-react-start/server";

export const getUserSessions = createServerFn({
  method: "GET",
}).handler(async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const client = await clerkClient();

  const result = await client.sessions.getSessionList({
    userId,
    status: "active",
    limit: 100,
  });

  return result.data.map((session) => ({
    id: session.id,
    status: session.status,
    lastActiveAt: session.lastActiveAt,
    expireAt: session.expireAt,
    abandonAt: session.abandonAt,

    activity: session.latestActivity
      ? {
          browser: session.latestActivity.browserName,
          browserVersion: session.latestActivity.browserVersion,
          city: session.latestActivity.city,
          country: session.latestActivity.country,
          device: session.latestActivity.deviceType,
          ip: session.latestActivity.ipAddress,
          mobile: session.latestActivity.isMobile,
        }
      : null,
  }));
});

export const revokeSession = createServerFn({
  method: "POST",
})
  .validator((sessionId: string) => sessionId)
  .handler(async ({ data }) => {
    const client = await clerkClient();

    await client.sessions.revokeSession(data);

    return {
      success: true,
    };
  });

  export const revokeAllSessions = createServerFn({
  method: "POST",
}).handler(async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const client = await clerkClient();

  const result = await client.sessions.getSessionList({
    userId,
    status: "active",
    limit: 100,
  });

  await Promise.all(
    result.data.map((session) =>
      client.sessions.revokeSession(session.id),
    ),
  );

  return {
    success: true,
  };
});