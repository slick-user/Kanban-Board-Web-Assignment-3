import type { Status, Task } from "@/types";
import TaskCard from "./TaskCard";

interface ColumnProps {
  status: Status;
  title: string;
  tasks: Task[];
  index: number;
  total: number;
  onMove: (id: string, dir: 1 | -1) => void;
}

const accent: Record<Status, string> = {
  todo: "border-t-slate-400",
  "in-progress": "border-t-brand",
  review: "border-t-accent",
  done: "border-t-emerald-600",
};

export default function Column({ status, title, tasks, index, total, onMove }: ColumnProps) {
  return (
    <section className={`rounded-xl border border-line border-t-4 bg-white/60 p-3 ${accent[status]}`} aria-label={title}>
      <header className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <span className="rounded-full bg-ink/5 px-2 py-0.5 text-xs text-muted">{tasks.length}</span>
      </header>
      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            href={task.id.startsWith("new-") ? undefined : `/boards/${task.boardId}/tasks/${task.id}`}
            onMove={onMove}
            canMoveBack={index > 0}
            canMoveForward={index < total - 1}
          />
        ))}
        {tasks.length === 0 && <p className="py-6 text-center text-sm text-muted">No tasks here yet.</p>}
      </div>
    </section>
  );
}
