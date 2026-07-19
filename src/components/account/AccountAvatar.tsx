import { UserRound } from "lucide-react";

interface AccountAvatarProps {
  imageUrl?: string | null;
  name?: string | null;
  size?: number;
}

export function AccountAvatar({
  imageUrl,
  name,
  size = 88,
}: AccountAvatarProps) {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name ?? "User"}
        className="rounded-full object-cover border-2 border-primary/20"
        style={{
          width: size,
          height: size,
        }}
      />
    );
  }

  return (
    <div
      className="flex items-center justify-center rounded-full border-2 border-primary/20 bg-primary/10"
      style={{
        width: size,
        height: size,
      }}
    >
      <UserRound
        className="text-primary"
        size={size * 0.45}
      />
    </div>
  );
}