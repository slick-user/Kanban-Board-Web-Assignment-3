import type { Metadata } from "next";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <p className="text-6xl font-bold text-brand">404</p>
      <h1 className="mt-4 text-2xl font-bold">We could not find that page</h1>
      <p className="mt-2 text-muted">The board or task may have been removed, or the link is wrong.</p>
      <div className="mt-6 flex justify-center gap-2">
        <Button href="/boards">Browse boards</Button>
        <Button href="/" variant="secondary">Go home</Button>
      </div>
    </div>
  );
}
