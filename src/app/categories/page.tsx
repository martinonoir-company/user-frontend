import { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import CategoriesGrid from "@/components/CategoriesGrid";

export const metadata: Metadata = {
  title: "Shop by Category",
  description: "Browse Martinonoir's bag collections — Crossbody, Backpacks, Messenger, and Travel bags.",
};

export default function CategoriesPage() {
  return (
    <PageLayout>
      <CategoriesGrid />
    </PageLayout>
  );
}
