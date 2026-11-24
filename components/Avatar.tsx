interface AvatarProps {
  name: string;
  size?: "sm" | "md";
}

export default function Avatar({ name, size = "sm" }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);
  const dim = size === "sm" ? "h-6 w-6 text-[10px]" : "h-9 w-9 text-sm";
  return (
    <span
      title={name}
      className={`inline-flex ${dim} items-center justify-center rounded-full bg-ink font-semibold text-white`}
    >
      {initials}
    </span>
  );
}
