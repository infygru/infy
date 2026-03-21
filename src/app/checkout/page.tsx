"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, CheckCircle2, Shield, Zap, Lock, HelpCircle, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

type PlanMeta = {
    label: string;
    price: string;
    priceNote: string;
    description: string;
    isCustom: boolean;
};

const PLANS: Record<string, PlanMeta> = {
    // IT & Cloud Services
    starter: {
        label: "Starter",
        price: "₹14,999",
        priceNote: "/project",
        description: "Custom website (up to 5 pages), basic SEO, mobile-first design, and 1-month support.",
        isCustom: false,
    },
    professional: {
        label: "Professional",
        price: "₹49,999",
        priceNote: "/project",
        description: "Advanced web app (Next.js/React), CMS, n8n automation, comprehensive SEO, and 3-month priority support.",
        isCustom: false,
    },
    // Business Registration & Licensing
    "biz-basic": {
        label: "Business Basic",
        price: "₹2,499",
        priceNote: "/registration",
        description: "Any one registration service with document collection, government filing, and email support.",
        isCustom: false,
    },
    "biz-growth": {
        label: "Business Growth",
        price: "₹7,999",
        priceNote: "/bundle",
        description: "Company incorporation, GST registration, MSME, trademark, and DSC — complete startup bundle.",
        isCustom: false,
    },
    // Compliance & Taxation
    "tax-individual": {
        label: "Individual Tax",
        price: "₹999",
        priceNote: "/year",
        description: "ITR-1/ITR-2 filing, income tax computation, TDS reconciliation, and refund tracking.",
        isCustom: false,
    },
    "tax-business": {
        label: "Business Tax",
        price: "₹4,999",
        priceNote: "/year",
        description: "Business ITR filing, monthly GST returns, TDS/TCS filing, and dedicated CA support.",
        isCustom: false,
    },
};

function CheckoutForm() {
    const searchParams = useSearchParams();
    const planKey = searchParams.get("plan") || "starter";

    const plan: PlanMeta = PLANS[planKey] ?? {
        label: planKey,
        price: "Custom",
        priceNote: "",
        description: "Contact us for custom enterprise pricing.",
        isCustom: true,
    };

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg(null);

        if (plan.isCustom) {
            setErrorMsg("Please contact us for custom enterprise payments.");
            setLoading(false);
            return;
        }

        const formData = new FormData(e.currentTarget);
        const customerInfo = {
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            company: formData.get("company") as string,
            jobTitle: formData.get("jobTitle") as string,
            projectDescription: formData.get("projectDescription") as string,
        };

        try {
            const response = await fetch("/api/paytm/initiate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ plan: planKey, customerInfo }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to initiate payment");
            }

            const { txnToken, orderId, amount, mid } = data;

            // Load Paytm JS SDK
            const scriptUrl = `https://securegw.paytm.in/merchantpgpui/checkoutjs/merchants/${mid}.js`;
            await new Promise<void>((resolve, reject) => {
                if (document.querySelector(`script[src="${scriptUrl}"]`)) {
                    resolve();
                    return;
                }
                const script = document.createElement("script");
                script.src = scriptUrl;
                script.onload = () => resolve();
                script.onerror = () => reject(new Error("Failed to load payment gateway"));
                document.body.appendChild(script);
            });

            const paytm = (window as any).Paytm;
            if (!paytm?.CheckoutJS) {
                throw new Error("Payment gateway is not available.");
            }

            const config = {
                root: "",
                flow: "DEFAULT",
                data: {
                    orderId,
                    token: txnToken,
                    tokenType: "TXN_TOKEN",
                    amount,
                },
                handler: {
                    notifyMerchant: function (eventName: string) {
                        console.log("Paytm event:", eventName);
                        if (eventName === "SESSION_EXPIRED") {
                            setErrorMsg("Session expired. Please try again.");
                            setLoading(false);
                        }
                    },
                    transactionStatus: function (txnData: any) {
                        console.log("Paytm txn status:", txnData);
                        paytm.CheckoutJS.close();
                        if (txnData.STATUS === "TXN_SUCCESS") {
                            const params = new URLSearchParams({
                                orderId: txnData.ORDERID || orderId,
                                txnId: txnData.TXNID || "",
                                amount: txnData.TXNAMOUNT || amount,
                            });
                            window.location.href = `/payment-success?${params.toString()}`;
                        } else {
                            const params = new URLSearchParams({
                                orderId: txnData.ORDERID || orderId,
                                msg: txnData.RESPMSG || "Payment was not completed.",
                            });
                            window.location.href = `/payment-failed?${params.toString()}`;
                        }
                    },
                },
            };

            paytm.CheckoutJS.init(config)
                .then(() => paytm.CheckoutJS.invoke())
                .catch((err: any) => {
                    console.error("Paytm init error:", err);
                    setErrorMsg("Failed to initialize payment gateway. Please try again.");
                    setLoading(false);
                });

        } catch (err: any) {
            setErrorMsg(err.message || "Something went wrong.");
            setLoading(false);
        }
    };

    return (
        <div className="font-sans">
            <div className="flex flex-col lg:flex-row w-full bg-white">
                {/* Left Column: Summary */}
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
                                {plan.label}
                            </h1>
                            <div className="flex items-end gap-3 mb-6">
                                <span className="font-heading text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight">{plan.price}</span>
                                {plan.priceNote && (
                                    <span className="text-muted-foreground font-light text-lg pb-2">{plan.priceNote}</span>
                                )}
                            </div>
                            <p className="text-muted-foreground font-light text-lg leading-relaxed">
                                {plan.description}
                            </p>
                        </div>

                        <div className="space-y-8 mt-12 pb-12">
                            <div className="pt-8 border-t border-border">
                                <h3 className="font-heading font-bold text-foreground mb-6 text-xl">What happens next?</h3>

                                <div className="space-y-8">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center shrink-0 shadow-sm">
                                            <Zap className="w-5 h-5 text-accent" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-foreground mb-2 text-lg">Instant Confirmation</h4>
                                            <p className="text-muted-foreground text-sm font-light leading-relaxed">
                                                You will receive a confirmation email immediately after payment. Our team will contact you within 24 hours to begin onboarding.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center shrink-0 shadow-sm">
                                            <CheckCircle2 className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-foreground mb-2 text-lg">Dedicated Expert Assigned</h4>
                                            <p className="text-muted-foreground text-sm font-light leading-relaxed">
                                                A dedicated account manager or expert is assigned to your project from Day 1, ensuring seamless delivery.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Form */}
                <div className="lg:w-[55%] bg-slate-50 p-8 lg:p-16 xl:p-24 flex flex-col justify-center relative">
                    <form onSubmit={handlePayment} className="max-w-xl mx-auto w-full bg-white p-10 md:p-14 rounded-[2.5rem] shadow-xl border border-border">
                        <div className="flex items-center justify-between mb-10 pb-6 border-b border-border">
                            <h2 className="font-heading text-3xl font-extrabold text-foreground tracking-tight">Your Details</h2>
                            <div className="flex items-center gap-2 text-primary font-bold">
                                <Lock className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="space-y-6">
                            {errorMsg && (
                                <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium">
                                    {errorMsg}
                                </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground font-heading">First Name</label>
                                    <input name="firstName" required type="text" className="w-full p-4 rounded-xl border border-border bg-secondary/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium text-foreground" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground font-heading">Last Name</label>
                                    <input name="lastName" required type="text" className="w-full p-4 rounded-xl border border-border bg-secondary/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium text-foreground" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground font-heading">Email</label>
                                    <input name="email" required type="email" className="w-full p-4 rounded-xl border border-border bg-secondary/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium text-foreground" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground font-heading">Phone Number</label>
                                    <input name="phone" required type="tel" className="w-full p-4 rounded-xl border border-border bg-secondary/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium text-foreground" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground font-heading">Company Name</label>
                                    <input name="company" type="text" className="w-full p-4 rounded-xl border border-border bg-secondary/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium text-foreground" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground font-heading">Job Title</label>
                                    <input name="jobTitle" type="text" className="w-full p-4 rounded-xl border border-border bg-secondary/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium text-foreground" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-foreground font-heading">Description / Requirements</label>
                                <textarea name="projectDescription" rows={3} className="w-full p-4 rounded-xl border border-border bg-secondary/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium text-foreground resize-none"></textarea>
                            </div>

                            <div className="pt-8 mb-4 border-t border-border mt-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-muted-foreground font-heading tracking-widest uppercase flex items-center justify-between mb-4">
                                        <span>Payment Processing</span>
                                        <span className="flex items-center gap-2 text-primary lowercase"><Shield className="w-3 h-3" /> 256-bit SSL</span>
                                    </label>
                                    <div className="bg-secondary/30 p-6 md:p-8 rounded-2xl border border-border border-dashed flex flex-col items-center justify-center min-h-[120px]">
                                        {!plan.isCustom ? (
                                            <Button type="submit" disabled={loading} className="w-full h-14 rounded-xl text-lg font-bold font-heading shadow-[0_0_40px_-10px_rgba(var(--primary),0.5)] hover:shadow-[0_0_60px_-15px_rgba(var(--primary),0.6)] transition-all">
                                                {loading
                                                    ? <><Loader2 className="w-5 h-5 mr-3 animate-spin" /> Processing Securely...</>
                                                    : `Pay ${plan.price} Securely`
                                                }
                                            </Button>
                                        ) : (
                                            <p className="text-sm text-muted-foreground font-light text-center">Contact us to process custom enterprise payments.</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <p className="text-center text-xs font-light text-muted-foreground mt-6 leading-relaxed">
                                By clicking the payment button, you authorize the charge and agree to Infygru&apos;s{" "}
                                <Link href="/legal/terms" className="underline">Terms of Service</Link> and{" "}
                                <Link href="/legal/privacy" className="underline">Privacy Policy</Link>.
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            {/* Assurance & FAQ */}
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
                                We engineer solutions that run mission-critical infrastructure. Our enterprise assurance protocol covers post-launch support, code handover, and full IP transfer.
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
                                    <span className="text-foreground font-medium">24/7 technical support included post-launch.</span>
                                </li>
                            </ul>

                            <Link href="/contact" className="inline-flex mt-10 w-full sm:w-auto">
                                <Button variant="outline" className="w-full sm:w-auto h-14 px-8 font-bold font-heading border-border text-foreground hover:bg-muted group">
                                    Talk to an Expert <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
                                        You will receive an order confirmation. Our team will contact you within 24 hours to schedule your onboarding call and begin work.
                                    </p>
                                </div>
                                <div className="pb-6 border-b border-border">
                                    <h4 className="font-bold text-foreground mb-2">Are there any hidden fees?</h4>
                                    <p className="text-muted-foreground text-sm font-light leading-relaxed">
                                        No. Infygru operates on absolute transparency. The price shown is the price you pay. Any optional add-ons are explicitly quoted.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground mb-2">Is my payment secure?</h4>
                                    <p className="text-muted-foreground text-sm font-light leading-relaxed">
                                        Yes. All payments are processed through Paytm&apos;s PCI-DSS compliant gateway with 256-bit SSL encryption. We do not store your card details.
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
