import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/JsonLd";

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
    default: "Infygru | Enterprise IT Solutions & Business Services — Chennai, India",
    template: "%s | Infygru",
  },
  description:
    "Infygru is Chennai's leading enterprise IT company offering web development (Next.js), n8n automation, cloud migration (AWS/Azure/GCP), DevOps, AI solutions, and full business registration & compliance services across India.",
  keywords: [
    "IT solutions Chennai",
    "web development company India",
    "n8n automation experts",
    "cloud migration AWS Azure GCP",
    "Next.js agency Chennai",
    "digital transformation India",
    "company registration Chennai",
    "GST filing services India",
    "MSME registration",
    "business compliance India",
    "DevOps company India",
    "AI computer vision India",
    "enterprise software Chennai",
    "data analytics India",
    "cybersecurity services Chennai",
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
    title: "Infygru | Enterprise IT Solutions & Business Services — Chennai, India",
    description:
      "Web development, automation, cloud migration, and business registration — all under one roof. Serving startups and enterprises across India.",
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
  // Paste your verification codes here after registering:
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
  "@type": "LocalBusiness",
  "@id": `${BASE_URL}/#localbusiness`,
  name: "Infygru Private Limited",
  image: `${BASE_URL}/logo.png`,
  url: BASE_URL,
  telephone: "+91-83002-90019",
  email: "info@infygru.com",
  priceRange: "₹₹",
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
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  hasMap: "https://maps.google.com/?q=West+Saidapet,Chennai",
  areaServed: {
    "@type": "Country",
    name: "India",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <JsonLd data={localBusinessSchema} />
      </head>
      <body
        className={`${inter.variable} ${jakarta.variable} font-sans antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
