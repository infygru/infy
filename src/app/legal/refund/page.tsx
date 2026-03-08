export const metadata = { title: "Refund Policy | Infygru" };

export default function RefundPolicy() {
    return (
        <div className="min-h-screen bg-background py-24">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-foreground tracking-tight">Refund & Cancellation Policy</h1>
                <div className="text-muted-foreground leading-relaxed space-y-6 text-lg">
                    <p className="font-semibold">Last updated: 12 Jan 2026</p>
                    <p>Thank you for choosing Infygru Private Limited for your IT Solutions and Digital Transformation needs.</p>

                    <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">1. Software Development & Services</h2>
                    <p>For custom software development, web development, and integration services, payments are made in milestones as outlined in the Statement of Work (SOW). Milestone payments are generally non-refundable once the work for that milestone has commenced and deliverables are provided.</p>

                    <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">2. Cancellation Policy</h2>
                    <p>You may cancel a service agreement by providing a written notice of 30 days. Any work completed up to the date of cancellation will be billed accordingly. Prepaid amounts for unutilized services beyond the notice period may be eligible for a refund.</p>

                    <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">3. SaaS & Subscriptions</h2>
                    <p>If you have subscribed to any hosted automation (n8n) or SaaS products offered by us, you can cancel your subscription at any time. Refunds for the current billing cycle will not be provided, but future billing will be stopped immediately.</p>

                    <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">4. Contact Us</h2>
                    <p>If you have any questions or concerns regarding our Refund and Cancellation Policy, please contact us at info@infygru.com.</p>
                </div>
            </div>
        </div>
    );
}
