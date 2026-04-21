"use client";

import { useState } from "react";
import { MessageCircle, Loader2, X, ArrowRight } from "lucide-react";

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "https://api.infygru.com";

type Props = {
  waNumber?: string;
  waMessage?: string;
  service?: string;
  label?: string;
  className?: string;
  children?: React.ReactNode;
};

export default function WhatsAppCTA({
  waNumber = "918300290019",
  waMessage,
  service = "General Enquiry",
  label = "Chat on WhatsApp",
  className = "",
  children,
}: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Save lead to Directus (best-effort)
    try {
      await fetch(`${DIRECTUS_URL}/items/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email || null,
          phone: form.phone || null,
          service_interest: service,
          source: "WhatsApp CTA",
        }),
      });
    } catch {
      // non-fatal — still open WhatsApp
    }

    setStatus("done");

    const text = waMessage || `Hi, I'm interested in ${service}. My name is ${form.name}.`;
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setOpen(false);
    setForm({ name: "", email: "", phone: "" });
    setStatus("idle");
  };

  return (
    <>
      {/* Trigger */}
      <button onClick={() => setOpen(true)} className={className}>
        {children ?? (
          <span className="inline-flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            {label}
          </span>
        )}
      </button>

      {/* Modal overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />

          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-7 z-10">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Quick Connect</h3>
                <p className="text-xs text-slate-500">We'll open WhatsApp right after</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  required
                  type="text"
                  placeholder="Your name *"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-green-500/30 outline-none text-sm text-slate-900 transition"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Work email (optional)"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-green-500/30 outline-none text-sm text-slate-900 transition"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone number (optional)"
                  value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-green-500/30 outline-none text-sm text-slate-900 transition"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-60 text-sm mt-1"
              >
                {status === "loading" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4" />
                    Open WhatsApp
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-xs text-slate-400 mt-3">
              We respect your privacy. No spam, ever.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
