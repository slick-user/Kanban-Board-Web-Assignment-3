import type { Board, Status, Task } from "@/types";

export const STATUSES: { key: Status; label: string }[] = [
  { key: "todo", label: "To do" },
  { key: "in-progress", label: "In progress" },
  { key: "review", label: "In review" },
  { key: "done", label: "Done" },
];

export const STATUS_LABEL: Record<Status, string> = {
  todo: "To do",
  "in-progress": "In progress",
  review: "In review",
  done: "Done",
};

export const ASSIGNEES = ["Ayesha Khan", "Bilal Ahmed", "Hira Malik", "Usman Tariq", "Sana Raza"];

export const boards: Board[] = [
  { id: "b1", name: "Website Redesign", description: "Refresh the university club site: new layout, faster pages and a clearer sign-up flow.", category: "Design", cover: "/covers/b1.svg", createdAt: "2026-09-02" },
  { id: "b2", name: "Mobile App Launch", description: "Everything between a working prototype and the first store release.", category: "Product", cover: "/covers/b2.svg", createdAt: "2026-09-18" },
  { id: "b3", name: "Exam Prep", description: "Revision plan for the December finals, one topic per card.", category: "Study", cover: "/covers/b3.svg", createdAt: "2026-10-05" },
  { id: "b4", name: "Marketing Q1", description: "Campaigns, content and events planned for the first quarter.", category: "Marketing", cover: "/covers/b4.svg", createdAt: "2026-10-21" },
  { id: "b5", name: "Security Lab", description: "Lab exercises on scanning, hardening and reporting for the cyber security course.", category: "Security", cover: "/covers/b5.svg", createdAt: "2026-11-03" },
  { id: "b6", name: "Capstone Project", description: "Final year project milestones, supervisor meetings and report chapters.", category: "Study", cover: "/covers/b6.svg", createdAt: "2026-11-10" },
];

export const tasks: Task[] = [
  { id: "t1", boardId: "b1", title: "Audit current navigation", description: "List every page on the old site and mark which ones get visitors. Flag dead links.", status: "done", priority: "medium", assignee: "Ayesha Khan", dueDate: "2026-12-01", tags: ["research"] },
  { id: "t2", boardId: "b1", title: "Design new home page", description: "Create the home page layout in Figma for desktop and mobile widths.", status: "in-progress", priority: "high", assignee: "Hira Malik", dueDate: "2026-12-05", tags: ["design", "figma"] },
  { id: "t3", boardId: "b1", title: "Build sign-up form", description: "Controlled form with inline validation and a clear success message.", status: "todo", priority: "high", assignee: "Bilal Ahmed", dueDate: "2026-12-10", tags: ["frontend"] },
  { id: "t4", boardId: "b1", title: "Compress hero images", description: "Convert hero images to WebP and keep each under 150 KB.", status: "review", priority: "low", assignee: "Sana Raza", dueDate: "2026-12-03", tags: ["performance"] },
  { id: "t5", boardId: "b2", title: "Finalise onboarding screens", description: "Three screens maximum. Test them with five students.", status: "in-progress", priority: "high", assignee: "Hira Malik", dueDate: "2026-12-07", tags: ["design", "ux"] },
  { id: "t6", boardId: "b2", title: "Set up crash reporting", description: "Add crash reporting to the beta build and send a test crash.", status: "todo", priority: "medium", assignee: "Usman Tariq", dueDate: "2026-12-12", tags: ["engineering"] },
  { id: "t7", boardId: "b2", title: "Write store description", description: "Short and long descriptions plus five screenshots with captions.", status: "todo", priority: "low", assignee: "Ayesha Khan", dueDate: "2026-12-15", tags: ["content"] },
  { id: "t8", boardId: "b2", title: "Fix login bug on Android 12", description: "Keyboard hides the password field on small screens. Reproduce and fix.", status: "review", priority: "high", assignee: "Bilal Ahmed", dueDate: "2026-12-02", tags: ["bug"] },
  { id: "t9", boardId: "b3", title: "Revise Web Programming notes", description: "Routing, Server vs Client Components and forms. Redo last year's past paper.", status: "in-progress", priority: "high", assignee: "Sana Raza", dueDate: "2026-12-08", tags: ["revision"] },
  { id: "t10", boardId: "b3", title: "Practice networking numericals", description: "Subnetting and routing tables, twenty problems.", status: "todo", priority: "medium", assignee: "Usman Tariq", dueDate: "2026-12-11", tags: ["revision"] },
  { id: "t11", boardId: "b3", title: "Make cryptography cheat sheet", description: "One page: symmetric vs asymmetric, hashing, common attacks.", status: "done", priority: "low", assignee: "Ayesha Khan", dueDate: "2026-11-28", tags: ["notes"] },
  { id: "t12", boardId: "b4", title: "Plan launch week posts", description: "Seven posts, one per day, with draft captions and dates.", status: "in-progress", priority: "medium", assignee: "Hira Malik", dueDate: "2026-12-14", tags: ["social"] },
  { id: "t13", boardId: "b4", title: "Book campus stall", description: "Confirm the date and table size with the student affairs office.", status: "todo", priority: "low", assignee: "Bilal Ahmed", dueDate: "2026-12-18", tags: ["events"] },
  { id: "t14", boardId: "b4", title: "Review sponsor email draft", description: "Check tone, add the pricing table and send to the faculty advisor.", status: "review", priority: "medium", assignee: "Sana Raza", dueDate: "2026-12-04", tags: ["email"] },
  { id: "t15", boardId: "b5", title: "Run port scan on lab network", description: "Use the approved lab VM only. Save the scan output for the report.", status: "done", priority: "medium", assignee: "Usman Tariq", dueDate: "2026-11-30", tags: ["scanning"] },
  { id: "t16", boardId: "b5", title: "Harden SSH configuration", description: "Disable password login, change the default port and test key access.", status: "in-progress", priority: "high", assignee: "Ayesha Khan", dueDate: "2026-12-06", tags: ["hardening"] },
  { id: "t17", boardId: "b5", title: "Write vulnerability report", description: "Findings table with severity, evidence and a recommended fix for each.", status: "todo", priority: "high", assignee: "Hira Malik", dueDate: "2026-12-13", tags: ["report"] },
  { id: "t18", boardId: "b5", title: "Capture traffic with Wireshark", description: "Record a login session and explain what is visible in plain text.", status: "review", priority: "low", assignee: "Bilal Ahmed", dueDate: "2026-12-09", tags: ["analysis"] },
  { id: "t19", boardId: "b6", title: "Submit proposal to supervisor", description: "Two pages: problem, approach and a week-by-week plan.", status: "done", priority: "high", assignee: "Sana Raza", dueDate: "2026-11-25", tags: ["milestone"] },
  { id: "t20", boardId: "b6", title: "Draft literature review", description: "Summarise ten papers and group them by approach.", status: "in-progress", priority: "medium", assignee: "Usman Tariq", dueDate: "2026-12-20", tags: ["writing"] },
];

export const categories = Array.from(new Set(boards.map((b) => b.category))).sort();

export const getBoard = (id: string) => boards.find((b) => b.id === id);
export const getTask = (id: string) => tasks.find((t) => t.id === id);
export const getTasksForBoard = (boardId: string) => tasks.filter((t) => t.boardId === boardId);
