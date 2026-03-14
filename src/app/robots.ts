import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            // Default: allow all crawlers, block non-public paths
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/_next/", "/admin/", "/checkout"],
            },
            // Google search AI (SGE / AI Overviews)
            {
                userAgent: "Google-Extended",
                allow: "/",
                disallow: ["/api/"],
            },
            // OpenAI crawlers
            {
                userAgent: "GPTBot",
                allow: "/",
                disallow: ["/api/"],
            },
            {
                userAgent: "OAI-SearchBot",
                allow: "/",
                disallow: ["/api/"],
            },
            {
                userAgent: "ChatGPT-User",
                allow: "/",
                disallow: ["/api/"],
            },
            // Anthropic / Claude
            {
                userAgent: "ClaudeBot",
                allow: "/",
                disallow: ["/api/"],
            },
            {
                userAgent: "anthropic-ai",
                allow: "/",
                disallow: ["/api/"],
            },
            // Perplexity AI
            {
                userAgent: "PerplexityBot",
                allow: "/",
                disallow: ["/api/"],
            },
            // Microsoft / Bing
            {
                userAgent: "Bingbot",
                allow: "/",
                disallow: ["/api/"],
            },
            {
                userAgent: "msnbot",
                allow: "/",
                disallow: ["/api/"],
            },
            // Apple
            {
                userAgent: "Applebot",
                allow: "/",
                disallow: ["/api/"],
            },
            // You.com
            {
                userAgent: "YouBot",
                allow: "/",
                disallow: ["/api/"],
            },
            // Common Crawl (used by many AI training datasets)
            {
                userAgent: "CCBot",
                allow: "/",
                disallow: ["/api/"],
            },
            // Cohere AI
            {
                userAgent: "cohere-ai",
                allow: "/",
                disallow: ["/api/"],
            },
        ],
        sitemap: "https://infygru.com/sitemap.xml",
        host: "https://infygru.com",
    };
}
