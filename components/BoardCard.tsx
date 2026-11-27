import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Board } from "@/types";
import Badge from "./Badge";

interface BoardCardProps {
  board: Board;
  taskCount: number;
  compact?: boolean;
  /** Optional control shown on the cover, outside the link (e.g. a favourite button) */
  action?: ReactNode;
}

export default function BoardCard({ board, taskCount, compact = false, action }: BoardCardProps) {
  return (
    <div className="relative">
      <Link
        href={`/boards/${board.id}`}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition-shadow hover:shadow-md"
      >
        <div className={`relative w-full ${compact ? "h-28" : "h-40"}`}>
          <Image
            src={board.cover}
            alt={`${board.name} cover`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-semibold group-hover:text-brand">{board.name}</h3>
            <Badge label={board.category} tone="brand" />
          </div>
          {!compact && <p className="text-sm text-muted">{board.description}</p>}
          <p className="mt-auto text-xs text-muted">{taskCount} tasks</p>
        </div>
      </Link>
      {action && <div className="absolute right-3 top-3">{action}</div>}
    </div>
  );
}
