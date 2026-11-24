import type { Metadata } from "next";
import BoardCard from "@/components/BoardCard";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import StatCard from "@/components/StatCard";
import { STATUSES, boards, getTasksForBoard, tasks } from "@/data";

export const metadata: Metadata = {
  title: "Home",
  description: "Plan work on Kanban boards. See your boards, task counts and progress at a glance.",
};

export default function HomePage() {
  const doneCount = tasks.filter((t) => t.status === "done").length;
  const sample = getTasksForBoard("b1");

  return (
    <div className="space-y-10 sm:space-y-14">
      <section className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
        <div>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">Move work from to do to done.</h1>
          <p className="mt-4 max-w-lg text-base sm:text-lg text-muted">
            TaskFlow gives each project its own board with four columns. Add a task, push it right as it progresses, and watch the progress bar fill.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/boards">Open boards</Button>
            <Button href="/boards/new" variant="secondary">Create a board</Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 rounded-2xl border border-line bg-white p-3 sm:gap-3 sm:p-4" aria-label="Board preview">
          {STATUSES.map((s) => (
            <div key={s.key} className="rounded-lg bg-paper p-2">
              <p className="mb-2 text-xs font-semibold">{s.label}</p>
              {sample
                .filter((t) => t.status === s.key)
                .map((t) => (
                  <div key={t.id} className="mb-2 rounded border border-line bg-white p-2 text-xs">
                    <p className="font-medium">{t.title}</p>
                    <div className="mt-1"><Badge label={t.priority} tone={t.priority} /></div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-3" aria-label="Statistics">
        <StatCard label="Boards" value={boards.length} />
        <StatCard label="Tasks tracked" value={tasks.length} />
        <StatCard label="Tasks done" value={`${Math.round((doneCount / tasks.length) * 100)}%`} />
      </section>

      <section>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-2xl font-bold">Featured boards</h2>
          <Button href="/boards" variant="ghost">See all boards</Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {boards.slice(0, 3).map((b) => (
            <BoardCard key={b.id} board={b} taskCount={getTasksForBoard(b.id).length} compact />
          ))}
        </div>
      </section>
    </div>
  );
}
