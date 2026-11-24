"use client";

import { useMemo, useState } from "react";
import type { BoardWithCount } from "@/types";
import BoardCard from "./BoardCard";
import EmptyState from "./EmptyState";
import SearchFilterBar from "./SearchFilterBar";
import Button from "./Button";

interface BoardsExplorerProps {
  boards: BoardWithCount[];
  categories: string[];
}

export default function BoardsExplorer({ boards, categories }: BoardsExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = boards.filter(
      (b) =>
        (category === "all" || b.category === category) &&
        (q === "" || b.name.toLowerCase().includes(q) || b.description.toLowerCase().includes(q))
    );
    return [...list].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "tasks") return b.taskCount - a.taskCount;
      return b.createdAt.localeCompare(a.createdAt);
    });
  }, [boards, query, category, sort]);

  const reset = () => {
    setQuery("");
    setCategory("all");
  };

  return (
    <div className="space-y-6">
      <SearchFilterBar
        query={query}
        onQueryChange={setQuery}
        category={category}
        onCategoryChange={setCategory}
        sort={sort}
        onSortChange={setSort}
        categories={categories}
      />
      <p className="text-sm text-muted" aria-live="polite">
        Showing {visible.length} of {boards.length} boards
      </p>
      {visible.length === 0 ? (
        <EmptyState
          title="No boards match"
          message="Try a different search word or choose All categories."
          action={<Button variant="secondary" onClick={reset}>Clear filters</Button>}
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((b) => (
            <BoardCard key={b.id} board={b} taskCount={b.taskCount} />
          ))}
        </div>
      )}
    </div>
  );
}
