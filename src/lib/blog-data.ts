export type Category = {
    id: string;
    label: string;
};

export type BlogPost = {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    author: string;
    authorRole: string;
    date: string;
    readTime: string;
    image: string;
    tags: string[];
};

export const categories: Category[] = [
    { id: "all", label: "All Posts" },
    { id: "business", label: "Business & Registration" },
    { id: "compliance", label: "Compliance & Tax" },
    { id: "technology", label: "Technology" },
    { id: "web-development", label: "Web Development" },
    { id: "automation", label: "Automation" },
];

export const blogPosts: BlogPost[] = [
    {
        slug: "how-to-register-your-startup-in-india",
        title: "How to Register Your Startup in India: A Complete 2025 Guide",
        excerpt: "Starting a business in India? Here's everything you need to know about company incorporation, required documents, timelines, and government fees.",
        content: `Starting a business in India has never been easier. With digital filing systems and streamlined MCA21 portals, incorporation can happen in as little as 7 working days. This guide walks you through every step.

## Step 1: Choose Your Business Structure
The most popular options are Private Limited Company (Pvt. Ltd.), LLP, and Sole Proprietorship. For startups seeking investment, Pvt. Ltd. is the gold standard.

## Step 2: Get a Digital Signature Certificate (DSC)
All directors must have a DSC before filing. It's available online through government-authorized agencies within 1-2 business days.

## Step 3: Apply for a Director Identification Number (DIN)
The DIN uniquely identifies your director. It can be applied for via the SPICe+ form on the MCA portal.

## Step 4: File SPICe+ Form
SPICe+ (Simplified Proforma for Incorporating Company Electronically Plus) combines multiple applications including PAN, TAN, GST, EPFO, ESIC, and bank account opening into a single form.

## Step 5: Certificate of Incorporation
Once approved, you'll receive a Certificate of Incorporation (COI), PAN, and TAN via email.

## Key Timelines
- DSC: 1-2 days
- DIN: Same day
- SPICe+ approval: 5-7 working days

## Costs
Government fees vary based on authorized share capital. For most startups, the total cost (including professional fees) ranges between ₹5,000-₹15,000.`,
        category: "business",
        author: "Arjun Krishnamurthy",
        authorRole: "Business Consultant",
        date: "March 10, 2025",
        readTime: "7 min read",
        image: "/blog/business-registration.jpg",
        tags: ["Startup", "Company Registration", "MCA", "SPICe+"],
    },
    {
        slug: "gst-filing-guide-for-msme",
        title: "GST Filing for MSMEs: Common Mistakes and How to Avoid Them",
        excerpt: "GST compliance is a common headache for small businesses. We break down the most frequent errors MSMEs make and provide actionable tips to stay penalty-free.",
        content: `GST compliance is non-negotiable for MSMEs in India. A single missed filing can attract a penalty of ₹50 per day. Here are the most common mistakes and how to avoid them.

## Mistake 1: Not Reconciling GSTR-2A with Purchase Records
Many businesses don't reconcile their purchase records with GSTR-2A (auto-populated from suppliers). This leads to denied ITC claims. Run a monthly reconciliation before filing.

## Mistake 2: Missing Reverse Charge Mechanism (RCM) Entries
If you purchase from an unregistered dealer for specific categories, you must pay GST under RCM. Missing this is a common audit trigger.

## Mistake 3: Filing GSTR-3B Without Verifying GSTR-1
Your outward supplies data in GSTR-1 must match GSTR-3B. Mismatches attract scrutiny from the department.

## Mistake 4: Incorrect HSN Code Classification
Using an incorrect HSN code can lead to paying the wrong tax rate. Use the official GST council rate finder to verify.

## Best Practices
- Maintain a GST compliance calendar
- Automate reminders for filing dates (GSTR-1 on 11th, GSTR-3B on 20th)
- Use Tally or Zoho Books for auto-reconciliation
- Consult a GST practitioner quarterly`,
        category: "compliance",
        author: "Priya Nair",
        authorRole: "Tax Consultant",
        date: "March 5, 2025",
        readTime: "6 min read",
        image: "/blog/gst-filing.jpg",
        tags: ["GST", "Compliance", "MSME", "Tax Filing"],
    },
    {
        slug: "n8n-automation-for-business",
        title: "How n8n Automation Can Save Your Business 200+ Hours Every Month",
        excerpt: "Workflow automation isn't just for tech giants. Learn how small businesses are using n8n to eliminate manual data entry and synchronize their entire software stack.",
        content: `Automation is the great equalizer. With tools like n8n, even a 5-person team can operate with the efficiency of a 50-person operation.

## What is n8n?
n8n is an open-source, self-hostable workflow automation tool. Think of it as a supercharged Zapier — but without the per-task pricing and with far more power over complex logic.

## Common Business Workflows to Automate

### 1. CRM Sync
Automatically sync new leads from your website form to your CRM (HubSpot, Zoho) and trigger a welcome email via SendGrid — all without touching a keyboard.

### 2. Invoice Generation
When a deal is marked "Closed Won" in your CRM, n8n can automatically create an invoice in Zoho Books, send it to the client, and notify your finance team on Slack.

### 3. Social Media Posting
Schedule and post content across LinkedIn, Instagram, and Twitter from a single Google Sheet. n8n reads the sheet, formats the content, and distributes it.

### 4. HR Onboarding
New employee added to your HRMS? n8n can create their GSuite account, add them to Slack workspaces, assign onboarding tasks in Asana, and send a welcome email — automatically.

## ROI Calculation
A team spending 2 hours/day on manual data entry (5 people) = **200+ hours/month**. At ₹500/hour, that's ₹1,00,000/month in opportunity cost. n8n infrastructure costs under ₹5,000/month.`,
        category: "automation",
        author: "Vikram Singh",
        authorRole: "Automation Engineer",
        date: "February 28, 2025",
        readTime: "8 min read",
        image: "/blog/n8n-automation.jpg",
        tags: ["n8n", "Automation", "Workflow", "Productivity"],
    },
    {
        slug: "nextjs-vs-react-for-business",
        title: "Next.js vs React: Which One Is Right for Your Business Website?",
        excerpt: "Unsure whether to build with React or Next.js? We compare performance, SEO, scalability, and cost to help you make the right technology decision.",
        content: `The choice between React and Next.js is one of the most common dilemmas for businesses commissioning a new website. Here's a direct comparison.

## React: The Building Block
React is a JavaScript library for building user interfaces. It excels at creating dynamic, interactive SPAs (Single Page Applications). However, React alone doesn't handle routing, SSR, or SEO natively.

## Next.js: The Full Stack Framework
Next.js is built on top of React and adds Server-Side Rendering (SSR), Static Site Generation (SSG), file-based routing, API routes, and image optimization out of the box.

## Key Comparison

| Feature | React | Next.js |
|---|---|---|
| SEO | Poor (CSR by default) | Excellent (SSR/SSG) |
| Performance | Good | Excellent |
| Routing | Manual (React Router) | Built-in |
| API Routes | No | Yes |
| Deployment | Flexible | Vercel-optimized |

## Our Recommendation
For any business website that requires SEO, fast initial load times, and professional credibility — **Next.js is the clear winner**. It's what we build all our client projects with at Infygru.

If you're building a highly interactive internal tool (like a dashboard) where SEO doesn't matter, pure React (or even Next.js with CSR) works perfectly.`,
        category: "web-development",
        author: "Rahul Sharma",
        authorRole: "Lead Engineer",
        date: "February 20, 2025",
        readTime: "5 min read",
        image: "/blog/nextjs-react.jpg",
        tags: ["Next.js", "React", "Web Development", "Tech Stack"],
    },
    {
        slug: "trademark-registration-india",
        title: "Why Trademark Registration is Non-Negotiable for Your Brand",
        excerpt: "Your brand name is your most valuable asset. Learn how trademark registration protects it, how long it takes, and what to do if someone infringes on it.",
        content: `Every day you operate without a registered trademark, someone else could file for it — and legally own your brand name. Here's why you must act now.

## What is a Trademark?
A trademark is a unique identifier — a word, logo, slogan, or combination — that distinguishes your goods or services from others. Registration gives you the exclusive right to use it in India.

## Why Register?
1. **Legal Protection**: File an infringement suit against copycats.
2. **Brand Value**: Trademarks are valuable assets — they can be licensed, sold, or pledged as security.
3. **Consumer Trust**: The ® symbol signals authenticity.
4. **10-Year Protection**: Renewable indefinitely.

## The Process
1. **Trademark Search**: Before filing, search the IP India database to check for conflicts.
2. **Filing Application**: File Form TM-A on the IP India portal. Government fee: ₹4,500 for individuals/startups; ₹9,000 for companies.
3. **Examination**: The registry reviews the application. If they raise objections, a response must be filed within 30 days.
4. **Publication**: If accepted, it's published in the Trademark Journal for 4 months (for public opposition).
5. **Registration**: If no opposition is filed, you receive the Registration Certificate.

## Timeline
Typically 12-24 months for full registration, but you can use the ™ symbol from the date of filing.`,
        category: "business",
        author: "Arjun Krishnamurthy",
        authorRole: "Business Consultant",
        date: "February 15, 2025",
        readTime: "6 min read",
        image: "/blog/trademark.jpg",
        tags: ["Trademark", "Brand Protection", "IP India", "Legal"],
    },
    {
        slug: "cloud-migration-benefits",
        title: "5 Business Benefits of Cloud Migration You Can't Afford to Ignore",
        excerpt: "Still running on on-premise servers? Moving to the cloud unlocks massive cost savings, performance gains, and disaster recovery capabilities.",
        content: `The question is no longer "should we move to the cloud?" but "how fast can we do it?" Here are five undeniable benefits.

## 1. Dramatic Cost Reduction
On-premise infrastructure requires upfront hardware costs, maintenance staff, and power/cooling expenses. Cloud platforms like AWS and Azure offer pay-as-you-go pricing, often reducing IT costs by 30-50%.

## 2. Elastic Scalability
Handle traffic spikes without over-provisioning. An e-commerce site can scale up server capacity during Diwali sales and scale back down — automatically — without paying for idle resources year-round.

## 3. Built-In Disaster Recovery
Cloud providers offer multi-region redundancy. Your data is automatically replicated across data centers. RTO (Recovery Time Objective) drops from days to minutes.

## 4. Enhanced Security
AWS, Azure, and GCP all comply with ISO 27001, SOC 2, and GDPR. They invest billions in security annually — far more than any SME can match with on-premise solutions.

## 5. Global Performance
Use a CDN (Content Delivery Network) and edge locations to serve your application from data centers closest to your users — reducing latency globally.

## Getting Started
A typical cloud migration follows five phases: Discover → Assess → Mobilize → Migrate → Operate. Our team at Infygru ensures zero-downtime throughout.`,
        category: "technology",
        author: "Meera Rajan",
        authorRole: "Cloud Architect",
        date: "February 10, 2025",
        readTime: "7 min read",
        image: "/blog/cloud.jpg",
        tags: ["Cloud", "AWS", "Migration", "Infrastructure"],
    },
];
