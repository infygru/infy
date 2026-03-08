"use client";

import Link from "next/link";
import { ArrowRight, Code, Shield, Bot, Workflow, BarChart, Cloud } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { servicesData } from "@/lib/data";
import { motion } from "framer-motion";

export default function Offerings() {
    const iconsMap: Record<string, any> = {
        'digital-transformation': <Workflow className="w-8 h-8 text-primary" />,
        'web-development': <Code className="w-8 h-8 text-accent" />,
        'n8n-automation': <Bot className="w-8 h-8 text-primary" />,
        'cloud-migration': <Cloud className="w-8 h-8 text-accent" />,
        'data-analytics': <BarChart className="w-8 h-8 text-primary" />,
        'security-operations': <Shield className="w-8 h-8 text-accent" />,
    };

    return (
        <div className="min-h-screen bg-background pb-32 relative font-sans">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

            <div className="relative z-10 pt-28 pb-16 lg:pt-36 text-center">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-bold text-sm tracking-wide font-heading uppercase">
                        Enterprise Solutions
                    </div>
                    <h1 className="font-heading text-5xl md:text-6xl font-extrabold mb-8 tracking-tight text-foreground">
                        Our Offerings
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 font-light max-w-2xl mx-auto">
                        Engineered for massive scale and absolute security. Explore our comprehensive suite of global IT architecture and consulting services.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicesData.map((service, idx) => (
                        <motion.div
                            key={service.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <div className="bg-white rounded-3xl p-10 h-full border border-border shadow-sm flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/50 rounded-bl-full transition-transform group-hover:scale-150 z-0" />

                                <div className="relative z-10">
                                    <div className="mb-6 w-16 h-16 rounded-2xl flex items-center justify-center bg-secondary text-primary group-hover:scale-110 transition-transform duration-300">
                                        {iconsMap[service.slug] || <Code className="w-8 h-8 text-primary" />}
                                    </div>
                                    <h3 className="font-heading text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed mb-10 font-light">
                                        {service.description}
                                    </p>
                                </div>

                                <Link href={`/services/${service.slug}`} className="relative z-10 mt-auto">
                                    <Button variant="outline" className="font-heading w-full group font-bold h-14 border-border hover:bg-muted text-foreground">
                                        Explore Solution
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="mt-32 max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-heading text-4xl font-extrabold text-foreground tracking-tight">Frequently Asked Questions</h2>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <h3 className="text-xl font-bold text-foreground mb-3">How long does a typical implementation take?</h3>
                            <p className="text-muted-foreground font-light">Our core philosophy is "lightning implementation"—we aim to go live with enterprise-grade solutions in under 30 days depending on project scope.</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <h3 className="text-xl font-bold text-foreground mb-3">What is n8n automation?</h3>
                            <p className="text-muted-foreground font-light">n8n is a powerful workflow automation tool that we use to connect your apps and APIs, streamlining your business logic without limits.</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <h3 className="text-xl font-bold text-foreground mb-3">Do you handle cloud migration securely?</h3>
                            <p className="text-muted-foreground font-light">Absolutely. We emphasize uncompromising security and zero-downtime architecture when migrating your digital assets to AWS, Azure, or GCP.</p>
                        </div>
                    </div>
                </div>

                {/* SEO Content Block */}
                <div className="mt-32 max-w-4xl mx-auto text-center border-t border-border pt-16">
                    <h2 className="font-heading text-3xl font-extrabold text-foreground mb-6">World-Class IT Solutions Engineered in Chennai</h2>
                    <p className="text-muted-foreground font-light leading-relaxed">
                        From deep system automation using n8n to responsive, ultra-fast web development, Infygru is setting the benchmark for IT excellence. By converging artificial intelligence, predictive data analytics, and modern DevOps architecture, we help agile businesses dominate their sectors.
                    </p>
                </div>
            </div>
        </div>
    );
}
