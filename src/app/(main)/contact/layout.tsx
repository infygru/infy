import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "Contact Us | Get a Free IT & Business Consultation — Infygru Chennai",
    description: "Contact Infygru for enterprise IT solutions, web development, cloud migration, n8n automation, business registration, and compliance services. Based in Chennai, serving Pan-India.",
    keywords: ["contact IT company Chennai", "free consultation IT services India", "web development quote India", "business registration help Chennai"],
    alternates: { canonical: "https://infygru.com/contact" },
    openGraph: {
        title: "Contact Infygru | Free IT & Business Consultation",
        description: "Talk to our enterprise architects and compliance experts. Based in Chennai, serving businesses across India.",
        url: "https://infygru.com/contact",
        images: [{ url: "https://infygru.com/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Infygru | Free IT & Business Consultation",
        description: "Get in touch with Chennai's top IT and compliance company.",
    },
};

const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": "https://infygru.com/contact#contactpage",
    name: "Contact Infygru",
    description: "Contact Infygru for enterprise IT solutions, business registration, and compliance services.",
    url: "https://infygru.com/contact",
    mainEntity: {
        "@type": "Organization",
        "@id": "https://infygru.com/#organization",
    },
    breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://infygru.com" },
            { "@type": "ListItem", position: 2, name: "Contact", item: "https://infygru.com/contact" },
        ],
    },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <JsonLd data={contactPageSchema} />
            {children}
        </>
    );
}
