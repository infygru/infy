"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { XCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

function FailedContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId") || "";
    const msg = searchParams.get("msg") || "Your payment could not be processed.";

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-10 md:p-16 max-w-lg w-full text-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mx-auto mb-8">
                    <XCircle className="w-10 h-10 text-red-600" />
                </div>

                <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                    Payment Failed
                </h1>
                <p className="text-slate-500 font-light text-lg mb-4 leading-relaxed">
                    {msg}
                </p>
                <p className="text-slate-400 text-sm mb-8">
                    No amount has been deducted. Please try again or contact our support team.
                </p>

                {orderId && (
                    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 mb-8 text-left">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500 font-medium">Order Reference</span>
                            <span className="font-mono text-slate-700 text-xs">{orderId}</span>
                        </div>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/pricing" className="flex-1">
                        <Button variant="outline" className="w-full h-12 font-heading font-bold border-slate-200">
                            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Pricing
                        </Button>
                    </Link>
                    <Link href="/contact" className="flex-1">
                        <Button className="w-full h-12 font-heading font-bold">
                            Get Help <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function PaymentFailed() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 font-heading animate-pulse">Loading...</div>}>
            <FailedContent />
        </Suspense>
    );
}
