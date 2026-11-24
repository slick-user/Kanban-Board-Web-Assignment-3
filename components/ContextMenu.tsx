"use client";

import { useEffect, useLayoutEffect, useRef, type KeyboardEvent } from "react";

export type MenuEntry =
  | { type: "item"; label: string; onSelect: () => void; disabled?: boolean; checked?: boolean }
  | { type: "label"; label: string }
  | { type: "separator" };

interface ContextMenuProps {
  x: number;
  y: number;
  entries: MenuEntry[];
  onClose: () => void;
}

export default function ContextMenu({ x, y, entries, onClose }: ContextMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Keep the menu fully inside the viewport
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    el.style.left = `${Math.max(8, Math.min(x, window.innerWidth - width - 8))}px`;
    el.style.top = `${Math.max(8, Math.min(y, window.innerHeight - height - 8))}px`;
    el.focus({ preventScroll: true });
  }, [x, y]);

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) onClose();
    };
    const onScroll = (e: Event) => {
      if (!ref.current?.contains(e.target as Node)) onClose();
    };
    const onKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("pointerdown", onPointerDown, true);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onClose);
    window.addEventListener("blur", onClose);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown, true);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onClose);
      window.removeEventListener("blur", onClose);
    };
  }, [onClose]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const items = Array.from(ref.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)') ?? []);
    if (items.length === 0) return;
    const i = items.indexOf(document.activeElement as HTMLButtonElement);
    const next =
      e.key === "ArrowDown" ? (i + 1) % items.length : i === -1 ? items.length - 1 : (i - 1 + items.length) % items.length;
    items[next].focus();
  };

  return (
    <div
      ref={ref}
      role="menu"
      tabIndex={-1}
      aria-label="Task actions"
      onKeyDown={onKeyDown}
      onContextMenu={(e) => e.preventDefault()}
      style={{ left: x, top: y, transformOrigin: "top left" }}
      className="fixed z-50 max-h-[calc(100dvh-16px)] w-56 animate-[menu-in_120ms_ease-out] overflow-y-auto rounded-xl bg-white/85 p-1 text-[13px] shadow-2xl ring-1 ring-black/10 backdrop-blur-xl outline-none"
    >
      {entries.map((entry, i) => {
        if (entry.type === "separator") {
          return <div key={`s-${i}`} role="separator" className="mx-2 my-1 h-px bg-black/10" />;
        }
        if (entry.type === "label") {
          return (
            <p key={`l-${i}`} className="px-2.5 pb-0.5 pt-1.5 text-[11px] font-medium text-muted">
              {entry.label}
            </p>
          );
        }
        return (
          <button
            key={`i-${i}`}
            type="button"
            role="menuitem"
            disabled={entry.disabled}
            onClick={() => {
              entry.onSelect();
              onClose();
            }}
            className="flex w-full items-center gap-1 rounded-md px-2 py-1 text-left hover:bg-brand hover:text-white focus:bg-brand focus:text-white focus:outline-none disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-inherit"
          >
            <span className="w-4 text-center text-xs" aria-hidden>{entry.checked ? "✓" : ""}</span>
            {entry.label}
          </button>
        );
      })}
    </div>
  );
}
