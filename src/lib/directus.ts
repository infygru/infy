/**
 * Directus API client helper for Infygru website.
 * All data fetching for the frontend runs through here.
 */

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "https://api.infygru.com";
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN || ""; // optional: server-side static token

// ── Types ─────────────────────────────────────────────────────────────────────

export type DirectusFile = {
    id: string;
    filename_download: string;
    title: string | null;
    type: string;
    width: number | null;
    height: number | null;
};

export type BlogCategory = {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    status: string;
};

export type BlogPost = {
    id: number;
    status: string;
    title: string;
    slug: string;
    excerpt: string | null;
    featured_image: string | null; // file UUID
    category: BlogCategory | number | null;
    content: string | null;
    author_name: string | null;
    author_role: string | null;
    read_time: string | null;
    date_published: string | null;
    date_updated: string | null;
    tags: string[] | null;
    seo_title: string | null;
    seo_description: string | null;
};

export type SiteSettings = {
    site_name: string;
    tagline: string | null;
    logo: string | null;
    favicon: string | null;
    hero_image: string | null;
    hero_heading: string | null;
    hero_subheading: string | null;
    contact_email: string | null;
    contact_phone: string | null;
    contact_whatsapp: string | null;
    contact_address: string | null;
    social_facebook: string | null;
    social_instagram: string | null;
    social_linkedin: string | null;
    social_twitter: string | null;
    footer_tagline: string | null;
    seo_default_title: string | null;
    seo_default_description: string | null;
};

export type Client = {
    id: number;
    name: string;
    logo: string | null; // file UUID
    website_url: string | null;
    sort: number | null;
    status: string;
};

export type Testimonial = {
    id: number;
    quote: string;
    author_name: string;
    author_role: string | null;
    company: string | null;
    author_photo: string | null;
    rating: number | null;
    sort: number | null;
    status: string;
};

export type Lead = {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    service_interest?: string;
    message?: string;
    source?: string;
};

// Pricing plan as stored in Directus `pricing_plans` collection
export type PricingPlan = {
    id: number;
    status: string;
    sort: number | null;
    name: string;
    badge: string | null;
    category: string; // e.g. 'it-services' | 'business-registration' | 'compliance-taxation'
    price: string; // e.g. '₹14,999' or 'Custom'
    price_note: string | null; // e.g. '/project'
    description: string;
    features: string[]; // JSON array of feature strings
    popular: boolean;
    cta_label: string;
    cta_link: string;
};

// Service as stored in Directus `services` collection
export type ServiceItem = {
    id: number;
    status: string;
    sort: number | null;
    slug: string;
    title: string;
    description: string;
    long_description: string | null;
    category: string; // e.g. 'it' | 'business'
    icon: string | null; // lucide icon name
    features: string[]; // JSON array
    benefits: string[]; // JSON array
    seo_title: string | null;
    seo_description: string | null;
    seo_keywords: string | null;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Get the public URL for a Directus file asset.
 */
export function fileUrl(fileId: string | null | undefined, options?: {
    width?: number;
    height?: number;
    fit?: "cover" | "contain" | "inside" | "outside";
    quality?: number;
    format?: "webp" | "jpg" | "png";
}): string | null {
    if (!fileId) return null;
    let url = `${DIRECTUS_URL}/assets/${fileId}`;
    if (options) {
        const params = new URLSearchParams();
        if (options.width) params.set("width", String(options.width));
        if (options.height) params.set("height", String(options.height));
        if (options.fit) params.set("fit", options.fit);
        if (options.quality) params.set("quality", String(options.quality));
        if (options.format) params.set("format", options.format);
        url += `?${params.toString()}`;
    }
    return url;
}

async function directusFetch<T>(
    path: string,
    params: Record<string, string> = {}
): Promise<T | null> {
    try {
        const urlParams = new URLSearchParams(params);
        const url = `${DIRECTUS_URL}${path}${urlParams.toString() ? `?${urlParams}` : ""}`;
        const headers: HeadersInit = { "Content-Type": "application/json" };
        if (DIRECTUS_TOKEN) headers["Authorization"] = `Bearer ${DIRECTUS_TOKEN}`;

        const res = await fetch(url, {
            headers,
            next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
        });

        if (!res.ok) return null;
        const json = await res.json();
        return json.data ?? null;
    } catch {
        return null;
    }
}

// ── API Functions ─────────────────────────────────────────────────────────────

/** Fetch all published blog posts, sorted by date descending */
export async function getBlogPosts(params?: {
    category?: string;
    limit?: number;
    search?: string;
}): Promise<BlogPost[]> {
    const filterParts: string[] = [`"status":{"_eq":"published"}`];
    if (params?.category) {
        filterParts.push(`"category.slug":{"_eq":"${params.category}"}`);
    }
    const filterStr = `{${filterParts.join(",")}}`;

    const queryParams: Record<string, string> = {
        fields: "id,title,slug,excerpt,featured_image,category.id,category.name,category.slug,author_name,author_role,read_time,date_published,tags",
        sort: "-date_published",
        filter: filterStr,
    };

    if (params?.limit) queryParams.limit = String(params.limit);
    if (params?.search) queryParams.search = params.search;

    const result = await directusFetch<BlogPost[]>("/items/blog_posts", queryParams);
    return result ?? [];
}

/** Fetch a single blog post by slug */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    const result = await directusFetch<BlogPost[]>("/items/blog_posts", {
        fields: "*,category.id,category.name,category.slug",
        filter: JSON.stringify({ slug: { _eq: slug }, status: { _eq: "published" } }),
        limit: "1",
    });
    return result?.[0] ?? null;
}

/** Fetch all blog categories */
export async function getBlogCategories(): Promise<BlogCategory[]> {
    const result = await directusFetch<BlogCategory[]>("/items/blog_categories", {
        fields: "id,name,slug,description",
        filter: JSON.stringify({ status: { _eq: "published" } }),
        sort: "sort",
    });
    return result ?? [];
}

/** Fetch site settings singleton */
export async function getSiteSettings(): Promise<SiteSettings | null> {
    return directusFetch<SiteSettings>("/items/site_settings");
}

/** Fetch published clients sorted by their sort field */
export async function getClients(): Promise<Client[]> {
    const result = await directusFetch<Client[]>("/items/clients", {
        fields: "id,name,logo,website_url,sort",
        filter: JSON.stringify({ status: { _eq: "published" } }),
        sort: "sort",
    });
    return result ?? [];
}

/** Fetch published testimonials */
export async function getTestimonials(): Promise<Testimonial[]> {
    const result = await directusFetch<Testimonial[]>("/items/testimonials", {
        fields: "id,quote,author_name,author_role,company,author_photo,rating,sort",
        filter: JSON.stringify({ status: { _eq: "published" } }),
        sort: "sort",
    });
    return result ?? [];
}

/** Fetch pricing plans from Directus, optionally filtered by category */
export async function getPricingPlans(category?: string): Promise<PricingPlan[]> {
    const filterParts: string[] = [`"status":{"_eq":"published"}`];
    if (category) filterParts.push(`"category":{"_eq":"${category}"}`);
    const filterStr = `{${filterParts.join(",")}}`;

    const result = await directusFetch<PricingPlan[]>("/items/pricing_plans", {
        fields: "id,status,sort,name,badge,category,price,price_note,description,features,popular,cta_label,cta_link",
        filter: filterStr,
        sort: "sort",
    });
    return result ?? [];
}

/** Fetch all or a single service from Directus `services` collection */
export async function getServices(category?: string): Promise<ServiceItem[]> {
    const filterParts: string[] = [`"status":{"_eq":"published"}`];
    if (category) filterParts.push(`"category":{"_eq":"${category}"}`);
    const filterStr = `{${filterParts.join(",")}}`;

    const result = await directusFetch<ServiceItem[]>("/items/services", {
        fields: "id,status,sort,slug,title,description,long_description,category,icon,features,benefits,seo_title,seo_description,seo_keywords",
        filter: filterStr,
        sort: "sort",
    });
    return result ?? [];
}

export async function getServiceBySlug(slug: string): Promise<ServiceItem | null> {
    const result = await directusFetch<ServiceItem[]>("/items/services", {
        fields: "*",
        filter: JSON.stringify({ slug: { _eq: slug }, status: { _eq: "published" } }),
        limit: "1",
    });
    return result?.[0] ?? null;
}

/** Submit a lead to Directus */
export async function submitLead(lead: Lead): Promise<{ success: boolean; error?: string }> {
    try {
        const res = await fetch(`${DIRECTUS_URL}/items/leads`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(lead),
        });
        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            return { success: false, error: err.errors?.[0]?.message || "Submission failed" };
        }
        return { success: true };
    } catch (e: unknown) {
        return { success: false, error: "Network error. Please try again." };
    }
}
