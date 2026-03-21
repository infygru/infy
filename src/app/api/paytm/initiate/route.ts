import { NextResponse } from "next/server";
import PaytmChecksum from "paytmchecksum";

const PLAN_AMOUNTS: Record<string, string> = {
    // IT & Cloud Services
    "starter": "14999.00",
    "professional": "49999.00",
    // Business Registration & Licensing
    "biz-basic": "2499.00",
    "biz-growth": "7999.00",
    // Compliance & Taxation
    "tax-individual": "999.00",
    "tax-business": "4999.00",
};

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { plan, customerInfo } = body;

        const amount = PLAN_AMOUNTS[plan];
        if (!amount) {
            return NextResponse.json({ error: "Invalid plan selected" }, { status: 400 });
        }

        const mid = process.env.PAYTM_MID || "XVTaon26026633479601";
        const merchantKey = process.env.PAYTM_MERCHANT_KEY || "nCVLn3KyVJOoLb3&";
        const orderId = `ORDER_${Date.now()}`;
        const website = process.env.PAYTM_WEBSITE || "DEFAULT";
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

        const paytmParams = {
            body: {
                requestType: "Payment",
                mid,
                websiteName: website,
                orderId,
                callbackUrl: `${siteUrl}/api/paytm/callback`,
                txnAmount: {
                    value: amount,
                    currency: "INR",
                },
                userInfo: {
                    custId: `CUST_${Date.now()}`,
                    email: customerInfo?.email || "",
                    mobile: customerInfo?.phone || "",
                    firstName: customerInfo?.firstName || "",
                    lastName: customerInfo?.lastName || "",
                },
            },
        };

        const signature = await PaytmChecksum.generateSignature(
            JSON.stringify(paytmParams.body),
            merchantKey
        );

        const requestData = {
            ...paytmParams,
            head: { signature },
        };

        console.log("PAYTM INITIATE REQ:", JSON.stringify(requestData, null, 2));

        const response = await fetch(
            `https://securegw.paytm.in/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`,
            {
                method: "POST",
                cache: "no-store",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            }
        );

        const textResponse = await response.text();
        console.log("PAYTM RAW RESPONSE:", textResponse);

        let data;
        try {
            data = JSON.parse(textResponse);
        } catch {
            console.error("Failed to parse Paytm response", textResponse);
            return NextResponse.json(
                { error: "Invalid response from Payment Gateway" },
                { status: 500 }
            );
        }

        if (data?.body?.resultInfo?.resultStatus === "S") {
            return NextResponse.json({
                txnToken: data.body.txnToken,
                orderId,
                amount,
                mid,
            });
        } else {
            console.error("Paytm init error:", data);
            return NextResponse.json(
                { error: data?.body?.resultInfo?.resultMsg || "Payment gateway error" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Paytm initiate error:", error);
        return NextResponse.json({ error: "Failed to initiate payment" }, { status: 500 });
    }
}
