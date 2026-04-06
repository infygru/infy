"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CircleCheck,
  Play,
  X,
  ExternalLink,
  Zap,
  Shield,
  GitBranch,
  Globe,
  MapPin,
  ChevronDown,
} from "lucide-react";

/* ─── reusable animation wrappers ───────────────────────────────── */
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ScaleIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── counter ───────────────────────────────────────────────────── */
function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1400, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * to));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

/* ─── video modal ───────────────────────────────────────────────── */
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Replace content below with your iframe embed */}
            <div className="w-full h-full bg-zinc-950 flex items-center justify-center text-zinc-600 text-sm">
              Paste your Loom / YouTube embed URL here
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── terminal log ticker ───────────────────────────────────────── */
const logLines = [
  "► TBO API synced — 142 fares updated in 0.4s",
  "► Lead captured: James R. → LHR → DXB",
  "► n8n: CRM entry + agent assigned in 0.3s",
  "► WhatsApp confirmation sent automatically",
  "► Akbar API: 89 holiday packages refreshed",
  "► n8n: Onboarding email triggered for Fatima K.",
];

function LiveLog() {
  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    let i = 0;
    const tick = () => {
      setLines((p) => [...p.slice(-4), logLines[i % logLines.length]]);
      i++;
    };
    tick();
    const id = setInterval(tick, 2000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 font-mono text-[11px] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 bg-white/4">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
        <span className="ml-2 text-white/30 text-[10px]">platform.live.log</span>
        <span className="ml-auto flex items-center gap-1.5 text-emerald-400 text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />LIVE
        </span>
      </div>
      <div className="p-4 space-y-2 min-h-[110px]">
        <AnimatePresence initial={false}>
          {lines.map((line, i) => (
            <motion.div
              key={line + i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: i === lines.length - 1 ? 1 : 0.35, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-emerald-300 leading-relaxed"
            >
              {line}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── data ──────────────────────────────────────────────────────── */
const stack = [
  {
    icon: Zap,
    title: "Next.js Frontend",
    body: "App Router, ISR caching, sub-second load. SEO-optimised routes per destination and search term.",
    gradient: "from-amber-400/20 via-orange-400/10 to-transparent",
    border: "border-amber-400/20",
    iconGrad: "from-amber-400 to-orange-500",
    tag: "Performance",
  },
  {
    icon: Shield,
    title: "Directus Admin",
    body: "Role-based access, audit logs, fully self-hosted. Your data lives on your servers — nobody else's.",
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    border: "border-violet-400/20",
    iconGrad: "from-violet-400 to-purple-600",
    tag: "Security",
  },
  {
    icon: GitBranch,
    title: "n8n Automation",
    body: "Visual workflows for CRM, WhatsApp, lead routing and onboarding. No glue code, no engineers needed.",
    gradient: "from-emerald-400/20 via-teal-400/10 to-transparent",
    border: "border-emerald-400/20",
    iconGrad: "from-emerald-400 to-teal-500",
    tag: "Automation",
  },
  {
    icon: Globe,
    title: "B2B API Layer",
    body: "Pre-built connectors for TBO Holidays, Akbar Online, and MakeMyTrip B2B. GDS-ready as you scale.",
    gradient: "from-sky-400/20 via-blue-400/10 to-transparent",
    border: "border-sky-400/20",
    iconGrad: "from-sky-400 to-blue-600",
    tag: "Integration",
  },
];

const problems = [
  "Manually copying fares from TBO, Akbar & MakeMyTrip portals each day",
  "Clients waiting hours for a quote while competitors confirm in minutes",
  "WhatsApp threads across staff phones — no records, no audit trail",
  "CRM entries done by hand after every single enquiry — data gaps everywhere",
];

const gains = [
  "Live fare sync across all portals, displayed in your own branded UI instantly",
  "Automated quote emails and WhatsApp confirmations fire the moment a lead arrives",
  "One Directus dashboard — every booking, lead and agent in a single view",
  "n8n auto-creates CRM entries, assigns agents and triggers onboarding workflows",
];

const deliverables = [
  "Custom-branded Next.js booking frontend",
  "Directus admin with roles, permissions & audit log",
  "n8n flows: CRM entry, WhatsApp & onboarding automation",
  "TBO / Akbar / MakeMyTrip API integration",
  "Staging deployment + 2-week handover & support",
];

/* ═══════════════════════════════════════════════════════════════ */
export default function UKTravelPlatformPage() {
  const [videoOpen, setVideoOpen] = useState(false);

  /* hero parallax */
  const heroRef = useRef(null);
  const { scrollYProgress: heroSP } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(heroSP, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(heroSP, [0, 0.7], [1, 0]);
  const heroScale = useTransform(heroSP, [0, 1], [1, 1.08]);

  /* smooth scroll indicator */
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <div className="bg-black text-white overflow-x-hidden antialiased">
      {/* progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-400 via-violet-500 to-fuchsia-500 origin-left z-50"
      />

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />

      {/* ══════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* background gradient orbs */}
        <motion.div style={{ y: heroImgY, scale: heroScale, opacity: heroOpacity }} className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.35),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_60%,rgba(14,165,233,0.2),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_20%_70%,rgba(168,85,247,0.15),transparent)]" />
        </motion.div>

        {/* noise */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

        {/* badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-2 text-[11px] font-semibold tracking-[0.15em] uppercase text-white/60"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          UK Travel Platform Engineering
        </motion.div>

        {/* headline */}
        <div className="relative overflow-hidden mb-6">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,8vw,7rem)] font-black leading-[1.0] tracking-[-0.03em] max-w-5xl"
          >
            Your Travel Business
            <br />
            <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Runs Itself.
            </span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed mb-12 font-light"
        >
          A white-label booking platform with live API sync, automated WhatsApp, and a self-hosted admin dashboard — built for UK travel agencies that want to own their infrastructure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="relative flex flex-wrap items-center justify-center gap-4 mb-20"
        >
          <a
            href="#pricing"
            className="group inline-flex items-center gap-2.5 rounded-full bg-white text-black font-bold text-sm px-8 py-4 hover:bg-white/90 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
          >
            Book a Platform Demo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <button
            onClick={() => setVideoOpen(true)}
            className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm px-6 py-4 text-sm font-semibold text-white/80 hover:border-white/30 hover:text-white transition-all duration-300"
          >
            <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <Play className="w-3 h-3 fill-white ml-0.5" />
            </span>
            Watch Demo
          </button>
        </motion.div>

        {/* dashboard float */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl"
        >
          {/* glow behind dashboard */}
          <div className="absolute -inset-10 bg-gradient-to-t from-transparent via-violet-500/10 to-transparent rounded-3xl pointer-events-none" />

          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.8)] bg-[#0d1117]">
            {/* mac bar */}
            <div className="flex items-center gap-2 px-5 py-3.5 bg-[#161b22] border-b border-white/6">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="mx-auto text-[11px] text-white/25 font-mono">admin.yourtravelco.com / dashboard</span>
            </div>
            <div className="grid grid-cols-[180px_1fr] min-h-[380px]">
              {/* sidebar */}
              <div className="bg-[#0d1117] border-r border-white/5 p-4 space-y-1">
                <p className="text-[9px] font-black uppercase tracking-widest text-white/30 px-3 mb-5">TravelAdmin</p>
                {[["Dashboard", true], ["Bookings", false], ["Leads", false], ["API Sync", false], ["Automation", false], ["Reports", false]].map(([label, active]) => (
                  <div key={String(label)} className={`px-3 py-2 rounded-lg text-[11px] font-medium ${active ? "bg-gradient-to-r from-sky-500/20 to-violet-500/20 border border-sky-500/20 text-sky-300" : "text-white/25"}`}>
                    {String(label)}
                  </div>
                ))}
              </div>
              {/* main */}
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-white/60">Overview — Today</p>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1.5 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />All APIs Live
                  </span>
                </div>
                {/* stat cards */}
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { l: "Bookings", v: "142", g: "from-emerald-400/20 to-teal-400/5", t: "text-emerald-400", d: "+18%" },
                    { l: "Active Leads", v: "389", g: "from-sky-400/20 to-blue-400/5", t: "text-sky-400", d: "+7%" },
                    { l: "API Syncs", v: "1.2k", g: "from-violet-400/20 to-purple-400/5", t: "text-violet-400", d: "Live" },
                    { l: "WhatsApp Sent", v: "97", g: "from-amber-400/20 to-orange-400/5", t: "text-amber-400", d: "Auto" },
                  ].map((s) => (
                    <div key={s.l} className={`rounded-xl bg-gradient-to-br ${s.g} border border-white/5 p-3`}>
                      <p className="text-[9px] text-white/35 mb-1.5">{s.l}</p>
                      <p className={`text-xl font-black ${s.t}`}>{s.v}</p>
                      <p className="text-[9px] text-white/30 mt-0.5">{s.d}</p>
                    </div>
                  ))}
                </div>
                {/* table */}
                <div className="rounded-xl border border-white/5 overflow-hidden text-[11px]">
                  <div className="grid grid-cols-4 px-4 py-2 bg-white/2 text-[9px] text-white/25 uppercase tracking-wider border-b border-white/5">
                    <span>Customer</span><span>Route</span><span>Source</span><span>Status</span>
                  </div>
                  {[
                    ["James R.", "LHR → DXB", "TBO API", "Confirmed", "text-emerald-400"],
                    ["Fatima K.", "MAN → IST", "Akbar API", "Processing", "text-amber-400"],
                    ["Singh Travel", "LGW → BOM", "MMT API", "Confirmed", "text-emerald-400"],
                    ["Chris M.", "STN → NYC", "Direct", "Follow-up", "text-sky-400"],
                  ].map(([n, r, s, st, c], i) => (
                    <div key={n} className={`grid grid-cols-4 px-4 py-2.5 ${i < 3 ? "border-b border-white/4" : ""}`}>
                      <span className="text-white/60">{n}</span>
                      <span className="text-white/30 font-mono">{r}</span>
                      <span className="text-white/25">{s}</span>
                      <span className={`font-semibold ${c}`}>{st}</span>
                    </div>
                  ))}
                </div>
                <LiveLog />
              </div>
            </div>
          </div>
        </motion.div>

        {/* scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
            <ChevronDown className="w-5 h-5 text-white/20" />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PROOF — LIVE PLATFORMS
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-white text-black py-32 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-20">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 mb-5">Proof of Work</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-tight text-zinc-900 mb-5">
              Two platforms.<br />Live right now.
            </h2>
            <p className="text-zinc-400 text-lg max-w-lg mx-auto font-light">
              Not mockups. Not demos. Real UK travel businesses running real bookings on this exact stack.
            </p>
          </FadeUp>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* MyPerfectTrips */}
            <ScaleIn delay={0.05}>
              <div className="group rounded-3xl overflow-hidden border border-zinc-100 hover:shadow-2xl hover:shadow-zinc-200/80 transition-all duration-500 hover:-translate-y-1 bg-white">
                {/* browser bar */}
                <div className="flex items-center gap-2 px-5 py-3.5 bg-zinc-50 border-b border-zinc-100">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <div className="ml-3 flex-1 bg-white border border-zinc-200 rounded-md px-3 py-1 text-[11px] text-zinc-400 font-mono">myperfecttrips.com</div>
                  <a href="https://myperfecttrips.com" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-zinc-900 transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                {/* site hero mockup */}
                <div className="relative h-[260px] overflow-hidden bg-slate-950">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-700/50 via-slate-900 to-slate-950" />
                  <div className="relative px-6 py-5">
                    <div className="flex items-center justify-between mb-5 text-[9px] text-slate-400 uppercase tracking-widest">
                      <span className="font-black text-white">MyPerfectTrips</span>
                      <div className="flex gap-4">{["Holidays","Flights","Visa","MICE"].map(t=><span key={t}>{t}</span>)}</div>
                    </div>
                    <p className="text-[10px] text-blue-400 uppercase tracking-widest mb-2">Manchester&apos;s Premier Travel Agency</p>
                    <h3 className="text-2xl font-black text-white leading-tight mb-4">Discover the World,<br/>Your Way</h3>
                    <div className="flex gap-2 mb-4">
                      <span className="px-3 py-1.5 bg-blue-600 text-[9px] font-bold text-white rounded-sm uppercase">Explore Holidays</span>
                      <span className="px-3 py-1.5 border border-white/15 text-[9px] text-white/60 rounded-sm uppercase">99% Visa Success</span>
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {["Dubai","Turkey","Egypt","Paris","Maldives"].map(d=>(
                        <span key={d} className="px-2.5 py-1 bg-white/5 border border-white/10 text-[9px] text-slate-300 rounded-full">{d}</span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 grid grid-cols-3 border-t border-white/8 bg-black/40 backdrop-blur-sm">
                    {[["99%","Visa Success"],["50+","Destinations"],["24/7","Support"]].map(([v,l])=>(
                      <div key={l} className="py-2.5 text-center border-r border-white/8 last:border-0">
                        <div className="text-[11px] font-bold text-blue-300">{v}</div>
                        <div className="text-[8px] text-slate-500">{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-black text-lg text-zinc-900">MyPerfectTrips</h3>
                      <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3"/>Manchester, United Kingdom</p>
                    </div>
                    <a href="https://myperfecttrips.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold border border-zinc-200 rounded-full px-4 py-2 hover:border-zinc-900 hover:text-zinc-900 transition-colors text-zinc-500">
                      Live <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-4">Holiday packages, Schengen visa management, MICE coordination, and corporate travel — live API sync and automated confirmations.</p>
                  <div className="flex flex-wrap gap-2">
                    {["Next.js","Directus","n8n","TBO API","WhatsApp Auto"].map(t=>(
                      <span key={t} className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-100 text-sky-600">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </ScaleIn>

            {/* IG Holidays */}
            <ScaleIn delay={0.12}>
              <div className="group rounded-3xl overflow-hidden border border-zinc-100 hover:shadow-2xl hover:shadow-zinc-200/80 transition-all duration-500 hover:-translate-y-1 bg-white">
                <div className="flex items-center gap-2 px-5 py-3.5 bg-zinc-50 border-b border-zinc-100">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <div className="ml-3 flex-1 bg-white border border-zinc-200 rounded-md px-3 py-1 text-[11px] text-zinc-400 font-mono">igholidays.com</div>
                  <a href="https://igholidays.com" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-zinc-900 transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="relative h-[260px] overflow-hidden bg-stone-950">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-700/40 via-stone-900 to-stone-950" />
                  <div className="relative px-6 py-5">
                    <div className="flex items-center justify-between mb-5 text-[9px] text-stone-400 uppercase tracking-widest">
                      <span className="font-black text-amber-400">IG Holidays</span>
                      <div className="flex gap-4">{["Packages","Flights","Honeymoon","MICE"].map(t=><span key={t}>{t}</span>)}</div>
                    </div>
                    <p className="text-[10px] text-amber-400 uppercase tracking-widest mb-2">Chennai&apos;s Best Travel Agency</p>
                    <h3 className="text-2xl font-black text-white leading-tight mb-4">Best Holiday Packages<br/>&amp; Flight Bookings</h3>
                    <div className="flex gap-2 mb-4">
                      <span className="px-3 py-1.5 bg-amber-500 text-[9px] font-bold text-black rounded-sm uppercase">Explore Packages</span>
                      <span className="px-3 py-1.5 border border-white/15 text-[9px] text-white/60 rounded-sm uppercase">Corporate MICE</span>
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {["Maldives","Bali","Europe","Singapore","Dubai"].map(d=>(
                        <span key={d} className="px-2.5 py-1 bg-white/5 border border-white/10 text-[9px] text-stone-300 rounded-full">{d}</span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 grid grid-cols-3 border-t border-white/8 bg-black/40 backdrop-blur-sm">
                    {[["50+","Destinations"],["10k+","Happy Clients"],["B2B","API Ready"]].map(([v,l])=>(
                      <div key={l} className="py-2.5 text-center border-r border-white/8 last:border-0">
                        <div className="text-[11px] font-bold text-amber-300">{v}</div>
                        <div className="text-[8px] text-stone-500">{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-black text-lg text-zinc-900">IG Holidays</h3>
                      <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3"/>Chennai, India</p>
                    </div>
                    <a href="https://igholidays.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold border border-zinc-200 rounded-full px-4 py-2 hover:border-zinc-900 hover:text-zinc-900 transition-colors text-zinc-500">
                      Live <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-4">International & domestic packages, honeymoon planning, corporate MICE, visa services — automated from lead capture to booking confirmation.</p>
                  <div className="flex flex-wrap gap-2">
                    {["Next.js","Directus","n8n","Akbar API","CRM Auto"].map(t=>(
                      <span key={t} className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 text-amber-600">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          VIDEO DEMO
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-black py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-14">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/30 mb-5">Platform Demo</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-5">See it running.</h2>
            <p className="text-white/40 text-lg font-light">3 minutes. Admin, API sync, and n8n automation flows.</p>
          </FadeUp>

          <ScaleIn delay={0.1}>
            <div className="relative rounded-3xl overflow-hidden cursor-pointer group" onClick={() => setVideoOpen(true)}>
              <div className="relative aspect-video bg-[#0d1117] overflow-hidden">
                {/* gradient bg */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(99,102,241,0.2),transparent)]" />
                {/* sidebar */}
                <div className="absolute left-0 top-0 bottom-0 w-40 bg-[#0d1117] border-r border-white/5 p-4 space-y-1">
                  <p className="text-[8px] font-black uppercase tracking-widest text-white/20 px-2 mb-4">TravelAdmin</p>
                  {["Dashboard","Bookings","Leads","API Sync","Automation","Reports"].map((item,i)=>(
                    <div key={item} className={`px-3 py-2 rounded-lg text-[10px] font-medium ${i===0?"bg-gradient-to-r from-sky-500/20 to-violet-500/20 text-sky-300 border border-sky-500/20":"text-white/20"}`}>{item}</div>
                  ))}
                </div>
                {/* content */}
                <div className="absolute left-40 right-0 top-0 bottom-0 p-5 space-y-3">
                  <div className="grid grid-cols-4 gap-2">
                    {[["142","Bookings","from-emerald-400/20","text-emerald-400"],[" 389","Active Leads","from-sky-400/20","text-sky-400"],["1.2k","API Syncs","from-violet-400/20","text-violet-400"],["97","WhatsApp","from-amber-400/20","text-amber-400"]].map(([v,l,g,c])=>(
                      <div key={l} className={`rounded-xl bg-gradient-to-br ${g} to-transparent border border-white/5 p-3`}>
                        <p className="text-[8px] text-white/30 mb-1">{l}</p>
                        <p className={`text-base font-black ${c}`}>{v}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl border border-white/5 overflow-hidden text-[10px]">
                    {[["James R.","LHR→DXB","TBO","Confirmed","text-emerald-400"],["Fatima K.","MAN→IST","Akbar","Processing","text-amber-400"],["Singh Travel","LGW→BOM","MMT","Confirmed","text-emerald-400"],["Chris M.","STN→NYC","Direct","Follow-up","text-sky-400"]].map(([n,r,s,st,c])=>(
                      <div key={n} className="grid grid-cols-4 px-4 py-2.5 border-b border-white/4 last:border-0">
                        <span className="text-white/50">{n}</span>
                        <span className="text-white/25 font-mono">{r}</span>
                        <span className="text-white/20">{s}</span>
                        <span className={`font-semibold ${c}`}>{st}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* play overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="flex flex-col items-center gap-5">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-[0_0_60px_rgba(255,255,255,0.3)]">
                    <Play className="w-7 h-7 fill-black text-black ml-1" />
                  </div>
                  <span className="text-white text-sm font-bold tracking-wide uppercase bg-black/50 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/10">
                    Watch Platform Demo — 3 min
                  </span>
                </motion.div>
              </div>
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PROBLEM / SOLUTION
      ══════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6 bg-white text-black overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black tracking-tight text-zinc-900 leading-tight">
              Manual work is
              <br />
              <span className="bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent">costing you bookings.</span>
            </h2>
          </FadeUp>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* before */}
            <FadeUp delay={0.05}>
              <div className="rounded-3xl bg-zinc-50 border border-zinc-100 p-8 h-full">
                <div className="inline-flex items-center gap-2 rounded-full bg-red-50 border border-red-100 px-4 py-1.5 text-xs font-bold text-red-500 uppercase tracking-wide mb-8">Before</div>
                <div className="space-y-0 divide-y divide-zinc-100">
                  {problems.map((p, i) => (
                    <motion.div
                      key={p}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="flex items-start gap-4 py-5"
                    >
                      <span className="w-5 h-5 rounded-full border-2 border-red-200 bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      </span>
                      <p className="text-sm text-zinc-600 leading-relaxed">{p}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* after */}
            <FadeUp delay={0.1}>
              <div className="rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 border border-zinc-700/50 p-8 h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(99,102,241,0.15),transparent)]" />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wide mb-8">After</div>
                  <div className="space-y-0 divide-y divide-white/5">
                    {gains.map((g, i) => (
                      <motion.div
                        key={g}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-start gap-4 py-5"
                      >
                        <CircleCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <p className="text-sm text-zinc-300 leading-relaxed">{g}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          STACK
      ══════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6 bg-black overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-20">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/30 mb-5">The Stack</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight">Built on tools that last.</h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto mt-5 font-light">
              Every layer chosen for performance, ownership and longevity. No vendor lock-in.
            </p>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stack.map((s, i) => (
              <FadeUp key={s.title} delay={i * 0.08}>
                <div className={`group rounded-3xl bg-gradient-to-br ${s.gradient} border ${s.border} p-7 h-full hover:-translate-y-2 transition-all duration-500 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                  <div className={`relative w-11 h-11 rounded-2xl bg-gradient-to-br ${s.iconGrad} flex items-center justify-center mb-6 shadow-lg`}>
                    <s.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="relative text-[10px] font-black uppercase tracking-widest text-white/30 mb-2 block">{s.tag}</span>
                  <h3 className="relative font-black text-base text-white mb-3">{s.title}</h3>
                  <p className="relative text-sm text-white/40 leading-relaxed">{s.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          NUMBERS
      ══════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { to: 48, suffix: "h", prefix: "", label: "To staging environment" },
              { to: 3, suffix: " APIs", prefix: "", label: "Pre-integrated portals" },
              { to: 0, suffix: "/mo", prefix: "£", label: "Monthly SaaS fees" },
              { to: 100, suffix: "%", prefix: "", label: "White-label ownership" },
            ].map((item, i) => (
              <FadeUp key={item.label} delay={i * 0.07} className="text-center">
                <div className="text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-br from-zinc-900 to-zinc-600 bg-clip-text text-transparent">
                  <Counter to={item.to} suffix={item.suffix} prefix={item.prefix} />
                </div>
                <p className="text-xs text-zinc-400 mt-3 font-medium uppercase tracking-widest">{item.label}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PRICING
      ══════════════════════════════════════════════════════════ */}
      <section id="pricing" className="py-32 px-6 bg-black overflow-hidden">
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/30 mb-5">Investment</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6">One price. Own it forever.</h2>
            <p className="text-white/40 text-lg font-light max-w-xl mx-auto mb-16">
              No monthly licences. No vendor lock-in. No hidden retainers. Pay once, own the architecture permanently.
            </p>
          </FadeUp>

          <ScaleIn delay={0.1}>
            <div className="relative rounded-3xl overflow-hidden">
              {/* gradient border effect */}
              <div className="absolute -inset-[1px] bg-gradient-to-br from-sky-500/50 via-violet-500/50 to-fuchsia-500/50 rounded-3xl" />
              <div className="relative bg-[#0d1117] rounded-3xl p-10 md:p-14">
                {/* glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(139,92,246,0.15),transparent)] rounded-3xl" />
                <div className="relative">
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-8xl md:text-9xl font-black tracking-tight text-white">£1,499</span>
                  </div>
                  <p className="text-white/35 text-base mb-10">Flat setup · one payment · zero lock-in</p>

                  <div className="grid sm:grid-cols-2 gap-3 mb-12 text-left">
                    {deliverables.map((d) => (
                      <div key={d} className="flex items-start gap-3 p-4 rounded-2xl bg-white/4 border border-white/6">
                        <CircleCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-white/60 leading-snug">{d}</span>
                      </div>
                    ))}
                    <div className="flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-br from-sky-500/10 to-violet-500/10 border border-sky-500/20">
                      <CircleCheck className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-white/60 leading-snug">Full source code — you own it completely</span>
                    </div>
                  </div>

                  <a
                    href="mailto:hello@infygru.com?subject=UK Travel Platform — Architecture Plan"
                    className="group w-full flex items-center justify-center gap-3 rounded-2xl bg-white text-black font-black text-base px-8 py-5 hover:bg-white/90 transition-all duration-300 shadow-[0_0_60px_rgba(255,255,255,0.1)] mb-5"
                  >
                    Claim Your Architecture Plan
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <p className="text-white/20 text-xs">
                    Reply within 24 hours · 30-min architecture call included · 3 spots/month
                  </p>
                </div>
              </div>
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* footer */}
      <div className="bg-black border-t border-white/5 px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs text-white/20 font-medium">© {new Date().getFullYear()} Infygru · UK Travel Platform Engineering</span>
        <span className="text-xs text-white/20">hello@infygru.com</span>
      </div>
    </div>
  );
}
