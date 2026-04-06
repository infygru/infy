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
  X,
  ChevronDown,
  Terminal,
  Layers,
  RefreshCw,
  MessageSquare,
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
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SlideIn({
  children,
  from = "left",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  from?: "left" | "right";
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: from === "left" ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── data ─────────────────────────────────────────────────────── */
const problems = [
  {
    icon: RefreshCw,
    text: "Copy-pasting fares from TBO, Akbar & MakeMyTrip every session",
  },
  {
    icon: MessageSquare,
    text: "WhatsApp threads scattered across staff phones with zero audit trail",
  },
  { icon: X, text: "Clients waiting hours for quotes — losing to faster rivals" },
  {
    icon: Layers,
    text: "Manual CRM updates after every enquiry — data gaps guaranteed",
  },
];

const solutions = [
  "Live API sync across all three portals — fares update in real time",
  "n8n fires WhatsApp confirmations the moment a lead submits",
  "Centralised Directus admin — every booking, lead & agent in one view",
  "Automated CRM entry, agent assignment & onboarding on every new lead",
];

const features = [
  {
    icon: Zap,
    label: "Next.js Frontend",
    desc: "App Router, ISR caching, sub-second TTFB. SEO-ready routes per destination.",
    accent: "#f59e0b",
  },
  {
    icon: Shield,
    label: "Directus Admin",
    desc: "Role-based access, audit logs, self-hosted. Your data, your database.",
    accent: "#a78bfa",
  },
  {
    icon: GitBranch,
    label: "n8n Automation",
    desc: "Visual workflows for CRM, WhatsApp, lead routing — no glue code.",
    accent: "#38bdf8",
  },
  {
    icon: Globe,
    label: "B2B API Layer",
    desc: "Pre-built adapters for TBO, Akbar, MMT. GDS-ready as you scale.",
    accent: "#34d399",
  },
];

const deliverables = [
  "Custom-branded Next.js booking frontend",
  "Directus admin with roles & audit log",
  "n8n: CRM entry, WhatsApp & onboarding flows",
  "TBO / Akbar / MMT API integration",
  "Staging deploy + 2-week handover support",
];

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
    const tick = () => {
      setLines((prev) => [...prev.slice(-5), logs[i % logs.length]]);
      i++;
    };
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
      <div className="p-4 space-y-1.5 min-h-[140px]">
        <AnimatePresence initial={false}>
          {lines.map((line, i) => (
            <motion.p
              key={line + i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: i === lines.length - 1 ? 1 : 0.4, x: 0 }}
              transition={{ duration: 0.3 }}
              className="text-emerald-400"
            >
              {line}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── stat counter ──────────────────────────────────────────────── */
function StatCounter({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const val = useCount(target, inView);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-black tabular-nums text-white">
        {val}
        {suffix}
      </div>
      <div className="mt-1 text-xs text-slate-500 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}

/* ─── page ──────────────────────────────────────────────────────── */
export default function UKTravelPlatformPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="bg-[#06080F] text-white overflow-x-hidden selection:bg-blue-500/30">
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 overflow-hidden"
      >
        {/* noise texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* grid lines */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        {/* glow orbs */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/12 rounded-full blur-[140px]" />
          <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-violet-600/8 rounded-full blur-[120px]" />
        </motion.div>

        <div className="relative max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full border border-blue-500/25 bg-blue-500/8 text-blue-400 text-[11px] font-bold tracking-[0.15em] uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            UK Travel Tech · Custom Platform Engineering
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(2.4rem,5vw,4rem)] font-black leading-[1.05] tracking-tight"
              >
                Stop Managing
                <br />
                <span
                  className="relative"
                  style={{
                    WebkitTextStroke: "1px rgba(96,165,250,0.6)",
                    color: "transparent",
                  }}
                >
                  Bookings Manually.
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  Own the Platform.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="mt-6 text-[1.05rem] text-slate-400 leading-relaxed max-w-lg"
              >
                A white-label Next.js booking engine with a Directus admin
                dashboard and n8n automation baked in. Live API sync, automated
                WhatsApp, zero monthly SaaS fees.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <a
                  href="#pricing"
                  className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-white text-[#06080F] font-bold text-sm hover:bg-blue-50 transition-colors shadow-xl shadow-white/10"
                >
                  Book a Platform Demo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  See how it works
                  <ChevronDown className="w-4 h-4" />
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-10 flex items-center gap-6"
              >
                {[
                  ["£1,499", "flat setup"],
                  ["48h", "to staging"],
                  ["£0/mo", "SaaS fees"],
                ].map(([val, sub]) => (
                  <div key={val}>
                    <div className="text-xl font-black text-white">{val}</div>
                    <div className="text-[11px] text-slate-500 uppercase tracking-wide">
                      {sub}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* terminal + dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block"
            >
              <div className="rounded-2xl border border-white/8 bg-[#0A0E1A] overflow-hidden shadow-2xl shadow-black/60">
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/6 bg-white/2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/60" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <span className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">
                    admin.yourtravelco.com
                  </span>
                  <span className="text-[11px] text-emerald-400 font-mono">● live</span>
                </div>
                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { l: "Today's Bookings", v: "142", c: "text-emerald-400" },
                      { l: "Active Leads", v: "389", c: "text-blue-400" },
                      { l: "API Syncs", v: "1.2k", c: "text-violet-400" },
                    ].map((s) => (
                      <div
                        key={s.l}
                        className="rounded-lg bg-white/3 border border-white/5 px-3 py-3"
                      >
                        <div className="text-[10px] text-slate-500 mb-1">{s.l}</div>
                        <div className={`text-xl font-bold ${s.c}`}>{s.v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-lg border border-white/5 overflow-hidden text-xs">
                    {[
                      { n: "James R.", r: "LHR→DXB", s: "Confirmed", c: "text-emerald-400" },
                      { n: "Fatima K.", r: "MAN→IST", s: "Processing", c: "text-yellow-400" },
                      { n: "Singh Travel", r: "LGW→BOM", s: "Confirmed", c: "text-emerald-400" },
                    ].map((row, i) => (
                      <div
                        key={row.n}
                        className={`grid grid-cols-3 px-3 py-2.5 ${i < 2 ? "border-b border-white/5" : ""} hover:bg-white/3`}
                      >
                        <span className="text-slate-300">{row.n}</span>
                        <span className="text-slate-500 font-mono">{row.r}</span>
                        <span className={`font-semibold ${row.c}`}>{row.s}</span>
                      </div>
                    ))}
                  </div>
                  <TerminalTicker />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          >
            <ChevronDown className="w-5 h-5 text-slate-600" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── PROBLEM ───────────────────────────────────────────────── */}
      <section id="how-it-works" className="px-6 py-28">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-400 mb-4">
              The Problem
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight max-w-xl">
              Every manual step is a booking you didn&apos;t close.
            </h2>
          </FadeUp>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {problems.map((p, i) => (
              <FadeUp key={p.text} delay={i * 0.08}>
                <div className="group h-full rounded-xl border border-red-500/15 bg-red-950/10 p-6 hover:border-red-500/30 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
                    <p.icon className="w-4 h-4 text-red-400" />
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{p.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* divider */}
          <FadeUp className="flex justify-center my-14">
            <div className="flex flex-col items-center gap-2">
              <div className="w-px h-12 bg-gradient-to-b from-red-500/40 to-emerald-500/40" />
              <span className="text-xs text-slate-500 uppercase tracking-widest">vs</span>
              <div className="w-px h-12 bg-gradient-to-b from-emerald-500/40 to-transparent" />
            </div>
          </FadeUp>

          {/* solution */}
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <SlideIn from="left">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-emerald-400 mb-4">
                The Platform Way
              </p>
              <h3 className="text-3xl font-black tracking-tight mb-8">
                One platform. Everything automated.
              </h3>
              <ul className="space-y-4">
                {solutions.map((s, i) => (
                  <motion.li
                    key={s}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm leading-relaxed">{s}</span>
                  </motion.li>
                ))}
              </ul>
            </SlideIn>

            <SlideIn from="right" delay={0.1}>
              {/* architecture diagram */}
              <div className="rounded-2xl border border-white/8 bg-[#0A0E1A] p-6 space-y-3">
                {[
                  { label: "TBO / Akbar / MMT APIs", color: "bg-blue-500", w: "w-full" },
                  { label: "Next.js Booking Frontend", color: "bg-indigo-500", w: "w-5/6" },
                  { label: "Directus Admin Dashboard", color: "bg-violet-500", w: "w-4/6" },
                  { label: "n8n Automation Engine", color: "bg-emerald-500", w: "w-3/6" },
                  { label: "WhatsApp / CRM / Email", color: "bg-yellow-500", w: "w-2/6" },
                ].map((layer, i) => (
                  <motion.div
                    key={layer.label}
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: "left" }}
                    className={layer.w}
                  >
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
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-400 mb-4">
              What&apos;s Inside
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Built on tools that last.
            </h2>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                className="group bg-[#06080F] p-8 hover:bg-[#0A0E1A] transition-colors"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${f.accent}18`, border: `1px solid ${f.accent}30` }}
                >
                  <f.icon className="w-5 h-5" style={{ color: f.accent }} />
                </div>
                <h3 className="font-bold text-base text-white mb-2">{f.label}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                <motion.div
                  className="mt-6 h-px w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: f.accent }}
                />
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
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-400 mb-4">
              Pricing
            </p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-6">
              One price.
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Everything included.
              </span>
            </h2>
            <p className="text-slate-400 leading-relaxed max-w-md">
              No discovery fees. No monthly licences. No hidden retainers. You
              pay once, you own the architecture — forever.
            </p>
            <div className="mt-8 space-y-3">
              {deliverables.map((d, i) => (
                <motion.div
                  key={d}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 text-sm text-slate-300"
                >
                  <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                  {d}
                </motion.div>
              ))}
            </div>
            <p className="mt-6 text-xs text-slate-600">
              * Spots capped at 3 new clients per month to maintain delivery quality.
            </p>
          </SlideIn>

          <SlideIn from="right" delay={0.1}>
            <div className="relative">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-blue-500/30 via-indigo-500/20 to-violet-500/30 blur-sm" />
              <div className="relative rounded-2xl bg-[#0A0E1A] border border-white/10 p-10">
                <div className="flex items-end gap-3 mb-2">
                  <span className="text-7xl font-black tracking-tight text-white">
                    £1,499
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-8">
                  Flat setup · one payment · zero lock-in
                </p>
                <div className="space-y-3 mb-10">
                  {[
                    "Full source code ownership",
                    "Self-hosted on your infrastructure",
                    "No vendor dependency",
                    "Scalable to 10k+ bookings/month",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
                <a
                  href="mailto:hello@infygru.com?subject=UK Travel Platform - Architecture Plan"
                  className="group w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 hover:-translate-y-0.5"
                >
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

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer className="px-6 py-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-700">
        <span>© {new Date().getFullYear()} Infygru · UK Travel Platform Engineering</span>
        <span>hello@infygru.com</span>
      </footer>
    </main>
  );
}
