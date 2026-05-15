import { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import CartView from "@/components/CartView";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review the items in your Martinonoir shopping cart.",
};

export default function CartPage() {
  return (
    <PageLayout>
      <CartView />
    </PageLayout>
  );
}
