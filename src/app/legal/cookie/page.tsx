export const metadata = { title: "Cookie Policy | Infygru" };

export default function CookiePolicy() {
    return (
        <div className="min-h-screen bg-background py-24">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-foreground tracking-tight">Cookie Policy</h1>
                <div className="text-muted-foreground leading-relaxed space-y-6 text-lg">
                    <p className="font-semibold">Last updated: 12 Jan 2026</p>
                    <p>This Cookie policy explains what cookies are and how we use them on the Infygru website. You should read this policy so you can understand what type of cookies we use, the information we collect using cookies, and how that information is used.</p>

                    <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">1. What are cookies?</h2>
                    <p>Cookies are small text files that are temporarily stored on your device (computer or mobile device) when you visit a website. They are widely used to make websites work more efficiently and provide a better user experience.</p>

                    <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">2. How do we use cookies?</h2>
                    <p>We use cookies to enhance your browsing experience by: Remembering your preferences and settings, analyzing how you use our website to improve our services, and ensuring the website functions correctly.</p>

                    <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">3. Types of Cookies we use</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Essential cookies:</strong> Required for the basic functionality of the site.</li>
                        <li><strong>Analytics cookies:</strong> Allow us to recognize and count the number of visitors and see how visitors move around the site.</li>
                        <li><strong>Preference cookies:</strong> Used to recognize you when you return to our website.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">4. Your Choices Regarding Cookies</h2>
                    <p>If you prefer to avoid the use of cookies on the Website, first you must disable the use of Cookies in your browser and then delete the Cookies saved in your browser associated with this website. You may use this option for preventing the use of Cookies at any time.</p>
                </div>
            </div>
        </div>
    );
}
