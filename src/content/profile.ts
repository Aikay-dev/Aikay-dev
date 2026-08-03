export const profile = {
  name: "Emmanuel Esekhaigbe",
  shortName: "Emmanuel",
  initials: "EE",
  role: "Senior full-stack engineer",
  location: "Warsaw, Poland",
  timezone: "Europe/Warsaw",
  email: "emmanese2020@gmail.com",
  githubUser: "Aikay-dev",

  /* Hero. Two lines, set large — the claim has to survive being the biggest
     thing on the page, so it makes a real distinction rather than a boast. */
  headline: ["I build whole products,", "not pieces of them."],
  lede: "Six years of full-stack engineering, based in Warsaw. Marketplaces, client sites and AI systems — designed, built and shipped end to end, usually by me alone.",
  availability: "Available for client work",

  intro: [
    "I take products from an empty repository to something real people use. Not a slice of the frontend, not a ticket queue — the whole thing: the data model, the services behind it, the interface, the emails, the deployment, and the 2 a.m. production bug.",
    "Six years in, most of that has been JavaScript and TypeScript across React and Next.js, with Python — FastAPI, SQLAlchemy, pandas — doing the work behind it. At Biddy I built event-driven microservices talking over NATS.io, centralised authentication behind Keycloak, modelled the data in PostgreSQL through Prisma, and shipped the lot with Docker and Kubernetes. Functionality alone was never the bar: observability, security and staying up are part of the job, and I was the one on call when they weren't.",
    "Plenty of it has been built alone. Biddy went from zero to more than 10,000 users with me owning every layer. A marketplace for a Lagos client shipped in phases across ten weeks. A tuition academy in Bradford went from a paper flyer to a live site in seven days. That range is deliberate — I'd rather understand a product completely than specialise in one corner of it.",
    "Lately most of my attention goes to two things: two-sided marketplaces, where the hard problem is trust rather than code, and AI systems that run against real inputs instead of a demo script.",
  ],

  education: [
    {
      qualification: "MSc, Management & Production Engineering",
      institution: "Warsaw University of Technology",
      period: "Feb 2026 — present",
    },
    {
      qualification: "BSc, Mechanical Engineering — First-Class Honours",
      institution: "Landmark University, Nigeria",
      period: "2018 — 2022",
    },
  ],

  languages: [
    { name: "English", level: "Fluent (C1+)" },
    { name: "Polish", level: "Beginner (A1), actively learning" },
  ],

  services: [
    {
      title: "Marketplaces & platforms",
      body: "Two-sided products where the real problem is trust, not code. Roles and permissions, moderation queues, reviews, search that survives a hundred thousand rows, and a revenue gate designed in from day one rather than bolted on later. Event-driven services and centralised auth when the thing is big enough to need them.",
      proof: "Biddy · Fixam",
    },
    {
      title: "Sites that earn their keep",
      body: "Static-rendered marketing sites that load instantly on a bad connection and actually rank. Real content architecture, structured data, and forms that deliver — verified against the served HTML, not just the browser.",
      proof: "TestPortal Academy · Vision Speaks · Tee & Tee",
    },
    {
      title: "AI systems in production",
      body: "Language models wired into things that run unattended against messy real input — live audio, market data, user documents. The interesting work is everything around the model: capture, validation, fallbacks, and cost.",
      proof: "AI Interviewer · Polymarket scanner",
    },
  ],

  /* Chronological by start date. The work section carries the argument; this
     exists so a reader can place it in time. */
  background: [
    {
      role: "Independent engineer",
      org: "Client work — Nigeria, UK, remote",
      period: "2025 — present",
      note: "Marketplaces, marketing sites and booking systems, delivered end to end.",
    },
    {
      role: "Lead web developer",
      org: "Vision Speaks",
      period: "Dec 2025 — Mar 2026",
      note: "Front-end and back-end delivery for a UK/Nigeria media company, in React, TypeScript and Node.js.",
    },
    {
      role: "Lead web developer",
      org: "Laura Hope Care & Rescue Foundation",
      period: "Sep 2025 — Dec 2025",
      note: "Sole engineer on a nonprofit's platform, with full ownership of technical decisions and production maintenance.",
    },
    {
      role: "Lead founding developer",
      org: "Biddy",
      period: "Nov 2023 — Jan 2026",
      note: "Scaled an auction-driven marketplace past 10,000 users. Event-driven microservices over NATS.io, Keycloak SSO, PostgreSQL via Prisma, Docker and Kubernetes.",
    },
    {
      role: "Senior full-stack engineer",
      org: "MarketForce",
      period: "Feb 2022 — Aug 2024",
      note: "Production React, Node.js and Python applications in a senior team, with test-driven delivery in Jest and Cypress.",
    },
    {
      role: "Web development instructor",
      org: "Innovate Space",
      period: "2022 — 2023",
      note: "Taught Python, JavaScript, HTML, CSS and React hands-on.",
    },
    {
      role: "Full-stack developer",
      org: "Remita / SystemSpecs",
      period: "2021 — 2022",
      note: "Full-stack features for a fintech and banking platform, integrating REST APIs and cloud services under regulation.",
    },
    {
      role: "Backend developer",
      org: "Chowdeck",
      period: "Mar 2021 — Nov 2021",
      note: "Backend services in Python and Node.js for a food-delivery platform.",
    },
  ],

  socials: [
    { label: "GitHub", href: "https://github.com/Aikay-dev", handle: "@Aikay-dev" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/emmanuel-esekhaigbe-3b9046241/",
      handle: "Emmanuel Esekhaigbe",
    },
    { label: "X", href: "https://twitter.com/general_ik", handle: "@general_ik" },
  ],

  nav: [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type Profile = typeof profile;
