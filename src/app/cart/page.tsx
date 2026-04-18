import { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import CartView from "@/components/CartView";

export const metadata: Metadata = {
  title: "Shopping Bag",
  description: "Review the items in your Martinonoir shopping bag.",
};

export default function CartPage() {
  return (
    <PageLayout>
      <CartView />
    </PageLayout>
  );
}
