/**
 * Directus Schema Setup Script
 * Creates all required collections and fields for the Infygru website.
 * Run with: node scripts/setup-directus.mjs
 */

const BASE_URL = "https://api.infygru.com";
const EMAIL = "admin@infygru.com";
const PASSWORD = "Admin@123!";

let token = "";

async function api(method, path, body) {
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(`${BASE_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });
    const text = await res.text();
    try {
        const json = JSON.parse(text);
        if (!res.ok) {
            if (json.errors?.[0]?.message?.includes("already exists") || 
                json.errors?.[0]?.extensions?.code === "RECORD_NOT_UNIQUE" ||
                res.status === 409) {
                console.log(`  ⚠️  Already exists: ${method} ${path}`);
                return null;
            }
            console.error(`Error ${res.status}: ${method} ${path}`);
            console.error(JSON.stringify(json.errors || json, null, 2));
            return null;
        }
        return json.data ?? json;
    } catch {
        return text;
    }
}

async function authenticate() {
    console.log("🔐 Authenticating with Directus...");
    const data = await api("POST", "/auth/login", { email: EMAIL, password: PASSWORD });
    token = data?.access_token;
    if (!token) throw new Error("Authentication failed");
    console.log("✅ Authenticated successfully\n");
}

async function createCollection(name, meta = {}, schema = {}) {
    console.log(`📁 Creating collection: ${name}`);
    const result = await api("POST", "/collections", {
        collection: name,
        meta: { icon: "article", ...meta },
        schema: { name, ...schema },
        fields: [],
    });
    if (result) console.log(`  ✅ Created: ${name}`);
    return result;
}

async function createField(collection, name, type, meta = {}, schema = {}) {
    const result = await api("POST", `/fields/${collection}`, {
        field: name,
        type,
        meta: { field: name, ...meta },
        schema: { name, ...schema },
    });
    if (result) console.log(`  ➕ Field: ${collection}.${name} (${type})`);
    return result;
}

// ── BLOG CATEGORIES ────────────────────────────────────────────────────────────
async function setupBlogCategories() {
    console.log("\n📌 Setting up blog_categories...");
    await createCollection("blog_categories", {
        icon: "label",
        display_template: "{{name}}",
        sort_field: "sort",
    });
    await createField("blog_categories", "name", "string", {
        display: "raw", required: true, interface: "input",
        options: { placeholder: "Category name" }
    });
    await createField("blog_categories", "slug", "string", {
        display: "raw", required: true, interface: "input",
        options: { placeholder: "url-slug", slug: true }
    });
    await createField("blog_categories", "description", "text", {
        interface: "input-multiline", display: "raw"
    });
    await createField("blog_categories", "sort", "integer", {
        interface: "input", hidden: true
    });
    await createField("blog_categories", "status", "string", {
        required: true, interface: "select-dropdown",
        default_value: "published",
        options: {
            choices: [
                { text: "Published", value: "published" },
                { text: "Draft", value: "draft" },
            ]
        }
    });
}

// ── BLOG POSTS ─────────────────────────────────────────────────────────────────
async function setupBlogPosts() {
    console.log("\n📝 Setting up blog_posts...");
    await createCollection("blog_posts", {
        icon: "article",
        display_template: "{{title}}",
        sort_field: "sort",
        archive_field: "status",
        archive_value: "archived",
        unarchive_value: "draft",
    });

    const fields = [
        ["status", "string", {
            required: true, interface: "select-dropdown",
            default_value: "draft", width: "half",
            options: {
                choices: [
                    { text: "Published", value: "published" },
                    { text: "Draft", value: "draft" },
                    { text: "Archived", value: "archived" },
                ]
            }
        }],
        ["title", "string", { required: true, interface: "input", options: { placeholder: "Post title" } }],
        ["slug", "string", { required: true, interface: "input", options: { placeholder: "post-url-slug", slug: true } }],
        ["excerpt", "text", { interface: "input-multiline", display: "raw", note: "Short summary shown in blog list" }],
        ["featured_image", "uuid", { interface: "file-image", display: "image", special: ["file"] }],
        ["category", "integer", {
            interface: "select-dropdown-m2o", display: "related-values",
            special: ["m2o"],
            options: { template: "{{name}}" }
        }],
        ["content", "text", {
            interface: "input-rich-text-html",
            display: "formatted-value",
            note: "Full blog content (rich text)"
        }],
        ["author_name", "string", { interface: "input", options: { placeholder: "Author full name" }, width: "half" }],
        ["author_role", "string", { interface: "input", options: { placeholder: "Author role/title" }, width: "half" }],
        ["read_time", "string", { interface: "input", options: { placeholder: "e.g. 5 min read" }, width: "half" }],
        ["date_published", "date", { interface: "datetime", display: "datetime", width: "half" }],
        ["tags", "json", { interface: "tags", display: "labels", special: ["cast-json"] }],
        ["seo_title", "string", { interface: "input", group: "seo", width: "full", options: { placeholder: "SEO title override" } }],
        ["seo_description", "text", { interface: "input-multiline", group: "seo", options: { placeholder: "SEO meta description" } }],
        ["sort", "integer", { hidden: true }],
    ];

    for (const [name, type, meta] of fields) {
        await createField("blog_posts", name, type, meta);
    }

    // M2O relationship with blog_categories
    console.log("  🔗 Linking blog_posts.category → blog_categories...");
    await api("POST", "/relations", {
        collection: "blog_posts",
        field: "category",
        related_collection: "blog_categories",
    });
}

// ── SITE SETTINGS (Singleton) ──────────────────────────────────────────────────
async function setupSiteSettings() {
    console.log("\n⚙️  Setting up site_settings (singleton)...");
    await createCollection("site_settings", {
        icon: "settings",
        singleton: true,
        display_template: "Site Settings",
        note: "Global website configuration",
    });

    const fields = [
        ["site_name", "string", { interface: "input", required: true, options: { placeholder: "Infygru" }, width: "half" }],
        ["tagline", "string", { interface: "input", options: { placeholder: "Short tagline" }, width: "half" }],
        ["logo", "uuid", { interface: "file-image", display: "image", special: ["file"] }],
        ["favicon", "uuid", { interface: "file-image", display: "image", special: ["file"] }],
        ["hero_image", "uuid", { interface: "file-image", display: "image", special: ["file"] }],
        ["hero_heading", "string", { interface: "input", options: { placeholder: "Main hero heading" } }],
        ["hero_subheading", "text", { interface: "input-multiline", options: { placeholder: "Hero subheading/description" } }],
        ["contact_email", "string", { interface: "input", options: { placeholder: "info@infygru.com" }, width: "half" }],
        ["contact_phone", "string", { interface: "input", options: { placeholder: "+91 8300290019" }, width: "half" }],
        ["contact_whatsapp", "string", { interface: "input", options: { placeholder: "918300290019" }, width: "half" }],
        ["contact_address", "text", { interface: "input-multiline", options: { placeholder: "Full address" } }],
        ["social_facebook", "string", { interface: "input", options: { placeholder: "https://facebook.com/..." }, width: "half" }],
        ["social_instagram", "string", { interface: "input", options: { placeholder: "https://instagram.com/..." }, width: "half" }],
        ["social_linkedin", "string", { interface: "input", options: { placeholder: "https://linkedin.com/..." }, width: "half" }],
        ["social_twitter", "string", { interface: "input", options: { placeholder: "https://x.com/..." }, width: "half" }],
        ["footer_tagline", "text", { interface: "input-multiline", options: { placeholder: "Footer description text" } }],
        ["seo_default_title", "string", { interface: "input", options: { placeholder: "Default page title" } }],
        ["seo_default_description", "text", { interface: "input-multiline", options: { placeholder: "Default meta description" } }],
    ];

    for (const [name, type, meta] of fields) {
        await createField("site_settings", name, type, meta);
    }
}

// ── CLIENTS / CLIENTELE ────────────────────────────────────────────────────────
async function setupClients() {
    console.log("\n🏢 Setting up clients...");
    await createCollection("clients", {
        icon: "business",
        display_template: "{{name}}",
        sort_field: "sort",
    });

    const fields = [
        ["name", "string", { required: true, interface: "input", options: { placeholder: "Client company name" } }],
        ["logo", "uuid", { required: true, interface: "file-image", display: "image", special: ["file"] }],
        ["website_url", "string", { interface: "input", options: { placeholder: "https://..." } }],
        ["sort", "integer", { hidden: true }],
        ["status", "string", {
            required: true, interface: "select-dropdown",
            default_value: "published", width: "half",
            options: {
                choices: [
                    { text: "Published", value: "published" },
                    { text: "Hidden", value: "hidden" },
                ]
            }
        }],
    ];

    for (const [name, type, meta] of fields) {
        await createField("clients", name, type, meta);
    }
}

// ── TESTIMONIALS ───────────────────────────────────────────────────────────────
async function setupTestimonials() {
    console.log("\n💬 Setting up testimonials...");
    await createCollection("testimonials", {
        icon: "format_quote",
        display_template: "{{author_name}} – {{company}}",
        sort_field: "sort",
    });

    const fields = [
        ["quote", "text", { required: true, interface: "input-multiline", display: "raw" }],
        ["author_name", "string", { required: true, interface: "input", options: { placeholder: "Full name" }, width: "half" }],
        ["author_role", "string", { interface: "input", options: { placeholder: "Role/Title" }, width: "half" }],
        ["company", "string", { interface: "input", options: { placeholder: "Company name" }, width: "half" }],
        ["author_photo", "uuid", { interface: "file-image", display: "image", special: ["file"], width: "half" }],
        ["rating", "integer", { interface: "input", options: { min: 1, max: 5 }, width: "half" }],
        ["sort", "integer", { hidden: true }],
        ["status", "string", {
            required: true, interface: "select-dropdown",
            default_value: "published", width: "half",
            options: {
                choices: [
                    { text: "Published", value: "published" },
                    { text: "Hidden", value: "hidden" },
                ]
            }
        }],
    ];

    for (const [name, type, meta] of fields) {
        await createField("testimonials", name, type, meta);
    }
}

// ── LEADS ──────────────────────────────────────────────────────────────────────
async function setupLeads() {
    console.log("\n📥 Setting up leads...");
    await createCollection("leads", {
        icon: "person_add",
        display_template: "{{name}} – {{email}}",
        sort_field: null,
        note: "Enquiries and leads submitted via the website contact form",
    });

    const fields = [
        ["name", "string", { required: true, interface: "input", options: { placeholder: "Lead full name" }, width: "half" }],
        ["email", "string", { required: true, interface: "input", options: { placeholder: "email@example.com" }, width: "half" }],
        ["phone", "string", { interface: "input", options: { placeholder: "+91 XXXXX XXXXX" }, width: "half" }],
        ["company", "string", { interface: "input", options: { placeholder: "Company name" }, width: "half" }],
        ["service_interest", "string", {
            interface: "select-dropdown", width: "half",
            options: {
                choices: [
                    { text: "Web Development", value: "web-development" },
                    { text: "Digital Transformation", value: "digital-transformation" },
                    { text: "n8n Automation", value: "n8n-automation" },
                    { text: "Cloud Migration", value: "cloud-migration" },
                    { text: "Data Analytics", value: "data-analytics" },
                    { text: "Security Operations", value: "security-operations" },
                    { text: "Business Registration & Licensing", value: "business-registration" },
                    { text: "Compliance & Taxation", value: "compliance-taxation" },
                    { text: "Other", value: "other" },
                ]
            }
        }],
        ["message", "text", { interface: "input-multiline", display: "raw" }],
        ["source", "string", {
            interface: "select-dropdown", width: "half",
            default_value: "website",
            options: {
                choices: [
                    { text: "Website", value: "website" },
                    { text: "WhatsApp", value: "whatsapp" },
                    { text: "Referral", value: "referral" },
                    { text: "Social Media", value: "social-media" },
                    { text: "Other", value: "other" },
                ]
            }
        }],
        ["status", "string", {
            required: true, interface: "select-dropdown",
            default_value: "new", width: "half",
            options: {
                choices: [
                    { text: "New", value: "new" },
                    { text: "Contacted", value: "contacted" },
                    { text: "Qualified", value: "qualified" },
                    { text: "Converted", value: "converted" },
                    { text: "Lost", value: "lost" },
                ]
            }
        }],
        ["notes", "text", { interface: "input-multiline", note: "Internal notes for this lead" }],
        ["date_submitted", "timestamp", {
            interface: "datetime", display: "datetime",
            default_value: "$NOW", readonly: true
        }],
    ];

    for (const [name, type, meta] of fields) {
        await createField("leads", name, type, meta);
    }
}

// ── PERMISSIONS: Allow public read on key collections ─────────────────────────
async function setPublicPermissions() {
    console.log("\n🔓 Setting public read permissions...");
    const publicCollections = [
        "blog_posts",
        "blog_categories",
        "site_settings",
        "clients",
        "testimonials",
    ];

    for (const collection of publicCollections) {
        await api("POST", "/permissions", {
            role: null,  // null = public
            collection,
            action: "read",
            fields: ["*"],
            filter: collection !== "leads" ? { status: { _eq: "published" } } : {},
        });
        console.log(`  ✅ Public read: ${collection}`);
    }
}

// ── MAIN ───────────────────────────────────────────────────────────────────────
async function main() {
    console.log("🚀 Infygru Directus Schema Setup");
    console.log("================================\n");

    await authenticate();
    await setupBlogCategories();
    await setupBlogPosts();
    await setupSiteSettings();
    await setupClients();
    await setupTestimonials();
    await setupLeads();
    await setPublicPermissions();

    console.log("\n✅ Schema setup complete!");
    console.log("==========================");
    console.log("Collections created:");
    console.log("  • blog_categories");
    console.log("  • blog_posts");
    console.log("  • site_settings (singleton)");
    console.log("  • clients");
    console.log("  • testimonials");
    console.log("  • leads");
    console.log("\nNext steps:");
    console.log("  1. Log in to https://api.infygru.com/admin and add content");
    console.log("  2. The frontend will now pull data from Directus 🎉");
}

main().catch(console.error);
