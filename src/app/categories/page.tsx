import { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import CategoriesGrid from "@/components/CategoriesGrid";

export const metadata: Metadata = {
  title: "All Categories",
  description: "Browse every Martinonoir collection — Crossbody, Backpacks, Messenger, Travel bags and more.",
};

export default function CategoriesPage() {
  return (
    <PageLayout>
      <CategoriesGrid />
    </PageLayout>
  );
}
