import { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How Martinonoir uses cookies and similar technologies on its website.",
};

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Cookie Policy"
      title="Cookie Policy"
      intro="This policy explains what cookies are, how Martinonoir uses them, and how you can control them."
      lastUpdated="2026-05-16"
      sections={[
        {
          heading: "What are cookies",
          paragraphs: [
            "Cookies are small text files stored on your device when you visit a website. They help the site remember your actions and preferences so you don’t have to re-enter them on every visit.",
          ],
        },
        {
          heading: "How we use cookies",
          paragraphs: ["We use a small number of cookies for the following purposes:"],
          bullets: [
            "Essential — to keep you signed in, remember your cart, and process orders. The site cannot function without these.",
            "Preferences — to remember choices such as your preferred currency.",
            "Analytics — to understand how the site is used so we can improve it. These are aggregated and do not identify you personally.",
          ],
        },
        {
          heading: "Third-party cookies",
          paragraphs: [
            "Some cookies are set by our service partners — for example, payment providers during checkout. These are governed by the respective providers’ own privacy policies.",
          ],
        },
        {
          heading: "Managing cookies",
          paragraphs: [
            "You can control or delete cookies through your browser settings. Note that disabling essential cookies may prevent parts of the store — such as the cart and checkout — from working correctly.",
          ],
        },
        {
          heading: "Updates to this policy",
          paragraphs: [
            "We may update this Cookie Policy as our website evolves. The latest version will always be available on this page.",
          ],
        },
      ]}
    />
  );
}
