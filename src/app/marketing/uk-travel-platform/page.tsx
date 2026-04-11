"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Loader2,
  Star,
  Globe,
  Calendar,
  CreditCard,
  Zap,
  TrendingUp,
  Users,
  BarChart3,
  ChevronDown,
  Mail,
  MapPin,
  Compass,
  Plane,
} from "lucide-react";

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   ENQUIRY FORM
───────────────────────────────────────────── */

function EnquiryForm({ id = "enquire", dark = false }: { id?: string; dark?: boolean }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/uk-travel-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", phone: "", company: "" });
    } catch {
      setStatus("error");
    }
  };

  const inp = dark
    ? "w-full px-4 py-3 rounded-xl bg-white/8 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#f4a261] focus:ring-1 focus:ring-[#f4a261]/30 transition-all"
    : "w-full px-4 py-3 rounded-xl bg-white border border-[#e8d5b0] text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#f4a261] focus:ring-1 focus:ring-[#f4a261]/30 transition-all";

  const lbl = dark
    ? "block text-[11px] font-bold text-white/40 uppercase tracking-widest mb-1.5"
    : "block text-[11px] font-bold text-[#92400e]/60 uppercase tracking-widest mb-1.5";

  if (status === "success") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
        <div className="text-5xl mb-4">✈️</div>
        <h3 className={`text-xl font-bold mb-2 ${dark ? "text-white" : "text-slate-900"}`}>
          You&apos;re on the runway!
        </h3>
        <p className={`text-sm ${dark ? "text-white/50" : "text-slate-500"}`}>
          We&apos;ll be in touch within 24 hours to plan your platform.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} id={id} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={lbl}>Your Name</label>
          <input name="name" type="text" required value={form.name} onChange={onChange} placeholder="John Smith" className={inp} />
        </div>
        <div>
          <label className={lbl}>Agency / Company</label>
          <input name="company" type="text" required value={form.company} onChange={onChange} placeholder="Smith Travel Ltd" className={inp} />
        </div>
        <div>
          <label className={lbl}>Email Address</label>
          <input name="email" type="email" required value={form.email} onChange={onChange} placeholder="john@smithtravel.co.uk" className={inp} />
        </div>
        <div>
          <label className={lbl}>Phone Number</label>
          <input name="phone" type="tel" required value={form.phone} onChange={onChange} placeholder="+44 7700 900000" className={inp} />
        </div>
      </div>

      {status === "error" && (
        <p className={`text-xs font-medium ${dark ? "text-red-300" : "text-red-500"}`}>
          Something went wrong. Email us at infygru@gmail.com
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2.5 font-bold text-sm py-4 rounded-xl transition-all duration-200 disabled:opacity-60 text-[#020810]"
        style={{ background: "linear-gradient(135deg, #f4a261 0%, #e76f51 100%)", boxShadow: "0 8px 28px rgba(244,162,97,0.45)" }}
      >
        {status === "loading" ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
        ) : (
          <><Plane className="w-4 h-4" /> Get My Free Consultation</>
        )}
      </button>

      <p className={`text-center text-xs ${dark ? "text-white/30" : "text-slate-400"}`}>
        Free 30-min call · No commitment · Reply within 24 hours
      </p>
    </form>
  );
}

/* ─────────────────────────────────────────────
   FAQ ITEM
───────────────────────────────────────────── */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#e8d5b0]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="font-semibold text-[#1a0a00] text-[15px] group-hover:text-[#c2500a] transition-colors">{q}</span>
        <ChevronDown className={`w-5 h-5 text-[#f4a261] flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="faq"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-[#5a3e28] text-sm leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   AIRPLANE SVG
───────────────────────────────────────────── */

function AirplaneSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 50 L45 35 L55 5 L65 35 L90 50 L65 55 L62 75 L50 70 L38 75 L35 55 Z" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const FEATURES = [
  { icon: Globe,       grad: "from-[#0077b6] to-[#023e8a]", dest: "Maldives 🏝",      title: "Bespoke Travel Website",   desc: "A fully custom, fast, mobile-optimised website built around your brand — not a generic template your competitors also use." },
  { icon: Calendar,    grad: "from-[#e76f51] to-[#c1440e]", dest: "Santorini 🌅",      title: "Online Booking System",    desc: "Clients search, customise, and book holidays directly on your site. Availability and confirmations handled automatically." },
  { icon: CreditCard,  grad: "from-[#2d6a4f] to-[#1b4332]", dest: "Bali 🌿",           title: "Secure Online Payments",   desc: "Take deposits and full payments online. Stripe-powered with automatic receipts and booking confirmation emails." },
  { icon: Users,       grad: "from-[#5e60ce] to-[#3a0ca3]", dest: "Northern Lights 🌌", title: "Built-in CRM",             desc: "Every lead, enquiry, and client in one place. Full contact history, notes, and status — no more spreadsheets." },
  { icon: TrendingUp,  grad: "from-[#e9c46a] to-[#d4850a]", dest: "Safari 🦁",          title: "Sales Pipeline",           desc: "Track every lead from first enquiry to confirmed booking. See exactly where deals stand and what needs following up." },
  { icon: Mail,        grad: "from-[#e63946] to-[#9d0208]", dest: "Paris 🗼",           title: "Email Marketing",          desc: "Send newsletters, follow-up sequences, and promotional campaigns to your client database — all from one platform." },
  { icon: BarChart3,   grad: "from-[#00b4d8] to-[#0077b6]", dest: "Bora Bora 🤿",      title: "Revenue Dashboard",        desc: "Live view of bookings, revenue, pipeline value, and marketing performance. Make decisions with real data." },
  { icon: Zap,         grad: "from-[#7b2d8b] to-[#4a0e6b]", dest: "Aurora 🌠",          title: "Automation & Workflows",   desc: "Auto-assign leads, trigger follow-up emails, send booking reminders — your team focuses on selling, not admin." },
  { icon: Compass,     grad: "from-[#495057] to-[#212529]", dest: "London 🇬🇧",         title: "UK-Based Support",         desc: "We're based in the UK and respond fast. Hands-on team training and 90 days post-launch support included." },
];

const DESTINATIONS = ["✈ Maldives", "🏔 Alps", "🌴 Bali", "🌅 Santorini", "🗼 Paris", "🦁 Safari", "🏖 Caribbean", "🌸 Japan", "🌊 Amalfi", "🏰 Prague", "🌇 Dubai", "🌿 Costa Rica"];

const FAQS = [
  { q: "What exactly is included for £1,499?", a: "Everything: a fully custom travel booking website plus a built-in CRM — contact management, sales pipeline, booking system, online payments, email marketing, automation workflows, and a revenue dashboard. Plus team training and 90 days post-launch support. One flat fee, yours forever." },
  { q: "Are there any monthly fees?", a: "No monthly fees to Infygru, ever. You'll only pay for your domain/hosting (typically £10–20/year) and Stripe's standard card processing fees. No per-seat charges, no subscription tiers." },
  { q: "We already use a CRM — can we keep it?", a: "If your existing CRM is working well, we can discuss integration. But most agencies find that having website, bookings, CRM, and email marketing all in one platform removes friction and double-entry. We'll work out what's right for you on the call." },
  { q: "How long does it take to go live?", a: "Most projects launch within 2–4 weeks. The timeline depends on how quickly you can supply content and feedback. We work fast and keep you updated throughout." },
  { q: "Do we need any technical knowledge?", a: "None at all. The platform is built for your sales and marketing team — no code required. We provide hands-on training as part of the handover." },
  { q: "Why only 3 agencies per month?", a: "We limit intake deliberately so every client gets our full attention. Building a website AND a CRM with proper automations takes real care — we won't rush it or outsource it." },
];

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export default function Page() {
  return (
    <div className="text-slate-900 overflow-x-hidden font-sans antialiased" style={{ background: "#fff8f0" }}>

      {/* ══════════════════════════════════════════
          HERO — SUNSET FROM ALTITUDE
      ══════════════════════════════════════════ */}
      <section
        className="relative min-h-screen overflow-hidden flex items-center"
        style={{
          background: "linear-gradient(180deg, #020810 0%, #04142b 12%, #062952 28%, #0a4f8c 45%, #1a7db5 55%, #e07b39 68%, #f4a261 78%, #ffd166 88%, #fff8f0 100%)",
        }}
      >
        {/* Star field */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.85) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            backgroundPosition: "0 0, 40px 40px",
            opacity: 0.12,
          }}
        />

        {/* Latitude/longitude grid — faint */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "120px 80px",
          }}
        />

        {/* Giant background airplane silhouette */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-[-5%] top-[8%] w-[55%] max-w-3xl pointer-events-none select-none"
          style={{ opacity: 0.035 }}
        >
          <AirplaneSVG className="w-full h-full text-white" />
        </motion.div>

        {/* Horizon glow */}
        <div className="absolute left-0 right-0 pointer-events-none" style={{ top: "62%", height: "120px", background: "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(244,162,97,0.35) 0%, transparent 100%)" }} />

        {/* Floating destination pins */}
        {[
          { label: "Maldives", top: "14%", left: "7%", delay: 0.8 },
          { label: "Safari",   top: "22%", left: "62%", delay: 1.1 },
          { label: "Bali",     top: "58%", left: "5%",  delay: 1.3 },
          { label: "Alps",     top: "34%", left: "80%", delay: 0.9 },
          { label: "Santorini",top: "70%", left: "72%", delay: 1.5 },
        ].map((p) => (
          <motion.div
            key={p.label}
            className="absolute hidden lg:flex items-center gap-1.5 text-white/50 text-xs font-semibold"
            style={{ top: p.top, left: p.left }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: p.delay, duration: 0.8 }}
          >
            <MapPin className="w-3.5 h-3.5 text-[#f4a261]" /> {p.label}
          </motion.div>
        ))}

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28 grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 border border-[#f4a261]/30 text-[#f4a261] text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-8"
              style={{ background: "rgba(244,162,97,0.08)" }}
            >
              <Zap className="w-3 h-3" /> Only 3 spots available this month
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-black text-white leading-[1.05] tracking-tight mb-6 italic"
              style={{ fontSize: "clamp(2.6rem, 5vw, 4rem)" }}
            >
              Your Clients
              <br />
              <span style={{ background: "linear-gradient(90deg, #ffd166, #f4a261, #e76f51)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Travel the World.
              </span>
              <br />
              <span className="not-italic text-[0.75em] font-extrabold text-white/80 leading-tight">
                Your Platform Should<br />Make That Effortless.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-base text-white/50 leading-relaxed mb-9 max-w-lg"
            >
              We build UK travel agencies a{" "}
              <span className="text-white/80 font-semibold">custom booking website + full CRM</span> — sales pipeline,
              lead management, email marketing, and automation — all in one platform.
              One flat fee. Zero monthly charges. Yours forever.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="grid grid-cols-2 gap-2 mb-10 max-w-md"
            >
              {[
                "🌐 Website + CRM included",
                "⚡ Live in 2–4 weeks",
                "💷 Zero monthly fees",
                "🇬🇧 UK-based team",
              ].map((t) => (
                <div key={t} className="flex items-center gap-2 text-white/55 text-sm">
                  <span>{t}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-3"
            >
              <div className="flex -space-x-2">
                {["JA","MB","CR","SW"].map((i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-[#020810] flex items-center justify-center text-[10px] font-bold text-black" style={{ background: "linear-gradient(135deg, #f4a261, #e76f51)" }}>{i}</div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5">{[1,2,3,4,5].map((s) => <Star key={s} className="w-3.5 h-3.5 fill-[#ffd166] text-[#ffd166]" />)}</div>
                <p className="text-white/35 text-xs mt-0.5">Trusted by UK travel agencies</p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — form card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="rounded-3xl p-8 border border-white/10"
              style={{ background: "rgba(2,8,16,0.55)", backdropFilter: "blur(24px)" }}
            >
              <div className="flex items-center gap-3 mb-1">
                <span className="text-4xl font-black text-white">£1,499</span>
                <span className="text-white/25 line-through text-xl">£2,499</span>
                <span className="rounded-full px-2 py-0.5 text-xs font-bold border border-emerald-500/25 text-emerald-400" style={{ background: "rgba(16,185,129,0.1)" }}>Save £1,000</span>
              </div>
              <p className="text-white/35 text-sm mb-7">Website + CRM · One-time fee · No hidden costs</p>
              <EnquiryForm id="hero-form" dark={true} />
            </div>
          </motion.div>

        </div>

        {/* Fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, #fff8f0)" }} />
      </section>

      {/* ══════════════════════════════════════════
          DESTINATIONS MARQUEE
      ══════════════════════════════════════════ */}
      <div className="py-4 overflow-hidden border-y border-[#e8d5b0]" style={{ background: "linear-gradient(90deg, #f4a261 0%, #e76f51 100%)" }}>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex gap-10 whitespace-nowrap"
        >
          {[...DESTINATIONS, ...DESTINATIONS].map((d, i) => (
            <span key={i} className="text-white font-bold text-sm flex-shrink-0 tracking-wide">{d}</span>
          ))}
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════
          STATS
      ══════════════════════════════════════════ */}
      <section className="py-16" style={{ background: "#fff8f0" }}>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "2-in-1", sub: "Website + CRM in One" },
            { value: "£0",     sub: "Monthly Fees, Ever" },
            { value: "100%",   sub: "Owned by You" },
            { value: "90",     sub: "Days Post-Launch Support" },
          ].map((s, i) => (
            <Reveal key={s.sub} delay={i * 0.08}>
              <div className="text-4xl font-black italic mb-1" style={{ background: "linear-gradient(135deg, #c2500a, #f4a261)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {s.value}
              </div>
              <div className="text-sm text-[#7a5c3a]">{s.sub}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PAIN — STORMY SEAS
      ══════════════════════════════════════════ */}
      <section
        className="py-24 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #020c1f 0%, #041228 50%, #020c1f 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #e76f51, #f4a261, #ffd166)" }} />

        <div className="max-w-5xl mx-auto relative z-10">
          <Reveal className="text-center mb-16">
            <div className="inline-flex items-center gap-2 border border-[#f4a261]/20 text-[#f4a261] text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-5" style={{ background: "rgba(244,162,97,0.06)" }}>
              <MapPin className="w-3 h-3" /> The Problem
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight italic">
              Your tools are scattered.<br />
              <span style={{ background: "linear-gradient(90deg, #f4a261, #e76f51)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Your clients aren&apos;t waiting.
              </span>
            </h2>
            <p className="text-white/40 max-w-2xl mx-auto text-base leading-relaxed">
              Most UK travel agencies patch together a website, a CRM, and an email tool — paying monthly for all three, and spending hours moving data between them.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { emoji: "📉", title: "Losing leads to disorganisation",  desc: "Enquiries arrive by email, phone, and form — then fall through the cracks because there's no single system tracking them." },
              { emoji: "⏳", title: "Wasting hours on admin",           desc: "Manually logging enquiries, chasing follow-ups, and copying data between tools eats time that should go into selling." },
              { emoji: "💸", title: "Paying monthly for three tools",   desc: "A website platform, a CRM, and an email tool — three subscriptions, three logins, and they still don't talk to each other." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <div
                  className="rounded-2xl p-7 h-full border border-white/6 hover:border-[#f4a261]/20 transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <div className="text-4xl mb-5">{item.emoji}</div>
                  <h3 className="font-bold text-white mb-3 text-lg leading-tight">{item.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURES — DESTINATION CARDS
      ══════════════════════════════════════════ */}
      <section id="features" className="py-24 px-6" style={{ background: "#fff8f0" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <div className="inline-flex items-center gap-2 border border-[#e8d5b0] text-[#c2500a] text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-5" style={{ background: "rgba(244,162,97,0.08)" }}>
              <Compass className="w-3 h-3" /> What You Get
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#1a0a00] mb-4 leading-tight italic">
              Website + CRM. Sales + Marketing.
              <br />
              <span style={{ background: "linear-gradient(90deg, #c2500a, #f4a261)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                All under one roof.
              </span>
            </h2>
            <p className="text-[#7a5c3a] max-w-xl mx-auto text-base">
              Everything your travel agency needs to attract clients, close bookings, and grow revenue — built bespoke, owned by you.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.055}>
                <div
                  className="rounded-2xl overflow-hidden border border-[#e8d5b0]/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col"
                  style={{ background: "#fffaf5" }}
                >
                  {/* Destination gradient header */}
                  <div className={`h-28 bg-gradient-to-br ${f.grad} relative overflow-hidden flex items-end p-4`}>
                    <div className="absolute inset-0 opacity-[0.15]"
                      style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "14px 14px" }} />
                    {/* Destination badge */}
                    <div className="flex items-center gap-1.5 bg-black/25 backdrop-blur-sm rounded-full px-3 py-1 relative z-10">
                      <MapPin className="w-3 h-3 text-white/70" />
                      <span className="text-white/90 text-xs font-semibold">{f.dest}</span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <f.icon className="w-8 h-8 text-white/20" />
                    </div>
                  </div>
                  <div className="p-5 flex-1">
                    <h3 className="font-bold text-[#1a0a00] mb-2">{f.title}</h3>
                    <p className="text-[#7a5c3a] text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROCESS — FLIGHT ITINERARY
      ══════════════════════════════════════════ */}
      <section
        id="process"
        className="py-24 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #023e8a 0%, #0a4f8c 40%, #0077b6 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #ffd166, #f4a261, #e76f51)" }} />

        <div className="max-w-4xl mx-auto relative z-10">
          <Reveal className="text-center mb-16">
            <div className="inline-flex items-center gap-2 border border-white/15 text-white/70 text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-5" style={{ background: "rgba(255,255,255,0.05)" }}>
              <Plane className="w-3 h-3" /> Your Itinerary
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 italic leading-tight">
              Ready for take-off in{" "}
              <span style={{ background: "linear-gradient(90deg, #ffd166, #f4a261)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                3 steps.
              </span>
            </h2>
          </Reveal>

          {/* Itinerary cards */}
          <div className="space-y-4">
            {[
              { code: "FLT-01", gate: "Discovery",    from: "Where you are",  to: "Understanding your needs",     icon: "🛫", title: "Discovery Call",              desc: "We learn about your agency — your sales process, client base, marketing goals, and what's holding you back right now." },
              { code: "FLT-02", gate: "Build",         from: "Blueprint",      to: "Your platform takes shape",    icon: "✈️",  title: "Design, Build & Configure",   desc: "We build your website, set up your CRM pipeline, configure automations, and connect email marketing. You review every step." },
              { code: "FLT-03", gate: "Arrival",       from: "Ready",          to: "You're live & in control",     icon: "🛬", title: "Launch, Train & Hand Over",    desc: "We go live, train your whole team on the platform, and hand over full ownership. Everything is yours from day one." },
            ].map((step, i) => (
              <Reveal key={step.code} delay={i * 0.12}>
                <div
                  className="rounded-2xl border border-white/10 overflow-hidden hover:border-[#f4a261]/30 transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)" }}
                >
                  {/* Top strip — boarding pass header */}
                  <div className="flex items-center gap-4 px-6 py-3 border-b border-white/8" style={{ background: "rgba(255,255,255,0.04)" }}>
                    <span className="text-[#f4a261] text-xs font-black tracking-widest">{step.code}</span>
                    <span className="text-white/20 text-xs">·</span>
                    <span className="text-white/40 text-xs font-medium uppercase tracking-wide">GATE {step.gate}</span>
                    <div className="ml-auto flex items-center gap-2 text-xs text-white/30">
                      <span>{step.from}</span>
                      <ArrowRight className="w-3 h-3" />
                      <span>{step.to}</span>
                    </div>
                  </div>
                  <div className="flex gap-5 items-start p-6">
                    <div className="text-4xl flex-shrink-0">{step.icon}</div>
                    <div>
                      <h3 className="font-black text-white text-lg mb-1.5">{step.title}</h3>
                      <p className="text-white/45 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRICING — BOARDING PASS
      ══════════════════════════════════════════ */}
      <section id="pricing" className="py-24 px-6" style={{ background: "#fff8f0" }}>
        <div className="max-w-2xl mx-auto">
          <Reveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 border border-[#e8d5b0] text-[#c2500a] text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-5" style={{ background: "rgba(244,162,97,0.08)" }}>
              <Star className="w-3 h-3" /> All-Inclusive Package
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#1a0a00] mb-3 italic">Simple, flat-fee pricing.</h2>
            <p className="text-[#7a5c3a] text-base">No subscriptions. No surprises. One ticket, done.</p>
          </Reveal>

          <Reveal>
            {/* Boarding pass card */}
            <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ boxShadow: "0 24px 60px rgba(231,111,81,0.2)" }}>
              {/* Header — sunset gradient */}
              <div
                className="px-8 py-8 relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #7b2d00 0%, #c2500a 35%, #e76f51 65%, #f4a261 100%)" }}
              >
                <div className="absolute inset-0 opacity-[0.12]"
                  style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
                {/* Boarding pass header layout */}
                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <div className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">BOARDING PASS · UK TRAVEL AGENCY</div>
                    <div className="flex items-center gap-4 mb-2">
                      <div>
                        <div className="text-white/50 text-[10px] uppercase tracking-widest">FROM</div>
                        <div className="text-white font-black text-2xl leading-none">YOUR</div>
                        <div className="text-white/60 text-xs">Current Setup</div>
                      </div>
                      <Plane className="w-8 h-8 text-white/40" />
                      <div>
                        <div className="text-white/50 text-[10px] uppercase tracking-widest">TO</div>
                        <div className="text-white font-black text-2xl leading-none">GROWTH</div>
                        <div className="text-white/60 text-xs">Full Platform</div>
                      </div>
                    </div>
                    <div className="text-white/50 text-xs">SEAT: Website + CRM · CLASS: All-Inclusive</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white/40 text-sm line-through mb-0.5">£2,499</div>
                    <div className="text-white text-5xl font-black leading-none">£1,499</div>
                    <div className="text-white/50 text-xs mt-1">one-time fee</div>
                  </div>
                </div>
                {/* Perforated edge */}
                <div className="absolute bottom-0 left-0 right-0 flex">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div key={i} className="flex-1 h-3 rounded-b-full bg-[#fff8f0]" style={{ margin: "0 2px" }} />
                  ))}
                </div>
              </div>

              {/* Checklist body */}
              <div className="p-8 bg-white">
                <p className="text-xs font-black text-[#7a5c3a] uppercase tracking-widest mb-5">Amenities on Board</p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Fully custom travel booking website (design + dev)",
                    "Online booking system with availability management",
                    "Stripe payment integration — deposits & full payments",
                    "Built-in CRM — all clients & enquiries in one place",
                    "Visual sales pipeline — track every lead to booking",
                    "Email marketing — newsletters, follow-ups & campaigns",
                    "Automation workflows — follow-ups, reminders, lead routing",
                    "Revenue & marketing analytics dashboard",
                    "Mobile-optimised and fast-loading",
                    "Team training & handover included",
                    "90 days post-launch support",
                    "Full ownership — code, data, domain — forever",
                    "No monthly fees to Infygru, ever",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#5a3e28]">
                      <CheckCircle className="w-4 h-4 text-[#e76f51] flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="#enquire"
                  className="flex items-center justify-center gap-2 w-full font-black py-4 rounded-2xl transition-all text-[#1a0a00] hover:opacity-90 hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg, #f4a261 0%, #e76f51 100%)", boxShadow: "0 8px 28px rgba(231,111,81,0.4)" }}
                >
                  Claim Your Boarding Pass <ArrowRight className="w-4 h-4" />
                </a>
                <p className="text-center text-xs text-[#c4a98a] mt-3">Limited to 3 agencies per month</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════ */}
      <section id="faq" className="py-24 px-6" style={{ background: "#fff3e6" }}>
        <div className="max-w-2xl mx-auto">
          <Reveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 border border-[#e8d5b0] text-[#c2500a] text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-5" style={{ background: "rgba(244,162,97,0.08)" }}>
              <Compass className="w-3 h-3" /> FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#1a0a00] italic">Common questions answered.</h2>
          </Reveal>
          <Reveal>
            <div className="bg-white rounded-3xl border border-[#e8d5b0] px-8 py-2 shadow-sm">
              {FAQS.map((faq) => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FINAL CTA — NIGHT SKY + FORM
      ══════════════════════════════════════════ */}
      <section
        id="enquire"
        className="py-28 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #020810 0%, #04142b 40%, #062952 100%)" }}
      >
        {/* Stars */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "60px 60px", backgroundPosition: "0 0, 30px 30px", opacity: 0.08 }} />
        {/* Horizon glow */}
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(244,162,97,0.15), transparent)" }} />

        {/* Giant faint plane */}
        <div className="absolute right-[-8%] bottom-[-5%] w-[50%] pointer-events-none select-none" style={{ opacity: 0.025 }}>
          <AirplaneSVG className="w-full h-full text-white" />
        </div>

        <div className="relative z-10 max-w-xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 border border-[#f4a261]/20 text-[#f4a261] text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-6" style={{ background: "rgba(244,162,97,0.06)" }}>
              <Plane className="w-3 h-3" /> Get Started Today
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight italic">
              Get your website and CRM
              <br />
              <span style={{ background: "linear-gradient(90deg, #ffd166, #f4a261, #e76f51)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                built for £1,499.
              </span>
            </h2>
            <p className="text-white/45 text-base mb-10 leading-relaxed max-w-md mx-auto">
              Fill in your details. We&apos;ll reach out within 24 hours to book a free 30-minute discovery call — no commitment, just a conversation.
            </p>
            <div
              className="rounded-3xl p-8 text-left border border-white/8"
              style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)" }}
            >
              <EnquiryForm id="footer-form" dark={true} />
            </div>

            <div className="mt-10 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-white/25">
              <a href="mailto:infygru@gmail.com" className="flex items-center gap-1.5 hover:text-white/50 transition-colors">
                <Mail className="w-3.5 h-3.5" /> infygru@gmail.com
              </a>
              <span className="hidden sm:block">·</span>
              <span>© {new Date().getFullYear()} Infygru. All rights reserved.</span>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
