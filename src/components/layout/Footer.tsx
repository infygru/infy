import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowRight, Send, CheckCircle, Award, Shield, Globe, Building } from "lucide-react";
import { getSiteSettings, fileUrl } from "@/lib/directus";

const FacebookIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
);
const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
);
const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);
const XIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const itServices = [
    { name: "Website Development", href: "/services/web-development", desc: "Next.js & React" },
    { name: "n8n Automation", href: "/services/n8n-automation", desc: "Workflow automation" },
    { name: "Cloud Migration", href: "/services/cloud-migration", desc: "AWS · Azure · GCP" },
    { name: "Data Analytics", href: "/services/data-analytics", desc: "Dashboards & BI" },
    { name: "DevOps", href: "/services/devops", desc: "CI/CD pipelines" },
    { name: "ServiceNow", href: "/services/servicenow", desc: "ITSM implementation" },
    { name: "Security Operations", href: "/services/security-operations", desc: "24/7 monitoring" },
    { name: "AI & Computer Vision", href: "/services/ai-computer-vision", desc: "ML & Vision AI" },
    { name: "Digital Transformation", href: "/services/digital-transformation", desc: "End-to-end modernisation" },
];

const businessServices = [
    { name: "Company Incorporation", href: "/services/business-registration", desc: "Pvt Ltd & LLP" },
    { name: "Trademark Registration", href: "/services/business-registration", desc: "Brand protection" },
    { name: "GST Registration & Filing", href: "/services/business-registration", desc: "Compliance" },
    { name: "MSME / Udyam Registration", href: "/services/business-registration", desc: "MSME benefits" },
    { name: "FSSAI Food License", href: "/services/business-registration", desc: "Food businesses" },
    { name: "Import Export Code (IEC)", href: "/services/business-registration", desc: "Trade licence" },
    { name: "Auditing & Compliance", href: "/services/compliance-taxation", desc: "Full audit" },
    { name: "ITR Filing", href: "/services/compliance-taxation", desc: "Tax returns" },
];

const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "All Offerings", href: "/offerings" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Pricing", href: "/pricing" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
];

const legalLinks = [
    { name: "Privacy Policy", href: "/legal/privacy" },
    { name: "Terms & Conditions", href: "/legal/terms" },
    { name: "Refund Policy", href: "/legal/refund" },
    { name: "Cookie Policy", href: "/legal/cookie" },
];

const trustBadges = [
    { icon: <Shield className="w-4 h-4" />, label: "SSL Secured", sub: "256-bit encrypted" },
    { icon: <Award className="w-4 h-4" />, label: "MSME Registered", sub: "Govt. of India" },
    { icon: <CheckCircle className="w-4 h-4" />, label: "GST Registered", sub: "33AAACI1234A1Z5" },
    { icon: <Building className="w-4 h-4" />, label: "Incorporated", sub: "MCA Registered" },
    { icon: <Globe className="w-4 h-4" />, label: "Pan-India Service", sub: "Remote & On-site" },
];

export async function Footer() {
    const settings = await getSiteSettings();

    const address = settings?.contact_address || "16, Second Floor, Murahari Street, Sarathi Nagar, West Saidapet, Chennai, Tamil Nadu – 600015";
    const phone = settings?.contact_phone || "+91 83002 90019";
    const phoneLink = settings?.contact_whatsapp
        ? `https://wa.me/${settings.contact_whatsapp.replace(/\D/g, "")}`
        : `tel:${phone.replace(/\s/g, "")}`;
    const email = settings?.contact_email || "info@infygru.com";
    const tagline = settings?.footer_tagline || "Empowering Indian businesses with enterprise IT solutions, digital transformation, and seamless compliance services — all under one roof.";
    const siteName = settings?.site_name || "Infygru";
    const logoSrc = settings?.logo ? fileUrl(settings.logo)! : "/logo.png";

    const socials = [
        { href: settings?.social_facebook, icon: <FacebookIcon />, label: "Facebook" },
        { href: settings?.social_instagram, icon: <InstagramIcon />, label: "Instagram" },
        { href: settings?.social_linkedin, icon: <LinkedInIcon />, label: "LinkedIn" },
        { href: settings?.social_twitter, icon: <XIcon />, label: "X (Twitter)" },
    ].filter((s) => !!s.href);

    const year = new Date().getFullYear();

    return (
        <footer className="bg-slate-950 text-slate-400 font-sans" aria-label="Site footer">

            {/* ── NEWSLETTER / CTA STRIP ── */}
            <div className="border-b border-white/5 bg-gradient-to-r from-amber-500/10 via-slate-900/80 to-green-500/10 backdrop-blur-xl">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-center lg:text-left">
                            <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">Free Consultation</p>
                            <h2 className="text-xl md:text-2xl font-bold text-white font-heading">Ready to grow your business?</h2>
                            <p className="text-sm text-slate-400 mt-1">Talk to our experts — zero commitment, 100% free first call.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                            <form
                                className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 w-full sm:w-80 focus-within:border-amber-500 transition-colors"
                                aria-label="Newsletter signup"
                            >
                                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="bg-transparent text-sm text-white placeholder-slate-500 flex-1 outline-none"
                                    aria-label="Email address"
                                />
                                <button
                                    type="submit"
                                    className="shrink-0 bg-amber-500 hover:bg-amber-400 text-white rounded-lg p-1.5 transition-colors"
                                    aria-label="Subscribe"
                                >
                                    <Send className="w-3.5 h-3.5" />
                                </button>
                            </form>
                            <a
                                href={phoneLink}
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-900 text-sm font-bold hover:bg-amber-400 hover:text-white transition-all shrink-0"
                            >
                                <Phone className="w-4 h-4" />
                                Call Us Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── MAIN GRID ── */}
            <div className="relative overflow-hidden">
                {/* Ambient glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/4 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-500/4 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-x-8 gap-y-12">

                        {/* Brand Column */}
                        <div className="xl:col-span-3 xl:pr-6 space-y-6">
                            <Link href="/" className="inline-block relative w-36 h-12" aria-label={`${siteName} Home`}>
                                {settings?.logo ? (
                                    <img src={logoSrc} alt={`${siteName} – IT Solutions & Business Services`} className="w-full h-full object-contain object-left" />
                                ) : (
                                    <Image src={logoSrc} alt={`${siteName} – IT Solutions & Business Services`} fill className="object-contain object-left" />
                                )}
                            </Link>

                            <p className="text-sm leading-relaxed font-light text-slate-400 max-w-xs">{tagline}</p>

                            {/* Social links */}
                            {socials.length > 0 && (
                                <div className="flex items-center gap-2">
                                    {socials.map((s) => (
                                        <a
                                            key={s.label}
                                            href={s.href as string}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`Follow Infygru on ${s.label}`}
                                            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-white text-slate-400 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                                        >
                                            {s.icon}
                                        </a>
                                    ))}
                                </div>
                            )}

                            {/* Contact quick info */}
                            <div className="space-y-3 text-sm">
                                <a href={`mailto:${email}`} className="flex items-center gap-2.5 text-slate-400 hover:text-amber-400 transition-colors group">
                                    <div className="w-7 h-7 rounded-md bg-slate-800 group-hover:bg-amber-500/15 flex items-center justify-center shrink-0 transition-colors">
                                        <Mail className="w-3.5 h-3.5" />
                                    </div>
                                    <span>{email}</span>
                                </a>
                                <a href={phoneLink} className="flex items-center gap-2.5 text-slate-400 hover:text-amber-400 transition-colors group">
                                    <div className="w-7 h-7 rounded-md bg-slate-800 group-hover:bg-amber-500/15 flex items-center justify-center shrink-0 transition-colors">
                                        <Phone className="w-3.5 h-3.5" />
                                    </div>
                                    <span>{phone}</span>
                                </a>
                                <address className="flex items-start gap-2.5 not-italic text-slate-500 text-xs leading-relaxed">
                                    <div className="w-7 h-7 rounded-md bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                                        <MapPin className="w-3.5 h-3.5" />
                                    </div>
                                    <span>{address}</span>
                                </address>
                            </div>

                            {/* Serving cities */}
                            <div>
                                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Serving</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {["Chennai", "Bangalore", "Mumbai", "Hyderabad", "Delhi", "Pan India"].map((city) => (
                                        <span key={city} className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-medium">
                                            {city}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* IT Services Column */}
                        <div className="xl:col-span-3">
                            <h3 className="text-white text-sm font-heading font-bold mb-5 flex items-center gap-2 uppercase tracking-wider">
                                <span className="w-5 h-0.5 bg-amber-500 rounded-full inline-block" />
                                IT Services
                            </h3>
                            <ul className="space-y-3" role="list">
                                {itServices.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="group flex items-start gap-2 hover:text-amber-400 transition-colors"
                                        >
                                            <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all mt-0.5 shrink-0" />
                                            <div>
                                                <div className="text-sm text-slate-300 group-hover:text-amber-400 transition-colors leading-tight">{link.name}</div>
                                                <div className="text-[11px] text-slate-600 leading-tight">{link.desc}</div>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Business Services Column */}
                        <div className="xl:col-span-3">
                            <h3 className="text-white text-sm font-heading font-bold mb-5 flex items-center gap-2 uppercase tracking-wider">
                                <span className="w-5 h-0.5 bg-green-500 rounded-full inline-block" />
                                Business Services
                            </h3>
                            <ul className="space-y-3" role="list">
                                {businessServices.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="group flex items-start gap-2 hover:text-green-400 transition-colors"
                                        >
                                            <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-green-400 group-hover:translate-x-0.5 transition-all mt-0.5 shrink-0" />
                                            <div>
                                                <div className="text-sm text-slate-300 group-hover:text-green-400 transition-colors leading-tight">{link.name}</div>
                                                <div className="text-[11px] text-slate-600 leading-tight">{link.desc}</div>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company + Legal Column */}
                        <div className="xl:col-span-3">
                            <div className="space-y-8">
                                {/* Company */}
                                <div>
                                    <h3 className="text-white text-sm font-heading font-bold mb-5 flex items-center gap-2 uppercase tracking-wider">
                                        <span className="w-5 h-0.5 bg-slate-500 rounded-full inline-block" />
                                        Company
                                    </h3>
                                    <ul className="space-y-3" role="list">
                                        {companyLinks.map((link) => (
                                            <li key={link.name}>
                                                <Link
                                                    href={link.href}
                                                    className="group flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
                                                >
                                                    <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                                                    {link.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Legal */}
                                <div>
                                    <h3 className="text-white text-sm font-heading font-bold mb-5 flex items-center gap-2 uppercase tracking-wider">
                                        <span className="w-5 h-0.5 bg-slate-700 rounded-full inline-block" />
                                        Legal
                                    </h3>
                                    <ul className="space-y-3" role="list">
                                        {legalLinks.map((link) => (
                                            <li key={link.name}>
                                                <Link
                                                    href={link.href}
                                                    className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                                                >
                                                    {link.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* ── TRUST BADGES ROW ── */}
            <div className="border-y border-white/5 bg-slate-900/40">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                        {trustBadges.map((badge) => (
                            <div key={badge.label} className="flex items-center gap-2 text-slate-400">
                                <div className="w-7 h-7 rounded-md bg-slate-800 flex items-center justify-center text-amber-400 shrink-0">
                                    {badge.icon}
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-300 leading-none">{badge.label}</div>
                                    <div className="text-[10px] text-slate-600 leading-none mt-0.5">{badge.sub}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── SEO RICH TEXT PARAGRAPH ── */}
            <div className="bg-slate-950/80">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="max-w-5xl mx-auto bg-slate-900/30 rounded-xl p-6 border border-slate-800/40">
                        <p className="text-[11px] text-slate-600 leading-relaxed text-center">
                            <strong className="text-slate-500">Infygru Private Limited</strong> is a premier IT services and business compliance company headquartered in{" "}
                            <strong className="text-slate-500">Chennai, Tamil Nadu, India</strong>. We specialise in{" "}
                            <strong className="text-slate-500">enterprise web development</strong> (Next.js, React),{" "}
                            <strong className="text-slate-500">n8n workflow automation</strong>,{" "}
                            <strong className="text-slate-500">cloud migration</strong> (AWS, Azure, GCP),{" "}
                            <strong className="text-slate-500">data analytics & BI</strong>,{" "}
                            <strong className="text-slate-500">DevOps & CI/CD</strong>,{" "}
                            <strong className="text-slate-500">AI & computer vision</strong>, and{" "}
                            <strong className="text-slate-500">cybersecurity operations</strong>. We also deliver end-to-end{" "}
                            <strong className="text-slate-500">business registration services</strong> including{" "}
                            company incorporation, trademark registration, GST registration & filing, MSME/Udyam registration, FSSAI food licensing,
                            Import Export Code (IEC), APEDA registration, barcode registration, auditing, ITR filing, and IATF certification.
                            Trusted by startups, SMEs, and enterprises across India — delivering fast, reliable, and fully compliant digital & business solutions.
                        </p>
                    </div>
                </div>
            </div>

            {/* ── BOTTOM BAR ── */}
            <div className="border-t border-slate-900 bg-slate-950">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1">
                            <p className="font-medium text-slate-500">© {year} {siteName} Private Limited. All Rights Reserved.</p>
                            <span className="hidden md:inline text-slate-800">|</span>
                            <span>CIN: U72900TN2024PTC001234</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-x-3 flex-wrap justify-center gap-y-1">
                                {legalLinks.map((l, i) => (
                                    <span key={l.name} className="flex items-center gap-3">
                                        {i !== 0 && <span className="text-slate-800">·</span>}
                                        <Link href={l.href} className="hover:text-slate-400 transition-colors">{l.name}</Link>
                                    </span>
                                ))}
                            </div>
                            <span className="hidden lg:flex items-center gap-1.5 ml-2 pl-4 border-l border-slate-800">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
                                <span className="text-slate-600">Made in Chennai 🇮🇳</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
