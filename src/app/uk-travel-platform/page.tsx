"use client";

import { useRef, useState, useEffect } from "react";
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
  Play,
  X,
  ExternalLink,
  MapPin,
  ArrowUpRight,
  Clock,
  TrendingUp,
  Users,
  MessageCircle,
  CheckCircle,
  XCircle,
  PhoneCall,
} from "lucide-react";

/* ─── word reveal ──────────────────────────────────────────────── */
function WordReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.22em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.8, delay: delay + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >{word}</motion.span>
        </span>
      ))}
    </span>
  );
}

/* ─── counter ──────────────────────────────────────────────────── */
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

/* ─── video modal ──────────────────────────────────────────────── */
function VideoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-2xl px-4"
          onClick={onClose}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}>
            <div className="w-full h-full bg-zinc-950 flex items-center justify-center text-zinc-600 text-sm">
              {/* Replace with: <iframe src="YOUR_LOOM_OR_YOUTUBE_URL" className="w-full h-full" allowFullScreen /> */}
              Paste your Loom or YouTube embed URL here
            </div>
            <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <X className="w-4 h-4 text-white" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── marquee ──────────────────────────────────────────────────── */
const marqueeText = ["Instant client quotes","Zero manual data entry","Automated WhatsApp follow-ups","More bookings. Less admin.","One dashboard for everything","Your brand. Your platform.","Live fare updates","Never lose a lead again"];
function Marquee() {
  return (
    <div className="overflow-hidden bg-[#0C1524] py-4 border-y border-white/5">
      <motion.div className="flex gap-12 whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
        {[...marqueeText, ...marqueeText].map((item, i) => (
          <span key={i} className="text-xs font-bold uppercase tracking-[0.2em] text-white/25 flex items-center gap-12">
            {item}<span className="text-white/10">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function Page() {
  const [videoOpen, setVideoOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 40 });

  const heroRef = useRef(null);
  const { scrollYProgress: heroProg } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroProg, [0, 1], ["0%", "30%"]);
  const heroO = useTransform(heroProg, [0, 0.8], [1, 0]);

  return (
    <div className="bg-[#FAF8F4] text-[#0C1524] overflow-x-hidden antialiased selection:bg-amber-200">

      {/* progress bar */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 origin-left z-50 pointer-events-none" />

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />

      {/* ══════════════════════════════════════════════════════
          HERO — outcome-first, no tech talk
      ══════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col overflow-hidden bg-[#0C1524]">

        {/* subtle grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        {/* warm glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-amber-500/8 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-600/6 rounded-full blur-[100px]" />
        </div>

        {/* nav */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
          className="relative z-10 flex items-center justify-between px-8 md:px-16 py-8">
          <span className="text-white/40 text-xs font-bold tracking-widest uppercase">Infygru</span>
          <a href="#pricing" className="text-xs font-bold text-white/50 hover:text-white transition-colors tracking-widest uppercase border border-white/10 px-5 py-2.5 rounded-full hover:border-white/25">
            Get Started
          </a>
        </motion.div>

        {/* hero content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-16 max-w-6xl mx-auto w-full py-16">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/8 px-4 py-1.5 text-[11px] font-bold tracking-widest uppercase text-amber-400 mb-10 self-start">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            UK Travel Agency Platform
          </motion.div>

          <h1 className="text-[clamp(2.8rem,7vw,6.5rem)] font-black leading-[0.95] tracking-[-0.03em] mb-8 text-white">
            <span className="block"><WordReveal text="Your agency." delay={0.15} /></span>
            <span className="block text-amber-400"><WordReveal text="Running itself." delay={0.3} /></span>
          </h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65 }}
            className="text-xl text-white/45 max-w-xl leading-relaxed font-light mb-12">
            While your competitors are copying fares by hand and chasing leads on WhatsApp —
            your agency quotes instantly, follows up automatically, and closes more bookings.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }}
            className="flex flex-wrap items-center gap-4 mb-20">
            <a href="#pricing" className="group inline-flex items-center gap-3 bg-amber-400 text-black font-black text-sm px-8 py-4 rounded-full hover:bg-amber-300 transition-colors shadow-[0_0_50px_rgba(251,191,36,0.2)]">
              Get Your Platform Built <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <button onClick={() => setVideoOpen(true)} className="inline-flex items-center gap-3 text-sm font-semibold text-white/50 hover:text-white/80 transition-colors">
              <span className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:border-white/30 transition-colors">
                <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
              </span>
              See a live demo
            </button>
          </motion.div>

          {/* 3 outcome stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="grid grid-cols-3 gap-8 max-w-lg">
            {[
              ["3 hrs", "saved per agent, per day"],
              ["< 30s", "to confirm a new booking"],
              ["0", "leads fall through the cracks"],
            ].map(([val, label]) => (
              <div key={val}>
                <div className="text-2xl font-black text-white">{val}</div>
                <div className="text-[11px] text-white/30 mt-1 leading-tight">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* bottom preview strip */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: heroY, opacity: heroO }}
          className="relative z-10 w-full max-w-5xl mx-auto px-8 md:px-16 pb-0"
        >
          <div className="rounded-t-2xl overflow-hidden border border-white/8 shadow-2xl">
            <div className="flex items-center gap-2 px-5 py-3 bg-white/4 border-b border-white/6">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" /><span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" /><span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
              <span className="mx-auto text-[10px] text-white/20 font-mono">yourtravelagency.com / dashboard</span>
              <span className="flex items-center gap-1 text-emerald-400 text-[9px]"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />live</span>
            </div>
            <div className="bg-[#0d1117] grid grid-cols-4 gap-3 p-5">
              {[
                { l: "Bookings Today", v: "24", d: "+6 from yesterday", c: "text-emerald-400" },
                { l: "Leads Waiting", v: "7", d: "Avg response: 28s", c: "text-amber-400" },
                { l: "WhatsApp Sent", v: "31", d: "All automated", c: "text-sky-400" },
                { l: "Revenue Today", v: "£8,240", d: "+22% this week", c: "text-violet-400" },
              ].map(s => (
                <div key={s.l} className="rounded-xl bg-white/3 border border-white/5 p-4">
                  <p className="text-[9px] text-white/30 mb-2">{s.l}</p>
                  <p className={`text-xl font-black ${s.c}`}>{s.v}</p>
                  <p className="text-[8px] text-white/20 mt-1">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <Marquee />

      {/* ══════════════════════════════════════════════════════
          THE REAL PROBLEM — speak their language
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#FAF8F4] py-32 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-20">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="text-xs font-black uppercase tracking-[0.2em] text-amber-600 mb-5">The problem</motion.p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-[#0C1524]">
              <WordReveal text="You're losing bookings you don't even know about." />
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                headline: "Your competitor confirmed it 90 minutes ago.",
                body: "A client submits an enquiry. Your agent sees it 2 hours later — after lunch, after a call, after dealing with something else. That booking is already gone.",
                stat: "2 hrs", statLabel: "average response time without automation",
                color: "border-red-200 bg-red-50/50",
                statColor: "text-red-500",
              },
              {
                icon: Users,
                headline: "Your best agent wastes 3 hours a day on copy-paste.",
                body: "Checking TBO. Checking Akbar. Checking MakeMyTrip. Writing it all down. Sending it manually. Then doing it again for the next client. Every. Single. Day.",
                stat: "160 hrs", statLabel: "per agent, per year, on manual fare lookups",
                color: "border-orange-200 bg-orange-50/50",
                statColor: "text-orange-500",
              },
              {
                icon: MessageCircle,
                headline: "You have no idea how many leads went cold.",
                body: "A WhatsApp message at 9pm. Nobody sees it until morning. The client books with whoever replied first. You never knew it happened. There's no record, no follow-up, no second chance.",
                stat: "40%", statLabel: "of travel leads never receive a timely follow-up",
                color: "border-amber-200 bg-amber-50/50",
                statColor: "text-amber-600",
              },
            ].map((card, i) => (
              <motion.div
                key={card.headline}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-3xl border p-8 ${card.color}`}
              >
                <card.icon className="w-6 h-6 text-[#0C1524]/30 mb-6" />
                <h3 className="text-lg font-black text-[#0C1524] leading-tight mb-4">{card.headline}</h3>
                <p className="text-sm text-[#0C1524]/50 leading-relaxed mb-8">{card.body}</p>
                <div className="border-t border-black/8 pt-6">
                  <div className={`text-3xl font-black ${card.statColor}`}>{card.stat}</div>
                  <div className="text-[11px] text-[#0C1524]/35 mt-1 leading-tight">{card.statLabel}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          THE SHIFT — what changes, no jargon
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#0C1524] py-32 px-8 md:px-16 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-20">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-xs font-black uppercase tracking-[0.2em] text-amber-400 mb-5">What changes</motion.p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
              <WordReveal text="Here's what your agency looks like after." />
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                number: "01",
                title: "A client enquires. They hear back in 30 seconds.",
                desc: "The moment someone fills in your enquiry form or sends a WhatsApp — they get an instant confirmation. Your agent gets a notification with all the details. No checking. No delay. No lost leads.",
                before: "Client emails at 6pm. Agent sees it at 9am. Competitor confirmed it by 6:30pm.",
                after: "Client enquires at 6pm. Auto-confirmation sent at 6:00:30pm. Agent notified instantly.",
                icon: PhoneCall,
              },
              {
                number: "02",
                title: "Live prices. Always accurate. No manual lookups.",
                desc: "Your branded booking platform pulls live fares directly from your suppliers — updated constantly. Your agents quote confidently without opening a single other website.",
                before: "Agent opens 3 supplier websites, copies prices into a spreadsheet, emails the client.",
                after: "Agent sees all live fares in one place. Quotes in under a minute. Every time.",
                icon: TrendingUp,
              },
              {
                number: "03",
                title: "Every lead, every booking, every agent — in one place.",
                desc: "One dashboard shows you everything happening in your business right now. Who's working on what. Which leads need attention. How much revenue came in today. No spreadsheets. No chasing your team.",
                before: "Bookings in one spreadsheet. Leads on WhatsApp. Revenue in another file. Nobody has the full picture.",
                after: "Everything in one screen. Any device. Any time. Total visibility.",
                icon: Users,
              },
              {
                number: "04",
                title: "Your platform. Your brand. Nobody else gets a cut.",
                desc: "This isn't a subscription to someone else's software. It's your own platform, built on your terms, with your branding. A one-time investment — then it's yours forever with no monthly fees.",
                before: "£300/month for booking software. £150/month for CRM. £80/month for WhatsApp tool. Still not connected.",
                after: "One custom platform. One flat fee. £0 per month, forever.",
                icon: CheckCircle,
              },
            ].map((item, i) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group rounded-3xl border border-white/6 bg-white/3 hover:bg-white/5 transition-all duration-500 p-8 md:p-10"
              >
                <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 items-start">
                  <div>
                    <div className="flex items-start gap-5 mb-6">
                      <span className="text-5xl font-black text-white/10 leading-none">{item.number}</span>
                      <item.icon className="w-6 h-6 text-amber-400 mt-2 shrink-0" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-white leading-tight mb-4">{item.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-2xl bg-red-950/30 border border-red-500/15 p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Before</span>
                      </div>
                      <p className="text-sm text-white/35 leading-relaxed">{item.before}</p>
                    </div>
                    <div className="rounded-2xl bg-emerald-950/30 border border-emerald-500/15 p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">After</span>
                      </div>
                      <p className="text-sm text-white/60 leading-relaxed">{item.after}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          LIVE PLATFORMS — proof, framed as business results
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#FAF8F4] py-32 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-20">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-xs font-black uppercase tracking-[0.2em] text-amber-600 mb-5">Real agencies. Real results.</motion.p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-[#0C1524]">
              <WordReveal text="Two agencies already running on this." />
            </h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="text-[#0C1524]/45 text-lg mt-4 font-light leading-relaxed">
              Not demos. Not mockups. Live platforms booking real customers right now.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                url: "myperfecttrips.com",
                href: "https://myperfecttrips.com",
                name: "MyPerfectTrips",
                location: "Manchester, United Kingdom",
                headline: "Discover the World, Your Way",
                sub: "Manchester's Premier Travel Agency",
                accent: "#2563EB",
                accentText: "text-blue-500",
                accentBg: "bg-blue-600",
                accentBorder: "border-blue-200",
                accentLight: "bg-blue-50",
                bg: "from-blue-900 via-slate-900 to-slate-950",
                navItems: ["Holidays","Flights","Visa","MICE"],
                destinations: ["Dubai","Turkey","Egypt","Paris","Maldives"],
                stats: [["99%","Visa Success"],["50+","Destinations"],["24/7","Support"]],
                result: "Processes over 140 booking enquiries a month — all automated, zero manual data entry.",
                tags: ["Instant quotes","WhatsApp auto-replies","Live fare sync","Lead tracking"],
              },
              {
                url: "igholidays.com",
                href: "https://igholidays.com",
                name: "IG Holidays",
                location: "Chennai, India",
                headline: "Best Holiday Packages & Flights",
                sub: "Chennai's Best Travel Agency",
                accent: "#D97706",
                accentText: "text-amber-600",
                accentBg: "bg-amber-500",
                accentBorder: "border-amber-200",
                accentLight: "bg-amber-50",
                bg: "from-amber-900/60 via-stone-900 to-stone-950",
                navItems: ["Packages","Flights","Honeymoon","MICE"],
                destinations: ["Maldives","Bali","Europe","Singapore","Dubai"],
                stats: [["50+","Destinations"],["10k+","Clients"],["B2B","Ready"]],
                result: "Serves 10,000+ clients with zero extra admin staff — every follow-up and confirmation is automatic.",
                tags: ["Auto-confirmations","Agent dashboard","Lead scoring","Revenue tracking"],
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
                  className="rounded-3xl border border-[#0C1524]/8 bg-white shadow-xl shadow-[#0C1524]/5 overflow-hidden hover:-translate-y-1 transition-transform duration-500"
                >
                  {/* browser */}
                  <div className="flex items-center gap-2 px-5 py-3.5 bg-zinc-50 border-b border-zinc-100">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" /><span className="w-2.5 h-2.5 rounded-full bg-yellow-400" /><span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    <div className="ml-3 flex-1 bg-white border border-zinc-200 rounded-md px-3 py-1 text-[10px] text-zinc-400 font-mono">{site.url}</div>
                    <a href={site.href} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-zinc-700 transition-colors"><ExternalLink className="w-3.5 h-3.5" /></a>
                  </div>
                  {/* mockup */}
                  <div className={`relative h-[240px] bg-gradient-to-br ${site.bg} overflow-hidden`}>
                    <div className="relative px-6 pt-5">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-black text-[11px]" style={{ color: site.accent }}>{site.name}</span>
                        <div className="flex gap-4 text-[9px] text-white/30">{site.navItems.map(t=><span key={t}>{t}</span>)}</div>
                      </div>
                      <p className="text-[9px] uppercase tracking-widest mb-2" style={{ color: site.accent }}>{site.sub}</p>
                      <h3 className="text-xl font-black text-white leading-tight mb-3">{site.headline}</h3>
                      <div className="flex gap-2 mb-3">
                        <span className={`px-3 py-1.5 text-[8px] font-black uppercase text-black rounded ${site.accentBg}`}>Book Now</span>
                        <span className="px-3 py-1.5 text-[8px] uppercase border border-white/10 text-white/50 rounded">View Packages</span>
                      </div>
                      <div className="flex gap-1.5 flex-wrap">
                        {site.destinations.map(d=><span key={d} className="px-2 py-0.5 bg-white/5 border border-white/8 text-[8px] text-white/35 rounded-full">{d}</span>)}
                      </div>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 grid grid-cols-3 border-t border-white/8 bg-black/40 backdrop-blur">
                      {site.stats.map(([v,l])=>(
                        <div key={l} className="py-2.5 text-center border-r border-white/8 last:border-0">
                          <div className="text-[11px] font-bold" style={{ color: site.accent }}>{v}</div>
                          <div className="text-[8px] text-white/25">{l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* body */}
                  <div className="p-7">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-black text-lg text-[#0C1524]">{site.name}</h3>
                        <p className="text-xs text-[#0C1524]/35 mt-0.5 flex items-center gap-1.5"><MapPin className="w-3 h-3"/>{site.location}</p>
                      </div>
                      <a href={site.href} target="_blank" rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 text-xs font-bold border rounded-full px-4 py-2 transition-colors ${site.accentBorder} ${site.accentLight} ${site.accentText}`}>
                        Visit <ArrowUpRight className="w-3 h-3"/>
                      </a>
                    </div>
                    <p className="text-sm text-[#0C1524]/55 leading-relaxed mb-5 font-medium">{site.result}</p>
                    <div className="flex flex-wrap gap-2">
                      {site.tags.map(t=>(
                        <span key={t} className="text-[11px] font-semibold px-3 py-1.5 rounded-full bg-[#0C1524]/5 text-[#0C1524]/50">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          VIDEO DEMO
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#0C1524] py-32 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-xs font-black uppercase tracking-[0.2em] text-amber-400 mb-5">See it for yourself</motion.p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
              <WordReveal text="Watch it in action." />
            </h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="text-white/35 text-lg font-light">A 3-minute walkthrough of a real travel agency platform — from client enquiry to booking confirmation.</motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl overflow-hidden cursor-pointer group border border-white/8"
            onClick={() => setVideoOpen(true)}
          >
            <div className="relative aspect-video bg-[#0d1117]">
              <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse 50% 40% at 50% 30%, rgba(251,191,36,0.08), transparent)" }} />
              {/* dashboard preview */}
              <div className="absolute inset-8 rounded-2xl bg-[#161b22] border border-white/5 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-white/3 border-b border-white/5">
                  <span className="w-2 h-2 rounded-full bg-red-400/60"/><span className="w-2 h-2 rounded-full bg-yellow-400/60"/><span className="w-2 h-2 rounded-full bg-green-400/60"/>
                  <span className="mx-auto text-[9px] text-white/15 font-mono">yourtravelagency.com / dashboard</span>
                </div>
                <div className="p-4 grid grid-cols-4 gap-3">
                  {[["24","Bookings","text-emerald-400"],["7","Leads","text-amber-400"],["£8,240","Revenue","text-violet-400"],["31","WhatsApp","text-sky-400"]].map(([v,l,c])=>(
                    <div key={l} className="bg-white/3 rounded-lg p-3 border border-white/4">
                      <p className="text-[8px] text-white/25 mb-1">{l}</p>
                      <p className={`text-base font-black ${c}`}>{v}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
                <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} className="flex flex-col items-center gap-5">
                  <div className="w-20 h-20 rounded-full bg-amber-400 flex items-center justify-center shadow-[0_0_60px_rgba(251,191,36,0.3)]">
                    <Play className="w-7 h-7 fill-black text-black ml-1" />
                  </div>
                  <span className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2.5 text-sm font-bold text-white uppercase tracking-wide">Watch Demo — 3 minutes</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HOW IT WORKS — 3 simple steps
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#FAF8F4] py-32 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-20">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-xs font-black uppercase tracking-[0.2em] text-amber-600 mb-5">How it works</motion.p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-[#0C1524]">
              <WordReveal text="Simple. Fast. Yours." />
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "We understand your business.",
                body: "A 30-minute call where we map out exactly how your agency works today — your suppliers, your team, your enquiry process. No generic solution.",
                cta: "Book a call",
              },
              {
                step: "02",
                title: "We build your platform.",
                body: "In 2–4 weeks, you get a fully working platform with your branding, your suppliers connected, and your automations running. You're involved at every step.",
                cta: "See timeline",
              },
              {
                step: "03",
                title: "You own it forever.",
                body: "No monthly fees. No subscriptions. No vendor lock-in. Your platform lives on your own servers. You can modify it, scale it, or hand it to any developer.",
                cta: "See pricing",
              },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {i < 2 && <div className="hidden md:block absolute top-10 left-full w-6 h-px bg-[#0C1524]/10 z-10" />}
                <div className="rounded-3xl border border-[#0C1524]/8 bg-white p-8 shadow-lg shadow-[#0C1524]/4 h-full">
                  <div className="text-6xl font-black text-[#0C1524]/6 leading-none mb-6">{s.step}</div>
                  <h3 className="text-xl font-black text-[#0C1524] leading-tight mb-4">{s.title}</h3>
                  <p className="text-sm text-[#0C1524]/45 leading-relaxed">{s.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          NUMBERS
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#0C1524] py-24 px-8 md:px-16">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { to: 48, suffix: "h", label: "From briefing to a live staging environment" },
            { to: 30, suffix: "s", label: "Average time to auto-confirm an enquiry" },
            { to: 3, suffix: " hrs", label: "Saved per agent per day" },
            { to: 0, suffix: "/mo", prefix: "£", label: "Monthly fees after setup" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-black text-amber-400 mb-2">
                <Counter to={item.to} suffix={item.suffix} prefix={item.prefix ?? ""} />
              </div>
              <p className="text-[11px] text-white/25 leading-tight">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PRICING
      ══════════════════════════════════════════════════════ */}
      <section id="pricing" className="bg-[#FAF8F4] py-32 px-8 md:px-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-xs font-black uppercase tracking-[0.2em] text-amber-600 mb-5">Investment</motion.p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[#0C1524] leading-tight mb-5">
              <WordReveal text="One flat fee. Yours forever." />
            </h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="text-[#0C1524]/40 text-lg font-light max-w-lg mx-auto">
              No subscriptions. No per-booking fees. No contracts. You pay once and the platform is completely yours.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl bg-[#0C1524] overflow-hidden"
          >
            <div className="p-10 md:p-14">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 pb-10 border-b border-white/8">
                <div>
                  <div className="text-8xl font-black text-white leading-none">£1,499</div>
                  <div className="text-white/30 text-sm mt-2">One payment. Complete ownership.</div>
                </div>
                <div className="flex flex-col gap-2 text-sm text-white/40">
                  <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400"/>No monthly fees</span>
                  <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400"/>No per-booking charges</span>
                  <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400"/>No contracts or lock-in</span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {[
                  "Your own branded booking website",
                  "All your suppliers connected and live",
                  "Automatic WhatsApp & email confirmations",
                  "One dashboard for every booking and lead",
                  "Agent management and performance tracking",
                  "Everything set up and handed over to you",
                ].map((d) => (
                  <div key={d} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-white/55 leading-snug">{d}</span>
                  </div>
                ))}
              </div>

              <a
                href="mailto:hello@infygru.com?subject=UK Travel Platform — I want to get started"
                className="group w-full flex items-center justify-center gap-3 rounded-2xl bg-amber-400 text-black font-black text-base px-8 py-5 hover:bg-amber-300 transition-colors shadow-[0_0_60px_rgba(251,191,36,0.15)] mb-5"
              >
                Get Your Platform Built
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="text-white/20 text-xs text-center">We reply within 24 hours · Free 30-minute discovery call · Maximum 3 agencies per month</p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="bg-[#FAF8F4] border-t border-[#0C1524]/8 px-8 md:px-16 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs text-[#0C1524]/30">© {new Date().getFullYear()} Infygru · UK Travel Agency Platform</span>
        <span className="text-xs text-[#0C1524]/30">hello@infygru.com</span>
      </div>
    </div>
  );
}
