# TaskFlow: Kanban Task Board

**CS4032 Web Programming, Assignment 3 (Fall 2026)**

- **Group number:** 43
- **Topic:** 40. Kanban task board (Productivity)

| Member     | Roll number  |
|------------|--------------|
| Azlan Ali Khan  | 24I-2110 |
| Talha Malik     | 24I-2066 |
| Mudassir Mumtaz | 24I-2021 |

## Description

TaskFlow is a frontend-only Kanban app. Users browse boards, open a board with four columns (To do, In progress, In review, Done), add, edit and delete tasks through validated forms, filter a board by priority or assignee, star favourite boards, and move tasks between columns. All data is mock data and all actions only change React state.

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
| `/boards` | All boards with search, category filter, sort and favourites |
| `/boards/new` | Create-board form with validation and a confirmation |
| `/boards/[id]` | Kanban board: drag cards between columns, filter by search, priority and assignee, add, edit and delete tasks, right-click menu (dynamic) |
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

- `KanbanBoard`, `Column`, `BoardTaskCard`: task state, drag and drop, expandable cards, priority editing, right-click menu.
- `ContextMenu`: outside-click, Escape and arrow-key handling.
- `AddTaskForm`, `NewBoardForm`: controlled inputs, validation, submit handlers. `AddTaskForm` is reused for both adding and editing via the `initialTask` prop.
- `TaskFilterBar`: search and filter inputs for the board.
- `FavouriteButton`: star toggle; kept separate so `BoardCard` can stay a Server Component on the home page.
- `BoardsExplorer`, `SearchFilterBar`: search, filter and sort state.
- `Navbar`: mobile menu state and `usePathname` for the active link.
- `Modal`, `Toast`: keyboard listener and timer effects.

All pages are Server Components that read the mock data and pass it down as props.

## Contributions

| Member | Pages | Components and features |
|---|---|---|
| Azlan Ali Khan (24I-2110) | All routes: `/`, `/boards`, `/boards/new`, `/boards/[id]`, `/boards/[id]/tasks/[taskId]`, `/about`, `layout.tsx`, `not-found.tsx`, `loading.tsx` | Initial app: Navbar, Footer, Button, Badge, Avatar, StatCard, BoardCard, TaskCard, SearchFilterBar, BoardsExplorer, EmptyState, KanbanBoard, Column, BoardTaskCard, ContextMenu, Modal, Toast, AddTaskForm, NewBoardForm, mock data and types, responsive UI |
| Talha Malik (24I-2066) | `/boards/[id]` | TaskFilterBar (search, priority and assignee filters); edit task by reusing AddTaskForm with an `initialTask` prop; fix for horizontal overflow at 375 px; Vercel deployment |
| Mudassir Mumtaz (24I-2021) | `/boards`, `/boards/[id]`, `/about` | FavouriteButton and favourites filter; delete task with a confirmation modal and a `danger` Button variant; typed props for Footer and NewBoardForm; About page and README |

## Links

- Repository: https://github.com/slick-user/Kanban-Board-Web-Assignment-3
- Video: <paste Google Drive or YouTube link, if not uploaded to the portal>
- Vercel (bonus): <paste live link>

## AI tools used

- Claude (Anthropic): used to help write and debug features and to check the production build. Each member reviewed and can explain the code they present.
