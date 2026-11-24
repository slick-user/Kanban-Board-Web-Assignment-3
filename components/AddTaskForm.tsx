"use client";

import { useState, type FormEvent } from "react";
import type { Priority, Task } from "@/types";
import { ASSIGNEES } from "@/data";
import { todayISO } from "@/lib/format";
import Button from "./Button";

interface AddTaskFormProps {
  boardId: string;
  onAdd: (task: Task) => void;
  onCancel: () => void;
}

interface Errors {
  title?: string;
  assignee?: string;
  dueDate?: string;
  priority?: string;
}

const field = "min-h-10 w-full rounded-lg border border-line px-3 py-2 text-base sm:text-sm";

export default function AddTaskForm({ boardId, onAdd, onCancel }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<Priority | "">("");
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): Errors => {
    const e: Errors = {};
    if (title.trim().length < 3) e.title = "Enter a title with at least 3 characters.";
    if (!assignee) e.assignee = "Choose who will do this task.";
    if (!dueDate) e.dueDate = "Pick a due date.";
    else if (dueDate < todayISO()) e.dueDate = "The due date cannot be in the past.";
    if (!priority) e.priority = "Select a priority.";
    return e;
  };

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0 || !priority) return;
    onAdd({
      id: `new-${Date.now()}`,
      boardId,
      title: title.trim(),
      description: description.trim(),
      status: "todo",
      priority,
      assignee,
      dueDate,
      tags: [],
    });
  };

  const err = (msg?: string) => msg && <p className="mt-1 text-xs text-rose-700">{msg}</p>;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium">Title</label>
        <input id="title" className={field} value={title} onChange={(e) => setTitle(e.target.value)} aria-invalid={!!errors.title} />
        {err(errors.title)}
      </div>
      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium">Description (optional)</label>
        <textarea id="description" rows={3} className={field} value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="assignee" className="mb-1 block text-sm font-medium">Assignee</label>
          <select id="assignee" className={field} value={assignee} onChange={(e) => setAssignee(e.target.value)} aria-invalid={!!errors.assignee}>
            <option value="">Select a person</option>
            {ASSIGNEES.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
          {err(errors.assignee)}
        </div>
        <div>
          <label htmlFor="priority" className="mb-1 block text-sm font-medium">Priority</label>
          <select id="priority" className={field} value={priority} onChange={(e) => setPriority(e.target.value as Priority | "")} aria-invalid={!!errors.priority}>
            <option value="">Select priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {err(errors.priority)}
        </div>
      </div>
      <div>
        <label htmlFor="dueDate" className="mb-1 block text-sm font-medium">Due date</label>
        <input id="dueDate" type="date" className={field} value={dueDate} onChange={(e) => setDueDate(e.target.value)} aria-invalid={!!errors.dueDate} />
        {err(errors.dueDate)}
      </div>
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Add task</Button>
      </div>
    </form>
  );
}
