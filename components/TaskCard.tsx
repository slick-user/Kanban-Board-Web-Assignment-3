import Link from "next/link";
import type { Task } from "@/types";
import { formatDate } from "@/lib/format";
import Avatar from "./Avatar";
import Badge from "./Badge";

interface TaskCardProps {
  task: Task;
  href?: string;
}

// Read-only card used on the task detail page (a Server Component).
// The interactive version for the board is BoardTaskCard.
export default function TaskCard({ task, href }: TaskCardProps) {
  return (
    <article className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-black/[0.07]">
      <div className="flex items-start justify-between gap-2">
        <h4 className="min-w-0 break-words text-sm font-medium tracking-tight">
          {href ? (
            <Link href={href} className="block min-h-10 py-1 hover:text-brand">
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
      <div className="mt-3 flex items-center gap-1.5 text-xs text-muted">
        <Avatar name={task.assignee} />
        Due {formatDate(task.dueDate)}
      </div>
    </article>
  );
}
