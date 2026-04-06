"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Play,
  X,
  ExternalLink,
  Zap,
  Shield,
  GitBranch,
  Globe,
  MapPin,
  ChevronRight,
} from "lucide-react";

/* ─── fade/slide helpers ─────────────────────────────────────── */
function Reveal({
  children,
  className = "",
  delay = 0,
  y = 30,
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

function RevealX({
  children,
  className = "",
  delay = 0,
  from = "left",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: "left" | "right";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: from === "left" ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── counter ────────────────────────────────────────────────── */
function Counter({
  to,
  suffix = "",
  prefix = "",
}: {
  to: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * to));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

/* ─── video modal ────────────────────────────────────────────── */
function VideoModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
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
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-full flex items-center justify-center bg-zinc-950 text-zinc-600 text-sm font-medium tracking-wide">
              {/* Swap this iframe src with your Loom / YouTube embed URL */}
              <span>Drop your Loom or YouTube embed URL here</span>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── data ───────────────────────────────────────────────────── */
const stack = [
  {
    icon: Zap,
    title: "Next.js Frontend",
    body: "App Router, ISR caching, sub-second load. SEO-ready routes per destination and search term.",
    tag: "Performance",
    color: "#f59e0b",
  },
  {
    icon: Shield,
    title: "Directus Admin",
    body: "Role-based access, audit logs, self-hosted on your own server. Zero SaaS dependency.",
    tag: "Security",
    color: "#6366f1",
  },
  {
    icon: GitBranch,
    title: "n8n Automation",
    body: "Visual workflows for CRM entry, WhatsApp confirmations, lead routing and onboarding.",
    tag: "Automation",
    color: "#10b981",
  },
  {
    icon: Globe,
    title: "B2B API Layer",
    body: "Pre-built connectors for TBO Holidays, Akbar Online and MakeMyTrip B2B. GDS-ready.",
    tag: "Integration",
    color: "#3b82f6",
  },
];

const problems = [
  "Manually copying fares from TBO, Akbar & MakeMyTrip portals each day",
  "Clients waiting hours for a quote while rivals confirm in minutes",
  "WhatsApp threads scattered across staff phones — no audit trail",
  "CRM entries done by hand after every single enquiry",
];

const gains = [
  "Live fare sync across all portals, displayed in your own branded UI",
  "Automated quote emails and WhatsApp confirmations on every lead",
  "Centralised Directus dashboard — every booking, agent and lead in one view",
  "n8n auto-creates CRM entries, assigns agents and triggers onboarding",
];

const deliverables = [
  "Custom-branded Next.js booking frontend",
  "Directus admin — roles, permissions, audit log",
  "n8n flows: CRM, WhatsApp & onboarding automation",
  "TBO / Akbar / MakeMyTrip API integration",
  "Staging deployment + 2-week handover & support",
];

/* ═══════════════════════════════════════════════════════════════ */
export default function UKTravelPlatformPage() {
  const [videoOpen, setVideoOpen] = useState(false);

  /* parallax hero line */
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const lineY = useTransform(heroScroll, [0, 1], ["0%", "60%"]);

  return (
    <div className="bg-white text-zinc-900 overflow-x-hidden font-sans antialiased">
      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />

      {/* ═══ HERO ══════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-between overflow-hidden border-b border-zinc-200"
      >
        {/* big ruled lines — editorial feel */}
        <motion.div
          style={{ y: lineY }}
          className="pointer-events-none absolute inset-0 flex flex-col justify-between"
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="w-full h-px bg-zinc-100" />
          ))}
        </motion.div>

        {/* top bar */}
        <div className="relative z-10 flex items-center justify-between px-8 md:px-16 pt-10 pb-6 border-b border-zinc-200">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400">
            Infygru · UK Travel Platform
          </span>
          <a
            href="#pricing"
            className="group hidden sm:inline-flex items-center gap-2 text-xs font-bold tracking-wide uppercase text-zinc-900 border border-zinc-900 px-5 py-2.5 hover:bg-zinc-900 hover:text-white transition-colors duration-200"
          >
            Get Started <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* main headline */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-16 py-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs font-bold tracking-[0.25em] uppercase text-zinc-400 mb-6"
          >
            Custom Travel Platform Engineering
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3rem,8vw,7.5rem)] font-black leading-[0.9] tracking-tighter text-zinc-900 max-w-6xl"
            >
              Stop Losing
              <br />
              <em className="not-italic text-transparent" style={{ WebkitTextStroke: "2px #18181b" }}>
                Bookings
              </em>
              <br />
              to Manual Work.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 text-lg text-zinc-500 max-w-lg leading-relaxed"
          >
            A white-label booking platform with live API sync, automated
            WhatsApp, and a self-hosted admin dashboard. Built for UK travel
            businesses that want to own their infrastructure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-12 flex flex-wrap items-center gap-5"
          >
            <a
              href="#pricing"
              className="group inline-flex items-center gap-3 bg-zinc-900 text-white text-sm font-bold tracking-wide uppercase px-8 py-4 hover:bg-zinc-700 transition-colors duration-200"
            >
              Book a Platform Demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              onClick={() => setVideoOpen(true)}
              className="group inline-flex items-center gap-3 text-sm font-bold tracking-wide uppercase text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              <span className="w-10 h-10 rounded-full border-2 border-zinc-300 group-hover:border-zinc-900 flex items-center justify-center transition-colors">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </span>
              Watch Demo
            </button>
          </motion.div>
        </div>

        {/* bottom stat bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="relative z-10 border-t border-zinc-200 grid grid-cols-3 divide-x divide-zinc-200"
        >
          {[
            ["£1,499", "Flat setup — one payment"],
            ["48h", "To staging environment"],
            ["£0/mo", "Zero SaaS retainers"],
          ].map(([val, label]) => (
            <div key={val} className="px-8 md:px-16 py-6">
              <div className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">
                {val}
              </div>
              <div className="text-xs text-zinc-400 mt-1 font-medium">{label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ═══ PROOF — LIVE PLATFORMS ═══════════════════════════════ */}
      <section className="border-b border-zinc-200">
        <div className="px-8 md:px-16 py-20">
          <Reveal className="flex items-end justify-between gap-6 flex-wrap mb-16">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 mb-3">
                Proof of Work
              </p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 leading-tight">
                Two platforms live.<br />Built on this exact stack.
              </h2>
            </div>
            <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
              Both are running real bookings for real customers right now — not
              mockups, not demos.
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-0 border border-zinc-200">
            {/* MyPerfectTrips */}
            <RevealX from="left" className="border-b lg:border-b-0 lg:border-r border-zinc-200">
              <div className="group h-full flex flex-col">
                {/* browser bar */}
                <div className="flex items-center gap-2 px-5 py-3 bg-zinc-50 border-b border-zinc-200">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <div className="ml-3 flex-1 bg-white border border-zinc-200 rounded px-3 py-1 text-[11px] text-zinc-400 font-mono">
                    myperfecttrips.com
                  </div>
                  <a href="https://myperfecttrips.com" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-400 hover:text-zinc-900 transition-colors" />
                  </a>
                </div>

                {/* site preview */}
                <div className="relative h-[280px] bg-slate-950 overflow-hidden flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-slate-900 to-slate-950" />
                  {/* mini nav */}
                  <div className="relative flex items-center justify-between px-6 py-4 border-b border-white/5">
                    <span className="text-[11px] font-black text-white tracking-widest uppercase">MyPerfectTrips</span>
                    <div className="flex gap-5 text-[9px] text-slate-400 uppercase tracking-wide">
                      {["Holidays", "Flights", "Visa", "MICE"].map((t) => (<span key={t}>{t}</span>))}
                    </div>
                  </div>
                  <div className="relative px-6 pt-6">
                    <p className="text-[9px] text-blue-400 uppercase tracking-widest mb-2">Manchester&apos;s Premier Travel Agency</p>
                    <h3 className="text-2xl font-black text-white leading-tight mb-4">
                      Discover the World,<br />Your Way
                    </h3>
                    <div className="flex gap-2">
                      <span className="px-3 py-1.5 bg-blue-600 text-[9px] font-bold text-white uppercase tracking-wide">Explore Holidays</span>
                      <span className="px-3 py-1.5 border border-white/20 text-[9px] text-white/70 uppercase tracking-wide">99% Visa Success</span>
                    </div>
                    <div className="mt-5 flex gap-2 flex-wrap">
                      {["Dubai", "Turkey", "Egypt", "Paris", "Maldives"].map((d) => (
                        <span key={d} className="px-2.5 py-1 bg-white/5 border border-white/10 text-[9px] text-slate-300 rounded-sm">{d}</span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 grid grid-cols-3 border-t border-white/8 bg-black/30">
                    {[["99%", "Visa Success Rate"], ["50+", "Destinations"], ["24/7", "Support"]].map(([v, l]) => (
                      <div key={l} className="py-3 text-center border-r border-white/8 last:border-0">
                        <div className="text-[11px] font-bold text-blue-400">{v}</div>
                        <div className="text-[8px] text-slate-500 mt-0.5">{l}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1 gap-5 bg-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-black text-zinc-900">MyPerfectTrips</h3>
                      <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" /> Manchester, United Kingdom
                      </p>
                    </div>
                    <a href="https://myperfecttrips.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-zinc-900 border border-zinc-900 px-3 py-1.5 hover:bg-zinc-900 hover:text-white transition-colors">
                      Live site <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    Full-stack booking platform — holiday packages, Schengen visa management, MICE coordination, and corporate travel. Live API sync, automated confirmations.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-100">
                    {["Next.js", "Directus", "n8n", "TBO API", "WhatsApp Auto"].map((tag) => (
                      <span key={tag} className="text-[10px] font-semibold px-2.5 py-1 bg-zinc-100 text-zinc-500 uppercase tracking-wide">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </RevealX>

            {/* IG Holidays */}
            <RevealX from="right">
              <div className="group h-full flex flex-col">
                <div className="flex items-center gap-2 px-5 py-3 bg-zinc-50 border-b border-zinc-200">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <div className="ml-3 flex-1 bg-white border border-zinc-200 rounded px-3 py-1 text-[11px] text-zinc-400 font-mono">
                    igholidays.com
                  </div>
                  <a href="https://igholidays.com" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-400 hover:text-zinc-900 transition-colors" />
                  </a>
                </div>

                <div className="relative h-[280px] bg-stone-950 overflow-hidden flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-stone-950 to-stone-950" />
                  <div className="relative flex items-center justify-between px-6 py-4 border-b border-white/5">
                    <span className="text-[11px] font-black text-amber-400 tracking-widest uppercase">IG Holidays</span>
                    <div className="flex gap-5 text-[9px] text-stone-400 uppercase tracking-wide">
                      {["Packages", "Flights", "Honeymoon", "MICE"].map((t) => (<span key={t}>{t}</span>))}
                    </div>
                  </div>
                  <div className="relative px-6 pt-6">
                    <p className="text-[9px] text-amber-400 uppercase tracking-widest mb-2">Chennai&apos;s Best Travel Agency</p>
                    <h3 className="text-2xl font-black text-white leading-tight mb-4">
                      Best Holiday Packages<br />&amp; Flight Bookings
                    </h3>
                    <div className="flex gap-2">
                      <span className="px-3 py-1.5 bg-amber-500 text-[9px] font-bold text-black uppercase tracking-wide">Explore Packages</span>
                      <span className="px-3 py-1.5 border border-white/20 text-[9px] text-white/70 uppercase tracking-wide">Corporate MICE</span>
                    </div>
                    <div className="mt-5 flex gap-2 flex-wrap">
                      {["Maldives", "Bali", "Europe", "Singapore", "Dubai"].map((d) => (
                        <span key={d} className="px-2.5 py-1 bg-white/5 border border-white/10 text-[9px] text-stone-300 rounded-sm">{d}</span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 grid grid-cols-3 border-t border-white/8 bg-black/30">
                    {[["50+", "Destinations"], ["10k+", "Happy Clients"], ["B2B", "API Ready"]].map(([v, l]) => (
                      <div key={l} className="py-3 text-center border-r border-white/8 last:border-0">
                        <div className="text-[11px] font-bold text-amber-400">{v}</div>
                        <div className="text-[8px] text-stone-500 mt-0.5">{l}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1 gap-5 bg-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-black text-zinc-900">IG Holidays</h3>
                      <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" /> Chennai, India
                      </p>
                    </div>
                    <a href="https://igholidays.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-zinc-900 border border-zinc-900 px-3 py-1.5 hover:bg-zinc-900 hover:text-white transition-colors">
                      Live site <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    International & domestic packages, honeymoon planning, corporate MICE, visa services — fully automated from lead capture through to booking confirmation.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-100">
                    {["Next.js", "Directus", "n8n", "Akbar API", "CRM Auto"].map((tag) => (
                      <span key={tag} className="text-[10px] font-semibold px-2.5 py-1 bg-zinc-100 text-zinc-500 uppercase tracking-wide">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </RevealX>
          </div>
        </div>
      </section>

      {/* ═══ VIDEO DEMO ══════════════════════════════════════════ */}
      <section className="border-b border-zinc-200">
        <div className="px-8 md:px-16 py-20">
          <Reveal className="mb-12">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 mb-3">Platform Demo</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900">See it running.</h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className="relative cursor-pointer overflow-hidden border border-zinc-200 group"
              onClick={() => setVideoOpen(true)}
            >
              {/* mock dashboard screenshot */}
              <div className="bg-zinc-950 aspect-video relative overflow-hidden">
                {/* grid */}
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-violet-900/10" />

                {/* sidebar */}
                <div className="absolute left-0 top-0 bottom-0 w-44 bg-zinc-900 border-r border-white/5 p-4 space-y-1">
                  <p className="text-[9px] font-black text-white tracking-widest uppercase mb-4 px-2">TravelAdmin</p>
                  {["Dashboard", "Bookings", "Leads", "API Sync", "Automation", "Reports", "Agents"].map((item, i) => (
                    <div key={item} className={`px-3 py-2 rounded-lg text-[10px] font-medium ${i === 0 ? "bg-blue-600 text-white" : "text-zinc-500 hover:bg-white/4"}`}>{item}</div>
                  ))}
                </div>

                {/* main content */}
                <div className="absolute left-44 right-0 top-0 bottom-0 p-5 overflow-hidden">
                  {/* top bar */}
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-xs font-bold text-white">Overview — Today</p>
                    <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" /> APIs Live
                    </span>
                  </div>
                  {/* stat cards */}
                  <div className="grid grid-cols-4 gap-3 mb-5">
                    {[["142", "Bookings", "text-emerald-400"], ["389", "Active Leads", "text-blue-400"], ["1.2k", "API Syncs", "text-violet-400"], ["97", "WhatsApp", "text-amber-400"]].map(([v, l, c]) => (
                      <div key={l} className="bg-white/4 border border-white/5 rounded-lg p-3">
                        <p className="text-[9px] text-zinc-500 mb-1">{l}</p>
                        <p className={`text-lg font-black ${c}`}>{v}</p>
                      </div>
                    ))}
                  </div>
                  {/* table */}
                  <div className="bg-white/3 border border-white/5 rounded-lg overflow-hidden text-[10px]">
                    <div className="grid grid-cols-4 px-4 py-2 border-b border-white/5 text-zinc-500 uppercase tracking-wide text-[9px]">
                      <span>Customer</span><span>Route</span><span>Source</span><span>Status</span>
                    </div>
                    {[["James R.", "LHR → DXB", "TBO API", "Confirmed", "emerald"], ["Fatima K.", "MAN → IST", "Akbar API", "Processing", "yellow"], ["Singh Travel", "LGW → BOM", "MMT API", "Confirmed", "emerald"], ["Chris M.", "STN → NYC", "Direct", "Follow-up", "blue"]].map(([n, r, s, st, c]) => (
                      <div key={n} className={`grid grid-cols-4 px-4 py-2.5 border-b border-white/4 last:border-0`}>
                        <span className="text-zinc-300">{n}</span>
                        <span className="text-zinc-500 font-mono">{r}</span>
                        <span className="text-zinc-600">{s}</span>
                        <span className={`font-semibold text-${c}-400`}>{st}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* play overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl">
                    <Play className="w-7 h-7 text-zinc-900 fill-zinc-900 ml-1" />
                  </div>
                  <span className="text-white text-sm font-bold tracking-wide uppercase bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
                    Watch Platform Demo — 3 min
                  </span>
                </motion.div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ PROBLEM → SOLUTION ══════════════════════════════════ */}
      <section className="border-b border-zinc-200">
        <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200">
          {/* Problem col */}
          <div className="px-8 md:px-16 py-20">
            <Reveal>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-red-500 mb-4">The Problem</p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900 mb-10">
                How UK travel agencies lose bookings every day.
              </h2>
            </Reveal>
            <div className="space-y-0 divide-y divide-zinc-100">
              {problems.map((p, i) => (
                <Reveal key={p} delay={i * 0.07}>
                  <div className="flex items-start gap-5 py-6">
                    <span className="w-6 h-6 rounded-full bg-red-50 border border-red-200 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                    </span>
                    <p className="text-sm text-zinc-600 leading-relaxed">{p}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Solution col */}
          <div className="px-8 md:px-16 py-20 bg-zinc-950">
            <Reveal>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-emerald-400 mb-4">The Solution</p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-10">
                Everything automated. Nothing manual.
              </h2>
            </Reveal>
            <div className="space-y-0 divide-y divide-white/5">
              {gains.map((g, i) => (
                <Reveal key={g} delay={i * 0.07}>
                  <div className="flex items-start gap-5 py-6">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-zinc-300 leading-relaxed">{g}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STACK ═══════════════════════════════════════════════ */}
      <section className="border-b border-zinc-200">
        <div className="px-8 md:px-16 pt-20 pb-0">
          <Reveal className="mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 mb-3">The Stack</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900">
              Built on tools that last.
            </h2>
          </Reveal>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-zinc-200 border-t border-zinc-200">
          {stack.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="group px-8 md:px-10 py-12 hover:bg-zinc-50 transition-colors h-full relative overflow-hidden">
                {/* accent line on top */}
                <div className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ background: s.color }} />
                <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center mb-7" style={{ borderColor: `${s.color}50`, color: s.color }}>
                  <s.icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest mb-3 block" style={{ color: s.color }}>
                  {s.tag}
                </span>
                <h3 className="text-base font-black text-zinc-900 mb-3">{s.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ NUMBERS ═════════════════════════════════════════════ */}
      <section className="border-b border-zinc-200">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-zinc-200">
          {[
            { to: 48, suffix: "h", label: "To staging environment" },
            { to: 3, suffix: " APIs", label: "Pre-integrated portals" },
            { to: 0, suffix: "/mo", prefix: "£", label: "Monthly SaaS fees" },
            { to: 100, suffix: "%", label: "White-label ownership" },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 0.07}>
              <div className="px-8 md:px-16 py-16 hover:bg-zinc-50 transition-colors">
                <div className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tight">
                  <Counter to={item.to} suffix={item.suffix} prefix={item.prefix} />
                </div>
                <p className="text-xs text-zinc-400 mt-2 font-medium uppercase tracking-wide">{item.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ PRICING ═════════════════════════════════════════════ */}
      <section id="pricing" className="border-b border-zinc-200">
        <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200">
          {/* left — copy */}
          <RevealX from="left" className="px-8 md:px-16 py-20">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 mb-4">Investment</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 leading-tight mb-6">
              One price.<br />Own it forever.
            </h2>
            <p className="text-zinc-500 leading-relaxed mb-10 max-w-md text-sm">
              No monthly licences. No vendor lock-in. No discovery retainers. You
              pay once and take full ownership of the source code and
              infrastructure.
            </p>
            <div className="space-y-0 divide-y divide-zinc-100">
              {deliverables.map((d, i) => (
                <motion.div
                  key={d}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  className="flex items-center gap-4 py-4"
                >
                  <ChevronRight className="w-4 h-4 text-zinc-300 shrink-0" />
                  <span className="text-sm text-zinc-600">{d}</span>
                </motion.div>
              ))}
            </div>
            <p className="mt-8 text-xs text-zinc-400">
              * Capped at 3 new clients per month to ensure delivery quality.
            </p>
          </RevealX>

          {/* right — price card */}
          <RevealX from="right" className="px-8 md:px-16 py-20 bg-zinc-950 flex flex-col justify-center">
            <div className="max-w-sm">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-500 mb-6">Platform Setup</p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-7xl font-black text-white tracking-tight">£1,499</span>
              </div>
              <p className="text-zinc-500 text-sm mb-10">Flat fee · one payment · zero lock-in</p>

              <div className="space-y-3 mb-10">
                {["Full source code ownership", "Self-hosted on your servers", "No vendor dependency", "Scales to 10,000+ bookings/month"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm">
                    <span className="w-1 h-1 rounded-full bg-zinc-500 shrink-0" />
                    <span className="text-zinc-400">{item}</span>
                  </div>
                ))}
              </div>

              <a
                href="mailto:hello@infygru.com?subject=UK Travel Platform — Architecture Plan"
                className="group w-full flex items-center justify-between gap-2 bg-white text-zinc-900 font-black text-sm tracking-wide uppercase px-7 py-4 hover:bg-zinc-100 transition-colors"
              >
                Claim Your Architecture Plan
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <p className="mt-5 text-xs text-zinc-600 text-center">
                Reply within 24 h · 30-min architecture call included
              </p>
            </div>
          </RevealX>
        </div>
      </section>

      {/* ═══ FOOTER ══════════════════════════════════════════════ */}
      <footer className="px-8 md:px-16 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs text-zinc-400 font-medium">
          © {new Date().getFullYear()} Infygru · UK Travel Platform Engineering
        </span>
        <span className="text-xs text-zinc-400">hello@infygru.com</span>
      </footer>
    </div>
  );
}
