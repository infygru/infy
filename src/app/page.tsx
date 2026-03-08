"use client";

import Link from "next/link";
import { ArrowRight, Cloud, Code, Shield, Bot, Workflow, BarChart, Quote, Building2, Briefcase, Globe, Monitor, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function Home() {
  const services = [
    {
      title: "Digital Transformation",
      description: "Enhance your performance through intelligent digital technologies and strategic implementation. We redesign your core processes.",
      icon: <Workflow className="h-6 w-6 text-primary" />,
      href: "/services/digital-transformation"
    },
    {
      title: "Web Development",
      description: "Enterprise-grade web applications that showcase all wings of your business perfectly, ensuring top-tier user experiences.",
      icon: <Code className="h-6 w-6 text-primary" />,
      href: "/services/web-development"
    },
    {
      title: "n8n Automation",
      description: "Powerful workflow automation connecting your apps and APIs to streamline your business logic and save hundreds of hours.",
      icon: <Bot className="h-6 w-6 text-primary" />,
      href: "/services/n8n-automation"
    },
    {
      title: "Cloud Migration",
      description: "Secure and efficient deployment of your digital assets to scalable cloud resources with zero downtime architecture.",
      icon: <Cloud className="h-6 w-6 text-primary" />,
      href: "/services/cloud-migration"
    },
    {
      title: "Data Analytics",
      description: "Extract actionable insights and valuable patterns from your raw datasets to make incredibly informed business decisions.",
      icon: <BarChart className="h-6 w-6 text-primary" />,
      href: "/services/data-analytics"
    },
    {
      title: "Security Operations",
      description: "Continuous monitoring, proactive threat hunting, and robust defense mechanisms to protect against modern cyber threats.",
      icon: <Shield className="h-6 w-6 text-primary" />,
      href: "/services/security-operations"
    }
  ];

  const testimonials = [
    {
      quote: "Infygru modernized our legacy systems in less than 30 days. Their architecture expertise saved us thousands of hours in manual overhead.",
      name: "Sarah Jenkins",
      role: "CTO, TechNova Solutions",
    },
    {
      quote: "The web application they built for us is enterprise-grade, lightning fast, and highly secure. The fluid animations are a brilliant touch.",
      name: "Rajesh Kumar",
      role: "Director of Operations, FinEdge",
    },
    {
      quote: "Their data analytics insights completely changed our Q3 marketing strategy. Incredible team, transparent pricing, and unparalleled support.",
      name: "Emily Chen",
      role: "VP Marketing, GlobalReach",
    }
  ];

  const clients = [
    { name: "Healthieyoo", src: "/client/healthieyoo.webp" },
    { name: "Ecton", src: "/client/logo-ecton.webp" },
    { name: "MPT", src: "/client/mpt.png" },
    { name: "NS Infinitus", src: "/client/nsinfinitus.jpg" },
    { name: "SJ Pilgrimage", src: "/client/sjpilgrimage.png" },
    { name: "Tender Online", src: "/client/tenderonline.png" },
  ];

  const variants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
    }),
  };

  return (
    <>
      <div className="relative font-sans">

        {/* ASYMMETRICAL TYPOGRAPHY HERO */}
        <section className="relative min-h-screen flex items-center bg-white overflow-hidden pt-24 pb-16">
          {/* Architectural Background Grids */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

              {/* Left Column: Massive Typography */}
              <motion.div
                className="max-w-2xl"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-lg border border-primary/20 bg-primary/5 text-primary font-bold text-xs tracking-widest uppercase font-heading">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Engineering the Future
                </div>

                <h1 className="font-heading text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter text-foreground mb-8 leading-[1.1]">
                  Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Faster.</span>
                  <br className="hidden sm:block" />
                  Scale <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-500">Smarter.</span>
                </h1>

                <p className="text-xl text-muted-foreground mb-10 leading-relaxed font-light border-l-4 border-primary/30 pl-6">
                  Elite software development and cloud architecture for enterprises that refuse to compromise on speed, security, or scale.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/pricing" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full h-16 px-10 rounded-none bg-foreground text-background hover:bg-foreground/90 font-heading font-extrabold text-lg group">
                      View Pricing
                      <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/offerings" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full h-16 px-10 rounded-none border-border hover:bg-slate-50 text-foreground font-heading font-bold text-lg">
                      View Stack
                    </Button>
                  </Link>
                </div>

                {/* Metric Strip */}
                <div className="grid grid-cols-3 gap-6 mt-16 pt-8 border-t border-border/60">
                  <div>
                    <div className="text-3xl font-heading font-black text-foreground">99.9%</div>
                    <div className="text-sm text-muted-foreground font-medium mt-1">Uptime SLA</div>
                  </div>
                  <div>
                    <div className="text-3xl font-heading font-black text-foreground">30<span className="text-primary text-xl">d</span></div>
                    <div className="text-sm text-muted-foreground font-medium mt-1">Avg. Delivery</div>
                  </div>
                  <div>
                    <div className="text-3xl font-heading font-black text-foreground">14+</div>
                    <div className="text-sm text-muted-foreground font-medium mt-1">Enterprise Clients</div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Abstract Geometric Visual */}
              <motion.div
                className="relative h-[600px] hidden lg:block"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              >
                {/* Center glowing orb */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[80px]" />
                <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/20 rounded-full blur-[60px]" />

                {/* Floating Glass Panels */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="absolute top-10 right-10 w-64 aspect-square rounded-[2rem] border border-white/40 bg-white/40 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center p-8 gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Code className="w-8 h-8 text-primary" />
                  </div>
                  <div className="h-2 w-1/2 bg-slate-200 rounded-full" />
                  <div className="h-2 w-3/4 bg-slate-100 rounded-full" />
                </motion.div>

                <motion.div
                  animate={{ y: [15, -15, 15] }}
                  transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                  className="absolute bottom-10 left-10 w-72 aspect-video rounded-[2rem] border border-white/60 bg-white/60 backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.12)] p-6 flex flex-col justify-between z-10"
                >
                  <div className="flex justify-between items-center">
                    <Workflow className="w-6 h-6 text-accent" />
                    <div className="px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest">
                      Automated
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 w-full bg-slate-200 rounded-lg" />
                    <div className="h-3 w-4/5 bg-slate-200 rounded-lg" />
                    <div className="flex gap-2 pt-2">
                      <div className="h-8 w-1/3 bg-slate-100 rounded-md" />
                      <div className="h-8 w-1/3 bg-slate-100 rounded-md" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                  className="absolute top-1/2 right-4 -translate-y-1/2 w-48 aspect-auto py-8 rounded-[1.5rem] border border-white/50 bg-white/50 backdrop-blur-lg shadow-xl flex flex-col items-center justify-center gap-4"
                >
                  <Shield className="w-10 h-10 text-slate-800" />
                  <div className="text-center">
                    <div className="text-2xl font-black text-slate-800 font-heading">Zero</div>
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Vulnerabilities</div>
                  </div>
                </motion.div>

              </motion.div>
            </div>
          </div>
        </section>

        {/* DARK SECTION: CLIENTELE */}
        <section className="py-20 bg-slate-950 text-white relative">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 MixBlendMode-overlay" />
          <div className="container mx-auto relative z-10 mb-12">
            <p className="font-heading text-center text-sm font-bold text-slate-400 uppercase tracking-widest px-4">Trusted securely by innovative enterprises</p>
          </div>

          <div className="relative flex overflow-hidden w-full max-w-[100vw] mx-auto z-10">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

            <motion.div
              className="flex w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 40,
              }}
            >
              {[...clients, ...clients, ...clients, ...clients].map((client, idx) => (
                <div key={idx} className="flex px-4 md:px-8 items-center justify-center shrink-0">
                  <div className="bg-white px-6 md:px-10 py-4 md:py-6 rounded-xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.25)] transition-shadow duration-300 flex items-center justify-center w-[160px] md:w-[220px] h-[80px] md:h-[100px]">
                    <img
                      src={client.src}
                      alt={`${client.name} logo`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* LIGHT SECTION: SERVICES CORNERSTONE */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div className="max-w-2xl">
                <h2 className="font-heading text-4xl md:text-5xl font-extrabold mb-6 text-foreground tracking-tight">Core Capabilities</h2>
                <p className="text-lg text-muted-foreground leading-relaxed font-light">
                  We deploy cutting edge technology stacks to systematically eradicate technical debt and scale your infrastructure.
                </p>
              </div>
              <Link href="/offerings">
                <Button variant="outline" className="font-heading font-bold border-border text-foreground hover:bg-muted group">
                  View All Capabilities <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, idx) => (
                <motion.div
                  key={service.title}
                  custom={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={variants}
                >
                  <Link href={service.href} className="group block h-full">
                    <div className="bg-white rounded-2xl p-8 h-full border border-border/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full transition-transform group-hover:scale-150" />
                      <div className="mb-6 w-14 h-14 rounded-xl flex items-center justify-center bg-secondary text-primary group-hover:scale-110 transition-transform duration-300 relative z-10">
                        {service.icon}
                      </div>
                      <h3 className="font-heading text-xl font-bold mb-3 text-foreground transition-colors group-hover:text-primary relative z-10">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm relative z-10 font-light">
                        {service.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* DARK SECTION: TESTIMONIALS */}
        <section className="py-24 bg-slate-900 border-t border-slate-800 relative z-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10" />
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-heading text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tight">Proven Results</h2>
              <p className="text-lg text-slate-400 leading-relaxed font-light">Insights from the visionary partners who have revolutionized their operations alongside our engineering team.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl"
                >
                  <Quote className="w-10 h-10 text-primary/30 mb-6" />
                  <p className="text-slate-200 leading-relaxed font-light italic mb-8">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold border border-slate-600 font-heading">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-white tracking-wide">{testimonial.name}</h4>
                      <p className="text-xs text-slate-400 capitalize">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* MIXED SECTION: ELEVATED CTA */}
        <section className="py-24 lg:py-32 bg-slate-50 relative border-t border-slate-200">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-[2.5rem] p-10 md:p-16 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

              <div className="relative z-10 max-w-2xl text-center md:text-left">
                <h2 className="font-heading text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tight">Ready to architect the future?</h2>
                <p className="text-lg text-slate-300 leading-relaxed font-light mb-0">
                  Join industry leaders scaling with precision and speed. Request an enterprise consultation today and discover your path forward.
                </p>
              </div>

              <div className="relative z-10 shrink-0">
                <Link href="https://wa.me/919445675619">
                  <Button size="lg" className="font-heading font-extrabold px-10 h-16 text-lg shadow-xl hover:-translate-y-1 transition-transform bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl">
                    Initiate Project
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div >
    </>
  );
}
