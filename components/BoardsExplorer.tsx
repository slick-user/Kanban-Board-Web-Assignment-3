"use client";

import { useMemo, useState } from "react";
import type { BoardWithCount } from "@/types";
import BoardCard from "./BoardCard";
import EmptyState from "./EmptyState";
import FavouriteButton from "./FavouriteButton";
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
  const [favourites, setFavourites] = useState<Set<string>>(new Set());
  const [favouritesOnly, setFavouritesOnly] = useState(false);

  const toggleFavourite = (id: string) =>
    setFavourites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = boards.filter(
      (b) =>
        (category === "all" || b.category === category) &&
        (!favouritesOnly || favourites.has(b.id)) &&
        (q === "" || b.name.toLowerCase().includes(q) || b.description.toLowerCase().includes(q))
    );
    return [...list].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "tasks") return b.taskCount - a.taskCount;
      return b.createdAt.localeCompare(a.createdAt);
    });
  }, [boards, query, category, sort, favourites, favouritesOnly]);

  const reset = () => {
    setQuery("");
    setCategory("all");
    setFavouritesOnly(false);
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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted" aria-live="polite">
          Showing {visible.length} of {boards.length} boards
        </p>
        <button
          type="button"
          onClick={() => setFavouritesOnly((on) => !on)}
          aria-pressed={favouritesOnly}
          className={`min-h-9 rounded-full border px-4 text-sm font-medium ${favouritesOnly ? "border-amber-400 bg-amber-50 text-ink" : "border-line bg-white text-muted hover:text-ink"}`}
        >
          ★ Favourites only ({favourites.size})
        </button>
      </div>
      {visible.length === 0 ? (
        <EmptyState
          title="No boards match"
          message={favouritesOnly && favourites.size === 0 ? "You have not starred any boards yet. Tap the star on a board to add it." : "Try a different search word or choose All categories."}
          action={<Button variant="secondary" onClick={reset}>Clear filters</Button>}
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((b) => (
            <BoardCard
              key={b.id}
              board={b}
              taskCount={b.taskCount}
              action={<FavouriteButton boardName={b.name} active={favourites.has(b.id)} onToggle={() => toggleFavourite(b.id)} />}
            />
          ))}
        </div>
      )}
    </div>
  );
}
