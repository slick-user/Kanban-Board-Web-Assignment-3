"use client";

interface FavouriteButtonProps {
  boardName: string;
  active: boolean;
  onToggle: () => void;
}

export default function FavouriteButton({ boardName, active, onToggle }: FavouriteButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      aria-label={active ? `Remove ${boardName} from favourites` : `Add ${boardName} to favourites`}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm ring-1 ring-black/10 transition hover:scale-105"
    >
      <svg viewBox="0 0 20 20" aria-hidden className={`h-5 w-5 ${active ? "fill-amber-400 stroke-amber-500" : "fill-none stroke-ink/60"}`} strokeWidth={1.5}>
        <path d="M10 2.5l2.3 4.7 5.2.8-3.8 3.6.9 5.1L10 14.3l-4.6 2.4.9-5.1-3.8-3.6 5.2-.8z" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
