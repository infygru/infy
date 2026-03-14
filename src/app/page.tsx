import { getSiteSettings, getClients, getTestimonials } from "@/lib/directus";
import { HomeClient } from "./HomeClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "https://infygru.com" },
    openGraph: { url: "https://infygru.com" },
};

// Server component to fetch data for the homepage
export default async function Home() {
    const [settings, clients, testimonials] = await Promise.all([
        getSiteSettings(),
        getClients(),
        getTestimonials()
    ]);

    return (
        <HomeClient 
            settings={settings} 
            clients={clients} 
            testimonials={testimonials} 
        />
    );
}
