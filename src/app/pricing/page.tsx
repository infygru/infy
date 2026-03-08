import Link from "next/link";
import { Check, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata = {
    title: "Pricing | Web Development & IT Solutions in Chennai | Infygru",
    description: "Transparent pricing for enterprise web applications, n8n automation, cloud migration, and IT consulting services in Chennai. Explore our Starter, Professional, and Custom Enterprise plans.",
    keywords: "web development pricing chennai, IT solutions cost india, n8n automation pricing, cloud migration services cost, custom enterprise software pricing"
};

export default function Pricing() {
    const plans = [
        {
            name: "Starter",
            badge: "Fast Launch",
            price: "₹14,999",
            description: "Perfect for emerging businesses needing a professional digital presence rapidly.",
            features: [
                "Custom Website (up to 5 pages)",
                "Basic SEO Structure Setup",
                "Mobile Responsive Design",
                "Contact Form Integration",
                "1 Month Technical Support",
                "SSL Certificate Installation"
            ],
        },
        {
            name: "Professional",
            badge: "Most Popular",
            price: "₹49,999",
            description: "Ideal for growing companies needing advanced web applications and basic automations.",
            features: [
                "Advanced Web App Development",
                "n8n Automation (Up to 5 workflows)",
                "Comprehensive SEO Configuration",
                "Headless CMS Integration",
                "Analytics Dashboard Setup",
                "3 Months Priority Support",
                "Database Architecture Design"
            ],
            popular: true,
        },
        {
            name: "Enterprise",
            badge: "Full Scale",
            price: "Custom",
            description: "Complete digital transformation, cloud infrastructure, and infinite scalability.",
            features: [
                "Zero-Downtime Cloud Migration",
                "Unlimited n8n Automations",
                "Dedicated Account Manager",
                "24/7 SLA Backed Support",
                "Custom Security Operations Center",
                "AI Computer Vision Integration",
                "Custom SaaS Architecture"
            ],
        }
    ];

    return (
        <div className="min-h-screen bg-background pb-32 relative font-sans">
            {/* Subtle top ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

            {/* Hero */}
            <section className="pt-28 pb-16 lg:pt-36 relative z-10 text-center">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-bold text-sm tracking-wide font-heading">
                        Investment Plans
                    </div>
                    <h1 className="font-heading text-5xl md:text-6xl font-extrabold mb-8 text-foreground tracking-tight">Flexible, Transparent Pricing.</h1>
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-light">
                        Choose the perfect plan to accelerate your business needs. No hidden fees. Contact our architects for custom enterprise scaling in Chennai and globally.
                    </p>
                </div>
            </section>

            {/* Pricing Grid */}
            <section className="relative z-10 mt-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-center">
                        {plans.map((plan) => (
                            <div key={plan.name} className={`relative bg-white rounded-[2rem] p-8 lg:p-12 border transition-all duration-300 ${plan.popular ? 'border-primary shadow-2xl ring-4 ring-primary/10 scale-100 md:scale-105 z-10 bg-gradient-to-b from-white to-primary/5 py-12 lg:py-16' : 'border-border shadow-lg hover:shadow-xl hover:-translate-y-1'} flex flex-col h-full`}>
                                {plan.popular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <span className="font-heading bg-primary text-primary-foreground text-sm font-extrabold uppercase tracking-widest py-2 px-8 rounded-full shadow-lg">
                                            {plan.badge}
                                        </span>
                                    </div>
                                )}
                                {!plan.popular && (
                                    <div className="mb-4">
                                        <span className="font-heading text-xs font-bold uppercase tracking-widest text-muted-foreground bg-secondary px-4 py-1.5 rounded-full">
                                            {plan.badge}
                                        </span>
                                    </div>
                                )}

                                <div className={`mb-8 ${plan.popular ? 'mt-4' : ''}`}>
                                    <h3 className="font-heading text-3xl font-extrabold mb-4 text-foreground">{plan.name}</h3>
                                    <p className="text-muted-foreground text-base leading-relaxed h-16">{plan.description}</p>
                                </div>

                                <div className="mb-10 pb-10 border-b border-border/60">
                                    <span className="font-heading text-5xl font-extrabold text-foreground tracking-tight">{plan.price}</span>
                                    {plan.price !== "Custom" && <span className="text-muted-foreground font-medium text-lg ml-2">/project</span>}
                                </div>

                                <div className="flex-1 mb-12">
                                    <h4 className="font-heading font-bold text-foreground mb-6 flex items-center tracking-wide uppercase text-sm">
                                        <Info className="w-4 h-4 mr-2 text-muted-foreground" /> Included Features
                                    </h4>
                                    <ul className="space-y-4">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start">
                                                <div className={`mt-0.5 rounded-full p-1 mr-4 shrink-0 ${plan.popular ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                                                </div>
                                                <span className="text-foreground/90 font-medium">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Link href={plan.price === "Custom" ? "https://wa.me/919445675619" : `/checkout?plan=${plan.name.toLowerCase()}`} className="w-full mt-auto block">
                                    <Button variant={plan.popular ? "default" : "outline"} className={`font-heading w-full font-bold h-16 text-lg rounded-xl ${plan.popular ? 'shadow-xl hover:shadow-primary/30 hover:-translate-y-1 transition-all' : 'border-border hover:bg-muted text-foreground'}`}>
                                        {plan.price === "Custom" ? "Contact Architecture Team" : "Place Order"}
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Custom Setup Banner */}
            <section className="pt-32 relative z-10">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="bg-gradient-to-r from-background via-secondary to-background p-10 rounded-3xl border border-border">
                        <h2 className="font-heading text-3xl font-extrabold mb-4 text-foreground tracking-tight">Need a Highly Custom Setup?</h2>
                        <p className="text-lg text-muted-foreground font-light mb-8 max-w-2xl mx-auto">If your project requires extensive data migration, massive multi-region cloud deployment, or a complex array of n8n automations, let's talk custom pricing.</p>
                        <Link href="/contact" className="font-heading text-primary font-bold hover:underline underline-offset-4 text-lg">
                            Reach out to our solutions architect →
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
