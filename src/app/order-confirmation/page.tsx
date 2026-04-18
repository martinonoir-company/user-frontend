import { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import OrderConfirmation from "@/components/OrderConfirmation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your Martinonoir order has been placed successfully.",
};

export default function OrderConfirmationPage() {
  return (
    <PageLayout>
      <Suspense fallback={<div className="content-grid py-20 text-center text-ink-500">Loading...</div>}>
        <OrderConfirmation />
      </Suspense>
    </PageLayout>
  );
}
