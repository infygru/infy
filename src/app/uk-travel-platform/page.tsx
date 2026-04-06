"use client";

import { useState } from "react";
import {
  Zap,
  Shield,
  GitBranch,
  Globe,
  ArrowRight,
  CheckCircle,
  XCircle,
  Play,
  ChevronRight,
} from "lucide-react";

export default function UKTravelPlatformPage() {
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <main className="min-h-screen bg-[#080C14] text-white font-sans antialiased overflow-x-hidden">
      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-24 pb-20 text-center overflow-hidden">
        {/* ambient glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-60 left-1/4 w-[400px] h-[300px] bg-indigo-500/8 rounded-full blur-[100px]" />
        </div>

        {/* badge */}
        <span className="relative inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          UK Travel Tech — Custom Platform Engineering
        </span>

        <h1 className="relative max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
          Stop Manually Managing Bookings.{" "}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Own Your Custom Travel Platform.
          </span>
        </h1>

        <p className="relative mt-6 max-w-2xl text-lg text-slate-400 leading-relaxed">
          Premium travel booking engines with custom admin dashboards and n8n
          backend automation. Seamlessly route leads, sync APIs, and automate
          WhatsApp updates — all under your brand.
        </p>

        <div className="relative mt-10 flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#pricing"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-base shadow-lg shadow-blue-600/30 transition-all duration-200 hover:shadow-blue-500/40 hover:-translate-y-0.5"
          >
            Book a Platform Demo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <span className="text-slate-500 text-sm">
            No commitment · 30-min architecture call
          </span>
        </div>

        {/* Dashboard visual */}
        <div className="relative mt-16 w-full max-w-5xl mx-auto rounded-2xl overflow-hidden border border-white/8 shadow-2xl shadow-blue-900/20">
          {/* top bar */}
          <div className="flex items-center gap-2 px-5 py-3 bg-[#0E1420] border-b border-white/6">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-4 text-xs text-slate-500 font-mono">
              travel-admin.yourbrand.com / dashboard
            </span>
          </div>

          {/* mock dashboard */}
          <div className="relative bg-[#0B1120] p-6 min-h-[340px] sm:min-h-[420px]">
            {/* grid of mock cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              {[
                { label: "Bookings Today", value: "142", delta: "+18%" },
                { label: "Active Leads", value: "389", delta: "+7%" },
                { label: "API Syncs", value: "1.2k", delta: "Live" },
                { label: "WhatsApp Sent", value: "97", delta: "Auto" },
              ].map((card) => (
                <div
                  key={card.label}
                  className="rounded-xl bg-white/4 border border-white/6 p-4 flex flex-col gap-1"
                >
                  <span className="text-[11px] text-slate-500 uppercase tracking-wide">
                    {card.label}
                  </span>
                  <span className="text-2xl font-bold text-white">
                    {card.value}
                  </span>
                  <span className="text-[11px] text-emerald-400 font-medium">
                    {card.delta}
                  </span>
                </div>
              ))}
            </div>

            {/* mock table rows */}
            <div className="rounded-xl bg-white/3 border border-white/6 overflow-hidden">
              <div className="grid grid-cols-4 px-4 py-2 text-[11px] text-slate-500 uppercase tracking-wide border-b border-white/6">
                <span>Customer</span>
                <span>Route</span>
                <span>Source</span>
                <span>Status</span>
              </div>
              {[
                {
                  name: "James R.",
                  route: "LHR → DXB",
                  src: "TBO API",
                  status: "Confirmed",
                  color: "text-emerald-400",
                },
                {
                  name: "Fatima K.",
                  route: "MAN → IST",
                  src: "Akbar API",
                  status: "Processing",
                  color: "text-yellow-400",
                },
                {
                  name: "Singh Travel",
                  route: "LGW → BOM",
                  src: "MMT API",
                  status: "Confirmed",
                  color: "text-emerald-400",
                },
                {
                  name: "Chris M.",
                  route: "STN → NYC",
                  src: "Direct",
                  status: "Follow-up",
                  color: "text-blue-400",
                },
              ].map((row) => (
                <div
                  key={row.name}
                  className="grid grid-cols-4 px-4 py-2.5 text-sm border-b border-white/4 last:border-0 hover:bg-white/3 transition-colors"
                >
                  <span className="text-slate-300 font-medium">{row.name}</span>
                  <span className="text-slate-400 font-mono text-xs self-center">
                    {row.route}
                  </span>
                  <span className="text-slate-500 text-xs self-center">
                    {row.src}
                  </span>
                  <span className={`text-xs font-semibold self-center ${row.color}`}>
                    {row.status}
                  </span>
                </div>
              ))}
            </div>

            {/* play overlay */}
            {!videoPlaying && (
              <button
                onClick={() => setVideoPlaying(true)}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] group transition-opacity hover:bg-black/30"
              >
                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10 border border-white/20 group-hover:bg-white/20 transition-colors shadow-xl">
                  <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                </span>
                <span className="mt-3 text-sm text-slate-300 font-medium">
                  Watch Platform Demo
                </span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ─── PROBLEM vs SOLUTION ──────────────────────────────────── */}
      <section className="relative px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              The Old Way is{" "}
              <span className="text-red-400">Killing Your Margins</span>
            </h2>
            <p className="mt-3 text-slate-400 max-w-xl mx-auto">
              Every manual task costs time, credibility, and bookings. Here's
              what changes with a purpose-built platform.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* OLD WAY */}
            <div className="rounded-2xl bg-gradient-to-br from-red-950/40 to-[#0E1420] border border-red-500/20 p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-red-500/15 border border-red-500/25">
                  <XCircle className="w-5 h-5 text-red-400" />
                </span>
                <span className="text-lg font-bold text-red-300">
                  The Old Way
                </span>
              </div>
              <ul className="space-y-4">
                {[
                  "Manually copying fares from TBO, Akbar & MakeMyTrip portals every session",
                  "Clients waiting hours for quotes — losing bookings to faster competitors",
                  "WhatsApp threads scattered across staff phones with no audit trail",
                  "CRM updates done by hand after each enquiry — prone to data loss",
                  "Zero visibility into which lead source converts or which agent closes",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-400">
                    <XCircle className="w-4 h-4 text-red-500/70 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* NEW WAY */}
            <div className="rounded-2xl bg-gradient-to-br from-emerald-950/40 to-[#0E1420] border border-emerald-500/20 p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/25">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                </span>
                <span className="text-lg font-bold text-emerald-300">
                  The Platform Way
                </span>
              </div>
              <ul className="space-y-4">
                {[
                  "Instant API syncing across TBO, Akbar & MMT — live fares in your own branded UI",
                  "Automated quote emails and WhatsApp confirmations fire the moment a lead submits",
                  "Centralised Directus admin dashboard — every booking, lead & agent in one view",
                  "n8n CRM workflows auto-log leads, trigger onboarding, and assign agents",
                  "Conversion analytics baked in — know your best source, route, and close rate",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURE GRID ─────────────────────────────────────────── */}
      <section className="relative px-6 py-24 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Enterprise-Grade Stack.{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Built for Scale.
              </span>
            </h2>
            <p className="mt-3 text-slate-400 max-w-xl mx-auto">
              Every layer is chosen for performance, security, and long-term
              ownership — not vendor lock-in.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Zap,
                color: "from-yellow-500/20 to-yellow-600/5",
                border: "border-yellow-500/20",
                iconColor: "text-yellow-400",
                title: "High-Performance Next.js Frontend",
                desc: "App Router architecture with server components, ISR caching, and sub-second TTFB. SEO-optimised routes for every destination.",
                tags: ["App Router", "Edge-ready", "SSR + ISR"],
              },
              {
                icon: Shield,
                color: "from-violet-500/20 to-violet-600/5",
                border: "border-violet-500/20",
                iconColor: "text-violet-400",
                title: "Secure Admin Dashboard (Directus)",
                desc: "Role-based access, audit logs, and a no-code content API. Your data stays in your own database — no third-party SaaS middleman.",
                tags: ["RBAC", "Self-hosted", "REST + GraphQL"],
              },
              {
                icon: GitBranch,
                color: "from-blue-500/20 to-blue-600/5",
                border: "border-blue-500/20",
                iconColor: "text-blue-400",
                title: "n8n Automation Engine",
                desc: "Visual workflow builder for CRM entry, WhatsApp notifications, lead routing, and booking confirmations — without writing glue code.",
                tags: ["Visual flows", "Webhooks", "WhatsApp"],
              },
              {
                icon: Globe,
                color: "from-emerald-500/20 to-emerald-600/5",
                border: "border-emerald-500/20",
                iconColor: "text-emerald-400",
                title: "B2B API Ready",
                desc: "Pre-integrated adapters for TBO Holidays, Akbar Online, and MakeMyTrip B2B. Add Amadeus or Sabre GDS connections as you grow.",
                tags: ["TBO", "Akbar", "MMT / GDS"],
              },
            ].map((feat) => (
              <div
                key={feat.title}
                className={`group relative rounded-2xl bg-gradient-to-b ${feat.color} border ${feat.border} p-6 flex flex-col gap-4 hover:-translate-y-1 transition-transform duration-200`}
              >
                <span className={`flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 border border-white/8 ${feat.iconColor}`}>
                  <feat.icon className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-bold text-base text-white leading-snug">
                    {feat.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  {feat.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/8 text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF / TRUST BAR ─────────────────────────────── */}
      <section className="px-6 py-10 border-y border-white/6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-8 text-center sm:text-left">
          {[
            { stat: "48 hrs", label: "Staging environment delivered" },
            { stat: "£0", label: "Monthly SaaS retainer after setup" },
            { stat: "3 APIs", label: "Pre-integrated travel suppliers" },
            { stat: "100%", label: "White-label — your brand, your domain" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                {item.stat}
              </span>
              <span className="text-sm text-slate-500">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PRICING ANCHOR ───────────────────────────────────────── */}
      <section id="pricing" className="relative px-6 py-24 overflow-hidden">
        {/* glow */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[700px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-2xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold tracking-widest uppercase">
            Transparent, One-Time Pricing
          </span>

          <div className="rounded-3xl bg-gradient-to-b from-[#0F1827] to-[#0B1120] border border-white/10 shadow-2xl shadow-blue-900/20 p-10 sm:p-14">
            <div className="flex flex-col items-center gap-2">
              <span className="text-6xl sm:text-7xl font-black tracking-tight text-white">
                £1,499
              </span>
              <span className="text-slate-400 text-lg font-medium">
                Flat Setup — One Payment
              </span>
            </div>

            <p className="mt-5 text-slate-400 text-sm leading-relaxed max-w-md mx-auto">
              Includes your foundational Next.js travel platform, a fully
              configured Directus admin dashboard, and core n8n automations for
              lead routing and WhatsApp confirmations.{" "}
              <strong className="text-white">
                Zero monthly SaaS retainers.
              </strong>{" "}
              You own the infrastructure.
            </p>

            <ul className="mt-8 space-y-3 text-left max-w-sm mx-auto">
              {[
                "Custom-branded booking frontend (Next.js)",
                "Directus admin with roles & permissions",
                "n8n workflows: CRM entry, WhatsApp, onboarding",
                "TBO / Akbar / MMT API integration layer",
                "Staging deployment + 2-week handover support",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="mailto:hello@infygru.com?subject=UK Travel Platform - Architecture Plan"
              className="group mt-10 inline-flex items-center justify-center gap-2 w-full px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 transition-all duration-200 hover:-translate-y-0.5"
            >
              Claim Your Architecture Plan
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <p className="mt-4 text-xs text-slate-600">
              Spots limited to 3 new clients per month to ensure delivery quality.
            </p>
          </div>
        </div>
      </section>

      {/* ─── MINIMAL FOOTER ───────────────────────────────────────── */}
      <footer className="px-6 py-8 border-t border-white/6 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} Infygru. All rights reserved. &nbsp;·&nbsp;
        UK Travel Platform Engineering
      </footer>
    </main>
  );
}
