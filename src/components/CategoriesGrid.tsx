"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api, Category } from "@/lib/api";
import { ChevronRight, ShoppingBag, Briefcase, Backpack, Luggage } from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "crossbody-bags": <ShoppingBag size={40} />,
  "backpack-bags": <Backpack size={40} />,
  "messenger-bags": <Briefcase size={40} />,
  "travel-bags": <Luggage size={40} />,
};

const CATEGORY_COLORS: Record<string, string> = {
  "crossbody-bags": "from-amber-900/80 to-amber-800/60",
  "backpack-bags": "from-slate-900/80 to-slate-800/60",
  "messenger-bags": "from-indigo-900/80 to-indigo-800/60",
  "travel-bags": "from-emerald-900/80 to-emerald-800/60",
};

export default function CategoriesGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCategories()
      .then((res) => setCategories(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="content-grid py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-surface-2 rounded w-1/3" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-surface-2 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="content-grid py-8 md:py-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-ink-900">
          Shop by Category
        </h1>
        <p className="mt-2 text-ink-500">
          Explore our curated bag collections
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            className="group relative overflow-hidden rounded-2xl bg-ink-900 h-72 flex flex-col justify-end p-8 transition-all hover:shadow-2xl hover:-translate-y-1"
          >
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${CATEGORY_COLORS[cat.slug] ?? "from-ink-900/80 to-ink-800/60"} transition-opacity`} />

            {/* Icon */}
            <div className="absolute top-8 right-8 text-white/15 group-hover:text-white/25 transition-colors">
              {CATEGORY_ICONS[cat.slug] ?? <ShoppingBag size={40} />}
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-2xl font-display font-bold text-white mb-1">
                {cat.name}
              </h2>
              {cat.alias && (
                <span className="text-accent-gold/70 text-xs font-medium tracking-wider uppercase">
                  Also: {cat.alias}
                </span>
              )}
              {cat.description && (
                <p className="text-white/50 text-sm line-clamp-2 mt-1 mb-4">
                  {cat.description}
                </p>
              )}
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-white/70 group-hover:text-white transition-colors">
                Shop Now
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
