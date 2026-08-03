export const profile = {
  name: "Emmanuel Esekhaigbe",
  shortName: "Emmanuel",
  initials: "EE",
  role: "Full-stack engineer",
  location: "Warsaw, Poland",
  timezone: "Europe/Warsaw",
  email: "emmanese2020@gmail.com",
  githubUser: "Aikay-dev",

  /* Hero. Two lines, set large — the claim has to survive being the biggest
     thing on the page, so it makes a real distinction rather than a boast. */
  headline: ["I build whole products,", "not pieces of them."],
  lede: "Full-stack engineer in Warsaw. Marketplaces, client sites and AI systems — designed, built and shipped end to end, usually by me alone.",
  availability: "Available for client work",

  intro: [
    "I take products from an empty repository to something real people use. Not a slice of the frontend, not a ticket queue — the whole thing: the data model, the interface, the emails, the deployment, and the 2 a.m. production bug.",
    "Most of what I've built has been built alone. Biddy went from zero to more than 10,000 users with me owning every layer of it. A marketplace for a Lagos client shipped in phases across ten weeks. A tuition academy in Bradford went from a paper flyer to a live site in a week. That range is deliberate: I'd rather understand a product completely than specialise in one corner of it.",
    "Lately most of my attention goes to two things — two-sided marketplaces, where the hard problem is trust rather than code, and AI systems that run against real inputs instead of a demo script.",
  ],

  education: [
    {
      qualification: "MSc, Management and Production Engineering",
      institution: "Warsaw University of Technology",
      period: "2023 — 2026",
    },
    {
      qualification: "BSc (Hons), Mechanical Engineering — First Class",
      institution: "Landmark University, Nigeria",
      period: "2017 — 2022",
    },
  ],

  languages: [
    { name: "English", level: "Native" },
    { name: "Polish", level: "Conversational" },
  ],

  services: [
    {
      title: "Marketplaces & platforms",
      body: "Two-sided products where the real problem is trust, not code. Roles and permissions, moderation queues, reviews, search that survives a hundred thousand rows, and a revenue gate designed in from day one rather than bolted on later.",
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

  /* Deliberately short. The work section carries the argument; this exists so
     a reader can place the work in time. */
  background: [
    {
      role: "Independent engineer",
      org: "Client work — Nigeria, UK, remote",
      period: "2025 — present",
      note: "Marketplaces, marketing sites and internal tools, delivered end to end.",
    },
    {
      role: "Lead full-stack engineer",
      org: "Vision Speaks",
      period: "Dec 2025 — present",
      note: "Technical delivery for a UK/Nigeria multimedia and IT-services company.",
    },
    {
      role: "Lead founding developer",
      org: "Biddy",
      period: "2023 — Jan 2025",
      note: "Built and scaled a Nigerian marketplace past 10,000 users, owning every layer.",
    },
    {
      role: "Web developer",
      org: "Start Innovation Hub",
      period: "2024",
      note: "Production web projects across the hub's startup portfolio.",
    },
    {
      role: "Web development instructor",
      org: "Innovate Space",
      period: "2023 — 2024",
      note: "Taught practical web development to 50+ developers.",
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
