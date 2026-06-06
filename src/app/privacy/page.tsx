import { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Data Privacy Policy",
  description:
    "How MARTINO NOIR LIMITED collects, uses, and protects your personal data, in compliance with the Nigeria Data Protection Act 2023.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Data Privacy Policy"
      title="Data Privacy Policy"
      intro="MARTINO NOIR LIMITED. This policy explains who we are, what personal data we collect, why we collect it, how we use it, who we share it with, and what rights you have."
      lastUpdated="2026-05-29"
      version="Version 1.0"
      sections={[
        {
          heading: "Introduction",
          paragraphs: [
            "Welcome to MARTINO NOIR LIMITED. We are a fashion accessories company committed to protecting your personal data and respecting your privacy. This Data Privacy Policy explains who we are, what personal data we collect about you, why we collect it, how we use it, who we share it with, and what rights you have in relation to your personal data.",
            "This Policy applies to all personal data collected through our website at www.martinonoir.com, our social media platforms, our physical stores (if applicable), our customer service channels, and any other means through which you interact with us.",
            "This Policy is issued in compliance with:",
          ],
          bullets: [
            "The Nigeria Data Protection Act 2023 (NDPA)",
            "The General Application and Implementation Directive (GAID) issued by the Nigeria Data Protection Commission (NDPC)",
            "The EU General Data Protection Regulation (GDPR), to the extent it applies to our international operations or customers located in the European Economic Area",
            "Any applicable guidelines issued by the Nigeria Data Protection Commission (NDPC)",
          ],
          subsections: [
            {
              paragraphs: [
                "By accessing our website, making a purchase, subscribing to our newsletter, or otherwise engaging with us, you acknowledge that you have read and understood this Policy.",
              ],
            },
          ],
        },
        {
          heading: "Who we are",
          paragraphs: [
            "MARTINO NOIR LIMITED (“the Company”) is a fashion accessories company registered under the laws of the Federal Republic of Nigeria. We design, source, and sell fashion accessories including but not limited to bags, jewellery, belts, scarves, sunglasses, footwear accessories, and related items, through our website, physical retail outlets, and authorised third-party platforms.",
            "For the purposes of data protection law, MARTINO NOIR LIMITED is the Data Controller in respect of the personal data you provide to us or that we collect about you.",
            "Our registered address is: GFD 57, Young Shall Grow Shopping Complex, 2, Johnson Main Market, Onitsha, Anambra State, Nigeria.",
            "Data Protection Officer Contact: Email: dpo@martinonoir.com  Telephone: +2348038010651",
          ],
        },
        {
          heading: "Definitions",
          paragraphs: ["For clarity and consistency, the following definitions apply throughout this Policy:"],
          definitions: [
            { term: "“Personal Data”", description: "means any information relating to an identified or identifiable natural person. An identifiable person is one who can be identified, directly or indirectly, by reference to an identifier such as a name, identification number, location data, or online identifier." },
            { term: "“Processing”", description: "means any operation performed on personal data, including collection, recording, storage, use, disclosure, transmission, deletion, or destruction." },
            { term: "“Data Subject”", description: "means the natural person to whom personal data relates. This includes our customers, website visitors, newsletter subscribers, and any other individual whose data we process." },
            { term: "“Data Controller”", description: "means the entity that determines the purposes for and the manner in which personal data is processed. MARTINO NOIR LIMITED is a Data Controller." },
            { term: "“Data Processor”", description: "means any person or entity that processes personal data on behalf of the Data Controller under a written agreement." },
            { term: "“Consent”", description: "means a freely given, specific, informed, and unambiguous indication of the data subject’s wishes by which they signify agreement to the processing of their personal data." },
            { term: "“NDPC”", description: "means the Nigeria Data Protection Commission, the statutory regulatory authority responsible for data protection in Nigeria." },
            { term: "“NDPA”", description: "means the Nigeria Data Protection Act 2023." },
            { term: "“GAID”", description: "means the General Application and Implementation Directive issued by the NDPC." },
            { term: "“Third Party”", description: "means any person or organisation other than the data subject, the Company, or persons authorised to process personal data under the direct authority of the Company." },
            { term: "“Sensitive Personal Data”", description: "means special categories of data including data revealing racial or ethnic origin, political opinions, religious beliefs, health data, biometric data, or data concerning a person’s sex life or sexual orientation." },
          ],
        },
        {
          heading: "Personal data we collect",
          paragraphs: [
            "We collect and process only the personal data that is necessary and proportionate for our legitimate business and legal purposes. The categories of personal data we collect include the following:",
          ],
          subsections: [
            {
              heading: "4.1 Identity and Contact Information",
              bullets: [
                "Full name",
                "Date of birth (where required for age verification or promotional eligibility)",
                "Gender (where voluntarily provided)",
                "Email address",
                "Telephone number",
                "Delivery and billing address",
                "Country of residence",
              ],
            },
            {
              heading: "4.2 Account and Profile Information",
              bullets: [
                "Username and password (stored in encrypted form)",
                "Purchase history and wishlist items",
                "Saved preferences, sizes, and style settings",
                "Product reviews and ratings submitted by you",
                "Loyalty programme membership details (where applicable)",
              ],
            },
            {
              heading: "4.3 Transaction and Financial Data",
              bullets: [
                "Order details, including items purchased, quantities, prices, and order dates",
                "Payment information (note: we do not store your full card details; payment transactions are processed by our secure, PCI-DSS compliant third-party payment processors)",
                "Billing records and invoices",
                "Refund, return, and exchange records",
              ],
            },
            {
              heading: "4.4 Communication Data",
              bullets: [
                "Emails, messages, and correspondence exchanged with our customer service team",
                "Records of enquiries, complaints, feedback, and their resolutions",
                "Your responses to surveys or promotions you choose to participate in",
              ],
            },
            {
              heading: "4.5 Marketing and Preference Data",
              bullets: [
                "Your preferences for receiving marketing communications",
                "Your preferred communication channels",
                "Data about products and content you have shown interest in",
              ],
            },
            {
              heading: "4.6 Technical and Device Data",
              bullets: [
                "Internet Protocol (IP) address",
                "Browser type, version, and settings",
                "Device type and operating system",
                "Referring website or source from which you arrived at our website",
                "Pages visited, time spent on pages, and click behaviour on our website",
                "Cookie identifiers and session data (see our Cookie Policy for full details)",
              ],
            },
            {
              heading: "4.7 Social Media Data",
              bullets: [
                "Information you share with us or that is publicly available when you interact with our official social media accounts or tag us in posts",
                "Data provided when you choose to log in to our website using a social media account",
              ],
            },
          ],
        },
        {
          heading: "How we collect your personal data",
          paragraphs: ["We collect personal data through the following means:"],
          subsections: [
            {
              heading: "5.1 Directly from You",
              paragraphs: ["We collect data directly from you when you:"],
              bullets: [
                "Create an account or register on our website",
                "Place an order or make a purchase online or in-store",
                "Subscribe to our newsletter or marketing emails",
                "Contact our customer service team by any channel",
                "Submit a product review, complete a survey, or participate in a competition or promotion",
                "Follow, message, or interact with us on social media",
                "Apply for a job or internship with us",
              ],
            },
            {
              heading: "5.2 Automatically",
              paragraphs: [
                "We automatically collect certain technical data when you visit and interact with our website, including through the use of cookies, web beacons, server logs, and similar technologies. This includes data about your device, browsing behaviour, and how you navigate our website. Please refer to our Cookie Policy for full details on what is collected automatically and how you can manage it.",
              ],
            },
            {
              heading: "5.3 From Third Parties",
              paragraphs: ["We may receive personal data about you from the following third parties:"],
              bullets: [
                "Payment processors and financial institutions in connection with the processing of your transactions",
                "Social media platforms when you interact with our content or log in using a social account",
                "Logistics and delivery partners in connection with the fulfilment and tracking of your orders",
                "Marketing analytics providers who help us understand our audience and improve our campaigns",
                "Fraud prevention agencies and identity verification services",
              ],
            },
          ],
        },
        {
          heading: "Legal basis for processing",
          paragraphs: [
            "We process your personal data only where a valid legal basis exists under the Nigeria Data Protection Act 2023 and the GAID. The legal bases we rely upon are as follows:",
          ],
          definitions: [
            { term: "Performance of a Contract", description: "We process your personal data to fulfil the purchase contract we have entered into with you when you place an order, including processing payment, preparing your order, arranging delivery, and handling returns or exchanges." },
            { term: "Compliance with a Legal Obligation", description: "We process your personal data to comply with our legal obligations, including tax and accounting requirements, regulatory reporting, and obligations to law enforcement or regulatory bodies." },
            { term: "Legitimate Interests", description: "We process certain personal data for the purpose of our legitimate business interests, including improving our website, preventing fraud, protecting the security of our systems, understanding our customers, and conducting marketing analytics. We ensure that our legitimate interests are not outweighed by your rights and freedoms." },
            { term: "Consent", description: "Where we send you marketing emails, place non-essential cookies on your device, or carry out any processing that requires your consent, we will ask for your freely given, specific, informed, and unambiguous consent. You have the right to withdraw consent at any time without affecting the lawfulness of processing carried out before the withdrawal." },
            { term: "Vital Interests", description: "In exceptional circumstances where processing is necessary to protect life, we may process personal data on the basis of vital interests." },
          ],
        },
        {
          heading: "Purposes for which we use your data",
          paragraphs: ["We use the personal data we collect for the following purposes:"],
          bullets: [
            "Processing and fulfilling your orders, including payment verification, packaging, and delivery",
            "Creating and managing your customer account on our website",
            "Communicating with you about your orders, including order confirmations, shipping updates, and delivery notifications",
            "Handling your enquiries, complaints, refund requests, and after-sales service",
            "Sending you personalised marketing communications, promotions, and updates about new collections and offers, where you have consented or where we have a legitimate interest and you have not opted out",
            "Personalising your experience on our website by showing you content, products, and recommendations relevant to your preferences and browsing history",
            "Administering loyalty programmes, discount codes, competitions, and promotional activities",
            "Improving and optimising our website, digital platforms, and customer experience through analytics and performance monitoring",
            "Detecting, investigating, and preventing fraudulent transactions, chargebacks, and other unlawful activities",
            "Complying with applicable legal and regulatory obligations",
            "Responding to requests from regulatory or law enforcement authorities where required by law",
            "Conducting internal research, planning, and business intelligence activities",
            "Recruiting and onboarding staff and contractors",
          ],
        },
        {
          heading: "Marketing communications",
          paragraphs: [
            "We may send you marketing communications about our products, services, new arrivals, exclusive offers, and seasonal promotions by email, SMS, or social media, where you have provided your consent or where we have a legitimate interest and applicable law permits us to do so without prior consent.",
            "You have the right to opt out of receiving marketing communications at any time by:",
          ],
          bullets: [
            "Clicking the “Unsubscribe” link at the bottom of any marketing email we send you",
            "Contacting our DPO at dpo@martinonoir.com",
            "Updating your communication preferences in your online account settings",
          ],
          subsections: [
            {
              paragraphs: [
                "We will process your opt-out request promptly and you will be removed from our marketing list within 10 working days. Please note that even after opting out of marketing communications, you may still receive transactional communications relating to orders you have placed or services you have requested.",
                "We do not share your personal data with third parties for their own direct marketing purposes without your explicit consent.",
              ],
            },
          ],
        },
        {
          heading: "Profiling and automated decision-making",
          paragraphs: [
            "We may use automated tools and algorithms to analyse your browsing behaviour, purchase history, and preferences in order to personalise your shopping experience and show you products and content that are likely to interest you. This type of profiling does not produce legal effects or decisions that significantly affect you.",
            "We do not make any decisions about you based solely on automated processing that produce legal effects or otherwise significantly affect you without human involvement. If you have concerns about any decision that appears to have been made about you automatically, please contact our DPO.",
          ],
        },
        {
          heading: "Sharing your personal data",
          paragraphs: [
            "We do not sell your personal data to any third party. We may share your personal data with third parties only in the following circumstances and subject to appropriate safeguards:",
          ],
          definitions: [
            { term: "Service Providers and Data Processors", description: "We share personal data with carefully selected third-party service providers who process data on our behalf and under our instruction. These include payment processors, logistics and delivery companies, IT and hosting providers, email marketing platforms, and customer service tools. All processors are bound by written data processing agreements and are prohibited from using your data for any purpose other than those we authorise." },
            { term: "Logistics and Delivery Partners", description: "We share your name, delivery address, and contact details with our logistics and courier partners to facilitate the fulfilment and delivery of your order." },
            { term: "Payment Processors", description: "Your payment transaction data is processed by our secure third-party payment gateway provider. We do not store your full card details." },
            { term: "Marketing and Analytics Partners", description: "We may share anonymised or pseudonymised data with analytics and advertising partners to help us understand our audience and improve our marketing. Where this involves the sharing of personal data, it is done under appropriate agreements and in compliance with applicable law." },
            { term: "Regulatory and Law Enforcement Authorities", description: "We may disclose personal data to the NDPC, law enforcement agencies, courts, or other regulatory bodies where required by law, pursuant to a court order, or where we have a good-faith belief that disclosure is necessary to protect the rights, safety, or property of the Company, our customers, or the public." },
            { term: "Business Transfers", description: "In the event of a merger, acquisition, restructuring, or sale of all or substantially all of the Company’s assets, your personal data may be transferred to the relevant successor entity, subject to equivalent privacy protections." },
            { term: "With Your Consent", description: "We may share your personal data with other third parties where you have provided explicit, informed consent for such sharing." },
          ],
        },
        {
          heading: "International transfers of personal data",
          paragraphs: [
            "As a fashion accessories company, we may use service providers and platforms that are based outside Nigeria, including cloud hosting providers, marketing tools, and logistics partners. Where we transfer your personal data outside Nigeria, we ensure that appropriate safeguards are in place in accordance with the NDPA and the GAID, including:",
          ],
          bullets: [
            "Transferring only to countries that the NDPC has determined to offer an adequate level of data protection",
            "Implementing standard contractual clauses, binding corporate rules, or other mechanisms approved or recognised under applicable Nigerian law",
            "Ensuring that our international service providers are bound by contractual obligations to protect your personal data to a standard substantially equivalent to Nigerian law",
          ],
          subsections: [
            {
              paragraphs: [
                "If you would like further information about the safeguards governing any particular international transfer, please contact our DPO.",
              ],
            },
          ],
        },
        {
          heading: "Data security",
          paragraphs: [
            "We take the security of your personal data seriously and implement proportionate technical and organisational security measures to protect it against accidental loss, unauthorised access, disclosure, alteration, or destruction. Our security measures include:",
          ],
          bullets: [
            "Encryption of data in transit using Secure Socket Layer (SSL) / Transport Layer Security (TLS) technology",
            "Encryption of sensitive data at rest",
            "Secure, access-controlled storage environments with role-based access permissions",
            "Regular software updates, patches, and vulnerability assessments",
            "Multi-factor authentication for internal systems",
            "Staff training on data protection, information security, and phishing awareness",
            "Periodic data protection impact assessments for high-risk processing activities",
            "Documented incident response and data breach management procedures",
          ],
          subsections: [
            {
              heading: "Payment Security",
              paragraphs: [
                "All payment transactions on our website are processed through PCI-DSS compliant payment gateways. We do not store your credit or debit card details on our systems.",
              ],
            },
            {
              heading: "Data Breach Notification",
              paragraphs: [
                "In the event of a personal data breach that is likely to result in a risk to your rights and freedoms, we will notify the NDPC within 72 hours of becoming aware of the breach. If the breach is likely to result in a high risk to you, we will also notify you directly without undue delay, providing details of what happened and the steps you can take to protect yourself.",
              ],
            },
          ],
        },
        {
          heading: "Your rights as a data subject",
          paragraphs: [
            "Under the Nigeria Data Protection Act 2023 and the GAID, you have the following rights in respect of your personal data:",
          ],
          definitions: [
            { term: "Right to be Informed", description: "You have the right to receive clear, transparent, and accessible information about how we collect and use your personal data. This Policy is our primary means of fulfilling this obligation." },
            { term: "Right of Access", description: "You have the right to request a copy of the personal data we hold about you, along with information about how and why we process it." },
            { term: "Right to Rectification", description: "You have the right to request that we correct or update any inaccurate or incomplete personal data we hold about you." },
            { term: "Right to Erasure", description: "You have the right to request the deletion of your personal data where it is no longer necessary for the purpose it was collected, where you withdraw consent, where you object to processing and we have no overriding legitimate grounds, or where the data has been unlawfully processed. This right is subject to any overriding legal obligations we have to retain the data." },
            { term: "Right to Restriction of Processing", description: "You have the right to request that we restrict our processing of your personal data in certain circumstances, such as while we verify the accuracy of data you have contested." },
            { term: "Right to Data Portability", description: "You have the right to receive the personal data you have provided to us in a structured, commonly used, and machine-readable format, and to request that it be transmitted to another data controller where technically feasible." },
            { term: "Right to Object", description: "You have the right to object to the processing of your personal data based on our legitimate interests. You also have an absolute right to object to processing for direct marketing purposes, which we will honour without question." },
            { term: "Right to Withdraw Consent", description: "Where processing is based on your consent, you may withdraw that consent at any time. This does not affect the lawfulness of processing carried out before the withdrawal." },
            { term: "Right Not to be Subject to Solely Automated Decisions", description: "You have the right not to be subject to decisions made solely by automated means that produce significant legal or similarly significant effects on you." },
          ],
          subsections: [
            {
              heading: "How to Exercise Your Rights",
              paragraphs: [
                "To exercise any of the above rights, please complete our Data Subject Access Request Form or contact our DPO at dpo@martinonoir.com. We will respond within 30 days of receiving your request. In complex cases, we may extend this by up to 60 days and will notify you accordingly. We will not charge a fee for processing reasonable requests.",
              ],
            },
          ],
        },
        {
          heading: "Retention of your personal data",
          paragraphs: [
            "We retain your personal data only for as long as is necessary for the purposes for which it was collected, or to comply with our legal, regulatory, accounting, and reporting obligations. The specific retention periods applicable to different categories of data are set out in our Data Retention Policy.",
            "As a general guide:",
          ],
          bullets: [
            "Customer account data is retained for the duration of your account and for 5 years after account closure or your last transaction with us",
            "Transaction and financial records are retained for 7 years from the date of the transaction in compliance with tax and accounting requirements",
            "Marketing consent records are retained for 3 years from the date of consent or until withdrawn",
            "Customer service correspondence is retained for 5 years from the date of the last communication",
          ],
          subsections: [
            {
              paragraphs: [
                "When personal data is no longer required, it is securely deleted, anonymised, or destroyed in accordance with our Data Retention Policy.",
              ],
            },
          ],
        },
        {
          heading: "Children’s privacy",
          paragraphs: [
            "Our website and services are not directed at children under the age of 18. We do not knowingly collect personal data from children. If you are under 18, please do not provide us with any personal data without the consent and supervision of a parent or legal guardian.",
            "If we become aware that we have inadvertently collected personal data from a child under the age of 18 without verifiable parental consent, we will take immediate steps to delete that information. If you believe we have collected data from a child, please contact our DPO immediately.",
          ],
        },
        {
          heading: "Links to third-party websites",
          paragraphs: [
            "Our website may contain links to third-party websites, social media platforms, and partner pages. This Policy applies only to our Website and our processing activities. We have no control over and accept no responsibility for the privacy practices of any third-party website. We encourage you to review the privacy policy of every website you visit.",
          ],
        },
        {
          heading: "Changes to this Policy",
          paragraphs: [
            "We may update this Data Privacy Policy from time to time to reflect changes in applicable law, our data processing practices, or our business operations. We will notify you of any material changes by posting the updated Policy on our website and, where appropriate, by sending you a direct notification. The effective date of the current version is stated at the top of this document. We encourage you to review this Policy periodically.",
          ],
        },
        {
          heading: "How to contact us and lodge a complaint",
          paragraphs: [
            "If you have any questions, concerns, or complaints about this Policy or about how we handle your personal data, please contact our Data Protection Officer in the first instance:",
          ],
        },
      ]}
      contact={{
        intro: "Data Protection Officer:",
        lines: [
          { label: "Name", value: "NWUDE MARTIN UCHENNA" },
          { label: "Company", value: "MARTINO NOIR LIMITED" },
          { label: "Address", value: "GFD 57, Young Shall Grow Shopping Complex, 2, Johnson Main Market, Onitsha, Anambra State, Nigeria." },
          { label: "Email", value: "dpo@martinonoir.com", href: "mailto:dpo@martinonoir.com" },
          { label: "Telephone", value: "+2348038010651", href: "tel:+2348038010651" },
        ],
        outro:
          "If you are not satisfied with our response, you have the right to lodge a complaint with the Nigeria Data Protection Commission (NDPC) — Website: www.ndpc.gov.ng · Email: info@ndpc.gov.ng.",
      }}
    />
  );
}
