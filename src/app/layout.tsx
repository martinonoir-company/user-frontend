import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Martinonoir — Premium Leather Bags",
    template: "%s | Martinonoir",
  },
  description:
    "Discover Martinonoir's curated collection of premium leather bags — crossbody, backpacks, messenger bags, and travel duffels. Crafted with intention, delivered with care.",
  keywords: [
    "leather bags",
    "crossbody bags",
    "laptop bags",
    "messenger bags",
    "travel bags",
    "premium bags",
    "Martinonoir",
  ],
  openGraph: {
    type: "website",
    siteName: "Martinonoir",
    title: "Martinonoir — Premium Leather Bags",
    description:
      "Curated collection of premium leather crossbody, backpack, messenger, and travel bags.",
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
      <body className="min-h-screen flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

