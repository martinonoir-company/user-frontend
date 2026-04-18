import { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import AccountView from "@/components/AccountView";

export const metadata: Metadata = {
  title: "My Account",
  description: "Manage your Martinonoir account, profile, and order history.",
};

export default function AccountPage() {
  return (
    <PageLayout>
      <AccountView />
    </PageLayout>
  );
}
