import Link from "next/link";
import type { Task } from "@/types";
import { formatDate } from "@/lib/format";
import Avatar from "./Avatar";
import Badge from "./Badge";

interface TaskCardProps {
  task: Task;
  href?: string;
  onMove?: (id: string, dir: 1 | -1) => void;
  canMoveBack?: boolean;
  canMoveForward?: boolean;
}

export default function TaskCard({ task, href, onMove, canMoveBack = false, canMoveForward = false }: TaskCardProps) {
  return (
    <article className="rounded-lg border border-line bg-white p-3 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-semibold">
          {href ? (
            <Link href={href} className="hover:text-brand">
              {task.title}
            </Link>
          ) : (
            task.title
          )}
        </h4>
        <Badge label={task.priority} tone={task.priority} />
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {task.tags.map((tag) => (
          <Badge key={tag} label={tag} />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <Avatar name={task.assignee} />
          Due {formatDate(task.dueDate)}
        </span>
        {onMove && (
          <span className="flex gap-1">
            <button
              type="button"
              disabled={!canMoveBack}
              onClick={() => onMove(task.id, -1)}
              aria-label={`Move ${task.title} to previous column`}
              className="rounded border border-line px-2 py-0.5 text-ink hover:border-brand disabled:opacity-30"
            >
              ←
            </button>
            <button
              type="button"
              disabled={!canMoveForward}
              onClick={() => onMove(task.id, 1)}
              aria-label={`Move ${task.title} to next column`}
              className="rounded border border-line px-2 py-0.5 text-ink hover:border-brand disabled:opacity-30"
            >
              →
            </button>
          </span>
        )}
      </div>
    </article>
  );
}
