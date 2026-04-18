import { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import CheckoutView from "@/components/CheckoutView";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Martinonoir order.",
};

export default function CheckoutPage() {
  return (
    <PageLayout>
      <CheckoutView />
    </PageLayout>
  );
}
