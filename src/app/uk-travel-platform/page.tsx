"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Phone,
  X,
  Play,
  ExternalLink,
  MapPin,
  AlertTriangle,
  Zap,
  Clock,
  TrendingUp,
  Send,
  Loader2,
} from "lucide-react";

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */

function Reveal({
  children,
  className = "",
  delay = 0,
  y = 40,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ParallaxSection({
  children,
  speed = 0.15,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}px`, `-${speed * 100}px`]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   VIDEO MODAL
───────────────────────────────────────────── */

function VideoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-full bg-zinc-950 flex items-center justify-center text-zinc-500 text-sm">
              {/* <iframe src="YOUR_LOOM_OR_YOUTUBE_EMBED_URL" className="w-full h-full" allowFullScreen /> */}
              Paste your video embed URL here
            </div>
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   ENQUIRY FORM
───────────────────────────────────────────── */

function EnquiryForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
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

  return (
    <section
      id="enquire"
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #f8fafc 0%, #eff6ff 50%, #f5f3ff 100%)" }}
    >
      <div className="max-w-2xl mx-auto">
        <Reveal className="text-center mb-10">
          <div
            className="inline-flex items-center gap-2 text-blue-700 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-5"
            style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)" }}
          >
            <Send className="w-3.5 h-3.5" /> Get in touch
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            Interested? Tell us about your agency.
          </h2>
          <p className="text-gray-500 text-base">
            Fill in your details and we&apos;ll reach out within 24 hours to schedule a free 30-min call.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="bg-white rounded-3xl p-8 md:p-10 relative overflow-hidden"
            style={{ boxShadow: "0 20px 60px rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.1)" }}
          >
            {/* gradient top bar */}
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
              style={{ background: "linear-gradient(90deg, #2563eb, #7c3aed, #f59e0b)" }}
            />

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-xl font-black text-gray-900 mb-2">We&apos;ve got your details!</h3>
                <p className="text-gray-500 text-sm">We&apos;ll be in touch within 24 hours. Keep an eye on your inbox.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { id: "name", label: "Your Name", placeholder: "John Smith", type: "text" },
                    { id: "company", label: "Business / Agency Name", placeholder: "Smith Travel Ltd", type: "text" },
                  ].map((f) => (
                    <div key={f.id}>
                      <label htmlFor={f.id} className="block text-xs font-black text-gray-600 uppercase tracking-wider mb-2">
                        {f.label}
                      </label>
                      <input
                        id={f.id}
                        name={f.id}
                        type={f.type}
                        required
                        value={form[f.id as keyof typeof form]}
                        onChange={handleChange}
                        placeholder={f.placeholder}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                      />
                    </div>
                  ))}
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { id: "email", label: "Contact Email", placeholder: "john@smithtravel.co.uk", type: "email" },
                    { id: "phone", label: "Contact Number", placeholder: "+44 7700 900000", type: "tel" },
                  ].map((f) => (
                    <div key={f.id}>
                      <label htmlFor={f.id} className="block text-xs font-black text-gray-600 uppercase tracking-wider mb-2">
                        {f.label}
                      </label>
                      <input
                        id={f.id}
                        name={f.id}
                        type={f.type}
                        required
                        value={form[f.id as keyof typeof form]}
                        onChange={handleChange}
                        placeholder={f.placeholder}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                      />
                    </div>
                  ))}
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-500 font-medium">
                    Something went wrong. Please try emailing us directly at hello@infygru.com
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center gap-2.5 text-white font-black text-base py-4 rounded-xl transition-all duration-200 disabled:opacity-70"
                  style={{
                    background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                    boxShadow: "0 6px 28px rgba(37,99,235,0.35)",
                  }}
                >
                  {status === "loading" ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="w-4 h-4" /> Send My Enquiry</>
                  )}
                </button>

                <p className="text-center text-xs text-gray-400">
                  No spam. No commitment. We&apos;ll just have a friendly chat.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export default function Page() {
  const [videoOpen, setVideoOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 40 });

  // hero parallax refs
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "35%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.08]);

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden font-sans antialiased">
      {/* scroll progress bar — gradient */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-violet-500 to-amber-400 origin-left z-50 pointer-events-none"
      />
      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden bg-[#050b1a] flex items-center"
      >
        {/* parallax background gradient blobs */}
        <motion.div
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full bg-blue-600/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-violet-600/15 blur-[120px]" />
          <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-amber-400/10 blur-[80px]" />
        </motion.div>

        {/* diagonal accent — gradient */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full hidden lg:block opacity-90"
          style={{
            clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)",
            background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 60%, #1d4ed8 100%)",
          }}
        />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-300 text-black text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-full mb-8 shadow-[0_4px_24px_rgba(251,191,36,0.4)]"
              >
                <Zap className="w-3.5 h-3.5" /> Limited — 3 agencies per month
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(2rem,3.8vw,3.4rem)] font-black leading-[1.06] tracking-tight text-white mb-6"
              >
                Get a Professional
                <br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #fbbf24 0%, #f59e0b 50%, #fcd34d 100%)",
                  }}
                >
                  Travel Booking
                </span>
                <br />
                Website for
                <br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #fbbf24, #f59e0b)",
                  }}
                >
                  £1,499.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-white/55 leading-relaxed mb-10 max-w-lg"
              >
                A fully custom travel booking platform — your brand, your prices, your
                clients. Bookings confirmed automatically, leads never missed, zero monthly
                fees.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-col sm:flex-row gap-4 mb-10"
              >
                <a
                  href="#claim"
                  className="group inline-flex items-center justify-center gap-3 font-black text-base px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-black"
                  style={{
                    background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                    boxShadow: "0 8px 32px rgba(251,191,36,0.45)",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 14px 40px rgba(251,191,36,0.6)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 32px rgba(251,191,36,0.45)"; }}
                >
                  Claim Your Spot Now{" "}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <button
                  onClick={() => setVideoOpen(true)}
                  className="inline-flex items-center justify-center gap-2.5 border-2 border-white/20 text-white font-bold text-sm px-6 py-4 rounded-xl hover:border-white/40 hover:bg-white/5 transition-all"
                >
                  <Play className="w-4 h-4 fill-white" /> Watch 3-Min Demo
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-6"
              >
                {[
                  "✓ Live in 2–4 weeks",
                  "✓ Zero monthly fees",
                  "✓ You own it 100%",
                  "✓ UK-based support",
                ].map((t) => (
                  <span key={t} className="text-sm text-white/35 font-medium">
                    {t}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* RIGHT — offer card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
              <div
                className="bg-white rounded-3xl p-8 relative"
                style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)" }}
              >
                {/* gradient top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                  style={{ background: "linear-gradient(90deg, #2563eb, #7c3aed, #f59e0b)" }}
                />

                <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                  <div>
                    <div className="text-sm text-gray-400 font-medium mb-1">
                      Complete Travel Platform
                    </div>
                    <div className="text-5xl font-black text-gray-900">£1,499</div>
                    <div className="text-sm text-green-600 font-bold mt-1">
                      One-time. No monthly fees ever.
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400 line-through mb-1">Usually £4,000+</div>
                    <div
                      className="text-xs font-black px-3 py-1.5 rounded-full text-white"
                      style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}
                    >
                      SAVE £2,500+
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {[
                    "Custom branded booking website",
                    "Live prices from your suppliers",
                    "Auto WhatsApp & email confirmations",
                    "Admin dashboard — all bookings in one place",
                    "Never lose a lead again",
                    "Set up, trained, handed over to you",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                <a
                  href="mailto:hello@infygru.com?subject=UK Travel Platform — Book My Spot"
                  className="group w-full flex items-center justify-center gap-2 text-white font-black text-base px-6 py-4 rounded-xl transition-all duration-200 mb-3"
                  style={{
                    background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                    boxShadow: "0 6px 28px rgba(37,99,235,0.35)",
                  }}
                >
                  Book My Spot — £1,499{" "}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <p className="text-center text-xs text-gray-400">
                  Free 30-min discovery call · No commitment
                </p>
              </div>

              <div
                className="absolute -top-4 -right-4 text-white text-[11px] font-black uppercase tracking-wide px-4 py-2 rounded-full shadow-lg rotate-3"
                style={{ background: "linear-gradient(135deg, #ef4444, #b91c1c)" }}
              >
                Only 3 spots/month
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <span className="text-xs text-white/30 tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
          />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          SOCIAL PROOF BAR
      ══════════════════════════════════════════ */}
      <div
        className="relative overflow-hidden border-y border-blue-100 py-8 px-6"
        style={{ background: "linear-gradient(135deg, #eff6ff 0%, #f5f3ff 50%, #fefce8 100%)" }}
      >
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-10 md:gap-20">
          {[
            { stat: "2", suffix: " agencies", label: "already live in the UK" },
            { stat: "£0", suffix: "/mo", label: "ongoing fees after setup" },
            { stat: "48", suffix: " hrs", label: "to see your platform live" },
            { stat: "100", suffix: "%", label: "yours — you own all the code" },
          ].map(({ stat, suffix, label }, i) => (
            <Reveal key={stat + suffix} delay={i * 0.07} y={20} className="text-center">
              <div className="text-3xl font-black text-gray-900">
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(135deg, #2563eb, #7c3aed)" }}
                >
                  {stat}
                </span>
                <span className="text-gray-800">{suffix}</span>
              </div>
              <div className="text-xs text-gray-400 mt-1 font-medium">{label}</div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          IS THIS YOU? — INFOGRAPHIC
      ══════════════════════════════════════════ */}
      <section className="py-28 px-6 bg-white relative overflow-hidden">
        <ParallaxSection speed={0.12} className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-10 right-[-10%] w-[500px] h-[500px] rounded-full bg-red-50/80 blur-[100px]" />
        </ParallaxSection>

        <div className="max-w-5xl mx-auto relative z-10">
          <Reveal className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <AlertTriangle className="w-3.5 h-3.5" /> Does this sound familiar?
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
              You&apos;re running your travel agency
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(90deg, #ef4444, #dc2626)" }}
              >
                the hard way.
              </span>
            </h2>
          </Reveal>

          {/* ── infographic grid ── */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: "⏱️",
                stat: "3 websites",
                label: "to give one quote",
                sub: "TBO, Akbar & MakeMyTrip — opened separately every single time",
                color: "#ef4444",
                bg: "linear-gradient(135deg, #fff5f5, #fef2f2)",
                border: "#fecaca",
              },
              {
                icon: "📉",
                stat: "£400/mo",
                label: "wasted on tools that don't talk",
                sub: "Booking software, CRM, email tools — none of them connected",
                color: "#f97316",
                bg: "linear-gradient(135deg, #fff7ed, #ffedd5)",
                border: "#fed7aa",
              },
              {
                icon: "🚨",
                stat: "7pm miss",
                label: "costs you the client",
                sub: "A client messaged after hours. No reply. They booked elsewhere by morning.",
                color: "#dc2626",
                bg: "linear-gradient(135deg, #fff5f5, #fef2f2)",
                border: "#fca5a5",
              },
            ].map((item, i) => (
              <Reveal key={item.stat} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="rounded-2xl p-7 border text-center cursor-default"
                  style={{ background: item.bg, borderColor: item.border }}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div
                    className="text-3xl font-black mb-1"
                    style={{ color: item.color }}
                  >
                    {item.stat}
                  </div>
                  <div className="text-sm font-black text-gray-800 mb-3">{item.label}</div>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.sub}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* ── connector: before vs after ── */}
          <Reveal delay={0.15}>
            <div
              className="rounded-3xl overflow-hidden border border-gray-200"
              style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}
            >
              <div className="grid md:grid-cols-2">
                {/* BEFORE */}
                <div className="p-8 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400">Before</span>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Bookings scattered across WhatsApp, email & spreadsheets",
                      "Manual follow-up — leads go cold over the weekend",
                      "No professional website — you look smaller than you are",
                      "Paying monthly for tools that still require manual work",
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                          <span className="text-red-500 text-[10px] font-black">✕</span>
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* AFTER */}
                <div
                  className="p-8"
                  style={{ background: "linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%)" }}
                >
                  <div className="flex items-center gap-2 mb-5">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400">After — with your platform</span>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "One dashboard — every booking, every lead, every agent",
                      "Auto WhatsApp & email sent the second someone enquires",
                      "Professional branded website your competitors will envy",
                      "One payment of £1,499 — no subscriptions, ever",
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-3 text-sm text-gray-700">
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                          <span className="text-green-600 text-[10px] font-black">✓</span>
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.25} className="mt-10 text-center">
            <p className="text-lg text-gray-500 font-medium">
              If even 2 of those hit home — keep reading. This was built for you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHAT YOU GET
      ══════════════════════════════════════════ */}
      <section
        className="py-28 px-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 40%, #7c3aed 100%)",
        }}
      >
        {/* parallax orbs */}
        <ParallaxSection speed={0.18} className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] right-[10%] w-[500px] h-[500px] rounded-full bg-violet-500/20 blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[5%] w-[400px] h-[400px] rounded-full bg-blue-400/20 blur-[100px]" />
        </ParallaxSection>

        <div className="max-w-5xl mx-auto relative z-10">
          <Reveal className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
              What you get for £1,499
            </h2>
            <p className="text-blue-200 text-lg font-light">
              Everything your agency needs. Nothing you don&apos;t.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: "🌐",
                title: "Your own booking website",
                desc: "Fully branded with your logo and colours. Looks completely professional — your clients will never know it was built in weeks.",
              },
              {
                icon: "⚡",
                title: "Instant client confirmations",
                desc: "The second someone enquires — they get a WhatsApp message and an email. Your staff get notified. No delays. No missed leads.",
              },
              {
                icon: "💷",
                title: "Live prices, always accurate",
                desc: "Your platform pulls live fares directly. No more opening 3 websites to give a quote. Your agents see everything in one screen.",
              },
              {
                icon: "📊",
                title: "One dashboard for everything",
                desc: "Every booking, every lead, every agent — in one place. See your revenue, your pipeline, who needs follow-up. Total control.",
              },
              {
                icon: "🔒",
                title: "Yours forever, no monthly fees",
                desc: "This isn't software you rent. It's yours. Hosted on your own servers. No subscriptions. No platform can pull the rug.",
              },
              {
                icon: "🚀",
                title: "Live in 2–4 weeks",
                desc: "We handle everything — build, setup, training. In a month you'll have a platform your competitors will think cost £15,000.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 280, damping: 20 }}
                  className="rounded-2xl p-7 h-full cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <span className="text-3xl mb-4 block">{item.icon}</span>
                  <h3 className="text-white font-black text-lg mb-3">{item.title}</h3>
                  <p className="text-blue-100/80 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          LIVE PROOF
      ══════════════════════════════════════════ */}
      <section className="py-28 px-6 bg-white relative overflow-hidden">
        <ParallaxSection speed={0.1} className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute bottom-0 left-[-5%] w-[600px] h-[600px] rounded-full bg-blue-50 blur-[120px]" />
        </ParallaxSection>

        <div className="max-w-5xl mx-auto relative z-10">
          <Reveal className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live right now
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
              We already built this for two agencies.
            </h2>
            <p className="text-gray-500 text-lg font-light">
              Both are live. Both are booking real clients. Go see them.
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                name: "MyPerfectTrips",
                url: "myperfecttrips.com",
                href: "https://myperfecttrips.com",
                location: "Manchester, UK",
                tagline: "Manchester's Premier Travel Agency",
                description:
                  "Holiday packages, visa management, MICE, and corporate travel. Fully automated — 140+ enquiries a month handled without extra staff.",
                highlight: "140+ bookings/month, zero extra staff",
                gradient: "linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #7c3aed 100%)",
              },
              {
                name: "IG Holidays",
                url: "igholidays.com",
                href: "https://igholidays.com",
                location: "Chennai, India",
                tagline: "10,000+ happy clients served",
                description:
                  "International and domestic packages, honeymoons, corporate travel. Every confirmation and follow-up is automatic.",
                highlight: "10,000+ clients, all automations running",
                gradient: "linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #ef4444 100%)",
              },
            ].map((site, i) => (
              <Reveal key={site.name} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 250, damping: 22 }}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                >
                  <div className="p-8 text-white" style={{ background: site.gradient }}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-black">{site.name}</h3>
                        <p className="text-white/60 text-sm flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {site.location}
                        </p>
                      </div>
                      <a
                        href={site.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors border border-white/20"
                      >
                        Visit Live <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-white/80 text-sm font-medium">{site.tagline}</p>
                  </div>
                  <div className="p-7">
                    <p className="text-gray-600 text-sm leading-relaxed mb-5">{site.description}</p>
                    <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                      <TrendingUp className="w-4 h-4 text-green-600 shrink-0" />
                      <span className="text-sm text-green-700 font-bold">{site.highlight}</span>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VIDEO DEMO
      ══════════════════════════════════════════ */}
      <section
        className="py-28 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <Reveal className="mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              See exactly what you&apos;re getting.
            </h2>
            <p className="text-gray-500 text-lg">
              3-minute video. Real platform. Real bookings being processed.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className="relative rounded-3xl overflow-hidden cursor-pointer group border border-gray-200 hover:border-blue-400 transition-all shadow-[0_20px_60px_rgba(0,0,0,0.12)] hover:shadow-[0_30px_80px_rgba(37,99,235,0.2)]"
              onClick={() => setVideoOpen(true)}
            >
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                {/* mock dashboard */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute inset-6 rounded-xl bg-gray-900 border border-white/10 overflow-hidden">
                    <div className="bg-gray-800 px-4 py-3 flex items-center gap-2 border-b border-white/5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                      <span className="mx-auto text-[10px] text-white/30 font-mono">
                        yourtravelagency.com/dashboard
                      </span>
                    </div>
                    <div className="p-4 grid grid-cols-4 gap-2">
                      {[["24", "Bookings"], ["£8,240", "Revenue"], ["7", "Leads"], ["31", "Sent"]].map(
                        ([v, l]) => (
                          <div key={l} className="bg-white/5 rounded-lg p-3">
                            <p className="text-[8px] text-white/30 mb-1">{l}</p>
                            <p className="text-base font-black text-white">{v}</p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
                {/* play button */}
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-22 h-22 rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                      width: 88,
                      height: 88,
                      boxShadow: "0 0 60px rgba(124,58,237,0.5)",
                    }}
                  >
                    <Play className="w-8 h-8 fill-white text-white ml-1" />
                  </motion.div>
                  <span className="text-white font-bold text-sm tracking-wide">
                    Watch Demo — 3 Minutes
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TIMELINE
      ══════════════════════════════════════════ */}
      <section
        className="py-28 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0a0f1e 0%, #0f172a 100%)" }}
      >
        <ParallaxSection speed={0.12} className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-[5%] w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px]" />
          <div className="absolute bottom-0 left-[5%] w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[100px]" />
        </ParallaxSection>

        <div className="max-w-4xl mx-auto relative z-10">
          <Reveal className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
              From &quot;yes&quot; to live in{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(90deg, #fbbf24, #f59e0b)" }}
              >
                under 4 weeks.
              </span>
            </h2>
            <p className="text-gray-400 text-lg">
              Here&apos;s exactly what happens after you get in touch.
            </p>
          </Reveal>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-violet-500/50 to-amber-400/30 hidden md:block" />
            <div className="space-y-6">
              {[
                { day: "Day 1", icon: "📞", title: "Free discovery call", desc: "30 minutes. We understand your business — your suppliers, your clients, how you work today." },
                { day: "Day 2–3", icon: "📋", title: "We send you a plan", desc: "Exactly what we'll build, what it'll look like, and a clear timeline. No surprises." },
                { day: "Week 1–2", icon: "⚙️", title: "We build your platform", desc: "Your branded booking site, your admin dashboard, all your automations configured and tested." },
                { day: "Week 3–4", icon: "🚀", title: "You go live", desc: "We train you and your team, hand over everything, and you're live. Done. No ongoing fees." },
              ].map((step, i) => (
                <Reveal key={step.day} delay={i * 0.1}>
                  <div className="flex gap-6 md:pl-12">
                    <div className="relative">
                      <div
                        className="w-12 h-12 rounded-full border-2 border-gray-600 flex items-center justify-center text-xl shrink-0 md:absolute md:-left-[3.75rem] md:top-0"
                        style={{ background: "rgba(255,255,255,0.06)" }}
                      >
                        {step.icon}
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="flex-1 rounded-2xl p-6"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <span
                        className="text-xs font-black uppercase tracking-widest text-transparent bg-clip-text"
                        style={{ backgroundImage: "linear-gradient(90deg, #fbbf24, #f59e0b)" }}
                      >
                        {step.day}
                      </span>
                      <h3 className="text-white font-black text-lg mb-2 mt-1">{step.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                    </motion.div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════ */}
      <section className="py-28 px-6 bg-white relative overflow-hidden">
        <ParallaxSection speed={0.1} className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-violet-50 blur-[100px]" />
        </ParallaxSection>

        <div className="max-w-4xl mx-auto relative z-10">
          <Reveal className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
              Questions we always get.
            </h2>
          </Reveal>
          <div className="space-y-4">
            {[
              {
                q: "£1,499 sounds too cheap. What's the catch?",
                a: "No catch. We keep our prices fair because we want long-term relationships with agencies — not a one-time transaction. We also limit to 3 agencies per month so quality never drops.",
              },
              {
                q: "What if I'm not tech-savvy at all?",
                a: "Perfect — this is built for business owners, not tech people. We handle everything and train you. If you can use WhatsApp, you can run your platform.",
              },
              {
                q: "What about ongoing support?",
                a: "2 weeks of handover support is included. After that, because you own the platform outright, you can use any developer — or come back to us. No lock-in.",
              },
              {
                q: "How is this different from just using booking.com or a third-party portal?",
                a: "With portals, they take a cut of every booking, own your customer data, and you build their brand — not yours. This platform is 100% yours. Your clients, your data, your profit.",
              },
              {
                q: "Will it actually work for my suppliers?",
                a: "We connect directly to TBO Holidays, Akbar Online, and MakeMyTrip B2B. If you use other suppliers, we'll discuss on the call — we can integrate most APIs.",
              },
            ].map((item, i) => (
              <Reveal key={item.q} delay={i * 0.05}>
                <details className="group border border-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:border-blue-200 transition-colors">
                  <summary className="flex items-center justify-between gap-4 px-7 py-5 font-black text-gray-900 text-sm md:text-base hover:bg-gray-50/80 transition-colors list-none">
                    {item.q}
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 font-black text-sm transition-all"
                      style={{
                        background: "linear-gradient(135deg, #eff6ff, #f5f3ff)",
                        color: "#2563eb",
                      }}
                    >
                      +
                    </span>
                  </summary>
                  <div className="px-7 pb-6 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-5">
                    {item.a}
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ENQUIRY FORM
      ══════════════════════════════════════════ */}
      <EnquiryForm />

      {/* ══════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════ */}
      <section
        id="claim"
        className="py-28 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #050b1a 0%, #0f172a 50%, #0a0f1e 100%)" }}
      >
        <ParallaxSection speed={0.15} className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] rounded-full bg-violet-600/10 blur-[100px]" />
          <div className="absolute top-[30%] left-[5%] w-[300px] h-[300px] rounded-full bg-amber-400/5 blur-[80px]" />
        </ParallaxSection>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <Reveal>
            <div
              className="inline-flex items-center gap-2 text-red-400 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-8"
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.2)",
              }}
            >
              <Clock className="w-3.5 h-3.5" /> Only 3 spots available this month
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
              Stop watching clients
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: "linear-gradient(90deg, #fbbf24, #f59e0b, #fcd34d)",
                }}
              >
                go to your competitors.
              </span>
            </h2>
            <p className="text-white/40 text-xl font-light leading-relaxed mb-12 max-w-xl mx-auto">
              For £1,499 — once — you get a professional travel platform that works around
              the clock. Your competitors pay £400/month. Forever. You pay once.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div
              className="rounded-3xl p-8 md:p-12 text-left relative overflow-hidden"
              style={{
                background: "white",
                boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
              }}
            >
              {/* gradient top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                style={{
                  background: "linear-gradient(90deg, #2563eb, #7c3aed, #f59e0b)",
                }}
              />

              <div className="flex items-center justify-between flex-wrap gap-4 mb-8 pb-8 border-b border-gray-100">
                <div>
                  <div className="text-gray-400 text-sm mb-1">Complete Travel Platform</div>
                  <div className="text-6xl font-black text-gray-900">£1,499</div>
                  <div className="text-green-600 font-bold text-sm mt-1">
                    One payment. Yours forever.
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {[
                    "✓ Live in 2–4 weeks",
                    "✓ Zero monthly fees",
                    "✓ 100% your platform",
                    "✓ Full training included",
                  ].map((t) => (
                    <span key={t} className="text-sm text-gray-600 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {[
                  "Custom branded booking website",
                  "Live fares from all your suppliers",
                  "Auto WhatsApp & email confirmations",
                  "Admin dashboard — everything in one view",
                  "Agent management tools",
                  "2 weeks of setup support included",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:hello@infygru.com?subject=I want to claim my travel platform spot — £1499"
                  className="group flex-1 flex items-center justify-center gap-2 text-white font-black text-base px-8 py-5 rounded-xl transition-all duration-200"
                  style={{
                    background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                    boxShadow: "0 8px 32px rgba(37,99,235,0.35)",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 14px 44px rgba(37,99,235,0.55)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 32px rgba(37,99,235,0.35)"; }}
                >
                  Claim My Spot — Email Us{" "}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="https://wa.me/918300290019?text=Hi%2C+I%27m+interested+in+the+%C2%A31%2C499+travel+platform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-white font-black text-base px-8 py-5 rounded-xl transition-all duration-200"
                  style={{
                    background: "linear-gradient(135deg, #22c55e, #16a34a)",
                    boxShadow: "0 8px 32px rgba(34,197,94,0.3)",
                  }}
                >
                  <Phone className="w-5 h-5" /> WhatsApp Us
                </a>
              </div>
              <p className="text-center text-xs text-gray-400 mt-4">
                hello@infygru.com · Free 30-min discovery call · No hard sell, no commitment
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <div
        className="border-t border-white/5 px-6 py-6 text-center text-xs text-white/20"
        style={{ background: "#050b1a" }}
      >
        © {new Date().getFullYear()} Infygru · UK Travel Platform · hello@infygru.com
      </div>
    </div>
  );
}
