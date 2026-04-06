import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, company } = await req.json();

    if (!name || !email || !phone || !company) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

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

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Enquiry email error:", err);
    return NextResponse.json({ error: "Failed to send enquiry." }, { status: 500 });
  }
}
