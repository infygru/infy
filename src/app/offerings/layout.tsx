import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "All Offerings | IT Services & Business Compliance Solutions | Infygru",
    description: "Discover Infygru's complete services — web development, n8n automation, cloud migration, DevOps, AI, business registration, GST, trademark, FSSAI, and compliance across India.",
    keywords: ["IT services India", "business registration services", "web development offerings", "compliance services India", "n8n automation"],
    alternates: { canonical: "https://infygru.com/offerings" },
    openGraph: {
        title: "All Offerings | Enterprise IT & Business Services | Infygru",
        description: "One company, every solution — cloud, automation, AI, business registration and compliance.",
        url: "https://infygru.com/offerings",
        images: [{ url: "https://infygru.com/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Infygru Offerings | IT & Business Services",
        description: "Web dev, automation, cloud, business registration and compliance — one company for everything.",
    },
};

export default function OfferingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
