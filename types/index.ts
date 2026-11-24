export type Status = "todo" | "in-progress" | "review" | "done";
export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  boardId: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee: string;
  dueDate: string; // YYYY-MM-DD
  tags: string[];
}

export interface Board {
  id: string;
  name: string;
  description: string;
  category: string;
  cover: string;
  createdAt: string; // YYYY-MM-DD
}

export type BoardWithCount = Board & { taskCount: number };

export interface DropTarget {
  status: Status;
  beforeId: string | null; // insert before this task, or null for the end of the column
}
