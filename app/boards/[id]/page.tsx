import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KanbanBoard from "@/components/KanbanBoard";
import { getBoard, getTasksForBoard } from "@/data";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const board = getBoard(id);
  if (!board) return { title: "Board not found" };
  return { title: board.name, description: board.description };
}

export default async function BoardPage({ params }: PageProps) {
  const { id } = await params;
  const board = getBoard(id);
  if (!board) notFound();
  return <KanbanBoard board={board} initialTasks={getTasksForBoard(id)} />;
}
