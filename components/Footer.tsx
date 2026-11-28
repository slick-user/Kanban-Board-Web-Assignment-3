import Link from "next/link";

export interface FooterLink {
  href: string;
  label: string;
}

interface FooterProps {
  tagline: string;
  links: FooterLink[];
}

export default function Footer({ tagline, links }: FooterProps) {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-sm sm:px-6 sm:py-8 text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>{tagline}</p>
        <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="inline-flex min-h-10 items-center hover:text-brand">{l.label}</Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
