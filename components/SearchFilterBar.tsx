"use client";

interface SearchFilterBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
  categories: string[];
}

const field = "rounded-lg border border-line bg-white px-3 py-2 text-sm";

export default function SearchFilterBar({ query, onQueryChange, category, onCategoryChange, sort, onSortChange, categories }: SearchFilterBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="flex-1">
        <label htmlFor="search" className="sr-only">Search boards</label>
        <input
          id="search"
          type="search"
          placeholder="Search boards"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className={`${field} w-full`}
        />
      </div>
      <div>
        <label htmlFor="category" className="sr-only">Filter by category</label>
        <select id="category" value={category} onChange={(e) => onCategoryChange(e.target.value)} className={`${field} w-full`}>
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="sort" className="sr-only">Sort boards</label>
        <select id="sort" value={sort} onChange={(e) => onSortChange(e.target.value)} className={`${field} w-full`}>
          <option value="newest">Newest first</option>
          <option value="name">Name A to Z</option>
          <option value="tasks">Most tasks</option>
        </select>
      </div>
    </div>
  );
}
