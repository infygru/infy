import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "https://api.infygru.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, company, service, message } = body;

    if (!firstName || !email || !service || !message) {
      return NextResponse.json({ error: "Required fields missing." }, { status: 400 });
    }

    const name = `${firstName} ${lastName}`.trim();

    // 1. Save lead to Directus CRM (primary — must not fail silently)
    const directusRes = await fetch(`${DIRECTUS_URL}/items/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone: phone || null,
        company: company || null,
        service_interest: service,
        message,
        source: "Website Contact Form",
      }),
    });

    if (!directusRes.ok) {
      const err = await directusRes.json().catch(() => ({}));
      const msg = err?.errors?.[0]?.message || "CRM submission failed";
      console.error("Directus lead error:", err);
      return NextResponse.json({ error: msg }, { status: 500 });
    }

    // 2. Send email notification to team (best-effort)
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        });

        await transporter.sendMail({
          from: `"Infygru Website" <${process.env.GMAIL_USER}>`,
          to: process.env.GMAIL_USER,
          subject: `New Lead: ${name} — ${service}`,
          replyTo: email,
          html: `
            <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:28px;background:#f8fafc;border-radius:12px">
              <h2 style="color:#1e3a8a;margin-bottom:4px">New Contact Form Submission</h2>
              <p style="color:#64748b;font-size:13px;margin-top:0">From infygru.com contact page</p>
              <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0"/>
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:7px 0;color:#64748b;font-size:13px;width:140px">Name</td><td style="padding:7px 0;font-weight:600;color:#0f172a">${name}</td></tr>
                <tr><td style="padding:7px 0;color:#64748b;font-size:13px">Email</td><td style="padding:7px 0;font-weight:600;color:#0f172a"><a href="mailto:${email}" style="color:#2563eb">${email}</a></td></tr>
                <tr><td style="padding:7px 0;color:#64748b;font-size:13px">Phone</td><td style="padding:7px 0;font-weight:600;color:#0f172a">${phone || "—"}</td></tr>
                <tr><td style="padding:7px 0;color:#64748b;font-size:13px">Company</td><td style="padding:7px 0;font-weight:600;color:#0f172a">${company || "—"}</td></tr>
                <tr><td style="padding:7px 0;color:#64748b;font-size:13px">Service</td><td style="padding:7px 0;font-weight:600;color:#2563eb">${service}</td></tr>
              </table>
              <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0"/>
              <p style="color:#0f172a;font-size:14px;line-height:1.6;background:#fff;padding:14px;border-radius:8px;border:1px solid #e2e8f0">${message}</p>
              <p style="font-size:12px;color:#94a3b8;margin-top:16px">Hit reply to respond directly to ${email}</p>
            </div>
          `,
        });
      } catch (emailErr) {
        // Non-fatal — lead is already in Directus
        console.error("Contact email notification error (non-fatal):", emailErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
