import { CheckCircle2, Users, Trophy, Target, Globe, Server, Code, Zap, Shield, Bot } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Infygru | Web Development & Company Registration Company — Chennai, India",
    description: "Infygru is a Chennai-based IT company delivering custom web development (Next.js), company registration, GST filing, n8n automation, cloud migration, and DevOps for startups and enterprises across India.",
    keywords: [
        "about Infygru",
        "web development company Chennai",
        "IT company Chennai India",
        "company registration services Chennai",
        "enterprise web development company India",
        "n8n automation experts India",
        "cloud migration company Chennai",
        "digital transformation consulting India",
        "top IT company Chennai",
    ],
    alternates: { canonical: "https://infygru.com/about" },
    openGraph: {
        title: "About Infygru | Web Development & Company Registration — Chennai",
        description: "Chennai-based IT company offering custom web development, company registration, GST filing, cloud migration & n8n automation. Trusted by 300+ businesses across India.",
        url: "https://infygru.com/about",
        images: [{ url: "https://infygru.com/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "About Infygru | Web Dev & Company Registration — Chennai",
        description: "Chennai's IT company for web development, company registration, GST, cloud & automation. 300+ projects delivered.",
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "Where is Infygru located?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "We are headquartered in Chennai, India, but we serve enterprise clients globally across different timezones.",
            },
        },
        {
            "@type": "Question",
            name: "What industries do you work with?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "We work with a wide range of industries including finance, healthcare, e-commerce, and manufacturing, providing tailored digital transformation solutions.",
            },
        },
        {
            "@type": "Question",
            name: "Do you provide ongoing support after project completion?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, we offer continuous support and maintenance SLAs to ensure your systems run smoothly with 99.9% uptime.",
            },
        },
    ],
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://infygru.com" },
        { "@type": "ListItem", position: 2, name: "About", item: "https://infygru.com/about" },
    ],
};

export default function About() {
    return (
        <div className="min-h-screen bg-background pb-32 relative font-sans">
            <JsonLd data={faqSchema} />
            <JsonLd data={breadcrumbSchema} />
            {/* Subtle top ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

            {/* Hero Section */}
            <section className="pt-28 pb-16 lg:pt-36 relative z-10 text-center">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-bold text-sm tracking-wide font-heading uppercase">
                        Our DNA
                    </div>
                    <h1 className="font-heading text-5xl md:text-6xl font-extrabold mb-8 text-foreground tracking-tight">Architects of Innovation.</h1>
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-light">
                        Infygru is a leading technology consultancy headquartered in Chennai, dedicated to empowering global enterprises through world-class digital transformation and hyper-automation.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 relative z-10">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div className="space-y-8 text-foreground/80 text-lg leading-relaxed font-light">
                            <h2 className="font-heading text-3xl lg:text-4xl font-extrabold text-foreground mb-8 tracking-tight leading-tight">Driven By Engineering.<br />Built For Absolute Scale.</h2>
                            <p>
                                Founded on the belief that software should be a seamless business accelerator, Infygru has grown into a trusted technology partner for industry leaders worldwide. From aggressive tech-stack modernization to deep workflow orchestration across <strong className="font-bold text-foreground">n8n</strong> and ServiceNow, we deliver.
                            </p>
                            <p>
                                Our core philosophy is <strong className="font-bold text-primary">"lightning implementation"</strong>—allowing our partners to go live with enterprise-grade web applications and high-availability cloud infrastructure in under 30 days. We don't just write code; we architect highly resilient digital ecosystems that can withstand mass concurrent traffic.
                            </p>
                            <div className="pt-4 border-t border-border mt-8">
                                <p className="text-foreground/90 font-medium">Headquartered in the technological hub of Chennai, India, our elite engineering talent collaborates seamlessly across timezones with a distinguished global clientele.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10" />
                            {[
                                { icon: <Code className="w-8 h-8 text-primary" />, title: "300+", desc: "Digital Deliveries" },
                                { icon: <Server className="w-8 h-8 text-accent" />, title: "99.9%", desc: "Cloud Uptime" },
                                { icon: <Target className="w-8 h-8 text-primary" />, title: "99%", desc: "Client Retention" },
                                { icon: <Globe className="w-8 h-8 text-accent" />, title: "24/7", desc: "Global Operations" }
                            ].map((stat, idx) => (
                                <div key={idx} className="bg-white/80 backdrop-blur-sm p-8 rounded-[2rem] border border-white/50 shadow-xl text-center group hover:-translate-y-2 transition-transform duration-300">
                                    <div className="flex justify-center mb-6 w-16 h-16 mx-auto bg-background rounded-2xl items-center shadow-inner border border-border group-hover:scale-110 transition-transform">
                                        {stat.icon}
                                    </div>
                                    <h3 className="font-heading text-4xl font-extrabold text-foreground mb-2">{stat.title}</h3>
                                    <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">{stat.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Corporate Strategy Section */}
            <section className="py-24 relative z-10 bg-slate-50 border-y border-slate-100 mt-16">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-20">
                        <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">Our Core Values</h2>
                        <p className="mt-6 text-xl text-slate-500 font-light max-w-2xl mx-auto">The fundamental engineering principles driving our architectural excellence and client success metrics.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
                        <div className="p-12 bg-white rounded-[2.5rem] shadow-xl border border-slate-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 transition-opacity">
                                <Shield className="w-24 h-24 text-primary" />
                            </div>
                            <h3 className="font-heading text-2xl font-bold text-foreground mb-6 relative z-10">Uncompromising Security</h3>
                            <p className="text-slate-500 leading-relaxed font-light relative z-10 text-lg">Every line of code and every pixel is meticulously crafted to meet the highest industry standards of performance data privacy, and ISO-grade security protocols.</p>
                        </div>

                        <div className="p-12 bg-white rounded-[2.5rem] shadow-xl border border-slate-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 transition-opacity">
                                <Zap className="w-24 h-24 text-accent" />
                            </div>
                            <h3 className="font-heading text-2xl font-bold text-foreground mb-6 relative z-10">Radical Transparency</h3>
                            <p className="text-slate-500 leading-relaxed font-light relative z-10 text-lg">We believe in transparent engineering: clear GitHub comms, realistic agile timelines, and transparent pricing structures—absolutely zero hidden enterprise fees.</p>
                        </div>

                        <div className="p-12 bg-white rounded-[2.5rem] shadow-xl border border-slate-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 transition-opacity">
                                <Bot className="w-24 h-24 text-primary" />
                            </div>
                            <h3 className="font-heading text-2xl font-bold text-foreground mb-6 relative z-10">Continuous Innovation</h3>
                            <p className="text-slate-500 leading-relaxed font-light relative z-10 text-lg">We aggressively stay ahead of the technology curve, constantly deploying emerging paradigms like AI Computer Vision, LLM-integrations, and advanced RPA.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 relative z-10 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="font-heading text-4xl font-extrabold text-foreground tracking-tight">Frequently Asked Questions</h2>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <h3 className="text-xl font-bold text-foreground mb-3">Where is Infygru located?</h3>
                            <p className="text-muted-foreground font-light">We are headquartered in Chennai, India, but we serve enterprise clients globally across different timezones.</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <h3 className="text-xl font-bold text-foreground mb-3">What industries do you work with?</h3>
                            <p className="text-muted-foreground font-light">We work with a wide range of industries including finance, healthcare, e-commerce, and manufacturing, providing tailored digital transformation solutions.</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <h3 className="text-xl font-bold text-foreground mb-3">Do you provide ongoing support after project completion?</h3>
                            <p className="text-muted-foreground font-light">Yes, we offer continuous support and maintenance SLAs to ensure your systems run smoothly with 99.9% uptime.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEO Bottom Footer Block */}
            <section className="py-24 relative z-10 text-center">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="font-heading text-2xl font-extrabold text-foreground mb-4">Partner with Chennai's IT Experts</h2>
                    <p className="text-muted-foreground font-light leading-relaxed">
                        From seamless web application development to deeply integrated automation pipelines, Infygru stands as a beacon of global IT excellence, engineered locally in Chennai, TN.
                    </p>
                </div>
            </section>
        </div>
    );
}
