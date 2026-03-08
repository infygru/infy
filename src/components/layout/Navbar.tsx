"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Offerings", href: "/offerings" },
        { name: "About Us", href: "/about" },
        { name: "Pricing", href: "/pricing" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md shadow-sm shadow-slate-200/50 border-b border-white/20 transition-all duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="relative w-36 h-12">
                                <Image
                                    src="/logo.png"
                                    alt="Infygru Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-foreground/80 hover:text-primary transition-colors text-sm font-bold tracking-wide"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="https://wa.me/918300290019"
                                className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md hover:shadow-lg"
                            >
                                Schedule A Call
                            </Link>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-secondary focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-7 w-7" /> : <Menu className="block h-7 w-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden border-t border-border">
                    <div className="px-4 pt-2 pb-6 space-y-1 bg-background shadow-xl">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="block px-3 py-3 rounded-md text-base font-bold text-foreground/80 hover:text-primary hover:bg-secondary"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="https://wa.me/918300290019"
                            className="block w-full text-center mt-6 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-3 rounded-lg text-base font-bold transition-all"
                        >
                            Schedule A Call
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
