import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "TaskFlow | Kanban task boards", template: "%s | TaskFlow" },
  description: "TaskFlow is a Kanban task board app: create boards, add tasks and move them across columns.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex overflow-x-hidden min-h-screen flex-col font-sans antialiased">
        <Navbar />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
