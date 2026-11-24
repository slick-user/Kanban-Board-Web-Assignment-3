import type { Metadata } from "next";
import NewBoardForm from "@/components/NewBoardForm";

export const metadata: Metadata = {
  title: "New board",
  description: "Create a new Kanban board with a name, description and category.",
};

export default function NewBoardPage() {
  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-3xl font-bold">Create a board</h1>
      <NewBoardForm />
    </div>
  );
}
