"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, CheckCircle2, Shield, Zap, Lock, CreditCard, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

function RazorpayButton({ buttonId }: { buttonId: string }) {
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (!formRef.current || !buttonId) return;

        // Prevent duplicate scripts in React Strict Mode
        if (formRef.current.querySelector('script')) return;

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/payment-button.js";
        script.async = true;
        // The ID provided by the user
        script.setAttribute("data-payment_button_id", buttonId);
        formRef.current.appendChild(script);

        return () => {
            if (formRef.current) {
                formRef.current.innerHTML = '';
            }
        }
    }, [buttonId]);

    return <form ref={formRef} className="w-full flex justify-center mt-2"></form>;
}

function CheckoutForm() {
    const searchParams = useSearchParams();
    const planName = searchParams.get("plan") || "starter";

    const price = planName === 'starter' ? '₹14,999' : planName === 'professional' ? '₹49,999' : 'Custom';

    const buttonId = planName === 'starter' ? 'pl_SOnu3LSi98jOMH' : planName === 'professional' ? 'pl_SOo4Pv2sm3yynh' : '';

    return (
        <div className="font-sans">
            <div className="flex flex-col lg:flex-row w-full bg-white">
                {/* Left Column: Summary & Timeline */}
                <div className="lg:w-[45%] bg-slate-50 p-8 lg:p-16 xl:p-24 flex flex-col relative overflow-hidden xl:min-h-screen border-r border-border">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                    <div className="relative z-10 flex flex-col h-full">
                        <Link href="/pricing" className="text-muted-foreground hover:text-foreground flex items-center gap-2 mb-12 transition-colors w-max font-light">
                            <ArrowLeft className="w-4 h-4" /> Return to Pricing
                        </Link>

                        <div className="mb-12">
                            <div className="text-xs font-bold text-primary bg-primary/10 w-max px-3 py-1 rounded-full font-heading tracking-widest uppercase mb-6">
                                Secure Order
                            </div>
                            <h1 className="font-heading text-4xl lg:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
                                <span className="capitalize">{planName}</span> Plan
                            </h1>
                            <div className="flex items-end gap-3 mb-6">
                                <span className="font-heading text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight">{price}</span>
                                {price !== 'Custom' && <span className="text-muted-foreground font-light text-lg pb-2">/ project</span>}
                            </div>
                            <p className="text-muted-foreground font-light text-lg leading-relaxed">
                                Full digital transformation, bespoke web architecture, and global scalability delivered fast.
                            </p>
                        </div>

                        <div className="space-y-8 mt-12 pb-12">
                            <div className="pt-8 border-t border-border">
                                <h3 className="font-heading font-bold text-foreground mb-6 text-xl">Project Timeline & Execution</h3>

                                <div className="space-y-8">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center shrink-0 shadow-sm">
                                            <Zap className="w-5 h-5 text-accent" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-foreground mb-2 text-lg">Guaranteed 30-Day Delivery</h4>
                                            <ul className="text-muted-foreground text-sm font-light leading-relaxed space-y-2">
                                                <li className="flex gap-2 items-start"><span className="text-primary mt-1">•</span> <strong>Day 1-3 (Discovery):</strong> Requirements mapping, asset handoff, and architecture blueprinting.</li>
                                                <li className="flex gap-2 items-start"><span className="text-primary mt-1">•</span> <strong>Day 4-15 (Engineering):</strong> Core frontend development, API routing, and backend database structuring.</li>
                                                <li className="flex gap-2 items-start"><span className="text-primary mt-1">•</span> <strong>Day 16-30 (Launch):</strong> QA testing across 14+ devices, final client review, SEO injection, and live deployment.</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center shrink-0 shadow-sm">
                                            <CheckCircle2 className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-foreground mb-2 text-lg">Zero Downtime Migration</h4>
                                            <ul className="text-muted-foreground text-sm font-light leading-relaxed space-y-2">
                                                <li className="flex gap-2 items-start"><span className="text-primary mt-1">•</span> Seamless cutover of legacy systems to modern Next.js/React infrastructure.</li>
                                                <li className="flex gap-2 items-start"><span className="text-primary mt-1">•</span> Automatic 301 redirection maps to preserve existing SEO authority.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Light Theme Form */}
                <div className="lg:w-[55%] bg-slate-50 p-8 lg:p-16 xl:p-24 flex flex-col justify-center relative">
                    <div className="max-w-xl mx-auto w-full bg-white p-10 md:p-14 rounded-[2.5rem] shadow-xl border border-border">
                        <div className="flex items-center justify-between mb-10 pb-6 border-b border-border">
                            <h2 className="font-heading text-3xl font-extrabold text-foreground tracking-tight">Authorization</h2>
                            <div className="flex items-center gap-2 text-primary font-bold">
                                <Lock className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground font-heading">First Name</label>
                                    <input required type="text" className="w-full p-4 rounded-xl border border-border bg-secondary/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium text-foreground" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground font-heading">Last Name</label>
                                    <input required type="text" className="w-full p-4 rounded-xl border border-border bg-secondary/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium text-foreground" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground font-heading">Business Email</label>
                                    <input required type="email" className="w-full p-4 rounded-xl border border-border bg-secondary/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium text-foreground" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground font-heading">Phone Number</label>
                                    <input required type="tel" className="w-full p-4 rounded-xl border border-border bg-secondary/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium text-foreground" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground font-heading">Company Name</label>
                                    <input required type="text" className="w-full p-4 rounded-xl border border-border bg-secondary/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium text-foreground" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground font-heading">Job Title</label>
                                    <input required type="text" className="w-full p-4 rounded-xl border border-border bg-secondary/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium text-foreground" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-foreground font-heading">Project Description</label>
                                <textarea required rows={3} className="w-full p-4 rounded-xl border border-border bg-secondary/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium text-foreground resize-none"></textarea>
                            </div>

                            <div className="pt-8 mb-4 border-t border-border mt-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-muted-foreground font-heading tracking-widest uppercase flex items-center justify-between mb-4">
                                        <span>Payment Processing</span>
                                        <span className="flex items-center gap-2 text-primary lowercase"><Shield className="w-3 h-3" /> 256-bit ssl securely hosted</span>
                                    </label>
                                    <div className="bg-secondary/30 p-6 md:p-8 rounded-2xl border border-border border-dashed flex flex-col items-center justify-center min-h-[120px]">
                                        {buttonId ? (
                                            <RazorpayButton buttonId={buttonId} />
                                        ) : (
                                            <p className="text-sm text-muted-foreground font-light text-center">Contact us to process custom enterprise payments.</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <p className="text-center text-xs font-light text-muted-foreground mt-6 leading-relaxed">
                                By clicking the payment button above, you authorize the charge and agree to Infygru's Terms of Service and Privacy Policy. All sales final.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* NEW SECTION: Enterprise Assurance & FAQ below Checkout */}
            <div className="bg-white py-24 border-t border-border">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary font-bold text-xs tracking-widest font-heading uppercase">
                                Buyer Protection
                            </div>
                            <h2 className="font-heading text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight mb-6">
                                Enterprise Assurance.
                            </h2>
                            <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
                                We engineer solutions that run mission-critical infrastructure. To guarantee your success, we have established a strict enterprise assurance protocol that covers everything from post-launch architecture support to code handover.
                            </p>

                            <ul className="space-y-4">
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                                    <span className="text-foreground font-medium">Full intellectual property transfer upon completion.</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                                    <span className="text-foreground font-medium">99.9% guaranteed uptime on cloud architecture.</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                                    <span className="text-foreground font-medium">Included 24/7 technical support post-launch.</span>
                                </li>
                            </ul>

                            <Link href="/contact" className="inline-flex mt-10 w-full sm:w-auto">
                                <Button variant="outline" className="w-full sm:w-auto h-14 px-8 font-bold font-heading border-border text-foreground hover:bg-muted group">
                                    Talk to an Architect <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </div>

                        <div className="bg-secondary/30 p-8 rounded-3xl border border-border">
                            <h3 className="font-heading text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
                                <HelpCircle className="w-6 h-6 text-primary" /> Common Queries
                            </h3>
                            <div className="space-y-6">
                                <div className="pb-6 border-b border-border">
                                    <h4 className="font-bold text-foreground mb-2">What happens immediately after payment?</h4>
                                    <p className="text-muted-foreground text-sm font-light leading-relaxed">
                                        You will be redirected to an encrypted onboarding dashboard where you can securely upload your brand assets and schedule your Day-1 architecture kickoff call.
                                    </p>
                                </div>
                                <div className="pb-6 border-b border-border">
                                    <h4 className="font-bold text-foreground mb-2">Are there any hidden maintenance fees?</h4>
                                    <p className="text-muted-foreground text-sm font-light leading-relaxed">
                                        No. Infygru operates on absolute transparency. Your plan includes the designated support window. We will provide explicit line-item estimates if you require external 3rd-party SaaS software.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground mb-2">Can you integrate with our existing stack?</h4>
                                    <p className="text-muted-foreground text-sm font-light leading-relaxed">
                                        Yes. We deploy n8n alongside robust API architectures to seamlessly bridge your legacy software with modern infrastructure.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Checkout() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted-foreground font-heading text-xl animate-pulse bg-slate-50">Initializing Secure Tunnel...</div>}>
            <CheckoutForm />
        </Suspense>
    );
}
