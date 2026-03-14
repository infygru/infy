import { getBlogPosts, getBlogCategories } from "@/lib/directus";
import { BlogClient } from "./BlogClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | IT Insights, Business Tips & Compliance Guides | Infygru",
    description: "Expert articles on business registration, GST compliance, web development, cloud migration, n8n automation, and digital transformation — by Infygru's team.",
    keywords: ["IT blog India", "business registration guide", "GST compliance tips", "web development articles", "digital transformation blog"],
    alternates: { canonical: "https://infygru.com/blog" },
    openGraph: {
        title: "Infygru Blog | IT Insights & Business Compliance Guides",
        description: "Learn from Chennai's top IT and compliance experts. Articles on cloud, automation, registration, and more.",
        url: "https://infygru.com/blog",
        images: [{ url: "https://infygru.com/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Infygru Blog | IT & Business Insights",
        description: "Expert guides on GST, company incorporation, cloud migrations, and digital transformation.",
    },
};

// Server Component fetching from Directus CMS
export default async function BlogPage() {
    const [posts, categories] = await Promise.all([
        getBlogPosts(),
        getBlogCategories()
    ]);

    return <BlogClient posts={posts} categories={categories} />;
}
