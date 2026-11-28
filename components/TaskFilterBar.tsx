"use client";

import type { Priority } from "@/types";

export type PriorityFilter = Priority | "all";

interface TaskFilterBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  priority: PriorityFilter;
  onPriorityChange: (value: PriorityFilter) => void;
  assignee: string;
  onAssigneeChange: (value: string) => void;
  assignees: string[];
  shown: number;
  total: number;
  onClear: () => void;
}

const field = "min-h-10 w-full rounded-lg border border-line bg-white px-3 py-2 text-base sm:text-sm";

export default function TaskFilterBar({
  query,
  onQueryChange,
  priority,
  onPriorityChange,
  assignee,
  onAssigneeChange,
  assignees,
  shown,
  total,
  onClear,
}: TaskFilterBarProps) {
  const active = query.trim() !== "" || priority !== "all" || assignee !== "all";

  return (
    <div className="mb-6 space-y-2">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <label htmlFor="task-search" className="sr-only">Search tasks</label>
          <input
            id="task-search"
            type="search"
            placeholder="Search tasks by title or tag"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className={field}
          />
        </div>
        <div>
          <label htmlFor="task-priority" className="sr-only">Filter by priority</label>
          <select
            id="task-priority"
            value={priority}
            onChange={(e) => onPriorityChange(e.target.value as PriorityFilter)}
            className={field}
          >
            <option value="all">All priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div>
          <label htmlFor="task-assignee" className="sr-only">Filter by assignee</label>
          <select id="task-assignee" value={assignee} onChange={(e) => onAssigneeChange(e.target.value)} className={field}>
            <option value="all">Everyone</option>
            {assignees.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm text-muted" aria-live="polite">
        <span>Showing {shown} of {total} tasks</span>
        {active && (
          <button type="button" onClick={onClear} className="inline-flex min-h-10 items-center font-medium text-brand hover:underline">
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
