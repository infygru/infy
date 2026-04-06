"use client";

import Link from "next/link";
import { ArrowRight, Code, Shield, Bot, Workflow, BarChart, Cloud, Building2, Briefcase, Server, Database, Eye, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { servicesData } from "@/lib/data";
import { motion } from "framer-motion";

const iconsMap: Record<string, React.ReactNode> = {
    'digital-transformation': <Workflow className="w-6 h-6" />,
    'web-development': <Code className="w-6 h-6" />,
    'n8n-automation': <Bot className="w-6 h-6" />,
    'cloud-migration': <Cloud className="w-6 h-6" />,
    'data-analytics': <BarChart className="w-6 h-6" />,
    'security-operations': <Shield className="w-6 h-6" />,
    'devops': <Server className="w-6 h-6" />,
    'servicenow': <Database className="w-6 h-6" />,
    'ai-computer-vision': <Eye className="w-6 h-6" />,
    'business-registration': <Building2 className="w-6 h-6" />,
    'compliance-taxation': <Briefcase className="w-6 h-6" />,
};

const iconColors: Record<string, { text: string; bg: string; border: string }> = {
    'digital-transformation': { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
    'web-development': { text: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-200' },
    'n8n-automation': { text: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
    'cloud-migration': { text: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
    'data-analytics': { text: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
    'security-operations': { text: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-300' },
    'devops': { text: 'text-teal-700', bg: 'bg-teal-50', border: 'border-teal-200' },
    'servicenow': { text: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200' },
    'ai-computer-vision': { text: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-200' },
    'business-registration': { text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
    'compliance-taxation': { text: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200' },
};

const itServices = servicesData.filter(s =>
    !['business-registration', 'compliance-taxation'].includes(s.slug)
);
const businessServices = servicesData.filter(s =>
    ['business-registration', 'compliance-taxation'].includes(s.slug)
);

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

function ServiceCard({ service }: { service: (typeof servicesData)[0] }) {
    const colors = iconColors[service.slug] || { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' };
    return (
        <motion.div variants={cardVariants}>
            <Link href={`/services/${service.slug}`} className="group block h-full">
                <div className="h-full bg-white rounded-2xl border border-slate-200 p-6 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                    {/* accent top line */}
                    <div className={`absolute top-0 left-0 right-0 h-0.5 ${colors.bg} group-hover:h-1 transition-all duration-300`} style={{ backgroundColor: undefined }}>
                        <div className={`h-full ${colors.text.replace('text-', 'bg-')}`} />
                    </div>

                    <div className={`w-12 h-12 rounded-xl border ${colors.border} ${colors.bg} flex items-center justify-center mb-5 shrink-0 group-hover:scale-110 transition-transform duration-300 ${colors.text}`}>
                        {iconsMap[service.slug] || <Code className="w-6 h-6" />}
                    </div>

                    <h3 className="font-heading text-base font-bold mb-2 text-slate-900 group-hover:text-amber-600 transition-colors">
                        {service.title}
                    </h3>

                    <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">
                        {service.description}
                    </p>

                    {service.features && (
                        <ul className="space-y-1.5 mb-4">
                            {service.features.slice(0, 3).map((f: string) => (
                                <li key={f} className="flex items-center gap-2 text-xs text-slate-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                                    {f}
                                </li>
                            ))}
                            {service.features.length > 3 && (
                                <li className="text-xs text-slate-400 pl-3.5">+{service.features.length - 3} more</li>
                            )}
                        </ul>
                    )}

                    <div className={`flex items-center gap-1.5 text-xs font-bold ${colors.text} group-hover:gap-3 transition-all mt-auto`}>
                        Explore <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

const faqs = [
    { q: "How long does a typical implementation take?", a: "Our core philosophy is 'lightning implementation' — we aim to go live with enterprise-grade solutions in under 30 days depending on project scope." },
    { q: "What is n8n automation?", a: "n8n is a powerful workflow automation tool we use to connect your apps and APIs, streamlining business logic without limits or per-task pricing." },
    { q: "Do you handle cloud migration securely?", a: "Absolutely. We emphasize uncompromising security and zero-downtime architecture when migrating your digital assets to AWS, Azure, or GCP." },
    { q: "Can you help with both IT services and business registration?", a: "Yes! We uniquely combine IT services (web dev, automation, cloud) with compliance and registration services (GST, trademark, incorporation) under one roof." },
    { q: "Do you serve clients outside Chennai?", a: "Yes — while headquartered in Chennai, we serve clients across Bangalore, Mumbai, Hyderabad, and pan-India. Remote-first delivery is our default mode." },
];

export default function Offerings() {
    return (
        <div className="min-h-screen bg-white">
            {/* ── Compact Hero ── */}
            <section className="relative py-16 bg-slate-950 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:3rem_3rem]" />
                <div className="absolute top-0 right-1/3 w-[500px] h-[300px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="container mx-auto px-4 max-w-4xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55 }}
                        className="text-center"
                    >
                        {/* Breadcrumb */}
                        <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500 mb-5">
                            <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-slate-300">Offerings</span>
                        </div>

                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                            Enterprise Solutions
                        </span>
                        <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                            Our Offerings
                        </h1>
                        <p className="text-slate-400 font-light max-w-2xl mx-auto">
                            From IT architecture and cloud migration to business registration and tax compliance — we cover every dimension of your enterprise.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── IT & Cloud Services ── */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex items-end justify-between mb-10"
                    >
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2">Technology</p>
                            <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                                IT & Cloud Services
                            </h2>
                            <p className="text-slate-500 text-sm mt-2 max-w-lg">
                                Cutting-edge technology solutions to modernize, scale, and secure your digital infrastructure.
                            </p>
                        </div>
                        <Link href="/services/digital-transformation" className="hidden md:flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-500 transition-colors shrink-0">
                            Explore all <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        {itServices.map((service) => (
                            <ServiceCard key={service.slug} service={service} />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Divider */}
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            </div>

            {/* ── Business & Compliance Services ── */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex items-end justify-between mb-10"
                    >
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-green-600 mb-2">Compliance & Legal</p>
                            <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                                Business & Compliance Services
                            </h2>
                            <p className="text-slate-500 text-sm mt-2 max-w-lg">
                                End-to-end business registration, licensing, taxation, and compliance services for Indian enterprises.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        {businessServices.map((service) => (
                            <ServiceCard key={service.slug} service={service} />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="py-16 bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto px-4 max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2 text-center">Common Questions</p>
                        <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-slate-900 text-center mb-10 tracking-tight">
                            Frequently Asked Questions
                        </h2>
                    </motion.div>
                    <motion.div
                        className="space-y-3"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {faqs.map((item, i) => (
                            <motion.div key={i} variants={cardVariants} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="font-heading text-base font-bold text-slate-900 mb-2">{item.q}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{item.a}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-16 bg-slate-950 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
                <div className="container mx-auto px-4 max-w-2xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55 }}
                    >
                        <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">Not sure which service fits?</h2>
                        <p className="text-slate-400 mb-8">Schedule a free consultation and our team will guide you to the right solution.</p>
                        <Link href="https://wa.me/918300290019" target="_blank" rel="noopener noreferrer">
                            <Button size="lg" className="font-heading font-extrabold px-10 h-13 text-base shadow-xl hover:-translate-y-1 transition-transform bg-amber-500 hover:bg-amber-400 text-white rounded-xl">
                                Schedule a Free Call <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
