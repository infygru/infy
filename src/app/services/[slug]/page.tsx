import { servicesData } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ArrowLeft, ArrowRight, ShieldCheck, Zap, Activity } from "lucide-react";

export function generateStaticParams() {
    return servicesData.map((service) => ({
        slug: service.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = servicesData.find((s) => s.slug === slug);
    if (!service) return { title: 'Service Not Found | Infygru' };

    return {
        title: `${service.title} Services | Enterprise IT Solutions | Infygru`,
        description: service.longDescription || service.description,
        keywords: service.seoKeywords?.join(", ") || "",
    };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = servicesData.find((s) => s.slug === slug);

    if (!service) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background pb-32 relative">
            {/* Subtle top ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

            {/* Clean Light Hero Section */}
            <div className="relative z-10 pt-28 pb-16 lg:pt-36 text-center">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="mb-8">
                        <Link href="/offerings" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center text-sm font-bold uppercase tracking-widest bg-secondary/50 px-4 py-2 rounded-full">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            All Services
                        </Link>
                    </div>

                    <div className="flex flex-col items-center gap-8">
                        <div className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-3xl shadow-sm border border-border flex items-center justify-center transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                            <Zap className="w-10 h-10 md:w-14 md:h-14 text-primary" />
                        </div>

                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-foreground">
                                {service.title}
                            </h1>
                            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                                {service.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Deep Dive Content Container */}
            <div className="container mx-auto px-4 mt-8 max-w-5xl relative z-10">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-2xl border border-border">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-20">
                        <div className="md:col-span-2 space-y-6 text-lg text-foreground/80 leading-relaxed font-light">
                            <h2 className="text-3xl font-extrabold text-foreground mb-8 tracking-tight">Service Overview</h2>
                            <p className="font-medium text-foreground">
                                {service.longDescription}
                            </p>
                            <p>
                                In today's aggressively competitive digital landscape, settling for subpar implementations is not an option. Our {service.title} offering is meticulously engineered to overhaul your existing operational paradigms, scale gracefully under massive loads, and systematically eradicate technical debt.
                            </p>
                            <p>
                                We do not just hand over the keys and walk away. Our methodology involves continuous architectural oversight, rigorously tested CI/CD pipelines, and deep-dive technical reviews. Utilizing cutting edge tech stacks, we empower your IT framework to become a revenue-generating vehicle rather than a cost center.
                            </p>
                            <p>
                                The Infygru advantage guarantees that your specific implementation of {service.title} will bypass typical industry pitfalls, launching with exceptional speed (in as little as 30 days) and uncompromising structural integrity.
                            </p>

                            {/* SEO targeted hidden block or semantic structure */}
                            <h3 className="sr-only">Why choose our {service.title} solutions in Chennai?</h3>
                        </div>

                        <div className="bg-secondary/20 p-8 rounded-3xl border border-border/50 self-start">
                            <h3 className="font-extrabold text-xl text-foreground mb-8">Enterprise Metrics</h3>
                            <ul className="space-y-8">
                                <li>
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-border/50 flex items-center justify-center shrink-0">
                                            <Activity className="text-primary w-5 h-5" />
                                        </div>
                                        <span className="font-bold text-foreground">99.99% Uptime</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground ml-14">SLA guaranteed reliability</p>
                                </li>
                                <li>
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-border/50 flex items-center justify-center shrink-0">
                                            <Zap className="text-accent w-5 h-5" />
                                        </div>
                                        <span className="font-bold text-foreground">30-Day Launch</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground ml-14">Lightning implementation</p>
                                </li>
                                <li>
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-border/50 flex items-center justify-center shrink-0">
                                            <ShieldCheck className="text-primary w-5 h-5" />
                                        </div>
                                        <span className="font-bold text-foreground">ISO Secured</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground ml-14">Enterprise-grade security</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mb-20">
                        <h2 className="text-3xl font-extrabold mb-10 text-foreground tracking-tight">Core Capabilities</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                            {service.features.map((feature, idx) => (
                                <div key={idx} className="flex items-start">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 mr-5">
                                        <CheckCircle2 className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <span className="text-foreground font-bold text-xl block mb-2">{feature}</span>
                                        <span className="text-muted-foreground text-base leading-relaxed font-light">We architect, deploy, and meticulously maintain this capability to ensure absolute operational synergy across your organization.</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-primary/10 via-white to-accent/5 rounded-[2rem] p-10 md:p-14 text-center border border-primary/10 relative overflow-hidden shadow-sm">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

                        <h3 className="text-3xl md:text-4xl font-extrabold mb-6 text-foreground relative z-10 tracking-tight">Deploy {service.title} Today</h3>
                        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto relative z-10 font-light">
                            Our enterprise architects are ready to design a custom blueprint mapped exactly to your operational metrics. Schedule a deep-dive technical consultation.
                        </p>
                        <Link href="https://wa.me/919445675619" className="relative z-10 inline-block">
                            <Button size="lg" className="font-extrabold h-16 px-10 text-lg shadow-xl hover:-translate-y-1 transition-transform bg-foreground text-background hover:bg-foreground/90 rounded-2xl">
                                Consult With An Expert <ArrowRight className="ml-3 w-6 h-6" />
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
