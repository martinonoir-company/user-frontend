import { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import WishlistView from "@/components/WishlistView";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Your saved items on Martinonoir.",
};

export default function WishlistPage() {
  return (
    <PageLayout>
      <WishlistView />
    </PageLayout>
  );
}
