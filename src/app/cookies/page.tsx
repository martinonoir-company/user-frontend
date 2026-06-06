import { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How MARTINO NOIR LIMITED uses cookies and similar tracking technologies on its website.",
};

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Cookie Policy"
      title="Cookie Policy"
      intro="MARTINO NOIR LIMITED. This policy explains what cookies are, the categories of cookies we use, why we use them, how long they are retained, and how you can manage your preferences."
      lastUpdated="2026-05-29"
      version="Version 1.0"
      sections={[
        {
          heading: "Introduction",
          paragraphs: [
            "This Cookie Policy explains how MARTINO NOIR LIMITED (“the Company”, “we”, “us”, or “our”) uses cookies and similar tracking technologies on our website at www.martinonoir.com (“Website”) and any related digital platforms we operate.",
            "This Policy explains what cookies are, the categories of cookies we use, the purposes for which we use them, how long they are retained, and how you can manage or withdraw your consent to their use. It forms part of our broader privacy framework and should be read together with our Data Privacy Policy.",
            "By visiting our Website, you will be presented with a cookie consent notice that allows you to accept or customise your cookie preferences. Strictly necessary cookies will be placed automatically, as they are essential for the Website to function. All other categories of cookies will only be placed with your consent.",
          ],
        },
        {
          heading: "What are cookies?",
          paragraphs: [
            "Cookies are small text files placed on your device, whether a computer, tablet, or smartphone, by a website you visit. They are stored within your browser and allow the website to recognise your device on future visits, remember your preferences, and improve your overall experience.",
            "Cookies are not programs and cannot carry viruses or install malicious software on your device. They simply store small pieces of information that help the website work more efficiently and provide useful features to you as a user.",
          ],
          subsections: [
            {
              heading: "Types of Cookies by Duration",
              paragraphs: [
                "Session Cookies are temporary cookies that exist only for the duration of your browsing session. They are automatically deleted from your browser when you close it. They are used to maintain continuity within a single visit, for example to keep you logged in as you move between pages.",
                "Persistent Cookies remain on your device after your browser session ends, for a set period or until you delete them. They are used to remember your preferences and settings across multiple visits.",
              ],
            },
            {
              heading: "Types of Cookies by Origin",
              bullets: [
                "First-Party Cookies are set directly by our Website and are under our control.",
                "Third-Party Cookies are set by domains other than our Website, such as social media platforms, analytics services, or advertising networks. These third parties operate under their own privacy and cookie policies.",
              ],
            },
          ],
        },
        {
          heading: "Other tracking technologies",
          paragraphs: [
            "In addition to cookies, we may use the following related technologies, all of which are subject to this Policy:",
          ],
          bullets: [
            "Web Beacons (Pixel Tags): Small transparent image files embedded in web pages or emails that communicate with our servers when you load the page or open the email. They help us understand email open rates and website activity.",
            "Local Storage Objects: Similar to cookies, but capable of storing larger amounts of data on your device to improve website performance.",
            "Session Storage Objects: Store data only for the duration of your session and are cleared when you close the browser tab.",
          ],
          subsections: [
            {
              paragraphs: [
                "All references to “cookies” in this Policy include these related technologies unless otherwise stated.",
              ],
            },
          ],
        },
        {
          heading: "Categories of cookies we use",
          paragraphs: ["We use the following categories of cookies on our Website:"],
          subsections: [
            {
              heading: "4.1 Strictly Necessary Cookies",
              paragraphs: [
                "These cookies are essential for our Website to function correctly and cannot be switched off in our systems. They are set in response to actions you take, such as logging into your account, adding items to your shopping cart, or completing a purchase. Without these cookies, the services you have requested cannot be provided.",
                "These cookies do not store any personally identifiable information for marketing purposes and do not track your activity across other websites.",
                "Examples of what these cookies do include: maintaining your login session, preserving the contents of your shopping cart, managing security tokens, and ensuring load balancing across our servers.",
                "Retention Period: Session duration or up to 24 hours. Legal Basis: Legitimate interest and contractual necessity. Your consent is not required.",
              ],
            },
            {
              heading: "4.2 Functional and Preference Cookies",
              paragraphs: [
                "These cookies enable our Website to provide enhanced functionality and personalisation. They allow us to remember choices you make, such as your preferred language, your login details where you have chosen to be remembered, or customised display preferences. This information helps us provide a more consistent and personalised experience across your visits.",
                "If you block or decline these cookies, some elements of our Website may not function as expected, and your preferences may not be saved between visits.",
                "Retention Period: Up to 12 months. Legal Basis: Consent.",
              ],
            },
            {
              heading: "4.3 Analytics and Performance Cookies",
              paragraphs: [
                "These cookies allow us to understand how visitors interact with our Website by collecting anonymised, aggregated data about page views, traffic sources, time spent on pages, navigation paths, and other usage statistics. This information helps us improve the structure, performance, and content of our Website.",
                "The data collected by these cookies does not identify you personally and is used solely for the purpose of improving our Website and services.",
                "Service providers used for analytics may include Google Analytics, which sets its own cookies subject to Google’s Privacy Policy.",
                "Retention Period: Up to 13 months. Legal Basis: Consent.",
              ],
            },
            {
              heading: "4.4 Marketing and Advertising Cookies",
              paragraphs: [
                "These cookies track your browsing activity across our Website and may also track activity across other websites where our advertising is displayed. They are used to build a profile of your interests and to display advertising that is relevant and personalised to you, both on our Website and on third-party platforms.",
                "They may also be used to limit the frequency with which you see an advertisement and to measure the effectiveness of our advertising campaigns.",
                "These cookies will only be placed on your device with your explicit, informed consent. You may withdraw your consent at any time through our cookie preference centre.",
                "Retention Period: Up to 12 months. Legal Basis: Explicit consent.",
              ],
            },
            {
              heading: "4.5 Social Media Cookies",
              paragraphs: [
                "When you visit pages on our Website that feature social media integration features, such as “Share”, “Like”, or “Follow” buttons for platforms such as Instagram, Facebook, TikTok, or Pinterest, those social media platforms may set their own cookies on your device. These cookies allow the social media platform to identify you and to track your interaction with their buttons, whether or not you click on them.",
                "These cookies are controlled by the respective social media platforms and are subject to their own privacy and cookie policies. We have no control over the information collected by these cookies. We encourage you to review the relevant third-party cookie policies.",
                "Retention Period: Varies by platform. Legal Basis: Consent.",
              ],
            },
          ],
        },
        {
          heading: "Summary of cookies we use",
          paragraphs: [
            "The table below provides a summary of the cookies placed on our Website:",
          ],
          table: {
            headers: ["Cookie Category", "Function", "Legal Basis", "Retention Period"],
            rows: [
              ["Strictly Necessary", "Enables core website functions including login, cart, and security", "Legitimate Interest / Contractual Necessity", "Session / up to 24 hours"],
              ["Functional / Preference", "Remembers your preferences and settings across visits", "Consent", "Up to 12 months"],
              ["Analytics / Performance", "Collects anonymised data to improve website performance", "Consent", "Up to 13 months"],
              ["Marketing / Advertising", "Tracks browsing for personalised advertising", "Explicit Consent", "Up to 12 months"],
              ["Social Media", "Enables social media sharing and tracking by third-party platforms", "Consent", "Varies by platform"],
            ],
          },
        },
        {
          heading: "Legal basis for cookie use under Nigerian law",
          paragraphs: [
            "Under the Nigeria Data Protection Act 2023 (NDPA), the General Application and Implementation Directive (GAID), and applicable guidelines from the Nigerian Communications Commission (NCC), we are required to have a lawful basis for any processing of personal data, including data collected through cookies.",
            "We rely on the following legal bases:",
          ],
          bullets: [
            "Strictly Necessary Cookies are placed on the basis of legitimate interest and contractual necessity. They are required for the Website to function and to deliver services you have requested. Your consent is not required for these cookies.",
            "All other categories of cookies, including functional, analytics, marketing, and social media cookies, are placed only on the basis of your freely given, specific, informed, and unambiguous consent, obtained through our cookie consent notice.",
            "Where consent is the legal basis, you have the right to withdraw it at any time without affecting the lawfulness of any processing carried out before the withdrawal. Withdrawing consent will not prevent you from continuing to use our Website, though some features may be limited.",
          ],
        },
        {
          heading: "Managing your cookie preferences",
          paragraphs: [
            "You have full control over the cookies we place on your device, except for strictly necessary cookies which cannot be disabled as they are essential to the Website’s operation.",
          ],
          subsections: [
            {
              heading: "7.1 Our Cookie Consent Banner",
              paragraphs: [
                "When you first visit our Website, a cookie consent banner will appear explaining the categories of cookies we use and asking for your preferences. You may choose to:",
              ],
              bullets: [
                "Accept all cookies",
                "Reject all non-essential cookies",
                "Customise your preferences by category",
              ],
            },
            {
              paragraphs: [
                "You can revisit and update your preferences at any time by clicking the “Cookie Settings” link in the footer of any page on our Website.",
              ],
            },
            {
              heading: "7.2 Managing Cookies Through Your Browser",
              paragraphs: [
                "You can also control and delete cookies through your internet browser settings. The steps for doing so vary by browser. General guidance is provided below:",
              ],
              bullets: [
                "Google Chrome: Open Settings, go to Privacy and Security, then Cookies and other site data.",
                "Mozilla Firefox: Open Options, go to Privacy and Security, then scroll to Cookies and Site Data.",
                "Microsoft Edge: Open Settings, go to Cookies and site permissions.",
                "Apple Safari: Open Preferences, go to Privacy, then select Manage Website Data.",
                "Opera: Open Settings, go to Advanced, then Privacy and Security, and then Cookies.",
              ],
            },
            {
              paragraphs: [
                "Please note that disabling cookies through your browser settings affects all websites you visit, not only ours. Disabling strictly necessary cookies may prevent you from using key features of our Website, including logging in or completing a purchase.",
              ],
            },
            {
              heading: "7.3 Opting Out of Specific Services",
              paragraphs: [
                "If you wish to prevent Google Analytics from collecting data about your visits to our Website and other websites, you can install the Google Analytics Opt-out Browser Add-on, available at tools.google.com/dlpage/gaoptout.",
                "For targeted advertising cookies set by third-party advertising networks, you may be able to opt out through the Digital Advertising Alliance (DAA) or similar industry opt-out tools. Please note that opting out does not mean you will stop seeing advertising; it means the advertising you see will no longer be personalised to your browsing behaviour.",
              ],
            },
          ],
        },
        {
          heading: "Cookies and personal data",
          paragraphs: [
            "Some cookies, particularly analytics, marketing, and functional cookies, may collect or be linked to personal data about you, such as your device’s IP address or your browsing history on our Website. Any personal data collected through cookies is processed in accordance with our Data Privacy Policy.",
            "We will not use cookie-collected personal data in a way that is incompatible with the purposes disclosed in this Policy or our Data Privacy Policy. Where we share cookie data with third parties (such as analytics or advertising providers), we ensure that appropriate data processing agreements and safeguards are in place.",
          ],
        },
        {
          heading: "Retention of cookie data",
          paragraphs: [
            "Cookies are retained on your device for the periods specified in Section 5 of this Policy. Where cookie data is also stored on our servers, it is retained in accordance with the periods set out in our Data Retention Policy. At the end of the applicable retention period, cookies expire automatically and any associated server-side data is securely deleted or anonymised.",
          ],
        },
        {
          heading: "Children and cookies",
          paragraphs: [
            "Our Website is not directed at children under the age of 18 and we do not knowingly use cookies to collect personal data from children. If you are a parent or guardian and you believe that a child under your care has used our Website and provided personal data without your consent, please contact our DPO and we will take prompt steps to address the matter.",
          ],
        },
        {
          heading: "Third-party cookies and links",
          paragraphs: [
            "Our Website may contain links to, or integrations with, third-party websites, platforms, and services. Where such integrations result in third-party cookies being placed on your device, those cookies are governed by the respective third party’s privacy and cookie policies. We are not responsible for the content or privacy practices of any third-party website or service. We encourage you to review the cookie policies of any third-party services you access through our Website.",
          ],
        },
        {
          heading: "Changes to this Cookie Policy",
          paragraphs: [
            "We may update this Cookie Policy from time to time to reflect changes in law, technology, or our business practices. Where material changes are made, we will update the effective date at the top of this Policy and notify you through our cookie consent mechanism or, where appropriate, by direct communication. We encourage you to review this Policy periodically so that you are always informed about our use of cookies.",
          ],
        },
        {
          heading: "Contact us",
          paragraphs: [
            "If you have any questions, concerns, or requests relating to this Cookie Policy or our use of cookies, please contact our Data Protection Officer:",
          ],
        },
      ]}
      contact={{
        intro: "Data Protection Officer:",
        lines: [
          { label: "Name", value: "Nwude Martin Uchenna" },
          { label: "Address", value: "GFD 57, Young Shall Grow Shopping Complex, 2, Johnson Main Market, Onitsha, Anambra State, Nigeria." },
          { label: "Email", value: "dpo@martinonoir.com", href: "mailto:dpo@martinonoir.com" },
          { label: "Telephone", value: "+2348038010651", href: "tel:+2348038010651" },
        ],
        outro:
          "If you are not satisfied with our response, you may lodge a complaint with the Nigeria Data Protection Commission (NDPC) at www.ndpc.gov.ng.",
      }}
    />
  );
}
