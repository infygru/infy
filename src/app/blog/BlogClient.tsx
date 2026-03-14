"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Clock, User, Tag } from "lucide-react";
import type { BlogPost, BlogCategory } from "@/lib/directus";
import { fileUrl } from "@/lib/directus";

const categoryColors: Record<string, string> = {
    business: "bg-amber-100 text-amber-700",
    compliance: "bg-green-100 text-green-700",
    technology: "bg-blue-100 text-blue-700",
    "web-development": "bg-purple-100 text-purple-700",
    automation: "bg-rose-100 text-rose-700",
};

export function BlogClient({ posts, categories }: { posts: BlogPost[], categories: BlogCategory[] }) {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState<number | "all">("all");

    // Fix up dates for display
    const formatDate = (dateString: string | null) => {
        if (!dateString) return "Recent";
        return new Date(dateString).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    };

    const filtered = useMemo(() => {
        return posts.filter((post) => {
            const catId = typeof post.category === 'object' && post.category !== null ? post.category.id : post.category;
            const matchesCategory = activeCategory === "all" || catId === activeCategory;
            const query = search.toLowerCase();
            const matchesSearch =
                !query ||
                post.title.toLowerCase().includes(query) ||
                (post.excerpt?.toLowerCase().includes(query) ?? false) ||
                (post.tags?.some((t) => t.toLowerCase().includes(query)) ?? false);
            return matchesCategory && matchesSearch;
        });
    }, [search, activeCategory, posts]);

    const featured = posts.length > 0 ? posts[0] : null;

    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="relative pt-32 pb-24 bg-slate-950 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem]" />
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-green-500/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-8">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                            Insights &amp; Resources
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 font-heading">
                            The Infygru
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-green-400">
                                {" "}Knowledge Hub
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 font-light max-w-2xl mx-auto mb-10">
                            Expert insights on business registration, compliance, taxation, technology, and digital transformation.
                        </p>

                        <div className="relative max-w-xl mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search articles, topics, tags..."
                                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400/40 transition-all text-sm"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Post */}
            {featured && (
                <section className="py-16 bg-slate-50 border-b border-slate-100">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Featured Article</p>
                        <Link href={`/blog/${featured.slug}`}>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="group grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-400 overflow-hidden">
                                <div className="bg-gradient-to-br from-amber-400 to-green-400 min-h-[280px] lg:min-h-[360px] flex items-center justify-center relative overflow-hidden">
                                    {featured.featured_image && (
                                        <div className="absolute inset-0">
                                            <img src={fileUrl(featured.featured_image, { fit: "cover" }) || ""} alt={featured.title} className="w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-105 transition-transform duration-700" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/10" />
                                    <div className="relative z-10 p-10 text-white">
                                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                                            <Tag className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {featured.tags?.map((tag) => (
                                                <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/20 font-semibold">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 lg:p-12 flex flex-col justify-center">
                                    {typeof featured.category === 'object' && featured.category && (
                                        <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-4 ${categoryColors[featured.category.slug] || "bg-slate-100 text-slate-600"}`}>
                                            {featured.category.name}
                                        </span>
                                    )}
                                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 font-heading group-hover:text-amber-600 transition-colors leading-tight">
                                        {featured.title}
                                    </h2>
                                    <p className="text-slate-500 font-light leading-relaxed mb-6">{featured.excerpt}</p>
                                    <div className="flex items-center gap-4 text-sm text-slate-400">
                                        <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{featured.author_name || "Infygru Team"}</span>
                                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{featured.read_time || "5 min read"}</span>
                                    </div>
                                    <div className="mt-6 flex items-center gap-2 text-amber-600 font-bold text-sm group-hover:gap-4 transition-all">
                                        Read Article <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    </div>
                </section>
            )}

            {/* Blog List */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Category Pills */}
                    <div className="flex flex-wrap gap-2 mb-12">
                        <button
                            onClick={() => setActiveCategory("all")}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${activeCategory === "all" ? "bg-slate-900 text-white border-slate-900 shadow-md" : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"}`}
                        >
                            All Posts
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${activeCategory === cat.id ? "bg-slate-900 text-white border-slate-900 shadow-md" : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"}`}
                            >
                                {cat.name}
                            </button>
                        ))}
                        {(search || activeCategory !== "all") && (
                            <button onClick={() => { setSearch(""); setActiveCategory("all"); }} className="px-4 py-2 rounded-full text-sm font-semibold text-rose-500 border border-rose-200 hover:bg-rose-50 transition-all">
                                Clear filters
                            </button>
                        )}
                    </div>

                    <AnimatePresence mode="wait">
                        {filtered.length === 0 ? (
                            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 text-slate-400">
                                <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
                                <p className="text-xl font-semibold text-slate-500 mb-2">No articles found</p>
                                <p className="text-sm">Try a different search term or category.</p>
                            </motion.div>
                        ) : (
                            <motion.div key={`${activeCategory}-${search}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filtered.slice(featured ? 1 : 0).map((post, idx) => {
                                    const catSlug = typeof post.category === 'object' && post.category ? post.category.slug : "business";
                                    const catName = typeof post.category === 'object' && post.category ? post.category.name : "Category";
                                    
                                    return (
                                        <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06, duration: 0.4 }}>
                                            <Link href={`/blog/${post.slug}`} className="group block h-full">
                                                <div className="h-full bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
                                                    <div className={`h-1.5 w-full ${catSlug === "business" ? "bg-amber-400" : catSlug === "compliance" ? "bg-green-400" : catSlug === "automation" ? "bg-rose-400" : catSlug === "web-development" ? "bg-purple-400" : "bg-blue-400"}`} />
                                                    <div className="p-6 flex flex-col flex-1">
                                                        <div className="flex items-center justify-between mb-4">
                                                            <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${categoryColors[catSlug] || "bg-slate-100 text-slate-600"}`}>
                                                                {catName}
                                                            </span>
                                                            <span className="text-xs text-slate-400 flex items-center gap-1">
                                                                <Clock className="w-3 h-3" />{post.read_time || "5 min read"}
                                                            </span>
                                                        </div>
                                                        <h3 className="font-heading font-bold text-lg text-slate-900 mb-3 group-hover:text-amber-600 transition-colors leading-snug">
                                                            {post.title}
                                                        </h3>
                                                        <p className="text-sm text-slate-500 font-light leading-relaxed mb-4 flex-1">
                                                            {post.excerpt}
                                                        </p>
                                                        <div className="flex flex-wrap gap-1.5 mb-5">
                                                            {post.tags?.slice(0, 3).map((tag) => (
                                                                <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium">
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                                                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                                                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-[10px]">
                                                                    {(post.author_name || "I").charAt(0)}
                                                                </div>
                                                                {post.author_name || "Infygru"}
                                                            </div>
                                                            <span className="text-xs text-slate-400">{formatDate(post.date_published)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </div>
    );
}
