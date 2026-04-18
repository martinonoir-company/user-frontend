import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://martinonoir.com";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1";

interface SitemapProduct {
  slug: string;
  updatedAt: string;
}

interface SitemapCategory {
  slug: string;
  updatedAt?: string;
}

async function fetchAllProducts(): Promise<SitemapProduct[]> {
  const all: SitemapProduct[] = [];
  let page = 1;
  const limit = 100;
  const maxPages = 50;

  while (page <= maxPages) {
    try {
      const res = await fetch(
        `${API_BASE}/products?page=${page}&limit=${limit}&isActive=true`,
        { next: { revalidate: 3600 } },
      );
      if (!res.ok) break;
      const json = await res.json();
      const items = json?.data?.items ?? [];
      if (items.length === 0) break;
      for (const p of items) {
        if (p?.slug) {
          all.push({ slug: p.slug, updatedAt: p.updatedAt ?? new Date().toISOString() });
        }
      }
      if (items.length < limit) break;
      page += 1;
    } catch {
      break;
    }
  }

  return all;
}

async function fetchCategories(): Promise<SitemapCategory[]> {
  try {
    const res = await fetch(`${API_BASE}/categories`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    const items = json?.data ?? [];
    return items
      .filter((c: { slug?: string }) => !!c?.slug)
      .map((c: { slug: string; updatedAt?: string }) => ({
        slug: c.slug,
        updatedAt: c.updatedAt,
      }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/shop`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/categories`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/sale`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const [products, categories] = await Promise.all([
    fetchAllProducts(),
    fetchCategories(),
  ]);

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/product/${p.slug}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${SITE_URL}/category/${c.slug}`,
    lastModified: c.updatedAt ? new Date(c.updatedAt) : now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
