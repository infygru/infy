import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import Script from "next/script";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL = "https://infygru.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Infygru | Web Development Company & Company Registration Services — Chennai, India",
    template: "%s | Infygru",
  },
  description:
    "Infygru — Chennai's top web development company and company registration service. Custom Next.js websites, Private Limited registration, GST filing, n8n automation, cloud migration (AWS/Azure/GCP), and DevOps. Serving startups & enterprises across India.",
  keywords: [
    // High-intent web development queries
    "web development company Chennai",
    "website development company India",
    "best web development company Chennai",
    "Next.js development company India",
    "React development agency India",
    "custom website development India",
    "affordable website development India",
    "hire web developers India",
    "e-commerce website development India",
    // High-intent business registration queries
    "company registration India",
    "how to register a company in India",
    "private limited company registration India",
    "online company registration India",
    "company incorporation India",
    "GST registration India",
    "GST registration Chennai",
    "trademark registration India",
    "MSME Udyam registration",
    "LLP registration India",
    "company registration cost India",
    "business registration services India",
    // Automation & Cloud
    "n8n automation experts India",
    "n8n workflow automation",
    "self-hosted n8n consulting",
    "cloud migration AWS Azure GCP India",
    "cloud migration services India",
    "DevOps consulting services India",
    "CI/CD pipeline setup India",
    // Compliance
    "GST filing services India",
    "ITR filing experts India",
    "tax filing services India",
    "business compliance India",
    // AI & Analytics
    "AI solutions India",
    "data analytics company India",
    // IT Services Local
    "IT company Chennai",
    "IT services company Chennai",
    "software company Chennai",
    "digital transformation consulting India",
    "enterprise software development India",
    "ServiceNow implementation India",
    "cybersecurity services India",
  ],
  authors: [{ name: "Infygru Private Limited", url: BASE_URL }],
  creator: "Infygru Private Limited",
  publisher: "Infygru Private Limited",
  applicationName: "Infygru",
  category: "Technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Infygru",
    title: "Infygru | Web Development Company & Company Registration — Chennai, India",
    description:
      "Custom Next.js websites, Private Limited company registration, GST filing, cloud migration & n8n automation — all under one roof in Chennai. Free consultation.",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Infygru — Enterprise IT Solutions & Business Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Infygru | Enterprise IT Solutions & Business Services",
    description:
      "Web development, automation, cloud, and compliance — all from Chennai's top IT company. Trusted by enterprises across India.",
    images: [`${BASE_URL}/og-image.png`],
    creator: "@infygru",
    site: "@infygru",
  },
  // Add your verification codes from Google Search Console and Bing Webmaster Tools:
  // verification: {
  //   google: "YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE",
  //   other: { "msvalidate.01": "YOUR_BING_WEBMASTER_TOOLS_CODE" },
  // },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: "Infygru Private Limited",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/logo.png`,
    width: 200,
    height: 60,
  },
  description:
    "Enterprise IT solutions, web development, cloud migration, n8n automation, and business compliance services for startups and enterprises across India.",
  foundingLocation: {
    "@type": "Place",
    name: "Chennai, Tamil Nadu, India",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "16, Second Floor, Murahari Street, Sarathi Nagar, West Saidapet",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600015",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-83002-90019",
      contactType: "customer support",
      availableLanguage: ["English", "Tamil"],
      areaServed: "IN",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/infygru",
    "https://www.facebook.com/infygru",
    "https://twitter.com/infygru",
    "https://www.instagram.com/infygru",
    "https://clutch.co/profile/infygru",
    "https://www.goodfirms.co/company/infygru",
    "https://www.crunchbase.com/organization/infygru",
    "https://www.g2.com/sellers/infygru",
  ],
  knowsAbout: [
    "Web Development",
    "Cloud Computing",
    "Business Automation",
    "Digital Transformation",
    "DevOps",
    "Cybersecurity",
    "Artificial Intelligence",
    "Business Registration",
    "GST Compliance",
    "Company Incorporation",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  url: BASE_URL,
  name: "Infygru",
  description: "Enterprise IT Solutions & Business Services — Chennai, India",
  publisher: { "@id": `${BASE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${BASE_URL}/#localbusiness`,
  name: "Infygru Private Limited",
  image: `${BASE_URL}/logo.png`,
  url: BASE_URL,
  telephone: "+91-83002-90019",
  email: "info@infygru.com",
  priceRange: "₹₹-₹₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, Credit Card, Bank Transfer, UPI, Paytm",
  address: {
    "@type": "PostalAddress",
    streetAddress: "16, Second Floor, Murahari Street, Sarathi Nagar, West Saidapet",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600015",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 13.0155,
    longitude: 80.2201,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  hasMap: "https://maps.google.com/?q=Infygru+West+Saidapet+Chennai",
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "City", name: "Chennai" },
    { "@type": "City", name: "Bangalore" },
    { "@type": "City", name: "Mumbai" },
    { "@type": "City", name: "Hyderabad" },
    { "@type": "City", name: "Delhi" },
  ],
  serviceType: [
    "Web Development",
    "Cloud Migration",
    "Business Automation",
    "Business Registration",
    "GST Registration",
    "Trademark Registration",
    "DevOps",
    "Cybersecurity",
    "AI Solutions",
  ],
  slogan: "Engineering India's Digital Future",
};

// Update this with real review data once you collect Google / Clutch reviews
const aggregateRatingSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization-rating`,
  name: "Infygru Private Limited",
  url: BASE_URL,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "27",
    bestRating: "5",
    worstRating: "1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* NOTE: Do NOT add a hardcoded <link rel="canonical"> here.
            Each page sets its own canonical via metadata.alternates.canonical. */}
        <meta name="theme-color" content="#f59e0b" />
        <meta name="geo.region" content="IN-TN" />
        <meta name="geo.placename" content="Chennai" />
        <meta name="geo.position" content="13.0155;80.2201" />
        <meta name="ICBM" content="13.0155, 80.2201" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.infygru.com" />
        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//api.infygru.com" />
        <link rel="dns-prefetch" href="//wa.me" />
        {/* Structured Data */}
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <JsonLd data={localBusinessSchema} />
        <JsonLd data={aggregateRatingSchema} />
      </head>
      <body
        className={`${inter.variable} ${jakarta.variable} font-sans antialiased flex flex-col min-h-screen`}
      >
        {children}
        {/* Google Analytics — add your Measurement ID in environment variable */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
