# TaskFlow: Kanban Task Board

**CS4032 Web Programming, Assignment 3 (Fall 2026)**

- **Group number:** G41
- **Topic:** Kanban task board (Productivity), topic no. __

| Member          | Roll number |
|-----------------|-------------|
| Azlan Ali Khan  | 24I-2110    |
| Mudassir Mumtaz | 24I-        |
| Talha Malik     | 24I-        |

## Description

TaskFlow is a frontend-only Kanban app. Users browse boards, open a board with four columns (To do, In progress, In review, Done), add tasks through a validated form and move them between columns. All data is mock data and all actions only change React state.

## How to run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

Requires Node.js 20.9 or newer.

## Routes

| Route | Shows |
|---|---|
| `/` | Hero, stats and featured boards |
| `/boards` | All boards with search, category filter and sort |
| `/boards/new` | Create-board form with validation and a confirmation |
| `/boards/[id]` | Kanban board: columns, progress bar, add and move tasks (dynamic) |
| `/boards/[id]/tasks/[taskId]` | Task detail (dynamic) |
| `/about` | About the app and team |
| any unknown URL or ID | `not-found.tsx` (404) |

## Project structure

```
app/            routes, layout.tsx, not-found.tsx, loading.tsx
components/     reusable typed components
data/           mock boards (6) and tasks (20)
types/          TypeScript types (Board, Task, Status, Priority)
lib/            small helpers (date formatting)
public/         local SVG images used with next/image
```

## Server vs Client Components

Client Components (`'use client'`) and why:

- `KanbanBoard`: holds tasks in `useState`, handles move and add events.
- `AddTaskForm`, `NewBoardForm`: controlled inputs, validation, submit handlers.
- `BoardsExplorer`, `SearchFilterBar`: search, filter and sort state.
- `Navbar`: mobile menu state and `usePathname` for the active link.
- `Modal`, `Toast`: keyboard listener and timer effects.

All pages are Server Components that read the mock data and pass it down as props.

## Contributions

| Member | Pages | Components |
|---|---|---|
| A | `/`, `/about`, `layout.tsx` | Navbar, Footer, Button, Badge, Avatar, StatCard |
| B | `/boards`, `/boards/[id]/tasks/[taskId]`, `not-found.tsx`, `loading.tsx` | BoardCard, TaskCard, SearchFilterBar, BoardsExplorer, EmptyState |
| C | `/boards/[id]`, `/boards/new` | KanbanBoard, Column, Modal, Toast, AddTaskForm, NewBoardForm |

(Edit this table to match who really built what.)

## Links

- Repository: <paste GitHub/GitLab link>
- Video: <paste Google Drive or YouTube link, if not uploaded to the portal>
- Vercel (bonus): <paste live link>

## AI tools used

- Claude: Used to generate the starter project;
