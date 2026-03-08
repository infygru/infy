import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

// Simple inline SVG icons for social platforms
const FacebookIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
);
const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
);
const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);
const XIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

export function Footer() {
    return (
        <footer className="bg-slate-950 pt-20 pb-10 mt-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block relative w-40 h-14 bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-white/10">
                            <Image
                                src="/logo.png"
                                alt="Infygru Logo"
                                fill
                                className="object-contain p-1"
                            />
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed pr-4 font-light">
                            Empowering Your Business with Innovative Solutions. A leading provider of IT services and digital transformation.
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                            {[
                                { href: "https://facebook.com/infygru", icon: <FacebookIcon />, label: "Facebook" },
                                { href: "https://instagram.com/infygru", icon: <InstagramIcon />, label: "Instagram" },
                                { href: "https://linkedin.com/company/infygru", icon: <LinkedInIcon />, label: "LinkedIn" },
                                { href: "https://x.com/infygru", icon: <XIcon />, label: "X" },
                            ].map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-primary hover:text-white text-slate-400 flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-primary"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Useful Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white tracking-wide">Useful Links</h3>
                        <ul className="space-y-3">
                            {[
                                { name: "About Us", href: "/about" },
                                { name: "Offerings", href: "/offerings" },
                                { name: "Careers", href: "/careers" },
                                { name: "Pricing", href: "/pricing" },
                                { name: "Contact Us", href: "/contact" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm font-light text-slate-400 hover:text-primary hover:translate-x-1 block transition-all">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white tracking-wide">Legal</h3>
                        <ul className="space-y-3">
                            {[
                                { name: "Terms & Conditions", href: "/legal/terms" },
                                { name: "Privacy Policy", href: "/legal/privacy" },
                                { name: "Cookie Policy", href: "/legal/cookie" },
                                { name: "Refund Policy", href: "/legal/refund" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm font-light text-slate-400 hover:text-primary hover:translate-x-1 block transition-all">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white tracking-wide">Reach Us</h3>
                        <ul className="space-y-5">
                            <li className="flex items-start space-x-3 text-sm font-light text-slate-400">
                                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <span className="leading-snug">16, Second Floor, Murahari street, Sarathi Nagar, West Saidapet, Chennai, Tamilnadu – 600015.</span>
                            </li>
                            <li className="flex items-center space-x-3 text-sm font-light text-slate-400">
                                <Phone className="w-5 h-5 text-primary shrink-0" />
                                <a href="tel:+918300290019" className="hover:text-white transition-colors">+91 8300290019</a>
                            </li>
                            <li className="flex items-center space-x-3 text-sm font-light text-slate-400">
                                <Mail className="w-5 h-5 text-primary shrink-0" />
                                <a href="mailto:info@infygru.com" className="hover:text-white transition-colors">info@infygru.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-light text-slate-500">
                    <p>© {new Date().getFullYear()} Infygru Private Limited. All Rights Reserved.</p>
                    <div className="flex gap-4">
                        <span className="text-xs tracking-widest uppercase font-bold text-slate-600">Transforming Ideas</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
