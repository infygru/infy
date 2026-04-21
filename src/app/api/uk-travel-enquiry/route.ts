import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "https://api.infygru.com";

async function saveLeadToDirectus(lead: {
  name: string;
  email: string;
  phone: string;
  company: string;
  source: string;
}) {
  try {
    const res = await fetch(`${DIRECTUS_URL}/items/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        service_interest: "UK Travel Platform",
        source: lead.source,
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("Directus lead save failed:", err);
    }
  } catch (err) {
    console.error("Directus lead save error:", err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, company } = await req.json();

    if (!name || !email || !phone || !company) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // Always save lead to Directus CRM first (critical — must not lose lead)
    await saveLeadToDirectus({
      name,
      email,
      phone,
      company,
      source: "UK Travel Platform Landing Page",
    });

    // Send email notification (best-effort — don't fail the request if email fails)
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
          from: `"UK Travel Platform Enquiry" <${process.env.GMAIL_USER}>`,
          to: "infygru@gmail.com",
          subject: `New Enquiry: ${company} — ${name}`,
          html: `
            <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:24px;background:#f8fafc;border-radius:12px">
              <h2 style="color:#1e3a8a;margin-bottom:6px">New UK Travel Platform Enquiry</h2>
              <p style="color:#64748b;font-size:13px;margin-top:0">Submitted via uk-travel-platform landing page</p>
              <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0"/>
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:8px 0;color:#64748b;font-size:13px;width:140px">Name</td><td style="padding:8px 0;font-weight:600;color:#0f172a">${name}</td></tr>
                <tr><td style="padding:8px 0;color:#64748b;font-size:13px">Email</td><td style="padding:8px 0;font-weight:600;color:#0f172a"><a href="mailto:${email}" style="color:#2563eb">${email}</a></td></tr>
                <tr><td style="padding:8px 0;color:#64748b;font-size:13px">Phone</td><td style="padding:8px 0;font-weight:600;color:#0f172a"><a href="tel:${phone}" style="color:#2563eb">${phone}</a></td></tr>
                <tr><td style="padding:8px 0;color:#64748b;font-size:13px">Company</td><td style="padding:8px 0;font-weight:600;color:#0f172a">${company}</td></tr>
              </table>
              <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0"/>
              <p style="font-size:12px;color:#94a3b8;margin:0">Reply directly to <a href="mailto:${email}" style="color:#2563eb">${email}</a> to respond.</p>
            </div>
          `,
          replyTo: email,
        });
      } catch (emailErr) {
        // Log but don't fail — lead is already saved in Directus
        console.error("Enquiry email error (non-fatal):", emailErr);
      }
    } else {
      console.warn("GMAIL_USER/GMAIL_APP_PASSWORD not set — email notification skipped. Lead saved to Directus.");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Enquiry handler error:", err);
    return NextResponse.json({ error: "Failed to process enquiry." }, { status: 500 });
  }
}
