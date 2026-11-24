import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-sm sm:px-6 sm:py-8 text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>TaskFlow. CS4032 Web Programming, Assignment 3, Fall 2026.</p>
        <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer">
          <Link href="/boards" className="hover:text-brand">Boards</Link>
          <Link href="/boards/new" className="hover:text-brand">New board</Link>
          <Link href="/about" className="hover:text-brand">About</Link>
        </nav>
      </div>
    </footer>
  );
}
