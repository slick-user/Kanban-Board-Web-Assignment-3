"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState, type MouseEvent } from "react";
import type { Board, DropTarget, Priority, Status, Task } from "@/types";
import { STATUSES, STATUS_LABEL } from "@/data";
import AddTaskForm from "./AddTaskForm";
import Button from "./Button";
import Column from "./Column";
import ContextMenu, { type MenuEntry } from "./ContextMenu";
import Modal from "./Modal";
import TaskFilterBar, { type PriorityFilter } from "./TaskFilterBar";
import Toast from "./Toast";

interface KanbanBoardProps {
  board: Board;
  initialTasks: Task[];
}

interface MenuState {
  x: number;
  y: number;
  taskId: string;
}

const PRIORITIES: Priority[] = ["low", "medium", "high"];
const taskPath = (t: Task) => `/boards/${t.boardId}/tasks/${t.id}`;

export default function KanbanBoard({ board, initialTasks }: KanbanBoardProps) {
  const router = useRouter();
  const [items, setItems] = useState<Task[]>(initialTasks);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<DropTarget | null>(null);
  const [menu, setMenu] = useState<MenuState | null>(null);
  const [query, setQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");

  // Only the cards shown change; the progress bar still counts every task on the board
  const visibleTasks = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (t) =>
        (priorityFilter === "all" || t.priority === priorityFilter) &&
        (assigneeFilter === "all" || t.assignee === assigneeFilter) &&
        (q === "" || t.title.toLowerCase().includes(q) || t.tags.some((tag) => tag.toLowerCase().includes(q)))
    );
  }, [items, query, priorityFilter, assigneeFilter]);

  const assignees = useMemo(() => [...new Set(items.map((t) => t.assignee))].sort(), [items]);

  const clearFilters = () => {
    setQuery("");
    setPriorityFilter("all");
    setAssigneeFilter("all");
  };

  // Move a task to a column, optionally before another task (order = array order)
  const moveTask = (id: string, status: Status, beforeId: string | null = null) =>
    setItems((prev) => {
      const task = prev.find((t) => t.id === id);
      if (!task) return prev;
      const rest = prev.filter((t) => t.id !== id);
      const moved = { ...task, status };
      const idx = beforeId ? rest.findIndex((t) => t.id === beforeId) : -1;
      return idx === -1 ? [...rest, moved] : [...rest.slice(0, idx), moved, ...rest.slice(idx)];
    });

  const changeStatus = (id: string, status: Status) => {
    moveTask(id, status);
    setToast(`Moved to ${STATUS_LABEL[status]}.`);
  };

  const changePriority = (id: string, priority: Priority) => {
    setItems((prev) => prev.map((t) => (t.id === id ? { ...t, priority } : t)));
    setToast(`Priority set to ${priority}.`);
  };

  const addTask = (task: Task) => {
    setItems((prev) => [...prev, task]);
    setModalOpen(false);
    setToast(`Added "${task.title}" to To do.`);
  };

  const updateTask = (task: Task) => {
    setItems((prev) => prev.map((t) => (t.id === task.id ? task : t)));
    setEditingId(null);
    setToast(`Saved "${task.title}".`);
  };

  const clearDrag = () => {
    setDraggingId(null);
    setDropTarget(null);
  };

  const handleDrop = () => {
    const task = items.find((t) => t.id === draggingId);
    if (task && dropTarget) {
      moveTask(task.id, dropTarget.status, dropTarget.beforeId);
      if (task.status !== dropTarget.status) setToast(`Moved to ${STATUS_LABEL[dropTarget.status]}.`);
    }
    clearDrag();
  };

  const openMenu = (e: MouseEvent<HTMLElement>, taskId: string) => {
    e.preventDefault();
    let { clientX: x, clientY: y } = e;
    if (!x && !y) {
      // opened with the keyboard: anchor to the card
      const r = e.currentTarget.getBoundingClientRect();
      x = r.left + 16;
      y = r.top + 16;
    }
    setMenu({ x, y, taskId });
  };

  const closeModal = useCallback(() => setModalOpen(false), []);
  const closeEdit = useCallback(() => setEditingId(null), []);
  const closeToast = useCallback(() => setToast(""), []);
  const closeMenu = useCallback(() => setMenu(null), []);

  const buildMenu = (task: Task): MenuEntry[] => {
    const isNew = task.id.startsWith("new-");
    const path = taskPath(task);
    return [
      { type: "item", label: "Edit task", onSelect: () => setEditingId(task.id) },
      { type: "item", label: "Open task page", disabled: isNew, onSelect: () => router.push(path) },
      { type: "item", label: "Open in new tab", disabled: isNew, onSelect: () => window.open(path, "_blank", "noopener") },
      {
        type: "item",
        label: "Open in new window",
        disabled: isNew,
        onSelect: () => window.open(path, "_blank", "popup=yes,width=1100,height=800,noopener"),
      },
      {
        type: "item",
        label: "Copy link",
        disabled: isNew,
        onSelect: async () => {
          try {
            await navigator.clipboard.writeText(`${window.location.origin}${path}`);
            setToast("Link copied.");
          } catch {
            setToast("Could not copy the link.");
          }
        },
      },
      { type: "separator" },
      { type: "label", label: "Priority" },
      ...PRIORITIES.map((p): MenuEntry => ({
        type: "item",
        label: p[0].toUpperCase() + p.slice(1),
        checked: task.priority === p,
        onSelect: () => changePriority(task.id, p),
      })),
      { type: "separator" },
      { type: "label", label: "Move to" },
      ...STATUSES.map((s): MenuEntry => ({
        type: "item",
        label: s.label,
        checked: task.status === s.key,
        onSelect: () => changeStatus(task.id, s.key),
      })),
    ];
  };

  const editingTask = editingId ? items.find((t) => t.id === editingId) : undefined;
  const menuTask = menu ? items.find((t) => t.id === menu.taskId) : undefined;
  const done = items.filter((t) => t.status === "done").length;
  const percent = items.length === 0 ? 0 : Math.round((done / items.length) * 100);

  const cardHandlers = {
    // delay so the browser captures the drag image before the card dims
    onDragStart: (id: string) => setTimeout(() => setDraggingId(id), 0),
    onDragEnd: clearDrag,
    onPriorityChange: changePriority,
    onStatusChange: changeStatus,
    onContextMenu: openMenu,
    onEdit: (id: string) => setEditingId(id),
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{board.name}</h1>
          <p className="mt-1 text-muted">{board.description}</p>
          <p className="mt-2 hidden text-xs text-muted md:block">Drag cards to move them, click to expand, right-click for more.</p>
          <p className="mt-2 text-xs text-muted md:hidden">Tap a card to expand it, then change its priority or column.</p>
        </div>
        <Button className="w-full sm:w-auto" onClick={() => setModalOpen(true)}>Add task</Button>
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

      <TaskFilterBar
        query={query}
        onQueryChange={setQuery}
        priority={priorityFilter}
        onPriorityChange={setPriorityFilter}
        assignee={assigneeFilter}
        onAssigneeChange={setAssigneeFilter}
        assignees={assignees}
        shown={visibleTasks.length}
        total={items.length}
        onClear={clearFilters}
      />

      <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-4">
        {STATUSES.map((s) => (
          <Column
            key={s.key}
            status={s.key}
            title={s.label}
            tasks={visibleTasks.filter((t) => t.status === s.key)}
            draggingId={draggingId}
            dropTarget={dropTarget}
            onDropTargetChange={setDropTarget}
            onDrop={handleDrop}
            cardHandlers={cardHandlers}
          />
        ))}
      </div>

      {menu && menuTask && <ContextMenu x={menu.x} y={menu.y} entries={buildMenu(menuTask)} onClose={closeMenu} />}

      <Modal open={modalOpen} title="Add a task" onClose={closeModal}>
        <AddTaskForm boardId={board.id} onAdd={addTask} onCancel={closeModal} />
      </Modal>
      <Modal open={editingTask !== undefined} title="Edit task" onClose={closeEdit}>
        {editingTask && (
          <AddTaskForm key={editingTask.id} boardId={board.id} initialTask={editingTask} onAdd={updateTask} onCancel={closeEdit} />
        )}
      </Modal>
      {toast && <Toast message={toast} onClose={closeToast} />}
    </div>
  );
}
