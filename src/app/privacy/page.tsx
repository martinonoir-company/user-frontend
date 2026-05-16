import { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Martinonoir collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy Policy"
      title="Privacy Policy"
      intro="This policy explains what personal information we collect when you shop with Martinonoir, why we collect it, and the choices you have over your data."
      lastUpdated="2026-05-16"
      sections={[
        {
          heading: "Information we collect",
          paragraphs: [
            "We collect information you provide directly — such as your name, email address, phone number, delivery address, and order history — when you create an account, place an order, or contact our support team.",
            "We also collect limited technical information automatically, including your device type, browser, and pages visited, to keep the store secure and improve your shopping experience.",
          ],
        },
        {
          heading: "How we use your information",
          paragraphs: ["We use your information to:"],
          bullets: [
            "Process and deliver your orders, and send order updates.",
            "Provide customer support and respond to your enquiries.",
            "Detect and prevent fraud, and keep your account secure.",
            "Improve our products, website, and services.",
            "Send marketing communications — only where you have opted in.",
          ],
        },
        {
          heading: "Payment information",
          paragraphs: [
            "We do not store full card details on our servers. Payments are processed by our payment partners (Paystack, Moniepoint, and Stripe), who are certified to handle card data securely.",
          ],
        },
        {
          heading: "Sharing your information",
          paragraphs: [
            "We share your information only with the parties needed to run our business — delivery partners, payment processors, and service providers that operate under strict confidentiality terms. We never sell your personal data.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "You may request access to the personal data we hold about you, ask us to correct or delete it, or withdraw consent for marketing at any time. To exercise any of these rights, contact us using the details below.",
          ],
        },
        {
          heading: "Data retention",
          paragraphs: [
            "We keep your information only for as long as needed to fulfil the purposes described here, or as required by Nigerian law — for example, for tax and accounting records.",
          ],
        },
        {
          heading: "Changes to this policy",
          paragraphs: [
            "We may update this policy from time to time. Any changes will be posted on this page with a revised “Last updated” date.",
          ],
        },
      ]}
    />
  );
}
