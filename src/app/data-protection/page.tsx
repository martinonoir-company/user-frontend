import { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Data Protection Policy",
  description:
    "MARTINO NOIR LIMITED — internal Data Protection Policy under the Nigeria Data Protection Act 2023 and the GAID.",
};

export default function DataProtectionPage() {
  return (
    <LegalPage
      eyebrow="Data Protection Policy"
      title="Data Protection Policy"
      intro="MARTINO NOIR LIMITED — internal policy document setting out the framework, principles, responsibilities, and controls that govern how we manage personal data."
      lastUpdated="2026-05-29"
      version="Version 1.0 · Classification: Internal Policy Document"
      sections={[
        {
          heading: "Purpose",
          paragraphs: [
            "This Data Protection Policy (“Policy”) sets out the framework, principles, responsibilities, and controls that govern how MARTINO NOIR LIMITED (“the Company”, “we”, “us”, or “our”) collects, processes, stores, and protects personal data in the course of conducting its business as a fashion accessories company.",
            "While our Data Privacy Policy is an external-facing document addressed to our customers and website users, this Data Protection Policy is an internal governance document that establishes how we, as an organisation, manage our data protection obligations and embed a culture of privacy across all our functions and operations.",
            "This Policy is intended to ensure that the Company processes personal data lawfully, fairly, and transparently, and that it upholds the rights of all data subjects in accordance with the Nigeria Data Protection Act 2023 (NDPA), the General Application and Implementation Directive (GAID), the Nigeria Data Protection Regulation 2019 (NDPR), and all applicable international best practices.",
          ],
        },
        {
          heading: "Scope",
          paragraphs: ["This Policy applies to:"],
          bullets: [
            "All personal data processed by the Company in whatever format, whether electronic, paper-based, audio, or visual;",
            "All personal data relating to customers, website visitors, employees, job applicants, contractors, suppliers, and any other data subjects;",
            "All employees, directors, officers, and members of the Board of MARTINO NOIR LIMITED;",
            "All contractors, consultants, interns, and temporary staff engaged by or working on behalf of the Company;",
            "All third-party service providers and data processors who handle personal data on behalf of the Company, to the extent set out in their data processing agreements.",
          ],
          subsections: [
            {
              paragraphs: [
                "Non-compliance with this Policy by any of the above persons may result in disciplinary action, termination of contracts, and may expose the individual or the Company to regulatory sanctions under the NDPA.",
              ],
            },
          ],
        },
        {
          heading: "Legal and regulatory framework",
          paragraphs: [
            "This Policy is grounded in and must be read in conjunction with the following legal instruments and frameworks:",
          ],
          bullets: [
            "Nigeria Data Protection Act 2023 (NDPA)",
            "General Application and Implementation Directive (GAID) issued by the NDPC",
            "EU General Data Protection Regulation (GDPR), to the extent applicable",
            "Companies and Allied Matters Act 2020 (CAMA)",
            "Consumer Protection Framework of the Federal Competition and Consumer Protection Commission (FCCPC)",
            "National Information Technology Development Agency Act (NITDA Act)",
            "Any sector-specific guidance issued by the NDPC",
          ],
        },
        {
          heading: "Data protection principles",
          paragraphs: [
            "The Company is committed to processing all personal data in accordance with the following core data protection principles as enshrined in the NDPA and GAID:",
          ],
          definitions: [
            { term: "Principle 1: Lawfulness, Fairness, and Transparency", description: "Personal data must be processed lawfully, fairly, and in a transparent manner. Data subjects must be clearly informed of how their data is used through clear and accessible privacy notices and this Policy." },
            { term: "Principle 2: Purpose Limitation", description: "Personal data must be collected for specified, explicit, and legitimate purposes and must not be processed in a manner incompatible with those purposes. Once data has served its purpose, it must not continue to be used for unrelated activities without a fresh legal basis." },
            { term: "Principle 3: Data Minimisation", description: "Only personal data that is adequate, relevant, and limited to what is necessary for the intended purpose must be collected. The Company must not collect data speculatively or in excess of what is required." },
            { term: "Principle 4: Accuracy", description: "Personal data must be accurate and, where necessary, kept up to date. Inaccurate data must be corrected or deleted without undue delay. The Company must put in place reasonable steps to ensure the accuracy of data it holds." },
            { term: "Principle 5: Storage Limitation", description: "Personal data must not be retained in an identifiable form for longer than is necessary for the purpose for which it was collected. Data that is no longer required must be securely deleted, anonymised, or destroyed in line with our Data Retention Policy." },
            { term: "Principle 6: Integrity and Confidentiality (Security)", description: "Personal data must be processed in a manner that ensures appropriate security, including protection against unauthorised or unlawful processing and against accidental loss, destruction, or damage, using appropriate technical and organisational measures." },
            { term: "Principle 7: Accountability", description: "The Company, as Data Controller, is responsible for and must be able to demonstrate compliance with all of the above principles. The Board and senior management bear ultimate responsibility for embedding data protection across the Company." },
          ],
        },
        {
          heading: "Lawful bases for processing",
          paragraphs: [
            "The Company shall not process any personal data unless a valid lawful basis exists under the NDPA. The lawful bases available to the Company are:",
          ],
          subsections: [
            { heading: "5.1 Performance of a Contract", paragraphs: ["Applicable when processing is necessary to perform a contract with the data subject, such as processing an order, delivering goods, managing returns, or operating a customer account."] },
            { heading: "5.2 Compliance with a Legal Obligation", paragraphs: ["Applicable when processing is required to comply with a binding legal or regulatory obligation, such as tax filing, financial record-keeping, or responding to a lawful regulatory request."] },
            { heading: "5.3 Consent", paragraphs: ["Applicable for processing activities such as sending marketing emails, placing non-essential cookies, or processing sensitive personal data not covered by another basis. Consent must be freely given, specific, informed, and unambiguous. Records of consent must be maintained. Withdrawal of consent must be as easy as giving it."] },
            { heading: "5.4 Legitimate Interests", paragraphs: ["Applicable where the Company has a legitimate business interest in processing data, provided that interest is not overridden by the data subject’s rights and freedoms. A Legitimate Interests Assessment (LIA) must be documented before relying on this basis."] },
            { heading: "5.5 Vital Interests", paragraphs: ["Applicable in life-threatening situations involving a data subject who is unable to give consent."] },
            { heading: "5.6 Public Task", paragraphs: ["Applicable where processing is necessary for the performance of a task carried out in the public interest."] },
            { paragraphs: ["The relevant lawful basis for each category of processing activity must be recorded in the Company’s Record of Processing Activities (ROPA)."] },
          ],
        },
        {
          heading: "Sensitive personal data",
          paragraphs: [
            "The Company does not ordinarily collect sensitive personal data (also referred to as special categories of data) in the course of its fashion accessories business. However, where sensitive personal data is inadvertently received, or is required in a specific context (such as health information required to accommodate a disability during recruitment), it must be processed with additional care and only where one of the following additional conditions is satisfied:",
          ],
          bullets: [
            "The data subject has given explicit consent",
            "Processing is necessary for carrying out obligations in the field of employment law",
            "Processing is necessary for reasons of substantial public interest, with appropriate safeguards",
            "Any other condition specified under the NDPA or GAID",
          ],
          subsections: [
            {
              paragraphs: [
                "All processing of sensitive personal data must be approved by the DPO in advance and documented in the ROPA.",
              ],
            },
          ],
        },
        {
          heading: "Roles and responsibilities",
          subsections: [
            {
              heading: "7.1 The Board of Directors",
              paragraphs: [
                "The Board holds ultimate accountability for data protection governance within the Company. The Board must ensure that adequate resources are allocated to data protection compliance, that this Policy is formally approved, and that data protection is considered in all material business decisions.",
              ],
            },
            {
              heading: "7.2 The Data Protection Officer (DPO)",
              paragraphs: [
                "The Company has appointed a Data Protection Officer who is responsible for:",
              ],
              bullets: [
                "Overseeing the Company’s compliance with this Policy and applicable data protection law",
                "Advising the Company and its staff on data protection obligations",
                "Monitoring compliance with the NDPA, GAID, and this Policy",
                "Conducting and reviewing Data Protection Impact Assessments (DPIAs)",
                "Maintaining the Record of Processing Activities (ROPA)",
                "Serving as the primary point of contact for data subjects exercising their rights",
                "Serving as the primary point of contact with the NDPC",
                "Reporting on data protection compliance to senior management and the Board",
                "Managing data breaches in accordance with the Company’s Incident Response Procedure",
              ],
            },
            {
              paragraphs: [
                "The DPO must be given the authority, resources, and independence necessary to perform these functions effectively. The DPO must not be given instructions on how to exercise their tasks and must not be penalised for performing them.",
              ],
            },
            {
              heading: "7.3 Heads of Department and Line Managers",
              paragraphs: ["Departmental heads and line managers are responsible for:"],
              bullets: [
                "Ensuring that their teams understand and comply with this Policy",
                "Identifying processing activities within their departments and reporting them to the DPO for inclusion in the ROPA",
                "Escalating any data protection concerns, incidents, or suspected breaches to the DPO without delay",
                "Ensuring that new processing activities within their departments are reviewed by the DPO before implementation",
              ],
            },
            {
              heading: "7.4 All Staff and Contractors",
              paragraphs: [
                "Every member of staff and every contractor handling personal data on behalf of the Company is individually responsible for:",
              ],
              bullets: [
                "Reading, understanding, and complying with this Policy and any associated data protection procedures",
                "Completing mandatory data protection training as required by the Company",
                "Handling personal data only in accordance with the instructions, authorisations, and purposes set out by the Company",
                "Not sharing personal data with unauthorised parties inside or outside the Company",
                "Reporting any suspected data breach, loss of data, or data protection concern to the DPO immediately",
              ],
            },
          ],
        },
        {
          heading: "Data subject rights management",
          paragraphs: [
            "The Company is committed to upholding the rights of all data subjects under the NDPA and GAID. These rights include the right to access, rectify, erase, restrict processing of, and port personal data, as well as the right to object and the right not to be subject to solely automated decisions.",
            "All data subject rights requests must be:",
          ],
          bullets: [
            "Logged and acknowledged within 5 working days of receipt",
            "Responded to fully and substantively within 30 days of receipt",
            "Escalated to the DPO for supervision and approval of the response",
            "Documented with records of the request, the response, and any actions taken",
          ],
          subsections: [
            {
              paragraphs: [
                "The DPO is responsible for maintaining a Data Subject Rights Request Register. Requests should be submitted using the Company’s DSAR Form. The Company will not charge a fee for processing rights requests except where they are manifestly unfounded or excessive.",
              ],
            },
          ],
        },
        {
          heading: "Consent management",
          paragraphs: [
            "Where the Company relies on consent as the legal basis for processing, the following requirements must be met:",
          ],
          bullets: [
            "Consent must be sought through a clear, affirmative action by the data subject. Pre-ticked boxes, silence, and inactivity do not constitute valid consent",
            "The specific purposes for which consent is sought must be clearly described",
            "Consent must be granular, meaning the data subject should be able to consent separately to different types of processing",
            "A record of all consents obtained, including the date, the form of consent, and the specific purposes consented to, must be maintained",
            "Withdrawal of consent must be as easy as giving it. Opt-out mechanisms must be clearly visible and functional",
            "Where consent is withdrawn, processing must cease promptly unless another lawful basis applies",
          ],
        },
        {
          heading: "Data minimisation and purpose limitation in practice",
          paragraphs: [
            "The Company must actively apply the principles of data minimisation and purpose limitation in its operational processes:",
          ],
          bullets: [
            "Before collecting any new category of personal data, staff must confirm that the data is necessary for a defined purpose and that there is no less privacy-intrusive way to achieve the same result",
            "Data collection forms, both physical and digital, must request only the fields that are strictly necessary",
            "Personal data must not be retained in emails, spreadsheets, messaging applications, or shared folders beyond what is necessary",
            "Personal data must not be repurposed for activities that are incompatible with the original collection purpose without a new lawful basis and, where required, a fresh consent",
          ],
        },
        {
          heading: "Third-party and vendor management",
          paragraphs: [
            "The Company is responsible for ensuring that third parties who process personal data on its behalf do so in accordance with applicable data protection law. The following requirements apply to all third-party data processors:",
          ],
          bullets: [
            "No third party may be engaged to process personal data on behalf of the Company without prior review and approval by the DPO",
            "A written Data Processing Agreement (DPA) must be in place with every data processor before processing begins. The DPA must comply with the requirements of the NDPA and GAID and must include obligations relating to confidentiality, security, sub-processing, data subject rights, and breach notification",
            "The DPO must conduct periodic due diligence assessments of all data processors to verify their compliance with applicable data protection obligations",
            "Where a processor engages a sub-processor, the same data protection obligations must be imposed on the sub-processor by contract",
          ],
        },
        {
          heading: "Data protection impact assessments (DPIAs)",
          paragraphs: [
            "The Company must conduct a Data Protection Impact Assessment (DPIA) before commencing any new processing activity that is likely to result in a high risk to the rights and freedoms of data subjects. Circumstances that are likely to require a DPIA include:",
          ],
          bullets: [
            "Introducing a new digital product, service, or feature that involves large-scale processing of personal data",
            "Implementing new profiling or automated decision-making systems",
            "Processing sensitive personal data on a large scale",
            "Adopting new surveillance or tracking technology",
            "Sharing personal data with new third parties or transferring data internationally for the first time",
          ],
          subsections: [
            {
              paragraphs: [
                "DPIAs must be conducted by or under the supervision of the DPO. Where a DPIA reveals a high residual risk that cannot be mitigated, the DPO must consult with the NDPC before processing commences.",
              ],
            },
          ],
        },
        {
          heading: "Data breach management",
          paragraphs: [
            "The Company has a documented Incident Response and Data Breach Management Procedure. In summary:",
          ],
          bullets: [
            "Any actual or suspected personal data breach must be reported to the DPO immediately and no later than 24 hours after discovery",
            "The DPO will assess the nature, scope, and risk level of the breach and determine the appropriate response",
            "Where a breach is likely to result in a risk to the rights and freedoms of data subjects, the DPO must notify the NDPC within 72 hours of the Company becoming aware of the breach",
            "Where a breach is likely to result in a high risk to affected individuals, those individuals must also be notified without undue delay",
            "All breaches, including those that do not meet the notification threshold, must be recorded in the Company’s Data Breach Register",
            "Following each breach, a root cause analysis and lessons-learned review must be conducted, and any necessary remediation measures must be implemented",
          ],
        },
        {
          heading: "International data transfers",
          paragraphs: [
            "Where personal data is transferred outside Nigeria in connection with our business operations, the following requirements apply:",
          ],
          bullets: [
            "The DPO must be consulted before any new international transfer of personal data is established",
            "Transfers may only proceed where appropriate safeguards are in place, including adequacy decisions by the NDPC, standard contractual clauses, or other approved mechanisms",
            "All international transfers must be documented in the ROPA with the applicable safeguard identified",
          ],
        },
        {
          heading: "Record of Processing Activities (ROPA)",
          paragraphs: [
            "The DPO is responsible for maintaining and keeping current the Company’s Record of Processing Activities (ROPA) in accordance with the NDPA and GAID. The ROPA must include, for each processing activity:",
          ],
          bullets: [
            "The name and contact details of the Data Controller and DPO",
            "The purposes of the processing",
            "A description of the categories of data subjects and personal data processed",
            "The categories of recipients to whom the data has been or will be disclosed",
            "Details of any international transfers",
            "The retention periods applicable to each category of data",
            "A description of the security measures in place",
          ],
          subsections: [
            {
              paragraphs: [
                "The ROPA must be available for inspection by the NDPC upon request.",
              ],
            },
          ],
        },
        {
          heading: "Training and awareness",
          paragraphs: [
            "Data protection is a shared organisational responsibility. The Company is committed to ensuring that all relevant staff receive appropriate and regular training on their data protection obligations. Specifically:",
          ],
          bullets: [
            "All new staff must complete data protection induction training before handling personal data",
            "All staff must complete refresher data protection training at least once every 12 months",
            "Specialist training must be provided to staff in roles with heightened data protection responsibilities, such as the DPO, IT staff, marketing staff, and customer service representatives",
            "Training records must be maintained and are subject to audit",
          ],
        },
        {
          heading: "Policy review and updates",
          paragraphs: [
            "This Policy must be reviewed by the DPO at least once every 12 months, or earlier in the event of:",
          ],
          bullets: [
            "A material change in applicable law or regulatory guidance",
            "A significant change in the Company’s business model, processing activities, or technology",
            "A significant data protection incident or breach",
            "A recommendation from an audit, DPIA, or regulatory inspection",
          ],
          subsections: [
            {
              paragraphs: [
                "Any updates to this Policy must be approved by the Board or a delegated senior management representative before taking effect. Staff must be notified of any material changes and updated training must be provided where required.",
              ],
            },
          ],
        },
        {
          heading: "Contact and escalation",
          paragraphs: [
            "All data protection queries, concerns, and incidents must be directed to:",
          ],
        },
      ]}
      contact={{
        intro: "Data Protection Officer:",
        lines: [
          { label: "Name", value: "Nwude Martin Uchenna" },
          { label: "Company", value: "MARTINO NOIR LIMITED" },
          { label: "Address", value: "GFD 57, Young Shall Grow Shopping Complex, 2, Johnson Main Market, Onitsha, Anambra State, Nigeria." },
          { label: "Email", value: "dpo@martinonoir.com; mail@martinonoir.com", href: "mailto:dpo@martinonoir.com" },
          { label: "Telephone", value: "+2348038010651", href: "tel:+2348038010651" },
        ],
      }}
    />
  );
}
