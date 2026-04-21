import Link from "next/link";
import { Check, ArrowRight, Zap, Users, Building2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/JsonLd";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import type { Metadata } from "next";

const BASE_URL = "https://infygru.com";

const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}/pricing#webpage`,
    name: "Infygru Pricing — IT & Business Services",
    url: `${BASE_URL}/pricing`,
    description: "Transparent pricing for enterprise web development, cloud migration, n8n automation, business registration, and compliance services.",
    breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
            { "@type": "ListItem", position: 2, name: "Pricing", item: `${BASE_URL}/pricing` },
        ],
    },
    mainEntity: {
        "@type": "ItemList",
        name: "Service Pricing Plans",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                item: {
                    "@type": "Offer",
                    name: "Starter Web Development Plan",
                    price: "14999",
                    priceCurrency: "INR",
                    description: "Custom website up to 5 pages, basic SEO, mobile-first design, 1 month support.",
                    url: `${BASE_URL}/checkout?plan=starter`,
                    seller: { "@id": `${BASE_URL}/#organization` },
                },
            },
            {
                "@type": "ListItem",
                position: 2,
                item: {
                    "@type": "Offer",
                    name: "Professional Web & Automation Plan",
                    price: "49999",
                    priceCurrency: "INR",
                    description: "Advanced Next.js web app, headless CMS, n8n automation (5 workflows), 3 months support.",
                    url: `${BASE_URL}/checkout?plan=professional`,
                    seller: { "@id": `${BASE_URL}/#organization` },
                },
            },
            {
                "@type": "ListItem",
                position: 3,
                item: {
                    "@type": "Offer",
                    name: "Business Registration Basic",
                    price: "2499",
                    priceCurrency: "INR",
                    description: "Any one registration service — company incorporation, GST, trademark, or MSME.",
                    url: `${BASE_URL}/checkout?plan=biz-basic`,
                    seller: { "@id": `${BASE_URL}/#organization` },
                },
            },
            {
                "@type": "ListItem",
                position: 4,
                item: {
                    "@type": "Offer",
                    name: "Business Registration Growth Bundle",
                    price: "7999",
                    priceCurrency: "INR",
                    description: "Company incorporation + GST registration + MSME + Trademark + DSC.",
                    url: `${BASE_URL}/checkout?plan=biz-growth`,
                    seller: { "@id": `${BASE_URL}/#organization` },
                },
            },
            {
                "@type": "ListItem",
                position: 5,
                item: {
                    "@type": "Offer",
                    name: "Individual ITR Filing",
                    price: "999",
                    priceCurrency: "INR",
                    description: "ITR-1/ITR-2 filing for salaried employees and freelancers, including Form 16 reconciliation.",
                    url: `${BASE_URL}/checkout?plan=tax-individual`,
                    seller: { "@id": `${BASE_URL}/#organization` },
                },
            },
            {
                "@type": "ListItem",
                position: 6,
                item: {
                    "@type": "Offer",
                    name: "Business Compliance & Taxation Plan",
                    price: "4999",
                    priceCurrency: "INR",
                    description: "Business ITR filing, monthly GST returns, TDS filing, annual accounts, dedicated CA support.",
                    url: `${BASE_URL}/checkout?plan=tax-business`,
                    seller: { "@id": `${BASE_URL}/#organization` },
                },
            },
        ],
    },
};

export const metadata: Metadata = {
    title: "Pricing | Web Development, Automation, Cloud & Business Registration Services",
    description: "Transparent, no-hidden-fee pricing for enterprise web development, n8n automation, cloud migration, company registration, GST filing, and compliance services. Starting ₹999.",
    keywords: ["web development pricing Chennai", "n8n automation pricing India", "cloud migration cost", "company registration charges India", "GST filing fee", "IT services pricing India"],
    alternates: { canonical: "https://infygru.com/pricing" },
    openGraph: {
        title: "Pricing | Transparent IT & Business Service Plans | Infygru",
        description: "No hidden fees. Plans starting ₹999 for IT services, cloud, automation, and full business compliance packages.",
        url: "https://infygru.com/pricing",
        images: [{ url: "https://infygru.com/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Infygru Pricing | Transparent IT & Business Plans",
        description: "Web development, automation, cloud & compliance pricing — starting ₹999. No hidden fees.",
    },
};

// ─── Plan types ─────────────────────────────────────────────────────────────
type Plan = {
    name: string;
    badge: string;
    price: string;
    priceNote?: string;
    description: string;
    features: string[];
    popular?: boolean;
    cta: string;
    ctaLink: string;
};

type PricingCategory = {
    id: string;
    label: string;
    title: string;
    subtitle: string;
    color: string;
    accentBg: string;
    accentText: string;
    plans: Plan[];
};

// ─── Data ────────────────────────────────────────────────────────────────────
const categories: PricingCategory[] = [
    {
        id: "it-services",
        label: "IT & Cloud Services",
        title: "Web, Cloud & Automation Pricing",
        subtitle: "Enterprise IT solutions designed to scale — no lock-ins, no hidden charges.",
        color: "border-amber-200",
        accentBg: "bg-amber-50",
        accentText: "text-amber-700",
        plans: [
            {
                name: "Starter",
                badge: "Fast Launch",
                price: "₹14,999",
                priceNote: "/project",
                description: "For emerging businesses needing a professional digital presence fast.",
                features: [
                    "Custom Website (up to 5 pages)",
                    "Basic SEO Setup & Meta Tags",
                    "Mobile-First Responsive Design",
                    "Contact & Lead Capture Form",
                    "SSL Certificate Installation",
                    "1 Month Technical Support",
                ],
                cta: "Place Order",
                ctaLink: "/checkout?plan=starter",
            },
            {
                name: "Professional",
                badge: "Most Popular",
                price: "₹49,999",
                priceNote: "/project",
                description: "For growing businesses needing advanced apps and automation.",
                features: [
                    "Advanced Web App (Next.js / React)",
                    "Headless CMS Integration",
                    "n8n Automation (up to 5 workflows)",
                    "Comprehensive SEO Configuration",
                    "Analytics Dashboard Setup",
                    "Database Architecture Design",
                    "3 Months Priority Support",
                ],
                popular: true,
                cta: "Place Order",
                ctaLink: "/checkout?plan=professional",
            },
            {
                name: "Enterprise",
                badge: "Full Scale",
                price: "Custom",
                description: "Complete digital transformation, cloud infrastructure, and unlimited scale.",
                features: [
                    "Zero-Downtime Cloud Migration (AWS/Azure/GCP)",
                    "Unlimited n8n Automations",
                    "DevOps & CI/CD Pipeline Setup",
                    "AI & Computer Vision Integration",
                    "Custom Security Operations (SOC)",
                    "Dedicated Account Manager",
                    "24/7 SLA-Backed Support",
                    "Custom SaaS Architecture",
                ],
                cta: "Contact Architecture Team",
                ctaLink: "https://wa.me/918300290019",
            },
        ],
    },
    {
        id: "business-registration",
        label: "Business Registration & Licensing",
        title: "Business Registration Pricing",
        subtitle: "End-to-end business registration and compliance — from company incorporation to FSSAI licenses.",
        color: "border-green-200",
        accentBg: "bg-green-50",
        accentText: "text-green-700",
        plans: [
            {
                name: "Basic",
                badge: "Single Service",
                price: "₹2,499",
                priceNote: "/registration",
                description: "For entrepreneurs needing one specific registration completed quickly.",
                features: [
                    "Any One Registration Service",
                    "Document Collection & Verification",
                    "Government Filing & Submission",
                    "Registration Certificate Delivery",
                    "Email Support",
                    "7-Day Turnaround",
                ],
                cta: "Pay & Get Started",
                ctaLink: "/checkout?plan=biz-basic",
            },
            {
                name: "Growth",
                badge: "Most Popular",
                price: "₹7,999",
                priceNote: "/bundle",
                description: "Startup bundle — incorporate your company and get all essential registrations.",
                features: [
                    "Company Incorporation (Pvt. Ltd / LLP / OPC)",
                    "GST Registration & Filing",
                    "MSME / Udyam Registration",
                    "Trademark Search & Registration",
                    "Digital Signature Certificate (DSC)",
                    "Priority Processing",
                    "Dedicated Compliance Expert",
                ],
                popular: true,
                cta: "Pay & Get Started",
                ctaLink: "/checkout?plan=biz-growth",
            },
            {
                name: "Full Compliance",
                badge: "All-In",
                price: "Custom",
                description: "Food businesses, exporters, and ISO-aspirant companies — all registrations handled.",
                features: [
                    "All Growth Plan Services",
                    "FSSAI License (Basic / State / Central)",
                    "Import Export Code (IEC)",
                    "APEDA Registration",
                    "Barcode Registration",
                    "IATF Certification Support",
                    "Ongoing Compliance Retainer",
                    "Dedicated Account Manager",
                ],
                cta: "Contact Our Experts",
                ctaLink: "https://wa.me/918300290019",
            },
        ],
    },
    {
        id: "compliance-taxation",
        label: "Compliance & Taxation",
        title: "Compliance & Taxation Pricing",
        subtitle: "From ITR filing to annual audits — stay legally compliant with zero stress.",
        color: "border-purple-200",
        accentBg: "bg-purple-50",
        accentText: "text-purple-700",
        plans: [
            {
                name: "Individual",
                badge: "Freelancers & Salaried",
                price: "₹999",
                priceNote: "/year",
                description: "Hassle-free ITR filing for salaried employees and freelancers.",
                features: [
                    "ITR-1 / ITR-2 Filing",
                    "Income Tax Computation",
                    "Form 16 & TDS Reconciliation",
                    "Capital Gains Reporting",
                    "Refund Tracking",
                    "Email & WhatsApp Support",
                ],
                cta: "Pay & File Now",
                ctaLink: "/checkout?plan=tax-individual",
            },
            {
                name: "Business",
                badge: "Most Popular",
                price: "₹4,999",
                priceNote: "/year",
                description: "Full compliance for small and medium businesses — GST returns, TDS, and ITR.",
                features: [
                    "Business ITR Filing (ITR-3 / ITR-5 / ITR-6)",
                    "Monthly GST Return Filing (GSTR-1 / GSTR-3B)",
                    "TDS/TCS Return Filing",
                    "Annual Accounts Preparation",
                    "Director KYC & ROC Compliance",
                    "Dedicated CA Support",
                    "Quarterly Review Calls",
                ],
                popular: true,
                cta: "Pay & Get Started",
                ctaLink: "/checkout?plan=tax-business",
            },
            {
                name: "Enterprise Audit",
                badge: "Corporates",
                price: "Custom",
                description: "Full statutory audit, IATF certification, and secretarial compliance for large companies.",
                features: [
                    "Statutory & Internal Auditing",
                    "IATF Certification Consulting",
                    "Transfer Pricing Documentation",
                    "Secretarial Compliance (CS Services)",
                    "Board Meeting Minutes & Reporting",
                    "External Auditor Liaison",
                    "Dedicated Senior CA + CS Team",
                    "Priority Regulatory Update Alerts",
                ],
                cta: "Contact Our CA Team",
                ctaLink: "https://wa.me/918300290019",
            },
        ],
    },
];

// ─── Sub-components ──────────────────────────────────────────────────────────
function PlanCard({ plan, accentBg, accentText }: { plan: Plan; accentBg: string; accentText: string }) {
    return (
        <div className={`relative flex flex-col h-full rounded-2xl border bg-white transition-all duration-300 ${plan.popular
            ? 'border-amber-400 shadow-2xl ring-4 ring-amber-400/10 z-10'
            : 'border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1'
            }`}>
            {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="font-heading bg-amber-500 text-white text-xs font-extrabold uppercase tracking-widest py-1.5 px-6 rounded-full shadow-lg whitespace-nowrap">
                        {plan.badge}
                    </span>
                </div>
            )}

            <div className="p-7 flex-1 flex flex-col">
                {!plan.popular && (
                    <span className={`inline-block text-xs font-bold uppercase tracking-widest ${accentText} ${accentBg} px-3 py-1 rounded-full mb-4 self-start`}>
                        {plan.badge}
                    </span>
                )}
                {plan.popular && <div className="mt-4" />}

                <h3 className="font-heading text-2xl font-extrabold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-none min-h-[50px]">{plan.description}</p>

                <div className="mb-6 pb-6 border-b border-slate-100">
                    <span className="font-heading text-4xl font-extrabold text-slate-900 tracking-tight">{plan.price}</span>
                    {plan.priceNote && <span className="text-slate-400 font-medium text-base ml-2">{plan.priceNote}</span>}
                </div>

                <ul className="space-y-3 flex-1">
                    {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm">
                            <div className={`mt-0.5 rounded-full p-0.5 shrink-0 ${plan.popular ? 'text-amber-600' : 'text-slate-400'}`}>
                                <Check className="w-4 h-4" strokeWidth={2.5} />
                            </div>
                            <span className="text-slate-700 font-medium leading-snug">{feature}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-8">
                    {plan.ctaLink.startsWith("https://wa.me") ? (
                        <WhatsAppCTA
                            service={plan.name}
                            label={plan.cta}
                            className={`w-full font-heading font-bold h-12 rounded-xl flex items-center justify-center gap-2 border transition-all ${plan.popular
                                ? 'bg-amber-500 hover:bg-amber-400 text-white shadow-lg hover:shadow-amber-200 hover:-translate-y-0.5 border-0'
                                : 'border-slate-200 hover:bg-slate-50 text-slate-900'
                                }`}
                        >
                            <span className="flex items-center gap-2 font-heading font-bold text-sm">
                                {plan.cta} <ArrowRight className="w-4 h-4" />
                            </span>
                        </WhatsAppCTA>
                    ) : (
                        <Link href={plan.ctaLink} className="block w-full">
                            <Button
                                variant={plan.popular ? "default" : "outline"}
                                className={`w-full font-heading font-bold h-12 rounded-xl ${plan.popular
                                    ? 'bg-amber-500 hover:bg-amber-400 text-white shadow-lg hover:shadow-amber-200 hover:-translate-y-0.5 transition-all border-0'
                                    : 'border-slate-200 hover:bg-slate-50 text-slate-900'
                                    }`}
                            >
                                {plan.cta} {plan.popular && <ArrowRight className="ml-2 w-4 h-4" />}
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function Pricing() {
    const valueProps = [
        { icon: <Zap className="w-5 h-5" />, label: "No Hidden Fees", desc: "The price you see is the price you pay." },
        { icon: <Users className="w-5 h-5" />, label: "Dedicated Experts", desc: "Assigned account manager from Day 1." },
        { icon: <Building2 className="w-5 h-5" />, label: "Enterprise Ready", desc: "Scales from startups to large corporates." },
    ];

    return (
        <div className="min-h-screen bg-white">
            <JsonLd data={pricingSchema} />
            {/* Hero */}
            <section className="pt-28 pb-14 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:3rem_3rem]" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-400/8 rounded-full blur-[80px]" />
                <div className="container mx-auto px-4 max-w-3xl relative z-10">
                    <span className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-amber-200 bg-amber-50 text-amber-700 font-bold text-xs tracking-widest uppercase font-heading">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        Investment Plans
                    </span>
                    <h1 className="font-heading text-5xl md:text-6xl font-extrabold mb-6 text-slate-900 tracking-tight">
                        Flexible, Transparent Pricing
                    </h1>
                    <p className="text-xl text-slate-500 leading-relaxed font-light max-w-2xl mx-auto">
                        Every plan. Every service. No hidden fees. From a startup's first website to enterprise cloud architecture — we have a plan for you.
                    </p>
                </div>
            </section>

            {/* Value props */}
            <section className="pb-10">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {valueProps.map((v) => (
                            <div key={v.label} className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4">
                                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">{v.icon}</div>
                                <div>
                                    <div className="font-heading font-bold text-slate-900 text-sm">{v.label}</div>
                                    <div className="text-slate-500 text-xs">{v.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Category sections */}
            {categories.map((cat) => (
                <section key={cat.id} id={cat.id} className="py-16 border-t border-slate-100 scroll-mt-20">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="mb-10">
                            <span className={`inline-block text-xs font-extrabold uppercase tracking-widest ${cat.accentText} ${cat.accentBg} px-3 py-1 rounded-full mb-3`}>
                                {cat.label}
                            </span>
                            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">{cat.title}</h2>
                            <p className="text-slate-500 text-base max-w-2xl">{cat.subtitle}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
                            {cat.plans.map((plan) => (
                                <PlanCard key={plan.name} plan={plan} accentBg={cat.accentBg} accentText={cat.accentText} />
                            ))}
                        </div>
                    </div>
                </section>
            ))}

            {/* Custom CTA */}
            <section className="py-16 bg-slate-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-amber-500/10 rounded-full blur-[80px]" />
                <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
                    <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
                        Need a Highly Custom Setup?
                    </h2>
                    <p className="text-slate-400 mb-8 font-light max-w-xl mx-auto">
                        Multi-region cloud deployments, complex automation pipelines, or large-scale company registrations — let's talk custom pricing.
                    </p>
                    <WhatsAppCTA
                        service="Custom Enterprise Solution"
                        label="Talk to Our Solutions Architect"
                        className="inline-flex items-center gap-2 font-heading font-extrabold px-10 py-4 bg-amber-500 hover:bg-amber-400 text-white rounded-xl shadow-xl hover:-translate-y-1 transition-all"
                    />
                </div>
            </section>
        </div>
    );
}
