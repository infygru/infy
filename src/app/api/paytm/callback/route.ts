import { NextRequest, NextResponse } from "next/server";
import PaytmChecksum from "paytmchecksum";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const params: Record<string, string> = {};

        formData.forEach((value, key) => {
            params[key] = value.toString();
        });

        console.log("PAYTM CALLBACK PARAMS:", params);

        const merchantKey = process.env.PAYTM_MERCHANT_KEY || "nCVLn3KyVJOoLb3&";
        const paytmChecksum = params["CHECKSUMHASH"];
        delete params["CHECKSUMHASH"];

        const isVerified = PaytmChecksum.verifySignature(params, merchantKey, paytmChecksum);

        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
        const orderId = params["ORDERID"] || "";
        const txnId = params["TXNID"] || "";
        const status = params["STATUS"] || "";
        const amount = params["TXNAMOUNT"] || "";

        if (isVerified && status === "TXN_SUCCESS") {
            const successUrl = new URL(`${siteUrl}/payment-success`);
            successUrl.searchParams.set("orderId", orderId);
            successUrl.searchParams.set("txnId", txnId);
            successUrl.searchParams.set("amount", amount);
            return NextResponse.redirect(successUrl.toString());
        } else {
            const failUrl = new URL(`${siteUrl}/payment-failed`);
            failUrl.searchParams.set("orderId", orderId);
            failUrl.searchParams.set("msg", params["RESPMSG"] || "Payment failed");
            return NextResponse.redirect(failUrl.toString());
        }
    } catch (error) {
        console.error("Paytm callback error:", error);
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
        return NextResponse.redirect(`${siteUrl}/payment-failed`);
    }
}

// Paytm sometimes sends GET for verification
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("STATUS") || "";
    const orderId = searchParams.get("ORDERID") || "";
    const txnId = searchParams.get("TXNID") || "";
    const amount = searchParams.get("TXNAMOUNT") || "";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    if (status === "TXN_SUCCESS") {
        const successUrl = new URL(`${siteUrl}/payment-success`);
        successUrl.searchParams.set("orderId", orderId);
        successUrl.searchParams.set("txnId", txnId);
        successUrl.searchParams.set("amount", amount);
        return NextResponse.redirect(successUrl.toString());
    }

    return NextResponse.redirect(`${siteUrl}/payment-failed`);
}
