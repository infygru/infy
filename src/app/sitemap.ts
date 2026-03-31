import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/directus";

const BASE_URL = "https://infygru.com";

const servicesSlugs = [
    "web-development",
    "n8n-automation",
    "cloud-migration",
    "data-analytics",
    "devops",
    "servicenow",
    "security-operations",
    "ai-computer-vision",
    "digital-transformation",
    "business-registration",
    "compliance-taxation",
];

const citySlugs = ["chennai", "bangalore", "mumbai", "hyderabad", "delhi", "coimbatore"];

// Generate city × service combinations for local SEO pages
const cityServiceRoutes = servicesSlugs.flatMap((service) =>
    citySlugs.map((city) => ({
        url: `/services/${service}/${city}`,
        priority: 0.75,
        changeFrequency: "monthly" as const,
    }))
);

const staticRoutes: {
    url: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" },
    { url: "/about", priority: 0.8, changeFrequency: "monthly" },
    { url: "/offerings", priority: 0.9, changeFrequency: "weekly" },
    { url: "/pricing", priority: 0.9, changeFrequency: "weekly" },
    { url: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { url: "/blog", priority: 0.7, changeFrequency: "daily" },
    { url: "/careers", priority: 0.6, changeFrequency: "weekly" },
    { url: "/case-studies", priority: 0.8, changeFrequency: "monthly" },
    // IT Services
    { url: "/services/web-development", priority: 0.85, changeFrequency: "monthly" },
    { url: "/services/n8n-automation", priority: 0.85, changeFrequency: "monthly" },
    { url: "/services/cloud-migration", priority: 0.85, changeFrequency: "monthly" },
    { url: "/services/data-analytics", priority: 0.85, changeFrequency: "monthly" },
    { url: "/services/devops", priority: 0.85, changeFrequency: "monthly" },
    { url: "/services/servicenow", priority: 0.85, changeFrequency: "monthly" },
    { url: "/services/security-operations", priority: 0.85, changeFrequency: "monthly" },
    { url: "/services/ai-computer-vision", priority: 0.85, changeFrequency: "monthly" },
    { url: "/services/digital-transformation", priority: 0.85, changeFrequency: "monthly" },
    // Business Services
    { url: "/services/business-registration", priority: 0.85, changeFrequency: "monthly" },
    { url: "/services/compliance-taxation", priority: 0.85, changeFrequency: "monthly" },
    // City-specific service pages
    ...cityServiceRoutes,
    // Legal
    { url: "/legal/privacy", priority: 0.3, changeFrequency: "yearly" },
    { url: "/legal/terms", priority: 0.3, changeFrequency: "yearly" },
    { url: "/legal/refund", priority: 0.3, changeFrequency: "yearly" },
    { url: "/legal/cookie", priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date().toISOString();

    const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
        url: `${BASE_URL}${route.url}`,
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }));

    // Dynamically include blog posts from Directus CMS
    let blogEntries: MetadataRoute.Sitemap = [];
    try {
        const posts = await getBlogPosts({ limit: 500 });
        blogEntries = posts.map((post) => ({
            url: `${BASE_URL}/blog/${post.slug}`,
            lastModified: post.date_published
                ? new Date(post.date_published).toISOString()
                : now,
            changeFrequency: "weekly" as const,
            priority: 0.7,
        }));
    } catch {
        // Directus unavailable at build time — static routes still generated
    }

    return [...staticEntries, ...blogEntries];
}
