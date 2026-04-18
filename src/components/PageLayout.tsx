"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ReactNode } from "react";

/**
 * Standard page layout for non-homepage pages.
 * Adds top padding to clear the fixed header (announcement bar + nav).
 *
 * Header heights:
 * - Announcement bar: ~36px (py-2.5 + text)
 * - Nav bar: 64px mobile (h-16) / 80px desktop (h-20)
 * - Total: ~100px mobile / ~116px desktop
 * - Using 120px/136px with buffer for safety
 */
export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 pt-[120px] md:pt-[136px]">
        {children}
      </main>
      <Footer />
    </>
  );
}
