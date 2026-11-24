"use client";

import { useRef, type DragEvent } from "react";
import type { DropTarget, Status, Task } from "@/types";
import BoardTaskCard, { type TaskCardHandlers } from "./BoardTaskCard";

interface ColumnProps {
  status: Status;
  title: string;
  tasks: Task[];
  draggingId: string | null;
  dropTarget: DropTarget | null;
  onDropTargetChange: (target: DropTarget | null) => void;
  onDrop: () => void;
  cardHandlers: TaskCardHandlers;
}

const accent: Record<Status, string> = {
  todo: "border-t-slate-400",
  "in-progress": "border-t-brand",
  review: "border-t-accent",
  done: "border-t-emerald-600",
};

const Indicator = () => <div aria-hidden className="-my-1 h-0.5 rounded-full bg-brand" />;

export default function Column({ status, title, tasks, draggingId, dropTarget, onDropTargetChange, onDrop, cardHandlers }: ColumnProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const isOver = dropTarget?.status === status;

  const handleDragOver = (e: DragEvent<HTMLElement>) => {
    if (!draggingId) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    const cards = Array.from(listRef.current?.querySelectorAll<HTMLElement>("[data-task-id]") ?? []).filter(
      (c) => c.dataset.taskId !== draggingId
    );
    let beforeId: string | null = null;
    for (const c of cards) {
      const r = c.getBoundingClientRect();
      if (e.clientY < r.top + r.height / 2) {
        beforeId = c.dataset.taskId ?? null;
        break;
      }
    }
    if (!isOver || dropTarget.beforeId !== beforeId) onDropTargetChange({ status, beforeId });
  };

  const handleDragLeave = (e: DragEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) onDropTargetChange(null);
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    onDrop();
  };

  return (
    <section
      aria-label={title}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`min-h-40 w-[82vw] max-w-sm shrink-0 snap-center rounded-2xl border-t-4 bg-white/60 p-3 ring-1 ring-black/[0.06] transition-colors md:w-auto md:max-w-none ${accent[status]} ${isOver ? "bg-brand/10 ring-2 ring-brand/40" : ""}`}
    >
      <header className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold tracking-tight">{title}</h3>
        <span className="rounded-full bg-ink/5 px-2 py-0.5 text-xs text-muted">{tasks.length}</span>
      </header>
      <div ref={listRef} className="flex flex-col gap-3">
        {tasks.map((task) => (
          <div key={task.id} className="contents">
            {isOver && dropTarget.beforeId === task.id && task.id !== draggingId && <Indicator />}
            <BoardTaskCard task={task} dragging={draggingId === task.id} {...cardHandlers} />
          </div>
        ))}
        {isOver && dropTarget.beforeId === null && <Indicator />}
        {tasks.length === 0 && !isOver && <p className="py-6 text-center text-sm text-muted">Drop a task here.</p>}
      </div>
    </section>
  );
}
