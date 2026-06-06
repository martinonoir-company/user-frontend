import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export interface LegalTable {
  /** Optional caption rendered above the table. */
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface LegalSubSection {
  /** Bold lead-in (e.g. "4.1 Strictly Necessary Cookies"). */
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface LegalSection {
  heading: string;
  /** Each entry is one paragraph. */
  paragraphs?: string[];
  /** Optional bullet list rendered after the paragraphs. */
  bullets?: string[];
  /** Optional sub-sections (e.g. 4.1, 4.2). */
  subsections?: LegalSubSection[];
  /** Optional table — rendered after paragraphs/bullets. */
  table?: LegalTable;
  /** Optional definition list — rendered after table. */
  definitions?: Array<{ term: string; description: string }>;
}

export interface LegalContact {
  /** Lead-in line shown above the details. */
  intro?: string;
  /** Lines of contact detail (label/value pairs). */
  lines: Array<{ label?: string; value: string; href?: string }>;
  /** Optional closing paragraph (e.g. complaint procedure). */
  outro?: string;
}

interface LegalPageProps {
  /** Short label shown in the breadcrumb + eyebrow. */
  eyebrow: string;
  title: string;
  /** One-line summary under the title. */
  intro: string;
  /** ISO date the policy was last updated, e.g. "2026-05-29". */
  lastUpdated: string;
  /** Optional version label shown next to the date. */
  version?: string;
  sections: LegalSection[];
  /**
   * Per-page contact block. When omitted, the legacy default is shown.
   * Each policy in production should supply its own.
   */
  contact?: LegalContact;
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
  version,
  sections,
  contact,
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
            <p className="mt-5 text-xs text-white/35">
              Effective date: {formattedDate}
              {version ? ` · ${version}` : ""}
            </p>
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
                    {section.subsections?.map((sub, si) => (
                      <div key={si} className="pt-2">
                        {sub.heading && (
                          <p className="text-sm font-semibold text-ink-900 mb-1.5">
                            {sub.heading}
                          </p>
                        )}
                        <div className="space-y-2">
                          {sub.paragraphs?.map((p, pi) => (
                            <p
                              key={pi}
                              className="text-sm text-ink-600 leading-relaxed"
                            >
                              {p}
                            </p>
                          ))}
                          {sub.bullets && (
                            <ul className="space-y-1.5 pl-5 list-disc marker:text-accent-gold">
                              {sub.bullets.map((b, bi) => (
                                <li
                                  key={bi}
                                  className="text-sm text-ink-600 leading-relaxed"
                                >
                                  {b}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                    {section.definitions && (
                      <dl className="space-y-2.5 pt-1">
                        {section.definitions.map((d, di) => (
                          <div key={di} className="text-sm leading-relaxed">
                            <dt className="inline font-semibold text-ink-900">
                              {d.term}
                            </dt>
                            <dd className="inline text-ink-600">
                              {" "}— {d.description}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}
                    {section.table && (
                      <div className="pt-2 overflow-x-auto">
                        {section.table.caption && (
                          <p className="text-xs text-ink-500 italic mb-2">
                            {section.table.caption}
                          </p>
                        )}
                        <table className="w-full text-xs md:text-sm border-collapse">
                          <thead>
                            <tr className="bg-surface-1">
                              {section.table.headers.map((h, hi) => (
                                <th
                                  key={hi}
                                  className="text-left font-semibold text-ink-900 px-3 py-2.5 border border-rule/40"
                                >
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {section.table.rows.map((row, ri) => (
                              <tr key={ri}>
                                {row.map((cell, ci) => (
                                  <td
                                    key={ci}
                                    className="text-ink-600 px-3 py-2.5 border border-rule/40 align-top leading-relaxed"
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Contact footer block */}
              {contact ? (
                <div className="mt-12 p-6 rounded-xl bg-surface-1 border border-rule/50 space-y-3">
                  {contact.intro && (
                    <p className="text-sm text-ink-600 leading-relaxed">
                      {contact.intro}
                    </p>
                  )}
                  <dl className="space-y-1.5">
                    {contact.lines.map((line, li) => (
                      <div
                        key={li}
                        className="flex flex-col sm:flex-row sm:gap-2 text-sm leading-relaxed"
                      >
                        {line.label && (
                          <dt className="font-semibold text-ink-900 sm:min-w-[120px]">
                            {line.label}:
                          </dt>
                        )}
                        <dd className="text-ink-600 break-words">
                          {line.href ? (
                            <a
                              href={line.href}
                              className="text-primary-700 hover:text-primary-800 transition-colors"
                            >
                              {line.value}
                            </a>
                          ) : (
                            line.value
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  {contact.outro && (
                    <p className="text-sm text-ink-600 leading-relaxed pt-2">
                      {contact.outro}
                    </p>
                  )}
                </div>
              ) : (
                <div className="mt-12 p-6 rounded-xl bg-surface-1 border border-rule/50">
                  <p className="text-sm text-ink-600 leading-relaxed">
                    Questions about this policy? Contact us at{" "}
                    <a
                      href="mailto:mail@martinonoir.com"
                      className="text-primary-700 font-medium hover:text-primary-800 transition-colors"
                    >
                      mail@martinonoir.com
                    </a>
                    .
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
