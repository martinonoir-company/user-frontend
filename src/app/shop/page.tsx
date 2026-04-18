import { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import ShopGrid from "@/components/ShopGrid";

export const metadata: Metadata = {
  title: "Shop All Bags",
  description:
    "Browse Martinonoir's full collection of premium leather bags — crossbody, backpacks, messenger bags, and travel duffels.",
};

export default function ShopPage() {
  return (
    <PageLayout>
      <ShopGrid />
    </PageLayout>
  );
}
