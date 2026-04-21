"use client";

import { useState } from "react";
import {
    ArrowRight, Loader2, CheckCircle2, MessageCircle, Clock,
    Lock, Star, Phone, Mail, MapPin, ChevronRight, Shield
} from "lucide-react";
import Link from "next/link";

// ── Types ────────────────────────────────────────────────────────────────────

type Step1Data = { service: string };
type Step2Data = { timeline: string; budget: string; size: string };
type Step3Data = { name: string; phone: string; email: string; company: string; whatsappSame: boolean };

const SERVICES = [
    { id: "Web Development", label: "Web Development", icon: "🌐" },
    { id: "Cloud Migration", label: "Cloud Migration", icon: "☁️" },
    { id: "n8n Automation", label: "n8n Automation", icon: "⚙️" },
    { id: "Business Registration", label: "Business Registration", icon: "🏢" },
    { id: "Compliance & Taxation", label: "Compliance & Tax", icon: "📋" },
    { id: "Security Operations", label: "Security Ops", icon: "🛡️" },
    { id: "Other", label: "Something Else", icon: "💬" },
];

const TIMELINES = [
    { id: "ASAP", label: "ASAP — within 2 weeks" },
    { id: "1-3 months", label: "1–3 months" },
    { id: "Flexible", label: "Flexible / just exploring" },
];

const BUDGETS = [
    { id: "Under ₹50k", label: "Under ₹50,000" },
    { id: "₹50k–₹2L", label: "₹50,000 – ₹2,00,000" },
    { id: "₹2L–₹10L", label: "₹2L – ₹10L" },
    { id: "₹10L+", label: "₹10L+" },
    { id: "Not sure", label: "Not sure yet" },
];

const SIZES = [
    { id: "Solo", label: "Solo / Freelancer" },
    { id: "Small (2–20)", label: "Small business (2–20)" },
    { id: "Growing (20–100)", label: "Growing company (20–100)" },
    { id: "Enterprise (100+)", label: "Enterprise (100+)" },
];

const TESTIMONIALS = [
    { quote: "Infygru built our platform in 3 weeks flat. The n8n automation saves us 40+ hours every month.", name: "Ravi S.", role: "Founder", company: "Chennai SaaS startup" },
    { quote: "GST filing and company registration handled end-to-end. Zero stress, everything on time.", name: "Meena K.", role: "Director", company: "Chennai Exports Pvt Ltd" },
    { quote: "Migrated our entire infrastructure to AWS with zero downtime. Exceptional team.", name: "Arjun P.", role: "CTO", company: "Bangalore FinTech" },
];

// ── Component ────────────────────────────────────────────────────────────────

export default function Contact() {
    const [step, setStep] = useState(1);
    const [step1, setStep1] = useState<Step1Data>({ service: "" });
    const [step2, setStep2] = useState<Step2Data>({ timeline: "", budget: "", size: "" });
    const [step3, setStep3] = useState<Step3Data>({ name: "", phone: "", email: "", company: "", whatsappSame: true });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        if (!step3.name || !step3.phone || !step3.email) {
            setError("Please fill in your name, phone, and email.");
            return;
        }
        setSubmitting(true);
        setError("");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: step3.name,
                    lastName: "",
                    email: step3.email,
                    phone: step3.phone,
                    company: step3.company,
                    service: step1.service,
                    message: `Timeline: ${step2.timeline} | Budget: ${step2.budget} | Team size: ${step2.size}`,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Something went wrong.");
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">

            {/* ── Hero ── */}
            <section className="pt-28 pb-10 text-center bg-slate-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:3rem_3rem]" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-[80px]" />
                <div className="container mx-auto px-4 max-w-2xl relative z-10">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        We respond within 2 hours · Mon–Sat
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
                        Start Your Free Consultation
                    </h1>
                    <p className="text-slate-400 font-light text-lg">
                        Tell us what you need — takes 60 seconds. No spam, no sales calls unless you ask.
                    </p>
                </div>
            </section>

            {/* ── Main layout ── */}
            <div className="container mx-auto px-4 max-w-6xl py-12">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">

                    {/* ── Left: Trust panel ── */}
                    <aside className="lg:col-span-2 space-y-8">

                        {/* Response time */}
                        <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-100 rounded-2xl">
                            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0 text-green-600">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-bold text-green-900 text-sm">We respond within 2 hours</p>
                                <p className="text-green-700 text-xs mt-0.5">Mon–Sat, 9am–7pm IST. Often much faster.</p>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { value: "300+", label: "Projects" },
                                { value: "4.8★", label: "Rating" },
                                { value: "₹0", label: "Consult Fee" },
                            ].map((s) => (
                                <div key={s.label} className="text-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="text-xl font-extrabold text-slate-900">{s.value}</div>
                                    <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Testimonials */}
                        <div className="space-y-3">
                            {TESTIMONIALS.map((t) => (
                                <div key={t.name} className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                                    <div className="flex gap-0.5 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>
                                    <p className="text-slate-700 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                                    <p className="mt-2 text-xs font-bold text-slate-900">{t.name} — {t.role}, {t.company}</p>
                                </div>
                            ))}
                        </div>

                        {/* Contact alternatives */}
                        <div className="space-y-3 pt-2 border-t border-slate-100">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Prefer to reach out directly?</p>
                            <a href="https://wa.me/918300290019" target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3.5 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors group">
                                <MessageCircle className="w-5 h-5 text-green-600 shrink-0" />
                                <div>
                                    <p className="font-bold text-green-900 text-sm">WhatsApp us directly</p>
                                    <p className="text-green-700 text-xs">+91 8300290019 — instant replies</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-green-500 ml-auto group-hover:translate-x-0.5 transition-transform" />
                            </a>
                            <a href="mailto:info@infygru.com"
                                className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors group">
                                <Mail className="w-5 h-5 text-slate-500 shrink-0" />
                                <div>
                                    <p className="font-bold text-slate-800 text-sm">Email us</p>
                                    <p className="text-slate-500 text-xs">info@infygru.com</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-400 ml-auto group-hover:translate-x-0.5 transition-transform" />
                            </a>
                            <div className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                                <MapPin className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-slate-800 text-sm">Chennai Office</p>
                                    <p className="text-slate-500 text-xs leading-relaxed">16, Murahari str, West Saidapet,<br />Chennai – 600015</p>
                                </div>
                            </div>
                        </div>

                        {/* NDA & security */}
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <Shield className="w-4 h-4 shrink-0" />
                            <span>Need an NDA before discussing? We&apos;ll send one within the hour. Just mention it in your message.</span>
                        </div>
                    </aside>

                    {/* ── Right: 3-step wizard ── */}
                    <div className="lg:col-span-3">
                        {success ? (
                            /* ── Success state ── */
                            <div className="bg-white border border-slate-100 rounded-3xl shadow-xl p-10 text-center">
                                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                                </div>
                                <h2 className="text-2xl font-extrabold text-slate-900 mb-2">You&apos;re all set, {step3.name.split(" ")[0]}!</h2>
                                <p className="text-slate-500 mb-1">We&apos;ve received your <span className="font-semibold text-slate-700">{step1.service}</span> inquiry.</p>
                                <p className="text-slate-500 mb-8">Expect a call or WhatsApp from us <span className="font-bold text-green-600">within 2 hours</span> (Mon–Sat, 9am–7pm IST).</p>

                                <div className="space-y-3 max-w-xs mx-auto">
                                    <a href="https://wa.me/918300290019" target="_blank" rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-400 text-white font-bold py-3.5 rounded-xl transition-colors">
                                        <MessageCircle className="w-4 h-4" />
                                        WhatsApp us now
                                    </a>
                                    <a href="tel:+918300290019"
                                        className="flex items-center justify-center gap-2 w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3.5 rounded-xl transition-colors">
                                        <Phone className="w-4 h-4" />
                                        Call +91 8300290019
                                    </a>
                                </div>
                                <button onClick={() => { setSuccess(false); setStep(1); setStep1({ service: "" }); setStep2({ timeline: "", budget: "", size: "" }); setStep3({ name: "", phone: "", email: "", company: "", whatsappSame: true }); }}
                                    className="mt-6 text-sm text-slate-400 hover:text-slate-600 transition-colors underline">
                                    Submit another enquiry
                                </button>
                            </div>
                        ) : (
                            <div className="bg-white border border-slate-100 rounded-3xl shadow-xl overflow-hidden">

                                {/* Progress bar */}
                                <div className="flex border-b border-slate-100">
                                    {[1, 2, 3].map((n) => (
                                        <div key={n} className="flex-1 relative">
                                            <div className={`h-1 transition-all duration-500 ${step >= n ? "bg-amber-500" : "bg-slate-100"}`} />
                                            <div className={`flex items-center justify-center gap-1.5 py-3 text-xs font-bold transition-colors ${step >= n ? "text-amber-600" : "text-slate-400"}`}>
                                                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-extrabold ${step > n ? "bg-amber-500 text-white" : step === n ? "bg-amber-100 text-amber-700 border-2 border-amber-400" : "bg-slate-100 text-slate-400"}`}>
                                                    {step > n ? "✓" : n}
                                                </span>
                                                <span className="hidden sm:inline">{n === 1 ? "Service" : n === 2 ? "Details" : "Contact"}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-8 md:p-10">

                                    {/* ── Step 1: Service Selector ── */}
                                    {step === 1 && (
                                        <div>
                                            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">What do you need help with?</h2>
                                            <p className="text-slate-500 text-sm mb-7">Select the service that fits your needs best.</p>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {SERVICES.map((s) => (
                                                    <button
                                                        key={s.id}
                                                        onClick={() => setStep1({ service: s.id })}
                                                        className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 text-center transition-all hover:-translate-y-0.5 ${step1.service === s.id
                                                            ? "border-amber-400 bg-amber-50 shadow-md"
                                                            : "border-slate-200 bg-white hover:border-amber-200 hover:bg-amber-50/50"
                                                            }`}
                                                    >
                                                        <span className="text-2xl">{s.icon}</span>
                                                        <span className={`text-xs font-bold leading-tight ${step1.service === s.id ? "text-amber-700" : "text-slate-700"}`}>{s.label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                            <button
                                                onClick={() => step1.service && setStep(2)}
                                                disabled={!step1.service}
                                                className="mt-8 w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 shadow-lg hover:shadow-amber-200"
                                            >
                                                Next — Tell us more <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}

                                    {/* ── Step 2: Quick qualifiers ── */}
                                    {step === 2 && (
                                        <div>
                                            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">A few quick questions</h2>
                                            <p className="text-slate-500 text-sm mb-7">Helps us prepare the right solution before we talk.</p>

                                            <div className="space-y-6">
                                                {/* Timeline */}
                                                <div>
                                                    <label className="text-sm font-bold text-slate-700 block mb-2.5">What&apos;s your timeline?</label>
                                                    <div className="space-y-2">
                                                        {TIMELINES.map((t) => (
                                                            <label key={t.id} className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${step2.timeline === t.id ? "border-amber-400 bg-amber-50" : "border-slate-200 hover:border-slate-300"}`}>
                                                                <input type="radio" name="timeline" value={t.id} checked={step2.timeline === t.id} onChange={() => setStep2(p => ({ ...p, timeline: t.id }))} className="accent-amber-500" />
                                                                <span className={`text-sm font-medium ${step2.timeline === t.id ? "text-amber-800" : "text-slate-700"}`}>{t.label}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Budget */}
                                                <div>
                                                    <label className="text-sm font-bold text-slate-700 block mb-2.5">Approximate budget?</label>
                                                    <div className="space-y-2">
                                                        {BUDGETS.map((b) => (
                                                            <label key={b.id} className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${step2.budget === b.id ? "border-amber-400 bg-amber-50" : "border-slate-200 hover:border-slate-300"}`}>
                                                                <input type="radio" name="budget" value={b.id} checked={step2.budget === b.id} onChange={() => setStep2(p => ({ ...p, budget: b.id }))} className="accent-amber-500" />
                                                                <span className={`text-sm font-medium ${step2.budget === b.id ? "text-amber-800" : "text-slate-700"}`}>{b.label}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Business size */}
                                                <div>
                                                    <label className="text-sm font-bold text-slate-700 block mb-2.5">Your business size?</label>
                                                    <div className="space-y-2">
                                                        {SIZES.map((s) => (
                                                            <label key={s.id} className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${step2.size === s.id ? "border-amber-400 bg-amber-50" : "border-slate-200 hover:border-slate-300"}`}>
                                                                <input type="radio" name="size" value={s.id} checked={step2.size === s.id} onChange={() => setStep2(p => ({ ...p, size: s.id }))} className="accent-amber-500" />
                                                                <span className={`text-sm font-medium ${step2.size === s.id ? "text-amber-800" : "text-slate-700"}`}>{s.label}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex gap-3 mt-8">
                                                <button onClick={() => setStep(1)} className="px-6 py-4 border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors">
                                                    ← Back
                                                </button>
                                                <button
                                                    onClick={() => setStep(3)}
                                                    disabled={!step2.timeline || !step2.budget || !step2.size}
                                                    className="flex-1 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 shadow-lg hover:shadow-amber-200"
                                                >
                                                    Next — Almost done <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* ── Step 3: Contact details ── */}
                                    {step === 3 && (
                                        <div>
                                            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">How do we reach you?</h2>
                                            <p className="text-slate-500 text-sm mb-7">We&apos;ll call or WhatsApp within 2 hours.</p>

                                            <div className="space-y-4">
                                                <div>
                                                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">Your Name *</label>
                                                    <input
                                                        required type="text"
                                                        value={step3.name}
                                                        onChange={(e) => setStep3(p => ({ ...p, name: e.target.value }))}
                                                        placeholder="Full name"
                                                        className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-amber-400 focus:bg-amber-50/30 outline-none transition-all text-slate-900"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">Mobile Number *</label>
                                                    <div className="flex">
                                                        <span className="flex items-center px-3.5 bg-slate-100 border-2 border-r-0 border-slate-200 rounded-l-xl text-sm font-bold text-slate-600">🇮🇳 +91</span>
                                                        <input
                                                            required type="tel"
                                                            value={step3.phone}
                                                            onChange={(e) => setStep3(p => ({ ...p, phone: e.target.value }))}
                                                            placeholder="10-digit mobile number"
                                                            className="flex-1 px-4 py-3.5 border-2 border-slate-200 rounded-r-xl focus:border-amber-400 focus:bg-amber-50/30 outline-none transition-all text-slate-900"
                                                        />
                                                    </div>
                                                    <label className="flex items-center gap-2 mt-2 cursor-pointer">
                                                        <input type="checkbox" checked={step3.whatsappSame} onChange={(e) => setStep3(p => ({ ...p, whatsappSame: e.target.checked }))} className="accent-green-500 w-4 h-4" />
                                                        <span className="text-xs text-slate-500 flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5 text-green-500" /> WhatsApp on this number</span>
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">Work Email *</label>
                                                    <input
                                                        required type="email"
                                                        value={step3.email}
                                                        onChange={(e) => setStep3(p => ({ ...p, email: e.target.value }))}
                                                        placeholder="you@company.com"
                                                        className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-amber-400 focus:bg-amber-50/30 outline-none transition-all text-slate-900"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">Company Name <span className="font-normal normal-case text-slate-400">(optional)</span></label>
                                                    <input
                                                        type="text"
                                                        value={step3.company}
                                                        onChange={(e) => setStep3(p => ({ ...p, company: e.target.value }))}
                                                        placeholder="Your company or organisation"
                                                        className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-amber-400 focus:bg-amber-50/30 outline-none transition-all text-slate-900"
                                                    />
                                                </div>
                                            </div>

                                            {/* Trust micro-copy */}
                                            <div className="flex flex-wrap gap-4 mt-5 text-xs text-slate-400">
                                                <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> Never shared or sold</span>
                                                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Response within 2 hours</span>
                                                <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 4.8/5 client rating</span>
                                            </div>

                                            {error && <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">{error}</p>}

                                            <div className="flex gap-3 mt-6">
                                                <button onClick={() => setStep(2)} className="px-6 py-4 border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors">
                                                    ← Back
                                                </button>
                                                <button
                                                    onClick={handleSubmit}
                                                    disabled={submitting || !step3.name || !step3.phone || !step3.email}
                                                    className="flex-1 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 shadow-lg hover:shadow-amber-200"
                                                >
                                                    {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : <>Get My Free Consultation <ArrowRight className="w-4 h-4" /></>}
                                                </button>
                                            </div>

                                            <p className="text-center text-xs text-slate-400 mt-4">
                                                Or <Link href="https://wa.me/918300290019" target="_blank" className="text-green-600 font-bold hover:underline">WhatsApp us directly</Link> — +91 8300290019
                                            </p>
                                        </div>
                                    )}

                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
