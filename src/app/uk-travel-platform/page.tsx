"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  CircleCheck,
  Play,
  X,
  ExternalLink,
  Zap,
  Shield,
  GitBranch,
  Globe,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

/* ══════════════════════════════════════════════
   WORD-BY-WORD REVEAL
══════════════════════════════════════════════ */
function WordReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: "105%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.75,
              delay: delay + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ══════════════════════════════════════════════
   MAGNETIC BUTTON
══════════════════════════════════════════════ */
function MagneticBtn({
  children,
  className = "",
  href,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };
  const reset = () => { x.set(0); y.set(0); };

  const inner = (
    <motion.div ref={ref} style={{ x: sx, y: sy }} onMouseMove={handleMove} onMouseLeave={reset} className={className}>
      {children}
    </motion.div>
  );

  if (href) return <a href={href}>{inner}</a>;
  return <button onClick={onClick}>{inner}</button>;
}

/* ══════════════════════════════════════════════
   MARQUEE
══════════════════════════════════════════════ */
const marqueeItems = ["TBO Holidays","Akbar Online","MakeMyTrip B2B","Next.js App Router","Directus CMS","n8n Automation","WhatsApp API","Live Fare Sync","Zero SaaS Fees","Full Code Ownership","48h to Staging"];

function Marquee() {
  return (
    <div className="overflow-hidden py-5 border-y border-white/8 bg-white/3">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span key={i} className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 flex items-center gap-10">
            {item}
            <span className="text-white/10">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   COUNTER
══════════════════════════════════════════════ */
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
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

/* ══════════════════════════════════════════════
   VIDEO MODAL
══════════════════════════════════════════════ */
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
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-full bg-zinc-950 flex items-center justify-center text-zinc-600 text-sm font-medium">
              {/* Replace with: <iframe src="YOUR_LOOM_OR_YOUTUBE_EMBED" className="w-full h-full" allow="autoplay; fullscreen" allowFullScreen /> */}
              Paste your Loom / YouTube embed URL here
            </div>
            <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur hover:bg-white/20 flex items-center justify-center transition-colors">
              <X className="w-4 h-4 text-white" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════
   STICKY FEATURE SCROLL
══════════════════════════════════════════════ */
const features = [
  {
    id: 0,
    tag: "Frontend",
    icon: Zap,
    title: "Next.js Booking Engine",
    body: "App Router architecture, ISR caching, sub-second load times. Every destination and route gets its own SEO-optimised page — built for organic traffic.",
    accent: "#f59e0b",
    visual: (
      <div className="w-full h-full bg-[#0d1117] rounded-2xl overflow-hidden border border-white/8 flex flex-col">
        <div className="flex items-center gap-2 px-5 py-3 bg-[#161b22] border-b border-white/5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70"/><span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70"/><span className="w-2.5 h-2.5 rounded-full bg-green-400/70"/>
          <span className="mx-auto text-[10px] text-white/20 font-mono">yourtravelco.com/flights/london-dubai</span>
        </div>
        <div className="flex-1 p-5 space-y-3">
          <div className="h-8 w-48 rounded-lg bg-amber-400/15 border border-amber-400/20 flex items-center px-3">
            <span className="text-[10px] text-amber-300 font-bold">⚡ Live fares · updated 2s ago</span>
          </div>
          {[["LHR → DXB","Emirates","£289","09:10 – 19:40"],["LHR → DXB","British Airways","£312","11:30 – 22:15"],["LHR → DXB","FlyDubai","£241","14:00 – 00:30"]].map(([r,a,p,t])=>(
            <div key={p} className="flex items-center justify-between p-3 rounded-xl bg-white/3 border border-white/5 hover:bg-white/5 transition-colors">
              <div>
                <p className="text-[10px] font-bold text-white">{r}</p>
                <p className="text-[9px] text-white/30 mt-0.5">{a} · {t}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-amber-400">{p}</p>
                <p className="text-[8px] text-white/20 mt-0.5">per person</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 1,
    tag: "Admin",
    icon: Shield,
    title: "Directus Admin Dashboard",
    body: "Role-based access for owners, managers and agents. Full audit logs. Self-hosted on your own server — your data never touches anyone else's infrastructure.",
    accent: "#a78bfa",
    visual: (
      <div className="w-full h-full bg-[#0d1117] rounded-2xl overflow-hidden border border-white/8 flex flex-col">
        <div className="flex items-center gap-2 px-5 py-3 bg-[#161b22] border-b border-white/5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70"/><span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70"/><span className="w-2.5 h-2.5 rounded-full bg-green-400/70"/>
          <span className="mx-auto text-[10px] text-white/20 font-mono">admin.yourtravelco.com / users</span>
        </div>
        <div className="flex-1 p-5 space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {[["Admins","2","text-violet-400"],["Managers","5","text-blue-400"],["Agents","12","text-emerald-400"]].map(([l,v,c])=>(
              <div key={l} className="p-3 rounded-xl bg-white/3 border border-white/5 text-center">
                <p className={`text-xl font-black ${c}`}>{v}</p>
                <p className="text-[9px] text-white/30 mt-0.5">{l}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-white/5 overflow-hidden text-[10px]">
            {[["Sarah K.","Admin","Full Access","text-violet-400"],["James R.","Manager","Bookings + Leads","text-blue-400"],["Fatima A.","Agent","Assigned Leads","text-emerald-400"]].map(([n,r,p,c])=>(
              <div key={n} className="grid grid-cols-3 px-3 py-2.5 border-b border-white/4 last:border-0">
                <span className="text-white/60 font-medium">{n}</span>
                <span className={`font-bold ${c}`}>{r}</span>
                <span className="text-white/25">{p}</span>
              </div>
            ))}
          </div>
          <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-violet-400"/>
            <span className="text-[10px] text-violet-300">Self-hosted · Audit log enabled · GDPR compliant</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    tag: "Automation",
    icon: GitBranch,
    title: "n8n Workflow Engine",
    body: "Visual drag-and-drop workflows that handle CRM entry, WhatsApp confirmations, agent assignment and client onboarding — automatically, on every single lead.",
    accent: "#34d399",
    visual: (
      <div className="w-full h-full bg-[#0d1117] rounded-2xl overflow-hidden border border-white/8 flex flex-col">
        <div className="flex items-center gap-2 px-5 py-3 bg-[#161b22] border-b border-white/5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70"/><span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70"/><span className="w-2.5 h-2.5 rounded-full bg-green-400/70"/>
          <span className="mx-auto text-[10px] text-white/20 font-mono">n8n.yourtravelco.com / workflows</span>
        </div>
        <div className="flex-1 p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
            <span className="text-[10px] text-emerald-400 font-bold">Lead Onboarding Flow · Active</span>
          </div>
          <div className="space-y-2">
            {[
              { label: "Webhook: New Lead Submitted", color: "bg-blue-500/20 border-blue-500/30 text-blue-300" },
              { label: "Create CRM Entry in Directus", color: "bg-violet-500/20 border-violet-500/30 text-violet-300" },
              { label: "Assign Agent by Route & Availability", color: "bg-amber-500/20 border-amber-500/30 text-amber-300" },
              { label: "Send WhatsApp Confirmation", color: "bg-emerald-500/20 border-emerald-500/30 text-emerald-300" },
              { label: "Trigger Welcome Email Sequence", color: "bg-pink-500/20 border-pink-500/30 text-pink-300" },
            ].map((node, i) => (
              <div key={i} className="flex items-center gap-3">
                {i > 0 && <div className="absolute ml-[9px] -mt-4 w-px h-4 bg-white/10"/>}
                <div className={`flex-1 px-3 py-2 rounded-lg border text-[9px] font-bold ${node.color}`}>{node.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    tag: "Integration",
    icon: Globe,
    title: "B2B API Integrations",
    body: "Pre-built connectors for TBO Holidays, Akbar Online and MakeMyTrip B2B. Fares, packages and availability update live — no manual copying, ever again.",
    accent: "#38bdf8",
    visual: (
      <div className="w-full h-full bg-[#0d1117] rounded-2xl overflow-hidden border border-white/8 flex flex-col">
        <div className="flex items-center gap-2 px-5 py-3 bg-[#161b22] border-b border-white/5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70"/><span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70"/><span className="w-2.5 h-2.5 rounded-full bg-green-400/70"/>
          <span className="mx-auto text-[10px] text-white/20 font-mono">API Status · Live Connections</span>
        </div>
        <div className="flex-1 p-5 space-y-3">
          {[
            { name: "TBO Holidays API", status: "Connected", latency: "38ms", synced: "142 fares", color: "emerald" },
            { name: "Akbar Online API", status: "Connected", latency: "51ms", synced: "89 pkgs", color: "emerald" },
            { name: "MakeMyTrip B2B", status: "Connected", latency: "44ms", synced: "203 routes", color: "emerald" },
          ].map((api) => (
            <div key={api.name} className="p-4 rounded-xl bg-white/3 border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-white">{api.name}</span>
                <span className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
                  {api.status}
                </span>
              </div>
              <div className="flex gap-4 text-[9px] text-white/30">
                <span>Latency: <span className="text-sky-400">{api.latency}</span></span>
                <span>Last sync: <span className="text-white/50">{api.synced}</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

function FeatureBadge({ feature }: { feature: typeof features[0] }) {
  const Icon = feature.icon;
  return (
    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest mb-6 border" style={{ color: feature.accent, borderColor: `${feature.accent}30`, background: `${feature.accent}10` }}>
      <Icon className="w-3.5 h-3.5" style={{ color: feature.accent }} />
      {feature.tag}
    </div>
  );
}

function StickyFeatures() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setActive(Math.min(3, Math.floor(v * 4)));
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <div ref={container} style={{ height: `${features.length * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden px-6">
        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          {/* left — text */}
          <div>
            <div className="flex gap-2 mb-10">
              {features.map((f, i) => (
                <button
                  key={f.id}
                  onClick={() => {}}
                  className="w-8 h-1 rounded-full transition-all duration-500"
                  style={{ background: i === active ? features[active].accent : "rgba(255,255,255,0.1)" }}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <FeatureBadge feature={features[active]} />
                <h3 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight mb-6">
                  {features[active].title}
                </h3>
                <p className="text-white/45 text-lg leading-relaxed font-light">
                  {features[active].body}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 flex gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.id}
                  animate={{ opacity: i === active ? 1 : 0.2, scale: i === active ? 1 : 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: features[active].accent }}
                >
                  0{i + 1}
                </motion.div>
              ))}
            </div>
          </div>

          {/* right — visual */}
          <div className="hidden lg:block h-[420px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                {features[active].visual}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   3D TILT CARD
══════════════════════════════════════════════ */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 30 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   LIVE LOG
══════════════════════════════════════════════ */
const logs = [
  "► TBO API synced — 142 fares in 0.4s",
  "► Lead: James R. → LHR→DXB captured",
  "► n8n: CRM + agent assigned in 0.3s",
  "► WhatsApp confirmation auto-sent",
  "► Akbar: 89 packages refreshed",
];

function LiveLog() {
  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    let i = 0;
    const t = () => { setLines(p => [...p.slice(-4), logs[i % logs.length]]); i++; };
    t(); const id = setInterval(t, 1800);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="rounded-xl bg-black/50 border border-white/8 font-mono text-[10px] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-white/4 border-b border-white/6">
        <span className="w-2 h-2 rounded-full bg-red-400/70"/><span className="w-2 h-2 rounded-full bg-yellow-400/70"/><span className="w-2 h-2 rounded-full bg-green-400/70"/>
        <span className="ml-2 text-white/25">platform.log</span>
        <span className="ml-auto flex items-center gap-1 text-emerald-400 text-[9px]">
          <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"/>LIVE
        </span>
      </div>
      <div className="p-4 space-y-2 min-h-[100px]">
        <AnimatePresence initial={false}>
          {lines.map((line, i) => (
            <motion.div key={line + i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: i === lines.length - 1 ? 1 : 0.3, x: 0 }} transition={{ duration: 0.35 }} className="text-emerald-300">{line}</motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════ */
export default function Page() {
  const [videoOpen, setVideoOpen] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress: heroProg } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroProg, [0, 1], ["0%", "40%"]);
  const heroO = useTransform(heroProg, [0, 0.6], [1, 0]);

  /* scroll progress bar */
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 40 });

  return (
    <div className="bg-[#09090B] text-white selection:bg-violet-500/30 overflow-x-hidden">
      {/* progress */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-400 via-violet-500 to-fuchsia-500 origin-left z-50 pointer-events-none" />

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />

      {/* ────────────────────────────────────────
          HERO
      ──────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-0 overflow-hidden">
        {/* dot grid */}
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        {/* top fade */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#09090B] to-transparent z-10" />
        {/* bottom fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-[#09090B] to-transparent z-10" />

        <motion.div style={{ y: heroY, opacity: heroO }} className="relative z-20 flex flex-col items-center text-center max-w-5xl">
          {/* pill */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur px-5 py-2 text-[11px] font-semibold tracking-widest uppercase text-white/50 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            UK Travel Platform Engineering
          </motion.div>

          {/* headline */}
          <h1 className="text-[clamp(3.2rem,8.5vw,8rem)] font-black leading-[0.95] tracking-[-0.03em] mb-8">
            <span className="block text-white">
              <WordReveal text="Your Travel Business" delay={0.1} />
            </span>
            <span className="block bg-gradient-to-r from-sky-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              <WordReveal text="Runs Itself." delay={0.3} />
            </span>
          </h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="text-xl text-white/40 max-w-2xl leading-relaxed font-light mb-12">
            A white-label booking platform with live API sync across TBO, Akbar & MakeMyTrip — automated WhatsApp, self-hosted admin, zero monthly fees.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.85 }} className="flex flex-wrap items-center justify-center gap-4">
            <MagneticBtn href="#pricing" className="inline-flex items-center gap-3 rounded-full bg-white text-black font-bold text-sm px-8 py-4 hover:bg-white/90 transition-colors shadow-[0_0_50px_rgba(255,255,255,0.12)] cursor-pointer">
              Book a Platform Demo <ArrowRight className="w-4 h-4" />
            </MagneticBtn>
            <MagneticBtn onClick={() => setVideoOpen(true)} className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/4 backdrop-blur px-6 py-4 text-sm font-semibold text-white/60 hover:text-white hover:border-white/20 transition-all cursor-pointer">
              <span className="w-7 h-7 rounded-full bg-white/8 flex items-center justify-center">
                <Play className="w-3 h-3 fill-white ml-0.5" />
              </span>
              Watch Demo
            </MagneticBtn>
          </motion.div>

          {/* inline stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="mt-14 flex items-center gap-10 text-center">
            {[["£1,499","flat setup"],["48h","to staging"],["£0/mo","forever"]].map(([v,l]) => (
              <div key={v}>
                <div className="text-2xl font-black text-white">{v}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/25 mt-0.5">{l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* floating dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 w-full max-w-5xl mt-16"
        >
          <TiltCard>
            <div className="rounded-2xl overflow-hidden border border-white/8 shadow-[0_50px_150px_rgba(0,0,0,0.8)] bg-[#0d1117]">
              <div className="flex items-center gap-2 px-5 py-3.5 bg-[#161b22] border-b border-white/5">
                <span className="w-3 h-3 rounded-full bg-red-500/60"/><span className="w-3 h-3 rounded-full bg-yellow-500/60"/><span className="w-3 h-3 rounded-full bg-green-500/60"/>
                <span className="mx-auto text-[11px] text-white/20 font-mono">admin.yourtravelco.com</span>
                <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>live</span>
              </div>
              <div className="grid grid-cols-[160px_1fr] min-h-[340px]">
                <div className="bg-[#0d1117] border-r border-white/5 p-4 space-y-1">
                  <p className="text-[8px] font-black uppercase tracking-widest text-white/20 px-2 mb-4">TravelAdmin</p>
                  {[["Dashboard",true],["Bookings",false],["Leads",false],["API Sync",false],["Automation",false],["Reports",false]].map(([label,active])=>(
                    <div key={String(label)} className={`px-3 py-2 rounded-lg text-[10px] font-medium ${active ? "bg-sky-500/15 border border-sky-500/20 text-sky-300" : "text-white/20"}`}>{String(label)}</div>
                  ))}
                </div>
                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-4 gap-3">
                    {[["142","Bookings","from-emerald-400/15","text-emerald-400"],["389","Leads","from-sky-400/15","text-sky-400"],["1.2k","API Syncs","from-violet-400/15","text-violet-400"],["97","WhatsApp","from-amber-400/15","text-amber-400"]].map(([v,l,g,c])=>(
                      <div key={l} className={`rounded-xl bg-gradient-to-br ${g} to-transparent border border-white/5 p-3`}>
                        <p className="text-[9px] text-white/30 mb-1">{l}</p>
                        <p className={`text-xl font-black ${c}`}>{v}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl border border-white/5 overflow-hidden text-[10px]">
                    <div className="grid grid-cols-4 px-4 py-2 bg-white/2 text-[9px] text-white/20 uppercase tracking-wider border-b border-white/5">
                      <span>Customer</span><span>Route</span><span>Source</span><span>Status</span>
                    </div>
                    {[["James R.","LHR→DXB","TBO","Confirmed","emerald"],["Fatima K.","MAN→IST","Akbar","Processing","amber"],["Singh Travel","LGW→BOM","MMT","Confirmed","emerald"],["Chris M.","STN→NYC","Direct","Follow-up","sky"]].map(([n,r,s,st,c])=>(
                      <div key={n} className="grid grid-cols-4 px-4 py-2.5 border-b border-white/4 last:border-0">
                        <span className="text-white/50">{n}</span><span className="text-white/25 font-mono">{r}</span><span className="text-white/20">{s}</span>
                        <span className={`font-semibold text-${c}-400`}>{st}</span>
                      </div>
                    ))}
                  </div>
                  <LiveLog />
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </section>

      {/* marquee */}
      <div className="mt-20">
        <Marquee />
      </div>

      {/* ────────────────────────────────────────
          LIVE PLATFORMS
      ──────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <WordReveal text="Two platforms. Live right now." className="block text-4xl md:text-6xl font-black tracking-tight leading-tight mb-5" />
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-white/35 text-lg max-w-lg mx-auto font-light">
              Real UK travel businesses. Real bookings. Same architecture we build for you.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {[
              {
                url: "myperfecttrips.com",
                href: "https://myperfecttrips.com",
                name: "MyPerfectTrips",
                location: "Manchester, UK",
                desc: "Holiday packages, Schengen visa management, MICE, and corporate travel — all automated.",
                tags: ["Next.js","Directus","n8n","TBO API","WhatsApp"],
                tagColor: "sky",
                accentColor: "#38bdf8",
                bg: "from-blue-700/40 via-slate-900 to-slate-950",
                siteAccent: "text-blue-300",
                btnColor: "text-sky-400 border-sky-400/30 hover:bg-sky-400/10",
                stat1: ["99%","Visa Success"], stat2: ["50+","Destinations"], stat3: ["24/7","Support"],
                headline: "Discover the World, Your Way",
                sub: "Manchester's Premier Travel Agency",
                routes: ["Dubai","Turkey","Egypt","Paris","Maldives"],
              },
              {
                url: "igholidays.com",
                href: "https://igholidays.com",
                name: "IG Holidays",
                location: "Chennai, India",
                desc: "International packages, honeymoon planning, corporate MICE and visa services — fully automated.",
                tags: ["Next.js","Directus","n8n","Akbar API","CRM Auto"],
                tagColor: "amber",
                accentColor: "#f59e0b",
                bg: "from-amber-700/30 via-stone-900 to-stone-950",
                siteAccent: "text-amber-300",
                btnColor: "text-amber-400 border-amber-400/30 hover:bg-amber-400/10",
                stat1: ["50+","Destinations"], stat2: ["10k+","Clients"], stat3: ["B2B","API Ready"],
                headline: "Best Holiday Packages & Flights",
                sub: "Chennai's Best Travel Agency",
                routes: ["Maldives","Bali","Europe","Singapore","Dubai"],
              },
            ].map((site, si) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-60px" });
              return (
                <motion.div
                  ref={ref}
                  key={site.url}
                  initial={{ opacity: 0, y: 60 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: si * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-3xl overflow-hidden border border-white/8 bg-[#111113] hover:border-white/15 transition-all duration-500 group"
                >
                  {/* browser bar */}
                  <div className="flex items-center gap-2 px-5 py-3 bg-white/3 border-b border-white/6">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/60"/><span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60"/><span className="w-2.5 h-2.5 rounded-full bg-green-400/60"/>
                    <div className="ml-3 flex-1 rounded-md bg-white/5 border border-white/6 px-3 py-1 text-[10px] text-white/25 font-mono">{site.url}</div>
                    <a href={site.href} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white/60 transition-colors"><ExternalLink className="w-3.5 h-3.5"/></a>
                  </div>
                  {/* site mockup */}
                  <div className={`relative h-[240px] overflow-hidden bg-gradient-to-br ${site.bg}`}>
                    <div className="relative px-5 py-4">
                      <div className="flex items-center justify-between mb-4 text-[9px] text-white/25 uppercase tracking-widest">
                        <span className={`font-black text-[11px] ${site.siteAccent}`}>{site.name}</span>
                        <div className="flex gap-4 text-white/30">{["Holidays","Flights","Visa","MICE"].map(t=><span key={t}>{t}</span>)}</div>
                      </div>
                      <p className="text-[9px] uppercase tracking-widest mb-1.5" style={{ color: site.accentColor }}>{site.sub}</p>
                      <h3 className="text-lg font-black text-white leading-tight mb-3">{site.headline}</h3>
                      <div className="flex gap-2 mb-3">
                        <span className="px-3 py-1.5 text-[8px] font-black uppercase rounded text-black" style={{ background: site.accentColor }}>Explore</span>
                        <span className="px-3 py-1.5 text-[8px] uppercase border border-white/10 text-white/40 rounded">View Packages</span>
                      </div>
                      <div className="flex gap-1.5 flex-wrap">
                        {site.routes.map(r => <span key={r} className="px-2 py-0.5 bg-white/4 border border-white/8 text-[8px] text-white/35 rounded-full">{r}</span>)}
                      </div>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 grid grid-cols-3 border-t border-white/8 bg-black/40 backdrop-blur-sm">
                      {[site.stat1, site.stat2, site.stat3].map(([v, l]) => (
                        <div key={l} className="py-2.5 text-center border-r border-white/6 last:border-0">
                          <div className="text-[11px] font-bold" style={{ color: site.accentColor }}>{v}</div>
                          <div className="text-[8px] text-white/25 mt-0.5">{l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* card body */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-black text-base text-white">{site.name}</h3>
                        <p className="text-xs text-white/30 mt-0.5 flex items-center gap-1.5"><MapPin className="w-3 h-3"/>{site.location}</p>
                      </div>
                      <a href={site.href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 text-[11px] font-bold border rounded-full px-4 py-2 transition-colors ${site.btnColor}`}>
                        Visit Live <ArrowUpRight className="w-3 h-3"/>
                      </a>
                    </div>
                    <p className="text-sm text-white/35 leading-relaxed mb-4">{site.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {site.tags.map(t => <span key={t} className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/5 border border-white/8 text-white/40">{t}</span>)}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          VIDEO DEMO
      ──────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <WordReveal text="See it in action." className="block text-4xl md:text-6xl font-black tracking-tight mb-5" />
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-white/35 text-lg font-light">3-minute walkthrough — admin, API sync & automation flows.</motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl overflow-hidden cursor-pointer group"
            onClick={() => setVideoOpen(true)}
          >
            <div className="relative aspect-video bg-[#0d1117] overflow-hidden">
              <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(99,102,241,0.2), transparent)" }} />
              <div className="absolute left-0 top-0 bottom-0 w-36 bg-[#0d1117] border-r border-white/5 p-4 space-y-1">
                <p className="text-[8px] font-black uppercase tracking-widest text-white/15 px-2 mb-4">TravelAdmin</p>
                {["Dashboard","Bookings","Leads","API Sync","Automation"].map((item,i)=>(
                  <div key={item} className={`px-2.5 py-2 rounded-lg text-[9px] font-medium ${i===0?"bg-sky-500/15 text-sky-300":"text-white/15"}`}>{item}</div>
                ))}
              </div>
              <div className="absolute left-36 right-0 top-0 bottom-0 p-4 space-y-3">
                <div className="grid grid-cols-4 gap-2">
                  {[["142","Bookings","text-emerald-400"],["389","Leads","text-sky-400"],["1.2k","Syncs","text-violet-400"],["97","WhatsApp","text-amber-400"]].map(([v,l,c])=>(
                    <div key={l} className="rounded-xl bg-white/3 border border-white/5 p-2.5">
                      <p className="text-[8px] text-white/20 mb-1">{l}</p>
                      <p className={`text-base font-black ${c}`}>{v}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border border-white/5 overflow-hidden text-[9px]">
                  {[["James R.","LHR→DXB","Confirmed","text-emerald-400"],["Fatima K.","MAN→IST","Processing","text-amber-400"],["Singh Travel","LGW→BOM","Confirmed","text-emerald-400"]].map(([n,r,s,c])=>(
                    <div key={n} className="grid grid-cols-3 px-3 py-2 border-b border-white/4 last:border-0">
                      <span className="text-white/40">{n}</span><span className="text-white/20 font-mono">{r}</span><span className={`font-semibold ${c}`}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* overlay */}
              <div className="absolute inset-0 bg-black/45 group-hover:bg-black/25 transition-all duration-500 flex items-center justify-center">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="flex flex-col items-center gap-5">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-[0_0_80px_rgba(255,255,255,0.25)]">
                    <Play className="w-7 h-7 fill-black text-black ml-1" />
                  </div>
                  <span className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-wide">Watch Platform Demo — 3 min</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          STICKY FEATURE SCROLL
      ──────────────────────────────────────── */}
      <StickyFeatures />

      {/* ────────────────────────────────────────
          NUMBERS
      ──────────────────────────────────────── */}
      <section className="py-28 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-3xl overflow-hidden">
          {[
            { to: 48, suffix: "h", label: "To staging environment" },
            { to: 3, suffix: " APIs", label: "Pre-integrated portals" },
            { to: 0, suffix: "/mo", prefix: "£", label: "Monthly SaaS fees" },
            { to: 100, suffix: "%", label: "White-label ownership" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#09090B] p-10 text-center hover:bg-white/2 transition-colors"
            >
              <div className="text-5xl font-black bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent mb-2">
                <Counter to={item.to} suffix={item.suffix} prefix={item.prefix ?? ""} />
              </div>
              <p className="text-[10px] uppercase tracking-widest text-white/25">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────
          PRICING
      ──────────────────────────────────────── */}
      <section id="pricing" className="py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <WordReveal text="One price. Own it forever." className="block text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6" />
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-white/35 text-lg font-light mb-16 max-w-lg mx-auto">
            No monthly licences. No vendor lock-in. No hidden retainers. Pay once, own the architecture permanently.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-sky-500/40 via-violet-500/40 to-fuchsia-500/40" />
            <div className="relative bg-[#0d1117] rounded-3xl p-10 md:p-14">
              <div className="absolute inset-0 rounded-3xl" style={{ background: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(139,92,246,0.12), transparent)" }} />
              <div className="relative">
                <div className="text-[100px] md:text-[120px] font-black leading-none tracking-tight text-white mb-2">£1,499</div>
                <p className="text-white/30 text-sm mb-10 uppercase tracking-widest">Flat setup · one payment · zero lock-in</p>

                <div className="grid sm:grid-cols-2 gap-3 mb-12 text-left">
                  {[...["Custom-branded Next.js booking frontend","Directus admin with roles, permissions & audit log","n8n flows: CRM, WhatsApp & onboarding automation","TBO / Akbar / MakeMyTrip API integration","Staging deployment + 2-week handover & support","Full source code — you own it forever"]].map((d) => (
                    <div key={d} className="flex items-start gap-3 p-4 rounded-2xl bg-white/4 border border-white/6">
                      <CircleCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-white/50 leading-snug">{d}</span>
                    </div>
                  ))}
                </div>

                <a href="mailto:hello@infygru.com?subject=UK Travel Platform — Architecture Plan" className="group w-full flex items-center justify-center gap-3 rounded-2xl bg-white text-black font-black text-base px-8 py-5 hover:bg-white/90 transition-colors shadow-[0_0_80px_rgba(255,255,255,0.08)] mb-5">
                  Claim Your Architecture Plan
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <p className="text-white/20 text-xs">Reply within 24 hours · 30-min architecture call · 3 client spots per month</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="border-t border-white/5 px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs text-white/15">© {new Date().getFullYear()} Infygru · UK Travel Platform Engineering</span>
        <span className="text-xs text-white/15">hello@infygru.com</span>
      </div>
    </div>
  );
}
