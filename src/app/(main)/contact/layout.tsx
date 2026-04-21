import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "Contact Infygru | Free Web Development & Company Registration Consultation — Chennai",
    description: "Talk to our experts for web development, company registration, GST filing, cloud migration, or n8n automation. Based in Chennai. Free 30-min consultation. Same-day response.",
    keywords: [
        "contact web development company Chennai",
        "free consultation IT company India",
        "web development quote Chennai",
        "company registration consultant Chennai",
        "GST registration help Chennai",
        "hire web developer Chennai",
        "IT company contact Chennai",
        "business registration consultant India",
    ],
    alternates: { canonical: "https://infygru.com/contact" },
    openGraph: {
        title: "Contact Infygru | Free Web Dev & Company Registration Consultation",
        description: "Talk to Chennai's top IT and compliance experts. Free 30-min consultation. Web development, company registration, GST, cloud & automation.",
        url: "https://infygru.com/contact",
        images: [{ url: "https://infygru.com/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Infygru | Free Consultation — Chennai",
        description: "Free 30-min consultation for web development, company registration, GST, cloud migration & automation.",
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
