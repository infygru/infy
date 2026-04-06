"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, Phone, Star, X, Play, ExternalLink, MapPin, AlertTriangle, Zap, Clock, TrendingUp } from "lucide-react";

function Reveal({ children, className = "", delay = 0, y = 32 }: { children: React.ReactNode; className?: string; delay?: number; y?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl px-4" onClick={onClose}>
          <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="w-full h-full bg-zinc-950 flex items-center justify-center text-zinc-500 text-sm">
              {/* <iframe src="YOUR_LOOM_OR_YOUTUBE_EMBED_URL" className="w-full h-full" allowFullScreen /> */}
              Paste your video embed URL here
            </div>
            <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
              <X className="w-4 h-4 text-white" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Page() {
  const [videoOpen, setVideoOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 40 });

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden font-sans antialiased">
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50 pointer-events-none" />
      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />

      {/* ── HERO ─── high-contrast, punchy, ad-style ── */}
      <section className="relative bg-[#0A0F1E] overflow-hidden">
        {/* diagonal accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600 clip-diagonal hidden lg:block" style={{ clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* LEFT — copy */}
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-yellow-400 text-black text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-full mb-8">
              <Zap className="w-3.5 h-3.5" /> Limited — 3 agencies per month
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.6rem,6vw,5rem)] font-black leading-[1.0] tracking-tight text-white mb-6">
              Get a Professional<br />
              <span className="text-yellow-400">Travel Booking</span><br />
              Website for<br />
              <span className="text-yellow-400 underline decoration-yellow-400/40 underline-offset-4">£1,499.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-white/60 leading-relaxed mb-10 max-w-lg">
              A fully custom travel booking platform — your brand, your prices, your clients.
              Bookings confirmed automatically, leads never missed, zero monthly fees.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 mb-10">
              <a href="#claim" className="group inline-flex items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-base px-8 py-4 rounded-xl transition-all duration-200 shadow-[0_8px_32px_rgba(234,179,8,0.4)] hover:shadow-[0_12px_40px_rgba(234,179,8,0.5)] hover:-translate-y-0.5">
                Claim Your Spot Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <button onClick={() => setVideoOpen(true)} className="inline-flex items-center justify-center gap-2.5 border-2 border-white/20 text-white font-bold text-sm px-6 py-4 rounded-xl hover:border-white/40 transition-colors">
                <Play className="w-4 h-4 fill-white" /> Watch 3-Min Demo
              </button>
            </motion.div>

            {/* trust signals */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-6">
              {[
                "✓ Live in 2–4 weeks",
                "✓ Zero monthly fees",
                "✓ You own it 100%",
                "✓ UK-based support",
              ].map(t => (
                <span key={t} className="text-sm text-white/40 font-medium">{t}</span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — offer card */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10">
            <div className="bg-white rounded-3xl p-8 shadow-[0_32px_80px_rgba(0,0,0,0.4)]">
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                <div>
                  <div className="text-sm text-gray-400 font-medium mb-1">Complete Travel Platform</div>
                  <div className="text-5xl font-black text-gray-900">£1,499</div>
                  <div className="text-sm text-green-600 font-bold mt-1">One-time. No monthly fees ever.</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400 line-through mb-1">Usually £4,000+</div>
                  <div className="bg-red-100 text-red-600 text-xs font-black px-3 py-1.5 rounded-full">SAVE £2,500+</div>
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
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <a href="mailto:hello@infygru.com?subject=UK Travel Platform — Book My Spot"
                className="group w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-base px-6 py-4 rounded-xl transition-all duration-200 mb-3">
                Book My Spot — £1,499 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="text-center text-xs text-gray-400">Free 30-min discovery call · No commitment</p>
            </div>

            {/* floating badge */}
            <div className="absolute -top-4 -right-4 bg-red-600 text-white text-[11px] font-black uppercase tracking-wide px-4 py-2 rounded-full shadow-lg rotate-3">
              Only 3 spots/month
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SOCIAL PROOF BAR ── */}
      <div className="bg-gray-50 border-y border-gray-200 py-6 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {[
            { stat: "2 agencies", label: "already live in the UK" },
            { stat: "£0/mo", label: "ongoing fees after setup" },
            { stat: "48 hrs", label: "to see your platform live" },
            { stat: "100%", label: "yours — you own all the code" },
          ].map(({ stat, label }) => (
            <div key={stat} className="text-center">
              <div className="text-2xl font-black text-gray-900">{stat}</div>
              <div className="text-xs text-gray-400 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── IS THIS YOU? ── relatable pain points ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <AlertTriangle className="w-3.5 h-3.5" /> Does this sound familiar?
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
              You're running your travel agency<br />
              <span className="text-red-500">the hard way.</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { emoji: "😤", text: "You check TBO, Akbar, MakeMyTrip separately just to give one quote" },
              { emoji: "⏰", text: "A client messaged at 7pm. Nobody replied. They booked elsewhere by morning." },
              { emoji: "📱", text: "Your bookings are split across WhatsApp, email, and a spreadsheet" },
              { emoji: "💸", text: "You pay £200–£500/month for booking tools that don't even talk to each other" },
              { emoji: "😰", text: "You've lost count of how many leads went cold because of slow follow-up" },
              { emoji: "🤦", text: "You look less professional than bigger agencies — even though you're just as good" },
            ].map((item, i) => (
              <Reveal key={item.text} delay={i * 0.06}>
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-red-50 border border-red-100 hover:border-red-200 transition-colors">
                  <span className="text-2xl leading-none mt-0.5">{item.emoji}</span>
                  <p className="text-sm text-gray-700 leading-relaxed font-medium">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3} className="mt-10 text-center">
            <p className="text-lg text-gray-500 font-medium">
              If even 2 of those hit home — keep reading. This was built for you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── WHAT YOU GET ── simple, clear ── */}
      <section className="py-24 px-6 bg-blue-600">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
              What you get for £1,499
            </h2>
            <p className="text-blue-200 text-lg font-light">Everything your agency needs. Nothing you don't.</p>
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
              <Reveal key={item.title} delay={i * 0.07}>
                <div className="bg-white/10 backdrop-blur rounded-2xl p-7 border border-white/15 hover:bg-white/15 transition-colors h-full">
                  <span className="text-3xl mb-4 block">{item.icon}</span>
                  <h3 className="text-white font-black text-lg mb-3">{item.title}</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE PROOF ── two real agencies ── */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live right now
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
              We already built this for two agencies.
            </h2>
            <p className="text-gray-500 text-lg font-light">Both are live. Both are booking real clients. Go see them.</p>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                name: "MyPerfectTrips",
                url: "myperfecttrips.com",
                href: "https://myperfecttrips.com",
                location: "Manchester, UK",
                tagline: "Manchester's Premier Travel Agency",
                description: "Holiday packages, visa management, MICE, and corporate travel. Fully automated — 140+ enquiries a month handled without extra staff.",
                highlight: "140+ bookings/month, zero extra staff",
                bg: "from-blue-600 to-blue-900",
                accent: "bg-blue-600",
                star: "⭐",
              },
              {
                name: "IG Holidays",
                url: "igholidays.com",
                href: "https://igholidays.com",
                location: "Chennai, India",
                tagline: "10,000+ happy clients served",
                description: "International and domestic packages, honeymoons, corporate travel. Every confirmation and follow-up is automatic.",
                highlight: "10,000+ clients, all automations running",
                bg: "from-amber-500 to-orange-700",
                accent: "bg-amber-500",
                star: "⭐",
              },
            ].map((site, i) => (
              <Reveal key={site.name} delay={i * 0.1}>
                <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-xl shadow-gray-200/60 hover:-translate-y-1 transition-transform duration-300">
                  {/* header */}
                  <div className={`bg-gradient-to-br ${site.bg} p-8 text-white`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-black">{site.name}</h3>
                        <p className="text-white/60 text-sm flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" />{site.location}</p>
                      </div>
                      <a href={site.href} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors border border-white/20">
                        Visit Live <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-white/80 text-sm font-medium leading-relaxed">{site.tagline}</p>
                  </div>
                  {/* body */}
                  <div className="p-7">
                    <p className="text-gray-600 text-sm leading-relaxed mb-5">{site.description}</p>
                    <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                      <TrendingUp className="w-4 h-4 text-green-600 shrink-0" />
                      <span className="text-sm text-green-700 font-bold">{site.highlight}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEO DEMO ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal className="mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">See exactly what you're getting.</h2>
            <p className="text-gray-500 text-lg">3-minute video. Real platform. Real bookings being processed.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative rounded-2xl overflow-hidden cursor-pointer group border-2 border-gray-200 hover:border-blue-400 transition-colors shadow-xl"
              onClick={() => setVideoOpen(true)}>
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                {/* dashboard preview */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute inset-6 rounded-xl bg-gray-900 border border-white/10 overflow-hidden">
                    <div className="bg-gray-800 px-4 py-3 flex items-center gap-2 border-b border-white/5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                      <span className="mx-auto text-[10px] text-white/30 font-mono">yourtravelagency.com/dashboard</span>
                    </div>
                    <div className="p-4 grid grid-cols-4 gap-2">
                      {[["24","Bookings"],["£8,240","Revenue"],["7","Leads"],["31","Sent"]].map(([v,l])=>(
                        <div key={l} className="bg-white/5 rounded-lg p-3">
                          <p className="text-[8px] text-white/30 mb-1">{l}</p>
                          <p className="text-base font-black text-white">{v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* play */}
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 rounded-full bg-blue-600 group-hover:bg-blue-500 transition-colors flex items-center justify-center shadow-[0_0_50px_rgba(37,99,235,0.5)]">
                    <Play className="w-7 h-7 fill-white text-white ml-1" />
                  </motion.div>
                  <span className="text-white font-bold text-sm tracking-wide">Watch Demo — 3 Minutes</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── HOW FAST ── timeline ── */}
      <section className="py-24 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
              From "yes" to live in <span className="text-yellow-400">under 4 weeks.</span>
            </h2>
            <p className="text-gray-400 text-lg">Here's exactly what happens after you get in touch.</p>
          </Reveal>

          <div className="relative">
            {/* line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-700 hidden md:block" />

            <div className="space-y-8">
              {[
                { day: "Day 1", icon: "📞", title: "Free discovery call", desc: "30 minutes. We understand your business — your suppliers, your clients, how you work today." },
                { day: "Day 2–3", icon: "📋", title: "We send you a plan", desc: "Exactly what we'll build, what it'll look like, and a clear timeline. No surprises." },
                { day: "Week 1–2", icon: "⚙️", title: "We build your platform", desc: "Your branded booking site, your admin dashboard, all your automations configured and tested." },
                { day: "Week 3–4", icon: "🚀", title: "You go live", desc: "We train you and your team, hand over everything, and you're live. Done. No ongoing fees." },
              ].map((step, i) => (
                <Reveal key={step.day} delay={i * 0.1}>
                  <div className="flex gap-6 md:pl-12">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center text-xl shrink-0 md:absolute md:-left-[3.75rem] md:top-0">
                        {step.icon}
                      </div>
                    </div>
                    <div className="flex-1 bg-gray-800 rounded-2xl p-6 border border-gray-700">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-yellow-400 text-xs font-black uppercase tracking-widest">{step.day}</span>
                      </div>
                      <h3 className="text-white font-black text-lg mb-2">{step.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OBJECTIONS ── handle the doubts ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">Questions we always get.</h2>
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
                <details className="group border border-gray-200 rounded-2xl overflow-hidden cursor-pointer">
                  <summary className="flex items-center justify-between gap-4 px-7 py-5 font-black text-gray-900 text-sm md:text-base hover:bg-gray-50 transition-colors list-none">
                    {item.q}
                    <span className="w-6 h-6 rounded-full bg-gray-100 group-open:bg-blue-100 flex items-center justify-center shrink-0 text-gray-400 group-open:text-blue-600 transition-colors font-black text-sm">+</span>
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

      {/* ── FINAL CTA ── aggressive, urgent ── */}
      <section id="claim" className="py-24 px-6 bg-[#0A0F1E]">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-red-500/15 border border-red-500/25 text-red-400 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-8">
              <Clock className="w-3.5 h-3.5" /> Only 3 spots available this month
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
              Stop watching clients<br />
              go to your competitors.
            </h2>
            <p className="text-white/45 text-xl font-light leading-relaxed mb-12 max-w-xl mx-auto">
              For £1,499 — once — you get a professional travel platform that works around the clock. Your competitors pay £400/month. Forever. You pay once.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-white rounded-3xl p-8 md:p-12 text-left">
              <div className="flex items-center justify-between flex-wrap gap-4 mb-8 pb-8 border-b border-gray-100">
                <div>
                  <div className="text-gray-400 text-sm mb-1">Complete Travel Platform</div>
                  <div className="text-6xl font-black text-gray-900">£1,499</div>
                  <div className="text-green-600 font-bold text-sm mt-1">One payment. Yours forever.</div>
                </div>
                <div className="flex flex-col gap-2">
                  {[["✓ Live in 2–4 weeks"],["✓ Zero monthly fees"],["✓ 100% your platform"],["✓ Full training included"]].map(([t])=>(
                    <span key={t} className="text-sm text-gray-600 font-medium">{t}</span>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {["Custom branded booking website","Live fares from all your suppliers","Auto WhatsApp & email confirmations","Admin dashboard — everything in one view","Agent management tools","2 weeks of setup support included"].map(item => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="mailto:hello@infygru.com?subject=I want to claim my travel platform spot — £1499"
                  className="group flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-base px-8 py-5 rounded-xl transition-all duration-200 shadow-[0_8px_32px_rgba(37,99,235,0.3)]">
                  Claim My Spot — Email Us <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="https://wa.me/918300290019?text=Hi%2C+I%27m+interested+in+the+%C2%A31%2C499+travel+platform"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-black text-base px-8 py-5 rounded-xl transition-all duration-200">
                  <Phone className="w-5 h-5" /> WhatsApp Us
                </a>
              </div>
              <p className="text-center text-xs text-gray-400 mt-4">hello@infygru.com · Free 30-min discovery call · No hard sell, no commitment</p>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="bg-[#0A0F1E] border-t border-white/5 px-6 py-6 text-center text-xs text-white/20">
        © {new Date().getFullYear()} Infygru · UK Travel Platform · hello@infygru.com
      </div>
    </div>
  );
}
