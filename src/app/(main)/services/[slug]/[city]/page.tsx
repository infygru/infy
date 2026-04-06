import { servicesData } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/JsonLd";
import { CheckCircle2, ArrowRight, ChevronRight, MapPin, Phone, Star } from "lucide-react";
import type { Metadata } from "next";

const BASE_URL = "https://infygru.com";

const cities = [
    {
        slug: "chennai",
        name: "Chennai",
        state: "Tamil Nadu",
        description: "Our headquarters. Deep local expertise and fastest on-site turnaround.",
        landmarks: ["Anna Nagar", "T. Nagar", "Guindy", "OMR", "Velachery", "Porur"],
        phone: "+91-83002-90019",
    },
    {
        slug: "bangalore",
        name: "Bangalore",
        state: "Karnataka",
        description: "Serving the Silicon Valley of India's top startups and enterprises.",
        landmarks: ["Whitefield", "Koramangala", "HSR Layout", "Electronic City", "Indiranagar"],
        phone: "+91-83002-90019",
    },
    {
        slug: "mumbai",
        name: "Mumbai",
        state: "Maharashtra",
        description: "Serving India's financial capital with enterprise IT and compliance expertise.",
        landmarks: ["Bandra Kurla Complex", "Andheri", "Lower Parel", "Powai", "Navi Mumbai"],
        phone: "+91-83002-90019",
    },
    {
        slug: "hyderabad",
        name: "Hyderabad",
        state: "Telangana",
        description: "Trusted technology partner for Hyderabad's growing tech and pharma ecosystem.",
        landmarks: ["HITEC City", "Gachibowli", "Kondapur", "Madhapur", "Banjara Hills"],
        phone: "+91-83002-90019",
    },
    {
        slug: "delhi",
        name: "Delhi",
        state: "Delhi NCR",
        description: "Enterprise IT solutions for Delhi NCR's diverse business community.",
        landmarks: ["Connaught Place", "Noida", "Gurugram", "Dwarka", "Nehru Place"],
        phone: "+91-83002-90019",
    },
    {
        slug: "coimbatore",
        name: "Coimbatore",
        state: "Tamil Nadu",
        description: "Empowering Coimbatore's manufacturing and textile enterprises with digital solutions.",
        landmarks: ["RS Puram", "Gandhipuram", "Peelamedu", "TIDEL Park Coimbatore", "Saravanampatti"],
        phone: "+91-83002-90019",
    },
];

export function generateStaticParams() {
    const params: { slug: string; city: string }[] = [];
    for (const service of servicesData) {
        for (const city of cities) {
            params.push({ slug: service.slug, city: city.slug });
        }
    }
    return params;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string; city: string }>;
}): Promise<Metadata> {
    const { slug, city: citySlug } = await params;
    const service = servicesData.find((s) => s.slug === slug);
    const city = cities.find((c) => c.slug === citySlug);

    if (!service || !city) return { title: "Not Found | Infygru" };

    const title = `${service.title} in ${city.name} | Top ${service.title} Company ${city.name} | Infygru`;
    const description = `Looking for expert ${service.title} services in ${city.name}, ${city.state}? Infygru delivers enterprise-grade ${service.title} with 30-day delivery and 99.9% uptime SLA. Get a free consultation today.`;

    return {
        title,
        description,
        keywords: [
            ...(service.seoKeywords || []),
            `${service.title.toLowerCase()} in ${city.name}`,
            `${service.title.toLowerCase()} company ${city.name}`,
            `${service.title.toLowerCase()} services ${city.name}`,
            `best ${service.title.toLowerCase()} ${city.name}`,
            `IT company ${city.name}`,
        ],
        alternates: { canonical: `${BASE_URL}/services/${slug}/${citySlug}` },
        openGraph: {
            title,
            description,
            url: `${BASE_URL}/services/${slug}/${citySlug}`,
            images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630 }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

export default async function ServiceCityPage({
    params,
}: {
    params: Promise<{ slug: string; city: string }>;
}) {
    const { slug, city: citySlug } = await params;
    const service = servicesData.find((s) => s.slug === slug);
    const city = cities.find((c) => c.slug === citySlug);

    if (!service || !city) notFound();

    const localServiceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${BASE_URL}/services/${slug}/${citySlug}#service`,
        name: `${service.title} in ${city.name}`,
        description: service.description,
        url: `${BASE_URL}/services/${slug}/${citySlug}`,
        provider: {
            "@id": `${BASE_URL}/#organization`,
        },
        areaServed: {
            "@type": "City",
            name: city.name,
            containedInPlace: {
                "@type": "State",
                name: city.state,
                containedInPlace: { "@type": "Country", name: "India" },
            },
        },
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
            { "@type": "ListItem", position: 2, name: "Offerings", item: `${BASE_URL}/offerings` },
            { "@type": "ListItem", position: 3, name: service.title, item: `${BASE_URL}/services/${slug}` },
            { "@type": "ListItem", position: 4, name: city.name, item: `${BASE_URL}/services/${slug}/${citySlug}` },
        ],
    };

    const localFaqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: `Do you provide ${service.title} services in ${city.name}?`,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: `Yes, Infygru provides ${service.title} services in ${city.name}, ${city.state}. Our remote-first delivery model means we serve all areas of ${city.name} including ${city.landmarks.join(", ")}. Contact us for a free consultation.`,
                },
            },
            {
                "@type": "Question",
                name: `What is the cost of ${service.title} in ${city.name}?`,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: `${service.title} pricing in ${city.name} starts from ₹14,999 for basic projects. Enterprise projects are custom-scoped. Visit our pricing page or contact us for a detailed quote tailored to your requirements.`,
                },
            },
            {
                "@type": "Question",
                name: `Why choose Infygru for ${service.title} in ${city.name}?`,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: `Infygru offers 30-day delivery, 99.9% uptime SLA, transparent pricing, and dedicated support — making us the preferred ${service.title} partner for businesses in ${city.name}. We are headquartered in Chennai and serve pan-India remotely.`,
                },
            },
            ...(service.faqs || []).map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
        ],
    };

    const otherCities = cities.filter((c) => c.slug !== citySlug).slice(0, 5);

    return (
        <div className="min-h-screen bg-white">
            <JsonLd data={localServiceSchema} />
            <JsonLd data={breadcrumbSchema} />
            <JsonLd data={localFaqSchema} />

            {/* Hero */}
            <section className="relative py-14 bg-slate-950 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:3rem_3rem]" />
                <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-amber-500/8 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-4 max-w-5xl relative z-10">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6 flex-wrap">
                        <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href="/offerings" className="hover:text-slate-300 transition-colors">Offerings</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href={`/services/${slug}`} className="hover:text-slate-300 transition-colors">{service.title}</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-slate-300">{city.name}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                        <MapPin className="w-4 h-4 text-amber-400" />
                        <span className="text-amber-400 text-sm font-bold">{city.name}, {city.state}</span>
                    </div>

                    <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
                        {service.title} in {city.name}
                    </h1>
                    <p className="text-slate-400 text-base md:text-lg leading-relaxed font-light max-w-2xl mb-6">
                        Enterprise-grade {service.title} services for businesses in {city.name}. {city.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                        <a href={`https://wa.me/918300290019?text=Hi, I need ${service.title} services in ${city.name}`} target="_blank" rel="noopener noreferrer">
                            <Button className="bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-xl">
                                Get Free Quote in {city.name} <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </a>
                        <a href={`tel:+918300290019`} className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors text-sm font-medium">
                            <Phone className="w-4 h-4" />
                            {city.phone}
                        </a>
                    </div>
                </div>
            </section>

            {/* Trust bar */}
            <div className="bg-slate-50 border-b border-slate-200">
                <div className="container mx-auto px-4 max-w-5xl py-4">
                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-slate-500">
                        {[
                            "✓ 30-Day Delivery Guarantee",
                            "✓ 99.9% Uptime SLA",
                            "✓ Serving " + city.name + " & Pan India",
                            "✓ Free Initial Consultation",
                            "✓ No Hidden Fees"
                        ].map((item) => (
                            <span key={item} className="font-medium">{item}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 max-w-5xl py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Why Infygru in City */}
                        <div>
                            <h2 className="font-heading text-2xl font-extrabold text-slate-900 mb-5 tracking-tight">
                                Why Choose Infygru for {service.title} in {city.name}?
                            </h2>
                            <div className="space-y-4 text-slate-600 leading-relaxed">
                                <p className="font-medium text-slate-800">{service.longDescription}</p>
                                <p>
                                    Businesses in {city.name} trust Infygru because we combine enterprise-grade technical depth with a local understanding of the Indian market. Whether you are a startup in {city.landmarks[0]} or an established enterprise in {city.landmarks[1]}, our {service.title} team delivers solutions that are architected for Indian regulatory requirements, Indian payment gateways, Indian languages, and the specific infrastructure realities of operating in {city.state}.
                                </p>
                                <p>
                                    Our remote-first delivery model means {city.name}-based clients receive the same quality and responsiveness as our Chennai headquarters clients. Video standups, shared project management boards, and our 24-hour response SLA ensure you are never out of the loop. We have successfully delivered {service.title} projects for clients in {city.landmarks.slice(0, 3).join(", ")}, and across {city.state}.
                                </p>
                            </div>
                        </div>

                        {/* Features */}
                        <div>
                            <h2 className="font-heading text-2xl font-extrabold text-slate-900 mb-6 tracking-tight">
                                {service.title} Services We Offer in {city.name}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {service.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-200 hover:bg-amber-50/30 transition-all">
                                        <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                        <span className="text-slate-800 font-medium text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Local areas served */}
                        <div>
                            <h2 className="font-heading text-xl font-extrabold text-slate-900 mb-4 tracking-tight">
                                Areas We Serve in {city.name}
                            </h2>
                            <p className="text-slate-500 text-sm mb-4">
                                We provide {service.title} services across all major business districts and areas in {city.name}:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {city.landmarks.map((area) => (
                                    <span key={area} className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-100 text-amber-800 font-medium">
                                        <MapPin className="w-3 h-3" />
                                        {area}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* FAQ */}
                        <div className="border-t border-slate-100 pt-8">
                            <h2 className="font-heading text-2xl font-extrabold text-slate-900 mb-6 tracking-tight">
                                Frequently Asked Questions — {service.title} in {city.name}
                            </h2>
                            <div className="space-y-4">
                                {[
                                    {
                                        question: `Do you provide ${service.title} services in ${city.name}?`,
                                        answer: `Yes, Infygru provides ${service.title} services across all of ${city.name} including ${city.landmarks.join(", ")}. Our remote-first delivery model ensures full service quality regardless of your exact location.`,
                                    },
                                    {
                                        question: `What is the cost of ${service.title} in ${city.name}?`,
                                        answer: `Pricing starts from ₹14,999 for smaller ${service.title} engagements. Enterprise projects are custom-scoped based on complexity, timeline, and team size. Contact us for a free, no-obligation quote.`,
                                    },
                                    ...(service.faqs || []),
                                ].map((faq, idx) => (
                                    <div key={idx} className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6">
                                        <h3 className="text-slate-900 font-bold text-base mb-3">{faq.question}</h3>
                                        <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* CTA */}
                        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                            <div className="flex items-center gap-2 mb-3">
                                <MapPin className="w-4 h-4 text-amber-600" />
                                <span className="text-amber-700 font-bold text-sm">{city.name}, {city.state}</span>
                            </div>
                            <h3 className="font-heading text-base font-bold text-slate-900 mb-2">
                                Get a Free {service.title} Consultation
                            </h3>
                            <p className="text-slate-600 text-sm mb-5 leading-relaxed">
                                Our experts will assess your requirements and provide a detailed proposal within 24 hours.
                            </p>
                            <a href={`https://wa.me/918300290019?text=Hi, I need ${service.title} services in ${city.name}`} target="_blank" rel="noopener noreferrer">
                                <Button size="sm" className="w-full font-bold bg-amber-500 hover:bg-amber-400 text-white rounded-xl shadow-md hover:-translate-y-0.5 transition-all mb-3">
                                    WhatsApp Consultation
                                </Button>
                            </a>
                            <a href="tel:+918300290019" className="flex items-center justify-center gap-2 text-sm font-medium text-slate-700 hover:text-amber-600 transition-colors">
                                <Phone className="w-4 h-4" />
                                +91-83002-90019
                            </a>
                        </div>

                        {/* Benefits */}
                        {service.benefits && (
                            <div className="bg-slate-950 rounded-2xl p-6 text-white">
                                <h3 className="font-heading text-base font-bold mb-4 flex items-center gap-2">
                                    <Star className="w-4 h-4 text-amber-400" />
                                    Key Benefits
                                </h3>
                                <ul className="space-y-3">
                                    {service.benefits.map((b: string, i: number) => (
                                        <li key={i} className="flex items-center gap-2.5 text-sm text-slate-300">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Other cities */}
                        <div>
                            <h3 className="font-heading text-sm font-bold text-slate-900 mb-4 uppercase tracking-widest">
                                Also Serving
                            </h3>
                            <div className="space-y-2">
                                {otherCities.map((c) => (
                                    <Link
                                        key={c.slug}
                                        href={`/services/${slug}/${c.slug}`}
                                        className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-amber-200 hover:bg-amber-50 transition-all group"
                                    >
                                        <MapPin className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-500 transition-colors shrink-0" />
                                        <span className="text-sm font-medium text-slate-700 group-hover:text-amber-700 transition-colors">
                                            {service.title} in {c.name}
                                        </span>
                                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-500 ml-auto transition-colors" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* View main service */}
                        <div className="text-center">
                            <Link href={`/services/${slug}`} className="text-sm text-amber-600 hover:text-amber-500 font-medium transition-colors">
                                View full {service.title} service page →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Band */}
            <section className="py-16 bg-slate-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]" />
                <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
                    <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
                        Start Your {service.title} Project in {city.name}
                    </h2>
                    <p className="text-slate-400 mb-8 font-light max-w-xl mx-auto">
                        Join businesses across {city.name} scaling with Infygru. Schedule a free consultation today — no commitment required.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a href={`https://wa.me/918300290019?text=Hi, I need ${service.title} services in ${city.name}`} target="_blank" rel="noopener noreferrer">
                            <Button size="lg" className="font-heading font-extrabold h-13 px-8 text-base shadow-xl hover:-translate-y-1 transition-transform bg-amber-500 hover:bg-amber-400 text-white rounded-xl">
                                Get Free Consultation <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </a>
                        <Link href="/pricing">
                            <Button size="lg" variant="outline" className="font-heading font-bold h-13 px-8 text-base border-white/20 text-white hover:bg-white/10 rounded-xl">
                                View Pricing
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
