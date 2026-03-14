"use client";

import Link from "next/link";
import { ArrowRight, Building2, Briefcase, Cloud, Code, Shield, Bot, Workflow, BarChart, Quote, CheckCircle2, Sparkles, Zap, Globe, Lock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, useReducedMotion } from "framer-motion";
import type { Client, Testimonial, SiteSettings } from "@/lib/directus";
import { fileUrl } from "@/lib/directus";
import { useEffect, useState } from "react";

const services = [
    { title: "Digital Transformation", description: "Modernize legacy systems and redesign core processes to make your business competitive and agile.", icon: <Workflow className="h-6 w-6" />, href: "/services/digital-transformation", color: "text-amber-600 bg-amber-50" },
    { title: "Web Development", description: "Enterprise-grade Next.js web applications built for speed, SEO, and stunning user experience.", icon: <Code className="h-6 w-6" />, href: "/services/web-development", color: "text-teal-600 bg-teal-50" },
    { title: "n8n Automation", description: "Connect every app in your business stack and remove manual repetitive work — permanently.", icon: <Bot className="h-6 w-6" />, href: "/services/n8n-automation", color: "text-orange-600 bg-orange-50" },
    { title: "Cloud Migration", description: "Zero-downtime migration to AWS, Azure, or GCP with rock-solid security architecture.", icon: <Cloud className="h-6 w-6" />, href: "/services/cloud-migration", color: "text-green-600 bg-green-50" },
    { title: "Data Analytics", description: "Turn your raw data into smart dashboards and predictions that drive confident decisions.", icon: <BarChart className="h-6 w-6" />, href: "/services/data-analytics", color: "text-purple-600 bg-purple-50" },
    { title: "Security Operations", description: "24/7 threat monitoring, vulnerability assessments, and incident response for enterprise peace of mind.", icon: <Shield className="h-6 w-6" />, href: "/services/security-operations", color: "text-slate-600 bg-slate-100" },
    { title: "Business Registration & Licensing", description: "Company incorporation, GST, trademark, MSME, FSSAI, IEC — we handle all registrations end-to-end.", icon: <Building2 className="h-6 w-6" />, href: "/services/business-registration", color: "text-amber-600 bg-amber-50" },
    { title: "Compliance & Taxation", description: "Expert auditing, ITR filing, and IATF certification to keep your business legally compliant.", icon: <Briefcase className="h-6 w-6" />, href: "/services/compliance-taxation", color: "text-green-600 bg-green-50" },
];

const stats = [
    { value: "99.9%", label: "Uptime SLA" },
    { value: "30d", label: "Avg. Delivery" },
    { value: "14+", label: "Enterprise Clients" },
    { value: "200+", label: "Hours Saved/Month" },
];

const perks = [
    "Lightning-fast project delivery",
    "Transparent, predictable pricing",
    "Dedicated support team",
    "End-to-end ownership",
];

const rotatingWords = ["Automation", "Cloud", "AI", "DevOps", "Security", "Analytics"];

const highlights = [
    { icon: <Zap className="w-5 h-5" />, title: "30-Day Launch", desc: "Fastest enterprise delivery in India", accent: "#f59e0b" },
    { icon: <Globe className="w-5 h-5" />, title: "Pan-India Coverage", desc: "Chennai · Mumbai · Bangalore & beyond", accent: "#22c55e" },
    { icon: <Lock className="w-5 h-5" />, title: "ISO-Grade Security", desc: "Enterprise security in every deployment", accent: "#64748b" },
    { icon: <Sparkles className="w-5 h-5" />, title: "AI-Powered Solutions", desc: "Next-gen automation & computer vision", accent: "#a855f7" },
];

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
    }),
};

function RotatingWord() {
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setIndex((i) => (i + 1) % rotatingWords.length), 2200);
        return () => clearInterval(t);
    }, []);
    return (
        <span className="relative inline-block overflow-hidden h-[1.1em] align-bottom">
            <motion.span
                key={index}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300"
            >
                {rotatingWords[index]}
            </motion.span>
        </span>
    );
}

export function HomeClient({
    settings,
    clients,
    testimonials
}: {
    settings: SiteSettings | null;
    clients: Client[];
    testimonials: Testimonial[];
}) {
    const prefersReduced = useReducedMotion();

    const displayClients = clients.length > 0 ? clients : [
        { id: 1, name: "Healthieyoo", logo: null, website_url: null, sort: 1, status: 'published' as const },
        { id: 2, name: "Ecton", logo: null, website_url: null, sort: 2, status: 'published' as const },
    ];

    const displayTestimonials = testimonials.length > 0 ? testimonials : [
        { id: 1, quote: "Infygru modernized our legacy systems in under 30 days.", author_name: "Sarah Jenkins", author_role: "CTO", company: "TechNova Solutions", author_photo: null, rating: 5, sort: 1, status: 'published' as const }
    ];

    const whatsappLink = settings?.contact_whatsapp
        ? `https://wa.me/${settings.contact_whatsapp.replace(/\D/g, "")}`
        : "https://wa.me/918300290019";

    return (
        <div className="relative font-sans bg-white">

            {/* ── HERO ── */}
            <section
                className="relative min-h-screen flex items-center overflow-hidden bg-slate-950 pt-20 pb-16"
                aria-label="Hero section"
            >
                {/* ── Animated gradient orbs ── */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Primary amber orb — top-right */}
                    <motion.div
                        className="absolute w-[700px] h-[700px] rounded-full"
                        style={{
                            background: "radial-gradient(circle, rgba(245,158,11,0.18) 0%, transparent 70%)",
                            top: "-10%",
                            right: "-10%",
                        }}
                        animate={prefersReduced ? {} : {
                            x: [0, 40, -20, 0],
                            y: [0, -30, 20, 0],
                            scale: [1, 1.08, 0.95, 1],
                        }}
                        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    />
                    {/* Green orb — bottom-left */}
                    <motion.div
                        className="absolute w-[600px] h-[600px] rounded-full"
                        style={{
                            background: "radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)",
                            bottom: "-5%",
                            left: "-5%",
                        }}
                        animate={prefersReduced ? {} : {
                            x: [0, -30, 20, 0],
                            y: [0, 40, -20, 0],
                            scale: [1, 0.9, 1.05, 1],
                        }}
                        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                    />
                    {/* Purple orb — center */}
                    <motion.div
                        className="absolute w-[500px] h-[500px] rounded-full"
                        style={{
                            background: "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
                            top: "30%",
                            left: "40%",
                        }}
                        animate={prefersReduced ? {} : {
                            x: [0, 50, -50, 0],
                            y: [0, -40, 40, 0],
                        }}
                        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 5 }}
                    />
                    {/* Subtle dot grid */}
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
                    {/* Top vignette */}
                    <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-950 to-transparent" />
                    {/* Bottom vignette */}
                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />
                </div>

                <div className="container mx-auto px-4 max-w-6xl relative z-10 w-full">

                    {/* Rotating badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-center mb-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 font-bold text-xs tracking-widest uppercase font-heading">
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                            {settings?.tagline || "Engineering India's Digital Future"}
                        </div>
                    </motion.div>

                    {/* H1 — enterprise tone with rotating word */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-center mb-6"
                    >
                        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
                            We Build. We Automate.
                            <br />
                            <span className="inline-flex items-center gap-3 mt-1">
                                <span className="text-slate-400 font-black">You</span>
                                {" "}
                                <RotatingWord />
                                <span className="text-slate-400">.</span>
                            </span>
                        </h1>
                    </motion.div>

                    {/* Subheading */}
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-center text-lg md:text-xl text-slate-400 mb-10 leading-relaxed font-light max-w-2xl mx-auto"
                    >
                        {settings?.hero_subheading ||
                            "Elite software development, cloud architecture, and business compliance — built for enterprises that refuse to compromise."}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row justify-center gap-4 mb-14"
                    >
                        <Link href="/pricing">
                            <Button
                                size="lg"
                                className="w-full sm:w-auto h-13 px-8 bg-amber-500 text-white hover:bg-amber-400 font-heading font-extrabold text-base group rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-400/30 hover:-translate-y-0.5 transition-all"
                            >
                                View Pricing <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="/offerings">
                            <Button
                                size="lg"
                                variant="outline"
                                className="w-full sm:w-auto h-13 px-8 border-slate-700 hover:border-slate-500 hover:bg-slate-800/50 text-slate-200 font-heading font-bold text-base rounded-xl transition-all"
                            >
                                Explore Offerings
                            </Button>
                        </Link>
                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                            <Button
                                size="lg"
                                className="w-full sm:w-auto h-13 px-8 bg-white/10 border border-white/20 text-white hover:bg-white/20 font-heading font-bold text-base rounded-xl backdrop-blur-sm hover:-translate-y-0.5 transition-all"
                            >
                                Schedule A Call
                            </Button>
                        </a>
                    </motion.div>

                    {/* Stats row */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14 max-w-3xl mx-auto"
                    >
                        {stats.map((s) => (
                            <div
                                key={s.label}
                                className="text-center bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5 hover:bg-white/10 hover:-translate-y-0.5 transition-all"
                            >
                                <div className="text-3xl font-black font-heading text-white mb-1">{s.value}</div>
                                <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">{s.label}</div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Feature highlight cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                    >
                        {highlights.map((h, i) => (
                            <motion.div
                                key={h.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.55 + i * 0.07, duration: 0.45 }}
                                className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-5 flex items-start gap-3 hover:bg-white/10 hover:-translate-y-0.5 transition-all"
                            >
                                <div
                                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                                    style={{ background: `${h.accent}22`, color: h.accent }}
                                >
                                    {h.icon}
                                </div>
                                <div>
                                    <div className="font-heading font-bold text-sm text-white mb-0.5">{h.title}</div>
                                    <div className="text-xs text-slate-500 leading-snug">{h.desc}</div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Perks */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.85, duration: 0.5 }}
                        className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-10"
                    >
                        {perks.map((p, i) => (
                            <span key={i} className="flex items-center gap-1.5 text-sm text-slate-500">
                                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                                {p}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── CLIENTS STRIP ── */}
            <section className="py-16 bg-slate-950 relative overflow-hidden" aria-label="Client logos">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:24px_24px]" />
                <p className="text-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-10 relative z-10">
                    Trusted by innovative enterprises across India
                </p>
                <div className="relative flex overflow-hidden w-full z-10">
                    <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
                    {displayClients.length > 0 && (
                        <motion.div className="flex w-max" animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 36 }}>
                            {[...displayClients, ...displayClients, ...displayClients, ...displayClients].map((client, idx) => (
                                <div key={idx} className="flex px-5 md:px-8 items-center justify-center shrink-0">
                                    <div className="bg-white px-8 py-5 rounded-xl border border-white/10 shadow flex items-center justify-center w-40 md:w-52 h-20 md:h-24">
                                        <img
                                            src={client.logo ? fileUrl(client.logo)! : "/client/healthieyoo.webp"}
                                            alt={`${client.name} – Infygru client`}
                                            className="max-h-full max-w-full object-contain"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>

            {/* ── SERVICES GRID ── */}
            <section className="py-24 bg-white" aria-label="Our services">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-3">What We Do</p>
                            <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                                Everything Your Business Needs
                            </h2>
                        </div>
                        <Link href="/offerings">
                            <Button variant="outline" className="font-heading font-bold border-border text-foreground hover:bg-muted group shrink-0">
                                See All Services <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {services.map((service, idx) => (
                            <motion.div key={service.title} custom={idx} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} variants={cardVariants}>
                                <Link href={service.href} className="group block h-full">
                                    <div className="h-full bg-white rounded-2xl p-6 border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${service.color} group-hover:scale-110 transition-transform duration-300`}>
                                            {service.icon}
                                        </div>
                                        <h3 className="font-heading text-base font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm font-light leading-relaxed flex-1">
                                            {service.description}
                                        </p>
                                        <div className="mt-4 flex items-center gap-1 text-xs font-bold text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                            Learn more <ArrowRight className="w-3 h-3" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS ── */}
            <section className="py-24 bg-slate-950 relative overflow-hidden" aria-label="Client testimonials">
                <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <div className="text-center mb-14">
                        <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">Testimonials</p>
                        <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                            Proven Results
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {displayTestimonials.map((t, idx) => (
                            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.5 }} className="bg-slate-800/60 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/60 flex flex-col">
                                <Quote className="w-8 h-8 text-amber-400/30 mb-5" />
                                <p className="text-slate-300 leading-relaxed font-light italic mb-8 text-sm flex-1">
                                    &ldquo;{t.quote}&rdquo;
                                </p>
                                <div className="flex items-center gap-3">
                                    {t.author_photo ? (
                                        <img src={fileUrl(t.author_photo, { width: 80, height: 80, fit: "cover" })!} alt={t.author_name} className="w-10 h-10 rounded-full object-cover border border-slate-600" loading="lazy" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold font-heading">
                                            {t.author_name.charAt(0)}
                                        </div>
                                    )}
                                    <div>
                                        <div className="text-white font-bold text-sm font-heading">{t.author_name}</div>
                                        <div className="text-slate-500 text-xs">{t.author_role}{t.company ? `, ${t.company}` : ''}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-24 bg-white border-t border-border" aria-label="Call to action">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-4">Get Started</p>
                        <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-foreground mb-6 tracking-tight">
                            Ready to architect your future?
                        </h2>
                        <p className="text-lg text-muted-foreground font-light mb-10 max-w-2xl mx-auto">
                            Join industry leaders scaling with precision and speed. Schedule an enterprise consultation today.
                        </p>
                        <Link href={whatsappLink}>
                            <Button size="lg" className="font-heading font-extrabold px-12 h-14 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all bg-foreground text-background hover:bg-foreground/90 rounded-xl">
                                Schedule a Call
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
