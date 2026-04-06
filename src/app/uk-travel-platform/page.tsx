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
  Zap,
  Shield,
  GitBranch,
  Globe,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Terminal,
  Layers,
  RefreshCw,
  MessageSquare,
  X,
  ExternalLink,
  Play,
  MapPin,
  Users,
  Plane,
} from "lucide-react";

/* ─── helpers ─────────────────────────────────────────────────── */
function useCount(target: number, trigger: boolean, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, target, duration]);
  return val;
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function SlideIn({ children, from = "left", delay = 0, className = "" }: { children: React.ReactNode; from?: "left" | "right"; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: from === "left" ? -60 : 60 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function StatCounter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const val = useCount(target, inView);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-black tabular-nums text-white">{val}{suffix}</div>
      <div className="mt-1 text-xs text-slate-500 uppercase tracking-widest">{label}</div>
    </div>
  );
}

/* ─── terminal ticker ───────────────────────────────────────────── */
const logs = [
  "► TBO API synced — 142 fares updated",
  "► Lead captured: James R. → LHR→DXB",
  "► n8n: CRM entry created in 0.3s",
  "► WhatsApp sent: booking confirmation",
  "► Akbar API: 89 packages refreshed",
  "► Agent assigned: Fatima K. → MAN→IST",
];

function TerminalTicker() {
  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    let i = 0;
    const tick = () => { setLines((prev) => [...prev.slice(-5), logs[i % logs.length]]); i++; };
    tick();
    const id = setInterval(tick, 1800);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="rounded-xl bg-[#050810] border border-white/8 font-mono text-xs overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/6 bg-white/3">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 text-slate-500">platform.log</span>
      </div>
      <div className="p-4 space-y-1.5 min-h-[130px]">
        <AnimatePresence initial={false}>
          {lines.map((line, i) => (
            <motion.p key={line + i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: i === lines.length - 1 ? 1 : 0.4, x: 0 }} transition={{ duration: 0.3 }} className="text-emerald-400">{line}</motion.p>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── video modal ───────────────────────────────────────────────── */
function VideoModal({ open, onClose, src }: { open: boolean; onClose: () => void; src: string }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.35 }}
            className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe src={src} className="w-full h-full" allow="autoplay; fullscreen" allowFullScreen />
            <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center hover:bg-black/80 transition-colors">
              <X className="w-4 h-4 text-white" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── browser frame mockup ──────────────────────────────────────── */
function BrowserFrame({ url, children, className = "" }: { url: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 ${className}`}>
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#111827] border-b border-white/8">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <div className="ml-3 flex-1 bg-white/5 border border-white/8 rounded-md px-3 py-1 text-[10px] text-slate-400 font-mono truncate">{url}</div>
        <ExternalLink className="w-3 h-3 text-slate-600" />
      </div>
      {children}
    </div>
  );
}

/* ─── data ─────────────────────────────────────────────────────── */
const problems = [
  { icon: RefreshCw, text: "Copy-pasting fares from TBO, Akbar & MakeMyTrip every session" },
  { icon: MessageSquare, text: "WhatsApp threads scattered across staff phones with zero audit trail" },
  { icon: X, text: "Clients waiting hours for quotes — losing bookings to faster rivals" },
  { icon: Layers, text: "Manual CRM updates after every enquiry — data gaps guaranteed" },
];

const solutions = [
  "Live API sync across all three portals — fares update in real time",
  "n8n fires WhatsApp confirmations the moment a lead submits",
  "Centralised Directus admin — every booking, lead & agent in one view",
  "Automated CRM entry, agent assignment & onboarding on every new lead",
];

const features = [
  { icon: Zap, label: "Next.js Frontend", desc: "App Router, ISR caching, sub-second TTFB. SEO-ready routes per destination.", accent: "#f59e0b" },
  { icon: Shield, label: "Directus Admin", desc: "Role-based access, audit logs, self-hosted. Your data, your database.", accent: "#a78bfa" },
  { icon: GitBranch, label: "n8n Automation", desc: "Visual workflows for CRM, WhatsApp, lead routing — no glue code.", accent: "#38bdf8" },
  { icon: Globe, label: "B2B API Layer", desc: "Pre-built adapters for TBO, Akbar, MMT. GDS-ready as you scale.", accent: "#34d399" },
];

const deliverables = [
  "Custom-branded Next.js booking frontend",
  "Directus admin with roles & audit log",
  "n8n: CRM entry, WhatsApp & onboarding flows",
  "TBO / Akbar / MMT API integration",
  "Staging deploy + 2-week handover support",
];

/* ─── page ──────────────────────────────────────────────────────── */
export default function UKTravelPlatformPage() {
  const [videoOpen, setVideoOpen] = useState(false);
  // Replace with your actual Loom/YouTube embed URL
  const demoVideoSrc = "https://www.youtube.com/embed/?autoplay=1";

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="bg-[#06080F] text-white overflow-x-hidden selection:bg-blue-500/30">
      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} src={demoVideoSrc} />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 overflow-hidden">
        {/* noise */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        {/* grid */}
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />
        {/* glows */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/12 rounded-full blur-[140px]" />
          <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-violet-600/8 rounded-full blur-[120px]" />
        </motion.div>

        <div className="relative max-w-6xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full border border-blue-500/25 bg-blue-500/8 text-blue-400 text-[11px] font-bold tracking-[0.15em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            UK Travel Tech · Custom Platform Engineering
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="text-[clamp(2.4rem,5vw,4rem)] font-black leading-[1.05] tracking-tight">
                Stop Managing
                <br />
                <span style={{ WebkitTextStroke: "1px rgba(96,165,250,0.6)", color: "transparent" }}>Bookings Manually.</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">Own the Platform.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="mt-6 text-[1.05rem] text-slate-400 leading-relaxed max-w-lg">
                A white-label Next.js booking engine with Directus admin and n8n automation baked in. Live API sync, automated WhatsApp, zero monthly SaaS fees.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="mt-10 flex flex-wrap items-center gap-4">
                <a href="#pricing" className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-white text-[#06080F] font-bold text-sm hover:bg-blue-50 transition-colors shadow-xl shadow-white/10">
                  Book a Platform Demo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <button onClick={() => setVideoOpen(true)} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group">
                  <span className="w-8 h-8 rounded-full bg-white/8 border border-white/10 flex items-center justify-center group-hover:bg-white/12 transition-colors">
                    <Play className="w-3 h-3 fill-white text-white ml-0.5" />
                  </span>
                  Watch demo
                </button>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-10 flex items-center gap-6 divide-x divide-white/8">
                {[["£1,499", "flat setup"], ["48h", "to staging"], ["£0/mo", "SaaS fees"]].map(([val, sub]) => (
                  <div key={val} className="first:pl-0 pl-6">
                    <div className="text-xl font-black text-white">{val}</div>
                    <div className="text-[11px] text-slate-500 uppercase tracking-wide">{sub}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* dashboard */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} className="hidden lg:block">
              <BrowserFrame url="admin.yourtravelco.com/dashboard">
                <div className="bg-[#0A0E1A] p-5 space-y-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-400">Overview</span>
                    <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />Live</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[{ l: "Bookings Today", v: "142", c: "text-emerald-400" }, { l: "Active Leads", v: "389", c: "text-blue-400" }, { l: "API Syncs", v: "1.2k", c: "text-violet-400" }].map((s) => (
                      <div key={s.l} className="rounded-lg bg-white/3 border border-white/5 px-3 py-3">
                        <div className="text-[10px] text-slate-500 mb-1">{s.l}</div>
                        <div className={`text-xl font-bold ${s.c}`}>{s.v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-lg border border-white/5 overflow-hidden text-xs">
                    <div className="grid grid-cols-3 px-3 py-2 bg-white/2 text-[10px] text-slate-600 uppercase tracking-wide border-b border-white/5">
                      <span>Customer</span><span>Route</span><span>Status</span>
                    </div>
                    {[{ n: "James R.", r: "LHR→DXB", s: "Confirmed", c: "text-emerald-400" }, { n: "Fatima K.", r: "MAN→IST", s: "Processing", c: "text-yellow-400" }, { n: "Singh Travel", r: "LGW→BOM", s: "Confirmed", c: "text-emerald-400" }].map((row, i) => (
                      <div key={row.n} className={`grid grid-cols-3 px-3 py-2.5 ${i < 2 ? "border-b border-white/5" : ""} hover:bg-white/3`}>
                        <span className="text-slate-300">{row.n}</span>
                        <span className="text-slate-500 font-mono">{row.r}</span>
                        <span className={`font-semibold ${row.c}`}>{row.s}</span>
                      </div>
                    ))}
                  </div>
                  <TerminalTicker />
                </div>
              </BrowserFrame>
            </motion.div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
            <ChevronDown className="w-5 h-5 text-slate-600" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── LIVE PLATFORMS WE BUILT ───────────────────────────────── */}
      <section className="px-6 py-28 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-400 mb-3">Real Platforms. Live Right Now.</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight max-w-2xl">
              We built this exact stack for UK travel agencies — twice.
            </h2>
            <p className="mt-4 text-slate-400 max-w-xl text-sm leading-relaxed">
              Both are live, booking real customers, running on the same architecture we&apos;ll build for you.
            </p>
          </FadeUp>

          <div className="mt-14 grid lg:grid-cols-2 gap-8">
            {/* MyPerfectTrips */}
            <FadeUp delay={0.05}>
              <div className="group relative flex flex-col h-full rounded-2xl border border-white/8 bg-[#0A0E1A] overflow-hidden hover:border-blue-500/30 transition-colors duration-300">
                <BrowserFrame url="myperfecttrips.com">
                  {/* site mockup */}
                  <div className="relative bg-[#0d1220] overflow-hidden" style={{ height: 260 }}>
                    {/* hero bar */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950" />
                    {/* nav */}
                    <div className="relative flex items-center justify-between px-5 py-3 border-b border-white/5">
                      <span className="text-[11px] font-black text-white tracking-wide">MyPerfectTrips</span>
                      <div className="flex gap-4 text-[9px] text-slate-400">{["Holidays","Flights","Visa","MICE","Corporate"].map(t => <span key={t}>{t}</span>)}</div>
                    </div>
                    {/* hero content */}
                    <div className="relative px-5 pt-5">
                      <p className="text-[9px] text-blue-400 uppercase tracking-widest mb-1">Manchester&apos;s Premier Travel Agency</p>
                      <h3 className="text-lg font-black text-white leading-tight">Discover the World,<br />Your Way</h3>
                      <div className="mt-3 flex gap-2">
                        <span className="px-3 py-1 rounded-full bg-blue-600 text-[9px] font-bold text-white">Explore Holidays</span>
                        <span className="px-3 py-1 rounded-full border border-white/15 text-[9px] text-slate-300">Get Visa Help</span>
                      </div>
                    </div>
                    {/* destination chips */}
                    <div className="relative px-5 pt-4 flex gap-2 flex-wrap">
                      {["Dubai","Turkey","Egypt","Paris","Maldives"].map(d => (
                        <span key={d} className="px-2 py-1 rounded-md bg-white/5 border border-white/8 text-[9px] text-slate-400 flex items-center gap-1">
                          <Plane className="w-2 h-2" />{d}
                        </span>
                      ))}
                    </div>
                    {/* stats bar */}
                    <div className="absolute bottom-0 inset-x-0 flex border-t border-white/5">
                      {[["99%","Visa Success"],["50+","Destinations"],["24/7","Support"]].map(([v,l]) => (
                        <div key={l} className="flex-1 py-2 text-center border-r border-white/5 last:border-0">
                          <div className="text-[10px] font-bold text-blue-400">{v}</div>
                          <div className="text-[8px] text-slate-600">{l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </BrowserFrame>

                <div className="p-6 flex flex-col flex-1 gap-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-white text-base">MyPerfectTrips</h3>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1"><MapPin className="w-3 h-3" />Manchester, UK</p>
                    </div>
                    <a href="https://myperfecttrips.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 transition-colors border border-blue-500/25 rounded-lg px-3 py-1.5">
                      Visit <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Full booking platform with holiday packages, Schengen visa management, MICE coordination, and corporate travel — all under one branded dashboard.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {["Next.js","Directus","n8n","TBO API","WhatsApp Auto"].map(tag => (
                      <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-white/4 border border-white/8 text-slate-400">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* IG Holidays */}
            <FadeUp delay={0.12}>
              <div className="group relative flex flex-col h-full rounded-2xl border border-white/8 bg-[#0A0E1A] overflow-hidden hover:border-amber-500/30 transition-colors duration-300">
                <BrowserFrame url="igholidays.com">
                  <div className="relative bg-[#0d1220] overflow-hidden" style={{ height: 260 }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-amber-950/40 to-stone-950" />
                    {/* nav */}
                    <div className="relative flex items-center justify-between px-5 py-3 border-b border-white/5">
                      <span className="text-[11px] font-black text-amber-400 tracking-wide">IG Holidays</span>
                      <div className="flex gap-4 text-[9px] text-slate-400">{["Packages","Flights","Honeymoon","MICE","Visa"].map(t => <span key={t}>{t}</span>)}</div>
                    </div>
                    {/* hero content */}
                    <div className="relative px-5 pt-5">
                      <p className="text-[9px] text-amber-400 uppercase tracking-widest mb-1">Chennai&apos;s Best Travel Agency</p>
                      <h3 className="text-lg font-black text-white leading-tight">Best Holiday Packages<br />&amp; Flight Bookings</h3>
                      <div className="mt-3 flex gap-2">
                        <span className="px-3 py-1 rounded-full bg-amber-500 text-[9px] font-bold text-black">Explore Packages</span>
                        <span className="px-3 py-1 rounded-full border border-white/15 text-[9px] text-slate-300">Corporate MICE</span>
                      </div>
                    </div>
                    {/* destination chips */}
                    <div className="relative px-5 pt-4 flex gap-2 flex-wrap">
                      {["Maldives","Bali","Europe","Singapore","Dubai"].map(d => (
                        <span key={d} className="px-2 py-1 rounded-md bg-white/5 border border-white/8 text-[9px] text-slate-400 flex items-center gap-1">
                          <Plane className="w-2 h-2" />{d}
                        </span>
                      ))}
                    </div>
                    {/* stats bar */}
                    <div className="absolute bottom-0 inset-x-0 flex border-t border-white/5">
                      {[["50+","Destinations"],["10k+","Happy Clients"],["B2B","API Ready"]].map(([v,l]) => (
                        <div key={l} className="flex-1 py-2 text-center border-r border-white/5 last:border-0">
                          <div className="text-[10px] font-bold text-amber-400">{v}</div>
                          <div className="text-[8px] text-slate-600">{l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </BrowserFrame>

                <div className="p-6 flex flex-col flex-1 gap-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-white text-base">IG Holidays</h3>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1"><MapPin className="w-3 h-3" />Chennai, India</p>
                    </div>
                    <a href="https://igholidays.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 transition-colors border border-amber-500/25 rounded-lg px-3 py-1.5">
                      Visit <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    International & domestic packages, honeymoon planning, corporate MICE, visa services — fully automated from lead capture to booking confirmation.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {["Next.js","Directus","n8n","Akbar API","CRM Auto"].map(tag => (
                      <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-white/4 border border-white/8 text-slate-400">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* proof bar */}
          <FadeUp delay={0.2} className="mt-10">
            <div className="rounded-xl border border-white/6 bg-white/2 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <Users className="w-4 h-4 text-blue-400" />
                Both platforms are live and handling real bookings right now.
              </div>
              <a href="#pricing" className="shrink-0 inline-flex items-center gap-1.5 text-blue-400 font-semibold text-sm hover:text-blue-300 transition-colors">
                Get yours built <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── VIDEO DEMO ────────────────────────────────────────────── */}
      <section className="px-6 py-28 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="text-center mb-10">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-400 mb-3">Platform Demo</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">See it in action.</h2>
            <p className="mt-3 text-slate-400 text-sm">3-minute walkthrough of the admin dashboard, API sync, and n8n automation flows.</p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="relative rounded-2xl overflow-hidden border border-white/8 shadow-2xl shadow-black/60 group cursor-pointer" onClick={() => setVideoOpen(true)}>
              {/* poster / thumbnail */}
              <div className="relative bg-[#0A0E1A] aspect-video flex items-center justify-center">
                {/* background pattern */}
                <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-violet-900/20" />

                {/* mock UI inside */}
                <div className="relative w-full h-full p-6 flex gap-4">
                  {/* sidebar */}
                  <div className="w-32 shrink-0 space-y-1.5">
                    {["Dashboard","Bookings","Leads","API Sync","Automation","Reports"].map((item, i) => (
                      <div key={item} className={`px-3 py-1.5 rounded-lg text-[9px] font-medium ${i === 0 ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-white/3"}`}>{item}</div>
                    ))}
                  </div>
                  {/* main content */}
                  <div className="flex-1 space-y-3">
                    <div className="grid grid-cols-4 gap-2">
                      {[["142","Bookings","emerald"],["389","Leads","blue"],["1.2k","Syncs","violet"],["97","WhatsApp","yellow"]].map(([v,l,c]) => (
                        <div key={l} className="rounded-lg bg-white/3 border border-white/5 p-2.5">
                          <div className="text-[8px] text-slate-500">{l}</div>
                          <div className={`text-base font-bold text-${c}-400`}>{v}</div>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-lg bg-white/2 border border-white/5 p-3 space-y-1.5">
                      {[["James R.","LHR→DXB","Confirmed","emerald"],["Fatima K.","MAN→IST","Processing","yellow"],["Singh Travel","LGW→BOM","Confirmed","emerald"]].map(([n,r,s,c]) => (
                        <div key={n} className="flex items-center justify-between text-[9px]">
                          <span className="text-slate-300 w-24">{n}</span>
                          <span className="text-slate-500 font-mono">{r}</span>
                          <span className={`text-${c}-400 font-semibold`}>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* play button overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-2xl shadow-black/50">
                    <Play className="w-6 h-6 text-[#06080F] fill-[#06080F] ml-0.5" />
                  </motion.div>
                </div>
              </div>

              {/* caption bar */}
              <div className="bg-[#0d1220] border-t border-white/6 px-5 py-3 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Platform walkthrough — admin, API sync & n8n flows</span>
                <span className="text-[11px] text-slate-600">~3 min</span>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── PROBLEM → SOLUTION ────────────────────────────────────── */}
      <section id="how-it-works" className="px-6 py-28 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-red-400 mb-4">The Problem</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight max-w-xl">Every manual step is a booking you didn&apos;t close.</h2>
          </FadeUp>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {problems.map((p, i) => (
              <FadeUp key={p.text} delay={i * 0.08}>
                <div className="h-full rounded-xl border border-red-500/15 bg-red-950/10 p-6 hover:border-red-500/30 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
                    <p.icon className="w-4 h-4 text-red-400" />
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{p.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp className="flex justify-center my-14">
            <div className="flex flex-col items-center gap-2">
              <div className="w-px h-12 bg-gradient-to-b from-red-500/40 to-emerald-500/40" />
              <span className="text-xs text-slate-500 uppercase tracking-widest">vs</span>
              <div className="w-px h-12 bg-gradient-to-b from-emerald-500/40 to-transparent" />
            </div>
          </FadeUp>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <SlideIn from="left">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-emerald-400 mb-4">The Platform Way</p>
              <h3 className="text-3xl font-black tracking-tight mb-8">One platform. Everything automated.</h3>
              <ul className="space-y-4">
                {solutions.map((s, i) => (
                  <motion.li key={s} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm leading-relaxed">{s}</span>
                  </motion.li>
                ))}
              </ul>
            </SlideIn>

            <SlideIn from="right" delay={0.1}>
              <div className="rounded-2xl border border-white/8 bg-[#0A0E1A] p-6 space-y-3">
                {[
                  { label: "TBO / Akbar / MMT APIs", color: "bg-blue-500", w: "w-full" },
                  { label: "Next.js Booking Frontend", color: "bg-indigo-500", w: "w-5/6" },
                  { label: "Directus Admin Dashboard", color: "bg-violet-500", w: "w-4/6" },
                  { label: "n8n Automation Engine", color: "bg-emerald-500", w: "w-3/6" },
                  { label: "WhatsApp / CRM / Email", color: "bg-yellow-500", w: "w-2/6" },
                ].map((layer, i) => (
                  <motion.div key={layer.label} initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }} style={{ transformOrigin: "left" }} className={layer.w}>
                    <div className={`rounded-lg ${layer.color}/15 border border-white/8 px-4 py-3 flex items-center gap-3`}>
                      <span className={`w-2 h-2 rounded-full ${layer.color} shrink-0`} />
                      <span className="text-xs font-semibold text-slate-300">{layer.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────── */}
      <section className="px-6 py-28 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="mb-14">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-400 mb-4">What&apos;s Inside</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Built on tools that last.</h2>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
            {features.map((f, i) => (
              <motion.div key={f.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.55 }} className="group bg-[#06080F] p-8 hover:bg-[#0A0E1A] transition-colors">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: `${f.accent}18`, border: `1px solid ${f.accent}30` }}>
                  <f.icon className="w-5 h-5" style={{ color: f.accent }} />
                </div>
                <h3 className="font-bold text-base text-white mb-2">{f.label}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                <div className="mt-6 h-px w-0 group-hover:w-full transition-all duration-500" style={{ background: f.accent }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <section className="px-6 py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-10">
          <StatCounter target={48} suffix="h" label="To Staging" />
          <StatCounter target={3} suffix=" APIs" label="Pre-integrated" />
          <StatCounter target={0} suffix="/mo" label="SaaS Retainer" />
          <StatCounter target={100} suffix="%" label="White-label" />
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────────── */}
      <section id="pricing" className="px-6 py-28 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <SlideIn from="left">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-400 mb-4">Pricing</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-6">
              One price.<br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Everything included.</span>
            </h2>
            <p className="text-slate-400 leading-relaxed max-w-md">No discovery fees. No monthly licences. No hidden retainers. Pay once, own it forever.</p>
            <div className="mt-8 space-y-3">
              {deliverables.map((d, i) => (
                <motion.div key={d} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                  {d}
                </motion.div>
              ))}
            </div>
            <p className="mt-6 text-xs text-slate-600">* Spots capped at 3 new clients per month.</p>
          </SlideIn>

          <SlideIn from="right" delay={0.1}>
            <div className="relative">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-blue-500/30 via-indigo-500/20 to-violet-500/30 blur-sm" />
              <div className="relative rounded-2xl bg-[#0A0E1A] border border-white/10 p-10">
                <span className="text-7xl font-black tracking-tight text-white">£1,499</span>
                <p className="text-slate-400 text-sm mt-2 mb-8">Flat setup · one payment · zero lock-in</p>
                <div className="space-y-3 mb-10">
                  {["Full source code ownership", "Self-hosted on your infrastructure", "No vendor dependency", "Scalable to 10k+ bookings/month"].map(item => (
                    <div key={item} className="flex items-center gap-2.5 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
                <a href="mailto:hello@infygru.com?subject=UK Travel Platform - Architecture Plan" className="group w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/30 hover:-translate-y-0.5">
                  Claim Your Architecture Plan
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-600">
                  <Terminal className="w-3 h-3" />
                  Reply within 24 hours · 30-min architecture call
                </div>
              </div>
            </div>
          </SlideIn>
        </div>
      </section>

      <footer className="px-6 py-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-700">
        <span>© {new Date().getFullYear()} Infygru · UK Travel Platform Engineering</span>
        <span>hello@infygru.com</span>
      </footer>
    </main>
  );
}
