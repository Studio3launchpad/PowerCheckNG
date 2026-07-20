import { Camera } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AccountAvatarProps {
  imageUrl?: string | null;
  name?: string | null;
  size?: number;
  className?: string;
}

export function AccountAvatar({
  imageUrl,
  name,
  size = 120,
  className,
}: AccountAvatarProps) {
  const initials =
    name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "PC";

  return (
    <button
      type="button"
      className={`group relative transition-transform duration-300 hover:scale-105 ${className ?? ""}`}
    >
      <Avatar
        style={{
          width: size,
          height: size,
        }}
        className="border-4 border-background shadow-xl"
      >
        <AvatarImage src={imageUrl ?? undefined} />

        <AvatarFallback className="text-3xl font-bold">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex flex-col items-center gap-2 text-white">
          <Camera className="h-6 w-6" />
          <span className="text-xs font-medium">
            Change Photo
          </span>
        </div>
      </div>

      <div className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground shadow-lg">
        <Camera className="h-5 w-5" />
      </div>
    </button>
  );
}