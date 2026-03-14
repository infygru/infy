import { servicesData } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/JsonLd";
import { CheckCircle2, ArrowLeft, ArrowRight, ChevronRight, Zap, ShieldCheck, Activity, Clock } from "lucide-react";
import type { Metadata } from "next";

const BASE_URL = "https://infygru.com";

export function generateStaticParams() {
    return servicesData.map((service) => ({
        slug: service.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const service = servicesData.find((s) => s.slug === slug);
    if (!service) return { title: 'Service Not Found | Infygru' };

    return {
        title: `${service.title} | Enterprise ${service.title} Services in India | Infygru`,
        description: service.longDescription || service.description,
        keywords: service.seoKeywords || [service.title, "Chennai", "India", "enterprise"],
        alternates: { canonical: `https://infygru.com/services/${slug}` },
        openGraph: {
            title: `${service.title} Services | Infygru`,
            description: service.description,
            url: `https://infygru.com/services/${slug}`,
            images: [{ url: "https://infygru.com/og-image.png", width: 1200, height: 630 }],
        },
        twitter: {
            card: "summary_large_image",
            title: `${service.title} | Infygru`,
            description: service.description,
        },
    };
}

const accentColors: Record<string, { badge: string; icon: string; dot: string; cta: string }> = {
    'web-development':        { badge: 'bg-teal-500/10 border-teal-400/20 text-teal-300', icon: 'text-teal-400', dot: 'bg-teal-400', cta: 'from-teal-900/40' },
    'n8n-automation':         { badge: 'bg-orange-500/10 border-orange-400/20 text-orange-300', icon: 'text-orange-400', dot: 'bg-orange-400', cta: 'from-orange-900/30' },
    'cloud-migration':        { badge: 'bg-green-500/10 border-green-400/20 text-green-300', icon: 'text-green-400', dot: 'bg-green-400', cta: 'from-green-900/30' },
    'data-analytics':         { badge: 'bg-purple-500/10 border-purple-400/20 text-purple-300', icon: 'text-purple-400', dot: 'bg-purple-400', cta: 'from-purple-900/30' },
    'security-operations':    { badge: 'bg-slate-500/10 border-slate-400/20 text-slate-300', icon: 'text-slate-300', dot: 'bg-slate-400', cta: 'from-slate-800/50' },
    'devops':                 { badge: 'bg-teal-500/10 border-teal-400/20 text-teal-300', icon: 'text-teal-400', dot: 'bg-teal-400', cta: 'from-teal-900/40' },
    'servicenow':             { badge: 'bg-orange-500/10 border-orange-400/20 text-orange-300', icon: 'text-orange-400', dot: 'bg-orange-400', cta: 'from-orange-900/30' },
    'ai-computer-vision':     { badge: 'bg-violet-500/10 border-violet-400/20 text-violet-300', icon: 'text-violet-400', dot: 'bg-violet-400', cta: 'from-violet-900/30' },
    'business-registration':  { badge: 'bg-amber-500/10 border-amber-400/20 text-amber-300', icon: 'text-amber-400', dot: 'bg-amber-400', cta: 'from-amber-900/30' },
    'compliance-taxation':    { badge: 'bg-green-500/10 border-green-400/20 text-green-300', icon: 'text-green-400', dot: 'bg-green-400', cta: 'from-green-900/30' },
    'digital-transformation': { badge: 'bg-amber-500/10 border-amber-400/20 text-amber-300', icon: 'text-amber-400', dot: 'bg-amber-400', cta: 'from-amber-900/30' },
};

const defaultAccent = { badge: 'bg-amber-500/10 border-amber-400/20 text-amber-300', icon: 'text-amber-400', dot: 'bg-amber-400', cta: 'from-amber-900/30' };

const processSteps = [
    { step: "01", title: "Discovery Call", desc: "We deep-dive into your goals, current stack, and pain points to map out the ideal solution." },
    { step: "02", title: "Solution Design", desc: "Our architects craft a tailored blueprint with timelines, tech stack, and clear milestones." },
    { step: "03", title: "Agile Delivery", desc: "We sprint in 2-week cycles with regular check-ins, ensuring full visibility and fast iteration." },
    { step: "04", title: "Launch & Support", desc: "Go-live with zero downtime. Post-launch, we provide dedicated support and continuous optimization." },
];

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = servicesData.find((s) => s.slug === slug);

    if (!service) {
        notFound();
    }

    const accent = accentColors[slug] || defaultAccent;
    const relatedServices = servicesData.filter(s => s.slug !== slug).slice(0, 3);

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${BASE_URL}/services/${slug}#service`,
        name: service.title,
        description: service.description,
        url: `${BASE_URL}/services/${slug}`,
        provider: {
            "@id": `${BASE_URL}/#organization`,
        },
        areaServed: {
            "@type": "Country",
            name: "India",
        },
        hasOfferCatalog: service.features.length > 0
            ? {
                "@type": "OfferCatalog",
                name: `${service.title} Features`,
                itemListElement: service.features.map((feature, i) => ({
                    "@type": "Offer",
                    position: i + 1,
                    itemOffered: { "@type": "Service", name: feature },
                })),
            }
            : undefined,
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
            { "@type": "ListItem", position: 2, name: "Offerings", item: `${BASE_URL}/offerings` },
            { "@type": "ListItem", position: 3, name: service.title, item: `${BASE_URL}/services/${slug}` },
        ],
    };

    return (
        <div className="min-h-screen bg-white">
            <JsonLd data={serviceSchema} />
            <JsonLd data={breadcrumbSchema} />

            {/* ── Compact Hero ── */}
            <section className="relative py-14 bg-slate-950 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:3rem_3rem]" />
                <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-amber-500/8 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-4 max-w-5xl relative z-10">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6">
                        <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href="/offerings" className="hover:text-slate-300 transition-colors">Offerings</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-slate-300">{service.title}</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-8">
                        <div className="flex-1">
                            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest mb-5 ${accent.badge}`}>
                                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${accent.dot}`} />
                                Enterprise Service
                            </span>
                            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
                                {service.title}
                            </h1>
                            <p className="text-slate-400 text-base md:text-lg leading-relaxed font-light max-w-xl">
                                {service.description}
                            </p>
                        </div>

                        {/* Quick metrics */}
                        <div className="flex md:flex-col gap-3 shrink-0">
                            {[
                                { icon: <Zap className="w-4 h-4" />, label: "30-Day Launch", sub: "Fast delivery" },
                                { icon: <Activity className="w-4 h-4" />, label: "99.9% SLA", sub: "Uptime guaranteed" },
                                { icon: <ShieldCheck className="w-4 h-4" />, label: "ISO Secured", sub: "Enterprise-grade" },
                            ].map((m) => (
                                <div key={m.label} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 min-w-[180px]">
                                    <div className={`${accent.icon}`}>{m.icon}</div>
                                    <div>
                                        <div className="text-white text-sm font-bold">{m.label}</div>
                                        <div className="text-slate-500 text-xs">{m.sub}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Back link */}
                    <div className="mt-8">
                        <Link href="/offerings" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest">
                            <ArrowLeft className="w-3.5 h-3.5" />
                            All Offerings
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Content ── */}
            <div className="container mx-auto px-4 max-w-5xl py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main content */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Overview */}
                        <div>
                            <h2 className="font-heading text-2xl font-extrabold text-slate-900 mb-5 tracking-tight">Service Overview</h2>
                            <div className="space-y-4 text-slate-600 leading-relaxed">
                                <p className="font-medium text-slate-800">{service.longDescription}</p>
                                <p>
                                    In today&rsquo;s competitive digital landscape, settling for subpar implementations is not an option. Our {service.title} offering is meticulously engineered to overhaul your existing operational paradigms, scale under massive loads, and systematically eradicate technical debt.
                                </p>
                                <p>
                                    The Infygru advantage guarantees that your specific implementation will bypass typical industry pitfalls — launching with exceptional speed (in as little as 30 days) and uncompromising structural integrity.
                                </p>
                            </div>
                        </div>

                        {/* Core Capabilities */}
                        <div>
                            <h2 className="font-heading text-2xl font-extrabold text-slate-900 mb-6 tracking-tight">Core Capabilities</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {service.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-200 hover:bg-amber-50/30 transition-all group">
                                        <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-amber-200 transition-colors">
                                            <CheckCircle2 className="w-4 h-4 text-amber-600" />
                                        </div>
                                        <div>
                                            <span className="text-slate-900 font-bold text-sm block mb-0.5">{feature}</span>
                                            <span className="text-slate-500 text-xs leading-relaxed">Architected and maintained for absolute operational synergy.</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Process Steps */}
                        <div>
                            <h2 className="font-heading text-2xl font-extrabold text-slate-900 mb-6 tracking-tight">How We Work</h2>
                            <div className="relative">
                                {/* Vertical line */}
                                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-200" />
                                <div className="space-y-6">
                                    {processSteps.map((step, i) => (
                                        <div key={i} className="flex gap-6 relative">
                                            <div className="w-10 h-10 rounded-full bg-slate-950 text-white flex items-center justify-center text-xs font-black shrink-0 z-10 border-2 border-white shadow-md">
                                                {step.step}
                                            </div>
                                            <div className="pt-1.5">
                                                <h3 className="font-heading text-base font-bold text-slate-900 mb-1">{step.title}</h3>
                                                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Benefits */}
                        {service.benefits && (
                            <div className="bg-slate-950 rounded-2xl p-6 text-white">
                                <h3 className="font-heading text-base font-bold mb-5 flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-amber-400" />
                                    Key Benefits
                                </h3>
                                <ul className="space-y-3">
                                    {service.benefits.map((b: string, i: number) => (
                                        <li key={i} className="flex items-center gap-2.5 text-sm text-slate-300">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* CTA Card */}
                        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                            <h3 className="font-heading text-base font-bold text-slate-900 mb-2">Ready to get started?</h3>
                            <p className="text-slate-600 text-sm mb-5 leading-relaxed">
                                Our enterprise architects are ready to design a custom blueprint for your business.
                            </p>
                            <a href="https://wa.me/918300290019" target="_blank" rel="noopener noreferrer">
                                <Button size="sm" className="w-full font-bold bg-amber-500 hover:bg-amber-400 text-white rounded-xl shadow-md hover:-translate-y-0.5 transition-all">
                                    Schedule Free Consultation <ArrowRight className="ml-1.5 w-4 h-4" />
                                </Button>
                            </a>
                        </div>

                        {/* Related Services */}
                        <div>
                            <h3 className="font-heading text-sm font-bold text-slate-900 mb-4 uppercase tracking-widest">You Might Also Need</h3>
                            <div className="space-y-2.5">
                                {relatedServices.map((s) => (
                                    <Link key={s.slug} href={`/services/${s.slug}`} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-amber-200 hover:bg-amber-50 transition-all group">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                                        <span className="text-sm font-medium text-slate-700 group-hover:text-amber-700 transition-colors">{s.title}</span>
                                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-500 ml-auto transition-colors" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── CTA Band ── */}
            <section className="py-16 bg-slate-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
                <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
                    <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
                        Deploy {service.title} Today
                    </h2>
                    <p className="text-slate-400 mb-8 font-light max-w-xl mx-auto">
                        Our enterprise architects are ready to design a custom blueprint mapped exactly to your operational goals. Schedule a deep-dive consultation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a href="https://wa.me/918300290019" target="_blank" rel="noopener noreferrer">
                            <Button size="lg" className="font-heading font-extrabold h-13 px-8 text-base shadow-xl hover:-translate-y-1 transition-transform bg-amber-500 hover:bg-amber-400 text-white rounded-xl">
                                Consult With An Expert <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </a>
                        <Link href="/offerings">
                            <Button size="lg" variant="outline" className="font-heading font-bold h-13 px-8 text-base border-white/20 text-white hover:bg-white/10 rounded-xl">
                                View All Services
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
