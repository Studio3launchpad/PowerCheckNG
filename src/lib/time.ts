export function timeAgo(iso: string) {
  const mins = Math.floor(
    (Date.now() - new Date(iso).getTime()) / 60000,
  );

  if (mins < 1) return "Just now";

  if (mins < 60) return `${mins} min ago`;

  const hrs = Math.floor(mins / 60);

  if (hrs < 24) return `${hrs} hr ago`;

  const days = Math.floor(hrs / 24);

  return `${days} day${days > 1 ? "s" : ""} ago`;
}