export function timeAgo(iso?: string | null) {
  if (!iso) {
    return "recently";
  }

  const timestamp = new Date(iso).getTime();

  if (Number.isNaN(timestamp)) {
    return "recently";
  }

  const mins = Math.floor(
    (Date.now() - timestamp) / 60000,
  );

  if (mins < 1) {
    return "just now";
  }

  if (mins < 60) {
    return `${mins} min${mins !== 1 ? "s" : ""} ago`;
  }

  const hrs = Math.floor(mins / 60);

  if (hrs < 24) {
    return `${hrs} hr${hrs !== 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(hrs / 24);

  return `${days} day${days !== 1 ? "s" : ""} ago`;
}