import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Avatar from "@/components/Avatar";
import Badge from "@/components/Badge";
import TaskCard from "@/components/TaskCard";
import { STATUS_LABEL, getBoard, getTask, getTasksForBoard } from "@/data";
import { formatDate } from "@/lib/format";

interface PageProps {
  params: Promise<{ id: string; taskId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { taskId } = await params;
  const task = getTask(taskId);
  if (!task) return { title: "Task not found" };
  return { title: task.title, description: task.description };
}

export default async function TaskDetailPage({ params }: PageProps) {
  const { id, taskId } = await params;
  const board = getBoard(id);
  const task = getTask(taskId);
  if (!board || !task || task.boardId !== id) notFound();

  const others = getTasksForBoard(id).filter((t) => t.id !== task.id).slice(0, 3);

  return (
    <div className="space-y-8">
      <nav className="text-sm text-muted" aria-label="Breadcrumb">
        <Link href="/boards" className="hover:text-brand">Boards</Link> / {" "}
        <Link href={`/boards/${board.id}`} className="hover:text-brand">{board.name}</Link> / {task.title}
      </nav>

      <div className="max-w-2xl rounded-xl border border-line bg-white p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge label={STATUS_LABEL[task.status]} tone="brand" />
          <Badge label={`${task.priority} priority`} tone={task.priority} />
        </div>
        <h1 className="mt-3 text-3xl font-bold">{task.title}</h1>
        <p className="mt-3 text-muted">{task.description}</p>
        <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted">Assignee</dt>
            <dd className="mt-1 flex items-center gap-2 font-medium"><Avatar name={task.assignee} size="md" />{task.assignee}</dd>
          </div>
          <div>
            <dt className="text-muted">Due date</dt>
            <dd className="mt-1 font-medium">{formatDate(task.dueDate)}</dd>
          </div>
        </dl>
        <div className="mt-5 flex flex-wrap gap-1">
          {task.tags.map((tag) => (
            <Badge key={tag} label={tag} />
          ))}
        </div>
      </div>

      {others.length > 0 && (
        <section>
          <h2 className="mb-3 text-xl font-bold">Other tasks on this board</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {others.map((t) => (
              <TaskCard key={t.id} task={t} href={`/boards/${t.boardId}/tasks/${t.id}`} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
