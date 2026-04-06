"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId") || "";
    const txnId = searchParams.get("txnId") || "";
    const amount = searchParams.get("amount") || "";

    const formattedAmount = amount
        ? `₹${parseFloat(amount).toLocaleString("en-IN")}`
        : "";

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-10 md:p-16 max-w-lg w-full text-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mx-auto mb-8">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>

                <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                    Payment Successful!
                </h1>
                <p className="text-slate-500 font-light text-lg mb-8 leading-relaxed">
                    Thank you for your order. Our team will reach out to you within 24 hours to kick off your project.
                </p>

                {(orderId || txnId || formattedAmount) && (
                    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 mb-8 text-left space-y-3">
                        {formattedAmount && (
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 font-medium">Amount Paid</span>
                                <span className="font-bold text-slate-900">{formattedAmount}</span>
                            </div>
                        )}
                        {orderId && (
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 font-medium">Order ID</span>
                                <span className="font-mono text-slate-700 text-xs">{orderId}</span>
                            </div>
                        )}
                        {txnId && (
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 font-medium">Transaction ID</span>
                                <span className="font-mono text-slate-700 text-xs">{txnId}</span>
                            </div>
                        )}
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/" className="flex-1">
                        <Button variant="outline" className="w-full h-12 font-heading font-bold border-slate-200">
                            Back to Home
                        </Button>
                    </Link>
                    <Link href="/contact" className="flex-1">
                        <Button className="w-full h-12 font-heading font-bold">
                            Contact Us <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function PaymentSuccess() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 font-heading animate-pulse">Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
