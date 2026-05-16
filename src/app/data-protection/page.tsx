import { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Data Protection",
  description:
    "Martinonoir's commitment to data protection and compliance with the Nigeria Data Protection Act 2023.",
};

export default function DataProtectionPage() {
  return (
    <LegalPage
      eyebrow="Data Protection"
      title="Data Protection"
      intro="Martinonoir is committed to protecting your personal data in line with the Nigeria Data Protection Act (NDPA) 2023 and the standards set by the Nigeria Data Protection Commission (NDPC)."
      lastUpdated="2026-05-16"
      sections={[
        {
          heading: "Our commitment under the NDPA 2023",
          paragraphs: [
            "The Nigeria Data Protection Act 2023 is the primary law governing the processing of personal data in Nigeria. As a business that collects and processes the personal data of our customers, Martinonoir operates as a data controller under the Act.",
            "We are committed to processing personal data lawfully, fairly, and transparently, and to upholding the rights the Act grants to every data subject in Nigeria.",
          ],
        },
        {
          heading: "Principles we follow",
          paragraphs: [
            "In line with the NDPA, all personal data we handle is processed according to these principles:",
          ],
          bullets: [
            "Lawfulness, fairness, and transparency — we process data only where we have a valid legal basis, such as your consent or the performance of your order.",
            "Purpose limitation — data is collected for specified, legitimate purposes and not used in ways incompatible with those purposes.",
            "Data minimisation — we collect only the data we genuinely need.",
            "Accuracy — we take reasonable steps to keep your data correct and up to date.",
            "Storage limitation — data is retained only as long as necessary or as required by law.",
            "Integrity and confidentiality — data is protected with appropriate security measures.",
          ],
        },
        {
          heading: "Your rights as a data subject",
          paragraphs: [
            "The NDPA grants you clear rights over your personal data. You have the right to:",
          ],
          bullets: [
            "Be informed about how your personal data is collected and used.",
            "Access the personal data we hold about you.",
            "Request correction of inaccurate or incomplete data.",
            "Request deletion of your data where there is no lawful reason to retain it.",
            "Object to or restrict certain processing, including direct marketing.",
            "Withdraw consent at any time, where processing is based on consent.",
            "Lodge a complaint with the Nigeria Data Protection Commission.",
          ],
        },
        {
          heading: "Lawful basis for processing",
          paragraphs: [
            "We rely on one or more of the lawful bases recognised by the NDPA: your consent, the performance of a contract (fulfilling your order), compliance with a legal obligation (such as tax records), and our legitimate interests in operating a secure and effective store.",
          ],
        },
        {
          heading: "Data security",
          paragraphs: [
            "We apply technical and organisational measures appropriate to the risk — including encrypted connections, restricted internal access, and trusted payment processors — to protect personal data against unauthorised access, loss, or disclosure.",
          ],
        },
        {
          heading: "Data breach handling",
          paragraphs: [
            "Should a personal data breach occur that poses a risk to data subjects, we will assess it promptly and, where required by the NDPA, notify the Nigeria Data Protection Commission and affected individuals within the timeframes set by the Act.",
          ],
        },
        {
          heading: "Cross-border data transfers",
          paragraphs: [
            "Some of our service providers may process data outside Nigeria. Where this happens, we ensure such transfers meet the conditions for cross-border transfer set out in the NDPA, so your data remains adequately protected.",
          ],
        },
        {
          heading: "Contact our data protection team",
          paragraphs: [
            "To exercise your rights or raise any data protection concern, contact our data protection team at privacy@martinonoir.com. If you are not satisfied with our response, you may contact the Nigeria Data Protection Commission directly.",
          ],
        },
      ]}
    />
  );
}
