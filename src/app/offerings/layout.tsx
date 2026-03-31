import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";

const BASE_URL = "https://infygru.com";

export const metadata: Metadata = {
    title: "All Offerings | IT Services & Business Compliance Solutions | Infygru",
    description: "Discover Infygru's complete services — web development, n8n automation, cloud migration, DevOps, AI, business registration, GST, trademark, FSSAI, and compliance across India.",
    keywords: ["IT services India", "business registration services", "web development offerings", "compliance services India", "n8n automation", "cloud migration services India", "DevOps company India", "AI computer vision India"],
    alternates: { canonical: `${BASE_URL}/offerings` },
    openGraph: {
        title: "All Offerings | Enterprise IT & Business Services | Infygru",
        description: "One company, every solution — cloud, automation, AI, business registration and compliance.",
        url: `${BASE_URL}/offerings`,
        images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Infygru Offerings | IT & Business Services",
        description: "Web dev, automation, cloud, business registration and compliance — one company for everything.",
    },
};

const serviceItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${BASE_URL}/offerings#servicelist`,
    name: "Infygru Services",
    description: "Complete list of IT and business services offered by Infygru Private Limited",
    url: `${BASE_URL}/offerings`,
    numberOfItems: 11,
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Digital Transformation", url: `${BASE_URL}/services/digital-transformation` },
        { "@type": "ListItem", position: 2, name: "Website Development", url: `${BASE_URL}/services/web-development` },
        { "@type": "ListItem", position: 3, name: "n8n Automation", url: `${BASE_URL}/services/n8n-automation` },
        { "@type": "ListItem", position: 4, name: "Cloud Migration", url: `${BASE_URL}/services/cloud-migration` },
        { "@type": "ListItem", position: 5, name: "Data Analytics", url: `${BASE_URL}/services/data-analytics` },
        { "@type": "ListItem", position: 6, name: "DevOps", url: `${BASE_URL}/services/devops` },
        { "@type": "ListItem", position: 7, name: "ServiceNow", url: `${BASE_URL}/services/servicenow` },
        { "@type": "ListItem", position: 8, name: "Security Operations", url: `${BASE_URL}/services/security-operations` },
        { "@type": "ListItem", position: 9, name: "AI & Computer Vision", url: `${BASE_URL}/services/ai-computer-vision` },
        { "@type": "ListItem", position: 10, name: "Business Registration & Licensing", url: `${BASE_URL}/services/business-registration` },
        { "@type": "ListItem", position: 11, name: "Compliance & Taxation", url: `${BASE_URL}/services/compliance-taxation` },
    ],
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Offerings", item: `${BASE_URL}/offerings` },
    ],
};

export default function OfferingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <JsonLd data={serviceItemListSchema} />
            <JsonLd data={breadcrumbSchema} />
            {children}
        </>
    );
}
