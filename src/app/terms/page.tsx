import { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms and conditions that govern your use of the Martinonoir website and your purchases.",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms of Service"
      title="Terms of Service"
      intro="These terms govern your use of the Martinonoir website and the purchase of our products. By using our site or placing an order, you agree to them."
      lastUpdated="2026-05-16"
      sections={[
        {
          heading: "Using our website",
          paragraphs: [
            "You may browse and shop on our website for lawful, personal purposes. You agree not to misuse the site, attempt to disrupt it, or access it through automated means without our permission.",
          ],
        },
        {
          heading: "Orders and acceptance",
          paragraphs: [
            "Placing an order is an offer to buy. An order is accepted only once we confirm it and dispatch the goods. We may decline or cancel an order — for example, if an item is out of stock, a pricing error occurred, or payment could not be verified.",
          ],
        },
        {
          heading: "Pricing and payment",
          paragraphs: [
            "Prices are shown in Nigerian Naira (₦) or US Dollars ($) and include applicable taxes unless stated otherwise. Payment must be completed before an order is dispatched. We make every effort to ensure prices are accurate, but if an error is found we will contact you before proceeding.",
          ],
        },
        {
          heading: "Shipping and delivery",
          paragraphs: [
            "Delivery timelines are estimates, not guarantees. Risk in the goods passes to you on delivery. Please review our Shipping Information page for current rates and timeframes.",
          ],
        },
        {
          heading: "Returns and exchanges",
          paragraphs: [
            "Eligible items may be returned or exchanged in line with our Returns & Exchanges policy. Items must be unused and in their original condition and packaging.",
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            "All content on this website — including the Martinonoir name, logo, product designs, images, and text — is owned by Martinonoir and protected by law. You may not reproduce or use it without our written permission.",
          ],
        },
        {
          heading: "Limitation of liability",
          paragraphs: [
            "To the fullest extent permitted by law, Martinonoir is not liable for indirect or consequential losses arising from the use of our website or products. Nothing in these terms excludes liability that cannot be excluded under Nigerian law.",
          ],
        },
        {
          heading: "Governing law",
          paragraphs: [
            "These terms are governed by the laws of the Federal Republic of Nigeria, and any disputes are subject to the jurisdiction of the Nigerian courts.",
          ],
        },
      ]}
    />
  );
}
