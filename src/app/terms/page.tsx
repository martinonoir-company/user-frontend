import { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "The terms and conditions that govern your use of the Martinonoir website and your purchases from MARTINO NOIR LIMITED.",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms and Conditions"
      title="Terms and Conditions"
      intro="These terms govern your use of the Martinonoir website and the purchase of our products. By using our site or placing an order, you agree to them."
      lastUpdated="2026-05-29"
      version="Version 1.0"
      sections={[
        /* ---------------------------------------------------------- 1 -- */
        {
          heading: "Introduction and Acceptance",
          paragraphs: [
            "Welcome to MARTINO NOIR LIMITED. These Terms and Conditions (\u201CTerms\u201D) govern your access to and use of our website at www.martinonoir.com (\u201CWebsite\u201D), our mobile applications, and any purchases you make from us, whether online or in-store.",
            "Please read these Terms carefully before using our Website or placing an order. By accessing our Website, creating an account, or placing an order, you confirm that you have read, understood, and agree to be bound by these Terms and our Privacy Policy, which is incorporated into these Terms by reference.",
            "If you do not agree with any part of these Terms, you must not use our Website or purchase from us.",
            "These Terms constitute a legally binding agreement between you and MARTINO NOIR LIMITED, a company registered in Nigeria with registration number RC 9438405 and registered address at GFD 57, Young Shall Grow Shopping Complex, 2, Johnson Main Market, Onitsha, Anambra State, Nigeria.",
            "We reserve the right to update or modify these Terms at any time. We will notify you of any material changes by posting the updated Terms on our Website and updating the effective date above. Continued use of our Website after such changes constitutes your acceptance of the revised Terms.",
          ],
        },
        /* ---------------------------------------------------------- 2 -- */
        {
          heading: "Definitions",
          definitions: [
            {
              term: "\u201CCompany\u201D, \u201Cwe\u201D, \u201Cus\u201D, or \u201Cour\u201D",
              description: "refers to MARTINO NOIR LIMITED.",
            },
            {
              term: "\u201CYou\u201D or \u201CCustomer\u201D",
              description:
                "refers to any individual who accesses our Website, creates an account, or places an order with us.",
            },
            {
              term: "\u201CWebsite\u201D",
              description:
                "refers to www.martinonoir.com and any related mobile applications or digital platforms operated by the Company.",
            },
            {
              term: "\u201CProducts\u201D",
              description:
                "refers to all fashion accessories and related items offered for sale through our Website or physical outlets.",
            },
            {
              term: "\u201COrder\u201D",
              description:
                "refers to a request by you to purchase one or more Products from the Company.",
            },
            {
              term: "\u201CContract\u201D",
              description:
                "refers to the binding agreement between you and the Company formed when we confirm acceptance of your Order.",
            },
            {
              term: "\u201CConsumer\u201D",
              description:
                "refers to an individual purchasing Products for personal, non-commercial use.",
            },
            {
              term: "\u201CAccount\u201D",
              description:
                "refers to the registered online account created by you on our Website.",
            },
          ],
        },
        /* ---------------------------------------------------------- 3 -- */
        {
          heading: "Eligibility",
          paragraphs: [
            "To use our Website and purchase Products, you must:",
          ],
          bullets: [
            "Be at least 18 years of age, or have the consent and supervision of a parent or legal guardian",
            "Be capable of entering into a legally binding contract under the laws of Nigeria",
            "Provide accurate, truthful, and complete information when creating an account or placing an order",
            "Not be barred from receiving our services under any applicable law",
          ],
        },
        /* (trailing paragraph handled as a second section-level paragraph) */
        {
          heading: "Eligibility (continued)",
          paragraphs: [
            "By using our Website, you represent and warrant that you meet all of the above eligibility requirements.",
          ],
        },
        /* ---------------------------------------------------------- 4 -- */
        {
          heading: "Your Account",
          subsections: [
            {
              heading: "4.1 Account Registration",
              paragraphs: [
                "You may browse our Website without registering, but to place an order, access your purchase history, or benefit from personalised features, you will need to create an account. When registering, you must provide accurate, current, and complete information and keep it updated.",
              ],
            },
            {
              heading: "4.2 Account Security",
              paragraphs: [
                "You are responsible for maintaining the confidentiality of your account login credentials and for all activities that occur under your account. You must notify us immediately at mail@martinonoir.com if you become aware of any unauthorised access to or use of your account. We will not be liable for any loss or damage arising from your failure to protect your account credentials.",
              ],
            },
            {
              heading: "4.3 Account Termination",
              paragraphs: [
                "We reserve the right to suspend or terminate your account without prior notice if we reasonably believe that:",
              ],
              bullets: [
                "You have provided false or misleading information",
                "You have breached these Terms",
                "Your account is being used for fraudulent, unlawful, or abusive purposes",
              ],
            },
            {
              paragraphs: [
                "You may also close your account at any time by contacting us at mail@martinonoir.com. Closing your account does not affect any contractual obligations already incurred.",
              ],
            },
          ],
        },
        /* ---------------------------------------------------------- 5 -- */
        {
          heading: "Products and Product Information",
          subsections: [
            {
              heading: "5.1 Product Descriptions",
              paragraphs: [
                "We make every effort to describe our Products accurately, including through photographs, written descriptions, and sizing information. However, we cannot guarantee that product images displayed on your screen perfectly reflect the actual colour or finish of the Products due to variations in screen resolution and settings.",
              ],
            },
            {
              heading: "5.2 Availability",
              paragraphs: [
                "All Products are offered subject to availability. We reserve the right to discontinue any Product at any time without notice. If a Product you have ordered is out of stock or unavailable, we will notify you and offer you a suitable alternative, a credit note, or a full refund.",
              ],
            },
            {
              heading: "5.3 Pricing",
              paragraphs: [
                "All prices displayed on our Website are in Nigerian Naira (NGN) and are inclusive of applicable taxes unless otherwise stated. Prices do not include delivery charges, which will be calculated and displayed separately at checkout before you confirm your Order.",
                "We reserve the right to change prices at any time without prior notice. However, the price applicable to your Order is the price displayed at the time you place your Order, except in cases of obvious pricing errors.",
              ],
            },
            {
              heading: "5.4 Pricing Errors",
              paragraphs: [
                "If a Product is listed at an obviously incorrect price due to a typographical error or system error, we are not obliged to fulfil your Order at that price. We will notify you of the correct price and give you the option to proceed at the correct price or cancel your Order with a full refund.",
              ],
            },
          ],
        },
        /* ---------------------------------------------------------- 6 -- */
        {
          heading: "Orders and Contract Formation",
          subsections: [
            {
              heading: "6.1 Placing an Order",
              paragraphs: [
                "When you place an Order on our Website, you are making an offer to purchase the selected Products at the stated price, subject to these Terms. Your Order constitutes an offer and is not a confirmed purchase until accepted by us.",
              ],
            },
            {
              heading: "6.2 Order Confirmation",
              paragraphs: [
                "Upon placing your Order, you will receive an automated email acknowledging receipt of your Order. This acknowledgement is not acceptance of your Order. A binding Contract between you and us is only formed when we send you a dispatch confirmation email confirming that your Order has been processed and your items are being shipped.",
              ],
            },
            {
              heading: "6.3 Order Rejection",
              paragraphs: [
                "We reserve the right to reject or cancel any Order at our discretion, including in cases where:",
              ],
              bullets: [
                "A Product is no longer available",
                "We are unable to verify your payment details",
                "We have reasonable grounds to believe the Order is fraudulent",
                "You have previously breached these Terms",
              ],
            },
            {
              paragraphs: [
                "Where we reject or cancel an Order for which payment has already been made, we will issue a full refund to the original payment method.",
              ],
            },
          ],
        },
        /* ---------------------------------------------------------- 7 -- */
        {
          heading: "Payment",
          subsections: [
            {
              heading: "7.1 Accepted Payment Methods",
              paragraphs: [
                "We accept the following payment methods: Visa, Mastercard, Verve, bank transfer, mobile payment via Paystack or Flutterwave. All payment transactions are processed through secure, PCI-DSS compliant third-party payment gateways.",
              ],
            },
            {
              heading: "7.2 Payment Security",
              paragraphs: [
                "We do not store your full card details on our systems. All card data is transmitted and stored by our payment processors using industry-standard encryption. We are not liable for any data breach that occurs at the level of our third-party payment processor.",
              ],
            },
            {
              heading: "7.3 Payment Failures",
              paragraphs: [
                "If your payment fails or is declined, your Order will not be confirmed. You will be notified and invited to update your payment details or try an alternative payment method.",
              ],
            },
            {
              heading: "7.4 Currency",
              paragraphs: [
                "All transactions are conducted in Nigerian Naira (NGN) unless otherwise specified for international orders. Where currency conversion applies, any conversion fees are the sole responsibility of the customer.",
              ],
            },
          ],
        },
        /* ---------------------------------------------------------- 8 -- */
        {
          heading: "Delivery and Shipping",
          subsections: [
            {
              heading: "8.1 Delivery Areas",
              paragraphs: [
                "We currently deliver within Nigeria. International shipping availability will be communicated on our Website where applicable.",
              ],
            },
            {
              heading: "8.2 Delivery Timelines",
              paragraphs: [
                "Estimated delivery timelines are provided at checkout and in your dispatch confirmation email. Delivery timelines are estimates only and are not guaranteed. We are not liable for delays caused by circumstances beyond our reasonable control, including but not limited to courier delays, extreme weather, public holidays, or industrial action.",
              ],
            },
            {
              heading: "8.3 Delivery Charges",
              paragraphs: [
                "Delivery charges vary based on your location, the size and weight of your Order, and the delivery option selected. All applicable delivery charges will be clearly displayed before you confirm your Order.",
              ],
            },
            {
              heading: "8.4 Risk and Title",
              paragraphs: [
                "Risk of loss of or damage to Products passes to you upon delivery. Title to the Products passes to you upon receipt of full payment.",
              ],
            },
            {
              heading: "8.5 Failed Delivery",
              paragraphs: [
                "If a delivery attempt is unsuccessful and the Products are returned to us, we will contact you to arrange re-delivery. Additional delivery charges may apply. If we are unable to reach you within a reasonable time, we may cancel the Order and issue a refund less the cost of delivery.",
              ],
            },
          ],
        },
        /* ---------------------------------------------------------- 9 -- */
        {
          heading: "Returns, Refunds, and Exchanges",
          subsections: [
            {
              heading: "9.1 Your Right to Return",
              paragraphs: [
                "As a Consumer, you have the right to return Products purchased from us within 7 days of the date of delivery, for any reason, provided the Products are returned in their original, unused, and undamaged condition with all original tags, packaging, and accessories intact.",
              ],
            },
            {
              heading: "9.2 Non-Returnable Items",
              paragraphs: [
                "The following categories of items are not eligible for return or refund unless they are faulty or not as described:",
              ],
              bullets: [
                "Earrings and pierced jewellery items (for hygiene reasons)",
                "Products that have been personalised, customised, or made to order",
                "Items that have been used, worn, or washed",
                "Items without original packaging or with tags removed",
                "Sale items marked as final sale",
              ],
            },
            {
              heading: "9.3 How to Initiate a Return",
              paragraphs: [
                "To initiate a return, please contact our customer service team at mail@martinonoir.com within 7 days of delivery, providing your order number and reason for return. We will provide you with return instructions and a returns reference number. Items returned without prior authorisation may not be accepted.",
              ],
            },
            {
              heading: "9.4 Condition of Returned Items",
              paragraphs: [
                "Returned items must be in their original, saleable condition. We reserve the right to refuse a return or deduct from your refund where items are returned in a damaged, used, or incomplete condition.",
              ],
            },
            {
              heading: "9.5 Refunds",
              paragraphs: [
                "Upon receipt and inspection of the returned items, we will process your refund to the original payment method within 7 to 10 working days. We will notify you by email when the refund has been processed. Please note that your bank or card issuer may take additional time to reflect the refund in your account. Delivery charges are non-refundable unless the return is due to our error or a faulty Product.",
              ],
            },
            {
              heading: "9.6 Faulty or Incorrect Items",
              paragraphs: [
                "If you receive a faulty, damaged, or incorrect item, please contact us within 48 hours of delivery at mail@martinonoir.com with photographs and a description of the issue. We will arrange for a replacement, exchange, or full refund including delivery costs, at our election.",
              ],
            },
            {
              heading: "9.7 Exchanges",
              paragraphs: [
                "Exchanges are subject to product availability. If you wish to exchange an item for a different size, colour, or product, please contact our customer service team and we will do our best to accommodate your request.",
              ],
            },
          ],
        },
        /* --------------------------------------------------------- 10 -- */
        {
          heading: "Intellectual Property",
          subsections: [
            {
              heading: "10.1 Ownership",
              paragraphs: [
                "All content on our Website, including but not limited to text, photographs, graphics, logos, icons, design layouts, product images, video content, and software, is the exclusive property of MARTINO NOIR LIMITED or is used by us under licence. All such content is protected by Nigerian and international intellectual property laws, including copyright, trademark, and design rights.",
              ],
            },
            {
              heading: "10.2 Permitted Use",
              paragraphs: [
                "You may access and use our Website for personal, non-commercial purposes only. You may print or download content from our Website solely for your personal use. You must not:",
              ],
              bullets: [
                "Reproduce, modify, copy, distribute, sell, or commercially exploit any content from our Website without our prior written permission",
                "Remove, alter, or obscure any copyright, trademark, or proprietary notices on our content",
                "Use our brand name, logo, or trademarks without our prior written consent",
                "Use any automated tools to scrape, mine, or extract data from our Website",
              ],
            },
            {
              heading: "10.3 User-Generated Content",
              paragraphs: [
                "Where you submit product reviews, comments, photographs, or other content to our Website or social media platforms, you grant us a non-exclusive, royalty-free, worldwide licence to use, reproduce, modify, display, and share that content in connection with our business and marketing activities. You warrant that any content you submit is your original work and does not infringe the rights of any third party.",
              ],
            },
          ],
        },
        /* --------------------------------------------------------- 11 -- */
        {
          heading: "Prohibited Conduct",
          paragraphs: [
            "You agree not to use our Website or services to:",
          ],
          bullets: [
            "Engage in any fraudulent, unlawful, or deceptive conduct",
            "Submit false, misleading, or inaccurate information",
            "Attempt to access areas of our Website or systems to which you are not authorized",
            "Introduce viruses, malware, or any harmful code into our systems",
            "Engage in any conduct that disrupts, impairs, or places an unreasonable burden on our Website or servers",
            "Harvest or collect personal data of other users without their consent",
            "Impersonate any person or organization",
            "Violate any applicable law or regulation",
          ],
        },
        /* (trailing paragraph for Prohibited Conduct) */
        {
          heading: "Prohibited Conduct (continued)",
          paragraphs: [
            "We reserve the right to suspend or permanently ban any user who engages in prohibited conduct, without notice and without liability.",
          ],
        },
        /* --------------------------------------------------------- 12 -- */
        {
          heading: "Limitation of Liability",
          subsections: [
            {
              heading: "12.1 General Limitations",
              paragraphs: [
                "To the fullest extent permitted by applicable law, MARTINO NOIR LIMITED shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our Website, the purchase of our Products, or any other interaction with us, including but not limited to loss of profit, loss of revenue, loss of data, or loss of business opportunity.",
              ],
            },
            {
              heading: "12.2 Cap on Liability",
              paragraphs: [
                "Our total aggregate liability to you in connection with any claim arising from a transaction shall not exceed the total amount paid by you for the Product(s) to which the claim relates.",
              ],
            },
            {
              heading: "12.3 Exceptions",
              paragraphs: [
                "Nothing in these Terms shall limit or exclude our liability for:",
              ],
              bullets: [
                "Death or personal injury caused by our negligence",
                "Fraud or fraudulent misrepresentation",
                "Any liability that cannot be lawfully excluded under applicable Nigerian consumer protection law",
              ],
            },
            {
              heading: "12.4 Website Availability",
              paragraphs: [
                "We do not guarantee that our Website will be continuously available, error-free, or free from viruses. We reserve the right to suspend, withdraw, or restrict access to the Website at any time without notice for operational, maintenance, or security reasons. We will not be liable for any loss or inconvenience caused by such unavailability.",
              ],
            },
          ],
        },
        /* --------------------------------------------------------- 13 -- */
        {
          heading: "Consumer Rights Under Nigerian Law",
          paragraphs: [
            "Nothing in these Terms affects your statutory rights as a consumer under Nigerian law, including your rights under the Federal Competition and Consumer Protection Act (FCCPA) and other applicable consumer protection legislation. Our Products come with a statutory guarantee that they are of satisfactory quality, fit for purpose, and as described.",
          ],
        },
        /* --------------------------------------------------------- 14 -- */
        {
          heading: "Indemnity",
          paragraphs: [
            "You agree to indemnify, defend, and hold harmless MARTINO NOIR LIMITED and its directors, officers, employees, and agents from and against any claims, liabilities, damages, losses, costs, and expenses (including reasonable legal fees) arising from:",
          ],
          bullets: [
            "Your use of our Website or services",
            "Your breach of these Terms",
            "Your infringement of the rights of any third party",
            "Any content you submit to our Website or social media platforms",
          ],
        },
        /* --------------------------------------------------------- 15 -- */
        {
          heading: "Governing Law and Dispute Resolution",
          paragraphs: [
            "These Terms and any dispute or claim arising out of or in connection with them shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria.",
            "In the event of any dispute, you agree to first attempt to resolve the matter amicably by contacting our customer service team at mail@martinonoir.com. If the dispute cannot be resolved informally within 30 days, either party may refer the matter to the appropriate court of competent jurisdiction in Nigeria.",
          ],
        },
        /* --------------------------------------------------------- 16 -- */
        {
          heading: "Force Majeure",
          paragraphs: [
            "We will not be in breach of these Terms or liable for any delay or failure to perform our obligations where such delay or failure arises from circumstances beyond our reasonable control, including acts of God, natural disasters, epidemic or pandemic, strikes, civil unrest, government action, power failures, or failures of telecommunications infrastructure. We will notify you as soon as reasonably practicable and will resume performance as soon as the circumstances allow.",
          ],
        },
        /* --------------------------------------------------------- 17 -- */
        {
          heading: "Severability",
          paragraphs: [
            "If any provision of these Terms is found by a court of competent jurisdiction to be invalid, unlawful, or unenforceable, that provision shall be severed from the remaining Terms, which shall continue in full force and effect.",
          ],
        },
        /* --------------------------------------------------------- 18 -- */
        {
          heading: "Entire Agreement",
          paragraphs: [
            "These Terms, together with our Privacy Policy and Cookie Policy, constitute the entire agreement between you and MARTINO NOIR LIMITED in respect of your use of our Website and the purchase of our Products. They supersede all prior discussions, representations, and agreements between us on those matters.",
          ],
        },
        /* --------------------------------------------------------- 19 -- */
        {
          heading: "Contact Information",
          paragraphs: [
            "For any queries relating to these Terms, please contact us at:",
          ],
        },
      ]}
      contact={{
        intro: "Customer Service Team: MARTINO NOIR LIMITED",
        lines: [
          {
            label: "Address",
            value:
              "GFD 57, Young Shall Grow Shopping Complex, 2, Johnson Main Market, Onitsha, Anambra State, Nigeria",
          },
          {
            label: "Email",
            value: "mail@martinonoir.com",
            href: "mailto:mail@martinonoir.com",
          },
          {
            label: "Telephone",
            value: "+2348038010651",
            href: "tel:+2348038010651",
          },
          {
            label: "Business Hours",
            value: "Monday to Friday, 9:00 a.m. to 5:00 p.m. (WAT)",
          },
        ],
      }}
    />
  );
}
