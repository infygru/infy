import { Button } from "@/components/ui/Button";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";

export const metadata = {
    title: "Careers | Join Top IT Company in Chennai | Infygru",
    description: "Explore career opportunities at Infygru, a leading IT solutions provider in Chennai. We are hiring Senior Developers, Visual Designers, and Backend Developers.",
    keywords: "IT jobs Chennai, software developer jobs Chennai, visual designer jobs Chennai, backend developer careers, tech careers India"
};

export default function Careers() {
    const currentOpenings = [
        {
            title: "Senior Full Stack Developer",
            department: "Engineering",
            location: "Chennai, TN (Hybrid)",
            type: "Full-Time",
            description: "We are seeking a seasoned Senior Developer to lead enterprise web application architectures using Next.js and robust cloud backends."
        },
        {
            title: "Visual Product Designer",
            department: "Design & UX",
            location: "Chennai, TN (On-Site)",
            type: "Full-Time",
            description: "Join our creative team to craft stunning, user-centric interfaces for our enterprise software suite and high-end client applications."
        },
        {
            title: "Backend Platform Engineer",
            department: "Engineering",
            location: "Chennai, TN (Hybrid)",
            type: "Full-Time",
            description: "Architect secure, scalable databases and design complex API architectures to power our automation and data analytics workflows."
        }
    ];

    return (
        <div className="min-h-screen bg-background pb-32 relative font-sans">
            {/* Subtle top ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

            <div className="relative z-10 pt-28 pb-16 lg:pt-36 text-center">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-bold text-sm tracking-wide font-heading">
                        Join The Revolution
                    </div>
                    <h1 className="font-heading text-5xl md:text-6xl font-extrabold mb-6 text-foreground tracking-tight">Build the Future of IT.</h1>
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12 max-w-3xl mx-auto font-light">
                        We are actively looking for elite engineers, visionary designers, and automation specialists to join our rapidly expanding headquarters in Chennai.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                <h2 className="font-heading text-3xl font-extrabold mb-10 text-foreground">Current Openings</h2>

                <div className="space-y-6">
                    {currentOpenings.map((job, idx) => (
                        <div key={idx} className="bg-white p-8 md:p-10 rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                            <div className="space-y-4 flex-1">
                                <div>
                                    <h3 className="font-heading text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{job.title}</h3>
                                    <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground">
                                        <span className="flex items-center bg-secondary px-3 py-1 rounded-full"><Briefcase className="w-4 h-4 mr-2 text-primary" /> {job.department}</span>
                                        <span className="flex items-center bg-secondary px-3 py-1 rounded-full"><MapPin className="w-4 h-4 mr-2 text-accent" /> {job.location}</span>
                                        <span className="flex items-center bg-secondary px-3 py-1 rounded-full"><Clock className="w-4 h-4 mr-2 text-primary" /> {job.type}</span>
                                    </div>
                                </div>
                                <p className="text-muted-foreground leading-relaxed font-light">
                                    {job.description}
                                </p>
                            </div>

                            <div className="shrink-0 w-full md:w-auto">
                                <a href="mailto:careers@infygru.com">
                                    <Button size="lg" className="font-heading w-full md:w-auto font-bold h-14">
                                        Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 bg-slate-950 p-12 md:p-16 rounded-[2.5rem] border border-slate-800 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                    <h2 className="font-heading text-3xl font-bold mb-4 text-white relative z-10">Don't see your role?</h2>
                    <p className="text-slate-400 mb-8 text-lg font-light relative z-10 max-w-2xl mx-auto">
                        We're consistently scouting for exceptional talent to scale our digital transformation initiatives. Send us an open application.
                    </p>
                    <a href="mailto:info@infygru.com" className="relative z-10">
                        <Button size="lg" className="font-heading font-bold bg-white text-slate-950 hover:bg-slate-200">Submit Open Resume</Button>
                    </a>
                </div>
            </div>
        </div>
    );
}
