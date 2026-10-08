// Single source of truth for the portfolio. Edit this file to add, remove
// or rewrite projects. Check each client project is OK to show publicly.
//
// Images: put files in public/images/projects and set the path, e.g.
//   image: "/images/projects/cleansera.jpg"
//   gallery: ["/images/projects/cleansera-1.jpg", ...]
// Empty strings render a blank placeholder until you add the real files.
const blank = (n) => Array.from({ length: n }, () => "");

export const projects = [
  {
    slug: "cleansera",
    name: "CleanSera",
    kind: "SaaS platform",
    category: "Full-stack",
    year: "",
    image: "",
    gallery: blank(2),
    summary:
      "Multi-tenant SaaS for cleaning businesses: scheduling, dispatch and a branded booking site, sold as a flat subscription with no marketplace commission.",
    role: "Designed and built the whole product.",
    highlights: [
      "Business dashboard, public marketing site and cleaner mobile app",
      "Subscription pricing with job payments going straight to the business via Stripe Connect",
      "Per-tenant branding and booking flows",
    ],
    stack: ["Next.js", "Node.js", "Flutter", "Stripe Connect", "Tailwind CSS"],
    links: [
      { label: "Marketing site code", href: "https://github.com/olumuyiwaa/cleansera_sass_website" },
      { label: "Dashboard code", href: "https://github.com/olumuyiwaa/cleansera_sass_frontend" },
      { label: "API code", href: "https://github.com/olumuyiwaa/cleansera_sass" },
    ],
    featured: true,
  },
  {
    slug: "trabajhub",
    name: "TrabajHub",
    kind: "Healthcare staffing platform",
    category: "Full-stack",
    image: "",
    gallery: blank(2),
    summary:
      "Multi-platform healthcare staffing product connecting nurses with shifts, with an admin dashboard for the operations team.",
    role: "Full-stack: mobile, web admin and backend.",
    highlights: [
      "Flutter nurse app",
      "Next.js admin dashboard",
      "Node.js and Prisma backend",
    ],
    stack: ["Flutter", "Next.js", "Node.js", "Prisma"],
    links: [],
    featured: true,
  },
  {
    slug: "citiview-estate",
    name: "Citiview Estate",
    kind: "Estate management",
    category: "Full-stack",
    image: "",
    gallery: blank(2),
    summary:
      "Estate management platform for residents and administrators, shipped as a Flutter app (Corvanta) plus a Next.js admin dashboard.",
    role: "Full-stack: mobile app and admin dashboard.",
    highlights: ["Flutter resident app (Corvanta)", "Next.js admin dashboard"],
    stack: ["Flutter", "Next.js"],
    links: [],
    featured: true,
  },
  {
    slug: "dryva",
    name: "DRYVA",
    kind: "Logistics backend",
    category: "Backend",
    image: "",
    gallery: blank(2),
    summary:
      "Backend for a trucking, haulage and warehousing company covering orders, warehouse inventory and a transport loading board.",
    role: "Backend design and implementation.",
    highlights: [
      "Order management",
      "Warehouse and inventory",
      "Transport and loading board",
    ],
    stack: ["NestJS", "Prisma"],
    links: [],
    featured: true,
  },
  {
    slug: "afro-flavours",
    name: "Afro Flavours",
    kind: "Restaurant backend",
    category: "Backend",
    image: "",
    gallery: blank(2),
    summary:
      "Backend for a restaurant site handling table bookings, catering requests, the menu, cash-on-delivery ordering, events, reviews and contact messages.",
    role: "Backend design and implementation.",
    highlights: ["Bookings and catering", "Menu and COD ordering", "Events, reviews and contact"],
    stack: ["NestJS", "Prisma", "MongoDB"],
    links: [{ label: "afroflavours.co.nz", href: "https://afroflavours.co.nz" }],
    featured: false,
  },
  {
    slug: "migrantifly",
    name: "Migrantifly",
    kind: "Web portal",
    category: "Web",
    image: "",
    gallery: blank(2),
    summary:
      "Immigration-related client portal with dashboards for documents, profile and transactions.",
    role: "Frontend build and deployment.",
    highlights: ["Documents, profile and transactions dashboards", "Deployed on Render"],
    stack: ["Next.js", "Render"],
    links: [],
    featured: false,
  },
  {
    slug: "et-management-partners",
    name: "E&T Management Partners",
    kind: "Marketing site",
    category: "Web",
    image: "",
    gallery: blank(2),
    summary: "Marketing website for E&T Management Partners Limited.",
    role: "Design and build.",
    highlights: ["Responsive marketing site"],
    stack: ["Next.js", "Tailwind CSS"],
    links: [],
    featured: false,
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);

export const skills = [
  { group: "Mobile", items: ["Flutter", "Dart"] },
  { group: "Web", items: ["Next.js", "React", "Tailwind CSS"] },
  { group: "Backend", items: ["Node.js", "Express", "NestJS", "Prisma", "MongoDB"] },
  { group: "Payments and ops", items: ["Stripe Connect", "Render"] },
];

// Home page "services" cards. Set `image` to a path in public/images/services;
// until then the card shows the line icon named by `icon`.
export const services = [
  {
    title: "Mobile apps",
    icon: "mobile",
    description: "Flutter apps for iOS and Android, built against a real backend from the first screen.",
    stack: ["Flutter", "Dart"],
    image: "",
  },
  {
    title: "Web apps and dashboards",
    icon: "web",
    description: "Customer portals, admin dashboards and marketing sites that load fast and read well on a phone.",
    stack: ["Next.js", "React", "Tailwind CSS"],
    image: "",
  },
  {
    title: "Backend and APIs",
    icon: "backend",
    description: "Clear data models, authentication, payments and the integrations your product depends on.",
    stack: ["Node.js", "NestJS", "Prisma", "MongoDB"],
    image: "",
  },
  {
    title: "Technical contracting",
    icon: "team",
    description: "I join your team and repo, take a module or feature, and ship it using your process.",
    stack: ["Code review", "Handover docs"],
    image: "",
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
