import type { Metadata } from "next";
import NewBoardForm from "@/components/NewBoardForm";
import { categories } from "@/data";

export const metadata: Metadata = {
  title: "New board",
  description: "Create a new Kanban board with a name, description and category.",
};

export default function NewBoardPage() {
  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-bold sm:text-3xl">Create a board</h1>
      <NewBoardForm categories={categories} minNameLength={3} />
    </div>
  );
}
