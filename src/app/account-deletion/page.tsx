import { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import AccountDeletionForm from "@/components/AccountDeletionForm";

export const metadata: Metadata = {
  title: "Delete Your Account",
  description:
    "Permanently delete your Martinonoir account and associated personal data.",
  robots: { index: false, follow: false },
};

export default function AccountDeletionPage() {
  return (
    <PageLayout>
      <AccountDeletionForm />
    </PageLayout>
  );
}
