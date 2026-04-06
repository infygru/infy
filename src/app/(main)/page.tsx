import { getSiteSettings, getClients, getTestimonials } from "@/lib/directus";
import { HomeClient } from "./HomeClient";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";

const BASE_URL = "https://infygru.com";

export const metadata: Metadata = {
    alternates: { canonical: BASE_URL },
    openGraph: { url: BASE_URL },
};

const homePageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}/#homepage`,
    name: "Infygru — Enterprise IT Solutions & Business Services",
    url: BASE_URL,
    description: "Chennai's leading enterprise IT company offering web development, n8n automation, cloud migration, DevOps, AI solutions, business registration, and compliance services across India.",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#organization` },
    speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "h2", ".hero-description"],
    },
};

// Server component to fetch data for the homepage
export default async function Home() {
    const [settings, clients, testimonials] = await Promise.all([
        getSiteSettings(),
        getClients(),
        getTestimonials()
    ]);

    return (
        <>
            <JsonLd data={homePageSchema} />
            <HomeClient
                settings={settings}
                clients={clients}
                testimonials={testimonials}
            />
        </>
    );
}
