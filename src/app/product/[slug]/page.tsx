import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import ProductDetail from "@/components/ProductDetail";
import type { Product } from "@/lib/api";

interface Props {
  params: Promise<{ slug: string }>;
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://martinonoir.com";

async function fetchProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE}/products/slug/${slug}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProduct(slug);

  if (!product) {
    const fallbackName = slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return {
      title: fallbackName,
      description: `Shop ${fallbackName} from Martinonoir's luxury collection.`,
    };
  }

  const title = product.metaTitle || product.name;
  const description =
    product.metaDescription ||
    product.shortDescription ||
    product.description?.slice(0, 160) ||
    `Shop ${product.name} from Martinonoir's premium leather collection.`;
  const image = product.media?.[0]?.url;
  const canonical = `${SITE_URL}/product/${product.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      images: image ? [{ url: image, alt: product.name }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

function buildJsonLd(product: Product) {
  const canonical = `${SITE_URL}/product/${product.slug}`;
  const images = (product.media ?? [])
    .filter((m) => m.url)
    .map((m) => m.url);

  const offers = (product.variants ?? []).map((v) => {
    const priceMinor = parseInt(v.retailPriceNgn, 10);
    const price = Number.isFinite(priceMinor) ? priceMinor / 100 : 0;
    return {
      "@type": "Offer",
      sku: v.sku,
      price: price.toFixed(2),
      priceCurrency: "NGN",
      availability: v.isActive
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: canonical,
      itemCondition: "https://schema.org/NewCondition",
    };
  });

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description:
      product.description ||
      product.shortDescription ||
      `${product.name} — Martinonoir premium leather collection.`,
    sku: product.variants?.[0]?.sku,
    image: images.length > 0 ? images : undefined,
    brand: {
      "@type": "Brand",
      name: "Martinonoir",
    },
    category: product.category?.name,
    url: canonical,
    offers:
      offers.length === 0
        ? undefined
        : offers.length === 1
          ? offers[0]
          : offers,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await fetchProduct(slug);
  const jsonLd = product ? buildJsonLd(product) : null;

  return (
    <PageLayout>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProductDetail slug={slug} initialProduct={product} />
    </PageLayout>
  );
}
