"use client";

import { useCallback, useState } from "react";
import type { Board, Status, Task } from "@/types";
import { STATUSES } from "@/data";
import AddTaskForm from "./AddTaskForm";
import Button from "./Button";
import Column from "./Column";
import Modal from "./Modal";
import Toast from "./Toast";

interface KanbanBoardProps {
  board: Board;
  initialTasks: Task[];
}

const order: Status[] = STATUSES.map((s) => s.key);

export default function KanbanBoard({ board, initialTasks }: KanbanBoardProps) {
  const [items, setItems] = useState<Task[]>(initialTasks);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState("");

  const moveTask = (id: string, dir: 1 | -1) =>
    setItems((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const i = order.indexOf(t.status) + dir;
        return i < 0 || i >= order.length ? t : { ...t, status: order[i] };
      })
    );

  const addTask = (task: Task) => {
    setItems((prev) => [...prev, task]);
    setModalOpen(false);
    setToast(`Added "${task.title}" to To do.`);
  };

  const closeModal = useCallback(() => setModalOpen(false), []);
  const closeToast = useCallback(() => setToast(""), []);

  const done = items.filter((t) => t.status === "done").length;
  const percent = items.length === 0 ? 0 : Math.round((done / items.length) * 100);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <h1 className="text-3xl font-bold">{board.name}</h1>
          <p className="mt-1 text-muted">{board.description}</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>Add task</Button>
      </div>

      <div className="mb-6">
        <div className="mb-1 flex justify-between text-sm text-muted">
          <span>{done} of {items.length} tasks done</span>
          <span>{percent}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-ink/10" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label="Board progress">
          <div className="h-full bg-brand transition-all" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATUSES.map((s, i) => (
          <Column
            key={s.key}
            status={s.key}
            title={s.label}
            tasks={items.filter((t) => t.status === s.key)}
            index={i}
            total={STATUSES.length}
            onMove={moveTask}
          />
        ))}
      </div>

      <Modal open={modalOpen} title="Add a task" onClose={closeModal}>
        <AddTaskForm boardId={board.id} onAdd={addTask} onCancel={closeModal} />
      </Modal>
      {toast && <Toast message={toast} onClose={closeToast} />}
    </div>
  );
}
