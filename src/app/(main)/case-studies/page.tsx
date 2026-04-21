import Link from "next/link";
import { ArrowRight, TrendingUp, Clock, CheckCircle2, ChevronRight, Building2, Code, Cloud, Bot } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/JsonLd";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import type { Metadata } from "next";

const BASE_URL = "https://infygru.com";

export const metadata: Metadata = {
    title: "Case Studies | Real Results from Enterprise IT & Business Services | Infygru",
    description: "See how Infygru helped businesses across India with web development, cloud migration, n8n automation, business registration, and GST compliance. Real projects, real outcomes.",
    keywords: [
        "IT case studies India",
        "web development case study Chennai",
        "cloud migration success story India",
        "n8n automation results",
        "business registration success India",
        "digital transformation case study",
        "IT company portfolio Chennai",
    ],
    alternates: { canonical: `${BASE_URL}/case-studies` },
    openGraph: {
        title: "Case Studies | Real IT & Business Service Results | Infygru",
        description: "Explore how Infygru delivered measurable outcomes for clients across web development, cloud, automation, and compliance services.",
        url: `${BASE_URL}/case-studies`,
        images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Case Studies | Infygru",
        description: "Real results from Chennai's leading IT and business services company.",
    },
};

const caseStudies = [
    {
        id: "healthtech-web-platform",
        client: "Healthcare Platform (Chennai)",
        industry: "Healthcare Technology",
        service: "Web Development",
        serviceSlug: "web-development",
        icon: <Code className="w-6 h-6" />,
        color: "text-teal-600 bg-teal-50 border-teal-200",
        challenge: "A Chennai-based healthtech startup needed to replace their WordPress site with a high-performance platform capable of handling 50,000+ monthly users, HIPAA-aligned data handling, and integration with their in-house patient management API.",
        solution: "Infygru built a Next.js application with server-side rendering, Directus CMS for content management, PostgreSQL backend, and a custom API layer with JWT authentication. We implemented a Lighthouse-optimized frontend with Core Web Vitals scores above 90 across all metrics.",
        results: [
            { metric: "Page Load Speed", before: "8.2s", after: "1.1s", change: "87% faster" },
            { metric: "Organic Traffic", before: "4,200/mo", after: "18,600/mo", change: "+342%" },
            { metric: "Lead Conversions", before: "1.2%", after: "4.8%", change: "+300%" },
            { metric: "Time to Deploy", before: "N/A", after: "28 days", change: "On budget" },
        ],
        testimonial: "Infygru modernized our legacy systems in under 30 days. The new platform runs flawlessly under our peak load and our Google ranking improved dramatically within 3 months.",
        testimonialAuthor: "Operations Lead, Healthcare Platform",
        duration: "28 days",
        tags: ["Next.js", "Directus CMS", "PostgreSQL", "Technical SEO"],
    },
    {
        id: "ecommerce-n8n-automation",
        client: "E-commerce Brand (Bangalore)",
        industry: "Retail & E-commerce",
        service: "n8n Automation",
        serviceSlug: "n8n-automation",
        icon: <Bot className="w-6 h-6" />,
        color: "text-orange-600 bg-orange-50 border-orange-200",
        challenge: "A Bangalore e-commerce company was losing 80+ hours per month to manual order processing, inventory sync between Shopify and their ERP, and customer support ticket routing.",
        solution: "Infygru deployed a self-hosted n8n instance on their AWS infrastructure and built 14 automated workflows: order-to-ERP sync, low-inventory alerts, customer WhatsApp notifications, support ticket auto-classification with OpenAI, and monthly GST report generation.",
        results: [
            { metric: "Manual Hours Saved", before: "80+ hrs/mo", after: "< 5 hrs/mo", change: "94% reduction" },
            { metric: "Order Processing Time", before: "4 hours", after: "12 minutes", change: "95% faster" },
            { metric: "Support Response Time", before: "8 hours", after: "45 minutes", change: "91% faster" },
            { metric: "Annual Cost Savings", before: "—", after: "₹14.4 lakh", change: "ROI in 60 days" },
        ],
        testimonial: "The n8n automation Infygru built has transformed how we operate. What used to require two full-time staff is now handled automatically, and accuracy has actually improved.",
        testimonialAuthor: "Founder, E-commerce Brand",
        duration: "21 days",
        tags: ["n8n", "Shopify", "WhatsApp API", "OpenAI", "AWS"],
    },
    {
        id: "manufacturing-cloud-migration",
        client: "Manufacturing Company (Chennai)",
        industry: "Manufacturing & Engineering",
        service: "Cloud Migration",
        serviceSlug: "cloud-migration",
        icon: <Cloud className="w-6 h-6" />,
        color: "text-green-600 bg-green-50 border-green-200",
        challenge: "A Chennai manufacturing company was running their ERP and production planning software on aging on-premise servers with frequent downtime, no disaster recovery, and ₹12 lakh annual hardware maintenance costs.",
        solution: "Infygru executed a phased migration to AWS: servers migrated to EC2 instances with auto-scaling, databases moved to Amazon RDS with Multi-AZ failover, and a VPN-secured network established for remote factory access. We implemented CloudWatch monitoring with automated alerting and a daily backup regimen with 30-day retention.",
        results: [
            { metric: "Annual IT Costs", before: "₹18.4L/year", after: "₹7.2L/year", change: "61% reduction" },
            { metric: "System Uptime", before: "94.2%", after: "99.95%", change: "+5.75% SLA" },
            { metric: "Disaster Recovery RTO", before: "72 hours", after: "4 hours", change: "94% improvement" },
            { metric: "Migration Downtime", before: "—", after: "0 hours", change: "Zero disruption" },
        ],
        testimonial: "We were skeptical about moving to the cloud given our production dependencies, but Infygru's migration was flawless. Zero downtime, and we're now saving over ₹11 lakh annually.",
        testimonialAuthor: "IT Manager, Manufacturing Company",
        duration: "35 days",
        tags: ["AWS EC2", "Amazon RDS", "CloudWatch", "VPN", "Zero Downtime"],
    },
    {
        id: "startup-business-registration",
        client: "Food Tech Startup (Mumbai)",
        industry: "Food & Beverage",
        service: "Business Registration",
        serviceSlug: "business-registration",
        icon: <Building2 className="w-6 h-6" />,
        color: "text-amber-600 bg-amber-50 border-amber-200",
        challenge: "A Mumbai-based food delivery startup needed to incorporate as a Private Limited Company, register for GST, obtain their FSSAI Food License, and trademark their brand name — all within 30 days of their planned launch.",
        solution: "Infygru's compliance team handled all four registrations in parallel: SPICe+ filing for company incorporation, GST registration, FSSAI Basic License application, and Trademark Class 43 filing. We prepared all documentation, coordinated with government portals daily, and tracked each application status proactively.",
        results: [
            { metric: "Company Incorporation", before: "Pending", after: "Completed", change: "6 working days" },
            { metric: "GST Registration", before: "Pending", after: "Approved", change: "4 working days" },
            { metric: "FSSAI License", before: "Pending", after: "Issued", change: "12 working days" },
            { metric: "Trademark Application", before: "Pending", after: "Filed + Acknowledged", change: "3 working days" },
        ],
        testimonial: "We were overwhelmed by the paperwork before finding Infygru. They handled everything and we were fully compliant and legally ready to launch 3 days ahead of schedule.",
        testimonialAuthor: "Co-Founder, Food Tech Startup",
        duration: "18 days total",
        tags: ["Company Incorporation", "GST Registration", "FSSAI License", "Trademark"],
    },
];

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Case Studies", item: `${BASE_URL}/case-studies` },
    ],
};

const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Infygru Case Studies",
    description: "Real client success stories from Infygru's IT and business services engagements",
    url: `${BASE_URL}/case-studies`,
    numberOfItems: caseStudies.length,
    itemListElement: caseStudies.map((cs, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${cs.service} Case Study: ${cs.client}`,
        url: `${BASE_URL}/case-studies#${cs.id}`,
    })),
};

export default function CaseStudies() {
    return (
        <div className="min-h-screen bg-white">
            <JsonLd data={breadcrumbSchema} />
            <JsonLd data={itemListSchema} />

            {/* Hero */}
            <section className="relative py-14 bg-slate-950 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:3rem_3rem]" />
                <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-amber-500/8 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-4 max-w-5xl relative z-10">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6">
                        <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-slate-300">Case Studies</span>
                    </div>

                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        Proven Results
                    </span>
                    <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
                        Client Case Studies
                    </h1>
                    <p className="text-slate-400 text-base md:text-lg font-light max-w-2xl">
                        Real projects. Real outcomes. See how Infygru delivered measurable results for businesses across India in web development, cloud migration, automation, and business compliance.
                    </p>
                </div>
            </section>

            {/* Stats Bar */}
            <div className="bg-slate-50 border-b border-slate-200">
                <div className="container mx-auto px-4 max-w-5xl py-5">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        {[
                            { value: "300+", label: "Projects Delivered" },
                            { value: "99%", label: "Client Retention" },
                            { value: "30 days", label: "Avg. Delivery" },
                            { value: "₹2Cr+", label: "Client Savings Generated" },
                        ].map((s) => (
                            <div key={s.label}>
                                <div className="font-heading text-2xl font-extrabold text-slate-900">{s.value}</div>
                                <div className="text-xs text-slate-500 font-medium uppercase tracking-wide mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Case Studies */}
            <div className="container mx-auto px-4 max-w-5xl py-16 space-y-20">
                {caseStudies.map((cs, idx) => (
                    <article key={cs.id} id={cs.id} className="scroll-mt-20">
                        {/* Case study header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                            <div>
                                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold mb-3 ${cs.color}`}>
                                    {cs.icon}
                                    {cs.service}
                                </div>
                                <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                                    {cs.client}
                                </h2>
                                <p className="text-slate-500 text-sm mt-1">{cs.industry} · Completed in {cs.duration}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {cs.tags.map((tag) => (
                                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">{tag}</span>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                            {/* Challenge + Solution */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-heading text-base font-bold text-slate-900 mb-2 uppercase tracking-wide text-xs text-red-600">The Challenge</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">{cs.challenge}</p>
                                </div>
                                <div>
                                    <h3 className="font-heading text-base font-bold text-slate-900 mb-2 uppercase tracking-wide text-xs text-green-600">Our Solution</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">{cs.solution}</p>
                                </div>

                                {/* Testimonial */}
                                <blockquote className="border-l-4 border-amber-400 pl-4 py-2 bg-amber-50/50 rounded-r-xl">
                                    <p className="text-slate-700 text-sm italic leading-relaxed">&ldquo;{cs.testimonial}&rdquo;</p>
                                    <footer className="text-xs text-slate-500 font-bold mt-2">— {cs.testimonialAuthor}</footer>
                                </blockquote>
                            </div>

                            {/* Results */}
                            <div>
                                <h3 className="font-heading text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-green-500" />
                                    Measurable Results
                                </h3>
                                <div className="space-y-3">
                                    {cs.results.map((r, i) => (
                                        <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between">
                                            <div>
                                                <div className="text-xs text-slate-500 font-medium">{r.metric}</div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    {r.before !== "—" && (
                                                        <>
                                                            <span className="text-sm text-slate-400 line-through">{r.before}</span>
                                                            <ArrowRight className="w-3 h-3 text-slate-300" />
                                                        </>
                                                    )}
                                                    <span className="text-sm font-bold text-slate-900">{r.after}</span>
                                                </div>
                                            </div>
                                            <span className="text-xs font-extrabold text-green-600 bg-green-50 border border-green-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                                                {r.change}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link href={`/services/${cs.serviceSlug}`}>
                                <Button variant="outline" size="sm" className="font-bold border-slate-200 text-slate-700 hover:border-amber-300 hover:bg-amber-50">
                                    Learn about {cs.service} <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                                </Button>
                            </Link>
                            <WhatsAppCTA
                                service={cs.service}
                                label="Get similar results →"
                                className="text-sm font-medium text-amber-600 hover:text-amber-500 transition-colors"
                            />
                        </div>

                        {idx < caseStudies.length - 1 && (
                            <div className="mt-16 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                        )}
                    </article>
                ))}
            </div>

            {/* Bottom CTA */}
            <section className="py-16 bg-slate-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]" />
                <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
                    <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
                        Ready to Create Your Success Story?
                    </h2>
                    <p className="text-slate-400 mb-8 font-light max-w-xl mx-auto">
                        Join 300+ businesses across India that have scaled with Infygru. Schedule a free discovery call today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <WhatsAppCTA
                            service="Free Discovery Consultation"
                            label="Schedule Free Consultation"
                            className="inline-flex items-center gap-2 font-heading font-extrabold px-8 py-4 text-base shadow-xl hover:-translate-y-1 transition-transform bg-amber-500 hover:bg-amber-400 text-white rounded-xl"
                        />
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
