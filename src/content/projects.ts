export type ProjectKind = "client" | "personal";

export type ProjectStatus = "live" | "shipped" | "shelved" | "offline";

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  /** Full-bleed images break the grid; inset ones sit inside the measure. */
  bleed?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  kind: ProjectKind;
  /** Omitted where the client asked to stay unnamed. */
  client?: string;
  discipline: string;
  role: string;
  year: string;
  status: ProjectStatus;
  tagline: string;
  summary: string;
  problem: string;
  /** The decisions worth explaining — not a feature list. */
  approach: { heading: string; body: string }[];
  outcomes: string[];
  stack: string[];
  links: { live?: string; repo?: string };
  /** Per-project brand accent, sampled from the real thing. */
  accent: string;
  cover: string;
  gallery: GalleryImage[];
};

export const projects: Project[] = [
  /* ---------------------------------------------------------------- FIXAM */
  {
    slug: "fixam",
    title: "Fixam",
    kind: "client",
    client: "A Lagos-based founder",
    discipline: "Marketplace",
    role: "Sole engineer — architecture, design, build, deployment",
    year: "2026",
    status: "live",
    tagline: "Nigeria's artisan and professional marketplace",
    summary:
      "A two-sided marketplace connecting Nigerian customers with vetted plumbers, electricians, carpenters — and, later, lawyers, architects and developers. Built end to end over ten weeks against a ₦1,000,000 Stage One proposal, from taxonomy and data model through to admin tooling and local SEO.",
    problem:
      "Finding a tradesperson in Nigeria runs on word of mouth, and word of mouth breaks the moment you move to a new area. Artisans go quiet, arrive late, or vanish mid-job with no accountability, and without competing quotes customers routinely overpay. On the other side, skilled artisans are invisible to anyone outside their existing network: almost all have a smartphone and WhatsApp, almost none have any digital presence or a way to accumulate a reputation. Every existing platform puts friction at first contact — an app download, a callback fee, a managed onboarding call — which is exactly the moment you cannot afford friction.",
    approach: [
      {
        heading: "The gate is the contact, not the profile",
        body: "Profiles, ratings and reviews are wide open to browse. That openness is what pulls customers in, builds trust, and feeds local SEO — gating it would have killed all three. The single controlled moment is the contact itself: a customer tapping through to WhatsApp *is* a lead, and every one of those taps is silently logged from day one even though contact is free. It means Stage Two monetisation is a switch rather than a rebuild — the meter turns on at a gate that already exists, with months of real lead volume behind it.",
      },
      {
        heading: "A taxonomy that could grow without orphaning URLs",
        body: "The directory launched with 82 manual trades across 15 groups and later opened up to professionals — lawyers, accountants, architects, developers — reaching 99 leaves across 17 groups. People hire an accountant through the same motion as a plumber: find someone nearby, check who has used them, call. Adding them also stops Fixam being a one-visit site. The expansion renamed 'Structural Engineer' to 'Civil & Structural Engineer' but deliberately left its slug untouched, because renaming it would have orphaned every existing profile and every indexed URL pointing at it.",
      },
      {
        heading: "An admin page that rendered 228 images at once",
        body: "Once the directory held real data, the admin list rendered 50 profiles with up to six work photos each — 228 images on a single page, every one optimised on demand. It loaded as a wall of grey boxes and looked broken. Work photos now appear only while a decision is actually outstanding: they're essential for judging a submission and pure weight afterwards, so the browsing tabs get an avatar and a link instead. That took the approved tab from 228 images to 22, and pagination went in at the same time.",
      },
      {
        heading: "A font bug that made the whole site look like a book",
        body: "The site read like a document rather than a marketplace, and one line explained most of it: the scaffold shipped `--font-sans: var(--font-sans)` in globals.css. Self-referential, so it resolved to nothing and every page fell back to the browser's default serif. Replaced with Archivo across weights 400–900 — a grotesque drawn for signage, which is the physical object this brand comes from: the hand-painted signboards outside every workshop in Lagos. One family rather than a display/body pair, because two similar-but-not-identical sans-serifs read as an accident.",
      },
      {
        heading: "Letting a customer become an artisan",
        body: "'List your services free' pointed at the signup page, which bounced anyone already signed in straight back — so for logged-in users the button appeared to do nothing. The real gap was larger: there was no path at all for an existing customer to become an artisan without creating a second account under a second email. Absurd for somebody who signed up to hire a plumber and happens to be an electrician. A single `/become-an-artisan` entry point now sits behind all 13 calls to action and handles four states — signed out, already an artisan, signed in but unverified, and signed-in customer.",
      },
    ],
    outcomes: [
      "Delivered and paid across three milestones against a ₦1,000,000 Stage One scope",
      "99 trade and profession categories across 17 groups, with location-aware local SEO pages and a generated sitemap",
      "Customer, artisan and admin roles with an email-allowlisted admin console and a moderation queue",
      "Lead logging live from launch, so Stage Two pay-per-lead can be switched on against real data",
    ],
    stack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS 4",
      "MongoDB",
      "Mongoose",
      "NextAuth v5",
      "Cloudinary",
      "React Email",
      "Radix UI",
      "Zod",
    ],
    links: {
      live: "https://fixam-kappa.vercel.app/",
      repo: "https://github.com/Aikay-dev/fixam",
    },
    accent: "#1c3d5a",
    cover: "/images/work/fixam/cover.webp",
    gallery: [
      {
        src: "/images/work/fixam/directory.webp",
        alt: "Fixam directory listing professionals filtered by trade and location",
        caption:
          "Browse by state, area and nearest bus stop — how people actually describe where they are in Lagos, rather than by postcode.",
        bleed: true,
      },
      {
        src: "/images/work/fixam/profile.webp",
        alt: "A professional's profile page showing rating, service area, portfolio photos and a gated contact panel",
        caption:
          "The whole architecture in one screen. Rating, experience, work photos and reviews are entirely open — that openness is what earns trust and feeds local SEO. The phone number is the single thing behind a sign-up, because that tap is the lead, and it has been logged since launch.",
      },
      {
        src: "/images/work/fixam/home.webp",
        alt: "The full Fixam homepage from hero through categories, how-it-works and featured professionals",
        caption:
          "The homepage end to end. A marketplace whose product is trusting a stranger cannot be text-only, so documentary photography of people mid-job carries the page.",
      },
      {
        src: "/images/work/fixam/mobile.webp",
        alt: "Fixam homepage rendered on a mobile viewport",
        caption:
          "Mobile-first in the literal sense: the entire audience arrives on a phone, often on metered data.",
      },
    ],
  },

  /* ------------------------------------------------- TESTPORTAL ACADEMY */
  {
    slug: "testportal-academy",
    title: "TestPortal Virtual Academy",
    kind: "client",
    client: "TestPortal Virtual Academy, Bradford",
    discipline: "Education",
    role: "Sole engineer — design, build, deployment",
    year: "2026",
    status: "live",
    tagline: "A UK STEM tuition academy, from paper flyer to live site",
    summary:
      "A UK-based online STEM tuition provider teaching Year 7 through GCSE and A-Level had a marketing flyer and no website. Ten static routes, an eleven-tutor team page, and a working enquiry pipeline, delivered in seven days under a signed ₦150,000 contract.",
    problem:
      "The academy was selling a considered, credential-heavy service — five curricula, exam-board-specific coverage, tutors with real subject specialisms — through a single JPEG flyer shared on WhatsApp. Parents researching tuition for their child had no way to check who would actually be teaching, what exam boards were covered, or how to book a trial. Everything that should have built confidence was invisible.",
    approach: [
      {
        heading: "Built to the crest, not the flyer",
        body: "The flyer suggested one brand; the academy's actual crest is navy, burgundy and gold with no green in it, and the name carries no hyphen. The site was built to the crest. Its Yoruba motto — *púpọ̀ nípa díẹ̀, kì í ṣe díẹ̀ nípa púpọ̀*, 'much about a little, not a little about much' — became a real structural idea, shaping the 'depth over coverage' value on the About page rather than sitting in the footer as decoration.",
      },
      {
        heading: "A crest that vanished on its own brand colour",
        body: "The crest's wordmark and motto are drawn in dark navy for a light surface, so on the site's navy sections they disappeared entirely — the client spotted it the day after launch. Fixed by mounting the crest on a cream surface everywhere it sits on dark: a cream plaque with a gold ring in the hero and on the 404, a cream circular chip in the footer. A logo that only works on one background is a constraint to design around, not a bug to argue with.",
      },
      {
        heading: "The enquiry form that silently dropped half its data",
        body: "The enquiry form has six subject checkboxes sharing the name `subjects`. EmailJS does not reliably collect repeated field names — one value would arrive, or none — so every multi-subject enquiry would have reached the client incomplete, with nothing in the UI to indicate it. Renaming the collected field to `subjects_list` fixed it. The kind of failure that never throws an error and only shows up as quiet lost business.",
      },
      {
        heading: "Keeping the contact page in the served HTML",
        body: "The form needed to read `?enquiry=trial` so a 'book a trial' button could preselect the right intent. The obvious tool, `useSearchParams`, would have forced the whole form to render client-side only, dropping the page out of the served HTML and out of search results. It reads the parameter from a ref on mount instead, so the page stays static. Every route was then verified against its actual served HTML rather than the browser view.",
      },
      {
        heading: "Two mirrored selfies",
        body: "Both photographs the director supplied were mirrored front-camera selfies — the classroom posters behind him and the year planner on the wall both read backwards. Flipped horizontally before use. A small thing, but a website is often the most formal artefact a business owns, and backwards text in the background undoes that in a glance.",
      },
    ],
    outcomes: [
      "Ten static routes shipped in seven days; build and lint clean, every route verified against its served HTML",
      "Eleven tutors published with photographs, subjects and levels, replacing a single flyer",
      "Enquiry pipeline live via EmailJS, with UK GDPR-driven privacy and terms pages — the academy handles children's data",
      "Canonical URLs, sitemap and JSON-LD written against the final domain so the switchover needs no code change",
    ],
    stack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS 4",
      "Framer Motion",
      "EmailJS",
      "Playfair Display + Inter",
      "Vercel",
    ],
    links: {
      live: "https://testportalva.org/",
      repo: "https://github.com/Aikay-dev/test-portal-academy",
    },
    accent: "#16244a",
    cover: "/images/work/testportal-academy/cover.webp",
    gallery: [
      {
        src: "/images/work/testportal-academy/home.webp",
        alt: "TestPortal Virtual Academy homepage with hero, trust statistics and learning pathway",
        caption:
          "The homepage walks the KS3 → GCSE → A-Level pathway as a timeline, because that progression is the thing a parent is actually buying.",
        bleed: true,
      },
      {
        src: "/images/work/testportal-academy/courses.webp",
        alt: "Courses page broken down by subject, level and exam board",
        caption:
          "The courses page is the SEO spine: every subject broken down by level and exam board, which is how parents search.",
      },
      {
        src: "/images/work/testportal-academy/director.webp",
        alt: "Meet the Director page with a portrait and welcome address",
        caption:
          "A dedicated director page. For a tuition business, who is teaching your child is the entire purchase decision.",
      },
      {
        src: "/images/work/testportal-academy/contact.webp",
        alt: "Contact page with enquiry form, contact panel and FAQ accordion",
        caption:
          "The enquiry form — the site's only interactive element, and the one that quietly dropped multi-subject selections until the field was renamed.",
      },
    ],
  },

  /* ---------------------------------------------------------------- BIDDY */
  {
    slug: "biddy",
    title: "Biddy",
    kind: "client",
    client: "Biddy",
    discipline: "Marketplace",
    role: "Lead founding developer",
    year: "Nov 2023 — Jan 2026",
    status: "live",
    tagline: "A Nigerian marketplace taken from zero to 10,000+ users",
    summary:
      "An auction-driven consumer marketplace covering electronics, fashion, vehicles, real estate and food, where sellers list, buyers check out through Paystack, and a seller tier system drives placement. Event-driven microservices behind it, and I owned architecture, frontend, backend, infrastructure and production support across roughly 1,500 commits.",
    problem:
      "Nigerian online commerce has a trust deficit at both ends: buyers can't tell a real seller from a fake listing, and sellers have no way to prove they're legitimate. Solving it needs a lot of unglamorous machinery working at once — identity, listing moderation, payments that clear locally, order tracking, returns, and a support channel — none of which is optional and none of which can be a placeholder once real money is moving.",
    approach: [
      {
        heading: "Payments and infrastructure chosen for where the users are",
        body: "Paystack rather than Stripe, because local card and bank-transfer coverage and roughly 1.5% + ₦100 fees are what actually work for Nigerian sellers. Deployment goes GitHub Actions → a container image on GHCR → SSH deploy onto a VPS, rather than a managed platform: predictable cost in a market where margins are thin, and no per-invocation surprises during a traffic spike.",
      },
      {
        heading: "A separate console for the people doing moderation",
        body: "Listing moderation is a different job from shopping, done by different people under different pressure, so it lives in a separate admin application on its own subdomain. Staff approve pending products to live, demote live products back to pending with a reason attached, manage accounts, and handle returns and orders. Signup is token-gated so only invited staff can register — the alternative is an admin panel one leaked password away from the catalogue.",
      },
      {
        heading: "Services that could fail independently",
        body: "Checkout, listings, notifications and moderation don't share a failure mode, so they don't share a process. They're separate services communicating over NATS.io, which means a notification backlog doesn't stall a checkout and a moderation deploy doesn't take the catalogue down. Authentication was centralised behind Keycloak rather than reimplemented per service — one place for sessions, roles and SSO, which is also the only sane way to keep the staff console and the storefront honest about who a user is.",
      },
      {
        heading: "Owning production, not just the pull request",
        body: "The part that changed how I work wasn't the architecture, it was being the person paged when the marketplace broke. Sentry for error tracking, Upstash Redis for rate limiting and caching, Pusher for realtime, a PWA layer for repeat mobile buyers. Every one of those went in because something failed first.",
      },
    ],
    outcomes: [
      "Grew past 10,000 users with millions of naira in transactions processed",
      "~1,500 commits across the marketplace and a separate token-gated admin console",
      "Event-driven services over NATS.io with Keycloak SSO across the platform",
      "Paystack checkout, order tracking, returns, reviews and live chat in production",
      "Containerised CI/CD from GitHub Actions through GHCR to a self-managed VPS",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Prisma",
      "NATS.io",
      "Keycloak",
      "Paystack",
      "AWS S3 + SES",
      "Upstash Redis",
      "Sentry",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
    ],
    links: { live: "https://www.biddy.ng/" },
    accent: "#0f7b6c",
    cover: "/images/work/biddy/cover.webp",
    gallery: [
      {
        src: "/images/work/biddy/home.webp",
        alt: "Biddy marketplace homepage showing product categories and live listings",
        caption:
          "The homepage carries live listings across every category — electronics through to real estate.",
        bleed: true,
      },
      {
        src: "/images/work/biddy/category.webp",
        alt: "Biddy category browse page with filters",
        caption: "Category browse with filtering, built to stay fast as the catalogue grew.",
      },
      {
        src: "/images/work/biddy/browse.webp",
        alt: "Biddy category index listing every product category on the marketplace",
        caption:
          "The full category index. A general marketplace lives or dies on whether people can find the one thing they came for.",
      },
    ],
  },

  /* -------------------------------------------------------- VISION SPEAKS */
  {
    slug: "vision-speaks",
    title: "Vision Speaks",
    kind: "client",
    client: "Visionspeaks Multimedia Ltd",
    discipline: "Corporate",
    role: "Lead web developer",
    year: "Dec 2025 — Mar 2026",
    status: "live",
    tagline: "CCTV, IT infrastructure and multimedia for a UK/Nigeria operator",
    summary:
      "A company doing three genuinely different things — CCTV and monitoring, IT infrastructure, and multimedia production — needed one site that made all three legible without reading as a directory listing. Built media-first, using their own archive.",
    problem:
      "Visionspeaks had years of real work sitting in folders: election coverage, event production, installation jobs. None of it was public. A services company that produces video for a living cannot present itself with stock photography without immediately undercutting its own pitch — but a media-heavy site is also the easiest kind to make slow.",
    approach: [
      {
        heading: "Their footage, not stock",
        body: "The hero runs their own video. Service pages pull from an archive of real shoots — election coverage, weddings, installations — rather than licensed imagery. For a production company the portfolio *is* the argument, so the site is structured to put it in front of you before any copy asks you to believe something.",
      },
      {
        heading: "Media-heavy without being slow",
        body: "Video backgrounds and large photo galleries are where sites like this normally fall apart. Everything is served through Next.js image optimisation with explicit sizing, the hero video is compressed and poster-framed so the first paint doesn't wait on it, and galleries load progressively rather than all at once.",
      },
    ],
    outcomes: [
      "Three distinct service lines presented as one coherent company",
      "Real project archive published across service pages and galleries",
      "Enquiries routed by office location through an EmailJS pipeline",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Framer Motion", "EmailJS"],
    links: {
      live: "https://www.visionspeakstech.com/",
      repo: "https://github.com/Aikay-dev/vision-speaks",
    },
    accent: "#b8342c",
    cover: "/images/work/vision-speaks/cover.webp",
    gallery: [
      {
        src: "/images/work/vision-speaks/home.webp",
        alt: "Vision Speaks homepage with a full-width video hero",
        caption: "The hero runs the company's own footage. For a production house, that is the pitch.",
        bleed: true,
      },
      {
        src: "/images/work/vision-speaks/services.webp",
        alt: "Vision Speaks services page covering CCTV, IT infrastructure and multimedia",
        caption:
          "Three service lines that share a client base but not much else, given equal structural weight.",
      },
    ],
  },

  /* --------------------------------------------------------- TEE & TEE */
  {
    slug: "tee-and-tee-resort",
    title: "Tee & Tee Resort",
    kind: "client",
    client: "Tee & Tee Resort, Nigeria",
    discipline: "Hospitality",
    role: "Contract web developer",
    year: "2025",
    status: "live",
    tagline: "Room booking and payments for a Nigerian resort",
    summary:
      "A hospitality site with a real reservation engine behind it: date-range availability checking, room selection, Paystack payment and transactional confirmation email. Delivered as a two-month contract.",
    problem:
      "The resort was taking bookings by phone and WhatsApp, which meant availability lived in someone's head and enquiries arriving overnight went unanswered until morning. A brochure site would not have fixed that; the booking had to complete on the site, take payment, and confirm itself.",
    approach: [
      {
        heading: "Availability before aesthetics",
        body: "The build started from the reservation flow, not the homepage. A date-range picker feeding a real availability check against persisted bookings, room-type selection, then Paystack for payment — the local processor guests actually recognise. Everything visual was arranged around that path rather than the other way round.",
      },
      {
        heading: "Confirmation as part of the product",
        body: "A booking that doesn't produce a confirmation email isn't finished, it's just a payment. Transactional emails are built as React components and sent through Resend, so the confirmation is versioned alongside the code that triggers it rather than living in a dashboard nobody opens.",
      },
    ],
    outcomes: [
      "End-to-end reservations: availability check → room selection → Paystack payment → confirmation email",
      "Offers and rooms manageable as data rather than hard-coded pages",
      "Sitemap, robots and Open Graph metadata shipped for search and social",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "Tailwind CSS",
      "Radix UI",
      "Paystack",
      "React Email + Resend",
      "Zod",
    ],
    links: { live: "https://www.teeandteeresort.com.ng/" },
    accent: "#9a6b2f",
    cover: "/images/work/tee-and-tee-resort/cover.webp",
    gallery: [
      {
        src: "/images/work/tee-and-tee-resort/home.webp",
        alt: "Tee & Tee Resort homepage",
        caption: "The homepage exists to get you into the booking flow, not to detain you.",
        bleed: true,
      },
      {
        src: "/images/work/tee-and-tee-resort/rooms.webp",
        alt: "Tee & Tee Resort rooms and availability page",
        caption: "Rooms and availability — the part of the site that actually earns money.",
      },
    ],
  },

  /* ------------------------------------------------------- LAURA HOPE */
  {
    slug: "laura-hope-foundation",
    title: "Laura Hope Foundation",
    kind: "client",
    client: "Laura Hope Care & Rescue Foundation",
    discipline: "Non-profit",
    role: "Lead web developer",
    year: "Sep 2025 — Dec 2025",
    status: "offline",
    tagline: "Publishing the fieldwork of a care and rescue charity",
    summary:
      "A charity running feeding, education, outreach and child-welfare programmes had over two hundred photographs of its own fieldwork and nowhere to put them. The site is built around that archive.",
    problem:
      "Small charities are asked to prove their work constantly, and their evidence is usually trapped in phone galleries and WhatsApp groups. The foundation had the documentation — a couple of hundred photographs from real outreach — but no way for a donor or partner to see any of it before deciding whether to trust them.",
    approach: [
      {
        heading: "The gallery is the argument",
        body: "Rather than a small photo strip under a wall of mission copy, the archive is the primary structure: over two hundred images organised into categories that map to the four programme pillars. A donor can see the work before being asked to read about it.",
      },
      {
        heading: "Built so non-technical staff can keep it current",
        body: "Programme content and gallery categories are structured as data rather than hand-written pages, so adding a new outreach set doesn't require touching layout code. A charity site that only its developer can update stops being updated.",
      },
    ],
    outcomes: [
      "200+ fieldwork photographs published in a categorised gallery",
      "Four programme pillars — feeding, education, outreach, child welfare — each with its own page",
      "Content structured so staff can extend it without a developer",
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS 4", "Framer Motion"],
    links: { repo: "https://github.com/Aikay-dev/laurahope" },
    accent: "#4c3f9e",
    cover: "/images/work/laura-hope-foundation/cover.webp",
    gallery: [
      {
        src: "/images/work/laura-hope-foundation/home.webp",
        alt: "Laura Hope Foundation homepage showing programme pillars",
        caption: "Four programme pillars, each carrying its own photography from the field.",
        bleed: true,
      },
      {
        src: "/images/work/laura-hope-foundation/gallery.webp",
        alt: "Laura Hope Foundation categorised photo gallery",
        caption:
          "The categorised archive. Two hundred-odd photographs that previously lived only in phone galleries.",
      },
    ],
  },

  /* -------------------------------------------------------- AI INTERVIEWER */
  {
    slug: "ai-interviewer",
    title: "AI Interviewer",
    kind: "personal",
    discipline: "Desktop / AI",
    role: "Personal project",
    year: "2026",
    status: "shipped",
    tagline: "A real-time interview assistant that screen-share can't see",
    summary:
      "A Windows desktop application that listens to a live interview, transcribes the interviewer with Whisper, works out which question was actually asked, and drafts a spoken-style answer from your CV and tone guide — in a window excluded from screen capture at the OS level.",
    problem:
      "Live transcription is the easy half. The hard part is that interviewers don't ask clean questions: they ramble, self-correct, stack three questions into one breath, and trail off. A naive pipeline that treats every sentence as a prompt produces a wall of answers to things nobody asked, arriving too late to be read.",
    approach: [
      {
        heading: "Question detection as its own stage",
        body: "Transcription and answering are separated by a detection stage that decides what the last genuinely unanswered question was — which is not the last sentence, and often not phrased as a question at all. That stage is the difference between a useful assistant and a live transcript with noise attached. There's also a manual override box, because the honest design assumption is that detection will sometimes be wrong.",
      },
      {
        heading: "Invisible to screen capture, by the OS not by a trick",
        body: "The window calls Windows' `SetWindowDisplayAffinity` with `WDA_EXCLUDEFROMCAPTURE`, so the compositor itself omits it from any capture stream. On Meet, Zoom, Teams or OBS it renders as a black rectangle while staying fully visible on the physical display. This is an OS-level guarantee rather than a heuristic that breaks when the conferencing app updates.",
      },
      {
        heading: "Local transcription, remote generation",
        body: "Whisper runs locally on the GPU — audio never leaves the machine, and local inference removes the network round-trip that would make transcription lag unusable. Only the detected question text goes out, to OpenRouter, which keeps the model swappable between Gemini Flash, Claude and GPT without touching the pipeline.",
      },
      {
        heading: "Answers in your voice, not the model's",
        body: "Generation is conditioned on three things: your parsed CV, a `tone.md` voice guide, and the pasted job description. Without the tone guide the output is recognisably model-shaped — balanced, hedged, slightly too fluent to be speech. The guide is what makes an answer sound like something a person would actually say out loud.",
      },
    ],
    outcomes: [
      "Live pipeline: audio capture → local Whisper → question detection → LLM → segmented answer panel",
      "OS-level capture exclusion verified against Meet, Zoom and Teams",
      "CV parsed from PDF; sessions exportable to text or PDF afterwards",
      "Model-agnostic through OpenRouter — Gemini, Claude, GPT and Llama all swap in by config",
    ],
    stack: [
      "Python 3.11",
      "PyQt6",
      "faster-whisper",
      "CUDA",
      "OpenRouter",
      "Gemini Flash",
      "pdfplumber",
      "ReportLab",
      "Win32 API",
    ],
    links: { repo: "https://github.com/Aikay-dev/ai-interviewer" },
    accent: "#5b45c9",
    cover: "/images/work/ai-interviewer/cover.webp",
    gallery: [
      {
        src: "/images/work/ai-interviewer/pipeline.webp",
        alt: "Diagram of the AI Interviewer pipeline from audio capture through Whisper and question detection to answer generation",
        caption:
          "The pipeline. Question detection sitting between transcription and generation is what makes the output usable.",
        bleed: true,
      },
    ],
  },

  /* ------------------------------------------------------------------ VOYA */
  {
    slug: "voya",
    title: "Voya",
    kind: "personal",
    discipline: "SaaS",
    role: "Personal project — shelved",
    year: "2026",
    status: "shelved",
    tagline: "TRC case management, made visible",
    summary:
      "A two-sided case-management product for Polish law firms handling Temporary Residence Card applications — an admin dashboard for the firm, a plain-language portal for the client. Built, pitched, and shelved when the prospect turned out to be the wrong customer.",
    problem:
      "Firms handling residence-permit applications were running them on spreadsheets and WhatsApp. The firm can't see which cases are stalling, and the applicant — waiting on a decision that governs their legal right to stay in the country — has no idea what stage they're at or what's expected of them. The anxiety is the product problem as much as the admin overhead is.",
    approach: [
      {
        heading: "Two audiences, two entirely different interfaces",
        body: "The firm gets density: KPI tiles, cases by stage, completion trend, average days per stage, and a searchable client directory. The applicant gets the opposite — one six-stage vertical timeline in plain language, their documents, and what they need to do next. The same underlying case record, presented for two people with completely different questions.",
      },
      {
        heading: "Boring but polished, deliberately",
        body: "Closer to Stripe or Linear than to a playful startup SaaS. No gradients, no illustration, no personality where personality isn't wanted. Law firms trust software that looks like it takes itself seriously, and the data involved — immigration status, personal documents — makes anything playful read as unserious.",
      },
      {
        heading: "Why it stopped",
        body: "The firm I built it to pitch rejected it: they said they weren't the target market, and that data this sensitive would require ISO security certification from any vendor. Both fair. The entire reason to build it was having an immediate customer, and with that gone there was no honest reason to keep going. It's a wrong-customer outcome rather than a failed build — and finding that out took one pitch instead of six months.",
      },
    ],
    outcomes: [
      "Full admin dashboard and client portal built against a realistic demo dataset",
      "Pricing modelled and a twelve-slide pitch deck produced from live screenshots",
      "Pitched and rejected in weeks rather than after months of building",
      "Shelved honestly — kept here because the decision to stop is the useful part",
    ],
    stack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS 4",
      "shadcn/ui",
      "Zustand",
      "Recharts",
      "Turbopack",
    ],
    links: { repo: "https://github.com/Aikay-dev/voya" },
    accent: "#2f6f8f",
    cover: "/images/work/voya/cover.webp",
    gallery: [
      {
        src: "/images/work/voya/dashboard.webp",
        alt: "Voya law firm admin dashboard with KPI tiles and case charts",
        caption:
          "The firm's view: dense, quiet, and built so a partner can see which cases are stalling in one glance. The wordmark reads StayLegal because the product was designed to be white-labelled per firm — Voya is the platform, StayLegal is what a client's users would see.",
        bleed: true,
      },
      {
        src: "/images/work/voya/portal.webp",
        alt: "Voya client portal showing a six-stage vertical case timeline",
        caption:
          "The applicant's view of the same case: one timeline, plain language, and what to do next.",
      },
    ],
  },

  /* ------------------------------------------------------ POLYMARKET */
  {
    slug: "polymarket-scanner",
    title: "Polymarket Scanner",
    kind: "personal",
    discipline: "Quant / research",
    role: "Personal project",
    year: "2026",
    status: "shipped",
    tagline: "Finding prediction markets that don't add up",
    summary:
      "A read-only scanner that sweeps liquid Polymarket markets looking for two specific mispricings: binary pairs whose complementary asks sum to less than a dollar, and multi-outcome groups whose outcomes collectively price below certainty.",
    problem:
      "In a well-formed prediction market the Yes and No sides of a binary question should cost about a dollar together, and the outcomes of a multi-outcome event should sum to about a dollar too. Sometimes they don't — thin books, stale quotes, a market nobody has looked at in an hour. Those windows are small, and finding them by hand across a thousand markets is not something a person can do.",
    approach: [
      {
        heading: "Read-only on purpose",
        body: "It never places an order. It prints candidates and stops. Automated execution against a live book is a different project with a different risk profile, and conflating the two is how research tools quietly become trading bots that lose money while you're asleep. The scanner's job ends at 'this looks wrong, go and check'.",
      },
      {
        heading: "Two patterns, one of them the interesting one",
        body: "The binary case is easy to state: best ask on Yes plus best ask on No coming in under a dollar. The multi-outcome negRisk case is the one worth having — buying a group of outcomes that together price below certainty. It's the same pattern the largest participants use, at a scale where the arithmetic works out.",
      },
      {
        heading: "Priced against reality, not the screen",
        body: "A candidate is only real after fees, slippage against actual book depth, and the capital locked up until resolution. The scanner reports against depth rather than the top-of-book quote, because most apparent edge evaporates the moment you ask how much you could actually fill.",
      },
    ],
    outcomes: [
      "Sweeps roughly a thousand liquid binary markets per run",
      "Detects both complementary-token and multi-outcome negRisk mispricings",
      "Read-only by design — surfaces candidates, never executes",
    ],
    stack: ["Python", "Polymarket CLOB API", "asyncio"],
    links: {},
    accent: "#1f7a5a",
    cover: "/images/work/polymarket-scanner/cover.webp",
    // No gallery: the only honest visual is live scanner output against real
    // markets, and a mocked-up terminal would be a fabricated result.
    gallery: [],
  },

  /* ------------------------------------------------------------ MT5 EA */
  {
    slug: "keylevel-hedge-ea",
    title: "KeyLevel Hedge EA",
    kind: "personal",
    discipline: "Trading systems",
    role: "Personal project",
    year: "2026",
    status: "shipped",
    tagline: "Automating a strategy I was already trading by hand",
    summary:
      "A MetaTrader 5 Expert Advisor in MQL5 that watches hand-drawn key levels on an H1 chart, waits for a specific one-to-three-candle confirmation, and opens a true hedged straddle — built because I trade this setup manually and kept missing it while away from the screen.",
    problem:
      "The setup is entirely mechanical once you've drawn the levels: price touches a level, a confirmation pattern completes, you take both sides. The only reason it was ever discretionary is that it requires being in front of a chart at the moment it happens. Every missed trade was a scheduling failure, not an analytical one — which is precisely the kind of problem worth handing to software.",
    approach: [
      {
        heading: "A state machine per level, not a global signal",
        body: "Each level runs its own state machine — IDLE → GOT_C1 → GOT_C2 → fire → COOLDOWN — because levels behave independently and a single global 'armed' flag would let one level's activity suppress another's valid setup. Confirmation includes a wick-smaller-than-body continuation test and a re-arm distance, so price grinding along a level doesn't fire repeatedly.",
      },
      {
        heading: "Refusing to run in the wrong account mode",
        body: "A true straddle needs simultaneous long and short positions, which requires a hedging account. On a netting account the second order silently closes the first, producing a flat position and a strategy that appears to do nothing. The EA checks the account mode at initialisation and refuses to start rather than trading incorrectly — failing loudly beats failing profitably-looking.",
      },
      {
        heading: "Entries automated, exits deliberately not",
        body: "Both legs get an independently risk-sized fixed stop and no take-profit. Exits stay manual because the exit is where the discretion actually lives in this strategy — automating the part I execute well and leaving the part I execute by judgement. Alongside that: a spread filter, a magic-number lock allowing one cycle per pair, a master kill switch, and a live on-chart status block.",
      },
      {
        heading: "A backtest that lied",
        body: "An early run produced false-positive straddles that looked like a logic bug. The root cause was picking the wrong EA in the Strategy Tester dropdown — an older, cruder version of the same idea. Worth recording, because the instinct on a bad backtest is to start rewriting the strategy, and the actual fault was in the harness.",
      },
    ],
    outcomes: [
      "Compiles clean against the MQL5 toolchain, with manual level inputs added so it can be backtested",
      "Per-level state machines, spread filter, position lock, hedging-mode self-check and kill switch",
      "Currently in forward testing on demo — not yet risking live capital",
    ],
    stack: ["MQL5", "MetaTrader 5", "Strategy Tester"],
    links: {},
    accent: "#b0762a",
    cover: "/images/work/keylevel-hedge-ea/cover.webp",
    // No gallery yet — wants a real MetaTrader 5 chart showing the KL_ levels
    // and the on-chart status block, which has to be captured from the terminal.
    gallery: [],
  },
];

export const clientProjects = projects.filter((p) => p.kind === "client");
export const personalProjects = projects.filter((p) => p.kind === "personal");

/** Home page shows the strongest six; /work shows everything. */
export const featuredSlugs = [
  "fixam",
  "biddy",
  "testportal-academy",
  "ai-interviewer",
  "tee-and-tee-resort",
  "voya",
] as const;

export const featuredProjects = featuredSlugs
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is Project => Boolean(p));

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };
  return {
    previous: index > 0 ? projects[index - 1] : projects[projects.length - 1],
    next: index < projects.length - 1 ? projects[index + 1] : projects[0],
  };
}

export const statusLabel: Record<ProjectStatus, string> = {
  live: "Live",
  shipped: "Shipped",
  shelved: "Shelved",
  offline: "Temporarily offline",
};
