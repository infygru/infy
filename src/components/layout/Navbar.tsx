"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Offerings", href: "/offerings" },
    {
        name: "Services",
        href: "#",
        dropdown: [
            { name: "Website Development", href: "/services/web-development" },
            { name: "n8n Automation", href: "/services/n8n-automation" },
            { name: "Business Registration", href: "/services/business-registration" },
            { name: "Compliance & Taxation", href: "/services/compliance-taxation" },
        ],
    },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
        setOpenDropdown(null);
    }, [pathname]);

    return (
        <motion.nav
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${
                scrolled
                    ? "bg-white/95 backdrop-blur-lg shadow-md shadow-slate-200/60 border-b border-slate-200/60"
                    : "bg-white/80 backdrop-blur-md border-b border-transparent"
            }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}>
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center gap-2">
                            <div className={`relative transition-all duration-300 ${scrolled ? "w-28 h-9" : "w-36 h-12"}`}>
                                <Image
                                    src="/logo.png"
                                    alt="Infygru Logo"
                                    fill
                                    sizes="(max-width: 768px) 112px, 144px"
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) =>
                            link.dropdown ? (
                                <div
                                    key={link.name}
                                    className="relative"
                                    onMouseEnter={() => setOpenDropdown(link.name)}
                                    onMouseLeave={() => setOpenDropdown(null)}
                                >
                                    <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-slate-700 hover:text-amber-600 hover:bg-amber-50 transition-all text-sm font-semibold tracking-wide">
                                        {link.name}
                                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === link.name ? "rotate-180" : ""}`} />
                                    </button>
                                    <AnimatePresence>
                                        {openDropdown === link.name && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                                                transition={{ duration: 0.18 }}
                                                className="absolute top-full left-0 mt-1.5 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden py-2"
                                            >
                                                {link.dropdown.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:text-amber-600 hover:bg-amber-50 transition-all"
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`px-4 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all ${
                                        pathname === link.href
                                            ? "text-amber-600 bg-amber-50"
                                            : "text-slate-700 hover:text-amber-600 hover:bg-amber-50"
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            )
                        )}

                        <a
                            href="https://wa.me/918300290019"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-3 bg-amber-500 text-white hover:bg-amber-400 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                        >
                            Schedule A Call
                        </a>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden inline-flex items-center justify-center p-2 rounded-xl text-slate-700 hover:text-amber-600 hover:bg-amber-50 transition-all"
                    >
                        <span className="sr-only">Open main menu</span>
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                    <X className="block h-6 w-6" />
                                </motion.div>
                            ) : (
                                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                    <Menu className="block h-6 w-6" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="md:hidden overflow-hidden border-t border-slate-100"
                    >
                        <div className="px-4 pt-3 pb-6 space-y-1 bg-white">
                            {navLinks.map((link) =>
                                link.dropdown ? (
                                    <div key={link.name}>
                                        <button
                                            onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                                            className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-base font-semibold text-slate-700 hover:text-amber-600 hover:bg-amber-50 transition-all"
                                        >
                                            {link.name}
                                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === link.name ? "rotate-180" : ""}`} />
                                        </button>
                                        <AnimatePresence>
                                            {openDropdown === link.name && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="overflow-hidden ml-4 mt-1 border-l-2 border-amber-200 pl-3 space-y-1"
                                                >
                                                    {link.dropdown.map((item) => (
                                                        <Link
                                                            key={item.name}
                                                            href={item.href}
                                                            onClick={() => setIsOpen(false)}
                                                            className="block py-2.5 text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors"
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`block px-3 py-3 rounded-xl text-base font-semibold transition-all ${
                                            pathname === link.href
                                                ? "text-amber-600 bg-amber-50"
                                                : "text-slate-700 hover:text-amber-600 hover:bg-amber-50"
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                )
                            )}
                            <div className="pt-3">
                                <a
                                    href="https://wa.me/918300290019"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full text-center bg-amber-500 text-white hover:bg-amber-400 px-4 py-3.5 rounded-xl text-base font-bold transition-all shadow-md"
                                >
                                    Schedule A Call
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
