import { OG_IMAGE, SITE_URL } from "../site.js";
import { projectsData } from "./projects.js";

export const INDEX_ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

export const FAQS = [
  {
    q: "Do I need a developer on staff for n8n and AI agents?",
    a: "No. We handle setup, testing and maintenance. You stay on WhatsApp. We run the automations, AI agents and CRM.",
  },
  {
    q: "What automations do you actually build?",
    a: "n8n, Make and Zapier workflows, AI agents, lead hunting, CRM sync and WhatsApp. You get a working system, not a slide deck.",
  },
  {
    q: "Can you set up an AI phone receptionist?",
    a: "Yes. It answers calls, books appointments and logs the conversation in your CRM.",
  },
  {
    q: "How long does a typical project take?",
    a: "Simple automations take a few days. AI agents, voice receptionists, n8n and CRM builds usually take two to four weeks. We test on your real calls and data.",
  },
  {
    q: "Which tools do you work with?",
    a: "n8n, Zapier, Make, GoHighLevel, HubSpot, Zoho, WhatsApp and AI agents. If your tool has an API, we can connect it.",
  },
  {
    q: "How much do automation and data services cost?",
    a: "You get a fixed quote after a free audit. Most clients cover the cost in a few months.",
  },
  {
    q: "Do you also handle CRM sync and data services?",
    a: "Yes. We keep leads, stock and reports accurate in your CRM and spreadsheets, then run automations on top of that data.",
  },
  {
    q: "Do you work with businesses in the US, UK and Europe?",
    a: "Yes. We work in English across the US, UK and Europe. WhatsApp or email for the free audit.",
  },
  {
    q: "Is my business data safe?",
    a: "Yes. Your accounts and passwords stay yours. Agents only see the data they need. Data services stay in your CRM.",
  },
];

const business = {
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#business`,
  name: "aisolhub",
  url: SITE_URL + "/",
  image: OG_IMAGE,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/favicon-512.png`,
    width: 512,
    height: 512,
  },
  description:
    "aisolhub builds AI agents, n8n workflows, CRM sync and WhatsApp systems for businesses in the US, UK and Europe.",
  telephone: "+923126413792",
  priceRange: "$$",
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "AdministrativeArea", name: "European Union" },
  ],
  availableLanguage: ["English"],
  serviceType: [
    "Business automation",
    "Data services",
    "Lead generation automation",
    "AI phone receptionist",
    "Social media automation",
    "AI customer support",
    "CRM data sync",
    "n8n automation",
  ],
  sameAs: ["https://www.linkedin.com/in/aisolhub", "https://github.com/aisolhub2026"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: "+923126413792",
    url: "https://wa.me/923126413792",
    availableLanguage: ["English"],
    areaServed: ["US", "GB", "EU"],
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Business automation services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lead generation automation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Social media automation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI customer replies" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI phone receptionist" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "CRM and follow up automation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "n8n and Make workflows" } },
    ],
  },
};

export const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "aisolhub",
      url: `${SITE_URL}/`,
      inLanguage: "en",
      description: business.description,
      publisher: { "@id": `${SITE_URL}/#business` },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: "aisolhub — AI agents, n8n workflows and CRM automation",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#business` },
      description:
        "Custom AI agents, n8n workflows, CRM sync and WhatsApp systems for businesses in the US, UK and Europe. Free 20-minute audit.",
      inLanguage: "en",
      dateModified: "2026-09-15",
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: OG_IMAGE,
        width: 1200,
        height: 630,
      },
      breadcrumb: { "@id": `${SITE_URL}/#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/#breadcrumb`,
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }],
    },
    business,
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export const workJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/work#webpage`,
      url: `${SITE_URL}/work`,
      name: "Work — AI, n8n and CRM automations | aisolhub",
      description:
        "Client automations we shipped: AI agents, n8n, CRM and WhatsApp for Terzo, SimplyFlow, Qobrix, GuardXP and more.",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#business` },
      inLanguage: "en",
      dateModified: "2026-09-15",
      breadcrumb: { "@id": `${SITE_URL}/work#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/work#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/work` },
      ],
    },
    {
      "@type": "ItemList",
      name: "aisolhub automations",
      numberOfItems: projectsData.length,
      itemListElement: projectsData.map((project, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: project.title,
        url: project.liveUrl || `${SITE_URL}/work`,
      })),
    },
  ],
};
