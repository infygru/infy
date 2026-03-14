import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, User, Calendar, Tag } from "lucide-react";
import { getBlogPost, getBlogPosts } from "@/lib/directus";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata, ResolvingMetadata } from "next";

const BASE_URL = "https://infygru.com";

export async function generateStaticParams() {
    // Generate static routes for the first 100 published posts
    const posts = await getBlogPosts({ limit: 100 });
    return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlogPost(slug);
    if (!post) return {};
    
    return {
        title: post.seo_title || `${post.title} | Infygru Blog`,
        description: post.seo_description || post.excerpt || undefined,
        keywords: post.tags || [],
        alternates: { canonical: `${BASE_URL}/blog/${slug}` },
        openGraph: {
            type: "article",
            title: post.seo_title || post.title,
            description: post.seo_description || post.excerpt || undefined,
            url: `${BASE_URL}/blog/${slug}`,
            siteName: "Infygru",
            publishedTime: post.date_published || undefined,
            authors: post.author_name ? [post.author_name] : ["Infygru"],
            tags: post.tags || [],
            images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: post.title }],
        },
        twitter: {
            card: "summary_large_image",
            title: post.seo_title || post.title,
            description: post.seo_description || post.excerpt || undefined,
            images: [`${BASE_URL}/og-image.png`],
        },
    };
}

const categoryColors: Record<string, string> = {
    business: "bg-amber-100 text-amber-700",
    compliance: "bg-green-100 text-green-700",
    technology: "bg-blue-100 text-blue-700",
    "web-development": "bg-purple-100 text-purple-700",
    automation: "bg-rose-100 text-rose-700",
};

const categoryBar: Record<string, string> = {
    business: "from-amber-400 to-orange-500",
    compliance: "from-green-400 to-emerald-600",
    technology: "from-blue-400 to-indigo-600",
    "web-development": "from-purple-400 to-violet-600",
    automation: "from-rose-400 to-pink-600",
};

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    
    // Fetch individual post from Directus
    const post = await getBlogPost(slug);
    if (!post) notFound();

    // Fetch related articles (same category)
    const catSlug = typeof post.category === 'object' && post.category ? post.category.slug : "business";
    const catName = typeof post.category === 'object' && post.category ? post.category.name : "Category";
    
    const allPosts = await getBlogPosts({ category: catSlug, limit: 3 });
    const related = allPosts.filter((p) => p.slug !== slug).slice(0, 2);

    const barGradient = categoryBar[catSlug] || "from-amber-400 to-green-400";
    
    // Fix dates and tags mapping
    const tags = post.tags || [];
    const dateFormatted = post.date_published 
        ? new Date(post.date_published).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
        : "Recent";

    // Directus provides proper HTML content (input-rich-text-html) so we can just use dangerouslySetInnerHTML
    // But if we want to retain the simple Markdown renderer for plain text fallback:
    const renderContent = (content: string) => {
        return content.split("\n\n").map((block, i) => {
            if (block.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold text-slate-900 font-heading mt-10 mb-4">{block.replace("## ", "")}</h2>;
            if (block.startsWith("### ")) return <h3 key={i} className="text-xl font-bold text-slate-800 font-heading mt-8 mb-3">{block.replace("### ", "")}</h3>;
            if (block.match(/^\d+\. /m) || block.startsWith("- ")) {
                const items = block.split("\n").filter(Boolean);
                const isOrdered = items[0].match(/^\d+\. /);
                const Tag2 = isOrdered ? "ol" : "ul";
                return (
                    <Tag2 key={i} className={`my-4 space-y-2 pl-6 ${isOrdered ? "list-decimal" : "list-disc"}`}>
                        {items.map((item, j) => {
                            const text = item.replace(/^\d+\. |^- /, "");
                            const parts = text.split(/\*\*(.*?)\*\*/g);
                            return <li key={j} className="text-slate-600 font-light leading-relaxed">{parts.map((part, k) => k % 2 === 1 ? <strong key={k} className="font-bold text-slate-800">{part}</strong> : part)}</li>;
                        })}
                    </Tag2>
                );
            }
            const parts = block.split(/\*\*(.*?)\*\*/g);
            return <p key={i} className="text-slate-600 font-light leading-relaxed my-4">{parts.map((part, k) => k % 2 === 1 ? <strong key={k} className="font-bold text-slate-800">{part}</strong> : part)}</p>;
        });
    };

    // Article JSON-LD schema
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${BASE_URL}/blog/${slug}#article`,
        headline: post.title,
        description: post.excerpt || undefined,
        author: {
            "@type": "Person",
            name: post.author_name || "Infygru Editorial Team",
        },
        publisher: {
            "@id": `${BASE_URL}/#organization`,
        },
        datePublished: post.date_published || undefined,
        url: `${BASE_URL}/blog/${slug}`,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${BASE_URL}/blog/${slug}`,
        },
        keywords: tags.join(", ") || undefined,
        articleSection: catName,
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
            { "@type": "ListItem", position: 3, name: post.title, item: `${BASE_URL}/blog/${slug}` },
        ],
    };

    return (
        <div className="min-h-screen bg-white">
            <JsonLd data={articleSchema} />
            <JsonLd data={breadcrumbSchema} />
            {/* Header Banner */}
            <div className={`h-2 w-full bg-gradient-to-r ${barGradient}`} />

            {/* Article Hero */}
            <section className="pt-24 pb-16 bg-slate-50 border-b border-slate-200">
                <div className="container mx-auto px-4 max-w-3xl">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-amber-600 transition-colors mb-8 font-medium">
                        <ArrowLeft className="w-4 h-4" /> Back to Blog
                    </Link>
                    <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-6 ${categoryColors[catSlug] || "bg-slate-100 text-slate-600"}`}>
                        {catName}
                    </span>
                    <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                        {post.title}
                    </h1>
                    <p className="text-lg text-slate-500 font-light mb-8">{post.excerpt}</p>
                    <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400">
                        <span className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-xs">
                                {(post.author_name || "I").charAt(0)}
                            </div>
                            <div>
                                <div className="text-slate-800 font-semibold">{post.author_name || "Infygru"}</div>
                                <div className="text-xs text-slate-400">{post.author_role || "Editorial Team"}</div>
                            </div>
                        </span>
                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{dateFormatted}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.read_time || "5 min read"}</span>
                    </div>
                </div>
            </section>

            {/* Article Body */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-3xl">
                    {/* Render rich HTML content directly if present, else fallback to mock renderer */}
                    <article className="prose-custom">
                        {post.content && post.content.includes("<p>") 
                            ? <div dangerouslySetInnerHTML={{ __html: post.content }} className="directus-content" />
                            : renderContent(post.content || "")
                        }
                    </article>

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-slate-100">
                            <div className="flex items-center gap-3 flex-wrap">
                                <Tag className="w-4 h-4 text-slate-400" />
                                {tags.map((tag) => (
                                    <span key={tag} className="text-sm px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Related Posts */}
            {related.length > 0 && (
                <section className="py-16 bg-slate-50 border-t border-slate-200">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <h2 className="font-heading text-2xl font-bold text-slate-900 mb-8">Related Articles</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {related.map((rel) => {
                                const relCatSlug = typeof rel.category === 'object' && rel.category ? rel.category.slug : "business";
                                const relCatName = typeof rel.category === 'object' && rel.category ? rel.category.name : "Category";
                                return (
                                    <Link key={rel.slug} href={`/blog/${rel.slug}`} className="group block">
                                        <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                                            <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full inline-block mb-3 ${categoryColors[relCatSlug] || "bg-slate-100 text-slate-600"}`}>
                                                {relCatName}
                                            </span>
                                            <h3 className="font-heading font-bold text-slate-900 group-hover:text-amber-600 transition-colors leading-snug text-base mb-2">{rel.title}</h3>
                                            <p className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" />{rel.read_time || "5 min read"}</p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="py-16 bg-slate-950 text-center">
                <div className="container mx-auto px-4 max-w-2xl">
                    <h2 className="font-heading text-3xl font-extrabold text-white mb-4">Need Expert Help?</h2>
                    <p className="text-slate-400 font-light mb-8">Our team of specialists is ready to assist with your business registration, compliance, or technology needs.</p>
                    <Link href="https://wa.me/918300290019" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-4 rounded-xl transition-colors font-heading">
                        Schedule a Free Consultation
                    </Link>
                </div>
            </section>
        </div>
    );
}
