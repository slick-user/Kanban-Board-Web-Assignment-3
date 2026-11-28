"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavLink {
  href: string;
  label: string;
}

const links: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/boards", label: "Boards" },
  { href: "/boards/new", label: "New board" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const linkClass = (href: string) => {
    const active = href === "/" ? pathname === "/" : pathname === href || (href === "/boards" && pathname.startsWith("/boards") && pathname !== "/boards/new");
    return `rounded-md px-3 py-2.5 text-sm font-medium md:py-2 ${active ? "bg-brand/10 text-brand-dark" : "text-ink hover:bg-ink/5"}`;
  };

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex min-h-10 items-center gap-2 text-lg font-bold">
          <Image src="/logo.svg" alt="" width={28} height={28} />
          TaskFlow
        </Link>
        <nav className="hidden gap-1 md:flex" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="min-h-10 rounded-md border border-line px-4 text-sm font-medium md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav id="mobile-menu" className="flex flex-col gap-1 border-t border-line px-4 py-3 sm:px-6 md:hidden" aria-label="Mobile">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
