import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "404 — Page Not Found | Infygru",
    description: "The page you're looking for doesn't exist. Explore Infygru's IT and business services.",
    robots: { index: false, follow: false },
};

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-4">
            <div className="max-w-xl">
                <p className="text-8xl font-extrabold text-primary font-heading mb-4">404</p>
                <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
                    Page Not Found
                </h1>
                <p className="text-muted-foreground text-lg mb-10 font-light">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors font-heading"
                    >
                        Back to Home
                    </Link>
                    <Link
                        href="/offerings"
                        className="inline-flex items-center justify-center px-8 py-3 border border-border text-foreground font-bold rounded-xl hover:bg-muted transition-colors font-heading"
                    >
                        View Services
                    </Link>
                </div>
            </div>
        </div>
    );
}
