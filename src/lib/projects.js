// Single source of truth for the portfolio. Edit this file to add, remove
// or rewrite projects. Check each client project is OK to show publicly.
export const projects = [
  {
    slug: "cleansera",
    name: "CleanSera",
    kind: "SaaS platform",
    year: "",
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
