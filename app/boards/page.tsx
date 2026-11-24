import type { Metadata } from "next";
import BoardsExplorer from "@/components/BoardsExplorer";
import Button from "@/components/Button";
import { boards, categories, getTasksForBoard } from "@/data";

export const metadata: Metadata = {
  title: "Boards",
  description: "Browse all boards. Search by name, filter by category and sort the list.",
};

export default function BoardsPage() {
  const withCounts = boards.map((b) => ({ ...b, taskCount: getTasksForBoard(b.id).length }));
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-2xl font-bold sm:text-3xl">Boards</h1>
        <Button href="/boards/new">New board</Button>
      </div>
      <BoardsExplorer boards={withCounts} categories={categories} />
    </div>
  );
}
