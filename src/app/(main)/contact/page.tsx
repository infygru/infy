"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { submitLead } from "@/lib/directus";

export default function Contact() {
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "Web Development",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            await submitLead({
                name: `${formData.firstName} ${formData.lastName}`.trim(),
                email: formData.email,
                phone: formData.phone,
                service_interest: formData.service,
                message: formData.message,
                source: "Website Contact Form"
            });
            setSuccess(true);
            setFormData({ firstName: "", lastName: "", email: "", phone: "", service: "Web Development", message: "" });
        } catch (err: any) {
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background pb-32 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

            <section className="pt-28 pb-16 lg:pt-36 relative z-10 text-center">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-bold text-sm tracking-wide">
                        Contact Us
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-8 text-foreground tracking-tight">Let's Work Together.</h1>
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-light">
                        Ready to accelerate your digital transformation? Our team is standing by to discuss your project needs.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 max-w-7xl mt-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

                    {/* Contact Information */}
                    <div className="lg:col-span-2 space-y-12">
                        <div>
                            <h2 className="text-3xl font-extrabold mb-6 text-foreground tracking-tight">Global Offices</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed font-light mb-8">
                                Operating from our modern facilities, serving businesses globally.
                            </p>
                        </div>

                        <div className="space-y-10">
                            <div className="flex items-start group">
                                <div className="w-14 h-14 bg-white shadow-sm border border-border rounded-2xl flex items-center justify-center mr-6 shrink-0 text-primary group-hover:-translate-y-1 transition-transform">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground text-xl mb-3">Corporate Office</h3>
                                    <p className="text-muted-foreground leading-relaxed text-lg font-light block">
                                        16, Second Floor, Murahari str,<br />
                                        Sarathi Nagar, West Saidapet,<br />
                                        Chennai, Tamilnadu – 600015.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start group">
                                <div className="w-14 h-14 bg-white shadow-sm border border-border rounded-2xl flex items-center justify-center mr-6 shrink-0 text-accent group-hover:-translate-y-1 transition-transform">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground text-xl mb-3">Phone Support</h3>
                                    <a href="tel:+918300290019" className="text-muted-foreground hover:text-accent transition-colors text-lg font-light block mb-2">+91 8300290019</a>
                                    <p className="text-sm font-bold tracking-wide text-primary uppercase">Mon-Fri / 9am - 6pm IST</p>
                                </div>
                            </div>

                            <div className="flex items-start group">
                                <div className="w-14 h-14 bg-white shadow-sm border border-border rounded-2xl flex items-center justify-center mr-6 shrink-0 text-primary group-hover:-translate-y-1 transition-transform">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground text-xl mb-3">Email Us</h3>
                                    <a href="mailto:info@infygru.com" className="text-muted-foreground hover:text-primary transition-colors text-lg font-light block mb-2">info@infygru.com</a>
                                    <p className="text-sm font-bold tracking-wide text-primary uppercase">24 Hour Response</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-3">
                        <div className="bg-white p-10 md:p-14 rounded-[2.5rem] border border-border shadow-2xl relative overflow-hidden">
                            <div className="mb-10 relative z-10">
                                <h2 className="text-3xl font-extrabold mb-4 text-foreground tracking-tight">Send a Message</h2>
                                <p className="text-lg text-muted-foreground font-light">
                                    Fill out the form below. Our team will get back to you shortly.
                                </p>
                            </div>

                            {success ? (
                                <div className="relative z-10 text-center py-16 bg-green-50 rounded-2xl border border-green-100 flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-green-900 mb-2">Message Sent!</h3>
                                    <p className="text-green-700 font-light">Thank you for reaching out. We'll be in touch soon.</p>
                                    <Button className="mt-8 bg-green-600 hover:bg-green-700" onClick={() => setSuccess(false)}>Send Another</Button>
                                </div>
                            ) : (
                                <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-sm font-bold mb-2 block text-foreground uppercase tracking-wider">First Name</label>
                                            <input required type="text" value={formData.firstName} onChange={(e) => setFormData(p => ({...p, firstName: e.target.value}))} className="w-full p-4 rounded-xl border border-border bg-secondary/30 focus:bg-white focus:ring-2 focus:ring-primary/50 outline-none transition-all duration-200 text-foreground shadow-inner" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-bold mb-2 block text-foreground uppercase tracking-wider">Last Name</label>
                                            <input required type="text" value={formData.lastName} onChange={(e) => setFormData(p => ({...p, lastName: e.target.value}))} className="w-full p-4 rounded-xl border border-border bg-secondary/30 focus:bg-white focus:ring-2 focus:ring-primary/50 outline-none transition-all duration-200 text-foreground shadow-inner" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-sm font-bold mb-2 block text-foreground uppercase tracking-wider">Work Email</label>
                                            <input required type="email" value={formData.email} onChange={(e) => setFormData(p => ({...p, email: e.target.value}))} className="w-full p-4 rounded-xl border border-border bg-secondary/30 focus:bg-white focus:ring-2 focus:ring-primary/50 outline-none transition-all duration-200 text-foreground shadow-inner" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-bold mb-2 block text-foreground uppercase tracking-wider">Phone</label>
                                            <input type="tel" value={formData.phone} onChange={(e) => setFormData(p => ({...p, phone: e.target.value}))} className="w-full p-4 rounded-xl border border-border bg-secondary/30 focus:bg-white focus:ring-2 focus:ring-primary/50 outline-none transition-all duration-200 text-foreground shadow-inner" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-bold mb-2 block text-foreground uppercase tracking-wider">Service Required</label>
                                        <select value={formData.service} onChange={(e) => setFormData(p => ({...p, service: e.target.value}))} className="w-full p-4 rounded-xl border border-border bg-secondary/30 focus:bg-white focus:ring-2 focus:ring-primary/50 outline-none transition-all duration-200 appearance-none text-foreground shadow-inner">
                                            <option>Business Registration</option>
                                            <option>Compliance & Taxation</option>
                                            <option>Web Development</option>
                                            <option>n8n Automation</option>
                                            <option>Cloud Migration</option>
                                            <option>Security Operations</option>
                                            <option>Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-sm font-bold mb-2 block text-foreground uppercase tracking-wider">Message</label>
                                        <textarea required rows={5} value={formData.message} onChange={(e) => setFormData(p => ({...p, message: e.target.value}))} className="w-full p-4 rounded-xl border border-border bg-secondary/30 focus:bg-white focus:ring-2 focus:ring-primary/50 outline-none transition-all duration-200 resize-none text-foreground shadow-inner"></textarea>
                                    </div>

                                    {error && <div className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg border border-red-100">{error}</div>}

                                    <Button type="submit" disabled={submitting} size="lg" className="w-full font-extrabold h-16 text-lg mt-6 shadow-xl hover:shadow-primary/30 transition-all flex items-center justify-center rounded-xl bg-primary text-white hover:bg-primary/90 disabled:opacity-70">
                                        {submitting ? <><Loader2 className="w-6 h-6 mr-3 animate-spin" /> Submitting...</> : <>Send Message <ArrowRight className="ml-3 w-6 h-6" /></>}
                                    </Button>
                                    <div className="flex items-center justify-center gap-2 mt-6 opacity-60">
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                        <p className="text-xs font-bold text-foreground tracking-widest uppercase">We respect your privacy</p>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
