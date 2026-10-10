// Single source of truth for the portfolio. Edit this file to add, remove
// or rewrite projects. Check each client project is OK to show publicly.
// `links` is for public live sites and store listings only; source repos
// are never linked.
//
// Images: put files in public/images/projects and set the path, e.g.
//   image: "/images/projects/cleansera.jpg"
//   gallery: ["/images/projects/cleansera-1.jpg", ...]
// Empty strings render a blank placeholder until you add the real files.
const blank = (n) => Array.from({ length: n }, () => "");

export const projects = [
  {
    slug: "one-universe",
    name: "One Universe",
    kind: "Services marketplace app",
    category: "Mobile",
    image: "/images/projects/one-universe.jpg",
    gallery: blank(2),
    summary:
      "A Flutter marketplace app that connects people in Nigeria with verified service providers, with escrow-held payments, in-app wallet and live location matching.",
    overview: [
      "One Universe helps people find and pay for local services in a market that is largely informal. Buyers find providers near them, agree a quote, and pay through the app, where the money is held in escrow until the job is done and confirmed.",
      "I built the mobile app in Flutter for both buyers and sellers: onboarding, verification, discovery, quotes, bookings, payments, chat and the seller toolkit, all on top of the product's REST API.",
    ],
    role: "Built the Flutter app for iOS and Android.",
    platforms: ["iOS", "Android"],
    availability: "Published on the App Store and Google Play",
    features: [
      {
        title: "Verified buyers and sellers",
        text: "Separate buyer and seller registration flows, with identity verification (NIN or BVN) and biometric login on the device.",
      },
      {
        title: "Find providers nearby",
        text: "Browse by category and filters, with Google Maps, geocoding and a location picker to match people with providers close to them.",
      },
      {
        title: "Quotes, bookings and disputes",
        text: "Service requests, quotes with renegotiation, work-progress tracking, and a dispute flow when a job does not go to plan.",
      },
      {
        title: "Wallet and escrow payments",
        text: "In-app wallet with top-up and withdrawals to bank accounts, and payments held in escrow until the buyer confirms the job.",
      },
      {
        title: "Seller toolkit",
        text: "A guided become-a-seller flow, service listings, ratings and reviews, subscriptions and sponsored placements, and bookmarked sellers for buyers.",
      },
      {
        title: "Trust and safety",
        text: "In-app chat, notifications, a referral programme, and a panic button with emergency contacts.",
      },
    ],
    engineering: [
      "State and data handled with Riverpod, a typed model layer of 22 data models and a dedicated API layer for requests, payments and profile data.",
      "Image uploads go straight to Cloudinary; push notifications use Firebase Cloud Messaging.",
      "Role-aware app: the same codebase serves buyers and sellers with different onboarding, home content and tools.",
    ],
    stats: [
      { value: "120", label: "Dart source files" },
      { value: "22", label: "Data models" },
      { value: "50+", label: "Screens" },
    ],
    stack: ["Flutter", "Dart", "Riverpod", "Firebase Messaging", "Google Maps"],
    links: [{ label: "View on the App Store", href: "https://apps.apple.com/app/id6753012310" }],
    featured: true,
  },
  {
    slug: "founder-thrive",
    name: "Founder Thrive",
    kind: "Wellbeing app for founders",
    category: "Mobile",
    image: "/images/projects/founder-thrive.jpg",
    gallery: blank(2),
    summary:
      "A Flutter wellbeing app that helps startup founders spot early signs of burnout through daily check-ins, progress reports and guided resources.",
    overview: [
      "Founder Thrive is built for startup founders and entrepreneurs. A short daily check-in builds a picture of how they are doing over time, and the app turns it into a burnout analysis with practical resources to act on it.",
      "I built the Flutter app end to end on the client's REST API: onboarding, check-ins, reports, the resource library, audio, journal and account features, with a link into the founder community.",
    ],
    role: "Built the Flutter app for iOS and Android.",
    platforms: ["iOS", "Android"],
    availability: "Published on the App Store and Google Play",
    features: [
      {
        title: "Daily check-ins",
        text: "A guided check-in covering sleep quality, energy, focus and happiness, plus a daily mood entry.",
      },
      {
        title: "Burnout analysis and reports",
        text: "Check-ins roll up into a 21-day analysis, with charts, a breakdown by area and a downloadable report.",
      },
      {
        title: "Resource library",
        text: "Explore content by category or by time available, save favourites, and get recommendations based on recent check-ins.",
      },
      {
        title: "Audio and journal",
        text: "A music and audio player with sophrology sessions, and a private journal for writing things down.",
      },
      {
        title: "Community and support",
        text: "A route into the founder community, sponsorship and premium tiers, in-app help and issue reporting.",
      },
      {
        title: "Account and privacy",
        text: "Biometric lock, notification settings, data and privacy controls and account deletion.",
      },
    ],
    engineering: [
      "Layered structure: a data layer (API client, models), a presentation layer for screens and a core layer for shared helpers.",
      "Authentication with access and refresh tokens, handled by a typed API client built on Dio.",
      "Charts with fl_chart, audio with just_audio, push notifications through Firebase Cloud Messaging.",
    ],
    stats: [
      { value: "97", label: "Dart source files" },
      { value: "58", label: "Screens and views" },
      { value: "30+", label: "API endpoints used" },
    ],
    stack: ["Flutter", "Dart", "Provider", "Firebase Messaging", "fl_chart"],
    links: [],
    featured: false,
  },
  {
    slug: "trabajohub",
    name: "TrabajoHub",
    kind: "Healthcare staffing platform",
    category: "Full-stack",
    image: "/images/projects/trabajohub.jpg",
    gallery: blank(2),
    summary:
      "A healthcare staffing platform with a Flutter nurse app, a facility and admin dashboard, a marketing site and a Node.js API behind them.",
    overview: [
      "TrabajoHub connects healthcare professionals, such as nurses and caregivers, with hospitals, care centres and agencies that need to fill shifts. Professionals find and claim shifts on their phone; facilities and administrators manage staff, shifts, credentials and billing from the web.",
      "I built all four parts: the nurse mobile app, the admin and facility dashboard, the public website and the API that connects them.",
    ],
    role: "Built the mobile app, web dashboard, website and API.",
    platforms: ["iOS", "Android", "Web"],
    availability: "",
    features: [
      {
        title: "Shift marketplace",
        text: "Professionals browse open shifts on a list or map, claim them, and manage their own schedule in a calendar.",
      },
      {
        title: "Credential management",
        text: "Licences and documents are uploaded and reviewed by admins, with approved, rejected and expired states.",
      },
      {
        title: "Verified visits",
        text: "Check-in and check-out with location checks against the visit address, and a review path for flagged or overridden visits.",
      },
      {
        title: "Facility and admin dashboard",
        text: "Manage users, facilities, shifts, cases, visits, credentials, bills and support tickets, with an audit trail.",
      },
      {
        title: "Messaging and notifications",
        text: "In-app messaging, plus push, email and SMS notifications.",
      },
      {
        title: "Billing",
        text: "Invoices, payouts and a wallet, built on Stripe.",
      },
    ],
    engineering: [
      "Shift and visit workflows modelled as explicit states (open, booked, in progress, completed and more), with the API rejecting any change that skips a step.",
      "Double-booking protection: accepting a shift runs in a database transaction that refuses it if the nurse already has an overlapping shift.",
      "Location-verified visits use a configurable geofence radius, with every action recorded in audit logs.",
      "Five user roles with role guards, JWT access and refresh tokens and optional two-factor sign-in.",
      "Documents stored in cloud object storage and served through signed URLs.",
    ],
    stats: [
      { value: "27", label: "Data models" },
      { value: "14", label: "API modules" },
      { value: "100+", label: "Documented API operations" },
      { value: "18", label: "Mobile screens" },
    ],
    stack: ["Flutter", "Riverpod", "Next.js", "Node.js", "Express", "PostgreSQL", "Prisma", "Stripe"],
    links: [
      { label: "Visit trabajohub.com", href: "https://trabajohub.com" },
      { label: "Open the web app", href: "https://app.trabajohub.com" },
    ],
    featured: true,
  },
  {
    slug: "cleansera",
    name: "CleanSera",
    kind: "SaaS for cleaning businesses",
    category: "Full-stack",
    image: "",
    gallery: blank(2),
    summary:
      "A multi-tenant SaaS for cleaning companies: branded booking, smart dispatch, recurring schedules, payroll and a cleaner app, sold as a flat subscription with no commission.",
    overview: [
      "CleanSera gives a cleaning business everything it needs to run on one platform: a booking site under its own brand, a dashboard for scheduling and dispatch, and a mobile app for its cleaners. Customer payments go straight to the business through Stripe Connect, and the business pays a flat subscription instead of a commission.",
      "I designed and built the whole product: the API, the web dashboard with its storefront and customer portal, and the cleaner app.",
    ],
    role: "Designed and built the whole product.",
    platforms: ["Web", "iOS", "Android"],
    availability: "",
    features: [
      {
        title: "Branded booking and storefront",
        text: "An embeddable booking widget, a branded storefront on a subdomain or custom domain, and a customer portal.",
      },
      {
        title: "Scheduling and dispatch",
        text: "A calendar, assignment conflict checks, and auto-assign that ranks cleaners by distance and workload.",
      },
      {
        title: "Recurring care plans",
        text: "Recurring schedules with frequency discounts, deposits and cancellation policies, charged automatically.",
      },
      {
        title: "Running the business",
        text: "Customers, services and add-ons, checklists, reviews, coupons and gift cards, payroll, inventory and compliance tracking.",
      },
      {
        title: "Invoicing and payments",
        text: "Stripe Connect payments to the business's own account, VAT-aware invoices with gapless numbering, and a UBL export.",
      },
      {
        title: "Cleaner mobile app",
        text: "Jobs, availability, calendar sync, documents, messages and earnings, with on-my-way and check-in steps, offline queueing and push notifications.",
      },
    ],
    engineering: [
      "Multi-tenancy on a shared database: every request resolves its business and membership, and cross-tenant tests guard payroll and reviews.",
      "Custom domains verified by DNS record, with on-demand TLS certificates issued for verified domains only.",
      "Bookings run through a state machine with locking, so two people cannot take the same slot.",
      "Stripe Connect onboarding and webhooks; payments go to the business as merchant of record, and the platform fee defaults to zero.",
      "Subscription plans with feature flags and a trial, background workers for deposits and recurring jobs, and a CI pipeline that runs tests and builds.",
    ],
    stats: [
      { value: "55", label: "Data models" },
      { value: "38", label: "API modules" },
      { value: "200+", label: "API routes" },
      { value: "64", label: "Backend test files" },
    ],
    stack: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Flutter", "Stripe Connect", "Redis"],
    links: [{ label: "Visit cleansera.netlify.app", href: "https://cleansera.netlify.app" }],
    featured: true,
  },
  {
    slug: "migrantifly",
    name: "Migrantifly",
    kind: "Immigration client portal",
    category: "Full-stack",
    image: "",
    gallery: blank(2),
    summary:
      "A client portal and marketing site for a New Zealand immigration advisory firm, covering consultations, visa applications, documents, payments and messaging.",
    overview: [
      "Migrantifly takes an immigration advisory firm's process online. Prospective clients book and pay for a consultation, set up an account, and then follow their visa application through each stage, uploading documents and talking to their adviser along the way.",
      "I built the Next.js website and portal and the Express API behind it, including the admin and adviser tools the firm uses to run applications.",
    ],
    role: "Built the portal, website and API.",
    platforms: ["Web"],
    availability: "",
    features: [
      {
        title: "Consultation booking",
        text: "Public booking with slot holds and payment, then a secure link to set up a client account.",
      },
      {
        title: "Application tracking",
        text: "Visa applications move through defined stages, from consultation to decision, with progress shown to the client.",
      },
      {
        title: "Document collection",
        text: "Clients upload required documents; advisers review each one as approved, rejected or under review.",
      },
      {
        title: "Messaging and reminders",
        text: "Real-time messages per application, notifications, and deadline reminders by email and SMS.",
      },
      {
        title: "Payments and invoices",
        text: "Deposits, final and additional payments and refunds through Stripe, with PDF invoices.",
      },
      {
        title: "Admin and adviser tools",
        text: "Manage applications, consultations, documents, users, services, payments and the blog.",
      },
    ],
    engineering: [
      "Three roles (client, adviser, admin) enforced by middleware, with an audit log of changes.",
      "Consultation slots are held with a database TTL index; a scheduled job releases unpaid slots.",
      "Stripe webhooks verify signatures against the raw request body.",
      "Real-time updates over WebSockets, with rooms per application.",
      "Documents stored in Cloudinary and served through private download links; API documented with Swagger.",
    ],
    stats: [
      { value: "13", label: "Data models" },
      { value: "70+", label: "API endpoints" },
      { value: "34", label: "Pages" },
    ],
    stack: ["Next.js", "React", "Node.js", "Express", "MongoDB", "Stripe", "Cloudinary"],
    links: [{ label: "Visit migrantifly.com", href: "https://migrantifly.com" }],
    featured: false,
  },
  {
    slug: "dryva",
    name: "DRYVA",
    kind: "Logistics operations platform",
    category: "Full-stack",
    image: "",
    gallery: blank(2),
    summary:
      "An operations dashboard and API for a trucking, haulage and warehousing company: orders, inventory, cycle counts and a transport loading board.",
    overview: [
      "DRYVA brings a logistics company's day-to-day operations into one system. Warehouse staff manage stock, transport teams match loads with trucks and drivers, and finance and admins track orders and documents. Customers can follow a shipment with a public tracking link.",
      "I built the NestJS API and the Next.js operations dashboard.",
    ],
    role: "Built the API and the operations dashboard.",
    platforms: ["Web"],
    availability: "",
    features: [
      {
        title: "Orders",
        text: "An order lifecycle from pending to delivered, with stock issued when an order is packed.",
      },
      {
        title: "Warehouse and inventory",
        text: "Products, multiple warehouses, goods receipts, stock movements and cycle counts that reconcile against the system.",
      },
      {
        title: "Transport and loading board",
        text: "Trucks, vessels and drivers, with loads matched to the right asset for road, ocean, air or rail.",
      },
      {
        title: "Tracking and documents",
        text: "A public shipment tracking page, document management and cold-chain temperature logs.",
      },
    ],
    engineering: [
      "Anything that changes stock (receipts, packing, cycle-count reconciliation) runs in a database transaction, so the movement ledger and quantities never disagree.",
      "Order statuses follow a transition map that rejects illegal moves.",
      "Five roles, applied per endpoint: admin, warehouse staff, transport operations, finance and client.",
      "The dashboard is driven by a resource registry, so adding a new module means adding one configuration entry.",
      "Public tracking is rate limited per IP.",
    ],
    stats: [
      { value: "19", label: "Data models" },
      { value: "75+", label: "API routes" },
      { value: "26", label: "Dashboard resources" },
    ],
    stack: ["NestJS", "TypeScript", "Prisma", "MongoDB", "Next.js", "Tailwind CSS"],
    links: [{ label: "Open the dashboard", href: "https://dryvahub.netlify.app" }],
    featured: false,
  },
  {
    slug: "afro-flavours",
    name: "Afro Flavours",
    kind: "Restaurant website and ordering",
    category: "Full-stack",
    image: "",
    gallery: blank(2),
    summary:
      "A website and API for a West African restaurant and grocery in Auckland: table bookings, online ordering, catering requests, events and an admin dashboard.",
    overview: [
      "Afro Flavours needed one place for guests to book a table, order food and groceries, request catering and find out what is on. Staff needed an easy way to manage all of it without touching code.",
      "I built the Next.js website and the Express API, including the admin dashboard the team uses day to day.",
    ],
    role: "Built the website, admin dashboard and API.",
    platforms: ["Web"],
    availability: "",
    features: [
      {
        title: "Bookings",
        text: "Dine-in, event and African-experience bookings with live availability, double-booking checks and special-hours overrides.",
      },
      {
        title: "Menu and online shop",
        text: "Restaurant menu and groceries with a cart, checkout for delivery or pickup, and a tracking page for each order.",
      },
      {
        title: "Catering",
        text: "Catering requests with file attachments, handled from the admin dashboard.",
      },
      {
        title: "Events, reviews and gallery",
        text: "Events, customer reviews, a photo gallery, a newsletter and a contact form.",
      },
      {
        title: "Admin dashboard",
        text: "Manage bookings, orders, payments, menu, products, events, messages, reviews and site details, with exports.",
      },
    ],
    engineering: [
      "Order numbers come from an atomic counter, and every status change adds an entry to the order's timeline.",
      "Admin routes sit behind a JWT guard; the API is rate limited and validates every request.",
      "Stripe payment intents and webhooks for bookings and catering, with refunds from the admin side.",
      "Transactional email through Resend and image storage on Cloudinary.",
    ],
    stats: [
      { value: "17", label: "Data models" },
      { value: "100", label: "API endpoints" },
      { value: "35", label: "Pages" },
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "Stripe", "Tailwind CSS"],
    links: [{ label: "Visit afroflavours.co.nz", href: "https://afroflavours.co.nz" }],
    featured: false,
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);

export const skills = [
  { group: "Mobile", items: ["Flutter", "Dart"] },
  { group: "Web", items: ["Next.js", "React", "Tailwind CSS"] },
  { group: "Backend", items: ["Node.js", "Express", "NestJS", "Prisma", "MongoDB"] },
];

// Home and About "My Tools" section: one tile per tool with a short
// descriptor. `icon` keys into the brand-icon map in SkillsSection.
export const tools = [
  { name: "Flutter", icon: "flutter", note: "Cross-platform Mobile Apps" },
  { name: "Dart", icon: "dart", note: "Mobile App Language" },
  { name: "Next.js", icon: "nextjs", note: "Web Apps and Dashboards" },
  { name: "React", icon: "react", note: "Interactive Interfaces" },
  { name: "Tailwind CSS", icon: "tailwind", note: "Responsive Styling" },
  { name: "Node.js", icon: "nodejs", note: "Server-side JavaScript" },
  { name: "Express", icon: "express", note: "REST APIs" },
  { name: "NestJS", icon: "nestjs", note: "Structured Backends" },
  { name: "Prisma", icon: "prisma", note: "Database Access" },
  { name: "MongoDB", icon: "mongodb", note: "Document Database" },
  { name: "PostgreSQL", icon: "postgresql", note: "Relational Database" },
  { name: "Firebase", icon: "firebase", note: "Push Notifications and Services" },
];

// Home page "services" cards. Drop a photo at the `image` path (in
// public/images/services) and it replaces the drawn illustration; until the
// file exists the card shows the illustration named by `icon`.
export const services = [
  {
    title: "Mobile apps",
    icon: "mobile",
    description: "Flutter apps for iOS and Android, built against a real backend from the first screen.",
    stack: ["Flutter", "Dart"],
    image: "/images/services/mobile-apps.jpg",
  },
  {
    title: "Web apps and dashboards",
    icon: "web",
    description: "Customer portals, admin dashboards and marketing sites that load fast and read well on a phone.",
    stack: ["Next.js", "React", "Tailwind CSS"],
    image: "/images/services/web-apps.jpg",
  },
  {
    title: "Backend and APIs",
    icon: "backend",
    description: "Clear data models, authentication, payments and the integrations your product depends on.",
    stack: ["Node.js", "NestJS", "Prisma", "MongoDB"],
    image: "/images/services/backend-apis.jpg",
  },
  {
    title: "Technical contracting",
    icon: "team",
    description: "I join your team and repo, take a module or feature, and ship it using your process.",
    stack: ["Code review", "Handover docs"],
    image: "/images/services/contracting.jpg",
  },
];

// Ways of working together. Add pricing here later if you want it shown.
export const engagements = [
  {
    title: "Fixed-scope project",
    description: "We agree the scope, timeline and deliverables up front, then I build the product end to end.",
    fit: "New products and MVPs",
  },
  {
    title: "Monthly retainer",
    description: "A set amount of development time each month for features, fixes and upkeep.",
    fit: "Live products that keep evolving",
  },
  {
    title: "Embedded contractor",
    description: "I work inside your team, on your tickets and your repo, for as long as you need.",
    fit: "Teams that need extra hands",
  },
];

// Add client quotes here and the section appears on the home page.
// Shape: { quote: "", name: "", role: "", avatar: "" }
export const testimonials = [];
