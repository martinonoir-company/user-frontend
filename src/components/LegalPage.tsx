import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export interface LegalSection {
  heading: string;
  /** Each entry is one paragraph. */
  paragraphs?: string[];
  /** Optional bullet list rendered after the paragraphs. */
  bullets?: string[];
}

interface LegalPageProps {
  /** Short label shown in the breadcrumb + eyebrow. */
  eyebrow: string;
  title: string;
  /** One-line summary under the title. */
  intro: string;
  /** ISO date the policy was last updated, e.g. "2026-05-16". */
  lastUpdated: string;
  sections: LegalSection[];
}

/**
 * Shared layout for the storefront's legal pages (Privacy, Terms, Cookies,
 * Data Protection). Keeps them visually consistent and content-driven so
 * each page file is just data.
 */
export default function LegalPage({
  eyebrow,
  title,
  intro,
  lastUpdated,
  sections,
}: LegalPageProps) {
  const formattedDate = new Date(lastUpdated).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative bg-ink-900 pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(201,169,110,0.08),transparent_55%)]" />
          <div className="content-grid relative z-10">
            <nav className="flex items-center gap-1.5 text-xs text-white/30 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white/60 transition-colors duration-micro">
                Home
              </Link>
              <ChevronRight size={12} className="text-white/20" />
              <span className="text-white/50">{eyebrow}</span>
            </nav>
            <span className="text-accent-gold text-xs font-semibold tracking-[0.2em] uppercase">
              Legal
            </span>
            <h1 className="mt-3 text-4xl md:text-5xl font-display font-bold text-white leading-[1.1]">
              {title}
            </h1>
            <p className="mt-4 text-base md:text-lg text-white/55 max-w-2xl leading-relaxed">
              {intro}
            </p>
            <p className="mt-5 text-xs text-white/35">Last updated: {formattedDate}</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-24 bg-surface-0">
          <div className="content-grid">
            <div className="max-w-3xl space-y-10">
              {sections.map((section, i) => (
                <div key={section.heading}>
                  <h2 className="text-lg md:text-xl font-display font-bold text-ink-900 flex items-baseline gap-3">
                    <span className="text-accent-gold text-sm font-mono">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {section.heading}
                  </h2>
                  <div className="mt-3 space-y-3 pl-0 md:pl-9">
                    {section.paragraphs?.map((p, pi) => (
                      <p key={pi} className="text-sm text-ink-600 leading-relaxed">
                        {p}
                      </p>
                    ))}
                    {section.bullets && (
                      <ul className="space-y-1.5 pl-5 list-disc marker:text-accent-gold">
                        {section.bullets.map((b, bi) => (
                          <li key={bi} className="text-sm text-ink-600 leading-relaxed">
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}

              {/* Contact footer block */}
              <div className="mt-12 p-6 rounded-xl bg-surface-1 border border-rule/50">
                <p className="text-sm text-ink-600 leading-relaxed">
                  Questions about this policy? Contact us at{" "}
                  <a
                    href="mailto:privacy@martinonoir.com"
                    className="text-primary-700 font-medium hover:text-primary-800 transition-colors"
                  >
                    privacy@martinonoir.com
                  </a>{" "}
                  or write to Martinonoir, Lagos, Nigeria.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
