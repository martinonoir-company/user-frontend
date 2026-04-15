import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Martinonoir — Luxury Bags, Clothing & Accessories",
    template: "%s | Martinonoir",
  },
  description:
    "Discover Martinonoir's curated collection of premium leather bags, designer clothing, and luxury accessories. Crafted with intention, delivered with care.",
  keywords: [
    "luxury bags",
    "leather bags",
    "designer clothing",
    "fashion accessories",
    "premium fashion",
    "Martinonoir",
  ],
  openGraph: {
    type: "website",
    siteName: "Martinonoir",
    title: "Martinonoir — Luxury Bags, Clothing & Accessories",
    description:
      "Curated collection of premium leather bags, designer clothing, and luxury accessories.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
