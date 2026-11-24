import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description: "About TaskFlow, the Kanban frontend built for CS4032 Web Programming Assignment 3.",
};

const team = [
  { name: "Talha Malik", role: "Layout, Navbar, Footer, Home, About" },
  { name: "Mudassir Mumtaz", role: "Boards listing, search and filter, dynamic routes" },
  { name: "Azlan Ali Khan", role: "Kanban board, task form, new board form" },
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <div className="flex items-center gap-4">
        <Image src="/logo.svg" alt="TaskFlow logo" width={56} height={56} />
        <h1 className="text-2xl font-bold sm:text-3xl">About TaskFlow</h1>
      </div>
      <p className="text-base text-muted sm:text-lg">
        TaskFlow is a frontend-only Kanban app built with Next.js, React, TypeScript and Tailwind CSS. All data is mock data kept in the project, and actions such as adding a task only change React state.
      </p>
      <section>
        <h2 className="mb-3 text-xl font-bold">The team</h2>
        <ul className="grid gap-3 sm:grid-cols-3">
          {team.map((m) => (
            <li key={m.name} className="rounded-xl border border-line bg-white p-4">
              <p className="font-semibold">{m.name}</p>
              <p className="mt-1 text-sm text-muted">{m.role}</p>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-muted">Replace the placeholders with your real names.</p>
      </section>
    </div>
  );
}
