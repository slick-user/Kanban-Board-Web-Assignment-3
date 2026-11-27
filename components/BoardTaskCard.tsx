"use client";

import Link from "next/link";
import { useState, type DragEvent, type MouseEvent } from "react";
import type { Priority, Status, Task } from "@/types";
import { STATUSES } from "@/data";
import { formatDate } from "@/lib/format";
import Avatar from "./Avatar";
import Badge from "./Badge";

export interface TaskCardHandlers {
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  onPriorityChange: (id: string, priority: Priority) => void;
  onStatusChange: (id: string, status: Status) => void;
  onContextMenu: (e: MouseEvent<HTMLElement>, id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

interface BoardTaskCardProps extends TaskCardHandlers {
  task: Task;
  dragging: boolean;
}

const dot: Record<Priority, string> = {
  low: "bg-emerald-500",
  medium: "bg-amber-500",
  high: "bg-rose-500",
};
const PRIORITIES: Priority[] = ["low", "medium", "high"];

export default function BoardTaskCard({ task, dragging, onDragStart, onDragEnd, onPriorityChange, onStatusChange, onContextMenu, onEdit, onDelete }: BoardTaskCardProps) {
  const [open, setOpen] = useState(false);
  const panelId = `panel-${task.id}`;
  const href = task.id.startsWith("new-") ? undefined : `/boards/${task.boardId}/tasks/${task.id}`;

  const handleDragStart = (e: DragEvent<HTMLElement>) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", task.id); // Firefox needs data to start a drag
    onDragStart(task.id);
  };

  return (
    <article
      draggable
      data-task-id={task.id}
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      onContextMenu={(e) => onContextMenu(e, task.id)}
      className={`cursor-grab rounded-xl bg-white shadow-[0_1px_2px_rgba(16,34,43,0.08)] ring-1 ring-black/[0.07] transition-shadow hover:shadow-md active:cursor-grabbing ${dragging ? "opacity-40" : ""}`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-start gap-2.5 rounded-xl p-3 text-left"
      >
        <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dot[task.priority]}`}>
          <span className="sr-only">{task.priority} priority</span>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block break-words text-sm font-medium tracking-tight">{task.title}</span>
          <span className="mt-1.5 flex items-center gap-1.5 text-xs text-muted">
            <Avatar name={task.assignee} />
            Due {formatDate(task.dueDate)}
          </span>
        </span>
        <svg viewBox="0 0 20 20" aria-hidden className={`mt-1 h-3.5 w-3.5 shrink-0 fill-current text-muted transition-transform duration-200 ${open ? "rotate-90" : ""}`}>
          <path d="M6 3.5l9 6.5-9 6.5z" />
        </svg>
      </button>

      <div id={panelId} inert={!open} className={`grid transition-[grid-template-rows] duration-200 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div className="space-y-3 border-t border-black/5 px-3 pb-3 pt-3 text-sm">
            {task.description && <p className="text-muted">{task.description}</p>}

            <div>
              <p className="mb-1 text-xs font-medium text-muted">Priority</p>
              <div className="inline-flex rounded-lg bg-ink/5 p-0.5">
                {PRIORITIES.map((p) => (
                  <button
                    key={p}
                    type="button"
                    aria-pressed={task.priority === p}
                    onClick={() => onPriorityChange(task.id, p)}
                    className={`min-h-8 rounded-md px-3 text-xs font-medium capitalize ${task.priority === p ? "bg-white text-ink shadow-sm" : "text-muted hover:text-ink"}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor={`status-${task.id}`} className="mb-1 block text-xs font-medium text-muted">Column</label>
              <select
                id={`status-${task.id}`}
                value={task.status}
                onChange={(e) => onStatusChange(task.id, e.target.value as Status)}
                className="min-h-9 w-full rounded-lg border border-line bg-white px-2 text-base sm:text-sm"
              >
                {STATUSES.map((s) => (
                  <option key={s.key} value={s.key}>{s.label}</option>
                ))}
              </select>
            </div>

            {task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {task.tags.map((tag) => (
                  <Badge key={tag} label={tag} />
                ))}
              </div>
            )}

            <div className="flex items-center gap-4">
              <button type="button" onClick={() => onEdit(task.id)} className="text-xs font-medium text-brand hover:underline">
                Edit task
              </button>
              {href && (
                <Link href={href} draggable={false} className="text-xs font-medium text-brand hover:underline">
                  Open task page
                </Link>
              )}
              <button type="button" onClick={() => onDelete(task.id)} aria-label={`Delete ${task.title}`} className="ml-auto text-xs font-medium text-rose-700 hover:underline">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
